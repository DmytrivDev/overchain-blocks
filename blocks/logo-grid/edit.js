import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import ImageListControls from "../../components/ImageListControls";

const placeholderLogo =
  window.ovchBlocks?.url + "resources/placeholders/logo.png";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, enableBg, title, text, platforms = [] } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `funds ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        <ImageListControls
          items={platforms}
          itemsAttribute="platforms"
          setAttributes={setAttributes}
          title={__("Logos", "overchain-blocks")}
          itemLabel={__("Logo", "overchain-blocks")}
          addItemText={__("+ Add logo", "overchain-blocks")}
          removeItemText={__("Remove logo", "overchain-blocks")}
          initialOpen
        />

        <PanelBody title={__("Decor", "overchain-blocks")} initialOpen={false}>
          <ToggleControl
            label={__("Show background", "overchain-blocks")}
            checked={!!enableBg}
            onChange={(value) => setAttributes({ enableBg: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="funds__container">
            <div className="funds__wrap section-wrap">
              {enableBg && (
                <div className="funds__bg no-select" aria-hidden="true">
                  <img
                    src={`${themeUrl}assets/img/decor/introflow_bg_1.jpg`}
                    alt=""
                  />
                </div>
              )}

              <div className="funds__body section-body">
                <div className="heading">
                  <RichText
                    tagName="h2"
                    className="tl2"
                    placeholder={__("Section title", "overchain-blocks")}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                  />

                  <RichText
                    tagName="div"
                    className="txt2"
                    placeholder={__("Supporting text", "overchain-blocks")}
                    value={text}
                    onChange={(value) => setAttributes({ text: value })}
                  />
                </div>

                {/* Rows without an image keep their placeholder here so the grid
                    stays editable; Blade drops them on the front. */}
                <ul className="funds__platforms">
                  {platforms.map((logo, index) => (
                    <li key={index} className="platforms-funds">
                      <div className="platforms-funds__logo">
                        <img
                          src={logo.imageUrl || placeholderLogo}
                          alt=""
                          style={!logo.imageUrl ? { opacity: 0.3 } : {}}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
