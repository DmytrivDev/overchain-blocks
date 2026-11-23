import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  useInnerBlocksProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";

const CHILD = "overchain/event-card";
const TEMPLATE = [[CHILD]];

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  // The list element itself is the inner-blocks container, so the children (<li>
  // block wrappers) are its direct children and the design's own grid / flex applies.
  const listProps = useInnerBlocksProps(
    { className: "summits__list", role: "list" },
    {
      allowedBlocks: [CHILD],
      template: TEMPLATE,
      orientation: "horizontal",
      renderAppender: InnerBlocks.ButtonBlockAppender,
    },
  );

  const sectionClass = `summits ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <div {...blockProps}>
        {/* Same markup as the Blade view, minus the reveal-animation hooks. */}
        <section className={sectionClass}>
          <div className="summits__container">
            <div className="summits__wrap section-wrap">
              <div className="summits__body section-body">
                <ul {...listProps} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
