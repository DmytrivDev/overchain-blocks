@php
	$variant       = $attributes['variant'] ?? 'default';
	$iconUrl       = $attributes['iconUrl'] ?? '';
	$imageUrl      = $attributes['imageUrl'] ?? '';
	$backgroundUrl = $attributes['backgroundUrl'] ?? '';
	$title         = $attributes['title'] ?? '';
	$text          = $attributes['text'] ?? '';

	$isBig     = 'big' === $variant;
	$isImgTop  = 'img-top' === $variant;
	$usesImage = $isBig || $isImgTop;

	$cardClass = 'card-layer' . ( $isBig ? ' big' : '' ) . ( $isImgTop ? ' img-top' : '' );
@endphp

<li class="{{ esc_attr( $cardClass ) }}">
	@if ( $isBig && ! empty( $backgroundUrl ) )
		<div class="card-layer__bg ibg no-select" aria-hidden="true">
			<img src="{{ esc_url( $backgroundUrl ) }}" alt="">
		</div>
	@endif

	@if ( $usesImage )
		@if ( ! empty( $imageUrl ) )
			<div class="card-layer__img no-select" aria-hidden="true">
				<img src="{{ esc_url( $imageUrl ) }}" alt="">
			</div>
		@endif
	@elseif ( ! empty( $iconUrl ) )
		<div class="card-layer__icon">
			<img src="{{ esc_url( $iconUrl ) }}" alt="">
		</div>
	@endif

	<div class="card-layer__box">
		@if ( ! empty( $title ) )
			<h3 class="tl5">{!! wp_kses_post( $title ) !!}</h3>
		@endif

		@if ( ! empty( $text ) )
			<div class="txt4 light">
				<p>{!! wp_kses_post( $text ) !!}</p>
			</div>
		@endif
	</div>

	{{-- NOTE: "bpttom" is a typo in the design build, but the CSS matches it. Do not "fix" it. --}}
	@if ( $isBig && ! empty( $attributes['buttonText'] ?? '' ) )
		<div class="card-layer__bpttom">
			@include( 'partials.btn-def', [
				'text' => $attributes['buttonText'] ?? '',
				'type' => $attributes['buttonType'] ?? 'link',
				'link' => $attributes['buttonLink'] ?? '',
				'newTab' => $attributes['buttonLinkNewTab'] ?? false,
				'anchor' => $attributes['buttonAnchor'] ?? '',
				'popupId' => $attributes['buttonPopupId'] ?? '',
				'style' => 'stl-trn',
				'class' => 'card-layer__btn',
			] )
		</div>
	@endif
</li>
