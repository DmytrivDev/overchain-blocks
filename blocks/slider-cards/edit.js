import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";

const ALLOWED_BLOCKS = ["overchain/slider-card"];

const TEMPLATE = [
  ["overchain/slider-card", {}],
  ["overchain/slider-card", {}],
  ["overchain/slider-card", {}],
  ["overchain/slider-card", {}],
];

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, title } = attributes;

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
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="businesses__container">
            <div className="businesses__body section-body">
              <div className="heading">
                <RichText
                  tagName="h2"
                  className="tl2"
                  placeholder={__("Section title", "overchain-blocks")}
                  value={title}
                  onChange={(value) => setAttributes({ title: value })}
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
        </section>
      </div>
    </>
  );
}