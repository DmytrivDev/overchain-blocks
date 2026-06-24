import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";

import ImageControls from "../../../components/ImageControls";

const placeholderUrl =
  window.ovchBlocks?.url + "resources/placeholders/feature-icon.svg";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

export default function Edit({ attributes, setAttributes, clientId }) {
  const { iconId, iconUrl, title, text } = attributes;

  const blockIndex = useSelect(
    (select) => select("core/block-editor").getBlockIndex(clientId),
    [clientId],
  );

  const cardNumber = ((blockIndex >= 0 ? blockIndex : 0) % 4) + 1;
  const bgUrl = `${themeUrl}assets/img/decor/feature_blur_${cardNumber}.webp`;
  const previewIcon = iconUrl || placeholderUrl;

  const blockProps = useBlockProps({
    className: "card-feature",
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
        <div className="card-feature__bg no-select" aria-hidden="true">
          <img src={bgUrl} alt="" />
        </div>

        <div className="card-feature__icon">
          <img src={previewIcon} alt="" />
        </div>

        <div className="card-feature__box">
          <RichText
            tagName="h2"
            className="tl5"
            placeholder={__("Feature title", "overchain-blocks")}
            value={title}
            onChange={(value) => setAttributes({ title: value })}
          />

          <RichText
            tagName="div"
            className="txt3 light"
            placeholder={__("Feature description", "overchain-blocks")}
            value={text}
            onChange={(value) => setAttributes({ text: value })}
          />
        </div>
      </li>
    </>
  );
}