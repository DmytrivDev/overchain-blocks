@php
	$noPaddingTop     = $attributes['noPaddingTop'] ?? false;
	$enableBackground = $attributes['enableBackground'] ?? true;
	$title            = $attributes['title'] ?? '';
	$subtitle         = $attributes['subtitle'] ?? '';
	$desc             = $attributes['desc'] ?? '';
	$imageUrl         = $attributes['imageUrl'] ?? '';

	$sectionClass = 'introflow ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );

	// Fixed design asset — the same backdrop as Manage Cards uses.
	$backgroundUrl = get_template_directory_uri() . '/assets/img/decor/introflow_bg_1.jpg';

	// A fallback, not a placeholder: with nothing uploaded the front renders the
	// design's own illustration, which is what the canvas shows too.
	if ( empty( $imageUrl ) ) {
		$imageUrl = get_template_directory_uri() . '/assets/img/content/introflow_img_1.png';
	}
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="introflow__container">
		<div class="introflow__wrap section-wrap">
			@if ( $enableBackground )
				<div class="introflow__bg no-select" aria-hidden="true">
					<img src="{{ esc_url( $backgroundUrl ) }}" alt="" loading="lazy" decoding="async">
				</div>
			@endif

			<div class="introflow__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
				<div class="introflow__content">
					@if ( ! empty( $title ) )
						<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
					@endif

					@if ( ! empty( $subtitle ) )
						<div class="introflow__subtitle txt2 medium">
							<p>{!! wp_kses_post( $subtitle ) !!}</p>
						</div>
					@endif

					@if ( ! empty( $desc ) )
						<div class="introflow__desc txt4">
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
						'icon' => $attributes['buttonIcon'] ?? 'calendar',
						'class' => 'introflow__btn',
					] )
				</div>

				<div class="introflow__img no-select" aria-hidden="true">
					<img src="{{ esc_url( $imageUrl ) }}" alt="" loading="lazy" decoding="async">
				</div>
			</div>
		</div>
	</div>
</section>
