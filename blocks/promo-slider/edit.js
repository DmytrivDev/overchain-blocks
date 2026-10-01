import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import ImageListControls from "../../components/ImageListControls";
import ButtonControls from "../../components/ButtonControls";
import ButtonPreview from "../../components/ButtonPreview";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";
// Generated abstract art in the theme palette (cb3 / cg1 / cg2), 666x444 to match the
// design's slide ratio. Deliberately not a photo and fully opaque: a semi-transparent
// photo let the section background bleed through and read as broken content.
const placeholderImage =
  window.ovchBlocks?.url + "resources/placeholders/slide-visual.webp";

export default function Edit({ attributes, setAttributes }) {
  const {
    noPaddingTop,
    enableBackground,
    title,
    text,
    textAlt,
    slides = [],
    buttonText,
    buttonIcon,
  } = attributes;

  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = Math.min(activeSlide, Math.max(slides.length - 1, 0));

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `infrastruct mailing ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        <PanelBody title={__("Background", "overchain-blocks")}>
          <ToggleControl
            label={__("Show background image", "overchain-blocks")}
            checked={enableBackground}
            onChange={(value) => setAttributes({ enableBackground: value })}
          />
        </PanelBody>

        <ImageListControls
          items={slides}
          itemsAttribute="slides"
          setAttributes={setAttributes}
        />

        <ButtonControls attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="infrastruct__container">
            <div className="infrastruct__wrap section-wrap">
              {enableBackground && (
                <div className="infrastruct__bg no-select" aria-hidden="true">
                  <img
                    src={`${themeUrl}assets/img/decor/infrastruct_bg_1.jpg`}
                    alt=""
                  />
                </div>
              )}

              <div className="infrastruct__body section-body with-splide pis2">
                <div className="infrastruct__content">
                  <RichText
                    tagName="h2"
                    className="tl3"
                    placeholder={__("Section title", "overchain-blocks")}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                  />

                  <RichText
                    tagName="div"
                    className="txt2 medium"
                    placeholder={__("Lead text", "overchain-blocks")}
                    value={text}
                    onChange={(value) => setAttributes({ text: value })}
                  />

                  <RichText
                    tagName="div"
                    className="txt4"
                    placeholder={__("Secondary text", "overchain-blocks")}
                    value={textAlt}
                    onChange={(value) => setAttributes({ textAlt: value })}
                  />

                  <ButtonPreview text={buttonText} icon={buttonIcon} />
                </div>

                {slides.length > 0 && (
                  <div className="infrastruct__splide">
                    <div className="splide">
                      <div className="splide__track">
                        <ul className="splide__list">
                          {slides.map((slide, i) => (
                            <li
                              key={i}
                              className={`splide__slide splide-infrastruct ibg${
                                i === currentSlide ? " is-editor-active" : ""
                              }`}
                            >
                              <img
                                src={slide.imageUrl || placeholderImage}
                                alt=""
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {slides.length > 1 && (
                      <div className="ovch-editor-dots" aria-hidden="true">
                        {slides.map((slide, i) => (
                          <button
                            key={i}
                            type="button"
                            className={i === currentSlide ? "is-active" : ""}
                            onClick={() => setActiveSlide(i)}
                            aria-label={`${__("Slide", "overchain-blocks")} ${
                              i + 1
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
