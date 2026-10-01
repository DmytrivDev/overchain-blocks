import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";

const ALLOWED_BLOCKS = ["overchain/process-card"];

const TEMPLATE = [
  ["overchain/process-card", {}],
  ["overchain/process-card", {}],
  ["overchain/process-card", {}],
  ["overchain/process-card", {}],
];

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `accept ${noPaddingTop ? "pbs4" : "pbs2"}`;

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
          <div className="accept__container">
            <div className="accept__wrap section-wrap">
              <div className="accept__body section-body">
                <div className="accept__splide">
                  <div className="splide" data-lock>
                    <div className="splide__track">
                      <ul className="splide__list">
                        <InnerBlocks
                          allowedBlocks={ALLOWED_BLOCKS}
                          template={TEMPLATE}
                          orientation="horizontal"
                          renderAppender={InnerBlocks.ButtonBlockAppender}
                        />
                      </ul>
                    </div>
                  </div>

                  {/* `.arrows` is frontend-only, exactly as in Testimonials: Splide
                      never initialises in the canvas, so prev/next would be dead
                      buttons. The editor lays every slide out as a grid instead —
                      see `.accept__splide` in editor.scss. */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
