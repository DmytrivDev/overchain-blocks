import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  ToggleControl,
} from "@wordpress/components";

export default function SectionSettingsControls({
  attributes,
  setAttributes,

  showNoPaddingTop = true,
  noPaddingTopAttribute = "noPaddingTop",

  title = __("Settings", "overchain-blocks"),
  noPaddingTopLabel = __("Use less top padding", "overchain-blocks"),

  initialOpen = true,
}) {
  const noPaddingTop = attributes?.[noPaddingTopAttribute] || false;

  return (
    <PanelBody className="paddingSettings" title={title} initialOpen={initialOpen}>
      {showNoPaddingTop && (
        <ToggleControl
          label={noPaddingTopLabel}
          checked={noPaddingTop}
          onChange={(value) =>
            setAttributes({
              [noPaddingTopAttribute]: value,
            })
          }
        />
      )}
    </PanelBody>
  );
}