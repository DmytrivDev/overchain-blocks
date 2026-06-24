@php
	$title         = $attributes['title'] ?? '';
	$backgroundUrl = $attributes['backgroundUrl'] ?? '';
	$imageUrl      = $attributes['imageUrl'] ?? '';
	$linkUrl       = $attributes['linkUrl'] ?? '';
	$linkNewTab    = $attributes['linkNewTab'] ?? false;

	$linkAttrs = ! empty( $linkNewTab ) ? ' target="_blank" rel="noopener noreferrer"' : '';
	$blurUrl   = get_template_directory_uri() . '/assets/img/decor/settlement_blur_1.webp';

	$linkText = function_exists( 'pll__' )
		? pll__( 'Discover More' )
		: __( 'Discover More', 'overchain-blocks' );
@endphp

<li class="splide__slide card-businesses">
	@if ( ! empty( $backgroundUrl ) )
		<div class="card-businesses__bg ibg no-select" aria-hidden="true">
			<img src="{{ esc_url( $backgroundUrl ) }}" alt="">
		</div>
	@endif

	<div class="card-businesses__inner">
		@if ( ! empty( $title ) )
			@if ( ! empty( $linkUrl ) )
				<a href="{{ esc_url( $linkUrl ) }}" class="tl4"{!! $linkAttrs !!}>
					{!! wp_kses_post( $title ) !!}
				</a>
			@else
				<h3 class="tl4">{!! wp_kses_post( $title ) !!}</h3>
			@endif
		@endif

		@if ( ! empty( $imageUrl ) )
			<div class="card-businesses__img">
				<img src="{{ esc_url( $imageUrl ) }}" alt="">
			</div>
		@endif

		@if ( ! empty( $linkUrl ) )
			<span class="link-more">{{ esc_html( $linkText ) }}</span>
		@endif
	</div>

	<div class="card-businesses__blur no-select" aria-hidden="true">
		<img src="{{ esc_url( $blurUrl ) }}" alt="">
	</div>
</li>