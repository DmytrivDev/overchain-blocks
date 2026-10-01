import { __ } from "@wordpress/i18n";
import { PanelBody, Button } from "@wordpress/components";

import ImageField from "./ImageField";

/**
 * Repeater of images only — no labels, no links.
 *
 * Items are objects so the DeepL Translator `repeater` hint can walk them:
 * [{ imageId: 0, imageUrl: '' }, ...]
 */
export default function ImageListControls({
  items = [],
  itemsAttribute,

  setAttributes,

  title = __("Slides", "overchain-blocks"),
  itemLabel = __("Slide", "overchain-blocks"),

  addItemText = __("+ Add slide", "overchain-blocks"),
  removeItemText = __("Remove slide", "overchain-blocks"),

  idKey = "imageId",
  urlKey = "imageUrl",

  minItems = 0,
  maxItems = 0,

  initialOpen = false,
}) {
  const write = (next) => setAttributes({ [itemsAttribute]: next });

  const updateItem = (index, fields) =>
    write(items.map((item, i) => (i === index ? { ...item, ...fields } : item)));

  const addItem = () => {
    if (maxItems && items.length >= maxItems) {
      return;
    }

    write([...items, { [idKey]: 0, [urlKey]: "" }]);
  };

  const removeItem = (index) => {
    if (items.length <= minItems) {
      return;
    }

    write(items.filter((_, i) => i !== index));
  };

  const canAdd = !maxItems || items.length < maxItems;

  return (
    <PanelBody title={title} initialOpen={initialOpen}>
      {items.map((item, index) => (
        <div key={index} style={{ marginBottom: "12px" }}>
          <ImageField
            label={`${itemLabel} ${index + 1}`}
            imageId={item[idKey]}
            imageUrl={item[urlKey]}
            onSelect={(media) =>
              updateItem(index, { [idKey]: media.id, [urlKey]: media.url })
            }
            onRemove={() => updateItem(index, { [idKey]: 0, [urlKey]: "" })}
          />

          {items.length > minItems && (
            <Button
              variant="link"
              isDestructive
              onClick={() => removeItem(index)}
            >
              {removeItemText}
            </Button>
          )}
        </div>
      ))}

      {canAdd && (
        <Button variant="primary" onClick={addItem}>
          {addItemText}
        </Button>
      )}
    </PanelBody>
  );
}
