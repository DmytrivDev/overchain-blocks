import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, SelectControl, ToggleControl } from "@wordpress/components";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import ButtonControls from "../../components/ButtonControls";
import ButtonPreview from "../../components/ButtonPreview";

const ALLOWED_BLOCKS = ["overchain/card"];

const TEMPLATE = [
  ["overchain/card", {}],
  ["overchain/card", {}],
  ["overchain/card", {}],
  ["overchain/card", {}],
];

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

export default function Edit({ attributes, setAttributes }) {
  const {
    noPaddingTop,
    enableDecor,
    columns,
    compact,
    headingLeft,
    title,
    text,
    descText,
    buttonText,
    buttonIcon,
  } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `compliant ${noPaddingTop ? "pbs4" : "pbs2"}`;
  // Same modifier the front uses, plus the editor-canvas grid helper (editor.scss).
  const cardsClass = `compliant__cards grid-settings ${
    columns === "5" ? "cards-column-5 grid-5" : "grid-4"
  }${compact ? " cards-compact" : ""}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        <PanelBody title={__("Layout", "overchain-blocks")} initialOpen={true}>
          <SelectControl
            label={__("Cards per row", "overchain-blocks")}
            help={__(
              "Desktop only; tablet and mobile keep the design's 2 / 1 columns.",
              "overchain-blocks",
            )}
            value={columns}
            options={[
              { label: __("4 per row", "overchain-blocks"), value: "4" },
              { label: __("5 per row", "overchain-blocks"), value: "5" },
            ]}
            onChange={(value) => setAttributes({ columns: value })}
          />
          <ToggleControl
            label={__("Compact cards", "overchain-blocks")}
            help={__("Smaller cards with a title only (FM London).", "overchain-blocks")}
            checked={!!compact}
            onChange={(value) => setAttributes({ compact: value })}
          />
          <ToggleControl
            label={__("Heading on the left", "overchain-blocks")}
            checked={!!headingLeft}
            onChange={(value) => setAttributes({ headingLeft: value })}
          />
        </PanelBody>

        <PanelBody title={__("Decor", "overchain-blocks")} initialOpen={true}>
          <ToggleControl
            label={__("Enable decor", "overchain-blocks")}
            checked={enableDecor}
            onChange={(value) => setAttributes({ enableDecor: value })}
          />
        </PanelBody>

        <ButtonControls attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="compliant__container">
            <div className="compliant__wrap section-wrap">
              {enableDecor && (
                <div className="compliant__decor decor1 no-select" aria-hidden="true">
                  <img
                    src={`${themeUrl}assets/img/decor/oneflow_dec_1.jpg`}
                    alt=""
                  />
                </div>
              )}
              <div className="compliant__body section-body">
                <div className={headingLeft ? "heading" : "heading aic"}>
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
                    placeholder={__("Supporting text (optional)", "overchain-blocks")}
                    value={text}
                    onChange={(value) => setAttributes({ text: value })}
                  />
                </div>

                <ul className={cardsClass}>
                  <InnerBlocks
                    allowedBlocks={ALLOWED_BLOCKS}
                    template={TEMPLATE}
                    orientation="horizontal"
                    renderAppender={InnerBlocks.ButtonBlockAppender}
                  />
                </ul>

                <RichText
                  tagName="div"
                  className="compliant__desc txt3 light"
                  placeholder={__(
                    "Closing paragraph (optional)",
                    "overchain-blocks"
                  )}
                  value={descText}
                  onChange={(value) => setAttributes({ descText: value })}
                />

                <ButtonPreview
                  text={buttonText}
                  icon={buttonIcon}
                  className="compliant__btn"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}