@php
	$layout          = $attributes['layout'] ?? 'default';
	$coverBackground = $attributes['coverBackground'] ?? false;
	$backgroundUrl   = $attributes['backgroundUrl'] ?? '';
	$title           = $attributes['title'] ?? '';
	$text            = $attributes['text'] ?? '';
	$imageUrl        = $attributes['imageUrl'] ?? '';
	$buttonText      = $attributes['buttonText'] ?? '';
	$secondaryText   = $attributes['secondaryText'] ?? '';

	// The section never carries a `pbs` utility: its padding lives on `.intro__body`
	// and is driven by the layout modifier, so there is no `noPaddingTop` here.
	$layoutClass = '';

	if ( 'content-center' === $layout ) {
		$layoutClass = ' sec-content-center';
	} elseif ( 'with-img' === $layout ) {
		$layoutClass = ' sec-with-img';
	}

	$sectionClass = 'intro' . $layoutClass;

	// `ibg` is matched by `[class*=ibg]` in the theme, which stretches the image to
	// cover its container. Without it the background keeps its own 90rem min-width.
	$backgroundClass = 'intro__bg' . ( $coverBackground ? ' ibg' : '' ) . ' no-select';

	$hasButtons = ! empty( $buttonText ) || ! empty( $secondaryText );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	@if ( ! empty( $backgroundUrl ) )
		<div class="{{ esc_attr( $backgroundClass ) }}" aria-hidden="true">
			<img src="{{ esc_url( $backgroundUrl ) }}" alt="">
		</div>
	@endif

	<div class="intro__container">
		<div class="intro__wrap section-wrap">
			<div class="intro__body section-body animated-block{{ overchain_blocks_fade_class( $attributes ) }}">
				<div class="intro__content">
					@if ( ! empty( $title ) )
						<h1 class="tl1 anim-block">{!! wp_kses_post( $title ) !!}</h1>
					@endif

					@if ( ! empty( $text ) )
						<div class="txt1 anim-block">
							<p>{!! wp_kses_post( $text ) !!}</p>
						</div>
					@endif

					@if ( $hasButtons )
						<div class="intro__btns anim-block">
							@include( 'partials.btn-icon', [
								'text' => $buttonText,
								'type' => $attributes['buttonType'] ?? 'link',
								'link' => $attributes['buttonLink'] ?? '',
								'newTab' => $attributes['buttonLinkNewTab'] ?? false,
								'anchor' => $attributes['buttonAnchor'] ?? '',
								'popupId' => $attributes['buttonPopupId'] ?? '',
								'icon' => $attributes['buttonIcon'] ?? 'calendar',
							] )

							@include( 'partials.btn-def', [
								'text' => $secondaryText,
								'type' => $attributes['secondaryType'] ?? 'link',
								'link' => $attributes['secondaryLink'] ?? '',
								'newTab' => $attributes['secondaryLinkNewTab'] ?? false,
								'anchor' => $attributes['secondaryAnchor'] ?? '',
								'popupId' => $attributes['secondaryPopupId'] ?? '',
								'style' => 'stl-trn-clw',
							] )
						</div>
					@endif
				</div>

				@if ( 'with-img' === $layout && ! empty( $imageUrl ) )
					<div class="intro__img img1 no-select" aria-hidden="true">
						<img src="{{ esc_url( $imageUrl ) }}" alt="">
					</div>
				@endif
			</div>
		</div>
	</div>
</section>
