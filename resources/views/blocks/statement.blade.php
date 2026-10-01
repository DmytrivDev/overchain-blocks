@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$imageUrl     = $attributes['imageUrl'] ?? '';
	$title        = $attributes['title'] ?? '';
	$lead         = $attributes['lead'] ?? '';
	$colOne       = $attributes['colOne'] ?? '';
	$colTwo       = $attributes['colTwo'] ?? '';

	$sectionClass = 'exists ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="exists__container">
		<div class="exists__wrap section-wrap">
			@if ( ! empty( $imageUrl ) )
				<div class="exists__img no-select" aria-hidden="true">
					<img src="{{ esc_url( $imageUrl ) }}" alt="">
				</div>
			@endif

			<div class="exists__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
				@if ( ! empty( $title ) )
					<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
				@endif

				<div class="exists__content">
					@if ( ! empty( $lead ) )
						<div class="exists__lead txt2 medium">
							<p>{!! wp_kses_post( $lead ) !!}</p>
						</div>
					@endif

					@if ( ! empty( $colOne ) || ! empty( $colTwo ) )
						<div class="exists__cols">
							@if ( ! empty( $colOne ) )
								<div class="txt2 col-alt1">
									<p>{!! wp_kses_post( $colOne ) !!}</p>
								</div>
							@endif

							@if ( ! empty( $colTwo ) )
								<div class="txt2 col-alt1">
									<p>{!! wp_kses_post( $colTwo ) !!}</p>
								</div>
							@endif
						</div>
					@endif
				</div>
			</div>
		</div>
	</div>
</section>
