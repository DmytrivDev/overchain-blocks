@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;

	$sectionClass = 'accept ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="accept__container">
		<div class="accept__wrap section-wrap">
			<div class="accept__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
				<div class="accept__splide">
					{{-- `data-lock` is handled in the theme's js/main.js: it hides the arrows
					     and disables dragging when every slide already fits. --}}
					<div class="splide" data-lock>
						<div class="splide__track">
							<ul class="splide__list anim-cards" data-threshold-desktop="0.3">
								{!! overchain_blocks_stagger( $content, 'card-accept' ) !!}
							</ul>
						</div>
					</div>

					@include( 'partials.splide-arrows' )
				</div>
			</div>
		</div>
	</div>
</section>
