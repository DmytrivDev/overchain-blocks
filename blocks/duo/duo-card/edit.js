import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

import ImageControls from "../../../components/ImageControls";

const placeholderIcon =
  window.ovchBlocks?.url + "resources/placeholders/icon-b.svg";

export default function Edit({ attributes, setAttributes }) {
  const { iconId, iconUrl, title, text } = attributes;

  const blockProps = useBlockProps({
    className: "card-funds",
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
        <div className="card-funds__inner">
          <div className="card-funds__box">
            <RichText
              tagName="h3"
              className="tl4"
              placeholder={__("Card title", "overchain-blocks")}
              value={title}
              onChange={(value) => setAttributes({ title: value })}
            />

            <RichText
              tagName="div"
              className="txt4 col-alt1 light"
              placeholder={__("Card description", "overchain-blocks")}
              value={text}
              onChange={(value) => setAttributes({ text: value })}
            />
          </div>

          <div className="card-funds__icon">
            <img src={iconUrl || placeholderIcon} alt="" />
          </div>
        </div>
      </li>
    </>
  );
}
