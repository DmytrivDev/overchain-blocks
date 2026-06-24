@php
	$noPaddingTop = $attributes['noPaddingTop'] ?? false;
	$title = $attributes['title'] ?? '';
	$sourceType = $attributes['sourceType'] ?? 'latest';
	$postsCount = (int) ( $attributes['postsCount'] ?? 4 );
	$selectedIds = $attributes['selectedPosts'] ?? [];
	$sectionClass = 'related ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );

	$exclude = [];
	if ( is_singular( 'post' ) ) {
		$exclude[] = get_the_ID();
	}

	$currentCats = [];
	if ( is_singular( 'post' ) && in_array( $sourceType, [ 'latest', 'random' ] ) ) {
		$currentCats = wp_get_post_categories( get_the_ID(), [ 'fields' => 'ids' ] );
	}

	$queryArgs = [
		'post_type' => 'post',
		'post_status' => 'publish',
		'posts_per_page' => $postsCount,
		'post__not_in' => $exclude,
		'ignore_sticky_posts' => true,
	];

	if ( $sourceType === 'latest' ) {
		$queryArgs['orderby'] = 'date';
		$queryArgs['order'] = 'DESC';
		if ( ! empty( $currentCats ) ) {
			$queryArgs['category__in'] = $currentCats;
		}
	} elseif ( $sourceType === 'random' ) {
		$queryArgs['orderby'] = 'rand';
		if ( ! empty( $currentCats ) ) {
			$queryArgs['category__in'] = $currentCats;
		}
	} elseif ( $sourceType === 'manual' && ! empty( $selectedIds ) ) {
		$queryArgs['post__in'] = array_map( 'intval', $selectedIds );
		$queryArgs['posts_per_page'] = count( $selectedIds );
		$queryArgs['orderby'] = 'post__in';
		unset( $queryArgs['post__not_in'] );
	}

	$postsQuery = new WP_Query( $queryArgs );
@endphp

@if ( $postsQuery->have_posts() )
	<section class="{{ esc_attr( $sectionClass ) }}">
		<div class="related__container">
			<div class="related__body section-body">
				@if ( ! empty( $title ) )
					<div class="heading">
						<h2 class="tl2">{!! wp_kses_post( $title ) !!}</h2>
					</div>
				@endif

				<div class="related__splide base-splide">
					<div class="splide" data-lock>
						<div class="splide__track">
							<ul class="splide__list">
								@php
									while ( $postsQuery->have_posts() ) {
										$postsQuery->the_post();
										get_template_part( 'template-parts/content' );
									}
									wp_reset_postdata();
								@endphp
							</ul>
						</div>
					</div>

					<div class="drag-arrow" aria-hidden="true"></div>
				</div>
			</div>
		</div>
	</section>
@endif