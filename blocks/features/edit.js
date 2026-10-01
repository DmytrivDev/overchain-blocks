import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";

import { PanelBody, ToggleControl } from "@wordpress/components";

import SectionSettingsControls from "../../components/SectionSettingsControls";

const ALLOWED_BLOCKS = ["overchain/feature-card"];

const TEMPLATE = [
  ["overchain/feature-card", {}],
  ["overchain/feature-card", {}],
  ["overchain/feature-card", {}],
  ["overchain/feature-card", {}],
];

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, topSpacing, enableBlur, title, text } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  // `topSpacing` supersedes `noPaddingTop`; blocks saved before it existed fall back
  // to the two states that toggle produced. `none` is the design's third state — the
  // section carries no padding utility at all.
  const spacing = topSpacing || (noPaddingTop ? "pbs4" : "pbs2");

  const sectionClass = `feature${spacing === "none" ? "" : ` ${spacing}`}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
          showTopSpacing
        />

        <PanelBody title={__("Decor", "overchain-blocks")}>
          <ToggleControl
            label={__("Show background glow", "overchain-blocks")}
            checked={enableBlur}
            onChange={(value) => setAttributes({ enableBlur: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="feature__container">
            <div className="feature__wrap section-wrap">
              {enableBlur && (
                <div
                  className="feature__blur no-select"
                  aria-hidden="true"
                ></div>
              )}

              <div className="feature__body section-body">
                {/* Rendered unconditionally so an empty heading stays reachable;
                    Blade drops the whole wrapper when both fields are empty. */}
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
                    className="txt2 col-alt1"
                    placeholder={__(
                      "Supporting text (optional)",
                      "overchain-blocks"
                    )}
                    value={text}
                    onChange={(value) => setAttributes({ text: value })}
                  />
                </div>

                <ul className="feature__cards grid-settings grid-4">
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