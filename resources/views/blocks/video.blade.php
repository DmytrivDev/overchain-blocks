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
				<div class="emb__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
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
				<div class="preview__wrap section-wrap">
					<div class="preview__body section-body{{ overchain_blocks_fade_class( $attributes ) }}">
						<h2 class="tl2 visually-hidden">Video Preview</h2>

						{{-- Ambient loop, as in the design: plays muted on its own and never
						     stops, so there is no `.media-box` / play button (those are the
						     click-to-play `.emb-video` above). The theme carries the same markup
						     in template-parts/ui/preview-video.php — keep the two in step. --}}
						<div class="preview__video ibg">
							<video
								autoplay muted loop playsinline
								@if ( ! empty( $posterUrl ) ) poster="{{ esc_url( $posterUrl ) }}" @endif
								preload="metadata"
							>
								<source src="{{ esc_url( $videoUrl ) }}" type="{{ esc_attr( $videoType ) }}">
							</video>
						</div>
					</div>
				</div>
			</div>
		</section>
	@endif
@endif