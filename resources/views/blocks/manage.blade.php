@php
	$noPaddingTop     = $attributes['noPaddingTop'] ?? false;
	$enableBackground = $attributes['enableBackground'] ?? true;
	$title            = $attributes['title'] ?? '';

	$sectionClass = 'manage ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );

	// Same on every page that has the section — a fixed theme asset, not an attribute.
	$backgroundUrl = get_template_directory_uri() . '/assets/img/decor/introflow_bg_1.jpg';
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="manage__container">
		<div class="manage__wrap section-wrap">
			@if ( $enableBackground )
				<div class="manage__bg no-select" aria-hidden="true">
					<img src="{{ esc_url( $backgroundUrl ) }}" alt="" loading="lazy" decoding="async">
				</div>
			@endif

			<div class="manage__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
				@if ( ! empty( $title ) )
					<div class="heading aic mbe2">
						<h2 class="tl2 anim-txt">{!! wp_kses_post( $title ) !!}</h2>
					</div>
				@endif

				<ul class="manage__cards">
					{!! $content !!}
				</ul>
			</div>
		</div>
	</div>
</section>
