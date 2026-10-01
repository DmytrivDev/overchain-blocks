@php
	// Prev/next pair over a Splide slider's edge. Since the 2026-10 design drop the
	// round `.drag-arrow` is two real buttons instead of a decorative circle: the icon
	// moved from `.drag-arrow:before` onto `__prev` / `__next`, and the theme's
	// `splide-sett.js` binds `go('<')` / `go('>')` to them. With `data-lock` on the
	// `.splide`, the script hides the whole pair when every slide already fits.
	//
	// The theme carries the same markup in `template-parts/ui/drag-arrow.php` for its
	// own sliders (cases) — keep the two in step.
	$prevLabel = function_exists( 'pll__' )
		? pll__( 'Previous slide' )
		: __( 'Previous slide', 'overchain-blocks' );

	$nextLabel = function_exists( 'pll__' )
		? pll__( 'Next slide' )
		: __( 'Next slide', 'overchain-blocks' );
@endphp

<div class="drag-arrow">
	<button type="button" class="drag-arrow__prev" aria-label="{{ esc_attr( $prevLabel ) }}"></button>
	<button type="button" class="drag-arrow__next" aria-label="{{ esc_attr( $nextLabel ) }}"></button>
</div>
