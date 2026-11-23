@php
	$date    = $attributes['date'] ?? '';
	$place   = $attributes['place'] ?? '';
	$title   = $attributes['title'] ?? '';
	$link    = $attributes['link'] ?? '';
	$text    = $attributes['text'] ?? '';
	$logoUrl = $attributes['logoUrl'] ?? '';

	// The card backdrop and the glow are the design's fixed artwork, shipped in the theme.
	$decor = get_template_directory_uri() . '/assets/img/decor/';
@endphp

<li class="card-events">
	<div class="card-events__aside">
		<div class="card-events__part">
			@if ( ! empty( $date ) )
				<h3 class="card-events__dates tl5">{!! wp_kses_post( $date ) !!}</h3>
			@endif
		</div>
		<div class="card-events__part">
			@if ( ! empty( $place ) )
				<p class="card-events__local">{!! wp_kses_post( $place ) !!}</p>
			@endif
		</div>
		<div class="card-events__dashed" aria-hidden="true"></div>
	</div>

	<div class="card-events__main">
		<div class="card-events__content">
			<div class="card-events__part">
				{{-- The design's headline is a link styled as a heading; without a link
				     it stays the same element, just not clickable. --}}
				@if ( ! empty( $title ) )
					<a @if ( ! empty( $link ) ) href="{{ esc_url( $link ) }}" @endif role="heading" aria-level="2" class="tl3">{!! wp_kses_post( $title ) !!}</a>
				@endif

				@if ( ! empty( $text ) )
					<div class="txt3 light">
						<p>{!! wp_kses_post( $text ) !!}</p>
					</div>
				@endif
			</div>
		</div>

		<div class="card-events__image">
			<div class="card-events__bg ibg no-select" aria-hidden="true">
				<img src="{{ esc_url( $decor . 'card-events_bg_1.jpg' ) }}" alt="">
			</div>
			@if ( ! empty( $logoUrl ) )
				<div class="card-events__img">
					<img src="{{ esc_url( $logoUrl ) }}" alt="">
				</div>
			@endif
		</div>
	</div>

	<div class="card-events__blur no-select" aria-hidden="true">
		<img src="{{ esc_url( $decor . 'settlement_blur_2.webp' ) }}" alt="">
	</div>
</li>
