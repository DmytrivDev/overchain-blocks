@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$logos        = $attributes['logos'] ?? [];

	$sectionClass = 'platform ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
@endphp

@if ( ! empty( $logos ) )
	<section class="{{ esc_attr( $sectionClass ) }}">
		<div class="platform__container">
			<div class="platform__body section-body">
				<h2 class="visually-hidden">Platforms</h2>

				<ul class="platform__list">
					@foreach ( $logos as $logo )
						@php
							$imageUrl = $logo['imageUrl'] ?? '';
							$link     = $logo['link'] ?? '';
						@endphp

						@if ( ! empty( $imageUrl ) )
							<li class="item-platform">
								@if ( ! empty( $link ) )
									<a
										href="{{ esc_url( $link ) }}"
										class="item-platform__logo"
										target="_blank"
										rel="noopener noreferrer"
									>
										<img src="{{ esc_url( $imageUrl ) }}" alt="">
									</a>
								@else
									<div class="item-platform__logo">
										<img src="{{ esc_url( $imageUrl ) }}" alt="">
									</div>
								@endif
							</li>
						@endif
					@endforeach
				</ul>
			</div>
		</div>
	</section>
@endif