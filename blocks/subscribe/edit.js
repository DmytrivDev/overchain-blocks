import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import ImageControls from "../../components/ImageControls";
import TextSettingsControls from "../../components/TextSettingsControls";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";
const placeholderImage =
  window.ovchBlocks?.url + "resources/placeholders/coins.png";

export default function Edit({ attributes, setAttributes }) {
  const {
    noPaddingTop,
    title,
    subtitle,
    privacy,
    imageId,
    imageUrl,
    successTitle,
    successDesc,
  } = attributes;

  const blockProps = useBlockProps({ style: { padding: 0, margin: 0 } });
  const previewImage = imageUrl || placeholderImage;
  const sectionClass = `infrastruct mailing ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />
        <ImageControls
          type="image"
          imageId={imageId}
          imageUrl={imageUrl}
          imageIdAttribute="imageId"
          imageUrlAttribute="imageUrl"
          setAttributes={setAttributes}
        />
        <TextSettingsControls
          title={__("Success modal", "overchain-blocks")}
          initialOpen={false}
          controls={[
            {
              attribute: "successTitle",
              label: __("Title", "overchain-blocks"),
              value: successTitle,
              onChange: (value) => setAttributes({ successTitle: value }),
            },
            {
              attribute: "successDesc",
              label: __("Description", "overchain-blocks"),
              value: successDesc,
              type: "textarea",
              onChange: (value) => setAttributes({ successDesc: value }),
            },
          ]}
        />
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="infrastruct__container">
            <div className="infrastruct__wrap">
              <div className="infrastruct__bg no-select" aria-hidden="true">
                <img
                  src={`${themeUrl}assets/img/decor/infrastruct_bg_1.jpg`}
                  alt=""
                />
              </div>

              <div className="infrastruct__body section-body">
                <div className="infrastruct__img">
                  <img
                    src={previewImage}
                    alt=""
                    style={!imageUrl ? { opacity: 0.3 } : {}}
                  />
                </div>

                <div className="infrastruct__content">
                  <RichText
                    tagName="h2"
                    className="tl3"
                    placeholder={__("Section title", "overchain-blocks")}
                    value={title}
                    onChange={(v) => setAttributes({ title: v })}
                  />
                  <div className="txt2 medium">
                    <RichText
                      tagName="p"
                      placeholder={__("Short description", "overchain-blocks")}
                      value={subtitle}
                      onChange={(v) => setAttributes({ subtitle: v })}
                    />
                  </div>

                  <div className="form-infrastruct base-form">
                    <label className="form-infrastruct__label">
                      {__("Enter Your Email", "overchain-blocks")}
                    </label>
                    <div className="form-infrastruct__layout">
                      <span className="form-infrastruct__input">
                        <input
                          type="email"
                          placeholder="Example@company.com"
                          disabled
                        />
                      </span>
                      <button
                        className="form-infrastruct__submit btn-def"
                        disabled
                      >
                        {__("Subscribe", "overchain-blocks")}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="infrastruct__bottom">
                  <div className="text">
                    <RichText
                      tagName="p"
                      placeholder={__("Privacy text...", "overchain-blocks")}
                      value={privacy}
                      onChange={(v) => setAttributes({ privacy: v })}
                      allowedFormats={["core/link", "core/bold", "core/italic"]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}