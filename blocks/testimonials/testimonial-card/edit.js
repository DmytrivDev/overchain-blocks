import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

import ImageControls from "../../../components/ImageControls";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

// Both layers are the same on every slide in the design, so they are fixed theme
// assets rather than editable attributes.
const cardBgUrl = `${themeUrl}assets/img/decor/testimonials_bg_1.jpg`;
const cardDecorUrl = `${themeUrl}assets/img/decor/testimonials_decor_1.png`;

// Not an editor-only placeholder: this is the same fallback Blade renders on the
// front, so the canvas shows exactly what a photo-less author will look like.
// `ava_def_2`, not Team Card's `ava_def_1` — see the note in the Blade template.
const defaultAvatarUrl = `${themeUrl}assets/img/icons/ava_def_2.svg`;

export default function Edit({ attributes, setAttributes }) {
  const { quote, avatarId, avatarUrl, name, role } = attributes;

  const blockProps = useBlockProps({
    className: "splide__slide card-testimonials",
  });

  return (
    <>
      <InspectorControls>
        <ImageControls
          type="icon"
          imageId={avatarId}
          imageUrl={avatarUrl}
          imageIdAttribute="avatarId"
          imageUrlAttribute="avatarUrl"
          setAttributes={setAttributes}
          title={__("Avatar", "overchain-blocks")}
        />
      </InspectorControls>

      <li {...blockProps}>
        <div className="card-testimonials__bg ibg no-select" aria-hidden="true">
          <img src={cardBgUrl} alt="" />
        </div>

        <div className="card-testimonials__decor no-select" aria-hidden="true">
          <img src={cardDecorUrl} alt="" />
        </div>

        <div className="card-testimonials__content">
          <RichText
            tagName="h3"
            className="tl4"
            placeholder={__("Testimonial", "overchain-blocks")}
            value={quote}
            onChange={(value) => setAttributes({ quote: value })}
          />

          <div className="card-testimonials__author">
              <div className="ava ibg">
              <img src={avatarUrl || defaultAvatarUrl} alt="" />
            </div>

            <div className="person">
              <RichText
                tagName="p"
                placeholder={__("Name", "overchain-blocks")}
                value={name}
                allowedFormats={[]}
                onChange={(value) => setAttributes({ name: value })}
              />

              <RichText
                tagName="span"
                placeholder={__("Position", "overchain-blocks")}
                value={role}
                allowedFormats={[]}
                onChange={(value) => setAttributes({ role: value })}
              />
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
