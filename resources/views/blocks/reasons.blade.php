@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title        = $attributes['title'] ?? '';
	$sectionClass = 'brokers ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="brokers__container">
		<div class="brokers__wrap section-wrap{{ overchain_blocks_fade_class( $attributes ) }}">
			{{-- The background is the design's fixed artwork, shipped in the theme. --}}
			<div class="brokers__decor no-select" aria-hidden="true">
				<img src="{{ esc_url( get_template_directory_uri() . '/assets/img/decor/brokers_decor_1.jpg' ) }}" alt="" loading="lazy" decoding="async">
			</div>

			<div class="brokers__body section-body">
				@if ( ! empty( $title ) )
					<div class="heading mbe2">
						<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
					</div>
				@endif

				@if ( '' !== trim( $content ) )
					<ul class="brokers__list anim-cards" role="list" data-threshold-desktop="0.3">
						{!! overchain_blocks_stagger( $content, 'card-brokers' ) !!}
					</ul>
				@endif
			</div>
		</div>
	</div>
</section>
