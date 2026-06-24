@php
	$noPaddingTop  = $attributes['noPaddingTop'] ?? false;
	$title         = $attributes['title'] ?? '';
	$backgroundUrl = $attributes['backgroundUrl'] ?? '';

	$sectionClass = 'control ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="control__container">
		<div class="control__wrap">
			<div class="control__decor no-select" aria-hidden="true"></div>

			<div class="control__body section-body">
				@if ( ! empty( $title ) )
					<div class="heading">
						<h2 class="tl2">{!! wp_kses_post( $title ) !!}</h2>
					</div>
				@endif

				<ul class="control__list">
					{!! $content !!}
				</ul>

				@if ( ! empty( $backgroundUrl ) )
					<div class="control__img no-select" aria-hidden="true">
						<img src="{{ esc_url( $backgroundUrl ) }}" alt="">
					</div>
				@endif
			</div>
		</div>
	</div>
</section>