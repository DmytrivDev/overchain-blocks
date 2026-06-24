@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title        = $attributes['title'] ?? '';
	$decoLeftUrl  = $attributes['decoLeftUrl'] ?? '';
	$decoRightUrl = $attributes['decoRightUrl'] ?? '';
	$badges       = $attributes['badges'] ?? [];

	$sectionClass = 'operation ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
	$bgUrl        = get_template_directory_uri() . '/assets/img/decor/operation_bg_1.svg';
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="operation__container">
		<div class="operation__wrap">
			<div class="operation__bg no-select" aria-hidden="true">
				<img src="{{ esc_url( $bgUrl ) }}" alt="">
			</div>

			<div class="operation__decor decor1 no-select" aria-hidden="true"></div>
			<div class="operation__decor decor2 no-select" aria-hidden="true"></div>

			<div class="operation__body section-body">
				@if ( ! empty( $decoLeftUrl ) )
					<div class="operation__img img1 no-select mouse-prllx" aria-hidden="true">
						<img src="{{ esc_url( $decoLeftUrl ) }}" alt="">
					</div>
				@endif

				@if ( ! empty( $decoRightUrl ) )
					<div class="operation__img img2 no-select mouse-prllx reverse" aria-hidden="true">
						<img src="{{ esc_url( $decoRightUrl ) }}" alt="">
					</div>
				@endif

				@if ( ! empty( $title ) )
					<div class="heading aic">
						<h2 class="tl2">{!! wp_kses_post( $title ) !!}</h2>
					</div>
				@endif

				@if ( ! empty( $badges ) )
					<ul class="operation__list">
						@foreach ( $badges as $badge )
							@php
								$iconUrl = $badge['iconUrl'] ?? '';
								$label   = $badge['label'] ?? '';
							@endphp

							@if ( ! empty( $label ) )
								<li class="item-operation">
									@if ( ! empty( $iconUrl ) )
										<img src="{{ esc_url( $iconUrl ) }}" alt="">
									@endif

									<p>{{ esc_html( $label ) }}</p>
								</li>
							@endif
						@endforeach
					</ul>
				@endif
			</div>
		</div>
	</div>
</section>