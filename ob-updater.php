<?php
/**
 * Overchain Blocks — GitHub Auto-Updater
 *
 * Hooks into the WordPress update system to check GitHub Releases for new versions.
 * Updates appear in the standard WP Admin → Updates screen.
 */

defined( 'ABSPATH' ) || exit;

class OB_Updater {

    const GITHUB_USER = 'DmytrivDev';
    const GITHUB_REPO = 'overchain-blocks';
    const PLUGIN_SLUG = 'overchain-blocks/overchain-blocks.php';
    const CACHE_KEY   = 'ob_updater_release';
    // One hour: WordPress re-checks plugins hourly on the Plugins / Updates screens,
    // so a new release shows up within the hour without asking GitHub on every
    // page load (unauthenticated GitHub API: 60 requests an hour per server IP).
    const CACHE_TTL   = HOUR_IN_SECONDS;
    const CHECK_NOW   = 'ob_check_updates';

    public static function init(): void {
        add_filter( 'pre_set_site_transient_update_plugins', [ __CLASS__, 'check_update' ] );
        add_filter( 'plugins_api', [ __CLASS__, 'plugin_info' ], 10, 3 );
        add_filter( 'upgrader_source_selection', [ __CLASS__, 'fix_folder_name' ], 10, 4 );
        // Runs after the rename above, on every package that is this plugin — an
        // update from GitHub as well as "Upload plugin → Replace current with uploaded".
        add_filter( 'upgrader_source_selection', [ __CLASS__, 'verify_package' ], 20, 4 );

        // Faster than the cache allows: "Check again" on Dashboard → Updates, and a
        // "Check for updates" link on the plugin's row, both ask GitHub right away.
        add_action( 'load-update-core.php', [ __CLASS__, 'on_force_check' ] );
        add_filter( 'plugin_action_links_' . self::PLUGIN_SLUG, [ __CLASS__, 'action_links' ] );
        add_action( 'admin_init', [ __CLASS__, 'check_now' ] );
        add_action( 'admin_notices', [ __CLASS__, 'check_now_notice' ] );
    }

