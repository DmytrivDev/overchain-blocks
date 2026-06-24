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
		add_filter( 'block_categories_all', array( self::class, 'register_category' ) );
		self::register_blocks();
	}

	/**
	 * Add the custom "Overchain" block category.
	 *
	 * @param array $categories Existing block categories.
	 *
	 * @return array
	 */
	public static function register_category( $categories ) {
		return array_merge(
			array(
				array(
					'slug'  => self::CATEGORY_SLUG,
					'title' => self::CATEGORY_NAME,
				),
			),
			$categories
		);
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
