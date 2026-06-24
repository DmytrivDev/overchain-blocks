import { __ } from "@wordpress/i18n";
import { PanelBody, TextControl, TextareaControl } from "@wordpress/components";

export default function TextSettingsControls({
  title = __("Settings", "overchain-blocks"),
  initialOpen = true,
  controls = [],
}) {
  return (
    <PanelBody title={title} initialOpen={initialOpen}>
      {controls.map((control) =>
        control.type === "textarea" ? (
          <TextareaControl
            key={control.attribute}
            label={control.label}
            value={control.value}
            placeholder={control.placeholder}
            rows={control.rows ?? 3}
            onChange={control.onChange}
          />
        ) : (
          <TextControl
            key={control.attribute}
            label={control.label}
            value={control.value}
            placeholder={control.placeholder}
            onChange={control.onChange}
          />
        ),
      )}
    </PanelBody>
  );
}
