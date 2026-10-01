@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title        = $attributes['title'] ?? '';
	$text         = $attributes['text'] ?? '';

	$sectionClass = 'operations ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );

	$decorUrl = get_template_directory_uri() . '/assets/img/decor/operations_decor_1.jpg';
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="operations__container">
		<div class="operations__wrap section-wrap">
			{{-- Always on: the design's only `.operations` section carries the decor and
			     there is no variant without it. --}}
			<div class="operations__decor no-select" aria-hidden="true">
				<img src="{{ esc_url( $decorUrl ) }}" alt="">
			</div>

			<div class="operations__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
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

				<ul class="operations__cards">
					{!! $content !!}
				</ul>
			</div>
		</div>
	</div>
</section>
