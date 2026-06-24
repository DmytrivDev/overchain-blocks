@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$videoUrl     = $attributes['videoUrl'] ?? '';
	$videoType    = $attributes['videoType'] ?? 'video/mp4';
	$posterUrl    = $attributes['posterUrl'] ?? '';

	$isSingle = is_singular() && ! is_page();
	$sectionClass = $isSingle ? 'emb emb-video pbs2' : 'preview' . ( $noPaddingTop ? '' : ' pbs2' );

	
@endphp
@if ( ! empty( $videoUrl ) )
	@if ( $isSingle )
		<section class="{{ esc_attr( $sectionClass ) }}">
			<div class="emb__container">
				<div class="emb__body section-body">
					<div class="emb-video__main media-box ibg">
						<video
							@if ( ! empty( $posterUrl ) ) poster="{{ esc_url( $posterUrl ) }}" @endif
							preload="metadata"
						>
							<source src="{{ esc_url( $videoUrl ) }}" type="{{ esc_attr( $videoType ) }}">
						</video>

						<button type="button" class="video-play" aria-label="Video play">
							<span></span>
						</button>
					</div>
				</div>
			</div>
		</section>
	@else
		<section class="{{ esc_attr( $sectionClass ) }}">
			<div class="preview__container">
				<div class="preview__body section-body">
					<h2 class="tl2 visually-hidden">Video Preview</h2>

					<div class="preview__video media-box ibg">
						<video
							@if ( ! empty( $posterUrl ) ) poster="{{ esc_url( $posterUrl ) }}" @endif
							preload="metadata"
						>
							<source src="{{ esc_url( $videoUrl ) }}" type="{{ esc_attr( $videoType ) }}">
						</video>

						<button type="button" class="video-play" aria-label="Video play">
							<span></span>
						</button>
					</div>
				</div>
			</div>
		</section>
	@endif
@endif