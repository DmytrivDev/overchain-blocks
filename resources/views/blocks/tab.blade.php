@php
	$heading = $attributes['heading'] ?? '';
	$imageUrl = $attributes['imageUrl'] ?? '';
@endphp

<div class="settlement__content">
	@if ( ! empty( $heading ) )
		<div class="settlement__top">
			<h3 class="tl3 regular">{!! wp_kses_post( $heading ) !!}</h3>
		</div>
	@endif

	@if ( ! empty( $attributes['buttonText'] ?? '' ) )
		<div class="settlement__bottom">
			@include( 'partials.btn-icon', [
				'text' => $attributes['buttonText'] ?? '',
				'type' => $attributes['buttonType'] ?? 'link',
				'link' => $attributes['buttonLink'] ?? '',
				'newTab' => $attributes['buttonLinkNewTab'] ?? false,
				'anchor' => $attributes['buttonAnchor'] ?? '',
				'popupId' => $attributes['buttonPopupId'] ?? '',
				'icon' => $attributes['buttonIcon'] ?? 'calendar',
			] )
			</div>
	@endif
</div>

@if ( ! empty( $imageUrl ) )
	<div class="settlement__img">
		<img src="{{ esc_url( $imageUrl ) }}" alt="">
	</div>
@endif