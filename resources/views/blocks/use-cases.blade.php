@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title        = $attributes['title'] ?? '';
	$sectionClass = 'institution ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="institution__container">
		<div class="institution__wrap section-wrap{{ overchain_blocks_fade_class( $attributes ) }}">
			<div class="institution__body section-body">
				@if ( ! empty( $title ) )
					<div class="heading mbe2">
						<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
					</div>
				@endif

				@if ( '' !== trim( $content ) )
					<ul class="institution__cards anim-cards" role="list" data-threshold-desktop="0.3">
						{!! overchain_blocks_stagger( $content, 'card-institution' ) !!}
					</ul>
				@endif
			</div>
		</div>
	</div>
</section>
