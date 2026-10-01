@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$enableImage  = $attributes['enableImage'] ?? true;
	$title        = $attributes['title'] ?? '';
	$text         = $attributes['text'] ?? '';
	$items        = $attributes['items'] ?? [];
	$imageUrl     = $attributes['imageUrl'] ?? '';

	$sectionClass = 'way ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );

	// A fallback, not a placeholder: with nothing uploaded the front renders the
	// design's own picture, which is what the canvas shows too. The toggle is
	// separate — the layer is decorative and sits at `z-index: -1` behind the list.
	if ( empty( $imageUrl ) ) {
		$imageUrl = get_template_directory_uri() . '/assets/img/content/way_img_1.png';
	}

	// Staggered reveal: blocks.css hides the subtitle, every item and the button
	// (`opacity: 0`) until `.way__body` gets `.is-threshold` from the theme's
	// threshold.js, which only watches elements carrying `data-threshold-desktop`.
	// `--i` orders them: subtitle 0, items 1…n, button n + 1 — as in the design.
	$labels = array_values( array_filter( array_map(
		static fn( $item ) => $item['label'] ?? '',
		is_array( $items ) ? $items : []
	) ) );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="way__container">
		<div class="way__wrap section-wrap">
			<div class="way__body section-body{{ overchain_blocks_fade_class( $attributes ) }}" data-threshold-desktop="0.5">
				@if ( ! empty( $title ) || ! empty( $text ) )
					<div class="heading aic mbe2">
						@if ( ! empty( $title ) )
							<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
						@endif

						@if ( ! empty( $text ) )
							<div class="txt2 col-alt1" style="--i: 0">
								<p>{!! wp_kses_post( $text ) !!}</p>
							</div>
						@endif
					</div>
				@endif

				<div class="way__content">
					@if ( $enableImage )
						<div class="way__img no-select" aria-hidden="true">
							<img src="{{ esc_url( $imageUrl ) }}" alt="">
						</div>
					@endif

					@if ( ! empty( $labels ) )
						<ul class="way__items">
							@foreach ( $labels as $index => $label )
								<li class="item-way" style="--i: {{ $index + 1 }}">
									<div class="item-way__box">
										<h3 class="tl5">{{ esc_html( $label ) }}</h3>
									</div>
								</li>
							@endforeach
						</ul>
					@endif

					@include( 'partials.btn-icon', [
						'text' => $attributes['buttonText'] ?? '',
						'type' => $attributes['buttonType'] ?? 'link',
						'link' => $attributes['buttonLink'] ?? '',
						'newTab' => $attributes['buttonLinkNewTab'] ?? false,
						'anchor' => $attributes['buttonAnchor'] ?? '',
						'popupId' => $attributes['buttonPopupId'] ?? '',
						'icon' => $attributes['buttonIcon'] ?? 'arrow',
						'class' => 'way__btn',
						'inlineStyle' => '--i: ' . ( count( $labels ) + 1 ),
					] )
				</div>
			</div>
		</div>
	</div>
</section>
