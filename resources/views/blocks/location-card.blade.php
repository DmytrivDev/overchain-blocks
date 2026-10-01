@php
	$imageUrl = $attributes['imageUrl'] ?? '';
	$label    = $attributes['label'] ?? '';
	$tag      = $attributes['tag'] ?? '';
@endphp

<li class="card-operations">
	@if ( ! empty( $imageUrl ) )
		<div class="card-operations__img ibg no-select" aria-hidden="true">
			<img src="{{ esc_url( $imageUrl ) }}" alt="">
		</div>
	@endif

	@if ( ! empty( $label ) || ! empty( $tag ) )
		<div class="card-operations__badge">
			@if ( ! empty( $label ) )
				<p>{{ esc_html( wp_strip_all_tags( $label ) ) }}</p>
			@endif

			@if ( ! empty( $tag ) )
				<span class="card-operations__tag">{{ esc_html( wp_strip_all_tags( $tag ) ) }}</span>
			@endif
		</div>
	@endif
</li>
