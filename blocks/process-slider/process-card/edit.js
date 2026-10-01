import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

import ImageControls from "../../../components/ImageControls";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

// Identical on all seven slides in the design — a fixed theme asset, not an
// editable attribute.
const cardBgUrl = `${themeUrl}assets/img/decor/accept_bg_1.jpg`;

const placeholderIcon =
  window.ovchBlocks?.url + "resources/placeholders/icon.svg";

export default function Edit({ attributes, setAttributes }) {
  const { iconId, iconUrl, title, text } = attributes;

  const blockProps = useBlockProps({
    className: "splide__slide card-accept",
  });

  return (
    <>
      <InspectorControls>
        <ImageControls
          type="icon"
          imageId={iconId}
          imageUrl={iconUrl}
          imageIdAttribute="iconId"
          imageUrlAttribute="iconUrl"
          setAttributes={setAttributes}
        />
      </InspectorControls>

      <li {...blockProps}>
        <div className="card-accept__bg ibg no-select" aria-hidden="true">
          <img src={cardBgUrl} alt="" />
        </div>

        <div className="card-accept__content">
          <RichText
            tagName="h2"
            className="tl5"
            placeholder={__("Step name", "overchain-blocks")}
            value={title}
            onChange={(value) => setAttributes({ title: value })}
          />

          <RichText
            tagName="div"
            className="card-accept__desc txt3 light"
            placeholder={__("Step description", "overchain-blocks")}
            value={text}
            onChange={(value) => setAttributes({ text: value })}
          />
        </div>

        {/* Last in the DOM on purpose: `margin-block-start: auto` in the card's
            flex column pins the icon to the bottom. */}
        <div className="card-accept__icon">
          <img
            src={iconUrl || placeholderIcon}
            alt=""
            style={!iconUrl ? { opacity: 0.3 } : {}}
          />
        </div>
      </li>
    </>
  );
}
