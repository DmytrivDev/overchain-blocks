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

export default function Edit({ attributes, setAttributes }) {
  const {
    noPaddingTop,
    title,
    subtitle,
    imageId,
    imageUrl,
    text,
    buttonText,
    buttonIcon,
  } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `actually ${noPaddingTop ? "pbs4" : "pbs2"}`;

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
          <div className="actually__container">
            <div className="actually__wrap">
              {imageUrl && (
                <div className="actually__media no-select" aria-hidden="true">
                  <img src={imageUrl} alt="" />
                </div>
              )}

              <div className="actually__body section-body">
                <div className="actually__top">
                  <RichText
                    tagName="h2"
                    className="tl2"
                    placeholder={__("Section title", "overchain-blocks")}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                  />

                  <RichText
                    tagName="div"
                    className="txt2 medium"
                    placeholder={__("Short subtitle", "overchain-blocks")}
                    value={subtitle}
                    onChange={(value) => setAttributes({ subtitle: value })}
                  />
                </div>

                <div className="actually__bottom">
                  <RichText
                    tagName="div"
                    className="txt2 col-alt1"
                    placeholder={__("Supporting text", "overchain-blocks")}
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
