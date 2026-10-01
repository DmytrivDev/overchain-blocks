import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

import ImageControls from "../../../components/ImageControls";

const placeholderImage =
  window.ovchBlocks?.url + "resources/placeholders/slide-visual.webp";

export default function Edit({ attributes, setAttributes }) {
  const { imageId, imageUrl, label, tag } = attributes;

  const blockProps = useBlockProps({
    className: "card-operations",
  });

  return (
    <>
      <InspectorControls>
        <ImageControls
          type="image"
          imageId={imageId}
          imageUrl={imageUrl}
          imageIdAttribute="imageId"
          imageUrlAttribute="imageUrl"
          setAttributes={setAttributes}
        />
      </InspectorControls>

      <li {...blockProps}>
        <div className="card-operations__img ibg no-select" aria-hidden="true">
          <img src={imageUrl || placeholderImage} alt="" />
        </div>

        <div className="card-operations__badge">
          <RichText
            tagName="p"
            allowedFormats={[]}
            placeholder={__("City", "overchain-blocks")}
            value={label}
            onChange={(value) => setAttributes({ label: value })}
          />

          <RichText
            tagName="span"
            className="card-operations__tag"
            allowedFormats={[]}
            placeholder={__("Tag", "overchain-blocks")}
            value={tag}
            onChange={(value) => setAttributes({ tag: value })}
          />
        </div>
      </li>
    </>
  );
}
