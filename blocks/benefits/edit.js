import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  useInnerBlocksProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import ButtonControls from "../../components/ButtonControls";
import ButtonPreview from "../../components/ButtonPreview";

const CHILD = "overchain/benefit-card";
const TEMPLATE = [[CHILD], [CHILD], [CHILD], [CHILD]];

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, title, buttonText, buttonIcon } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  // The list element itself is the inner-blocks container, so the children (<li>
  // block wrappers) are its direct children and the design's own grid / flex applies.
  const listProps = useInnerBlocksProps(
    { className: "delays__cards", role: "list" },
    {
      allowedBlocks: [CHILD],
      template: TEMPLATE,
      orientation: "horizontal",
      renderAppender: InnerBlocks.ButtonBlockAppender,
    },
  );

  const sectionClass = `delays ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls attributes={attributes} setAttributes={setAttributes} />

        <ButtonControls attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <div {...blockProps}>
        {/* Same markup as the Blade view, minus the reveal-animation hooks. */}
        <section className={sectionClass}>
          <div className="delays__container">
            <div className="delays__wrap section-wrap">
              <div className="delays__body section-body">
                <div className="heading aic">
                  <RichText
                    tagName="h2"
                    className="tl2"
                    placeholder={__("Section title", "overchain-blocks")}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                    allowedFormats={["core/bold", "core/italic", "core/text-color"]}
                  />
                </div>

                <ul {...listProps} />

                <ButtonPreview text={buttonText} icon={buttonIcon} className="delays__btn" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
