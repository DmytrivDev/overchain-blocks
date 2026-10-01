@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title = $attributes['title'] ?? '';
	$subtitle = $attributes['subtitle'] ?? '';
	$imageUrl = $attributes['imageUrl'] ?? '';
	$mediaLayout = $attributes['mediaLayout'] ?? 'single';

	// Fixed design asset — the decor shape is identical on every `layered` section
	// in the design, so it is not editable.
	$decorUrl = get_template_directory_uri() . '/assets/img/decor/foundation_decor_1.svg';

	// `steps` is the numbered list (platform-overview); `items` is the icon list
	// used on aviation/igaming. The default stays `steps` so every Split saved
	// before this attribute existed keeps rendering what it renders today.
	$listStyle = $attributes['listStyle'] ?? 'steps';
	$items     = $attributes['items'] ?? [];

	// Every `.item-actually` in the design uses the same glyph, so it is a fixed
	// design asset rather than a per-item upload.
	$itemIconUrl = get_template_directory_uri() . '/assets/img/icons/actually_icon_2.svg';
	$text = $attributes['text'] ?? '';
	$steps = $attributes['steps'] ?? [];

	// The glow layer arrived with the platform pages; `index.html` and `about.html`
	// have no `actually__blur`, so it defaults to off and blocks saved from those
	// sections keep rendering exactly as before.
	$enableBlur = $attributes['enableBlur'] ?? false;

	$subtitleStyle = $attributes['subtitleStyle'] ?? 'medium';
	$subtitleClass = 'alt-min' === $subtitleStyle ? 'txt2 col-alt1 min-size' : 'txt2 medium';

	$sectionClass = 'actually ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
	$bodyClass    = 'actually__body section-body' . overchain_blocks_fade_class( $attributes );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="actually__container">
		<div class="actually__wrap section-wrap">
			@if ( $enableBlur )
				<div class="actually__blur no-select" aria-hidden="true"></div>
			@endif

			{{-- `single` keeps the original one-layer media; `layered` is the about.html
			     variant, where a decorative shape and the picture are separate layers. --}}
			@if ( 'layered' === $mediaLayout )
				<div class="actually__decor no-select" aria-hidden="true">
					<img src="{{ esc_url( $decorUrl ) }}" alt="">
				</div>

				@if ( ! empty( $imageUrl ) )
					<div class="actually__img no-select" aria-hidden="true">
						<img src="{{ esc_url( $imageUrl ) }}" alt="">
					</div>
				@endif
			@elseif ( ! empty( $imageUrl ) )
				<div class="actually__media no-select" aria-hidden="true">
					<img src="{{ esc_url( $imageUrl ) }}" alt="">
				</div>
			@endif

			{{-- Each `.animated-block` reveals its `.anim-block` children one by one once
			     half of it is in view (theme animated-block.js). The body itself fades out on
			     scroll when a White Section follows (overchain_blocks_fade_class()). --}}
			<div class="{{ esc_attr( $bodyClass ) }}">
				<div class="actually__top animated-block">
					@if ( ! empty( $title ) )
						<h2 class="tl2 anim-txt anim-block gap-big">{!! wp_kses_post( $title ) !!}</h2>
					@endif

					@if ( ! empty( $subtitle ) )
						<div class="{{ esc_attr( $subtitleClass ) }} anim-block gap-big">
							<p>{!! wp_kses_post( $subtitle ) !!}</p>
						</div>
					@endif
				</div>

				<div class="actually__bottom animated-block">
					@if ( ! empty( $text ) )
						<div class="txt2 col-alt1 anim-block gap-big">
							<p>{!! wp_kses_post( $text ) !!}</p>
						</div>
					@endif

					@if ( 'items' === $listStyle )
						@if ( ! empty( $items ) )
							<ul class="actually__list anim-block gap-big">
								@foreach ( $items as $item )
									@php $itemText = $item['text'] ?? ''; @endphp

									<li class="item-actually">
										<div class="item-actually__icon">
											<img src="{{ esc_url( $itemIconUrl ) }}" alt="">
										</div>

										<div class="item-actually__content">
											<p>{!! wp_kses_post( $itemText ) !!}</p>
										</div>
									</li>
								@endforeach
							</ul>
						@endif
					@elseif ( ! empty( $steps ) )
						<ul class="actually__steps anim-block gap-big">
							@foreach ( $steps as $index => $step )
								@php
									$stepTitle = $step['title'] ?? '';
									$stepText  = $step['text'] ?? '';
									$stepNumber = str_pad( (string) ( $index + 1 ), 2, '0', STR_PAD_LEFT );
								@endphp

								<li class="steps-actually">
									<div class="steps-actually__number">{{ esc_html( $stepNumber ) }}</div>

									<div class="steps-actually__content">
										@if ( ! empty( $stepTitle ) )
											<h3 class="tl5 regular">{!! wp_kses_post( $stepTitle ) !!}</h3>
										@endif

										@if ( ! empty( $stepText ) )
											<div class="steps-actually__desc txt2">
												<p>{!! wp_kses_post( $stepText ) !!}</p>
											</div>
										@endif
									</div>
								</li>
							@endforeach
						</ul>
					@endif

					@include( 'partials.btn-icon', [
						'text' => $attributes['buttonText'] ?? '',
						'type' => $attributes['buttonType'] ?? 'link',
						'link' => $attributes['buttonLink'] ?? '',
						'newTab' => $attributes['buttonLinkNewTab'] ?? false,
						'anchor' => $attributes['buttonAnchor'] ?? '',
						'popupId' => $attributes['buttonPopupId'] ?? '',
						'icon' => $attributes['buttonIcon'] ?? 'arrow',
						'class' => 'anim-block gap-big',
					] )
                </div>
            </div>
        </div>
    </div>
</section>