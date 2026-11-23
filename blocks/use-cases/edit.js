import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  useInnerBlocksProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";

const CHILD = "overchain/use-case-card";
const TEMPLATE = [[CHILD], [CHILD], [CHILD], [CHILD]];

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, title } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  // The list element itself is the inner-blocks container, so the children (<li>
  // block wrappers) are its direct children and the design's own grid / flex applies.
  const listProps = useInnerBlocksProps(
    { className: "institution__cards", role: "list" },
    {
      allowedBlocks: [CHILD],
      template: TEMPLATE,
      orientation: "horizontal",
      renderAppender: InnerBlocks.ButtonBlockAppender,
    },
  );

  const sectionClass = `institution ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <div {...blockProps}>
        {/* Same markup as the Blade view, minus the reveal-animation hooks. */}
        <section className={sectionClass}>
          <div className="institution__container">
            <div className="institution__wrap section-wrap">
              <div className="institution__body section-body">
                <div className="heading mbe2">
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
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
