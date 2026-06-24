import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";

const ALLOWED_BLOCKS = ["overchain/duo-card"];

const TEMPLATE = [
  ["overchain/duo-card", {}],
  ["overchain/duo-card", {}],
];

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, title, text } = attributes;

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
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="funds__container">
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

              <ul className="funds__cards grid-settings grid-2">
                <InnerBlocks
                  allowedBlocks={ALLOWED_BLOCKS}
                  template={TEMPLATE}
                  orientation="horizontal"
                  renderAppender={InnerBlocks.ButtonBlockAppender}
                />
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}