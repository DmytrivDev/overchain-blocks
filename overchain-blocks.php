<?php
/**
 * Plugin Name: Overchain Blocks
 * Description: Custom Gutenberg blocks for Overchain sites.
 * Version:     1.1.0
 * Author:      DmytrivDev
 * Author URI:  https://github.com/DmytrivDev
 * GitHub Plugin URI: DmytrivDev/overchain-blocks
 * Requires PHP: 8.1
 * Text Domain: overchain-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'OVERCHAIN_BLOCKS_VERSION', '1.1.0' );
define( 'OVERCHAIN_BLOCKS_FILE', __FILE__ );
define( 'OVERCHAIN_BLOCKS_PATH', plugin_dir_path( __FILE__ ) );
define( 'OVERCHAIN_BLOCKS_URL', plugin_dir_url( __FILE__ ) );

require_once OVERCHAIN_BLOCKS_PATH . 'ob-updater.php';

if ( file_exists( OVERCHAIN_BLOCKS_PATH . 'vendor/autoload.php' ) ) {
	require_once OVERCHAIN_BLOCKS_PATH . 'vendor/autoload.php';
}

add_action( 'init', 'overchain_blocks_register_blocks' );
add_action( 'wp_enqueue_scripts', 'overchain_blocks_enqueue_frontend' );
add_action( 'enqueue_block_editor_assets', 'overchain_blocks_enqueue_editor' );
add_action( 'enqueue_block_editor_assets', 'overchain_blocks_localize_editor' );
add_filter( 'block_categories_all', 'overchain_blocks_register_category' );
add_action( 'plugins_loaded', 'overchain_blocks_load_textdomain' );
add_action( 'wp_footer', 'overchain_blocks_tabs_script' );

if ( class_exists( '\OverchainBlocks\Plugin' ) ) {
	\OverchainBlocks\Plugin::init();
}

function overchain_blocks_register_category( $categories ) {
	return array_merge(
		array(
			array(
				'slug' => 'overchain',
				'title' => 'Overchain',
			),
		),
		$categories
	);
}

function overchain_blocks_register_blocks() {
	// Батьківські блоки в потрібному порядку
	$order = array(
		'white-section',
		'hero',
		'video',
		'features',
		'split',
		'steps',
		'tabs',
		'badges',
		'accordion',
		'cards',
		'logos',
		'spotlight',
		'duo',
		'promo',
		'slider-cards',
		'form',
		'subscribe',
		'related-posts',
		'quote',
	);

	foreach ( $order as $block_name ) {
		$block_dir = OVERCHAIN_BLOCKS_PATH . "blocks/$block_name";
		$block_json = "$block_dir/block.json";

		if ( ! file_exists( $block_json ) ) {
			continue;
		}

		$block_data = json_decode( file_get_contents( $block_json ), true );
		$script_relative = str_replace( 'file:', '', $block_data['editorScript'] ?? '' );

		if ( empty( $script_relative ) ) {
			continue;
		}

		$asset_path = realpath( $block_dir . '/' . $script_relative );

		if ( ! $asset_path ) {
			continue;
		}

		$asset_php = str_replace( '.js', '.asset.php', $asset_path );

		if ( ! file_exists( $asset_php ) ) {
			continue;
		}

		register_block_type( $block_dir );
	}

	// Дочірні блоки (вкладені папки з parent)
	$files = glob( OVERCHAIN_BLOCKS_PATH . 'blocks/*/*/block.json' );

	if ( empty( $files ) ) {
		return;
	}

	foreach ( $files as $block_json ) {
		$block_data = json_decode( file_get_contents( $block_json ), true );

		if ( empty( $block_data['parent'] ) ) {
			continue;
		}

		$block_dir = dirname( $block_json );
		$script_relative = str_replace( 'file:', '', $block_data['editorScript'] ?? '' );

		if ( empty( $script_relative ) ) {
			continue;
		}

		$asset_path = realpath( $block_dir . '/' . $script_relative );

		if ( ! $asset_path ) {
			continue;
		}

		$asset_php = str_replace( '.js', '.asset.php', $asset_path );

		if ( ! file_exists( $asset_php ) ) {
			continue;
		}

		register_block_type( $block_dir );
	}
}

