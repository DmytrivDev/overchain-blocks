@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title        = $attributes['title'] ?? '';
	$text         = $attributes['text'] ?? '';

	$sectionClass = 'understand ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="understand__container">
		<div class="understand__wrap section-wrap">
			<div class="understand__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
				@if ( ! empty( $title ) || ! empty( $text ) )
					<div class="heading{{ ! empty( $attributes['centerHeading'] ) ? ' aic' : '' }}">
						@if ( ! empty( $title ) )
							<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
						@endif

						@if ( ! empty( $text ) )
							<div class="txt2">
								<p>{!! wp_kses_post( $text ) !!}</p>
							</div>
						@endif
					</div>
				@endif

				<div class="understand__splide">
					<div class="splide" data-lock>
						<div class="splide__track">
							<ul class="splide__list">
								{!! $content !!}
							</ul>
						</div>
					</div>

					@include( 'partials.drag-arrow' )
				</div>
			</div>
		</div>
	</div>
</section>
