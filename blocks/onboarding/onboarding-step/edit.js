import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

import ImageControls from "../../../components/ImageControls";

const pluginUrl = window.ovchBlocks?.url || "";
const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

export default function Edit({ attributes, setAttributes }) {
  const { iconId, iconUrl, title, text } = attributes;

  const blockProps = useBlockProps({
    className: "item-startright",
  });

  return (
    <>
      <InspectorControls>
        <ImageControls
          type="icon"
          title={__("Icon", "overchain-blocks")}
          imageId={iconId}
          imageUrl={iconUrl}
          imageIdAttribute="iconId"
          imageUrlAttribute="iconUrl"
          setAttributes={setAttributes}
        />
      </InspectorControls>

      <li {...blockProps}>
        <div className="item-startright__icon">
          <img src={iconUrl || `${pluginUrl}resources/placeholders/icon-b.svg`} alt="" />
        </div>

        <div className="item-startright__box">
          <RichText
            tagName="h3"
            className="item-startright__tl"
            placeholder={__("Step title", "overchain-blocks")}
            value={title}
            onChange={(value) => setAttributes({ title: value })}
            allowedFormats={["core/bold", "core/italic"]}
          />
          <div className="txt3">
            <RichText
              tagName="p"
              placeholder={__("Step description", "overchain-blocks")}
              value={text}
              onChange={(value) => setAttributes({ text: value })}
              allowedFormats={["core/bold", "core/italic"]}
            />
          </div>
        </div>
      </li>
    </>
  );
}
