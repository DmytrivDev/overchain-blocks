import { __ } from "@wordpress/i18n";
import {
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import { Button } from "@wordpress/components";

export default function ImageField({
  label = __("Image", "overchain-blocks"),

  imageId,
  imageUrl,

  onSelect,
  onRemove,

  selectLabel = __("Select image", "overchain-blocks"),
  replaceLabel = __("Replace image", "overchain-blocks"),
  removeLabel = __("Remove image", "overchain-blocks"),

  previewStyle = {
    width: "100%",
    marginBottom: "8px",
    borderRadius: "4px",
  },

  allowedTypes = ["image"],
}) {
  return (
    <div style={{ marginBottom: "16px" }}>
      {label && (
        <p style={{ marginBottom: "8px", fontWeight: 500 }}>
          {label}
        </p>
      )}

      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          style={previewStyle}
        />
      )}

      <MediaUploadCheck>
        <MediaUpload
          onSelect={onSelect}
          allowedTypes={allowedTypes}
          value={imageId}
          render={({ open }) => (
            <Button
              variant="secondary"
              onClick={open}
              style={{ marginBottom: "8px" }}
            >
              {imageUrl ? replaceLabel : selectLabel}
            </Button>
          )}
        />
      </MediaUploadCheck>

      {imageUrl && (
        <Button
          variant="link"
          isDestructive
          onClick={onRemove}
        >
          {removeLabel}
        </Button>
      )}
    </div>
  );
}