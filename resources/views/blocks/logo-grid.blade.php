@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title        = $attributes['title'] ?? '';
	$text         = $attributes['text'] ?? '';
	$platforms    = $attributes['platforms'] ?? [];

	$sectionClass = 'funds ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );

	// Fixed design asset behind the section (platform-overview); the design has no
	// such layer on aviation, so it is opt-in. Hidden below 992px by blocks.css.
	$enableBg = $attributes['enableBg'] ?? false;
	$bgUrl    = get_template_directory_uri() . '/assets/img/decor/introflow_bg_1.jpg';

	// A fresh block ships three empty rows, and an editor can add more than they
	// fill. Half-filled rows would stretch the design's flex rules around an empty
	// tile, so drop them; with none left the list goes with them.
	$logos = array_values( array_filter(
		is_array( $platforms ) ? $platforms : [],
		static fn( $logo ) => ! empty( $logo['imageUrl'] )
	) );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="funds__container">
		<div class="funds__wrap section-wrap">
			@if ( $enableBg )
				<div class="funds__bg no-select" aria-hidden="true">
					<img src="{{ esc_url( $bgUrl ) }}" alt="" loading="lazy" decoding="async">
				</div>
			@endif

			<div class="funds__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
				@if ( ! empty( $title ) || ! empty( $text ) )
					<div class="heading">
						@if ( ! empty( $title ) )
							<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
						@endif

						@if ( ! empty( $text ) )
							<div class="txt2">
								<p>{!! wp_kses_post( $text ) !!}</p>
							</div>
						@endif
					</div>
				@endif

				@if ( ! empty( $logos ) )
					<ul class="funds__platforms">
						@foreach ( $logos as $logo )
							<li class="platforms-funds">
								<div class="platforms-funds__logo">
									<img src="{{ esc_url( $logo['imageUrl'] ) }}" alt="">
								</div>
							</li>
						@endforeach
					</ul>
				@endif
			</div>
		</div>
	</div>
</section>
