import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

import { PanelBody, SelectControl } from "@wordpress/components";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import ImageControls from "../../components/ImageControls";
import ImageListControls from "../../components/ImageListControls";
import TextSettingsControls from "../../components/TextSettingsControls";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";
const placeholderImage =
  window.ovchBlocks?.url + "resources/placeholders/coins.png";

export default function Edit({ attributes, setAttributes }) {
  const {
    noPaddingTop,
    mediaType,
    slides = [],
    title,
    subtitle,
    privacy,
    imageId,
    imageUrl,
    successTitle,
    successDesc,
  } = attributes;

  const [activeSlide, setActiveSlide] = useState(0);
  const currentSlide = Math.min(activeSlide, Math.max(slides.length - 1, 0));

  const blockProps = useBlockProps({ style: { padding: 0, margin: 0 } });
  const previewImage = imageUrl || placeholderImage;
  const isSlider = mediaType === "slider";
  const sectionClass = `infrastruct mailing ${noPaddingTop ? "pbs4" : "pbs2"}`;
  const bodyClass = `infrastruct__body section-body${
    isSlider ? " with-splide pis2" : ""
  }`;

  // Mirrors partials/subscribe-form.blade.php — the same markup sits in either
  // .infrastruct__content (image layout) or .infrastruct__bottom (slider layout).
  const formPreview = (
    <div className="form-infrastruct base-form">
      <label className="form-infrastruct__label">
        {__("Enter Your Email", "overchain-blocks")}
      </label>
      <div className="form-infrastruct__layout">
        <span className="form-infrastruct__input">
          <input type="email" placeholder="Example@company.com" disabled />
        </span>
        <button className="form-infrastruct__submit btn-def" disabled>
          {__("Subscribe", "overchain-blocks")}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        <PanelBody title={__("Layout", "overchain-blocks")}>
          <SelectControl
            label={__("Media", "overchain-blocks")}
            value={mediaType}
            options={[
              { label: __("Side image", "overchain-blocks"), value: "image" },
              { label: __("Slider", "overchain-blocks"), value: "slider" },
            ]}
            onChange={(value) => setAttributes({ mediaType: value })}
          />
        </PanelBody>

        {isSlider && (
          <ImageListControls
            items={slides}
            itemsAttribute="slides"
            setAttributes={setAttributes}
          />
        )}

        <ImageControls
          type="image"
          imageId={imageId}
          imageUrl={imageUrl}
          imageIdAttribute="imageId"
          imageUrlAttribute="imageUrl"
          setAttributes={setAttributes}
        />
        <TextSettingsControls
          title={__("Success modal", "overchain-blocks")}
          initialOpen={false}
          controls={[
            {
              attribute: "successTitle",
              label: __("Title", "overchain-blocks"),
              value: successTitle,
              onChange: (value) => setAttributes({ successTitle: value }),
            },
            {
              attribute: "successDesc",
              label: __("Description", "overchain-blocks"),
              value: successDesc,
              type: "textarea",
              onChange: (value) => setAttributes({ successDesc: value }),
            },
          ]}
        />
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="infrastruct__container">
            <div className="infrastruct__wrap section-wrap">
              <div className="infrastruct__bg no-select" aria-hidden="true">
                <img
                  src={`${themeUrl}assets/img/decor/infrastruct_bg_1.jpg`}
                  alt=""
                />
              </div>

              <div className={bodyClass}>
                {!isSlider && (
                  <div className="infrastruct__img img1">
                    <img
                      src={previewImage}
                      alt=""
                      style={!imageUrl ? { opacity: 0.3 } : {}}
                    />
                  </div>
                )}

                <div className="infrastruct__content">
                  <RichText
                    tagName="h2"
                    className="tl3"
                    placeholder={__("Section title", "overchain-blocks")}
                    value={title}
                    onChange={(v) => setAttributes({ title: v })}
                  />
                  <div className="txt2 medium">
                    <RichText
                      tagName="p"
                      placeholder={__("Short description", "overchain-blocks")}
                      value={subtitle}
                      onChange={(v) => setAttributes({ subtitle: v })}
                    />
                  </div>

                  {!isSlider && formPreview}
                </div>

                {isSlider && slides.length > 0 && (
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
                            aria-label={`${__(
                              "Slide",
                              "overchain-blocks"
                            )} ${i + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="infrastruct__bottom">
                  {isSlider && formPreview}
                  <div className="text">
                    <RichText
                      tagName="p"
                      placeholder={__("Privacy text...", "overchain-blocks")}
                      value={privacy}
                      onChange={(v) => setAttributes({ privacy: v })}
                      allowedFormats={["core/link", "core/bold", "core/italic"]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}