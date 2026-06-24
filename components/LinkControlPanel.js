import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { __experimentalLinkControl as LinkControl } from "@wordpress/block-editor";
import {
  PanelBody,
  Button,
} from "@wordpress/components";

export default function LinkControlPanel({
  title = __("Link", "overchain-blocks"),
  initialOpen = false,

  linkUrl,
  linkId,
  linkTitle,
  linkNewTab,

  linkUrlAttribute = "linkUrl",
  linkIdAttribute = "linkId",
  linkTitleAttribute = "linkTitle",
  linkNewTabAttribute = "linkNewTab",

  removeLabel = __("Remove link", "overchain-blocks"),

  setAttributes,
}) {
  const [linkControlKey, setLinkControlKey] = useState(0);

  const linkControlValue = linkUrl
    ? {
        url: linkUrl,
        id: linkId,
        title: linkTitle,
        opensInNewTab: linkNewTab,
      }
    : undefined;

  return (
    <PanelBody title={title} initialOpen={initialOpen}>
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
            [linkUrlAttribute]: value?.url || "",
            [linkIdAttribute]: value?.id || 0,
            [linkTitleAttribute]: value?.title || "",
            [linkNewTabAttribute]:
              typeof value?.opensInNewTab === "boolean"
                ? value.opensInNewTab
                : linkNewTab,
          })
        }
      />

      {linkUrl && (
        <Button
          variant="link"
          isDestructive
          onClick={() => {
            setLinkControlKey((current) => current + 1);

            setAttributes({
              [linkUrlAttribute]: "",
              [linkIdAttribute]: 0,
              [linkTitleAttribute]: "",
              [linkNewTabAttribute]: false,
            });
          }}
        >
          {removeLabel}
        </Button>
      )}
    </PanelBody>
  );
}