@php
	$title    = $attributes['title'] ?? '';
	$text     = $attributes['text'] ?? '';
	$wide     = ! empty( $attributes['wide'] );
	$imageUrl = $attributes['imageUrl'] ?? '';
@endphp

{{-- `--i` for the staggered reveal is added by the parent (overchain_blocks_stagger()).
     A wide card spans two columns; only wide cards show the image. --}}
<li class="card-delays{{ $wide ? ' wide' : '' }}">
	@if ( $wide && ! empty( $imageUrl ) )
		<div class="card-delays__img no-select" aria-hidden="true">
			<img src="{{ esc_url( $imageUrl ) }}" alt="" loading="lazy" decoding="async">
		</div>
	@endif

	@if ( ! empty( $title ) )
		<h3 class="tl4">{!! wp_kses_post( $title ) !!}</h3>
	@endif

	@if ( ! empty( $text ) )
		<div class="txt2">
			<p>{!! wp_kses_post( $text ) !!}</p>
		</div>
	@endif
</li>
