import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import ImageControls from "../../components/ImageControls";

const placeholderImage =
  window.ovchBlocks?.url + "resources/placeholders/card-visual.png";

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, imageId, imageUrl, title, lead, colOne, colTwo } =
    attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `exists ${noPaddingTop ? "pbs4" : "pbs2"}`;

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
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="exists__container">
            <div className="exists__wrap section-wrap">
              <div className="exists__img no-select" aria-hidden="true">
                <img src={imageUrl || placeholderImage} alt="" />
              </div>

              <div className="exists__body section-body">
                <RichText
                  tagName="h2"
                  className="tl2"
                  placeholder={__("Section title", "overchain-blocks")}
                  value={title}
                  onChange={(value) => setAttributes({ title: value })}
                />

                <div className="exists__content">
                  <RichText
                    tagName="div"
                    className="exists__lead txt2 medium"
                    placeholder={__("Lead paragraph", "overchain-blocks")}
                    value={lead}
                    onChange={(value) => setAttributes({ lead: value })}
                  />

                  <div className="exists__cols">
                    <RichText
                      tagName="div"
                      className="txt2 col-alt1"
                      placeholder={__("First column", "overchain-blocks")}
                      value={colOne}
                      onChange={(value) => setAttributes({ colOne: value })}
                    />

                    <RichText
                      tagName="div"
                      className="txt2 col-alt1"
                      placeholder={__("Second column", "overchain-blocks")}
                      value={colTwo}
                      onChange={(value) => setAttributes({ colTwo: value })}
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
