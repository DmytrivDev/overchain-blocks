import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import ImageControls from "../../components/ImageControls";
import ButtonControls from "../../components/ButtonControls";
import ButtonPreview from "../../components/ButtonPreview";

const placeholderImage =
  window.ovchBlocks?.url + "resources/placeholders/coins.png";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

export default function Edit({ attributes, setAttributes }) {
  const {
    noPaddingTop,
    mediaLayout,
    title,
    text,
    imageId,
    imageUrl,
    buttonText,
    buttonIcon,
  } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `infrastruct ${noPaddingTop ? "pbs4" : "pbs2"}`;
  const previewImage = imageUrl || placeholderImage;

  // The base class only sets `position: absolute` — every offset and width lives
  // on the numbered modifier, and `img2` additionally pushes the content across
  // with `pis1`. Compared rather than interpolated so no stray value can reach
  // the class attribute.
  const isWide = mediaLayout === "img2";
  const bodyClass = `infrastruct__body section-body${isWide ? " pis1" : ""}`;
  const imgClass = isWide
    ? "infrastruct__img img2"
    : "infrastruct__img img1 mouse-prllx";

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
            value={mediaLayout}
            options={[
              {
                label: __("Small image, with parallax", "overchain-blocks"),
                value: "img1",
              },
              {
                label: __("Large image, content offset right", "overchain-blocks"),
                value: "img2",
              },
            ]}
            onChange={(value) => setAttributes({ mediaLayout: value })}
          />
        </PanelBody>

        <ImageControls
          type="image"
          imageId={imageId}
          imageUrl={imageUrl}
          imageIdAttribute="imageId"
          imageUrlAttribute="imageUrl"
          setAttributes={setAttributes}
        />

        <ButtonControls
          attributes={attributes}
          setAttributes={setAttributes}
          initialOpen={false}
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
                <div className={imgClass}>
                  <img
                    src={previewImage}
                    alt=""
                    style={!imageUrl ? { opacity: 0.3 } : {}}
                  />
                </div>

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
                    placeholder={__("Short description", "overchain-blocks")}
                    value={text}
                    onChange={(value) => setAttributes({ text: value })}
                  />

                  <ButtonPreview text={buttonText} icon={buttonIcon} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
