import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  useInnerBlocksProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";

const CHILD = "overchain/reason";
const TEMPLATE = [[CHILD], [CHILD], [CHILD], [CHILD], [CHILD], [CHILD]];

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

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
    { className: "brokers__list", role: "list" },
    {
      allowedBlocks: [CHILD],
      template: TEMPLATE,
      orientation: "horizontal",
      renderAppender: InnerBlocks.ButtonBlockAppender,
    },
  );

  const sectionClass = `brokers ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <div {...blockProps}>
        {/* Same markup as the Blade view, minus the reveal-animation hooks. */}
        <section className={sectionClass}>
          <div className="brokers__container">
            <div className="brokers__wrap section-wrap">
              <div className="brokers__decor no-select" aria-hidden="true">
                <img src={`${themeUrl}assets/img/decor/brokers_decor_1.jpg`} alt="" />
              </div>

              <div className="brokers__body section-body">
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
