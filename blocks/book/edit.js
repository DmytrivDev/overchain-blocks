import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, TextControl, TextareaControl } from "@wordpress/components";

import SectionSettingsControls from "../../components/SectionSettingsControls";

export default function Edit({ attributes, setAttributes }) {
  const { title, iframeUrl, code = "", topSpacing } = attributes;

  // A short, readable hint of what the block will show: the pasted code's iframe /
  // script source (or its start), else the form link.
  const source = (code.match(/src=["']([^"']+)["']/i) || [])[1];
  const summary = code.trim() ? source || code.trim().slice(0, 120) : iframeUrl;
  // Empty = the design's default `pbs2`; "No padding" fits a page that holds only
  // the form (FM London's book.html).
  const spacing = topSpacing || "pbs2";

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
          showTopSpacing
          showWhiteFade={false}
        />

        <PanelBody title={__("Form", "overchain-blocks")} initialOpen={true}>
          <TextareaControl
            label={__("Embed code", "overchain-blocks")}
            help={__(
              "Paste the form's embed code (an <iframe> or a <script> snippet) exactly as the form service gives it. When it is filled in, the link below is ignored.",
              "overchain-blocks",
            )}
            value={code}
            onChange={(value) => setAttributes({ code: value })}
            rows={10}
            __nextHasNoMarginBottom
          />

          <TextControl
            label={__("Form link (iframe URL)", "overchain-blocks")}
            help={__("Used only when no embed code is pasted.", "overchain-blocks")}
            value={iframeUrl}
            placeholder="https://"
            onChange={(value) => setAttributes({ iframeUrl: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <section className={"none" === spacing ? "book" : `book ${spacing}`}>
          <div className="book__container">
            <div className="book__wrap section-wrap">
              <div className="book__body section-body">
                <div className="heading aic">
                  <RichText
                    tagName="h2"
                    className="tl2"
                    placeholder={__("Section title", "overchain-blocks")}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                  />
                </div>

                {/* Editor-only stand-in: the live third-party iframe is ~940px tall and
                    would swallow clicks, so the block could not be selected. */}
                <div className="book__placeholder">
                  <p className="book__placeholder-label">
                    {code.trim()
                      ? __("Booking form (embed code)", "overchain-blocks")
                      : __("Booking form (iframe)", "overchain-blocks")}
                  </p>
                  <p className="book__placeholder-url">
                    {summary ||
                      __(
                        "Paste the form's embed code in the block settings",
                        "overchain-blocks",
                      )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
