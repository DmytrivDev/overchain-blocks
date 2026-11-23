@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$sectionClass = 'summits ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
@endphp

@if ( '' !== trim( $content ) )
	<section class="{{ esc_attr( $sectionClass ) }}">
		<div class="summits__container">
			<div class="summits__wrap section-wrap{{ overchain_blocks_fade_class( $attributes ) }}">
				<div class="summits__body section-body">
					<ul class="summits__list">
						{!! $content !!}
					</ul>
				</div>
			</div>
		</div>
	</section>
@endif
