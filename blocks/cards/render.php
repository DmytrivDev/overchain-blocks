<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( class_exists( '\OverchainBlocks\View' ) ) {
	echo \OverchainBlocks\View::render(
		'blocks.cards',
		array(
			'attributes' => $attributes,
			'content'    => $content,
			'block'      => $block,
		)
	);
}