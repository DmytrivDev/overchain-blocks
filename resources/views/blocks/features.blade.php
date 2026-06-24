@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$sectionClass = 'feature ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );

	global $overchain_feature_card_index;
	$overchain_feature_card_index = 0;
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
	<div class="feature__container">
		<div class="feature__wrap">
			<div class="feature__blur no-select" aria-hidden="true"></div>

			<div class="feature__body section-body">
				<ul class="feature__cards">
					{!! $content !!}
				</ul>
			</div>
		</div>
	</div>
</section>