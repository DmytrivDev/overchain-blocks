@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title        = $attributes['title'] ?? '';
	$subtitle     = $attributes['subtitle'] ?? '';
	$steps        = $attributes['steps'] ?? [];

	$sectionClass = 'oneflow ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
	$decorUrl     = get_template_directory_uri() . '/assets/img/decor/oneflow_dec_1.jpg';
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="oneflow__container">
		<div class="oneflow__wrap">
			<div class="oneflow__decor decor1 no-select" aria-hidden="true">
				<img src="{{ esc_url( $decorUrl ) }}" alt="">
			</div>

			<div class="oneflow__body section-body">
				<div class="heading aic">
					@if ( ! empty( $title ) )
						<h2 class="tl2">{!! wp_kses_post( $title ) !!}</h2>
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
									$number  = str_pad( (string) ( $index + 1 ), 2, '0', STR_PAD_LEFT );
								@endphp

								<li class="item-oneflow">
									@if ( ! empty( $iconUrl ) )
										<div class="item-oneflow__icon">
											<img src="{{ esc_url( $iconUrl ) }}" alt="">
										</div>
									@endif

									<div class="item-oneflow__box">
										@if ( ! empty( $label ) )
											<h3 class="item-oneflow__tl">{!! wp_kses_post( $label ) !!}</h3>
										@endif

										<p class="item-oneflow__step">{{ esc_html( $number ) }}</p>
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