import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  useInnerBlocksProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";

const CHILD = "overchain/onboarding-step";
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
    { className: "startright__steps", role: "list" },
    {
      allowedBlocks: [CHILD],
      template: TEMPLATE,
      orientation: "horizontal",
      renderAppender: InnerBlocks.ButtonBlockAppender,
    },
  );

  const sectionClass = `startright ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <div {...blockProps}>
        {/* Same markup as the Blade view, minus the reveal-animation hooks. */}
        <section className={sectionClass}>
          <div className="startright__container">
            <div className="startright__wrap section-wrap">
              <div className="startright__body section-body">
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

                {/* The joining line is drawn in the canvas (editor.scss); on the front
                    threshold.js draws it in on scroll. */}
                <div className="startright__layout">
                  <div className="startright__line" aria-hidden="true"></div>
                  <ul {...listProps} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
