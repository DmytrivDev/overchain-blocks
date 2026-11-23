<?php
/**
 * Plugin Name: Overchain Blocks
 * Description: Custom Gutenberg blocks for Overchain sites.
 * Version:     1.2.0
 * Author:      DmytrivDev
 * Author URI:  https://github.com/DmytrivDev
 * GitHub Plugin URI: DmytrivDev/overchain-blocks
 * Requires PHP: 8.1
 * Text Domain: overchain-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'OVERCHAIN_BLOCKS_VERSION', '1.2.0' );
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
add_filter( 'block_categories_all', 'overchain_blocks_register_category', 20, 2 );
add_filter( 'allowed_block_types_all', 'overchain_blocks_restrict_post_blocks', 10, 2 );
add_action( 'plugins_loaded', 'overchain_blocks_load_textdomain' );
add_action( 'wp_footer', 'overchain_blocks_tabs_script' );
add_action( 'enqueue_block_editor_assets', 'overchain_blocks_section_anchor_editor' );
add_filter( 'render_block', 'overchain_blocks_section_anchor_render', 10, 2 );

if ( class_exists( '\OverchainBlocks\Plugin' ) ) {
	\OverchainBlocks\Plugin::init();
}

/**
 * Blocks that only make sense inside an article.
 *
 * They depend on the single-post context — the `--post-*` custom properties and the
 * `.post__main` wrapper — so they render wrong anywhere else, preview included.
 *
 * @return string[]
 */
function overchain_blocks_post_only() {
	return array(
		'overchain/quote',
	);
}

/**
 * Post types whose editor is an article body.
 *
 * These share the single-post context the post-only blocks need: the same
 * `.post__main … .embeded` wrapper and the `--post-*` custom properties (the
 * theme gives their edit screen the `post-type-post` body class for exactly
 * that reason). A post type listed here gets the post inserter — the
 * "Post blocks" category and everything in overchain_blocks_post_only().
 *
 * @return string[]
 */
function overchain_blocks_article_post_types() {
	return array( 'post', 'cases' );
}

/**
 * Is the editor currently editing an article-like post type?
 *
 * @param WP_Block_Editor_Context|null $context Editor context.
 *
 * @return bool
 */
function overchain_blocks_is_post_context( $context ) {
	return isset( $context->post )
		&& $context->post instanceof WP_Post
		&& in_array( $context->post->post_type, overchain_blocks_article_post_types(), true );
}

function overchain_blocks_register_category( $categories, $context = null ) {
	$own = array(
		array(
			'slug' => 'overchain',
			'title' => 'Overchain',
		),
	);

	// Article-only category: offered on article-like edit screens and nowhere else.
	if ( overchain_blocks_is_post_context( $context ) ) {
		$own[] = array(
			'slug' => 'overchain-post-blocks',
			'title' => __( 'Post blocks', 'overchain-blocks' ),
		);
	}

	// This function is the single owner of the plugin's categories. The guard is a
	// safety net in case anything else registers the same slug — that is what used
	// to list "Overchain" twice in the inserter.
	$existing = wp_list_pluck( $categories, 'slug' );

	$own = array_values(
		array_filter(
			$own,
			function ( $category ) use ( $existing ) {
				return ! in_array( $category['slug'], $existing, true );
			}
		)
	);

	return array_merge( $own, $categories );
}

/**
 * Keep article-only blocks out of the inserter on pages and other post types.
 *
 * Without this they would still be offered, just under a category that does not
 * exist there — which is how the broken Quote preview showed up on pages.
 *
 * @param bool|string[]                $allowed Allowed block types, or true for all.
 * @param WP_Block_Editor_Context|null $context Editor context.
 *
 * @return bool|string[]
 */
function overchain_blocks_restrict_post_blocks( $allowed, $context = null ) {
	if ( overchain_blocks_is_post_context( $context ) ) {
		return $allowed;
	}

	if ( ! is_array( $allowed ) ) {
		$allowed = array_keys( WP_Block_Type_Registry::get_instance()->get_all_registered() );
	}

	return array_values( array_diff( $allowed, overchain_blocks_post_only() ) );
}

