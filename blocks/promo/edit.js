import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

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

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

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
            <div className="infrastruct__wrap">
              <div className="infrastruct__bg no-select" aria-hidden="true">
                <img
                  src={`${themeUrl}assets/img/decor/infrastruct_bg_1.jpg`}
                  alt=""
                />
              </div>

              <div className="infrastruct__body section-body">
                <div className="infrastruct__img mouse-prllx">
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
