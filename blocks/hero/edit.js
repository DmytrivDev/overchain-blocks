import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

import ButtonPreview from "../../components/ButtonPreview";
import ButtonControls from "../../components/ButtonControls";
import ImageControls from "../../components/ImageControls";

export default function Edit({ attributes, setAttributes }) {
  const {
    title,
    subtitle,
    buttonText,
    buttonIcon,
    backgroundId,
    backgroundUrl,
  } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  return (
    <>
      <InspectorControls>
        <ImageControls
          type="image"
          title={__("Background", "overchain-blocks")}
          imageId={backgroundId}
          imageUrl={backgroundUrl}
          imageIdAttribute="backgroundId"
          imageUrlAttribute="backgroundUrl"
          selectLabel={__("Select background", "overchain-blocks")}
          replaceLabel={__("Replace background", "overchain-blocks")}
          removeLabel={__("Remove background", "overchain-blocks")}
          setAttributes={setAttributes}
        />

        <ButtonControls
          attributes={attributes}
          setAttributes={setAttributes}
        />
      </InspectorControls>

      <div {...blockProps}>
        <section className="hero-home hero">
          {backgroundUrl && (
            <div className="hero__bg no-select" aria-hidden="true">
              <img src={backgroundUrl} alt="" />
            </div>
          )}

          <div className="hero__container">
            <div className="hero__body section-body">
              <div className="hero__content">
                <RichText
                  tagName="h1"
                  className="tl1"
                  placeholder={__("Title of the page", "overchain-blocks")}
                  value={title}
                  onChange={(value) => setAttributes({ title: value })}
                  allowedFormats={["core/bold", "core/italic"]}
                />

                <RichText
                  tagName="div"
                  className="txt1"
                  placeholder={__(
                    "Short description goes here",
                    "overchain-blocks",
                  )}
                  value={subtitle}
                  onChange={(value) => setAttributes({ subtitle: value })}
                  allowedFormats={["core/bold", "core/italic"]}
                />

                <ButtonPreview
                  text={buttonText}
                  icon={buttonIcon}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}