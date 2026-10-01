@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title = $attributes['title'] ?? '';
	$subtitle = $attributes['subtitle'] ?? '';
	$items = $attributes['items'] ?? [];

	$sectionClass = 'paid ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );

	// `wide-tabs` widens the tab column; the design uses it on every page except index.html,
	// so `default` stays the default and saved blocks keep their current layout.
	$tabsLayout  = $attributes['tabsLayout'] ?? 'default';
	$layoutClass = 'paid__layout' . ( 'wide' === $tabsLayout ? ' wide-tabs' : '' );
	$arrowUrl = get_template_directory_uri() . '/assets/img/icons/vec_1b.svg';

	$buttonLabel = function_exists( 'pll__' )
		? pll__( 'Discover More' )
		: __( 'Discover More', 'overchain-blocks' );
@endphp

@if ( ! empty( $items ) )
	<section class="{{ esc_attr( $sectionClass ) }}">
		<div class="paid__container">
			<div class="paid__wrap section-wrap">
				<div class="paid__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
					<div class="{{ esc_attr( $layoutClass ) }}">
						<div class="paid__heading">
							@if ( ! empty( $title ) )
								<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
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
									@foreach ( $items as $index => $item )
										@php
											$imageUrl = $item['imageUrl'] ?? '';
											$buttonData = overchain_resolve_button_data( $item );
											$hasLink = ! empty( $buttonData['href'] );

											// Editor-picked backdrop, falling back to the design default,
											// which cycles paid_bg_1..4 by position.
											$cardBgUrl = $item['backgroundUrl'] ?? '';

											if ( empty( $cardBgUrl ) ) {
												$cardBgUrl = get_template_directory_uri()
													. '/assets/img/decor/paid_bg_' . ( ( $index % 4 ) + 1 ) . '.jpg';
											}
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

						{{-- Tabs rise in one by one once the list is in view: blocks.css holds each
						     `.tab-paid` down until threshold.js adds `.is-threshold`. --}}
						<ul class="paid__tabs" data-threshold-desktop="0.3">
							@foreach ( $items as $tabIndex => $item )
								@php
									$heading = $item['heading'] ?? '';
									$text = $item['text'] ?? '';
									$buttonData = overchain_resolve_button_data( $item );
									$hasLink = ! empty( $buttonData['href'] );
								@endphp

								<li class="tab-paid" style="--i: {{ (int) $tabIndex }}">
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
		</div>
	</section>
@endif