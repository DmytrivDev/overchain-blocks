@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title        = $attributes['title'] ?? '';
	$text         = $attributes['text'] ?? '';
	$tags         = $attributes['tags'] ?? [];

	$sectionClass = 'modern ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );

	// Rows the editor added but never filled would render as empty pills.
	$tags = array_values( array_filter(
		is_array( $tags ) ? $tags : [],
		function ( $tag ) {
			return ! empty( $tag['label'] );
		}
	) );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="modern__container">
		<div class="modern__wrap section-wrap">
			<div class="modern__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
				@if ( ! empty( $title ) || ! empty( $text ) )
					<div class="heading aic">
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

				@if ( ! empty( $tags ) )
					<ul class="modern__list">
						@foreach ( $tags as $tag )
							<li class="modern__tag">{{ esc_html( $tag['label'] ) }}</li>
						@endforeach
					</ul>
				@endif
			</div>
		</div>
	</div>
</section>
