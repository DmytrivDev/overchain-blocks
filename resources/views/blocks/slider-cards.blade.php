@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title        = $attributes['title'] ?? '';

	$sectionClass = 'businesses ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="businesses__container">
		<div class="businesses__body section-body">
			@if ( ! empty( $title ) )
				<div class="heading">
					<h2 class="tl2">{!! wp_kses_post( $title ) !!}</h2>
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

				<div class="drag-arrow" aria-hidden="true"></div>
			</div>
		</div>
	</div>
</section>