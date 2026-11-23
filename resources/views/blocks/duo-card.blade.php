@php
	$iconUrl = $attributes['iconUrl'] ?? '';
	$title   = $attributes['title'] ?? '';
	$text    = $attributes['text'] ?? '';
	// Duo's three-column variant (block context) drops the light weight of the text.
	$textClass = ! empty( $block->context['overchain/duoThreeColumns'] ?? false ) ? 'txt4 col-alt1' : 'txt4 col-alt1 light';
@endphp

<li class="card-funds">
	<div class="card-funds__inner">
		<div class="card-funds__box">
			@if ( ! empty( $title ) )
				<h3 class="tl4">{!! wp_kses_post( $title ) !!}</h3>
			@endif

			@if ( ! empty( $text ) )
				<div class="{{ $textClass }}">
					<p>{!! wp_kses_post( $text ) !!}</p>
				</div>
			@endif
		</div>

		@if ( ! empty( $iconUrl ) )
			<div class="card-funds__icon">
				<img src="{{ esc_url( $iconUrl ) }}" alt="">
			</div>
		@endif
	</div>
</li>