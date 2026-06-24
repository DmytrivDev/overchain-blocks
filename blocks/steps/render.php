<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( class_exists( '\OverchainBlocks\View' ) ) {
	echo \OverchainBlocks\View::render(
		'blocks.steps',
		array(
			'attributes' => $attributes,
			'content'    => $content,
			'block'      => $block,
		)
	);
}