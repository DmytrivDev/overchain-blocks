import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";

import ImageControls from "../../../components/ImageControls";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

// The card background is the same on all six cards in the design, and the two decor
// images are a fixed pair — both are theme assets rather than upload fields.
const cardBgUrl = `${themeUrl}assets/img/decor/connect_bg_1.png`;

const DECOR_URLS = {
  img1: `${themeUrl}assets/img/content/connect_img_1.png`,
  img2: `${themeUrl}assets/img/content/connect_img_2.png`,
};

const placeholderIcon =
  window.ovchBlocks?.url + "resources/placeholders/icon.svg";

export default function Edit({ attributes, setAttributes }) {
  const { iconId, iconUrl, title, text, decor } = attributes;

  const blockProps = useBlockProps({
    className: "card-connect",
  });

  const decorUrl = DECOR_URLS[decor];

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Decor", "overchain-blocks")} initialOpen={false}>
          <SelectControl
            label={__("Decor image", "overchain-blocks")}
            value={decor}
            options={[
              { label: __("None", "overchain-blocks"), value: "none" },
              { label: __("Image 1 — top right", "overchain-blocks"), value: "img1" },
              { label: __("Image 2 — bottom right", "overchain-blocks"), value: "img2" },
            ]}
            onChange={(value) => setAttributes({ decor: value })}
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
      </InspectorControls>

      <li {...blockProps}>
        <div className="card-connect__bg ibg no-select" aria-hidden="true">
          <img src={cardBgUrl} alt="" />
        </div>

        {decorUrl && (
          <div
            className={`card-connect__img ${decor} no-select`}
            aria-hidden="true"
          >
            <img src={decorUrl} alt="" />
          </div>
        )}

        <div className="card-connect__icon">
          <img
            src={iconUrl || placeholderIcon}
            alt=""
            style={!iconUrl ? { opacity: 0.3 } : {}}
          />
        </div>

        <div className="card-connect__content">
          <RichText
            tagName="h3"
            className="tl5"
            placeholder={__("Card title", "overchain-blocks")}
            value={title}
            onChange={(value) => setAttributes({ title: value })}
          />

          <RichText
            tagName="div"
            className="card-connect__desc txt3 light col-alt1"
            placeholder={__("Card description", "overchain-blocks")}
            value={text}
            onChange={(value) => setAttributes({ text: value })}
          />
        </div>
      </li>
    </>
  );
}
