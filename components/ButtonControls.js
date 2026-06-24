import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { __experimentalLinkControl as LinkControl } from "@wordpress/block-editor";
import {
  PanelBody,
  TextControl,
  SelectControl,
  Button,
} from "@wordpress/components";

export default function ButtonControls({ attributes, setAttributes }) {
  const {
    buttonText,
    buttonType,
    buttonLink,
    buttonLinkId,
    buttonLinkTitle,
    buttonLinkNewTab,
    buttonAnchor,
    buttonPopupId,
    buttonIcon,
  } = attributes;

  const [linkControlKey, setLinkControlKey] = useState(0);

  const linkControlValue = buttonLink
    ? {
        url: buttonLink,
        id: buttonLinkId,
        title: buttonLinkTitle,
        opensInNewTab: buttonLinkNewTab,
      }
    : undefined;

  return (
    <PanelBody title={__("Button", "overchain-blocks")} initialOpen={true}>
      <TextControl
        label={__("Button text", "overchain-blocks")}
        value={buttonText}
        onChange={(value) => setAttributes({ buttonText: value })}
      />

      <SelectControl
        label={__("Button type", "overchain-blocks")}
        value={buttonType}
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
        onChange={(value) => setAttributes({ buttonType: value })}
      />

      {buttonType === "link" && (
        <div style={{ marginBottom: "16px" }}>
          <p style={{ marginBottom: "8px", fontWeight: 500 }}>
            {__("Button link", "overchain-blocks")}
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
              setAttributes({
                buttonLink: value?.url || "",
                buttonLinkId: value?.id || 0,
                buttonLinkTitle: value?.title || "",
                buttonLinkNewTab:
                  typeof value?.opensInNewTab === "boolean"
                    ? value.opensInNewTab
                    : buttonLinkNewTab,
              })
            }
          />

          {buttonLink && (
            <Button
              variant="link"
              isDestructive
              onClick={() => {
                setLinkControlKey((current) => current + 1);

                setAttributes({
                  buttonLink: "",
                  buttonLinkId: 0,
                  buttonLinkTitle: "",
                  buttonLinkNewTab: false,
                });
              }}
            >
              {__("Remove link", "overchain-blocks")}
            </Button>
          )}
        </div>
      )}

      {buttonType === "anchor" && (
        <TextControl
          label={__("Anchor with #", "overchain-blocks")}
          value={buttonAnchor}
          placeholder="#section-id"
          onChange={(value) => setAttributes({ buttonAnchor: value })}
        />
      )}

      {buttonType === "popup" && (
        <TextControl
          label={__("Popup ID", "overchain-blocks")}
          value={buttonPopupId}
          onChange={(value) => setAttributes({ buttonPopupId: value })}
        />
      )}

      <SelectControl
        label={__("Button icon", "overchain-blocks")}
        value={buttonIcon}
        options={[
          {
            label: __("Calendar", "overchain-blocks"),
            value: "calendar",
          },
          {
            label: __("Arrow", "overchain-blocks"),
            value: "arrow",
          },
        ]}
        onChange={(value) => setAttributes({ buttonIcon: value })}
      />
    </PanelBody>
  );
}