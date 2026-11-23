import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";

import ButtonControls from "../../components/ButtonControls";
import ButtonPreview from "../../components/ButtonPreview";
import LinkFields from "../../components/LinkFields";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

// `LinkFields` writes the shared `button*` key names; remap them onto the
// `secondary*` set (same as Intro) so the two buttons never overwrite each other.
const SECONDARY_KEYS = {
  buttonType: "secondaryType",
  buttonLink: "secondaryLink",
  buttonLinkId: "secondaryLinkId",
  buttonLinkTitle: "secondaryLinkTitle",
  buttonNewTab: "secondaryLinkNewTab",
  buttonAnchor: "secondaryAnchor",
  buttonPopupId: "secondaryPopupId",
};

const toSecondary = (fields) =>
  Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [SECONDARY_KEYS[key] || key, value]),
  );

const UNITS = [
  __("Days", "overchain-blocks"),
  __("Hours", "overchain-blocks"),
  __("Min", "overchain-blocks"),
  __("Sec", "overchain-blocks"),
];

export default function Edit({ attributes, setAttributes }) {
  const {
    title,
    text,
    buttonText,
    buttonIcon,
    secondaryText,
    secondaryType,
    secondaryLink,
    secondaryLinkId,
    secondaryLinkTitle,
    secondaryLinkNewTab,
    secondaryAnchor,
    secondaryPopupId,
    countdownTo,
  } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Countdown", "overchain-blocks")} initialOpen={true}>
          <TextControl
            type="datetime-local"
            label={__("Counts down to (UTC)", "overchain-blocks")}
            help={__(
              "UTC — London time in winter, one hour behind London in summer. Leave empty to hide the countdown.",
              "overchain-blocks",
            )}
            value={countdownTo}
            onChange={(value) => setAttributes({ countdownTo: value })}
          />
        </PanelBody>

        <ButtonControls attributes={attributes} setAttributes={setAttributes} />

        <PanelBody title={__("Secondary button", "overchain-blocks")} initialOpen={false}>
          <TextControl
            label={__("Button text", "overchain-blocks")}
            help={__("Leave empty to hide the button.", "overchain-blocks")}
            value={secondaryText}
            onChange={(value) => setAttributes({ secondaryText: value })}
          />

          <LinkFields
            type={secondaryType}
            link={secondaryLink}
            linkId={secondaryLinkId}
            linkTitle={secondaryLinkTitle}
            newTab={secondaryLinkNewTab}
            anchor={secondaryAnchor}
            popupId={secondaryPopupId}
            onChange={(fields) => setAttributes(toSecondary(fields))}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        {/* Same markup as the Blade view, minus the reveal-animation hooks. The
            countdown only ticks on the front (readout.js); the canvas shows 00. */}
        <section className="welcome">
          <div className="welcome__container">
            <div className="welcome__wrap section-wrap">
              <picture className="welcome__bg bg-1 no-select" aria-hidden="true">
                <source
                  srcSet={`${themeUrl}assets/img/decor/welcome_bg_1m.jpg`}
                  media="(max-width: 992px)"
                />
                <img src={`${themeUrl}assets/img/decor/welcome_bg_1d.jpg`} alt="" />
              </picture>

              <div className="welcome__body welcome-body-1 section-body">
                <div className="welcome__content">
                  <RichText
                    tagName="h1"
                    className="tl1"
                    placeholder={__("Event title", "overchain-blocks")}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                    allowedFormats={["core/bold", "core/italic", "core/text-color"]}
                  />

                  <div className="txt1 medium">
                    <RichText
                      tagName="p"
                      placeholder={__("Short description", "overchain-blocks")}
                      value={text}
                      onChange={(value) => setAttributes({ text: value })}
                    />
                  </div>

                  {(buttonText || secondaryText) && (
                    <div className="welcome__btns">
                      <ButtonPreview text={buttonText} icon={buttonIcon} />
                      {secondaryText && (
                        <span className="btn-def stl-trn-clw">{secondaryText}</span>
                      )}
                    </div>
                  )}

                  {countdownTo && (
                    <div className="readout-welcome">
                      {UNITS.map((label) => (
                        <div className="readout-welcome__item" key={label}>
                          <span className="readout-welcome__value">00</span>
                          <span className="readout-welcome__label">{label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
