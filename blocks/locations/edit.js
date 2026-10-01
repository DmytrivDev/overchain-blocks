import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";

const ALLOWED_BLOCKS = ["overchain/location-card"];

const TEMPLATE = [
  ["overchain/location-card", {}],
  ["overchain/location-card", {}],
  ["overchain/location-card", {}],
  ["overchain/location-card", {}],
];

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, title, text } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `operations ${noPaddingTop ? "pbs4" : "pbs2"}`;

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
          <div className="operations__container">
            <div className="operations__wrap section-wrap">
              {/* The decor layer is frontend-only: it is a large absolutely
                  positioned image that covers the cards in the editor canvas.
                  The toggle above still controls it on the front. */}

              <div className="operations__body section-body">
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

                <ul className="operations__cards">
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
