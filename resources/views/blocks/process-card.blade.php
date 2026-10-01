@php
	$iconUrl = $attributes['iconUrl'] ?? '';
	$title   = $attributes['title'] ?? '';
	$text    = $attributes['text'] ?? '';

	// Identical on all seven slides in the design — fixed theme asset, not an attribute.
	$cardBgUrl = get_template_directory_uri() . '/assets/img/decor/accept_bg_1.jpg';
@endphp

<li class="splide__slide card-accept">
	<div class="card-accept__bg ibg no-select" aria-hidden="true">
		<img src="{{ esc_url( $cardBgUrl ) }}" alt="" loading="lazy" decoding="async">
	</div>

	@if ( ! empty( $title ) || ! empty( $text ) )
		<div class="card-accept__content">
			{{-- `h2`, not `h3`: the section has no heading of its own, so each step is a
			     top-level item. Styling comes from `.card-accept__content .tl5`. --}}
			@if ( ! empty( $title ) )
				<h2 class="tl5">{!! wp_kses_post( $title ) !!}</h2>
			@endif

			@if ( ! empty( $text ) )
				<div class="card-accept__desc txt3 light">
					<p>{!! wp_kses_post( $text ) !!}</p>
				</div>
			@endif
		</div>
	@endif

	{{-- Last in the DOM on purpose: `margin-block-start: auto` pins it to the bottom. --}}
	@if ( ! empty( $iconUrl ) )
		<div class="card-accept__icon">
			<img src="{{ esc_url( $iconUrl ) }}" alt="">
		</div>
	@endif
</li>
