@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title        = $attributes['title'] ?? '';
	$text         = $attributes['text'] ?? '';

	// `topSpacing` supersedes `noPaddingTop`; blocks saved before it existed fall back
	// to the two states that toggle produced. `none` is the design's third state — the
	// section carries no padding utility at all (integrations, platform-overview,
	// aviation, igaming).
	$topSpacing = $attributes['topSpacing'] ?? '';

	if ( '' === $topSpacing ) {
		$topSpacing = $noPaddingTop ? 'pbs4' : 'pbs2';
	}

	$sectionClass = 'feature' . ( 'none' === $topSpacing ? '' : ' ' . $topSpacing );

	// `.anim-scroll` (fade-out on scroll) when a White Section follows this block —
	// see overchain_blocks_fade_class().
	$bodyClass = 'feature__body section-body' . overchain_blocks_fade_class( $attributes );

	global $overchain_feature_card_index;
	$overchain_feature_card_index = 0;
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="feature__container">
		<div class="feature__wrap section-wrap">
			@if ( $attributes['enableBlur'] ?? true )
				<div class="feature__blur no-select" aria-hidden="true"></div>
			@endif

			<div class="{{ esc_attr( $bodyClass ) }}">
				{{-- The design's first section on a page has no heading at all, so the
				     wrapper goes with it rather than rendering empty. --}}
				@if ( ! empty( $title ) || ! empty( $text ) )
					<div class="heading">
						@if ( ! empty( $title ) )
							<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
						@endif

						@if ( ! empty( $text ) )
							<div class="txt2 col-alt1">
								<p>{!! wp_kses_post( $text ) !!}</p>
							</div>
						@endif
					</div>
				@endif

				<ul class="feature__cards anim-cards" data-threshold-desktop="0.3">
					{!! overchain_blocks_stagger( $content, 'card-feature' ) !!}
				</ul>
			</div>
		</div>
	</div>
</section>