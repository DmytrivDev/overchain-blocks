<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( class_exists( '\OverchainBlocks\View' ) ) {
	echo \OverchainBlocks\View::render(
		'blocks.split',
		array(
			'attributes' => $attributes,
			'content'    => $content,
			'block'      => $block,
		)
	);
}