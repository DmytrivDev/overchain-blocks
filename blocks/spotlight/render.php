<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( class_exists( '\OverchainBlocks\View' ) ) {
	echo \OverchainBlocks\View::render(
		'blocks.spotlight',
		array(
			'attributes' => $attributes,
			'content'    => $content,
			'block'      => $block,
		)
	);
}