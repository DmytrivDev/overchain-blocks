import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { TextControl, PanelBody } from "@wordpress/components";
import ImageControls from "../../../components/ImageControls";

const pluginUrl = window.ovchBlocks?.url || "";
const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

export default function Edit({ attributes, setAttributes }) {
  const { date, place, title, link, text, logoId, logoUrl } = attributes;

  const blockProps = useBlockProps({
    className: "card-events",
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Link", "overchain-blocks")} initialOpen={true}>
          <TextControl
            label={__("Headline link (event page)", "overchain-blocks")}
            help={__("Optional. Leave empty and the headline is plain text.", "overchain-blocks")}
            value={link}
            onChange={(value) => setAttributes({ link: value })}
          />
        </PanelBody>

        <ImageControls
          type="image"
          title={__("Event logo", "overchain-blocks")}
          imageId={logoId}
          imageUrl={logoUrl}
          imageIdAttribute="logoId"
          imageUrlAttribute="logoUrl"
          setAttributes={setAttributes}
        />
      </InspectorControls>

      <li {...blockProps}>
        <div className="card-events__aside">
          <div className="card-events__part">
            <RichText
              tagName="h3"
              className="card-events__dates tl5"
              placeholder={__("Date", "overchain-blocks")}
              value={date}
              onChange={(value) => setAttributes({ date: value })}
              allowedFormats={["core/bold", "core/italic", "core/text-color"]}
            />
          </div>
          <div className="card-events__part">
            <RichText
              tagName="p"
              className="card-events__local"
              placeholder={__("Place", "overchain-blocks")}
              value={place}
              onChange={(value) => setAttributes({ place: value })}
              allowedFormats={["core/bold", "core/italic"]}
            />
          </div>
          <div className="card-events__dashed" aria-hidden="true"></div>
        </div>

        <div className="card-events__main">
          <div className="card-events__content">
            <div className="card-events__part">
              <RichText
                tagName="div"
                className="tl3"
                placeholder={__("Headline", "overchain-blocks")}
                value={title}
                onChange={(value) => setAttributes({ title: value })}
                allowedFormats={["core/bold", "core/italic"]}
              />
              <div className="txt3 light">
                <RichText
                  tagName="p"
                  placeholder={__("Description", "overchain-blocks")}
                  value={text}
                  onChange={(value) => setAttributes({ text: value })}
                  allowedFormats={["core/bold", "core/italic", "core/link"]}
                />
              </div>
            </div>
          </div>

          <div className="card-events__image">
            <div className="card-events__bg ibg no-select" aria-hidden="true">
              <img src={`${themeUrl}assets/img/decor/card-events_bg_1.jpg`} alt="" />
            </div>
            <div className="card-events__img">
              <img src={logoUrl || `${pluginUrl}resources/placeholders/logo.png`} alt="" />
            </div>
          </div>
        </div>

        <div className="card-events__blur no-select" aria-hidden="true">
          <img src={`${themeUrl}assets/img/decor/settlement_blur_2.webp`} alt="" />
        </div>
      </li>
    </>
  );
}
