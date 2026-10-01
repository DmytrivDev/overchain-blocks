import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import ImageControls from "../../components/ImageControls";
import {
  PanelBody,
  SelectControl,
  ToggleControl,
  TextControl,
  Button,
} from "@wordpress/components";

import ButtonControls from "../../components/ButtonControls";
import ButtonPreview from "../../components/ButtonPreview";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

// The decor layer is a fixed design asset — every `layered` section in the design
// uses the same shape — so it is not an editable attribute.
const decorUrl = `${themeUrl}assets/img/decor/foundation_decor_1.svg`;

const createStep = () => ({ title: "", text: "" });
const createItem = () => ({ text: "" });

// Every `.item-actually` on both pages that has this list uses the same glyph,
// so it is a fixed design asset rather than a per-item upload.
const itemIconUrl = `${themeUrl}assets/img/icons/actually_icon_2.svg`;

export default function Edit({ attributes, setAttributes }) {
  const {
    noPaddingTop,
    mediaLayout,
    enableBlur,
    subtitleStyle,
    title,
    subtitle,
    imageId,
    imageUrl,
    text,
    listStyle,
    steps = [],
    items = [],
    buttonText,
    buttonIcon,
  } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `actually ${noPaddingTop ? "pbs4" : "pbs2"}`;

  const subtitleClass =
    subtitleStyle === "alt-min" ? "txt2 col-alt1 min-size" : "txt2 medium";

  const updateStep = (index, fields) => {
    setAttributes({
      steps: steps.map((step, i) =>
        i === index ? { ...step, ...fields } : step,
      ),
    });
  };

  const addStep = () => setAttributes({ steps: [...steps, createStep()] });

  const removeStep = (index) =>
    setAttributes({ steps: steps.filter((_, i) => i !== index) });

  const updateItem = (index, fields) => {
    setAttributes({
      items: items.map((item, i) =>
        i === index ? { ...item, ...fields } : item,
      ),
    });
  };

  const addItem = () => setAttributes({ items: [...items, createItem()] });

  const removeItem = (index) =>
    setAttributes({ items: items.filter((_, i) => i !== index) });

  const isItemList = listStyle === "items";

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        <PanelBody title={__("Layout", "overchain-blocks")}>
          <SelectControl
            label={__("Media", "overchain-blocks")}
            value={mediaLayout}
            options={[
              { label: __("Single image", "overchain-blocks"), value: "single" },
              { label: __("Decor + image", "overchain-blocks"), value: "layered" },
            ]}
            onChange={(value) => setAttributes({ mediaLayout: value })}
          />

          <SelectControl
            label={__("Subtitle style", "overchain-blocks")}
            value={subtitleStyle}
            options={[
              { label: __("Medium weight", "overchain-blocks"), value: "medium" },
              {
                label: __("Accent colour, smaller on mobile", "overchain-blocks"),
                value: "alt-min",
              },
            ]}
            onChange={(value) => setAttributes({ subtitleStyle: value })}
          />

          <SelectControl
            label={__("Bottom list", "overchain-blocks")}
            value={listStyle}
            options={[
              {
                label: __("Numbered steps", "overchain-blocks"),
                value: "steps",
              },
              {
                label: __("Icon items", "overchain-blocks"),
                value: "items",
              },
            ]}
            onChange={(value) => setAttributes({ listStyle: value })}
          />
        </PanelBody>

        <PanelBody title={__("Decor", "overchain-blocks")} initialOpen={false}>
          <ToggleControl
            label={__("Show background glow", "overchain-blocks")}
            checked={enableBlur}
            onChange={(value) => setAttributes({ enableBlur: value })}
          />
        </PanelBody>

        {isItemList && (
          <PanelBody title={__("List items", "overchain-blocks")} initialOpen={false}>
            {items.map((item, index) => (
              <div key={index} style={{ marginBottom: "16px" }}>
                <TextControl
                  label={`${__("Item", "overchain-blocks")} ${index + 1}`}
                  value={item.text || ""}
                  onChange={(value) => updateItem(index, { text: value })}
                />

                <Button variant="link" isDestructive onClick={() => removeItem(index)}>
                  {__("Remove item", "overchain-blocks")}
                </Button>
              </div>
            ))}

            <Button variant="primary" onClick={addItem}>
              {__("+ Add item", "overchain-blocks")}
            </Button>
          </PanelBody>
        )}

        {!isItemList && (
        <PanelBody title={__("Steps", "overchain-blocks")} initialOpen={false}>
          {steps.map((step, index) => (
            <div key={index} style={{ marginBottom: "16px" }}>
              <TextControl
                label={`${__("Step", "overchain-blocks")} ${index + 1}`}
                value={step.title || ""}
                onChange={(value) => updateStep(index, { title: value })}
              />

              <Button variant="link" isDestructive onClick={() => removeStep(index)}>
                {__("Remove step", "overchain-blocks")}
              </Button>
            </div>
          ))}

          <Button variant="primary" onClick={addStep}>
            {__("+ Add step", "overchain-blocks")}
          </Button>
        </PanelBody>
        )}

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
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="actually__container">
            <div className="actually__wrap section-wrap">
              {/* The glow layer is frontend-only. It is 68.5rem x 55.375rem at
                  z-index 2 and reaches ~18rem above and ~45rem left of the
                  section, so in the canvas it covers — and swallows clicks on —
                  whatever block sits above. The toggle still controls the front. */}

              {mediaLayout === "layered" ? (
                <>
                  <div className="actually__decor no-select" aria-hidden="true">
                    <img src={decorUrl} alt="" />
                  </div>
                  {imageUrl && (
                    <div className="actually__img no-select" aria-hidden="true">
                      <img src={imageUrl} alt="" />
                    </div>
                  )}
                </>
              ) : (
                imageUrl && (
                  <div className="actually__media no-select" aria-hidden="true">
                    <img src={imageUrl} alt="" />
                  </div>
                )
              )}

              <div className="actually__body section-body">
                <div className="actually__top">
                  <RichText
                    tagName="h2"
                    className="tl2"
                    placeholder={__("Section title", "overchain-blocks")}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                  />

                  <RichText
                    tagName="div"
                    className={subtitleClass}
                    placeholder={__("Short subtitle", "overchain-blocks")}
                    value={subtitle}
                    onChange={(value) => setAttributes({ subtitle: value })}
                  />
                </div>

                <div className="actually__bottom">
                  <RichText
                    tagName="div"
                    className="txt2 col-alt1"
                    placeholder={__("Supporting text", "overchain-blocks")}
                    value={text}
                    onChange={(value) => setAttributes({ text: value })}
                  />

                  {isItemList && items.length > 0 && (
                    <ul className="actually__list">
                      {items.map((item, index) => (
                        <li key={index} className="item-actually">
                          <div className="item-actually__icon">
                            <img src={itemIconUrl} alt="" />
                          </div>

                          <RichText
                            tagName="div"
                            className="item-actually__content"
                            placeholder={__("Item text", "overchain-blocks")}
                            value={item.text}
                            onChange={(value) =>
                              updateItem(index, { text: value })
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  )}

                  {!isItemList && steps.length > 0 && (
                    <ul className="actually__steps">
                      {steps.map((step, index) => (
                        <li key={index} className="steps-actually">
                          <div className="steps-actually__number">
                            {String(index + 1).padStart(2, "0")}
                          </div>

                          <div className="steps-actually__content">
                            <RichText
                              tagName="h3"
                              className="tl5 regular"
                              placeholder={__("Step title", "overchain-blocks")}
                              value={step.title}
                              onChange={(value) =>
                                updateStep(index, { title: value })
                              }
                            />

                            <RichText
                              tagName="div"
                              className="steps-actually__desc txt2"
                              placeholder={__(
                                "Step description",
                                "overchain-blocks",
                              )}
                              value={step.text}
                              onChange={(value) =>
                                updateStep(index, { text: value })
                              }
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  <ButtonPreview text={buttonText} icon={buttonIcon} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
