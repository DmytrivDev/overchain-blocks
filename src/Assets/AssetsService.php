<?php

namespace OverchainBlocks\Assets;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers and enqueues the plugin's compiled CSS assets.
 */
class AssetsService {

	const STYLE_HANDLE = 'overchain-blocks';
	const EDITOR_STYLE_HANDLE = 'overchain-blocks-editor';

	/**
	 * Hook asset loading into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'wp_enqueue_scripts', array( self::class, 'enqueue_frontend_style' ) );
		add_action( 'wp_enqueue_scripts', array( self::class, 'enqueue_frontend_scripts' ) );
		add_action( 'enqueue_block_editor_assets', array( self::class, 'enqueue_editor_assets' ) );
	}

	/**
	 * Enqueue the shared blocks.css on the frontend.
	 *
	 * @return void
	 */
	public static function enqueue_frontend_style() {
		self::enqueue_shared_style();
	}

	/**
	 * Enqueue shared and editor-only styles inside the block editor.
	 *
	 * @return void
	 */
	public static function enqueue_editor_assets() {
		self::enqueue_shared_style();

		$editor_css_path = OVERCHAIN_BLOCKS_PATH . 'build/editor.css';

		if ( ! file_exists( $editor_css_path ) ) {
			return;
		}

		wp_enqueue_style(
			self::EDITOR_STYLE_HANDLE,
			OVERCHAIN_BLOCKS_URL . 'build/editor.css',
			array( self::STYLE_HANDLE ),
			filemtime( $editor_css_path )
		);
	}

	/**
	 * Enqueue the shared blocks.css stylesheet if it exists.
	 *
	 * @return void
	 */
	private static function enqueue_shared_style() {
		$style_path = OVERCHAIN_BLOCKS_PATH . 'build/blocks.css';

		if ( ! file_exists( $style_path ) ) {
			return;
		}

		wp_enqueue_style(
			self::STYLE_HANDLE,
			OVERCHAIN_BLOCKS_URL . 'build/blocks.css',
			array(),
			filemtime( $style_path )
		);
	}

	public static function enqueue_frontend_scripts() {
		$script_path = OVERCHAIN_BLOCKS_PATH . 'build/blocks-scripts.js';

		if ( ! file_exists( $script_path ) ) {
			return;
		}

		wp_enqueue_script(
			'overchain-blocks-scripts',
			OVERCHAIN_BLOCKS_URL . 'build/blocks-scripts.js',
			array(),
			filemtime( $script_path ),
			true
		);
	}
}



