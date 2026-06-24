@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title = $attributes['title'] ?? '';
	$text = $attributes['text'] ?? '';
	$imageUrl = $attributes['imageUrl'] ?? '';

	$sectionClass = 'infrastruct ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
	$bgUrl = get_template_directory_uri() . '/assets/img/decor/infrastruct_bg_1.jpg';
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="infrastruct__container">
		<div class="infrastruct__wrap">
			<div class="infrastruct__bg no-select" aria-hidden="true">
				<img src="{{ esc_url( $bgUrl ) }}" alt="">
			</div>

			<div class="infrastruct__body section-body">
				@if ( ! empty( $imageUrl ) )
					<div class="infrastruct__img mouse-prllx">
						<img src="{{ esc_url( $imageUrl ) }}" alt="">
					</div>
				@endif

				<div class="infrastruct__content">
					@if ( ! empty( $title ) )
						<h2 class="tl3">{!! wp_kses_post( $title ) !!}</h2>
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