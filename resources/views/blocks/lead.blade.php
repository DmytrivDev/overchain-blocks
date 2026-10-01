@php
	$backgroundType = $attributes['backgroundType'] ?? 'bg2';
	$backgroundUrl  = $attributes['backgroundUrl'] ?? '';
	$title          = $attributes['title'] ?? '';
	$textStyle      = $attributes['textStyle'] ?? 'plain';
	$text           = $attributes['text'] ?? '';
	$textAlt        = $attributes['textAlt'] ?? '';
	$minHeight      = $attributes['minHeight'] ?? false;
	$bottomSpacing  = $attributes['bottomSpacing'] ?? 'pbe1';

	$isBlur = 'blur' === $backgroundType;

	// `pbs1` is always present; the rest are optional design modifiers.
	$bodyClass = 'lead__body section-body pbs1 animated-block'
		. ( in_array( $bottomSpacing, array( 'pbe1', 'pbe2' ), true ) ? ' ' . $bottomSpacing : '' )
		. ( $minHeight ? ' mh1' : '' )
		. overchain_blocks_fade_class( $attributes );

	$textClass = 'txt1' . ( 'medium' === $textStyle ? ' medium' : '' ) . ' anim-block';
@endphp

<section class="lead">
	<div class="lead__container">
		<div class="lead__wrap section-wrap">
			@if ( $isBlur )
				<div class="page-blur blur1 no-select" aria-hidden="true"></div>
				<div class="page-blur blur2 no-select" aria-hidden="true"></div>
			@elseif ( ! empty( $backgroundUrl ) )
				<div class="lead__bg {{ esc_attr( $backgroundType ) }} no-select" aria-hidden="true">
					<img src="{{ esc_url( $backgroundUrl ) }}" alt="">
				</div>
			@endif

			<div class="{{ esc_attr( $bodyClass ) }}">
				<div class="lead__content">
					@if ( ! empty( $title ) )
						<h1 class="tl1 anim-block">{!! wp_kses_post( $title ) !!}</h1>
					@endif

					@if ( ! empty( $text ) )
						<div class="{{ esc_attr( $textClass ) }}">
							<p>{!! wp_kses_post( $text ) !!}</p>
						</div>
					@endif

					@if ( ! empty( $textAlt ) )
						<div class="txt1 col-alt1 anim-block">
							<p>{!! wp_kses_post( $textAlt ) !!}</p>
						</div>
					@endif

					@if ( ! empty( $attributes['buttonText'] ?? '' ) )
						<div class="lead__btns anim-block">
							@include( 'partials.btn-icon', [
								'text' => $attributes['buttonText'] ?? '',
								'type' => $attributes['buttonType'] ?? 'link',
								'link' => $attributes['buttonLink'] ?? '',
								'newTab' => $attributes['buttonLinkNewTab'] ?? false,
								'anchor' => $attributes['buttonAnchor'] ?? '',
								'popupId' => $attributes['buttonPopupId'] ?? '',
								'icon' => $attributes['buttonIcon'] ?? 'arrow',
							] )
						</div>
					@endif
				</div>
			</div>
		</div>
	</div>
</section>
