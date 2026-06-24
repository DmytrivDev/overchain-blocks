<?php

namespace OverchainBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use OverchainBlocks\Assets\AssetsService;
use OverchainBlocks\Blocks\BlocksService;

/**
 * Main plugin bootstrap class.
 */
class Plugin {

	/**
	 * Boot the plugin.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'plugins_loaded', array( self::class, 'load_textdomain' ) );

		// AssetsService hooks to wp_enqueue_scripts / enqueue_block_editor_assets
		// — those fire well after init, so it is safe to register the hooks early.
		AssetsService::init();

		// BlocksService must run on init so that register_block_type() is called
		// at the correct time.
		add_action( 'init', array( self::class, 'boot_blocks' ) );
	}

	/**
	 * Load the plugin text domain.
	 *
	 * @return void
	 */
	public static function load_textdomain() {
		load_plugin_textdomain(
			'overchain-blocks',
			false,
			dirname( plugin_basename( OVERCHAIN_BLOCKS_FILE ) ) . '/languages'
		);
	}

	/**
	 * Register all blocks. Called on the init hook.
	 *
	 * @return void
	 */
	public static function boot_blocks() {
		BlocksService::init();
	}
}
