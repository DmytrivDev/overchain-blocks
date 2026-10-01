@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$enableDecor  = $attributes['enableDecor'] ?? true;
	$title        = $attributes['title'] ?? '';
	$desc         = $attributes['desc'] ?? '';
	$imageUrl     = $attributes['imageUrl'] ?? '';

	$sectionClass = 'never ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );

	// Fixed design asset — the same shape Split's `layered` variant uses.
	$decorUrl = get_template_directory_uri() . '/assets/img/decor/foundation_decor_1.svg';

	// A fallback, not a placeholder: with nothing uploaded the front renders the
	// design's own illustration, which is what the canvas shows too.
	if ( empty( $imageUrl ) ) {
		$imageUrl = get_template_directory_uri() . '/assets/img/content/never_img_1.png';
	}
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="never__container">
		<div class="never__wrap section-wrap">
			@if ( $enableDecor )
				<div class="never__decor no-select" aria-hidden="true">
					<img src="{{ esc_url( $decorUrl ) }}" alt="">
				</div>
			@endif

			<div class="never__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
				<div class="never__content">
					@if ( ! empty( $title ) )
						<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
					@endif

					{{-- Sits between the heading and the description, inside `__content`
					     — not beside it. --}}
					<div class="never__img no-select" aria-hidden="true">
						<img src="{{ esc_url( $imageUrl ) }}" alt="" loading="lazy" decoding="async">
					</div>

					@if ( ! empty( $desc ) )
						<div class="never__desc txt2">
							<p>{!! wp_kses_post( $desc ) !!}</p>
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
						'class' => 'never__btn',
					] )
				</div>
			</div>
		</div>
	</div>
</section>
