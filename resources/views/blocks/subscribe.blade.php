@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title = $attributes['title'] ?? '';
	$subtitle = $attributes['subtitle'] ?? '';
	$privacy = $attributes['privacy'] ?? '';
	$imageUrl = $attributes['imageUrl'] ?? '';
	$mediaType = $attributes['mediaType'] ?? 'image';
	$slides = $attributes['slides'] ?? [];

	$isSlider = 'slider' === $mediaType;

	$sectionClass = 'infrastruct mailing ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );

	// The slider layout re-flows the whole body: extra body classes, no side image,
	// and the form moves down into __bottom. See events.html in the design build.
	$bodyClass = 'infrastruct__body section-body' . ( $isSlider ? ' with-splide pis2' : '' ) . overchain_blocks_fade_class( $attributes );

	$labelEmail = function_exists( 'pll__' ) ? pll__( 'Enter Your Email' ) : __( 'Enter Your Email', 'overchain' );
	$labelSubmit = function_exists( 'pll__' ) ? pll__( 'Subscribe' ) : __( 'Subscribe', 'overchain' );

	$successTitle = $attributes['successTitle'] ?? '';
	$successDesc = $attributes['successDesc'] ?? '';

	$formArgs = compact( 'labelEmail', 'labelSubmit', 'successTitle', 'successDesc' );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="infrastruct__container">
		<div class="infrastruct__wrap section-wrap">

			<div class="infrastruct__bg no-select" aria-hidden="true">
				<img src="{{ esc_url( get_template_directory_uri() . '/assets/img/decor/infrastruct_bg_1.jpg' ) }}"
					alt="">
			</div>

			<div class="{{ esc_attr( $bodyClass ) }}">

				@if ( ! $isSlider && ! empty( $imageUrl ) )
					<div class="infrastruct__img img1 mouse-prllx">
						<img src="{{ esc_url( $imageUrl ) }}" alt="">
					</div>
				@endif

				<div class="infrastruct__content">
					@if ( ! empty( $title ) )
						<h2 class="tl3 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
					@endif

					@if ( ! empty( $subtitle ) )
						<div class="txt2 medium">
							<p>{!! wp_kses_post( $subtitle ) !!}</p>
						</div>
					@endif

					@if ( ! $isSlider )
						@include( 'partials.subscribe-form', $formArgs )
					@endif
				</div>

				@if ( $isSlider && ! empty( $slides ) )
					<div class="infrastruct__splide">
						<div class="splide" data-lock>
							<div class="splide__track">
								<ul class="splide__list">
									@foreach ( $slides as $slide )
										@php $slideUrl = $slide['imageUrl'] ?? ''; @endphp

										@if ( ! empty( $slideUrl ) )
											<li class="splide__slide splide-infrastruct ibg">
												<img src="{{ esc_url( $slideUrl ) }}" alt="">
											</li>
										@endif
									@endforeach
								</ul>
							</div>
						</div>
					</div>
				@endif

				@if ( $isSlider || ! empty( $privacy ) )
					<div class="infrastruct__bottom">
						@if ( $isSlider )
							@include( 'partials.subscribe-form', $formArgs )
						@endif

						@if ( ! empty( $privacy ) )
							<div class="text">
								<p>{!! wp_kses_post( $privacy ) !!}</p>
							</div>
						@endif
					</div>
				@endif

			</div>
		</div>
	</div>
</section>
