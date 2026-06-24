import { __ } from "@wordpress/i18n";
import {
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import {
  PanelBody,
  Button,
  TextControl,
} from "@wordpress/components";

export default function IconListControls({
  items = [],
  itemsAttribute,

  setAttributes,

  itemTitle = __("Item", "overchain-blocks"),
  labelText = __("Label", "overchain-blocks"),

  selectIconText = __("Select icon", "overchain-blocks"),
  replaceIconText = __("Replace icon", "overchain-blocks"),
  removeIconText = __("Remove icon", "overchain-blocks"),

  removeItemText = __("Remove item", "overchain-blocks"),
  addItemText = __("+ Add item", "overchain-blocks"),

  defaultItem = {
    iconUrl: "",
    iconId: 0,
    label: "Item title",
  },

  minItems = 1,
  maxItems = 0,
}) {
  const updateItem = (index, key, value) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );

    setAttributes({
      [itemsAttribute]: updated,
    });
  };

  const updateItemIcon = (index, media) => {
    const updated = items.map((item, i) =>
      i === index
        ? {
            ...item,
            iconUrl: media.url,
            iconId: media.id,
          }
        : item,
    );

    setAttributes({
      [itemsAttribute]: updated,
    });
  };

  const removeItemIcon = (index) => {
    const updated = items.map((item, i) =>
      i === index
        ? {
            ...item,
            iconUrl: "",
            iconId: 0,
          }
        : item,
    );

    setAttributes({
      [itemsAttribute]: updated,
    });
  };

  const addItem = () => {
    if (maxItems && items.length >= maxItems) {
      return;
    }

    setAttributes({
      [itemsAttribute]: [
        ...items,
        defaultItem,
      ],
    });
  };

  const removeItem = (index) => {
    if (items.length <= minItems) {
      return;
    }

    setAttributes({
      [itemsAttribute]: items.filter((_, i) => i !== index),
    });
  };

  const canAdd = !maxItems || items.length < maxItems;

  return (
    <>
      {items.map((item, index) => (
        <PanelBody
          key={index}
          title={item.label || `${itemTitle} ${index + 1}`}
          initialOpen={false}
        >
          <TextControl
            label={labelText}
            value={item.label}
            onChange={(value) => updateItem(index, "label", value)}
          />

          {item.iconUrl && (
            <img
              src={item.iconUrl}
              alt=""
              style={{
                width: "32px",
                height: "32px",
                marginBottom: "8px",
                display: "block",
                objectFit: "contain",
              }}
            />
          )}

          <MediaUploadCheck>
            <MediaUpload
              onSelect={(media) => updateItemIcon(index, media)}
              allowedTypes={["image"]}
              value={item.iconId}
              render={({ open }) => (
                <Button
                  variant="secondary"
                  onClick={open}
                  style={{ marginBottom: "8px" }}
                >
                  {item.iconUrl ? replaceIconText : selectIconText}
                </Button>
              )}
            />
          </MediaUploadCheck>

          {item.iconUrl && (
            <Button
              variant="link"
              isDestructive
              onClick={() => removeItemIcon(index)}
              style={{
                marginBottom: "8px",
              }}
            >
              {removeIconText}
            </Button>
          )}

          {items.length > minItems && (
            <Button
              variant="link"
              isDestructive
              onClick={() => removeItem(index)}
              style={{
                display: "block",
                marginTop: "8px",
              }}
            >
              {removeItemText}
            </Button>
          )}
        </PanelBody>
      ))}

      {canAdd && (
        <div style={{ padding: "16px" }}>
          <Button variant="primary" onClick={addItem}>
            {addItemText}
          </Button>
        </div>
      )}
    </>
  );
}