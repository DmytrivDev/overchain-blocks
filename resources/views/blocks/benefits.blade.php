@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title        = $attributes['title'] ?? '';
	$sectionClass = 'delays ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="delays__container">
		<div class="delays__wrap section-wrap{{ overchain_blocks_fade_class( $attributes ) }}">
			<div class="delays__body section-body">
				@if ( ! empty( $title ) )
					<div class="heading aic">
						<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
					</div>
				@endif

				@if ( '' !== trim( $content ) )
					<ul class="delays__cards anim-cards" role="list" data-threshold-desktop="0.3">
						{!! overchain_blocks_stagger( $content, 'card-delays' ) !!}
					</ul>
				@endif

				@include( 'partials.btn-icon', [
					'text' => $attributes['buttonText'] ?? '',
					'type' => $attributes['buttonType'] ?? 'link',
					'link' => $attributes['buttonLink'] ?? '',
					'newTab' => $attributes['buttonLinkNewTab'] ?? false,
					'anchor' => $attributes['buttonAnchor'] ?? '',
					'popupId' => $attributes['buttonPopupId'] ?? '',
					'icon' => $attributes['buttonIcon'] ?? 'calendar',
					'class' => 'delays__btn',
				] )
			</div>
		</div>
	</div>
</section>