    /**
     * Dashboard → Updates → "Check again" (`force-check=1`): drop the cached release
     * first, so WordPress's forced check really asks GitHub.
     */
    public static function on_force_check(): void {
        if ( ! empty( $_GET['force-check'] ) && current_user_can( 'update_plugins' ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- core verifies its own force-check
            self::clear_cache();
        }
    }

    /**
     * "Check for updates" link under the plugin on the Plugins screen.
     *
     * @param array $links Row action links.
     */
    public static function action_links( array $links ): array {
        if ( current_user_can( 'update_plugins' ) ) {
            $url = wp_nonce_url( add_query_arg( self::CHECK_NOW, '1', self_admin_url( 'plugins.php' ) ), self::CHECK_NOW );
            $links[] = '<a href="' . esc_url( $url ) . '">' . esc_html__( 'Check for updates', 'overchain-blocks' ) . '</a>';
        }

        return $links;
    }

    /**
     * Handle the link: forget the cached release and WordPress's plugin update data,
     * check again now, and come back to the Plugins screen with the result.
     */
    public static function check_now(): void {
        if ( empty( $_GET[ self::CHECK_NOW ] ) || ! current_user_can( 'update_plugins' ) ) {
            return;
        }

        check_admin_referer( self::CHECK_NOW );

        self::clear_cache();
        delete_site_transient( 'update_plugins' );
        wp_update_plugins();

        $release = get_transient( self::CACHE_KEY );
        $updates = get_site_transient( 'update_plugins' );
        $result  = ! is_array( $release ) ? 'error'
            : ( isset( $updates->response[ self::PLUGIN_SLUG ] ) ? 'update' : 'current' );

        wp_safe_redirect( add_query_arg( 'ob_checked', $result, self_admin_url( 'plugins.php' ) ) );
        exit;
    }

    public static function check_now_notice(): void {
        $result = isset( $_GET['ob_checked'] ) ? sanitize_key( wp_unslash( $_GET['ob_checked'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- display only
        if ( '' === $result ) {
            return;
        }

        $release = get_transient( self::CACHE_KEY );
        $version = is_array( $release ) ? $release['version'] : '';
        $notices = [
            /* translators: %s: version number */
            'update'  => [ 'warning', sprintf( __( 'Overchain Blocks %s is available — update it below.', 'overchain-blocks' ), $version ) ],
            /* translators: %s: version number */
            'current' => [ 'success', sprintf( __( 'Overchain Blocks is up to date (latest release: %s).', 'overchain-blocks' ), $version ) ],
            'error'   => [ 'error', __( 'Overchain Blocks could not reach GitHub to check for updates. Try again in a few minutes.', 'overchain-blocks' ) ],
        ];
        if ( ! isset( $notices[ $result ] ) ) {
            return;
        }

        printf( '<div class="notice notice-%s is-dismissible"><p>%s</p></div>', esc_attr( $notices[ $result ][0] ), esc_html( $notices[ $result ][1] ) );
    }

    /**
     * Files the plugin cannot render without. A package missing any of them would
     * leave every block on the site empty, so the upgrade is refused instead and
     * WordPress keeps the installed version.
     */
    const REQUIRED_FILES = [
        'overchain-blocks.php',
        'src/View.php',
        'vendor/autoload.php',
        'vendor/eftec/bladeone/lib/BladeOne.php',
        'build/blocks.css',
    ];

    private static function get_latest_release(): ?array {
        $cached = get_transient( self::CACHE_KEY );
        if ( is_array( $cached ) ) {
            return $cached;
        }

        $url      = sprintf(
            'https://api.github.com/repos/%s/%s/releases/latest',
            self::GITHUB_USER,
            self::GITHUB_REPO
        );
        $response = wp_remote_get( $url, [
            'timeout' => 10,
            'headers' => [
                'Accept'     => 'application/vnd.github+json',
                'User-Agent' => 'WordPress/' . get_bloginfo( 'version' ),
            ],
        ] );

        if ( is_wp_error( $response ) || wp_remote_retrieve_response_code( $response ) !== 200 ) {
            return null;
        }

        $data = json_decode( wp_remote_retrieve_body( $response ), true );
        if ( empty( $data['tag_name'] ) ) {
            return null;
        }

        $zip_url = '';
        foreach ( $data['assets'] ?? [] as $asset ) {
            if ( $asset['name'] === 'overchain-blocks.zip' ) {
                $zip_url = $asset['browser_download_url'];
                break;
            }
        }

        if ( ! $zip_url ) {
            $zip_url = sprintf(
                'https://github.com/%s/%s/archive/refs/tags/%s.zip',
                self::GITHUB_USER,
                self::GITHUB_REPO,
                $data['tag_name']
            );
        }

        $release = [
            'version'      => ltrim( $data['tag_name'], 'v' ),
            'zip_url'      => $zip_url,
            'changelog'    => $data['body'] ?? '',
            'published_at' => $data['published_at'] ?? '',
        ];

        set_transient( self::CACHE_KEY, $release, self::CACHE_TTL );
        return $release;
    }

    public static function check_update( object $transient ): object {
        if ( empty( $transient->checked ) ) {
            return $transient;
        }

        $release = self::get_latest_release();
        if ( ! $release ) {
            return $transient;
        }

        $installed = $transient->checked[ self::PLUGIN_SLUG ] ?? '0.0.0';

        if ( version_compare( $release['version'], $installed, '>' ) ) {
            $transient->response[ self::PLUGIN_SLUG ] = (object) [
                'slug'         => 'overchain-blocks',
                'plugin'       => self::PLUGIN_SLUG,
                'new_version'  => $release['version'],
                'url'          => sprintf( 'https://github.com/%s/%s', self::GITHUB_USER, self::GITHUB_REPO ),
                'package'      => $release['zip_url'],
                'icons'        => [],
                'banners'      => [],
                'tested'       => get_bloginfo( 'version' ),
                'requires_php' => '8.1',
            ];
        }

        return $transient;
    }

    public static function plugin_info( mixed $result, string $action, object $args ): mixed {
        if ( $action !== 'plugin_information' ) {
            return $result;
        }

        if ( ( $args->slug ?? '' ) !== 'overchain-blocks' ) {
            return $result;
        }

        $release = self::get_latest_release();
        if ( ! $release ) {
            return $result;
        }

        return (object) [
            'name'          => 'Overchain Blocks',
            'slug'          => 'overchain-blocks',
            'version'       => $release['version'],
            'author'        => 'DmytrivDev',
            'homepage'      => sprintf( 'https://github.com/%s/%s', self::GITHUB_USER, self::GITHUB_REPO ),
            'requires_php'  => '8.1',
            'sections'      => [
                'changelog' => nl2br( esc_html( $release['changelog'] ) ),
            ],
            'download_link' => $release['zip_url'],
        ];
    }

    public static function fix_folder_name( string $source, string $remote_source, object $upgrader, array $hook_extra ): string {
        $plugin = $hook_extra['plugin'] ?? '';
        if ( $plugin !== self::PLUGIN_SLUG ) {
            return $source;
        }

        $target = trailingslashit( $remote_source ) . 'overchain-blocks/';

        if ( $source !== $target ) {
            global $wp_filesystem;
            if ( $wp_filesystem->move( $source, $target, true ) ) {
                return $target;
            }
        }

        return $source;
    }

    /**
     * Refuse an incomplete Overchain Blocks package before it replaces the plugin.
     *
     * @param string|WP_Error $source Unpacked package folder.
     * @return string|WP_Error
     */
    public static function verify_package( $source, string $remote_source, object $upgrader, array $hook_extra ) {
        if ( is_wp_error( $source ) ) {
            return $source;
        }

        $dir  = trailingslashit( $source );
        $main = $dir . 'overchain-blocks.php';

        // Not this plugin (another plugin or theme being installed): leave it alone.
        $is_ours = ( $hook_extra['plugin'] ?? '' ) === self::PLUGIN_SLUG
            || ( file_exists( $main ) && false !== strpos( (string) file_get_contents( $main, false, null, 0, 2048 ), 'Plugin Name:' )
                && false !== strpos( (string) file_get_contents( $main, false, null, 0, 2048 ), 'Overchain Blocks' ) );
        if ( ! $is_ours ) {
            return $source;
        }

        $missing = array_values( array_filter( self::REQUIRED_FILES, function ( $file ) use ( $dir ) {
            return ! file_exists( $dir . $file );
        } ) );

        if ( $missing ) {
            return new WP_Error(
                'overchain_blocks_incomplete_package',
                sprintf(
                    /* translators: %s: list of missing files */
                    __( 'Overchain Blocks: the package is incomplete (missing %s). The installed version was kept — nothing was changed.', 'overchain-blocks' ),
                    implode( ', ', $missing )
                )
            );
        }

        return $source;
    }

    public static function clear_cache(): void {
        delete_transient( self::CACHE_KEY );
    }
}

OB_Updater::init();