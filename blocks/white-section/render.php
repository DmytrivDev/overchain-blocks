<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$show_decor = $attributes['showDecor'] ?? true;
$decor_url = get_template_directory_uri() . '/assets/img/decor/frame_blur_1.webp';
?>

<div class="frame-colored pbs2">
	<div class="frame-colored__container">
		<div class="frame-colored__body pbe4">
			<?php echo $content; ?>
		</div>
		<?php if ( $show_decor ) : ?>
			<div class="frame-colored__blur blur1 no-select" aria-hidden="true">
				<img src="<?php echo esc_url( $decor_url ); ?>" alt="">
			</div>
		<?php endif; ?>
	</div>
</div>