import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, SelectControl, ToggleControl } from "@wordpress/components";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import ImageField from "../../components/ImageField";
import ButtonControls from "../../components/ButtonControls";
import ButtonPreview from "../../components/ButtonPreview";

export default function Edit({ attributes, setAttributes }) {
  const {
    backgroundType,
    backgroundId,
    backgroundUrl,
    title,
    textStyle,
    text,
    textAlt,
    minHeight,
    bottomSpacing,
    buttonText,
    buttonIcon,
  } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const isBlur = backgroundType === "blur";

  const bodyClass = `lead__body section-body pbs1${
    bottomSpacing === "pbe1" || bottomSpacing === "pbe2" ? ` ${bottomSpacing}` : ""
  }${minHeight ? " mh1" : ""}`;

  const textClass = `txt1${textStyle === "medium" ? " medium" : ""}`;

  return (
    <>
      <InspectorControls>
        {/* Only the White Section fade toggle: this block has no top-padding option. */}
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
          showNoPaddingTop={false}
          initialOpen={false}
        />
        <PanelBody title={__("Background", "overchain-blocks")}>
          <SelectControl
            label={__("Background type", "overchain-blocks")}
            help={__(
              "Matches the three backgrounds the design uses.",
              "overchain-blocks"
            )}
            value={backgroundType}
            options={[
              {
                label: __("Glow only, no image", "overchain-blocks"),
                value: "blur",
              },
              {
                label: __("Image at the bottom", "overchain-blocks"),
                value: "bg1",
              },
              {
                label: __("Image at the top", "overchain-blocks"),
                value: "bg2",
              },
              // `bg3` is dropped from the picker: the design never uses it, and its
              // desktop rule is shared with `bg2` anyway. The Blade template still
              // honours the class so content saved with it keeps rendering.
            ]}
            onChange={(value) => setAttributes({ backgroundType: value })}
          />

          {!isBlur && (
            <ImageField
              label={__("Background image", "overchain-blocks")}
              imageId={backgroundId}
              imageUrl={backgroundUrl}
              onSelect={(media) =>
                setAttributes({ backgroundId: media.id, backgroundUrl: media.url })
              }
              onRemove={() =>
                setAttributes({ backgroundId: 0, backgroundUrl: "" })
              }
            />
          )}
        </PanelBody>

        <PanelBody title={__("Spacing", "overchain-blocks")}>
          {/* The old labels ("No bottom spacing" / "Normal" / "Larger") did not
              match what the CSS does: the base rule is already 5.5rem, and `pbe1`
              equals it on desktop. The values are spelled out instead. */}
          <SelectControl
            label={__("Bottom spacing", "overchain-blocks")}
            help={__(
              "Base and Standard differ only below 992px.",
              "overchain-blocks"
            )}
            value={bottomSpacing}
            options={[
              {
                label: __("Small — 3.5rem (4rem on mobile)", "overchain-blocks"),
                value: "pbe2",
              },
              {
                label: __(
                  "Standard — 5.5rem (4rem on mobile)",
                  "overchain-blocks"
                ),
                value: "pbe1",
              },
              {
                label: __("Base — 5.5rem at every width", "overchain-blocks"),
                value: "none",
              },
            ]}
            onChange={(value) => setAttributes({ bottomSpacing: value })}
          />

          <ToggleControl
            label={__("Taller section", "overchain-blocks")}
            help={__(
              "Sets a minimum height of 41.875rem (35.625rem on mobile) and centres the content in it.",
              "overchain-blocks"
            )}
            checked={minHeight}
            onChange={(value) => setAttributes({ minHeight: value })}
          />
        </PanelBody>

        <PanelBody title={__("Text", "overchain-blocks")}>
          <SelectControl
            label={__("Main text weight", "overchain-blocks")}
            help={__(
              "Applies to the first paragraph only, and Medium takes effect from 992px up.",
              "overchain-blocks"
            )}
            value={textStyle}
            options={[
              { label: __("Regular", "overchain-blocks"), value: "plain" },
              { label: __("Medium", "overchain-blocks"), value: "medium" },
            ]}
            onChange={(value) => setAttributes({ textStyle: value })}
          />
        </PanelBody>

        <ButtonControls attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <div {...blockProps}>
        <section className="lead">
          <div className="lead__container">
            <div className="lead__wrap section-wrap">
              {isBlur ? (
                <>
                  <div className="page-blur blur1 no-select" aria-hidden="true"></div>
                  <div className="page-blur blur2 no-select" aria-hidden="true"></div>
                </>
              ) : (
                backgroundUrl && (
                  <div
                    className={`lead__bg ${backgroundType} no-select`}
                    aria-hidden="true"
                  >
                    <img src={backgroundUrl} alt="" />
                  </div>
                )
              )}

              <div className={bodyClass}>
                <div className="lead__content">
                  <RichText
                    tagName="h1"
                    className="tl1"
                    placeholder={__("Page title", "overchain-blocks")}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                  />

                  <RichText
                    tagName="div"
                    className={textClass}
                    placeholder={__("Lead text", "overchain-blocks")}
                    value={text}
                    onChange={(value) => setAttributes({ text: value })}
                  />

                  <RichText
                    tagName="div"
                    className="txt1 col-alt1"
                    placeholder={__("Secondary text (optional)", "overchain-blocks")}
                    value={textAlt}
                    onChange={(value) => setAttributes({ textAlt: value })}
                  />

                  {buttonText && (
                    <div className="lead__btns">
                      <ButtonPreview text={buttonText} icon={buttonIcon} />
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
