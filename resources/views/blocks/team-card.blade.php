@php
	$name      = $attributes['name'] ?? '';
	$role      = $attributes['role'] ?? '';
	$avatarUrl = $attributes['avatarUrl'] ?? '';

	// The 2026-10 design drop removed the intro text card (`.card-understand.intro`)
	// and its styles. `variant` is no longer in block.json, but WordPress still passes
	// attributes stored in the block comment, so cards saved as intro would otherwise
	// render as an empty person card. Print nothing until an editor deletes them.
	$isLegacyIntro = 'intro' === ( $attributes['variant'] ?? '' );

	// A person with no photo falls back to the centred placeholder icon. Inside a
	// White Section the Team turns on "Light photo placeholders" (block context):
	// the light card (`card-understand-def`) and the dark icon.
	$light = empty( $avatarUrl ) && ! empty( $block->context['overchain/teamLightPlaceholders'] ?? false );
	$defaultIconUrl = get_template_directory_uri() . '/assets/img/icons/' . ( $light ? 'ava_def_2' : 'ava_def_1' ) . '.svg';
@endphp

@if ( ! $isLegacyIntro )
	<li class="splide__slide card-understand{{ $light ? ' card-understand-def' : '' }}">
		@if ( ! empty( $avatarUrl ) )
			<div class="card-understand__img ibg no-select">
				<img src="{{ esc_url( $avatarUrl ) }}" alt="" loading="lazy" decoding="async">
			</div>
		@else
			<div class="card-understand__icon no-select" aria-hidden="true">
				<img src="{{ esc_url( $defaultIconUrl ) }}" alt="">
			</div>
		@endif

		<div class="card-understand__content">
			@if ( ! empty( $name ) )
				<h3 class="card-understand__name">{{ esc_html( wp_strip_all_tags( $name ) ) }}</h3>
			@endif

			@if ( ! empty( $role ) )
				<p class="card-understand__role">{{ esc_html( wp_strip_all_tags( $role ) ) }}</p>
			@endif
		</div>
	</li>
@endif
