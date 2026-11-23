@php
	$iconUrl = $attributes['iconUrl'] ?? '';
	$title   = $attributes['title'] ?? '';
	$text    = $attributes['text'] ?? '';
@endphp

{{-- `--i` for the staggered reveal is added by the parent (overchain_blocks_stagger()). --}}
<li class="item-startright">
	@if ( ! empty( $iconUrl ) )
		<div class="item-startright__icon">
			<img src="{{ esc_url( $iconUrl ) }}" alt="">
		</div>
	@endif

	<div class="item-startright__box">
		@if ( ! empty( $title ) )
			<h3 class="item-startright__tl anim-head">{!! wp_kses_post( $title ) !!}</h3>
		@endif

		@if ( ! empty( $text ) )
			<div class="txt3">
				<p>{!! wp_kses_post( $text ) !!}</p>
			</div>
		@endif
	</div>
</li>
