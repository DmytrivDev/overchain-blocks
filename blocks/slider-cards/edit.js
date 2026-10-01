import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";

import SectionSettingsControls from "../../components/SectionSettingsControls";

const ALLOWED_BLOCKS = ["overchain/slider-card"];

const TEMPLATE = [
  ["overchain/slider-card", {}],
  ["overchain/slider-card", {}],
  ["overchain/slider-card", {}],
  ["overchain/slider-card", {}],
];

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, title, text, centerHeading = true } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `businesses ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        <PanelBody title={__("Layout", "overchain-blocks")}>
          <ToggleControl
            label={__("Center heading", "overchain-blocks")}
            checked={centerHeading}
            onChange={(value) => setAttributes({ centerHeading: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="businesses__container">
            <div className="businesses__wrap section-wrap">
              <div className="businesses__body section-body">
                <div className={`heading${centerHeading ? " aic" : ""}`}>
                  <RichText
                    tagName="h2"
                    className="tl2"
                    placeholder={__("Section title", "overchain-blocks")}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                  />

                  <RichText
                    tagName="div"
                    className="txt2"
                    placeholder={__("Section subtitle", "overchain-blocks")}
                    value={text}
                    onChange={(value) => setAttributes({ text: value })}
                  />
                </div>

                <div className="businesses__splide">
                  <ul className="businesses__list grid-settings grid-4">
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
          </div>
        </section>
      </div>
    </>
  );
}