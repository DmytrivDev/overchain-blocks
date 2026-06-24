@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title        = $attributes['title'] ?? '';
	$text         = $attributes['text'] ?? '';

	$sectionClass = 'funds ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="funds__container">
		<div class="funds__body section-body">
			<div class="heading">
				@if ( ! empty( $title ) )
					<h2 class="tl2">{!! wp_kses_post( $title ) !!}</h2>
				@endif

				@if ( ! empty( $text ) )
					<div class="txt2">
						<p>{!! wp_kses_post( $text ) !!}</p>
					</div>
				@endif
			</div>

			<ul class="funds__cards">
				{!! $content !!}
			</ul>
		</div>
	</div>
</section>