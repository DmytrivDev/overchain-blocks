@php
	$iconUrl = $attributes['iconUrl'] ?? '';
	$title   = $attributes['title'] ?? '';
	$text    = $attributes['text'] ?? '';
	$decor   = $attributes['decor'] ?? 'none';

	// Fixed theme assets: the background is identical on every card, and the two decor
	// images are a fixed pair. `decor` picks one — it is a field on the card, not a
	// function of its position, so reordering cards never moves the decor.
	$cardBgUrl = get_template_directory_uri() . '/assets/img/decor/connect_bg_1.png';

	$decorUrls = [
		'img1' => get_template_directory_uri() . '/assets/img/content/connect_img_1.png',
		'img2' => get_template_directory_uri() . '/assets/img/content/connect_img_2.png',
	];

	$decorUrl = $decorUrls[ $decor ] ?? '';
@endphp

<li class="card-connect">
	<div class="card-connect__bg ibg no-select" aria-hidden="true">
		<img src="{{ esc_url( $cardBgUrl ) }}" alt="" loading="lazy" decoding="async">
	</div>

	@if ( ! empty( $decorUrl ) )
		{{-- `img1`/`img2` always ride alongside the base class: the base gives only
		     `position: absolute`, the coordinates live on the modifier. --}}
		<div class="card-connect__img {{ esc_attr( $decor ) }} no-select" aria-hidden="true">
			<img src="{{ esc_url( $decorUrl ) }}" alt="" loading="lazy" decoding="async">
		</div>
	@endif

	@if ( ! empty( $iconUrl ) )
		<div class="card-connect__icon">
			<img src="{{ esc_url( $iconUrl ) }}" alt="">
		</div>
	@endif

	@if ( ! empty( $title ) || ! empty( $text ) )
		<div class="card-connect__content">
			@if ( ! empty( $title ) )
				<h3 class="tl5">{!! wp_kses_post( $title ) !!}</h3>
			@endif

			@if ( ! empty( $text ) )
				<div class="card-connect__desc txt3 light col-alt1">
					<p>{!! wp_kses_post( $text ) !!}</p>
				</div>
			@endif
		</div>
	@endif
</li>
