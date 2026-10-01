import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import ImageControls from "../../components/ImageControls";

const ALLOWED_BLOCKS = ["overchain/testimonial-card"];

const TEMPLATE = [
  ["overchain/testimonial-card", {}],
  ["overchain/testimonial-card", {}],
];

const placeholderImage =
  window.ovchBlocks?.url + "resources/placeholders/card-visual.png";

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, title, imageId, imageUrl } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `testimonials ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        <ImageControls
          type="image"
          imageId={imageId}
          imageUrl={imageUrl}
          imageIdAttribute="imageId"
          imageUrlAttribute="imageUrl"
          setAttributes={setAttributes}
          title={__("Side photo", "overchain-blocks")}
        />
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="testimonials__container">
            <div className="testimonials__wrap section-wrap">
              <div className="testimonials__body section-body">
                <div className="heading">
                  <RichText
                    tagName="h2"
                    className="tl2"
                    placeholder={__("Section title", "overchain-blocks")}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                  />
                </div>

                <div className="testimonials__main">
                  <div className="testimonials__img ibg">
                    <img
                      src={imageUrl || placeholderImage}
                      alt=""
                      style={!imageUrl ? { opacity: 0.3 } : {}}
                    />
                  </div>

                  <div className="testimonials__window">
                    <div className="testimonials__splide">
                      <div className="splide" data-lock>
                        <div className="splide__track">
                          <ul className="splide__list">
                            <InnerBlocks
                              allowedBlocks={ALLOWED_BLOCKS}
                              template={TEMPLATE}
                              orientation="vertical"
                              renderAppender={InnerBlocks.ButtonBlockAppender}
                            />
                          </ul>
                        </div>
                      </div>

                      {/* `.drag-arrow` and `.arrows` are frontend-only: Splide never
                          initialises in the canvas, so prev/next would do nothing.
                          The editor stacks every slide instead — see editor.scss. */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
