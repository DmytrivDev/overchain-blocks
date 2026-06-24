import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import ImageControls from "../../components/ImageControls";

const ALLOWED_BLOCKS = ["overchain/spotlight-card"];

const TEMPLATE = [
  ["overchain/spotlight-card", {}],
  ["overchain/spotlight-card", {}],
  ["overchain/spotlight-card", {}],
  ["overchain/spotlight-card", {}],
];

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, title, backgroundId, backgroundUrl } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `control ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        <ImageControls
          type="image"
          title={__("Section image", "overchain-blocks")}
          imageId={backgroundId}
          imageUrl={backgroundUrl}
          imageIdAttribute="backgroundId"
          imageUrlAttribute="backgroundUrl"
          selectLabel={__("Select image", "overchain-blocks")}
          replaceLabel={__("Replace image", "overchain-blocks")}
          removeLabel={__("Remove image", "overchain-blocks")}
          setAttributes={setAttributes}
        />
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="control__container">
            <div className="control__wrap">
              <div
                className="control__decor no-select"
                aria-hidden="true"
              ></div>

              <div className="control__body section-body">
                <div className="heading">
                  <RichText
                    tagName="h2"
                    className="tl2"
                    placeholder={__("Section title", "overchain-blocks")}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                  />
                </div>

                <ul className="control__list grid-settings grid-2">
                  <InnerBlocks
                    allowedBlocks={ALLOWED_BLOCKS}
                    template={TEMPLATE}
                    orientation="horizontal"
                    renderAppender={InnerBlocks.ButtonBlockAppender}
                  />
                </ul>

                {backgroundUrl && (
                  <div className="control__img no-select" aria-hidden="true">
                    <img src={backgroundUrl} alt="" />
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
