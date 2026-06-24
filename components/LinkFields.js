import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import { __experimentalLinkControl as LinkControl } from "@wordpress/block-editor";
import {
  TextControl,
  SelectControl,
  Button,
} from "@wordpress/components";

export default function LinkFields({
  type,
  link,
  linkId,
  linkTitle,
  newTab,
  anchor,
  popupId,

  onChange,

  typeLabel = __("Link type", "overchain-blocks"),
  linkLabel = __("Item link", "overchain-blocks"),
  anchorLabel = __("Anchor with #", "overchain-blocks"),
  popupLabel = __("Popup ID", "overchain-blocks"),
  removeLabel = __("Remove link", "overchain-blocks"),
}) {
  const [linkControlKey, setLinkControlKey] = useState(0);

  const linkControlValue = link
    ? {
        url: link,
        id: linkId || 0,
        title: linkTitle || "",
        opensInNewTab: !!newTab,
      }
    : undefined;

  const currentType = type || "link";

  const resetLink = () => {
    setLinkControlKey((current) => current + 1);

    onChange({
      buttonLink: "",
      buttonLinkId: 0,
      buttonLinkTitle: "",
      buttonNewTab: false,
    });
  };

  return (
    <>
      <SelectControl
        label={typeLabel}
        value={currentType}
        options={[
          {
            label: __("Link", "overchain-blocks"),
            value: "link",
          },
          {
            label: __("Anchor", "overchain-blocks"),
            value: "anchor",
          },
          {
            label: __("Popup", "overchain-blocks"),
            value: "popup",
          },
        ]}
        onChange={(value) => onChange({ buttonType: value })}
      />

      {currentType === "link" && (
        <div style={{ marginBottom: "16px" }}>
          <p style={{ marginBottom: "8px", fontWeight: 500 }}>
            {linkLabel}
          </p>

          <LinkControl
            key={linkControlKey}
            value={linkControlValue}
            settings={[
              {
                id: "opensInNewTab",
                title: __("Open in new tab", "overchain-blocks"),
              },
            ]}
            onChange={(value) =>
              onChange({
                buttonLink: value?.url || "",
                buttonLinkId: value?.id || 0,
                buttonLinkTitle: value?.title || "",
                buttonNewTab:
                  typeof value?.opensInNewTab === "boolean"
                    ? value.opensInNewTab
                    : !!newTab,
              })
            }
          />

          {link && (
            <Button
              variant="link"
              isDestructive
              onClick={resetLink}
            >
              {removeLabel}
            </Button>
          )}
        </div>
      )}

      {currentType === "anchor" && (
        <TextControl
          label={anchorLabel}
          value={anchor || ""}
          placeholder="#section-id"
          onChange={(value) => onChange({ buttonAnchor: value })}
        />
      )}

      {currentType === "popup" && (
        <TextControl
          label={popupLabel}
          value={popupId || ""}
          onChange={(value) => onChange({ buttonPopupId: value })}
        />
      )}
    </>
  );
}