function overchain_blocks_register_blocks() {
	// Батьківські блоки в потрібному порядку
	$order = array(
		'white-section',
		'lead',
		'intro',
		'hero',
		'video',
		'features',
		'split',
		'statement',
		'showcase',
		'everything',
		'steps',
		'integration-steps',
		'tabs',
		'badges',
		'tag-list',
		'accordion',
		'faq',
		'mosaic',
		'moves',
		'cards',
		'control-list',
		'manage',
		'locations',
		'logos',
		'spotlight',
		'connect',
		'duo',
		'logo-grid',
		'promo',
		'flow-promo',
		'promo-slider',
		'process-slider',
		'callout',
		'highlight',
		'team',
		'testimonials',
		'slider-cards',
		'form',
		'book',
		'subscribe',
		'related-posts',
		'quote',
		// FM London landing (the design's welcome, summits, delays, institution,
		// brokers and startright sections) — available to the main site too.
		'event-hero',
		'event-list',
		'benefits',
		'use-cases',
		'reasons',
		'onboarding',
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

/**
 * Mark every block that sits right before a White Section.
 *
 * The design fades a section's body out as it scrolls away (`.anim-scroll`) exactly
 * when the next section is a `.frame-colored` White Section. A block's render
 * callback cannot see its siblings, so this runs on the raw content before
 * `do_blocks()` (priority 9) — the same parse → mark → serialize pass core's block
 * hooks make at this priority — and flags each such block with the internal
 * `overchainBeforeWhite` attribute. It is not in any block.json: WordPress passes
 * comment attributes through to the render callback regardless, and the flag never
 * reaches saved content. Read it with overchain_blocks_fade_class().
 *
 * @param string $content Post content.
 * @return string
 */
function overchain_blocks_mark_before_white( $content ) {
	if ( ! is_string( $content ) || ! has_block( 'overchain/white-section', $content ) ) {
		return $content;
	}

	$blocks = parse_blocks( $content );
	overchain_blocks_mark_before_white_siblings( $blocks );

	return serialize_blocks( $blocks );
}
add_filter( 'the_content', 'overchain_blocks_mark_before_white', 8 );

/**
 * Walk one list of sibling blocks (and, recursively, every inner list).
 *
 * Whitespace-only freeform chunks between blocks are skipped; a freeform chunk with
 * real HTML in it breaks the adjacency, since it renders between the two.
 *
 * @param array $blocks Parsed blocks, modified in place.
 */
function overchain_blocks_mark_before_white_siblings( array &$blocks ) {
	$previous = null;

	foreach ( array_keys( $blocks ) as $index ) {
		$name = $blocks[ $index ]['blockName'] ?? null;

		if ( empty( $name ) ) {
			if ( '' !== trim( (string) ( $blocks[ $index ]['innerHTML'] ?? '' ) ) ) {
				$previous = null;
			}

			continue;
		}

		if ( 'overchain/white-section' === $name && null !== $previous ) {
			$blocks[ $previous ]['attrs']['overchainBeforeWhite'] = true;
		}

		if ( ! empty( $blocks[ $index ]['innerBlocks'] ) ) {
			overchain_blocks_mark_before_white_siblings( $blocks[ $index ]['innerBlocks'] );
		}

		$previous = $index;
	}
}

/**
 * The scroll-fade class for a section body, or an empty string.
 *
 * On when overchain_blocks_mark_before_white() flagged the block (a White Section
 * follows it), unless the editor switched it off with `disableWhiteFade`.
 *
 * @param array $attributes Block attributes.
 * @return string ` anim-scroll` or ``.
 */
function overchain_blocks_fade_class( array $attributes ): string {
	return ! empty( $attributes['overchainBeforeWhite'] ) && empty( $attributes['disableWhiteFade'] )
		? ' anim-scroll'
		: '';
}

/**
 * Number InnerBlocks cards for a staggered reveal.
 *
 * The design's reveal animations (`.anim-cards`, threshold lists) delay each card by
 * `calc(var(--i) * …)`, with `style="--i: N"` written on every card. A child block's
 * render callback cannot know its own position among siblings, so the parent numbers
 * them here, in the already rendered `$content`. Without `--i` the `calc()` is invalid
 * and the card simply does not animate.
 *
 * Matches `<li>` elements carrying `$class_name`; an existing inline style is kept.
 *
 * @param string $html       Rendered inner blocks.
 * @param string $class_name Root class of the child card, e.g. `card-feature`.
 * @param int    $start      Value of the first card.
 * @return string
 */
function overchain_blocks_stagger( string $html, string $class_name, int $start = 0 ): string {
	if ( '' === $html || ! class_exists( 'WP_HTML_Tag_Processor' ) ) {
		return $html;
	}

	$processor = new WP_HTML_Tag_Processor( $html );
	$index     = $start;

	while ( $processor->next_tag( array( 'tag_name' => 'LI', 'class_name' => $class_name ) ) ) {
		$style = trim( (string) $processor->get_attribute( 'style' ) );
		$var   = '--i: ' . $index;

		$processor->set_attribute( 'style', '' === $style ? $var : rtrim( $style, '; ' ) . '; ' . $var );
		++$index;
	}

	return $processor->get_updated_html();
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
		'Book a meeting with Overchain',
		'Days',
		'Hours',
		'Min',
		'Sec',
	) as $string ) {
		pll_register_string( $string, $string, 'Overchain Blocks', false );
	}
} );


