@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$enableDecor = $attributes['enableDecor'] ?? false;
	$title = $attributes['title'] ?? '';

	$sectionClass = 'compliant ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
	$decorUrl     = get_template_directory_uri() . '/assets/img/decor/oneflow_dec_1.jpg';
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="compliant__container">
		<div class="compliant__wrap">
			@if ( $enableDecor )
				<div class="compliant__decor decor1 no-select" aria-hidden="true">
					<img src="{{ esc_url( $decorUrl ) }}" alt="">
				</div>
			@endif
			<div class="compliant__body section-body">
				@if ( ! empty( $title ) )
					<div class="heading aic">
						<h2 class="tl2">{!! wp_kses_post( $title ) !!}</h2>
					</div>
				@endif

				<ul class="compliant__cards">
					{!! $content !!}
				</ul>

				@include( 'partials.btn-icon', [
					'text' => $attributes['buttonText'] ?? '',
					'type' => $attributes['buttonType'] ?? 'link',
					'link' => $attributes['buttonLink'] ?? '',
					'newTab' => $attributes['buttonLinkNewTab'] ?? false,
					'anchor' => $attributes['buttonAnchor'] ?? '',
					'popupId' => $attributes['buttonPopupId'] ?? '',
					'icon' => $attributes['buttonIcon'] ?? 'calendar',
					'class' => 'compliant__btn',
				] )
            </div>
        </div>
    </div>
</section>