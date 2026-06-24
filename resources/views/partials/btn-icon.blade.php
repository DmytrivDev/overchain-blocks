@php
	$data = overchain_resolve_button_data( [
		'buttonType' => $type ?? 'link',
		'buttonLink' => $link ?? '',
		'buttonLinkNewTab' => $newTab ?? false,
		'buttonAnchor' => $anchor ?? '',
		'buttonPopupId' => $popupId ?? '',
	] );
	$href = $data['href'];
	$attrs = $data['attrs'];
	$iconUrl = get_template_directory_uri() . '/assets/img/icons/' . ( ( $icon ?? 'calendar' ) === 'arrow' ? 'btn_2.svg' : 'btn_1.svg' );
	$class = $class ?? '';
@endphp

@if ( ! empty( $text ?? '' ) )
	<a class="btn-icon{{ ! empty( $class ) ? ' ' . $class : '' }}" href="{{ $href }}" {!! $attrs !!}>
		<span class="txt">{{ esc_html( $text ) }}</span>
		<span class="icon">
			<img src="{{ esc_url( $iconUrl ) }}" alt="">
		</span>
	</a>
@endif