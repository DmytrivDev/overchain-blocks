@php
	$iconUrl = $attributes['iconUrl'] ?? '';
	$title   = $attributes['title'] ?? '';
	$text    = $attributes['text'] ?? '';
@endphp

{{-- `--i` for the staggered reveal is added by the parent (overchain_blocks_stagger()). --}}
<li class="card-brokers">
	@if ( ! empty( $iconUrl ) )
		<div class="card-brokers__icon">
			<img src="{{ esc_url( $iconUrl ) }}" alt="">
		</div>
	@endif

	<div class="card-brokers__box">
		@if ( ! empty( $title ) )
			<h3 class="tl4 regular">{!! wp_kses_post( $title ) !!}</h3>
		@endif

		@if ( ! empty( $text ) )
			<div class="txt3 light col-alt1">
				<p>{!! wp_kses_post( $text ) !!}</p>
			</div>
		@endif
	</div>
</li>
