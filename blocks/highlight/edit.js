import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, TextControl, ToggleControl } from "@wordpress/components";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import ImageControls from "../../components/ImageControls";
import ButtonControls from "../../components/ButtonControls";
import ButtonPreview from "../../components/ButtonPreview";
import LinkFields from "../../components/LinkFields";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

// A fallback, not a placeholder: the front renders the same file when nothing is
// uploaded, so the canvas shows exactly what will ship.
const defaultImage = `${themeUrl}assets/img/content/never_img_1.png`;

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

export default function Edit({ attributes, setAttributes }) {
  const {
    noPaddingTop,
    enableDecor,
    title,
    desc,
    note,
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

  const sectionClass = `never ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        <PanelBody title={__("Decor", "overchain-blocks")}>
          <ToggleControl
            label={__("Show decor", "overchain-blocks")}
            checked={enableDecor}
            onChange={(value) => setAttributes({ enableDecor: value })}
          />
        </PanelBody>

        <ImageControls
          type="image"
          imageId={imageId}
          imageUrl={imageUrl}
          imageIdAttribute="imageId"
          imageUrlAttribute="imageUrl"
          setAttributes={setAttributes}
        />

        <ButtonControls
          attributes={attributes}
          setAttributes={setAttributes}
          initialOpen={false}
        />

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
        <section className={sectionClass}>
          <div className="never__container">
            <div className="never__wrap section-wrap">
              {/* `.never__decor` is deliberately NOT rendered in the canvas: it is
                  90rem wide and centred with translate(-50%, -50%) on a section
                  that is far shorter, so it hangs above and below. Like
                  `.actually__blur` it does not merely cover the appender — it
                  swallows clicks on the block above. The toggle still controls
                  the front. */}

              <div className="never__body section-body">
                <div className="never__content">
                  <RichText
                    tagName="h2"
                    className="tl2"
                    placeholder={__("Section title", "overchain-blocks")}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                  />

                  {/* Sits between the heading and the description, inside
                      `__content` — not beside it. */}
                  <div className="never__img no-select" aria-hidden="true">
                    <img src={imageUrl || defaultImage} alt="" />
                  </div>

                  <RichText
                    tagName="div"
                    className="never__desc txt2"
                    placeholder={__("Description", "overchain-blocks")}
                    value={desc}
                    onChange={(value) => setAttributes({ desc: value })}
                  />

                  <RichText
                    tagName="div"
                    className="never__note txt3 col-alt1"
                    placeholder={__("Small note (optional)", "overchain-blocks")}
                    value={note}
                    onChange={(value) => setAttributes({ note: value })}
                  />

                  {secondaryText ? (
                    <div className="never__btns">
                      <ButtonPreview
                        text={buttonText}
                        icon={buttonIcon}
                        className="never__btn"
                      />
                      <span className="btn-def stl-trn-clw">{secondaryText}</span>
                    </div>
                  ) : (
                    <ButtonPreview
                      text={buttonText}
                      icon={buttonIcon}
                      className="never__btn"
                    />
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
