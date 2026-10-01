@php
	$iconUrl = $attributes['iconUrl'] ?? '';
	$title   = $attributes['title'] ?? '';
	$text    = $attributes['text'] ?? '';
@endphp

<li class="item-everything">
	@if ( ! empty( $iconUrl ) )
		<div class="item-everything__icon">
			<img src="{{ esc_url( $iconUrl ) }}" alt="">
		</div>
	@endif

	@if ( ! empty( $title ) )
		<h3 class="tl5">{!! wp_kses_post( $title ) !!}</h3>
	@endif

	@if ( ! empty( $text ) )
		<div class="item-everything__desc txt4 light col-alt1">
			<p>{!! wp_kses_post( $text ) !!}</p>
		</div>
	@endif
</li>
