@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title = $attributes['title'] ?? '';
	$text = $attributes['text'] ?? '';
	$imageUrl = $attributes['imageUrl'] ?? '';
	$mediaLayout = $attributes['mediaLayout'] ?? 'img1';

	$sectionClass = 'infrastruct ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );

	// The base class only sets `position: absolute` — every offset and width lives
	// on the numbered modifier, and `img2` additionally pushes the content across
	// with `pis1`. Compared rather than interpolated so no stray value can reach
	// the class attribute.
	$isWide = 'img2' === $mediaLayout;
	$bodyClass = 'infrastruct__body section-body' . ( $isWide ? ' pis1' : '' ) . overchain_blocks_fade_class( $attributes );
	$imgClass = $isWide ? 'infrastruct__img img2' : 'infrastruct__img img1 mouse-prllx';
	$bgUrl = get_template_directory_uri() . '/assets/img/decor/infrastruct_bg_1.jpg';
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="infrastruct__container">
		<div class="infrastruct__wrap section-wrap">
			<div class="infrastruct__bg no-select" aria-hidden="true">
				<img src="{{ esc_url( $bgUrl ) }}" alt="">
			</div>

			<div class="{{ esc_attr( $bodyClass ) }}">
				@if ( ! empty( $imageUrl ) )
					<div class="{{ esc_attr( $imgClass ) }}">
						<img src="{{ esc_url( $imageUrl ) }}" alt="">
					</div>
				@endif

				<div class="infrastruct__content">
					@if ( ! empty( $title ) )
						<h2 class="tl3 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
					@endif

					@if ( ! empty( $text ) )
						<div class="txt2 medium">
							<p>{!! wp_kses_post( $text ) !!}</p>
						</div>
					@endif

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
            </div>
        </div>
    </div>
</section>