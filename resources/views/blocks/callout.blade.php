@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title        = $attributes['title'] ?? '';
	$text         = $attributes['text'] ?? '';
	$imageUrl     = $attributes['imageUrl'] ?? '';

	$sectionClass = 'rightfit ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="rightfit__container">
		<div class="rightfit__wrap section-wrap">
			<div class="rightfit__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
				@if ( ! empty( $imageUrl ) )
					<div class="rightfit__img mouse-prllx">
						<img src="{{ esc_url( $imageUrl ) }}" alt="">
					</div>
				@endif

				<div class="rightfit__content">
					@if ( ! empty( $title ) )
						<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
					@endif

					@if ( ! empty( $text ) )
						<div class="txt2 col-alt1">
							<p>{!! wp_kses_post( $text ) !!}</p>
						</div>
					@endif

					@if ( ! empty( $attributes['buttonText'] ?? '' ) )
						<div class="rightfit__btns">
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
