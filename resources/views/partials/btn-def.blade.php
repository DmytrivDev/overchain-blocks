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
	$class = $class ?? '';
	$style = $style ?? '';
	$inlineStyle = $inlineStyle ?? '';
@endphp

@if ( ! empty( $text ?? '' ) )
	<a class="btn-def{{ ! empty( $style ) ? ' ' . $style : '' }}{{ ! empty( $class ) ? ' ' . $class : '' }}" href="{{ $href }}"@if ( ! empty( $inlineStyle ) ) style="{{ esc_attr( $inlineStyle ) }}"@endif {!! $attrs !!}>{{ esc_html( $text ) }}</a>
@endif
