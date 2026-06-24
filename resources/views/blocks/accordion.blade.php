@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title = $attributes['title'] ?? '';
	$subtitle = $attributes['subtitle'] ?? '';
	$items = $attributes['items'] ?? [];

	$sectionClass = 'paid ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
	$cardBgUrl = get_template_directory_uri() . '/assets/img/decor/paid_bg_1.jpg';
	$arrowUrl = get_template_directory_uri() . '/assets/img/icons/vec_1b.svg';

	$buttonLabel = function_exists( 'pll__' )
		? pll__( 'Discover More' )
		: __( 'Discover More', 'overchain-blocks' );
@endphp

@if ( ! empty( $items ) )
	<section class="{{ esc_attr( $sectionClass ) }}">
		<div class="paid__container">
			<div class="paid__body section-body">
				<div class="paid__layout">
					<div class="paid__heading">
						@if ( ! empty( $title ) )
							<h2 class="tl2">{!! wp_kses_post( $title ) !!}</h2>
						@endif

						@if ( ! empty( $subtitle ) )
							<div class="txt2">
								<p>{!! wp_kses_post( $subtitle ) !!}</p>
							</div>
						@endif
					</div>

					<div class="paid__splide splide">
						<div class="splide__track">
							<ul class="splide__list">
								@foreach ( $items as $item )
									@php
										$imageUrl = $item['imageUrl'] ?? '';
										$buttonData = overchain_resolve_button_data( $item );
										$hasLink = ! empty( $buttonData['href'] );
									@endphp

									<li class="splide__slide card-paid">
										@if ( $hasLink )
											<a class="card-paid__link" href="{{ $buttonData['href'] }}" {!! $buttonData['attrs'] !!}>
												<img src="{{ esc_url( $arrowUrl ) }}" alt="">
											</a>
										@endif

										<div class="card-paid__bg ibg no-select" aria-hidden="true">
											<img src="{{ esc_url( $cardBgUrl ) }}" alt="">
										</div>

										@if ( ! empty( $imageUrl ) )
											<div class="card-paid__img">
												<img src="{{ esc_url( $imageUrl ) }}" alt="">
											</div>
										@endif
									</li>
								@endforeach
							</ul>
						</div>
					</div>

					<ul class="paid__tabs">
						@foreach ( $items as $item )
							@php
								$heading = $item['heading'] ?? '';
								$text = $item['text'] ?? '';
								$buttonData = overchain_resolve_button_data( $item );
								$hasLink = ! empty( $buttonData['href'] );
							@endphp

							<li class="tab-paid">
								<span class="progress" aria-hidden="true">
									<span></span>
								</span>

								@if ( ! empty( $heading ) )
									<div class="tab-paid__head">
										<h3 class="tl5">{!! wp_kses_post( $heading ) !!}</h3>
									</div>
								@endif

								<div class="tab-paid__dropdown">
									<div class="tab-paid__content">
										@if ( ! empty( $text ) )
											<div class="txt3 light">
												<p>{!! wp_kses_post( $text ) !!}</p>
											</div>
										@endif

										@if ( $hasLink )
											<a class="link-more" href="{{ $buttonData['href'] }}" {!! $buttonData['attrs'] !!}>
												{{ esc_html( $buttonLabel ) }}
											</a>
										@endif
									</div>
								</div>
							</li>
						@endforeach
					</ul>
				</div>
			</div>
		</div>
	</section>
@endif