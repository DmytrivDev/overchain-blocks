@php
	$title = $attributes['title'] ?? '';
	$subtitle = $attributes['subtitle'] ?? '';
	$backgroundUrl = $attributes['backgroundUrl'] ?? '';
@endphp

<section class="hero">
	@if ( ! empty( $backgroundUrl ) )
		<div class="hero__bg no-select" aria-hidden="true">
			<img src="{{ esc_url( $backgroundUrl ) }}" alt="">
		</div>
	@endif

	<div class="hero__container">
		<div class="hero__wrap section-wrap">
			<div class="hero__body section-body anim-scroll animated-block">
				<div class="hero__content">
					@if ( ! empty( $title ) )
						<h1 class="tl1 anim-block">{!! wp_kses_post( $title ) !!}</h1>
					@endif

					@if ( ! empty( $subtitle ) )
						<div class="txt1 anim-block">
							<p>{!! wp_kses_post( $subtitle ) !!}</p>
						</div>
					@endif

					@if ( ! empty( $attributes['buttonText'] ?? '' ) )
						<div class="hero__btns anim-block">
							@include( 'partials.btn-icon', [
								'text' => $attributes['buttonText'] ?? '',
								'type' => $attributes['buttonType'] ?? 'link',
								'link' => $attributes['buttonLink'] ?? '',
								'newTab' => $attributes['buttonLinkNewTab'] ?? false,
								'anchor' => $attributes['buttonAnchor'] ?? '',
								'popupId' => $attributes['buttonPopupId'] ?? '',
								'icon' => $attributes['buttonIcon'] ?? 'calendar',
							] )
						</div>
					@endif
				</div>
			</div>
		</div>
	</div>
</section>
