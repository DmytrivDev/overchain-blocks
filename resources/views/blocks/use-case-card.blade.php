@php
	$title    = $attributes['title'] ?? '';
	$text     = $attributes['text'] ?? '';
	$imageUrl = $attributes['imageUrl'] ?? '';
@endphp

{{-- `--i` for the staggered reveal is added by the parent (overchain_blocks_stagger()). --}}
<li class="card-institution">
	{{-- The glow is the design's fixed artwork, shipped in the theme. --}}
	<div class="card-institution__blur no-select" aria-hidden="true">
		<img src="{{ esc_url( get_template_directory_uri() . '/assets/img/decor/institution_blur_1.webp' ) }}" alt="" loading="lazy" decoding="async">
	</div>

	@if ( ! empty( $title ) )
		<h3 class="tl4">{!! wp_kses_post( $title ) !!}</h3>
	@endif

	@if ( ! empty( $text ) )
		<div class="txt3 col-alt1">
			<p>{!! wp_kses_post( $text ) !!}</p>
		</div>
	@endif

	@if ( ! empty( $imageUrl ) )
		<div class="card-institution__img no-select" aria-hidden="true">
			<img src="{{ esc_url( $imageUrl ) }}" alt="" loading="lazy" decoding="async">
		</div>
	@endif
</li>
