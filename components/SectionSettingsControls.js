import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  ToggleControl,
  SelectControl,
} from "@wordpress/components";

export default function SectionSettingsControls({
  attributes,
  setAttributes,

  showNoPaddingTop = true,
  noPaddingTopAttribute = "noPaddingTop",

  // Three-state replacement for the boolean above: `pbs2` / `pbs4` / no class at
  // all. Opt in per block; when on, it replaces the toggle so there is only ever
  // one control for the section's top padding.
  showTopSpacing = false,
  topSpacingAttribute = "topSpacing",

  // A section followed by a White Section fades out as it scrolls away under the
  // header (`.anim-scroll`) — the plugin applies that by default on the front (see
  // overchain_blocks_mark_before_white()). This toggle opts a block out.
  showWhiteFade = true,
  whiteFadeAttribute = "disableWhiteFade",

  title = __("Settings", "overchain-blocks"),
  noPaddingTopLabel = __("Use less top padding", "overchain-blocks"),
  topSpacingLabel = __("Top padding", "overchain-blocks"),
  whiteFadeLabel = __("Disable fade-out before White Section", "overchain-blocks"),

  initialOpen = true,
}) {
  const noPaddingTop = attributes?.[noPaddingTopAttribute] || false;
  const disableWhiteFade = attributes?.[whiteFadeAttribute] || false;

  // Blocks saved before `topSpacing` existed carry only the boolean, so derive the
  // equivalent value and let the control open on what the block actually renders.
  const topSpacing =
    attributes?.[topSpacingAttribute] || (noPaddingTop ? "pbs4" : "pbs2");

  return (
    <PanelBody className="paddingSettings" title={title} initialOpen={initialOpen}>
      {showTopSpacing ? (
        <SelectControl
          label={topSpacingLabel}
          value={topSpacing}
          options={[
            { label: __("None", "overchain-blocks"), value: "none" },
            { label: __("Small — 3rem", "overchain-blocks"), value: "pbs4" },
            { label: __("Standard — 8.5rem", "overchain-blocks"), value: "pbs2" },
          ]}
          onChange={(value) =>
            setAttributes({
              [topSpacingAttribute]: value,
            })
          }
        />
      ) : (
        showNoPaddingTop && (
          <ToggleControl
            label={noPaddingTopLabel}
            checked={noPaddingTop}
            onChange={(value) =>
              setAttributes({
                [noPaddingTopAttribute]: value,
              })
            }
          />
        )
      )}

      {showWhiteFade && (
        <ToggleControl
          label={whiteFadeLabel}
          help={__(
            "Applies only when the next block is a White Section.",
            "overchain-blocks",
          )}
          checked={disableWhiteFade}
          onChange={(value) =>
            setAttributes({
              [whiteFadeAttribute]: value,
            })
          }
        />
      )}
    </PanelBody>
  );
}
