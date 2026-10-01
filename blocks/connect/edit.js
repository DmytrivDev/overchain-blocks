import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";

const ALLOWED_BLOCKS = ["overchain/connect-card"];

// Mirrors the design: the decor images sit on the 3rd and 5th card. They are a
// per-card field, not a position, so this is only a starting arrangement.
const TEMPLATE = [
  ["overchain/connect-card", {}],
  ["overchain/connect-card", {}],
  ["overchain/connect-card", { decor: "img1" }],
  ["overchain/connect-card", {}],
  ["overchain/connect-card", { decor: "img2" }],
  ["overchain/connect-card", {}],
];

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, title, text } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `connect ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="connect__container">
            <div className="connect__wrap section-wrap">
              <div className="connect__body section-body">
                {/* `.heading` with no `aic` here — this section is left-aligned,
                    unlike Everything and Tag List. */}
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
                    placeholder={__("Section text", "overchain-blocks")}
                    value={text}
                    onChange={(value) => setAttributes({ text: value })}
                  />
                </div>

                <ul className="connect__cards">
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
