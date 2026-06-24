@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title = $attributes['title'] ?? '';
	$subtitle = $attributes['subtitle'] ?? '';
	$privacy = $attributes['privacy'] ?? '';
	$imageUrl = $attributes['imageUrl'] ?? '';
	$sectionClass = 'infrastruct mailing ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
	$labelEmail = function_exists( 'pll__' ) ? pll__( 'Enter Your Email' ) : __( 'Enter Your Email', 'overchain' );
	$labelSubmit = function_exists( 'pll__' ) ? pll__( 'Subscribe' ) : __( 'Subscribe', 'overchain' );

	$successTitle = $attributes['successTitle'] ?? '';
	$successDesc = $attributes['successDesc'] ?? '';
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="infrastruct__container">
		<div class="infrastruct__wrap">

			<div class="infrastruct__bg no-select" aria-hidden="true">
				<img src="{{ esc_url( get_template_directory_uri() . '/assets/img/decor/infrastruct_bg_1.jpg' ) }}"
					alt="">
			</div>

			<div class="infrastruct__body section-body">

				@if ( ! empty( $imageUrl ) )
					<div class="infrastruct__img mouse-prllx">
						<img src="{{ esc_url( $imageUrl ) }}" alt="">
					</div>
				@endif

				<div class="infrastruct__content">
					@if ( ! empty( $title ) )
						<h2 class="tl3">{!! wp_kses_post( $title ) !!}</h2>
					@endif

					@if ( ! empty( $subtitle ) )
						<div class="txt2 medium">
							<p>{!! wp_kses_post( $subtitle ) !!}</p>
						</div>
					@endif

					<form class="form-infrastruct base-form" method="post" action="" data-success-modal="md-success"
						data-success-modal="md-success" data-success-title="{{ esc_attr( $successTitle ) }}"
						data-success-desc="{{ esc_attr( $successDesc ) }}">
						@php echo wp_nonce_field( 'overchain_subscribe', 'overchain_subscribe_nonce', true, false ); @endphp
						<label class="form-infrastruct__label" for="mailing">
							{{ esc_html( $labelEmail ) }}
						</label>
						<div class="form-infrastruct__layout">
							<span class="form-infrastruct__input">
								<input type="email" id="mailing" name="mailing" placeholder="Example@company.com"
									data-required>
							</span>
							<button type="submit" class="form-infrastruct__submit btn-def">
								{{ esc_html( $labelSubmit ) }}
							</button>
						</div>
					</form>
				</div>

				@if ( ! empty( $privacy ) )
					<div class="infrastruct__bottom">
						<div class="text">
							<p>{!! wp_kses_post( $privacy ) !!}</p>
						</div>
					</div>
				@endif

			</div>
		</div>
	</div>
</section>