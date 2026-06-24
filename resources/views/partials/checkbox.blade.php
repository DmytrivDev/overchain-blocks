@php
    $id       = $id ?? '';
    $name     = $name ?? '';
    $text     = $text ?? '';
    $required = $required ?? false;
@endphp

<div data-hsfc-id="CheckboxField" class="hsfc-CheckboxField" id="{{ $id }}">
    <label
        data-hsfc-id="FieldLabel"
        id="{{ $id }}-label"
        for="{{ $id }}-input"
        lang="EN"
        class="hsfc-FieldLabel"
    >
        <input
            type="checkbox"
            data-required="{{ $required ? '1' : '0' }}"
            data-hsfc-id="CheckboxInput"
            id="{{ $id }}-input"
            name="{{ $name }}"
            aria-invalid="false"
            aria-required="{{ $required ? 'true' : 'false' }}"
            aria-labelledby="{{ $id }}-label"
            class="hsfc-CheckboxInput"
            value="false"
        />
        <span>
            <span>{!! wp_kses_post( $text ) !!}</span>
            @if ( $required )
                <span class="hsfc-FieldLabel__RequiredIndicator">*</span>
            @endif
        </span>
    </label>
</div>