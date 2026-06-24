import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";

const ALLOWED_BLOCKS = ["overchain/feature-card"];

const TEMPLATE = [
  ["overchain/feature-card", {}],
  ["overchain/feature-card", {}],
  ["overchain/feature-card", {}],
  ["overchain/feature-card", {}],
];

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `feature ${noPaddingTop ? "pbs4" : "pbs2"}`;

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
          <div className="feature__container">
            <div className="feature__wrap">
              <div
                className="feature__blur no-select"
                aria-hidden="true"
              ></div>

              <div className="feature__body section-body">
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