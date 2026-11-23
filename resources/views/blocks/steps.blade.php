@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title        = $attributes['title'] ?? '';
	$subtitle     = $attributes['subtitle'] ?? '';
	$steps        = $attributes['steps'] ?? [];

	// A fresh block arrives with four empty steps, so drop the ones with neither a
	// label nor an icon.
	$steps = array_values( array_filter(
		is_array( $steps ) ? $steps : [],
		function ( $step ) {
			return ! empty( $step['label'] ) || ! empty( $step['iconUrl'] );
		}
	) );

	$sectionClass = 'oneflow ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
	$decorUrl     = get_template_directory_uri() . '/assets/img/decor/oneflow_dec_1.jpg';
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="oneflow__container">
		<div class="oneflow__wrap section-wrap">
			<div class="oneflow__decor decor1 no-select" aria-hidden="true">
				<img src="{{ esc_url( $decorUrl ) }}" alt="">
			</div>

			<div class="oneflow__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
				<div class="heading aic">
					@if ( ! empty( $title ) )
						<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
					@endif

					@if ( ! empty( $subtitle ) )
						<div class="txt4 col-alt1">
							<p>{!! wp_kses_post( $subtitle ) !!}</p>
						</div>
					@endif
				</div>

				@if ( ! empty( $steps ) )
					<div class="oneflow__layout" data-threshold-desktop="0.4">
						<div class="oneflow__line" aria-hidden="true"></div>

						<ul class="oneflow__steps">
							@foreach ( $steps as $index => $step )
								@php
									$iconUrl = $step['iconUrl'] ?? '';
									$label   = $step['label'] ?? '';

									// "USDT, BTC, ETH" → a word cycler after the title (theme
									// auto-swap.js). The icon is static.
									$swapWords = array_values( array_filter( array_map(
										'trim',
										explode( ',', (string) ( $step['swapWords'] ?? '' ) )
									), 'strlen' ) );
									$hasSwap = count( $swapWords ) > 1;
								@endphp

								<li class="item-oneflow">
									@if ( ! empty( $iconUrl ) )
										<div class="item-oneflow__icon">
											<img src="{{ esc_url( $iconUrl ) }}" alt="">
										</div>
									@endif

									<div class="item-oneflow__box">
										@if ( ! empty( $label ) || $hasSwap )
											<h3 class="item-oneflow__tl">
												{!! wp_kses_post( $label ) !!}
												@if ( $hasSwap )
													<span class="auto-swap-items">
														<span>
															@foreach ( $swapWords as $word )
																<span>{{ esc_html( $word ) }}</span>
															@endforeach
														</span>
													</span>
												@endif
											</h3>
										@endif
									</div>
								</li>
							@endforeach
						</ul>
					</div>
				@endif
			</div>
		</div>
	</div>
</section>