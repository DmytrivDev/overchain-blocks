@php
	$quote     = $attributes['quote'] ?? '';
	$avatarUrl = $attributes['avatarUrl'] ?? '';
	$name      = $attributes['name'] ?? '';
	$role      = $attributes['role'] ?? '';

	// Identical on every slide in the design — fixed theme assets, not attributes.
	$cardBgUrl    = get_template_directory_uri() . '/assets/img/decor/testimonials_bg_1.jpg';
	$cardDecorUrl = get_template_directory_uri() . '/assets/img/decor/testimonials_decor_1.png';

	// An author with no photo falls back to a default avatar. `ava_def_2.svg` rather
	// than Team Card's `ava_def_1.svg`: this avatar is cropped by `ibg` (object-fit:
	// cover) with no CSS inset of its own, so the breathing room has to be built into
	// the artwork. Team Card insets its copy from CSS instead
	// (`.card-understand__ava.empty img { width: 3.5rem }`) and keeps the tighter file.
	$avatarUrl = ! empty( $avatarUrl )
		? $avatarUrl
		: get_template_directory_uri() . '/assets/img/icons/ava_def_2.svg';

	$hasAuthor = ! empty( $attributes['avatarUrl'] ?? '' ) || ! empty( $name ) || ! empty( $role );
@endphp

<li class="splide__slide card-testimonials">
	<div class="card-testimonials__bg ibg no-select" aria-hidden="true">
		<img src="{{ esc_url( $cardBgUrl ) }}" alt="">
	</div>

	<div class="card-testimonials__decor no-select" aria-hidden="true">
		<img src="{{ esc_url( $cardDecorUrl ) }}" alt="">
	</div>

	<div class="card-testimonials__content">
		@if ( ! empty( $quote ) )
			<h3 class="tl4">{!! wp_kses_post( $quote ) !!}</h3>
		@endif

		{{-- The avatar always has an image now, so the author row is gated on whether
		     there is an author at all — an untouched card stays empty. --}}
		@if ( $hasAuthor )
			<div class="card-testimonials__author">
				<div class="ava ibg">
					<img src="{{ esc_url( $avatarUrl ) }}" alt="">
				</div>

				<div class="person">
					@if ( ! empty( $name ) )
						<p>{{ esc_html( wp_strip_all_tags( $name ) ) }}</p>
					@endif

					@if ( ! empty( $role ) )
						<span>{{ esc_html( wp_strip_all_tags( $role ) ) }}</span>
					@endif
				</div>
			</div>
		@endif
	</div>
</li>
