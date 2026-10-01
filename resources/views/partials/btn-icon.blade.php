@php
	$type = $type ?? 'link';
	$icon = $icon ?? 'calendar';
	$class = $class ?? '';
	// Raw `style` attribute value, e.g. `--i: 3` for a staggered reveal. Not to be
	// confused with btn-def's `style`, which is a style-modifier class.
	$inlineStyle = $inlineStyle ?? '';
@endphp

{{-- "Transparent" is the plain theme button: no icon, btn-def styling. Handled here
     so every block that already includes this partial supports it for free. --}}
@if ( 'transparent' === $icon )
	@include( 'partials.btn-def', [
		'text' => $text ?? '',
		'type' => $type,
		'link' => $link ?? '',
		'newTab' => $newTab ?? false,
		'anchor' => $anchor ?? '',
		'popupId' => $popupId ?? '',
		'style' => 'stl-trn',
		'class' => $class,
		'inlineStyle' => $inlineStyle,
	] )
@else
	@php
		$data = overchain_resolve_button_data( [
			'buttonType' => $type,
			'buttonLink' => $link ?? '',
			'buttonLinkNewTab' => $newTab ?? false,
			'buttonAnchor' => $anchor ?? '',
			'buttonPopupId' => $popupId ?? '',
		] );
		$href = $data['href'];
		$attrs = $data['attrs'];
		$iconUrl = get_template_directory_uri() . '/assets/img/icons/' . ( 'arrow' === $icon ? 'btn_2.svg' : 'btn_1.svg' );
	@endphp

	@if ( ! empty( $text ?? '' ) )
		<a class="btn-icon{{ ! empty( $class ) ? ' ' . $class : '' }}" href="{{ $href }}"@if ( ! empty( $inlineStyle ) ) style="{{ esc_attr( $inlineStyle ) }}"@endif {!! $attrs !!}>
			<span class="txt">{{ esc_html( $text ) }}</span>
			<span class="icon">
				<img src="{{ esc_url( $iconUrl ) }}" alt="">
			</span>
		</a>
	@endif
@endif
