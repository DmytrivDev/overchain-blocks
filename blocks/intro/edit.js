import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import {
  PanelBody,
  SelectControl,
  ToggleControl,
  TextControl,
} from "@wordpress/components";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import ImageControls from "../../components/ImageControls";
import ButtonControls from "../../components/ButtonControls";
import ButtonPreview from "../../components/ButtonPreview";
import LinkFields from "../../components/LinkFields";

// `LinkFields` writes the shared `button*` key names, which the standard button set
// already owns on this block. Remap them onto the `secondary*` set so the two
// buttons never overwrite each other.
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
    Object.entries(fields).map(([key, value]) => [
      SECONDARY_KEYS[key] || key,
      value,
    ]),
  );

export default function Edit({ attributes, setAttributes }) {
  const {
    layout,
    coverBackground,
    backgroundId,
    backgroundUrl,
    title,
    text,
    imageId,
    imageUrl,
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
  } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  // The section never carries a `pbs` utility — its padding lives on `.intro__body`
  // and varies by layout, so there is no top-spacing control here (same as Lead).
  const layoutClass =
    layout === "content-center"
      ? " sec-content-center"
      : layout === "with-img"
        ? " sec-with-img"
        : "";

  const sectionClass = `intro${layoutClass}`;

  const backgroundClass = `intro__bg${coverBackground ? " ibg" : ""} no-select`;

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
        <PanelBody title={__("Layout", "overchain-blocks")}>
          <SelectControl
            label={__("Content layout", "overchain-blocks")}
            help={__(
              "All three layouts come from the design; the third one also enables the side image field.",
              "overchain-blocks",
            )}
            value={layout}
            options={[
              {
                label: __(
                  "Text left, space reserved for the background",
                  "overchain-blocks",
                ),
                value: "default",
              },
              {
                label: __("Text centred", "overchain-blocks"),
                value: "content-center",
              },
              {
                label: __("Text left, side image", "overchain-blocks"),
                value: "with-img",
              },
            ]}
            onChange={(value) => setAttributes({ layout: value })}
          />

          <ToggleControl
            label={__("Stretch background to cover", "overchain-blocks")}
            help={__(
              "Crops the image to fill the whole section instead of letting it keep its own size.",
              "overchain-blocks",
            )}
            checked={coverBackground}
            onChange={(value) => setAttributes({ coverBackground: value })}
          />
        </PanelBody>

        <ImageControls
          type="image"
          imageId={backgroundId}
          imageUrl={backgroundUrl}
          imageIdAttribute="backgroundId"
          imageUrlAttribute="backgroundUrl"
          setAttributes={setAttributes}
          title={__("Background", "overchain-blocks")}
        />

        {layout === "with-img" && (
          <ImageControls
            type="image"
            imageId={imageId}
            imageUrl={imageUrl}
            imageIdAttribute="imageId"
            imageUrlAttribute="imageUrl"
            setAttributes={setAttributes}
            title={__("Side image", "overchain-blocks")}
          />
        )}

        <ButtonControls attributes={attributes} setAttributes={setAttributes} />

        <PanelBody
          title={__("Secondary button", "overchain-blocks")}
          initialOpen={false}
        >
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
        <section className={sectionClass}>
          {backgroundUrl && (
            <div className={backgroundClass} aria-hidden="true">
              <img src={backgroundUrl} alt="" />
            </div>
          )}

          <div className="intro__container">
            <div className="intro__wrap section-wrap">
              <div className="intro__body section-body">
                <div className="intro__content">
                  <RichText
                    tagName="h1"
                    className="tl1"
                    placeholder={__("Page title", "overchain-blocks")}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                  />

                  <RichText
                    tagName="div"
                    className="txt1"
                    placeholder={__("Supporting text", "overchain-blocks")}
                    value={text}
                    onChange={(value) => setAttributes({ text: value })}
                  />

                  {(buttonText || secondaryText) && (
                    <div className="intro__btns">
                      <ButtonPreview text={buttonText} icon={buttonIcon} />

                      {secondaryText && (
                        <a href="#" className="btn-def stl-trn-clw">
                          {secondaryText}
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {layout === "with-img" && imageUrl && (
                  <div className="intro__img img1 no-select" aria-hidden="true">
                    <img src={imageUrl} alt="" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
