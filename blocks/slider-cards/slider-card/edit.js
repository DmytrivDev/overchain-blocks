import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

import ImageControls from "../../../components/ImageControls";
import LinkControlPanel from "../../../components/LinkControlPanel";

const placeholderImage =
  window.ovchBlocks?.url + "resources/placeholders/card.png";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

export default function Edit({ attributes, setAttributes }) {
  const {
    title,
    backgroundId,
    backgroundUrl,
    imageId,
    imageUrl,
    linkUrl,
    linkId,
    linkTitle,
    linkNewTab,
  } = attributes;

  const blockProps = useBlockProps({
    className: "card-businesses",
  });

  const previewImage = imageUrl || placeholderImage;
  const previewBg = backgroundUrl || "";
  const blurUrl = `${themeUrl}assets/img/decor/settlement_blur_1.webp`;

  return (
    <>
      <InspectorControls>
        <ImageControls
          type="image"
          title={__("Background image", "overchain-blocks")}
          imageId={backgroundId}
          imageUrl={backgroundUrl}
          imageIdAttribute="backgroundId"
          imageUrlAttribute="backgroundUrl"
          selectLabel={__("Select background", "overchain-blocks")}
          replaceLabel={__("Replace background", "overchain-blocks")}
          removeLabel={__("Remove background", "overchain-blocks")}
          setAttributes={setAttributes}
        />

        <ImageControls
          type="image"
          imageId={imageId}
          imageUrl={imageUrl}
          imageIdAttribute="imageId"
          imageUrlAttribute="imageUrl"
          initialOpen={false}
          setAttributes={setAttributes}
        />

        <LinkControlPanel
          linkUrl={linkUrl}
          linkId={linkId}
          linkTitle={linkTitle}
          linkNewTab={linkNewTab}
          setAttributes={setAttributes}
        />
      </InspectorControls>

      <li {...blockProps}>
        <div className="card-businesses__bg ibg no-select" aria-hidden="true">
          {previewBg && (
            <img
              src={previewBg}
              alt=""
              style={!backgroundUrl ? { opacity: 0.5 } : {}}
            />
          )}
        </div>

        <div className="card-businesses__inner">
          {linkUrl ? (
            <span className="tl4">
              <RichText
                tagName="span"
                placeholder={__("Card title", "overchain-blocks")}
                value={title}
                onChange={(value) => setAttributes({ title: value })}
              />
            </span>
          ) : (
            <RichText
              tagName="h3"
              className="tl4"
              placeholder={__("Card title", "overchain-blocks")}
              value={title}
              onChange={(value) => setAttributes({ title: value })}
            />
          )}

          <div className="card-businesses__img">
            <img
              src={previewImage}
              alt=""
              style={!imageUrl ? { opacity: 0.3 } : {}}
            />
          </div>

          {linkUrl && (
            <span className="link-more">
              {__("Discover More", "overchain-blocks")}
            </span>
          )}
        </div>

        <div className="card-businesses__blur no-select" aria-hidden="true">
          <img src={blurUrl} alt="" />
        </div>
      </li>
    </>
  );
}
