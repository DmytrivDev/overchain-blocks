import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";

import ImageControls from "../../../components/ImageControls";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

// Only the `wide` variant has a background, and it is the same image on both pages
// that use the section — a fixed theme asset, not an upload field.
const wideBgUrl = `${themeUrl}assets/img/decor/moves_bg_1.jpg`;

const placeholderIcon =
  window.ovchBlocks?.url + "resources/placeholders/icon-b.svg";

export default function Edit({ attributes, setAttributes }) {
  const { variant, iconId, iconUrl, imageId, imageUrl, title, text } =
    attributes;

  // Whitelisted, mirroring Blade: the variant becomes a CSS class.
  const VARIANTS = ["wide", "tall-first", "tall-last"];
  const safeVariant = VARIANTS.includes(variant) ? variant : "default";

  const isTall = safeVariant === "tall-first" || safeVariant === "tall-last";

  const blockProps = useBlockProps({
    className:
      safeVariant === "default" ? "card-moves" : `card-moves ${safeVariant}`,
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Layout", "overchain-blocks")}>
          <SelectControl
            label={__("Card size", "overchain-blocks")}
            value={variant}
            options={[
              { label: __("Standard — one cell", "overchain-blocks"), value: "default" },
              { label: __("Wide — spans two columns", "overchain-blocks"), value: "wide" },
              { label: __("Tall — first column, two rows", "overchain-blocks"), value: "tall-first" },
              { label: __("Tall — last column, two rows", "overchain-blocks"), value: "tall-last" },
            ]}
            onChange={(value) => setAttributes({ variant: value })}
            help={__(
              "Wide adds the fixed background image. Tall variants show the card image.",
              "overchain-blocks",
            )}
          />
        </PanelBody>

        <ImageControls
          type="icon"
          imageId={iconId}
          imageUrl={iconUrl}
          imageIdAttribute="iconId"
          imageUrlAttribute="iconUrl"
          setAttributes={setAttributes}
        />

        {isTall && (
          <ImageControls
            type="image"
            imageId={imageId}
            imageUrl={imageUrl}
            imageIdAttribute="imageId"
            imageUrlAttribute="imageUrl"
            setAttributes={setAttributes}
            title={__("Card image", "overchain-blocks")}
          />
        )}
      </InspectorControls>

      <li {...blockProps}>
        {safeVariant === "wide" && (
          <div className="card-moves__bg ibg no-select" aria-hidden="true">
            <img src={wideBgUrl} alt="" />
          </div>
        )}

        {isTall && imageUrl && (
          <div className="card-moves__img no-select" aria-hidden="true">
            <img src={imageUrl} alt="" />
          </div>
        )}

        {/* The icon is independent of the variant: move-money's wide card has none,
            control-treasury's has one. */}
        <div className="card-moves__icon">
          <img
            src={iconUrl || placeholderIcon}
            alt=""
            style={!iconUrl ? { opacity: 0.3 } : {}}
          />
        </div>

        <div className="card-moves__content">
          <RichText
            tagName="h3"
            className="tl5"
            placeholder={__("Card title", "overchain-blocks")}
            value={title}
            onChange={(value) => setAttributes({ title: value })}
          />

          <RichText
            tagName="div"
            className="card-moves__desc txt3 light"
            placeholder={__("Card description", "overchain-blocks")}
            value={text}
            onChange={(value) => setAttributes({ text: value })}
          />
        </div>
      </li>
    </>
  );
}
