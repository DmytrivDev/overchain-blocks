import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";

import ImageField from "../../../components/ImageField";
import LinkFields from "../../../components/LinkFields";

const placeholderIcon =
  window.ovchBlocks?.url + "resources/placeholders/icon-b.svg";
const placeholderImage =
  window.ovchBlocks?.url + "resources/placeholders/card-visual.png";

const VARIANTS = [
  { label: __("Icon card", "overchain-blocks"), value: "default" },
  { label: __("Big card (image + button)", "overchain-blocks"), value: "big" },
  { label: __("Image on top", "overchain-blocks"), value: "img-top" },
];

export default function Edit({ attributes, setAttributes }) {
  const {
    variant,
    iconId,
    iconUrl,
    imageId,
    imageUrl,
    backgroundId,
    backgroundUrl,
    title,
    text,
    buttonText,
    buttonType,
    buttonLink,
    buttonLinkId,
    buttonLinkTitle,
    buttonLinkNewTab,
    buttonAnchor,
    buttonPopupId,
  } = attributes;

  const isBig = variant === "big";
  const isImgTop = variant === "img-top";
  const usesImage = isBig || isImgTop;

  const cardClass = `card-layer${isBig ? " big" : ""}${
    isImgTop ? " img-top" : ""
  }`;

  const blockProps = useBlockProps({ className: cardClass });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Card layout", "overchain-blocks")}>
          <SelectControl
            label={__("Variant", "overchain-blocks")}
            value={variant}
            options={VARIANTS}
            onChange={(value) => setAttributes({ variant: value })}
          />
        </PanelBody>

        <PanelBody title={__("Media", "overchain-blocks")}>
          {!usesImage && (
            <ImageField
              label={__("Icon", "overchain-blocks")}
              imageId={iconId}
              imageUrl={iconUrl}
              onSelect={(media) =>
                setAttributes({ iconId: media.id, iconUrl: media.url })
              }
              onRemove={() => setAttributes({ iconId: 0, iconUrl: "" })}
            />
          )}

          {usesImage && (
            <ImageField
              label={__("Image", "overchain-blocks")}
              imageId={imageId}
              imageUrl={imageUrl}
              onSelect={(media) =>
                setAttributes({ imageId: media.id, imageUrl: media.url })
              }
              onRemove={() => setAttributes({ imageId: 0, imageUrl: "" })}
            />
          )}

          {isBig && (
            <ImageField
              label={__("Background", "overchain-blocks")}
              imageId={backgroundId}
              imageUrl={backgroundUrl}
              onSelect={(media) =>
                setAttributes({
                  backgroundId: media.id,
                  backgroundUrl: media.url,
                })
              }
              onRemove={() =>
                setAttributes({ backgroundId: 0, backgroundUrl: "" })
              }
            />
          )}
        </PanelBody>

        {isBig && (
          <PanelBody title={__("Button", "overchain-blocks")}>
            <LinkFields
              type={buttonType}
              link={buttonLink}
              linkId={buttonLinkId}
              linkTitle={buttonLinkTitle}
              newTab={buttonLinkNewTab}
              anchor={buttonAnchor}
              popupId={buttonPopupId}
              onChange={(values) => setAttributes(values)}
            />
          </PanelBody>
        )}
      </InspectorControls>

      <li {...blockProps}>
        {isBig && backgroundUrl && (
          <div className="card-layer__bg ibg no-select" aria-hidden="true">
            <img src={backgroundUrl} alt="" />
          </div>
        )}

        {usesImage ? (
          <div className="card-layer__img no-select" aria-hidden="true">
            <img src={imageUrl || placeholderImage} alt="" />
          </div>
        ) : (
          <div className="card-layer__icon">
            <img src={iconUrl || placeholderIcon} alt="" />
          </div>
        )}

        <div className="card-layer__box">
          <RichText
            tagName="h3"
            className="tl5"
            placeholder={__("Card title", "overchain-blocks")}
            value={title}
            onChange={(value) => setAttributes({ title: value })}
          />

          <RichText
            tagName="div"
            className="txt4 light"
            placeholder={__("Card description", "overchain-blocks")}
            value={text}
            onChange={(value) => setAttributes({ text: value })}
          />
        </div>

        {isBig && (
          <div className="card-layer__bpttom">
            <RichText
              tagName="span"
              className="card-layer__btn btn-def stl-trn"
              placeholder={__("Button label", "overchain-blocks")}
              value={buttonText}
              onChange={(value) => setAttributes({ buttonText: value })}
              allowedFormats={[]}
            />
          </div>
        )}
      </li>
    </>
  );
}
