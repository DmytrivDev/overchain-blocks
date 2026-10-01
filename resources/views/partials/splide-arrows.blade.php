@php
	// Prev/next buttons for a Splide slider. The design ships this markup byte-for-byte
	// identical in `.accept` (move-money) and `.testimonials` (platform-overview), which
	// is why it lives here rather than in each block's template.
	//
	// The design's own aria-labels are "Arrows prev" / "Arrows next"; they are replaced
	// with real ones, since a screen reader announces the label, not the class.
	$class = $class ?? '';

	$prevLabel = function_exists( 'pll__' )
		? pll__( 'Previous slide' )
		: __( 'Previous slide', 'overchain-blocks' );

	$nextLabel = function_exists( 'pll__' )
		? pll__( 'Next slide' )
		: __( 'Next slide', 'overchain-blocks' );
@endphp

<div class="arrows{{ ! empty( $class ) ? ' ' . $class : '' }}">
	<div class="arrows__body">
		<button type="button" class="arrows__prev" aria-label="{{ esc_attr( $prevLabel ) }}">
			<span></span>
		</button>

		<button type="button" class="arrows__next" aria-label="{{ esc_attr( $nextLabel ) }}">
			<span></span>
		</button>
	</div>
</div>
