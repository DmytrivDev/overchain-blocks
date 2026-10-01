@php
	$imageUrl = $attributes['imageUrl'] ?? '';
	$title    = $attributes['title'] ?? '';
	$text     = $attributes['text'] ?? '';
	$tags     = $attributes['tags'] ?? [];

	// Empty rows are skipped, so `--i` has to count only the tags that print.
	$tagLabels = array_values( array_filter( array_map(
		static fn( $tag ) => $tag['label'] ?? '',
		is_array( $tags ) ? $tags : []
	) ) );

	$bgUrl = get_template_directory_uri() . '/assets/img/decor/powerful_blur_1.webp';
@endphp

<li class="card-powerful">
	<div class="card-powerful__bg no-select" aria-hidden="true">
		<img src="{{ esc_url( $bgUrl ) }}" alt="">
	</div>

	@if ( ! empty( $imageUrl ) )
		<div class="card-powerful__img no-select" aria-hidden="true">
			<img src="{{ esc_url( $imageUrl ) }}" alt="">
		</div>
	@endif

	@if ( ! empty( $title ) )
		<h3 class="card-powerful__tl tl3 regular">{!! wp_kses_post( $title ) !!}</h3>
	@endif

	@if ( ! empty( $text ) )
		<div class="card-powerful__desc txt2 col-alt1">
			<p>{!! wp_kses_post( $text ) !!}</p>
		</div>
	@endif

	@if ( ! empty( $tagLabels ) )
		{{-- Tags rise in one by one: blocks.css holds each `li` down until threshold.js
		     adds `.is-threshold` to the list. --}}
		<ul class="card-powerful__tags" data-threshold-desktop="0.8">
			@foreach ( $tagLabels as $tagIndex => $label )
				<li style="--i: {{ (int) $tagIndex }}">{{ esc_html( $label ) }}</li>
			@endforeach
		</ul>
	@endif

	@include( 'partials.btn-icon', [
		'text' => $attributes['buttonText'] ?? '',
		'type' => $attributes['buttonType'] ?? 'link',
		'link' => $attributes['buttonLink'] ?? '',
		'newTab' => $attributes['buttonLinkNewTab'] ?? false,
		'anchor' => $attributes['buttonAnchor'] ?? '',
		'popupId' => $attributes['buttonPopupId'] ?? '',
		'icon' => $attributes['buttonIcon'] ?? 'arrow',
		'class' => 'card-powerful__btn',
	] )
</li>
