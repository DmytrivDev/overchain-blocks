@php
	$title = $attributes['title'] ?? '';
	$text  = $attributes['text'] ?? '';

	$buttonText    = $attributes['buttonText'] ?? '';
	$secondaryText = $attributes['secondaryText'] ?? '';
	$hasButtons    = ! empty( $buttonText ) || ! empty( $secondaryText );

	// `countdownTo` is a datetime-local value ("2026-12-03T09:00") read as UTC; the
	// design's readout.js wants ISO 8601 with an offset. A value that already has
	// seconds or an offset is passed through.
	$countdownTo = trim( (string) ( $attributes['countdownTo'] ?? '' ) );
	if ( preg_match( '/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/', $countdownTo ) ) {
		$countdownTo .= ':00+00:00';
	}

	$units = array(
		'days'  => function_exists( 'pll__' ) ? pll__( 'Days' ) : __( 'Days', 'overchain-blocks' ),
		'hours' => function_exists( 'pll__' ) ? pll__( 'Hours' ) : __( 'Hours', 'overchain-blocks' ),
		'min'   => function_exists( 'pll__' ) ? pll__( 'Min' ) : __( 'Min', 'overchain-blocks' ),
		'sec'   => function_exists( 'pll__' ) ? pll__( 'Sec' ) : __( 'Sec', 'overchain-blocks' ),
	);

	// The background is the design's fixed artwork, shipped in the theme.
	$decor = get_template_directory_uri() . '/assets/img/decor/';
@endphp

<section class="welcome">
	<div class="welcome__container">
		<div class="welcome__wrap section-wrap">
			<picture class="welcome__bg bg-1 no-select" aria-hidden="true">
				<source srcset="{{ esc_url( $decor . 'welcome_bg_1m.jpg' ) }}" media="(max-width: 992px)">
				<img src="{{ esc_url( $decor . 'welcome_bg_1d.jpg' ) }}" alt="">
			</picture>

			<div class="welcome__body welcome-body-1 section-body animated-block">
				<div class="welcome__content">
					@if ( ! empty( $title ) )
						<h1 class="tl1 anim-block">{!! wp_kses_post( $title ) !!}</h1>
					@endif

					@if ( ! empty( $text ) )
						<div class="txt1 medium anim-block">
							<p>{!! wp_kses_post( $text ) !!}</p>
						</div>
					@endif

					@if ( $hasButtons )
						<div class="welcome__btns anim-block">
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
								'class' => '',
							] )
						</div>
					@endif

					@if ( '' !== $countdownTo )
						{{-- readout.js (theme main.js) counts down to `data-readout`. --}}
						<div class="readout-welcome anim-block" data-readout="{{ esc_attr( $countdownTo ) }}" role="timer">
							@foreach ( $units as $unit => $label )
								<div class="readout-welcome__item">
									<span class="readout-welcome__value" data-readout-unit="{{ esc_attr( $unit ) }}">00</span>
									<span class="readout-welcome__label">{{ esc_html( $label ) }}</span>
								</div>
							@endforeach
						</div>
					@endif
				</div>
			</div>
		</div>
	</div>
</section>
