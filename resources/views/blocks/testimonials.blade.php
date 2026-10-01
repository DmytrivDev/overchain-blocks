@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title        = $attributes['title'] ?? '';
	$imageUrl     = $attributes['imageUrl'] ?? '';

	$sectionClass = 'testimonials ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="testimonials__container">
		<div class="testimonials__wrap section-wrap">
			<div class="testimonials__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
				@if ( ! empty( $title ) )
					<div class="heading">
						<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
					</div>
				@endif

				<div class="testimonials__main">
					@if ( ! empty( $imageUrl ) )
						<div class="testimonials__img ibg">
							<img src="{{ esc_url( $imageUrl ) }}" alt="">
						</div>
					@endif

					<div class="testimonials__window">
						<div class="testimonials__splide">
							<div class="splide" data-lock>
								<div class="splide__track">
									<ul class="splide__list">
										{!! $content !!}
									</ul>
								</div>
							</div>

							@include( 'partials.drag-arrow' )

							@include( 'partials.splide-arrows' )
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
