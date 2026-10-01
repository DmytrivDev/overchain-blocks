@php
	$iconUrl = $attributes['iconUrl'] ?? '';
	$title   = $attributes['title'] ?? '';
	$text    = $attributes['text'] ?? '';
@endphp

<li class="card-manage">
	@if ( ! empty( $iconUrl ) || ! empty( $title ) )
		<div class="card-manage__head">
			@if ( ! empty( $iconUrl ) )
				<div class="card-manage__icon">
					<img src="{{ esc_url( $iconUrl ) }}" alt="">
				</div>
			@endif

			@if ( ! empty( $title ) )
				<h3 class="tl5">{!! wp_kses_post( $title ) !!}</h3>
			@endif
		</div>
	@endif

	@if ( ! empty( $text ) )
		<div class="card-manage__desc txt3 light">
			<p>{!! wp_kses_post( $text ) !!}</p>
		</div>
	@endif

	{{-- The design's button carries `btn_2.svg`, which is `buttonIcon = 'arrow'` in
	     the shared partial — no block-specific logic needed. --}}
	@include( 'partials.btn-icon', [
		'text' => $attributes['buttonText'] ?? '',
		'type' => $attributes['buttonType'] ?? 'link',
		'link' => $attributes['buttonLink'] ?? '',
		'newTab' => $attributes['buttonLinkNewTab'] ?? false,
		'anchor' => $attributes['buttonAnchor'] ?? '',
		'popupId' => $attributes['buttonPopupId'] ?? '',
		'icon' => $attributes['buttonIcon'] ?? 'arrow',
		'class' => 'card-manage__btn',
	] )
</li>
