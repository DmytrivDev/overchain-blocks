@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title = $attributes['title'] ?? '';
	$innerBlocks = $block->inner_blocks ?? [];

	$sectionClass = 'settlement ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
	$blurUrl = get_template_directory_uri() . '/assets/img/decor/settlement_blur_1.webp';
	$bgUrl = get_template_directory_uri() . '/assets/img/decor/settlement_blur_2.webp';
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="settlement__container">
		<div class="settlement__wrap">
			<div class="settlement__blur no-select" aria-hidden="true">
				<img src="{{ esc_url( $blurUrl ) }}" alt="">
			</div>

			<div class="settlement__body section-body">
				@if ( ! empty( $title ) )
					<div class="heading">
						<h2 class="tl2">{!! wp_kses_post( $title ) !!}</h2>
					</div>
				@endif

				@if ( ! empty( $innerBlocks ) )
					<div class="settlement__main tabs">
						<div class="settlement__btns tabs__btns" data-center-tab>
							<ul>
								@foreach ( $innerBlocks as $index => $innerBlock )
									@php
										$tabId = 'tb-block' . ( $index + 1 );
										$tabLabel = $innerBlock->attributes['tabLabel'] ?? 'Tab ' . ( $index + 1 );
									@endphp

									<li>
										<button type="button" class="tab__btn{{ $index === 0 ? ' is-active' : '' }}"
											data-tab="{{ esc_attr( $tabId ) }}">
											{{ esc_html( $tabLabel ) }}
										</button>
									</li>
								@endforeach
							</ul>
						</div>

						<div class="settlement__layout">
							@foreach ( $innerBlocks as $index => $innerBlock )
								@php
									$tabId = 'tb-block' . ( $index + 1 );
								@endphp

								<div class="tabs__inner{{ $index === 0 ? ' is-active' : '' }}" id="{{ esc_attr( $tabId ) }}">
									{!! $innerBlock->render() !!}
								</div>
							@endforeach
						</div>

						<div class="settlement__bg no-select" aria-hidden="true">
							<img src="{{ esc_url( $bgUrl ) }}" alt="">
						</div>
					</div>
				@endif
			</div>
		</div>
	</div>
</section>