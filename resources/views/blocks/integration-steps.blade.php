@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title        = $attributes['title'] ?? '';
	$text         = $attributes['text'] ?? '';
	$steps        = $attributes['steps'] ?? [];

	// A fresh block arrives with three empty steps, and an editor can add more than
	// they fill. An untouched row would still render its icon and its number, so drop
	// the empty ones — `array_values` keeps the numbering sequential afterwards.
	$steps = array_values( array_filter(
		is_array( $steps ) ? $steps : [],
		function ( $step ) {
			return ! empty( $step['title'] ) || ! empty( $step['text'] );
		}
	) );

	$sectionClass = 'steps ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="steps__container">
		<div class="steps__wrap section-wrap">
			<div class="steps__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
				@if ( ! empty( $title ) || ! empty( $text ) )
					<div class="heading">
						@if ( ! empty( $title ) )
							<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
						@endif

						@if ( ! empty( $text ) )
							<div class="txt2 col-alt1">
								<p>{!! wp_kses_post( $text ) !!}</p>
							</div>
						@endif
					</div>
				@endif

				<div class="steps__layout">
					@if ( ! empty( $steps ) )
						<ul class="steps__list">
							@foreach ( $steps as $index => $step )
								@php
									$stepTitle = $step['title'] ?? '';
									$stepText  = $step['text'] ?? '';
									$stepNumber = str_pad( (string) ( $index + 1 ), 2, '0', STR_PAD_LEFT );

									// The design ships three glyphs and uses them in order, so the
									// cycle is the fallback rather than the value: an untouched block
									// looks like the design, and an editor can still override any one
									// step. The modulo keeps a fourth step from requesting a file
									// that does not exist.
									$iconUrl = $step['iconUrl'] ?? '';

									if ( empty( $iconUrl ) ) {
										$iconUrl = get_template_directory_uri()
											. '/assets/img/icons/steps_icon_' . ( ( $index % 3 ) + 1 ) . '.svg';
									}
								@endphp

								<li class="item-steps">
									<div class="item-steps__icon">
										<img src="{{ esc_url( $iconUrl ) }}" alt="">
									</div>

									<div class="item-steps__content">
										{{-- Derived from the index, never stored: reordering steps must
										     not mean renumbering them by hand. --}}
										<span class="item-steps__num">{{ esc_html( $stepNumber ) }}</span>

										<div class="item-steps__box">
											@if ( ! empty( $stepTitle ) )
												<h3 class="tl5 regular">{!! wp_kses_post( $stepTitle ) !!}</h3>
											@endif

											@if ( ! empty( $stepText ) )
												<div class="txt2 col-alt1">
													<p>{!! wp_kses_post( $stepText ) !!}</p>
												</div>
											@endif
										</div>
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
						'icon' => $attributes['buttonIcon'] ?? 'calendar',
						'class' => 'steps__btn',
					] )
				</div>
			</div>
		</div>
	</div>
</section>
