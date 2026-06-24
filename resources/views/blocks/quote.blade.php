@php
    $noPaddingTop = $attributes['noPaddingTop'] ?? false;
    $quote        = $attributes['quote'] ?? '';
    $author       = $attributes['author'] ?? '';
    $position     = $attributes['position'] ?? '';
    $avatarUrl    = $attributes['avatarUrl'] ?? '';
    $sectionClass = 'emb emb-excerpt ' . ( $noPaddingTop ? 'pbs4' : 'pbs2' );
    $decorImg     = get_template_directory_uri() . '/assets/img/decor/emb-excerpt_img_1.png';
    $decorBg      = get_template_directory_uri() . '/assets/img/decor/infrastruct_bg_1.jpg';
@endphp

<section class="{{ esc_attr( $sectionClass ) }}">
    <div class="emb__container">
        <div class="emb__body section-body">
            <div class="emb-excerpt__main">
                <div class="emb-excerpt__img no-select" aria-hidden="true">
                    <img src="{{ esc_url( $decorImg ) }}" alt="">
                </div>

                @if ( ! empty( $quote ) )
                    <blockquote class="emb-excerpt__mess">
                        <p>{!! wp_kses_post( $quote ) !!}</p>
                    </blockquote>
                @endif

                @if ( ! empty( $author ) || ! empty( $avatarUrl ) )
                    <div class="emb-excerpt__author">
                        @if ( ! empty( $avatarUrl ) )
                            <div class="ava ibg">
                                <img src="{{ esc_url( $avatarUrl ) }}" alt="{{ esc_attr( $author ) }}">
                            </div>
                        @endif
                        <div class="person">
                            @if ( ! empty( $author ) )
                                <p>{!! wp_kses_post( $author ) !!}</p>
                            @endif
                            @if ( ! empty( $position ) )
                                <span>{!! wp_kses_post( $position ) !!}</span>
                            @endif
                        </div>
                    </div>
                @endif

                <div class="emb-excerpt__bg no-select" aria-hidden="true">
                    <img src="{{ esc_url( $decorBg ) }}" alt="">
                </div>
            </div>
        </div>
    </div>
</section>