<?php

namespace OverchainBlocks\Blocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the Overchain block category and all blocks found in /blocks.
 */
class BlocksService {

	const CATEGORY_SLUG = 'overchain';
	const CATEGORY_NAME = 'Overchain';

	/**
	 * Hook block registration into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		// Block categories are owned by overchain_blocks_register_category() in the
		// main plugin file — it is the one that knows about the post-only category
		// and controls the order. Hooking here too produced a duplicate "Overchain"
		// in the inserter. See Technical Debt § 1.
		self::register_blocks();
	}


	/**
	 * Discover and register every block.json found under /blocks/*.
	 *
	 * @return void
	 */
	public static function register_blocks() {
		$pattern = OVERCHAIN_BLOCKS_PATH . 'blocks/*/block.json';
		$files   = glob( $pattern );

		if ( empty( $files ) ) {
			return;
		}

		foreach ( $files as $block_json ) {
			register_block_type( dirname( $block_json ) );
		}
	}
}
