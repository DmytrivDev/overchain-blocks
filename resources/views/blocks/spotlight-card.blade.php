@php
	$iconUrl = $attributes['iconUrl'] ?? '';
	$title   = $attributes['title'] ?? '';
	$text    = $attributes['text'] ?? '';
@endphp

<li class="item-control">
	@if ( ! empty( $iconUrl ) )
		<div class="item-control__icon">
			<img src="{{ esc_url( $iconUrl ) }}" alt="">
		</div>
	@endif

	<div class="item-control__box">
		@if ( ! empty( $title ) )
			<h3 class="tl4">{!! wp_kses_post( $title ) !!}</h3>
		@endif

		@if ( ! empty( $text ) )
			<div class="txt3 col-alt1 light">
				<p>{!! wp_kses_post( $text ) !!}</p>
			</div>
		@endif
	</div>
</li>