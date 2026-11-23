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
  const { title, text, imageId, imageUrl } = attributes;

  const blockProps = useBlockProps({
    className: "card-institution",
  });

  return (
    <>
      <InspectorControls>
        <ImageControls
          type="image"
          title={__("Image", "overchain-blocks")}
          imageId={imageId}
          imageUrl={imageUrl}
          imageIdAttribute="imageId"
          imageUrlAttribute="imageUrl"
          setAttributes={setAttributes}
        />
      </InspectorControls>

      <li {...blockProps}>
        <div className="card-institution__blur no-select" aria-hidden="true">
          <img src={`${themeUrl}assets/img/decor/institution_blur_1.webp`} alt="" />
        </div>

        <RichText
          tagName="h3"
          className="tl4"
          placeholder={__("Card title", "overchain-blocks")}
          value={title}
          onChange={(value) => setAttributes({ title: value })}
          allowedFormats={["core/bold", "core/italic"]}
        />
        <div className="txt3 col-alt1">
          <RichText
            tagName="p"
            placeholder={__("Card description", "overchain-blocks")}
            value={text}
            onChange={(value) => setAttributes({ text: value })}
            allowedFormats={["core/bold", "core/italic", "core/link"]}
          />
        </div>

        <div className="card-institution__img no-select" aria-hidden="true">
          <img src={imageUrl || `${pluginUrl}resources/placeholders/card-visual.png`} alt="" />
        </div>
      </li>
    </>
  );
}
