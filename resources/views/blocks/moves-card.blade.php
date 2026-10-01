@php
	$variant  = $attributes['variant'] ?? 'default';
	$iconUrl  = $attributes['iconUrl'] ?? '';
	$imageUrl = $attributes['imageUrl'] ?? '';
	$title    = $attributes['title'] ?? '';
	$text     = $attributes['text'] ?? '';

	// Whitelisted: the variant becomes a CSS class, and hand-edited block markup must
	// not be able to put an arbitrary string in the class attribute.
	if ( ! in_array( $variant, [ 'wide', 'tall-first', 'tall-last' ], true ) ) {
		$variant = 'default';
	}

	$isTall = in_array( $variant, [ 'tall-first', 'tall-last' ], true );

	// The variant is a grid-placement modifier; it always rides alongside the base
	// class, which carries everything but the cell coordinates.
	$cardClass = 'card-moves' . ( 'default' !== $variant ? ' ' . $variant : '' );

	// Only `wide` has a background, and it is the same image on both pages that use
	// the section — a fixed theme asset, not an attribute. The tall cards' images do
	// differ between pages, so those stay uploadable.
	$wideBgUrl = get_template_directory_uri() . '/assets/img/decor/moves_bg_1.jpg';
@endphp

<li class="{{ esc_attr( $cardClass ) }}">
	@if ( 'wide' === $variant )
		<div class="card-moves__bg ibg no-select" aria-hidden="true">
			<img src="{{ esc_url( $wideBgUrl ) }}" alt="" loading="lazy" decoding="async">
		</div>
	@endif

	@if ( $isTall && ! empty( $imageUrl ) )
		<div class="card-moves__img no-select" aria-hidden="true">
			<img src="{{ esc_url( $imageUrl ) }}" alt="" loading="lazy" decoding="async">
		</div>
	@endif

	{{-- The icon is independent of the variant: move-money's wide card has none,
	     control-treasury's has one. --}}
	@if ( ! empty( $iconUrl ) )
		<div class="card-moves__icon">
			<img src="{{ esc_url( $iconUrl ) }}" alt="">
		</div>
	@endif

	@if ( ! empty( $title ) || ! empty( $text ) )
		<div class="card-moves__content">
			@if ( ! empty( $title ) )
				<h3 class="tl5">{!! wp_kses_post( $title ) !!}</h3>
			@endif

			@if ( ! empty( $text ) )
				<div class="card-moves__desc txt3 light">
					<p>{!! wp_kses_post( $text ) !!}</p>
				</div>
			@endif
		</div>
	@endif
</li>
