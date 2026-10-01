import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";

const ALLOWED_BLOCKS = ["overchain/moves-card"];

// The move-money arrangement: four plain cards, one `wide` spanning two columns and
// one `tall-last` filling the fourth column across both rows.
const TEMPLATE = [
  ["overchain/moves-card", {}],
  ["overchain/moves-card", {}],
  ["overchain/moves-card", {}],
  ["overchain/moves-card", { variant: "wide" }],
  ["overchain/moves-card", {}],
  ["overchain/moves-card", { variant: "tall-last" }],
];

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, title, text } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `moves ${noPaddingTop ? "pbs4" : "pbs2"}`;

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
          <div className="moves__container">
            <div className="moves__wrap section-wrap">
              <div className="moves__body section-body">
                {/* `.moves__heading`, not the shared `.heading` utility: this one is
                    a flex row with the title and the lead paragraph side by side. */}
                <div className="moves__heading">
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

                <ul className="moves__list">
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
