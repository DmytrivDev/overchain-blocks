@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$enableDecor = $attributes['enableDecor'] ?? false;
	$title = $attributes['title'] ?? '';
	$text = $attributes['text'] ?? '';
	$descText = $attributes['descText'] ?? '';
	$columns  = (string) ( $attributes['columns'] ?? '4' );

	$sectionClass = 'compliant ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
	// `compact` (FM London): smaller title-only cards; `headingLeft` drops `aic`.
	$cardsClass   = 'compliant__cards' . ( '5' === $columns ? ' cards-column-5' : '' ) . ( ! empty( $attributes['compact'] ) ? ' cards-compact' : '' ) . ' anim-cards';
	$headingClass = empty( $attributes['headingLeft'] ) ? 'heading aic' : 'heading';
	$decorUrl     = get_template_directory_uri() . '/assets/img/decor/oneflow_dec_1.jpg';
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="compliant__container">
		<div class="compliant__wrap section-wrap">
			@if ( $enableDecor )
				<div class="compliant__decor decor1 no-select" aria-hidden="true">
					<img src="{{ esc_url( $decorUrl ) }}" alt="">
				</div>
			@endif
			<div class="compliant__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
				@if ( ! empty( $title ) )
					<div class="{{ $headingClass }}">
						<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>

						@if ( ! empty( $text ) )
							<div class="txt2">
								<p>{!! wp_kses_post( $text ) !!}</p>
							</div>
						@endif
					</div>
				@endif

				<ul class="{{ esc_attr( $cardsClass ) }}" data-threshold-desktop="0.3">
					{!! overchain_blocks_stagger( $content, 'card-compliant' ) !!}
				</ul>

				@if ( ! empty( $descText ) )
					<div class="compliant__desc txt3 light">
						<p>{!! wp_kses_post( $descText ) !!}</p>
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
					'class' => 'compliant__btn',
				] )
            </div>
        </div>
    </div>
</section>