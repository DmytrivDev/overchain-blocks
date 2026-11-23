import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

import ImageControls from "../../../components/ImageControls";

const placeholderIcon =
  window.ovchBlocks?.url + "resources/placeholders/icon-b.svg";

export default function Edit({ attributes, setAttributes, context }) {
  // Duo's three-column variant (FM London) drops the light weight of the card text.
  const textClass = context?.["overchain/duoThreeColumns"] ? "txt4 col-alt1" : "txt4 col-alt1 light";
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
              className={textClass}
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
