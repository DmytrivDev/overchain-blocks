import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  Button,
  TextControl,
} from "@wordpress/components";

/**
 * Repeater for a plain list of text tags (no icons).
 *
 * Stored as an array of objects, e.g. [{ label: "Send" }, { label: "Receive" }],
 * matching the repeater shape the DeepL Translator plugin understands.
 */
export default function TagListControls({
  items = [],
  itemsAttribute,

  setAttributes,

  title = __("Tags", "overchain-blocks"),
  labelText = __("Tag", "overchain-blocks"),

  // Items ship with an empty `label` so a fresh block arrives blank; this is the
  // sidebar's equivalent of RichText's placeholder, without which the row is a
  // nameless empty field.
  placeholder = "",

  removeItemText = __("Remove tag", "overchain-blocks"),
  addItemText = __("+ Add tag", "overchain-blocks"),

  defaultItem = { label: "New tag" },

  minItems = 0,
  maxItems = 0,

  initialOpen = false,
}) {
  const updateItem = (index, value) => {
    setAttributes({
      [itemsAttribute]: items.map((item, i) =>
        i === index ? { ...item, label: value } : item,
      ),
    });
  };

  const addItem = () => {
    if (maxItems && items.length >= maxItems) {
      return;
    }

    setAttributes({
      [itemsAttribute]: [...items, defaultItem],
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
    <PanelBody title={title} initialOpen={initialOpen}>
      {items.map((item, index) => (
        <div key={index} style={{ marginBottom: "8px" }}>
          <TextControl
            label={`${labelText} ${index + 1}`}
            value={item.label}
            placeholder={placeholder}
            onChange={(value) => updateItem(index, value)}
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
