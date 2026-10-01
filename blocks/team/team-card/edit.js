import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

import ImageControls from "../../../components/ImageControls";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

export default function Edit({ attributes, setAttributes }) {
  const { role, name, avatarId, avatarUrl } = attributes;

  const blockProps = useBlockProps({
    className: "splide__slide card-understand",
  });

  // Design asset used when no photo is picked: a centred placeholder icon.
  const defaultIcon = `${themeUrl}assets/img/icons/ava_def_1.svg`;

  return (
    <>
      <InspectorControls>
        <ImageControls
          type="image"
          title={__("Photo", "overchain-blocks")}
          imageId={avatarId}
          imageUrl={avatarUrl}
          imageIdAttribute="avatarId"
          imageUrlAttribute="avatarUrl"
          setAttributes={setAttributes}
        />
      </InspectorControls>

      <li {...blockProps}>
        {avatarUrl ? (
          <div className="card-understand__img ibg no-select">
            <img src={avatarUrl} alt="" />
          </div>
        ) : (
          <div className="card-understand__icon no-select" aria-hidden="true">
            <img src={defaultIcon} alt="" />
          </div>
        )}

        <div className="card-understand__content">
          <RichText
            tagName="h3"
            className="card-understand__name"
            allowedFormats={[]}
            placeholder={__("Name", "overchain-blocks")}
            value={name}
            onChange={(value) => setAttributes({ name: value })}
          />

          <RichText
            tagName="p"
            className="card-understand__role"
            allowedFormats={[]}
            placeholder={__("Role", "overchain-blocks")}
            value={role}
            onChange={(value) => setAttributes({ role: value })}
          />
        </div>
      </li>
    </>
  );
}
