import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import ImageControls from "../../../components/ImageControls";

const pluginUrl = window.ovchBlocks?.url || "";
const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

export default function Edit({ attributes, setAttributes }) {
  const { title, text, wide, imageId, imageUrl } = attributes;

  const blockProps = useBlockProps({
    className: wide ? "card-delays wide" : "card-delays",
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Layout", "overchain-blocks")} initialOpen={true}>
          <ToggleControl
            label={__("Wide card (two columns, with image)", "overchain-blocks")}
            checked={!!wide}
            onChange={(value) => setAttributes({ wide: value })}
          />
        </PanelBody>

        {wide && (
          <ImageControls
            type="image"
            title={__("Image", "overchain-blocks")}
            imageId={imageId}
            imageUrl={imageUrl}
            imageIdAttribute="imageId"
            imageUrlAttribute="imageUrl"
            setAttributes={setAttributes}
          />
        )}
      </InspectorControls>

      <li {...blockProps}>
        {wide && (
          <div className="card-delays__img no-select" aria-hidden="true">
            <img src={imageUrl || `${pluginUrl}resources/placeholders/coins.png`} alt="" />
          </div>
        )}

        <RichText
          tagName="h3"
          className="tl4"
          placeholder={__("Card title", "overchain-blocks")}
          value={title}
          onChange={(value) => setAttributes({ title: value })}
          allowedFormats={["core/bold", "core/italic"]}
        />
        <div className="txt2">
          <RichText
            tagName="p"
            placeholder={__("Card description", "overchain-blocks")}
            value={text}
            onChange={(value) => setAttributes({ text: value })}
            allowedFormats={["core/bold", "core/italic", "core/link"]}
          />
        </div>
      </li>
    </>
  );
}
