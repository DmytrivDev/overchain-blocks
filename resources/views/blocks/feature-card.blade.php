@php
	$iconUrl = $attributes['iconUrl'] ?? '';
	$title   = $attributes['title'] ?? '';
	$text    = $attributes['text'] ?? '';

	global $overchain_feature_card_index;

	if ( ! isset( $overchain_feature_card_index ) ) {
		$overchain_feature_card_index = 0;
	}

	$overchain_feature_card_index++;

	$cardNumber = ( ( $overchain_feature_card_index - 1 ) % 4 ) + 1;
	$bgUrl      = get_template_directory_uri() . '/assets/img/decor/feature_blur_' . $cardNumber . '.webp';
@endphp

<li class="card-feature">
	<div class="card-feature__bg no-select" aria-hidden="true">
		<img src="{{ esc_url( $bgUrl ) }}" alt="">
	</div>

	@if ( ! empty( $iconUrl ) )
		<div class="card-feature__icon">
			<img src="{{ esc_url( $iconUrl ) }}" alt="">
		</div>
	@endif

	<div class="card-feature__box">
		@if ( ! empty( $title ) )
			<h2 class="tl5">{!! wp_kses_post( $title ) !!}</h2>
		@endif

		@if ( ! empty( $text ) )
			<div class="txt3 light">
				<p>{!! wp_kses_post( $text ) !!}</p>
			</div>
		@endif
	</div>
</li>