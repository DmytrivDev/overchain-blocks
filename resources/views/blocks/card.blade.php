@php
	$iconUrl = $attributes['iconUrl'] ?? '';
	$title   = $attributes['title'] ?? '';
	$text    = $attributes['text'] ?? '';
@endphp

<li class="card-compliant">
	@if ( ! empty( $iconUrl ) )
		<div class="card-compliant__icon">
			<img src="{{ esc_url( $iconUrl ) }}" alt="">
		</div>
	@endif

	<div class="card-compliant__box">
		@if ( ! empty( $title ) )
			<h3 class="tl5">{!! wp_kses_post( $title ) !!}</h3>
		@endif

		@if ( ! empty( $text ) )
			<div class="txt3 light">
				<p>{!! wp_kses_post( $text ) !!}</p>
			</div>
		@endif
	</div>
</li>