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
    className: "item-everything",
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
        <div className="item-everything__icon">
          <img
            src={iconUrl || placeholderIcon}
            alt=""
            style={!iconUrl ? { opacity: 0.3 } : {}}
          />
        </div>

        <RichText
          tagName="h3"
          className="tl5"
          placeholder={__("Card title", "overchain-blocks")}
          value={title}
          onChange={(value) => setAttributes({ title: value })}
        />

        <RichText
          tagName="div"
          className="item-everything__desc txt4 light col-alt1"
          placeholder={__("Card description", "overchain-blocks")}
          value={text}
          onChange={(value) => setAttributes({ text: value })}
        />
      </li>
    </>
  );
}