function overchain_blocks_enqueue_frontend() {
	$path = OVERCHAIN_BLOCKS_PATH . 'build/blocks.css';
	if ( file_exists( $path ) ) {
		wp_enqueue_style( 'overchain-blocks', OVERCHAIN_BLOCKS_URL . 'build/blocks.css', array(), filemtime( $path ) );
	}
}

function overchain_blocks_enqueue_editor() {
	$blocks_path = OVERCHAIN_BLOCKS_PATH . 'build/blocks.css';
	if ( file_exists( $blocks_path ) ) {
		wp_enqueue_style( 'overchain-blocks', OVERCHAIN_BLOCKS_URL . 'build/blocks.css', array(), filemtime( $blocks_path ) );
	}

	$editor_path = OVERCHAIN_BLOCKS_PATH . 'build/editor.css';
	if ( file_exists( $editor_path ) ) {
		wp_enqueue_style( 'overchain-blocks-editor', OVERCHAIN_BLOCKS_URL . 'build/editor.css', array( 'overchain-blocks' ), filemtime( $editor_path ) );
	}
}

function overchain_blocks_localize_editor() {
	wp_add_inline_script(
		'wp-blocks',
		'window.ovchBlocks = ' . wp_json_encode( array(
			'url' => OVERCHAIN_BLOCKS_URL,
		) ) . ';',
		'before'
	);
}

function overchain_blocks_load_textdomain() {
	load_plugin_textdomain( 'overchain-blocks', false, dirname( plugin_basename( OVERCHAIN_BLOCKS_FILE ) ) . '/languages' );
}

function overchain_blocks_tabs_script() {
	?>
	<script>
		document.querySelectorAll('[data-tabs]').forEach(function (wrap) {
			const navItems = wrap.querySelectorAll('[data-tab]');
			const panels = wrap.querySelectorAll('[data-panel]');

			navItems.forEach(function (btn) {
				btn.addEventListener('click', function () {
					const target = this.dataset.tab;

					navItems.forEach(function (b) { b.classList.remove('is-active'); });
					panels.forEach(function (p) { p.classList.remove('is-active'); });

					this.classList.add('is-active');
					wrap.querySelector('[data-panel="' + target + '"]').classList.add('is-active');
				});
			});
		});
	</script>
	<?php
}

function overchain_resolve_button_data( array $data ): array {
	$type = $data['buttonType'] ?? 'link';
	$link = $data['buttonLink'] ?? '';
	$newTab = $data['buttonLinkNewTab'] ?? $data['buttonNewTab'] ?? false;
	$anchor = $data['buttonAnchor'] ?? '';
	$popupId = $data['buttonPopupId'] ?? '';

	$href = '';
	$attrs = '';

	if ( $type === 'link' && ! empty( $link ) ) {
		$href = esc_url( $link );
		if ( $newTab ) {
			$attrs = ' target="_blank" rel="noopener noreferrer"';
		}
	} elseif ( $type === 'anchor' && ! empty( $anchor ) ) {
		$href = esc_url( $anchor );
	} elseif ( $type === 'popup' && ! empty( $popupId ) ) {
		$href = '#';
		$attrs = ' data-popup-trigger="' . esc_attr( $popupId ) . '"';
	}

	return compact( 'href', 'attrs' );
}

add_action( 'init', function () {
	if ( ! function_exists( 'pll_register_string' ) ) {
		return;
	}

	foreach ( array(
		'Enter Your Email',
		'Subscribe',
		'First name',
		'Last name',
		'Job title',
		'Business email',
		'Company Website',
		'Phone',
		'Message',
		'Type here',
		'Enter your',
		'Email address',
		'Website URL',
		'Phone Number',
		'CEO, designer, manager',
		'(optional)',
	) as $string ) {
		pll_register_string( $string, $string, 'Overchain Blocks', false );
	}
} );