/**
 * Section anchor: an `id` on any top-level Overchain block, for anchor menus
 * (the FM London landing links `#understand-fm-london`, `#delays-fm-london`, …).
 *
 * One mechanism for every section block instead of an attribute per block.json:
 * - editor: a `blocks.registerBlockType` filter adds the `anchor` attribute to
 *   every `overchain/*` block that has no `parent`, and an `editor.BlockEdit`
 *   filter adds an "Anchor" field to its sidebar. Printed inline after `wp-blocks`
 *   so it runs before any block script registers (each index.js spreads its own
 *   block.json, which would otherwise replace server-side attributes);
 * - front end: overchain_blocks_section_anchor_render() writes the id onto the
 *   block's first element (the `<section>` or Frame wrapper) — no Blade changes.
 */
function overchain_blocks_section_anchor_editor() {
	wp_add_inline_script(
		'wp-blocks',
		<<<'JS'
( function () {
	var isSection = function ( name, settings ) {
		return 0 === name.indexOf( 'overchain/' ) && ! ( settings.parent && settings.parent.length );
	};

	wp.hooks.addFilter( 'blocks.registerBlockType', 'overchain-blocks/section-anchor', function ( settings, name ) {
		if ( ! isSection( name, settings ) ) {
			return settings;
		}
		return Object.assign( {}, settings, {
			attributes: Object.assign( {}, settings.attributes, { anchor: { type: 'string', default: '' } } ),
		} );
	} );

	wp.hooks.addFilter( 'editor.BlockEdit', 'overchain-blocks/section-anchor', function ( BlockEdit ) {
		return function ( props ) {
			var el = wp.element.createElement;
			var type = wp.blocks.getBlockType( props.name );

			if ( ! type || ! isSection( props.name, type ) ) {
				return el( BlockEdit, props );
			}

			return el(
				wp.element.Fragment,
				null,
				el( BlockEdit, props ),
				el(
					wp.blockEditor.InspectorControls,
					{ group: 'advanced' },
					el( wp.components.TextControl, {
						label: wp.i18n.__( 'Section anchor (id)', 'overchain-blocks' ),
						help: wp.i18n.__( 'Without #. Menu links point to it as #anchor.', 'overchain-blocks' ),
						value: props.attributes.anchor || '',
						onChange: function ( value ) {
							props.setAttributes( { anchor: value.replace( /^#/, '' ).trim() } );
						},
						__nextHasNoMarginBottom: true,
					} )
				)
			);
		};
	} );
} )();
JS
		,
		'after'
	);
}

/**
 * Print a top-level Overchain block's `anchor` as the `id` of its first element.
 *
 * @param string $html  Rendered block.
 * @param array  $block Parsed block.
 * @return string
 */
function overchain_blocks_section_anchor_render( $html, $block ) {
	$anchor = sanitize_title( (string) ( $block['attrs']['anchor'] ?? '' ) );

	if ( '' === $anchor || '' === trim( $html ) || 0 !== strpos( (string) ( $block['blockName'] ?? '' ), 'overchain/' ) || ! class_exists( 'WP_HTML_Tag_Processor' ) ) {
		return $html;
	}

	$processor = new WP_HTML_Tag_Processor( $html );

	if ( $processor->next_tag() && null === $processor->get_attribute( 'id' ) ) {
		$processor->set_attribute( 'id', $anchor );
	}

	return $processor->get_updated_html();
}

/**
 * Filter pasted form embed code (Booking Form block) down to embed markup.
 *
 * Form services hand out an `<iframe>` or a `<script>` loader with a container
 * `<div>`. Those tags pass with the attributes embeds use; anything else (event
 * handlers, `javascript:` URLs, other elements) is stripped. Inline script bodies
 * are kept — that is how most loaders work — so the block is for trusted editors.
 *
 * @param string $code Raw embed code.
 * @return string Filtered HTML, safe to print as is.
 */
function overchain_blocks_embed_code( string $code ): string {
	if ( '' === trim( $code ) ) {
		return '';
	}

	$common = array(
		'id'    => true,
		'class' => true,
		'style' => true,
		'title' => true,
	);

	$allowed = array(
		'iframe'   => $common + array(
			'src'             => true,
			'width'           => true,
			'height'          => true,
			'name'            => true,
			'allow'           => true,
			'allowfullscreen' => true,
			'frameborder'     => true,
			'scrolling'       => true,
			'loading'         => true,
			'referrerpolicy'  => true,
			'sandbox'         => true,
		),
		'script'   => array(
			'src'            => true,
			'type'           => true,
			'async'          => true,
			'defer'          => true,
			'charset'        => true,
			'id'             => true,
			'crossorigin'    => true,
			'integrity'      => true,
			'referrerpolicy' => true,
			'data-*'         => true,
		),
		'div'      => $common + array( 'data-*' => true ),
		'span'     => $common + array( 'data-*' => true ),
		'noscript' => array(),
		'p'        => $common,
		'a'        => $common + array(
			'href'   => true,
			'target' => true,
			'rel'    => true,
		),
		'br'       => array(),
	);

	return wp_kses( $code, $allowed );
}
