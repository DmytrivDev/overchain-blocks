@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title        = $attributes['title'] ?? '';
	$text         = $attributes['text'] ?? '';

	$sectionClass = 'moves ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="moves__container">
		<div class="moves__wrap section-wrap">
			<div class="moves__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
				@if ( ! empty( $title ) || ! empty( $text ) )
					{{-- `.moves__heading`, not the shared `.heading` utility: a flex row
					     with the title and the lead paragraph side by side. --}}
					<div class="moves__heading">
						@if ( ! empty( $title ) )
							<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
						@endif

						@if ( ! empty( $text ) )
							<div class="txt2">
								<p>{!! wp_kses_post( $text ) !!}</p>
							</div>
						@endif
					</div>
				@endif

				<ul class="moves__list anim-cards" data-threshold-desktop="0.3">
					{!! overchain_blocks_stagger( $content, 'card-moves' ) !!}
				</ul>
			</div>
		</div>
	</div>
</section>
