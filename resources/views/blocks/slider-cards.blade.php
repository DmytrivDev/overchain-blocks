@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title        = $attributes['title'] ?? '';
	$text         = $attributes['text'] ?? '';

	// The design centres this heading on every page that uses the section.
	$headingClass = 'heading' . ( ( $attributes['centerHeading'] ?? true ) ? ' aic' : '' );

	$sectionClass = 'businesses ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="businesses__container">
		<div class="businesses__wrap section-wrap">
			<div class="businesses__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
				@if ( ! empty( $title ) || ! empty( $text ) )
					<div class="{{ esc_attr( $headingClass ) }}">
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

				<div class="businesses__splide">
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