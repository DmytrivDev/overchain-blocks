@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title = $attributes['title'] ?? '';
	$subtitle = $attributes['subtitle'] ?? '';
	$imageUrl = $attributes['imageUrl'] ?? '';
	$text = $attributes['text'] ?? '';

	$sectionClass = 'actually ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="actually__container">
		<div class="actually__wrap">
			@if ( ! empty( $imageUrl ) )
				<div class="actually__media no-select" aria-hidden="true">
					<img src="{{ esc_url( $imageUrl ) }}" alt="">
				</div>
			@endif

			<div class="actually__body section-body">
				<div class="actually__top">
					@if ( ! empty( $title ) )
						<h2 class="tl2">{!! wp_kses_post( $title ) !!}</h2>
					@endif

					@if ( ! empty( $subtitle ) )
						<div class="txt2 medium">
							<p>{!! wp_kses_post( $subtitle ) !!}</p>
						</div>
					@endif
				</div>

				<div class="actually__bottom">
					@if ( ! empty( $text ) )
						<div class="txt2 col-alt1">
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
						'icon' => $attributes['buttonIcon'] ?? 'arrow',
					] )
                </div>
            </div>
        </div>
    </div>
</section>