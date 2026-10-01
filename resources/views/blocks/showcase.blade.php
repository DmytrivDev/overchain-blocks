@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title        = $attributes['title'] ?? '';

	$sectionClass = 'powerful ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="powerful__container">
		<div class="powerful__wrap section-wrap">
			<div class="powerful__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
				@if ( ! empty( $title ) )
					<div class="heading aic">
						<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
					</div>
				@endif

				<ul class="powerful__cards">
					{!! $content !!}
				</ul>
			</div>
		</div>
	</div>
</section>
