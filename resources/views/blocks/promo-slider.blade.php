@php
	$noPaddingTop     = $attributes['noPaddingTop'] ?? false;
	$enableBackground = $attributes['enableBackground'] ?? true;
	$title        = $attributes['title'] ?? '';
	$text         = $attributes['text'] ?? '';
	$textAlt      = $attributes['textAlt'] ?? '';
	// The block ships one empty slide by default so the editor has something to show.
	// Drop anything without a picture, or the front renders an empty slider that
	// Splide still initialises on.
	$slides = array_values(
		array_filter(
			$attributes['slides'] ?? [],
			static function ( $slide ) {
				return ! empty( $slide['imageUrl'] );
			}
		)
	);

	$sectionClass = 'infrastruct mailing ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
	$bgUrl = get_template_directory_uri() . '/assets/img/decor/infrastruct_bg_1.jpg';
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="infrastruct__container">
		<div class="infrastruct__wrap section-wrap">

			@if ( $enableBackground )
				<div class="infrastruct__bg no-select" aria-hidden="true">
					<img src="{{ esc_url( $bgUrl ) }}" alt="">
				</div>
			@endif

			<div class="infrastruct__body section-body with-splide pis2{{ overchain_blocks_fade_class( $attributes ) }}">
				<div class="infrastruct__content">
					@if ( ! empty( $title ) )
						<h2 class="tl3 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
					@endif

					@if ( ! empty( $text ) )
						<div class="txt2 medium">
							<p>{!! wp_kses_post( $text ) !!}</p>
						</div>
					@endif

					@if ( ! empty( $textAlt ) )
						<div class="txt4">
							<p>{!! wp_kses_post( $textAlt ) !!}</p>
						</div>
					@endif

					@include( 'partials.btn-icon', [
						'text' => $attributes['buttonText'] ?? '',
						'type' => $attributes['buttonType'] ?? 'link',
						'link' => $attributes['buttonLink'] ?? '',
						'newTab' => $attributes['buttonLinkNewTab'] ?? false,
						'anchor' => $attributes['buttonAnchor'] ?? '',
						'popupId' => $attributes['buttonPopupId'] ?? '',
						'icon' => $attributes['buttonIcon'] ?? 'arrow',
					] )
				</div>

				@if ( ! empty( $slides ) )
					<div class="infrastruct__splide">
						<div class="splide" data-lock>
							<div class="splide__track">
								<ul class="splide__list">
									@foreach ( $slides as $slide )
										<li class="splide__slide splide-infrastruct ibg">
											<img src="{{ esc_url( $slide['imageUrl'] ) }}" alt="">
										</li>
									@endforeach
								</ul>
							</div>
						</div>
					</div>
				@endif
			</div>
		</div>
	</div>
</section>
