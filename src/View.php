<?php

namespace OverchainBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use eftec\bladeone\BladeOne;
use Throwable;

/**
 * Thin wrapper around BladeOne used to render frontend templates.
 */
class View {

	/**
	 * BladeOne singleton instance.
	 *
	 * @var BladeOne|null
	 */
	private static $blade = null;

	/**
	 * Render a Blade view to an HTML string.
	 *
	 * @param string $view View name using dot notation, e.g. "blocks.test-block".
	 * @param array  $data Data passed to the view.
	 *
	 * @return string
	 */
	public static function render( string $view, array $data = array() ): string {
		$blade = self::get_blade();

		if ( null === $blade ) {
			return '';
		}

		try {
			return $blade->run( $view, $data );
		} catch ( Throwable $e ) {
			if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
				return '<!-- Overchain Blocks render error: ' . esc_html( $e->getMessage() ) . ' -->';
			}

			return '';
		}
	}

	/**
	 * Get (and lazily create) the BladeOne singleton instance.
	 *
	 * @return BladeOne|null
	 */
	private static function get_blade() {
		if ( null !== self::$blade ) {
			return self::$blade;
		}

		if ( ! class_exists( BladeOne::class ) ) {
			return null;
		}

		$views_path = OVERCHAIN_BLOCKS_PATH . 'resources/views';
		$cache_path = OVERCHAIN_BLOCKS_PATH . 'cache/views';

		if ( ! is_dir( $cache_path ) ) {
			wp_mkdir_p( $cache_path );
		}

		$mode = ( defined( 'WP_DEBUG' ) && WP_DEBUG )
			? BladeOne::MODE_DEBUG
			: BladeOne::MODE_AUTO;

		try {
			self::$blade = new BladeOne( $views_path, $cache_path, $mode );
		} catch ( Throwable $e ) {
			return null;
		}

		return self::$blade;
	}
}
