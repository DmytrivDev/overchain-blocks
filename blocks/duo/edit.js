import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";

import SectionSettingsControls from "../../components/SectionSettingsControls";

const ALLOWED_BLOCKS = ["overchain/duo-card"];

const TEMPLATE = [
  ["overchain/duo-card", {}],
  ["overchain/duo-card", {}],
];

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, title, text, threeColumns, enableDecor } = attributes;
  const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `funds ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        <PanelBody title={__("Layout", "overchain-blocks")}>
          <ToggleControl
            label={__("Three compact cards per row", "overchain-blocks")}
            help={__("FM London: three narrower cards instead of two.", "overchain-blocks")}
            checked={!!threeColumns}
            onChange={(value) => setAttributes({ threeColumns: value })}
          />
          <ToggleControl
            label={__("Background decor", "overchain-blocks")}
            checked={!!enableDecor}
            onChange={(value) => setAttributes({ enableDecor: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="funds__container">
            <div className="funds__wrap section-wrap">
              {enableDecor && (
                <div className="funds__decor no-select" aria-hidden="true">
                  <img src={`${themeUrl}assets/img/decor/funds_bg_1.jpg`} alt="" />
                </div>
              )}
              <div className="funds__body section-body">
                <div className="heading">
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
                    placeholder={__("Supporting text", "overchain-blocks")}
                    value={text}
                    onChange={(value) => setAttributes({ text: value })}
                  />
                </div>

                <ul
                  className={`funds__cards grid-settings ${
                    threeColumns ? "columns-card-3 grid-3" : "grid-2"
                  }`}
                >
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
