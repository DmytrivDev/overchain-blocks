import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";

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
  const { noPaddingTop, enableDecor, title, buttonText, buttonIcon } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `compliant ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

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
            <div className="compliant__wrap">
              {enableDecor && (
                <div className="compliant__decor decor1 no-select" aria-hidden="true">
                  <img
                    src={`${themeUrl}assets/img/decor/oneflow_dec_1.jpg`}
                    alt=""
                  />
                </div>
              )}
              <div className="compliant__body section-body">
                <div className="heading aic">
                  <RichText
                    tagName="h2"
                    className="tl2"
                    placeholder={__("Section title", "overchain-blocks")}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                  />
                </div>

                <ul className="compliant__cards grid-settings grid-4">
                  <InnerBlocks
                    allowedBlocks={ALLOWED_BLOCKS}
                    template={TEMPLATE}
                    orientation="horizontal"
                    renderAppender={InnerBlocks.ButtonBlockAppender}
                  />
                </ul>

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