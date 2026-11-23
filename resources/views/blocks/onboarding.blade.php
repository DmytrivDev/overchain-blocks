@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title        = $attributes['title'] ?? '';
	$sectionClass = 'startright ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="startright__container">
		<div class="startright__wrap section-wrap{{ overchain_blocks_fade_class( $attributes ) }}">
			<div class="startright__body section-body">
				@if ( ! empty( $title ) )
					<div class="heading aic">
						<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
					</div>
				@endif

				@if ( '' !== trim( $content ) )
					{{-- `.is-threshold` (threshold.js) draws the line and reveals the steps. --}}
					<div class="startright__layout anim-cards" data-threshold-desktop="0.4">
						<div class="startright__line" aria-hidden="true"></div>

						<ul class="startright__steps" role="list">
							{!! overchain_blocks_stagger( $content, 'item-startright' ) !!}
						</ul>
					</div>
				@endif
			</div>
		</div>
	</div>
</section>
