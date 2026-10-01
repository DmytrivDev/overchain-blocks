import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";

import SectionSettingsControls from "../../components/SectionSettingsControls";

const ALLOWED_BLOCKS = ["overchain/manage-card"];

const TEMPLATE = [
  ["overchain/manage-card", {}],
  ["overchain/manage-card", {}],
];

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, enableBackground, title } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `manage ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        <PanelBody title={__("Background", "overchain-blocks")} initialOpen={false}>
          <ToggleControl
            label={__("Show background image", "overchain-blocks")}
            checked={enableBackground}
            onChange={(value) => setAttributes({ enableBackground: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="manage__container">
            <div className="manage__wrap section-wrap">
              {/* `.manage__bg` is deliberately NOT rendered in the canvas: 1202x674
                  anchored 3rem above its own section-wrap, so it spills far below
                  the section and paints over the next block. The toggle still
                  drives the front — same call as the Locations and FAQ decor. */}

              <div className="manage__body section-body">
                <div className="heading aic mbe2">
                  <RichText
                    tagName="h2"
                    className="tl2"
                    placeholder={__("Section title", "overchain-blocks")}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                  />
                </div>

                <ul className="manage__cards">
                  <InnerBlocks
                    allowedBlocks={ALLOWED_BLOCKS}
                    template={TEMPLATE}
                    orientation="horizontal"
                    renderAppender={InnerBlocks.ButtonBlockAppender}
                  />
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
