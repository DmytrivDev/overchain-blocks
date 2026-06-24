import { __ } from "@wordpress/i18n";
import {
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import {
  PanelBody,
  Button,
} from "@wordpress/components";

const PREVIEW_STYLES = {
  image: {
    width: "100%",
    marginBottom: "8px",
    borderRadius: "4px",
    display: "block",
  },

  icon: {
    width: "48px",
    height: "48px",
    marginBottom: "8px",
    display: "block",
    objectFit: "contain",
  },
};

const LABELS = {
  image: {
    title: __("Image", "overchain-blocks"),
    select: __("Select image", "overchain-blocks"),
    replace: __("Replace image", "overchain-blocks"),
    remove: __("Remove image", "overchain-blocks"),
  },

  icon: {
    title: __("Icon", "overchain-blocks"),
    select: __("Select icon", "overchain-blocks"),
    replace: __("Replace icon", "overchain-blocks"),
    remove: __("Remove icon", "overchain-blocks"),
  },
};

export default function ImageControls({
  type = "image",

  imageId,
  imageUrl,

  imageIdAttribute = "imageId",
  imageUrlAttribute = "imageUrl",

  title,
  selectLabel,
  replaceLabel,
  removeLabel,

  previewStyle,
  allowedTypes = ["image"],

  initialOpen = true,
  setAttributes,
}) {
  const labels = LABELS[type] || LABELS.image;

  const finalTitle = title || labels.title;
  const finalSelectLabel = selectLabel || labels.select;
  const finalReplaceLabel = replaceLabel || labels.replace;
  const finalRemoveLabel = removeLabel || labels.remove;
  const finalPreviewStyle = previewStyle || PREVIEW_STYLES[type] || PREVIEW_STYLES.image;

  return (
    <PanelBody title={finalTitle} initialOpen={initialOpen}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          style={finalPreviewStyle}
        />
      )}

      <MediaUploadCheck>
        <MediaUpload
          onSelect={(media) =>
            setAttributes({
              [imageIdAttribute]: media.id,
              [imageUrlAttribute]: media.url,
            })
          }
          allowedTypes={allowedTypes}
          value={imageId}
          render={({ open }) => (
            <Button
              variant="secondary"
              onClick={open}
              style={{ marginBottom: "8px" }}
            >
              {imageUrl ? finalReplaceLabel : finalSelectLabel}
            </Button>
          )}
        />
      </MediaUploadCheck>

      {imageUrl && (
        <Button
          variant="link"
          isDestructive
          onClick={() =>
            setAttributes({
              [imageIdAttribute]: 0,
              [imageUrlAttribute]: "",
            })
          }
        >
          {finalRemoveLabel}
        </Button>
      )}
    </PanelBody>
  );
}