@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title        = $attributes['title'] ?? '';
	$text         = $attributes['text'] ?? '';

	// The logo strip that used to live here as a second layout is its own block now
	// — `overchain/logo-grid`. Saved content was converted, so nothing reaches this
	// template with a `layout` attribute any more.
	$sectionClass = 'funds ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="funds__container">
		<div class="funds__wrap section-wrap">
			<div class="funds__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
				<div class="heading">
					@if ( ! empty( $title ) )
						<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
					@endif

					@if ( ! empty( $text ) )
						<div class="txt2">
							<p>{!! wp_kses_post( $text ) !!}</p>
						</div>
					@endif
				</div>

				<ul class="funds__cards anim-cards" data-threshold-desktop="0.3">
					{!! overchain_blocks_stagger( $content, 'card-funds' ) !!}
				</ul>
			</div>
		</div>
	</div>
</section>
