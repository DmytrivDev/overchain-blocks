import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";

import SectionSettingsControls from "../../components/SectionSettingsControls";

const ALLOWED_BLOCKS = ["overchain/team-card"];

// One row on desktop: the frontend slider runs perPage 4.
const TEMPLATE = [
  ["overchain/team-card", {}],
  ["overchain/team-card", {}],
  ["overchain/team-card", {}],
  ["overchain/team-card", {}],
];

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, title, text, centerHeading, lightPlaceholders } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `understand ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        <PanelBody title={__("Layout", "overchain-blocks")}>
          <ToggleControl
            label={__("Centre the heading", "overchain-blocks")}
            checked={!!centerHeading}
            onChange={(value) => setAttributes({ centerHeading: value })}
          />
          <ToggleControl
            label={__("Light photo placeholders", "overchain-blocks")}
            help={__(
              "For a Team inside a White Section: people without a photo get the light card and the dark icon.",
              "overchain-blocks",
            )}
            checked={!!lightPlaceholders}
            onChange={(value) => setAttributes({ lightPlaceholders: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="understand__container">
            <div className="understand__wrap section-wrap">
              <div className="understand__body section-body">
                <div className={centerHeading ? "heading aic" : "heading"}>
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
                    placeholder={__("Section text", "overchain-blocks")}
                    value={text}
                    onChange={(value) => setAttributes({ text: value })}
                  />
                </div>

                <div className="understand__splide">
                  <div className="splide">
                    <div className="splide__track">
                      <ul className="splide__list">
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
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
