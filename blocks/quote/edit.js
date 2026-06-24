import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';

import SectionSettingsControls from '../../components/SectionSettingsControls';
import ImageControls from '../../components/ImageControls';

const placeholderIcon = window.ovchBlocks?.url + 'resources/placeholders/icon.svg';
const themeUrl = window.ovchBlocks?.themeUrl || '/wp-content/themes/overchain/';

export default function Edit( { attributes, setAttributes } ) {
    const { noPaddingTop, quote, author, position, avatarId, avatarUrl } = attributes;

    const blockProps = useBlockProps( { style: { padding: 0, margin: 0 } } );
    const sectionClass = `emb emb-excerpt ${ noPaddingTop ? 'pbs4' : 'pbs2' }`;

    return (
        <>
            <InspectorControls>
                <SectionSettingsControls
                    attributes={attributes}
                    setAttributes={setAttributes}
                />
                <ImageControls
                    type="icon"
                    imageId={avatarId}
                    imageUrl={avatarUrl}
                    imageIdAttribute="avatarId"
                    imageUrlAttribute="avatarUrl"
                    setAttributes={setAttributes}
                />
            </InspectorControls>

            <div { ...blockProps }>
                <section className={sectionClass}>
                    <div className="emb__container">
                        <div className="emb__body section-body">
                            <div className="emb-excerpt__main">
                                <div className="emb-excerpt__img no-select" aria-hidden="true">
                                    <img src={`${themeUrl}assets/img/decor/emb-excerpt_img_1.png`} alt="" />
                                </div>

                                <blockquote className="emb-excerpt__mess">
                                    <RichText
                                        tagName="p"
                                        placeholder={__( 'Quote text', 'overchain-blocks' )}
                                        value={quote}
                                        onChange={( v ) => setAttributes( { quote: v } )}
                                    />
                                </blockquote>

                                <div className="emb-excerpt__author">
                                    <div className="ava ibg">
                                        <img
                                            src={avatarUrl || placeholderIcon}
                                            alt=""
                                            style={!avatarUrl ? { opacity: 0.3 } : {}}
                                        />
                                    </div>
                                    <div className="person">
                                        <RichText
                                            tagName="p"
                                            placeholder={__( 'Author name', 'overchain-blocks' )}
                                            value={author}
                                            onChange={( v ) => setAttributes( { author: v } )}
                                        />
                                        <RichText
                                            tagName="span"
                                            placeholder={__( 'Position', 'overchain-blocks' )}
                                            value={position}
                                            onChange={( v ) => setAttributes( { position: v } )}
                                        />
                                    </div>
                                </div>

                                <div className="emb-excerpt__bg no-select" aria-hidden="true">
                                    <img src={`${themeUrl}assets/img/decor/infrastruct_bg_1.jpg`} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}