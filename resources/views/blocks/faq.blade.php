@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$enableDecor  = $attributes['enableDecor'] ?? true;
	$title        = $attributes['title'] ?? '';
	$items        = $attributes['items'] ?? [];

	$sectionClass = 'faq ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );

	// Same on every page that has the section — a fixed theme asset, not an attribute.
	$decorUrl = get_template_directory_uri() . '/assets/img/decor/faq_decor_1.png';

	// Rows with neither a question nor an answer would render an empty accordion
	// item that still increments the CSS counter.
	$items = array_values( array_filter(
		is_array( $items ) ? $items : [],
		function ( $item ) {
			return ! empty( $item['question'] ) || ! empty( $item['answer'] );
		}
	) );

	// The design's own aria-label is "Toggle accordion"; a screen reader announces the
	// label, not the class, so it is replaced with something a reader can act on.
	$toggleLabel = function_exists( 'pll__' )
		? pll__( 'Toggle answer' )
		: __( 'Toggle answer', 'overchain-blocks' );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="faq__container">
		<div class="faq__wrap section-wrap">
			@if ( $enableDecor )
				<div class="faq__decor no-select" aria-hidden="true">
					<img src="{{ esc_url( $decorUrl ) }}" alt="" loading="lazy" decoding="async">
				</div>
			@endif

			<div class="faq__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
				@if ( ! empty( $title ) )
					<div class="heading aic">
						<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
					</div>
				@endif

				@if ( ! empty( $items ) )
					{{-- `base-accord` is wired up in the theme's js/main.js; the `01`/`02`
					     numbers come from a CSS counter on `.faq__list .ac`, never stored,
					     so reordering questions never means renumbering them. --}}
					<ul class="faq__list base-accord accord">
						@foreach ( $items as $item )
							@php
								$question = $item['question'] ?? '';
								$answer   = $item['answer'] ?? '';
							@endphp

							<li class="ac">
								{{-- `.ac-panel` sits INSIDE `.ac-trigger`, not beside it. That is
								     what the design ships and what js/main.js expects: it attaches
								     a click handler to `.ac-panel` that stops propagation so
								     selecting the answer text does not collapse the item. --}}
								<div class="ac-trigger">
									<div class="ac-head">
										@if ( ! empty( $question ) )
											<h3 class="tl5 regular">{!! wp_kses_post( $question ) !!}</h3>
										@endif

										<button type="button" class="ac-toggle" aria-label="{{ esc_attr( $toggleLabel ) }}">
											<span></span>
										</button>
									</div>

									@if ( ! empty( $answer ) )
										<div class="ac-panel">
											<div class="faq__content txt2 light">
												<p>{!! wp_kses_post( $answer ) !!}</p>
											</div>
										</div>
									@endif
								</div>
							</li>
						@endforeach
					</ul>
				@endif
			</div>
		</div>
	</div>
</section>
