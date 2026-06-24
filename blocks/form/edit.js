import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import TextSettingsControls from "../../components/TextSettingsControls";
import FormCheckboxPreview from "../../components/FormCheckboxPreview";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

export default function Edit({ attributes, setAttributes }) {
  const {
    noPaddingTop,
    title,
    subtitle,
    privacyText,
    marketingText,
    buttonText,
  } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `intouch ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        <TextSettingsControls
          title={__("Button", "overchain-blocks")}
          initialOpen={false}
          controls={[
            {
              attribute: "buttonText",
              label: __("Button text", "overchain-blocks"),
              value: buttonText,
              onChange: (value) => setAttributes({ buttonText: value }),
            },
          ]}
        />

        <TextSettingsControls
          title={__("Success modal", "overchain-blocks")}
          initialOpen={false}
          controls={[
            {
              attribute: "successTitle",
              label: __("Title", "overchain-blocks"),
              value: attributes.successTitle,
              onChange: (value) => setAttributes({ successTitle: value }),
            },
            {
              attribute: "successDesc",
              label: __("Description", "overchain-blocks"),
              value: attributes.successDesc,
              type: "textarea",
              onChange: (value) => setAttributes({ successDesc: value }),
            },
          ]}
        />
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="intouch__container">
            <div className="intouch__wrap">
              <div className="intouch__decor no-select" aria-hidden="true">
                <img
                  src={`${themeUrl}assets/img/decor/oneflow_dec_1.jpg`}
                  alt=""
                />
              </div>

              <div className="intouch__body section-body">
                <div className="heading aic">
                  <RichText
                    tagName="h2"
                    className="tl2"
                    placeholder={__("Form title", "overchain-blocks")}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                  />

                  <RichText
                    tagName="div"
                    className="txt3 col-alt1"
                    placeholder={__("Form subtitle", "overchain-blocks")}
                    value={subtitle}
                    onChange={(value) => setAttributes({ subtitle: value })}
                  />
                </div>

                <form className="form-intouch submitForm hubSpotForm form__content hs-form-private hs-form stacked hs-custom-style">
                  <fieldset className="field-inputs form-columns-2">
                    <div className="field-inputs__box hs_firstname hs-firstname hs-fieldtype-text field hs-form-field">
                      <label>
                        <span>First name</span>
                        <span className="hs-form-required">*</span>
                      </label>
                      <div className="input">
                        <input
                          type="text"
                          className="hs-input"
                          placeholder="Type here"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="field-inputs__box hs_lastname hs-lastname hs-fieldtype-text field hs-form-field">
                      <label>
                        <span>Last name</span>
                        <span className="hs-form-required">*</span>
                      </label>
                      <div className="input">
                        <input
                          type="text"
                          className="hs-input"
                          placeholder="Type here"
                          disabled
                        />
                      </div>
                    </div>
                  </fieldset>

                  <fieldset className="field-inputs form-columns-2">
                    <div className="field-inputs__box hs_jobtitle hs-jobtitle hs-fieldtype-text field hs-form-field">
                      <label>
                        <span>Job title</span>
                      </label>
                      <div className="input">
                        <input
                          type="text"
                          className="hs-input"
                          placeholder="CEO, designer, manager"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="field-inputs__box hs_email hs-email hs-fieldtype-text field hs-form-field">
                      <label>
                        <span>Business email</span>
                        <span className="hs-form-required">*</span>
                      </label>
                      <div className="input">
                        <input
                          type="email"
                          className="hs-input"
                          placeholder="example@email.com"
                          disabled
                        />
                      </div>
                    </div>
                  </fieldset>

                  <fieldset className="field-inputs form-columns-2">
                    <div className="field-inputs__box hs_website hs-website hs-fieldtype-text field hs-form-field">
                      <label data-optional="(optional)">
                        <span>Company Website</span>
                      </label>
                      <div className="input">
                        <input
                          type="text"
                          className="hs-input"
                          placeholder="example.company.com"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="field-inputs__box hs_phone hs-phone hs-fieldtype-phonenumber field hs-form-field">
                      <label>
                        <span>Phone</span>
                        <span className="hs-form-required">*</span>
                      </label>
                      <div className="input phone-wrapp">
                        <input
                          type="tel"
                          className="hs-input"
                          placeholder="+380 000 00 00"
                          disabled
                        />
                      </div>
                    </div>
                  </fieldset>

                  <fieldset className="field-inputs form-columns-1">
                    <div className="field-inputs__box hs_message hs-message hs-fieldtype-textarea field hs-form-field">
                      <label data-optional="(optional)">
                        <span>Message</span>
                      </label>
                      <div className="input">
                        <textarea
                          className="hs-input hs-fieldtype-textarea"
                          placeholder="Type here"
                          disabled
                        ></textarea>
                      </div>
                    </div>
                  </fieldset>

                  <fieldset className="field-privacy form-columns-1">
                    <div className="field-privacy__box hsfc-DataPrivacyField">
                      <FormCheckboxPreview
                        rowClassName="hsfc-Row checkInputs"
                        value={privacyText}
                        onChange={(value) =>
                          setAttributes({ privacyText: value })
                        }
                        placeholder={__(
                          "Privacy checkbox text",
                          "overchain-blocks",
                        )}
                      />

                      <FormCheckboxPreview
                        value={marketingText}
                        onChange={(value) =>
                          setAttributes({ marketingText: value })
                        }
                        placeholder={__(
                          "Marketing checkbox text",
                          "overchain-blocks",
                        )}
                        required={true}
                      />
                    </div>
                  </fieldset>

                  <div className="field-submit hs_submit hs-submit">
                    <div className="actions btn-icon">
                      <span className="txt">
                        <input
                          type="submit"
                          className="form__button button full black flex centerH hs-button primary large"
                          value={buttonText}
                          disabled
                        />
                      </span>
                      <span className="icon">
                        <img
                          src={`${themeUrl}assets/img/icons/btn_2.svg`}
                          alt=""
                        />
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
