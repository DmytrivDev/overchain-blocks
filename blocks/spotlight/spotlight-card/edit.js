import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

import ImageControls from "../../../components/ImageControls";

const placeholderIcon =
  window.ovchBlocks?.url + "resources/placeholders/icon.svg";

export default function Edit({ attributes, setAttributes }) {
  const { iconId, iconUrl, title, text } = attributes;

  const blockProps = useBlockProps({
    className: "item-control",
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
        <div className="item-control__icon">
          <img src={iconUrl || placeholderIcon} alt="" />
        </div>

        <div className="item-control__box">
          <RichText
            tagName="h3"
            className="tl4"
            placeholder={__("Feature title", "overchain-blocks")}
            value={title}
            onChange={(value) => setAttributes({ title: value })}
          />

          <RichText
            tagName="div"
            className="txt3 col-alt1 light"
            placeholder={__("Feature description", "overchain-blocks")}
            value={text}
            onChange={(value) => setAttributes({ text: value })}
          />
        </div>
      </li>
    </>
  );
}
