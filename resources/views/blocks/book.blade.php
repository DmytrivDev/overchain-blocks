@php
	$title       = $attributes['title'] ?? '';
	// Empty = the design's default `pbs2`; `none` drops it (FM London's book.html,
	// a page that holds only the form).
	$topSpacing  = ( $attributes['topSpacing'] ?? '' ) ?: 'pbs2';
	$sectionClass = 'book' . ( 'none' === $topSpacing ? '' : ' ' . $topSpacing );
	// Pasted embed code wins; the form link is the fallback (main site) when none is pasted.
	$code        = overchain_blocks_embed_code( $attributes['code'] ?? '' );
	// Escaped up front so a URL esc_url() rejects (e.g. `javascript:`) prints no iframe at all.
	$iframeUrl   = esc_url( $attributes['iframeUrl'] ?? '' );
	$iframeTitle = function_exists( 'pll__' )
		? pll__( 'Book a meeting with Overchain' )
		: __( 'Book a meeting with Overchain', 'overchain-blocks' );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="book__container">
		<div class="book__wrap section-wrap">
			<div class="book__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
				@if ( ! empty( $title ) )
					<div class="heading aic">
						<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
					</div>
				@endif

				@if ( '' !== $code )
					{!! $code !!}
				@elseif ( ! empty( $iframeUrl ) )
					{{-- The inline size is the design's own (book.html), not an attribute. --}}
					<iframe
						src="{!! $iframeUrl !!}"
						title="{{ esc_attr( $iframeTitle ) }}"
						style="width: 100%; min-height: 940px; border: 0; display: block"
						loading="lazy"
					></iframe>
				@endif
			</div>
		</div>
	</div>
</section>
