import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, Button } from "@wordpress/components";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import ImageField from "../../components/ImageField";
import ButtonControls from "../../components/ButtonControls";
import ButtonPreview from "../../components/ButtonPreview";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

const createStep = () => ({ iconId: 0, iconUrl: "", title: "", text: "" });

// The design ships three glyphs and uses them in order. They are the fallback
// rather than the value, so an untouched block already looks like the design and
// an editor can still override any single step. The modulo matters: nothing stops
// an editor adding a fourth step, and without it the image would 404.
const defaultIcon = (index) =>
  `${themeUrl}assets/img/icons/steps_icon_${(index % 3) + 1}.svg`;

export default function Edit({ attributes, setAttributes }) {
  const {
    noPaddingTop,
    title,
    text,
    steps = [],
    buttonText,
    buttonIcon,
  } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `steps ${noPaddingTop ? "pbs4" : "pbs2"}`;

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

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        <PanelBody title={__("Steps", "overchain-blocks")} initialOpen={true}>
          {steps.map((step, index) => (
            <div key={index} style={{ marginBottom: "16px" }}>
              <ImageField
                label={`${__("Step icon", "overchain-blocks")} ${index + 1}`}
                imageId={step.iconId}
                imageUrl={step.iconUrl}
                onSelect={(media) =>
                  updateStep(index, { iconId: media.id, iconUrl: media.url })
                }
                onRemove={() => updateStep(index, { iconId: 0, iconUrl: "" })}
              />

              <Button
                variant="link"
                isDestructive
                onClick={() => removeStep(index)}
              >
                {__("Remove step", "overchain-blocks")}
              </Button>
            </div>
          ))}

          <Button variant="primary" onClick={addStep}>
            {__("+ Add step", "overchain-blocks")}
          </Button>
        </PanelBody>

        <ButtonControls
          attributes={attributes}
          setAttributes={setAttributes}
          initialOpen={false}
        />
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="steps__container">
            <div className="steps__wrap section-wrap">
              <div className="steps__body section-body">
                {/* Rendered unconditionally so an empty heading stays reachable;
                    Blade drops the whole wrapper when both fields are empty. */}
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
                    className="txt2 col-alt1"
                    placeholder={__(
                      "Supporting text (optional)",
                      "overchain-blocks",
                    )}
                    value={text}
                    onChange={(value) => setAttributes({ text: value })}
                  />
                </div>

                <div className="steps__layout">
                  {steps.length > 0 && (
                    <ul className="steps__list">
                      {steps.map((step, index) => (
                        <li key={index} className="item-steps">
                          <div className="item-steps__icon">
                            <img
                              src={step.iconUrl || defaultIcon(index)}
                              alt=""
                            />
                          </div>

                          <div className="item-steps__content">
                            {/* Derived from the index, never stored: reordering
                                steps must not mean renumbering them by hand. */}
                            <span className="item-steps__num">
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            <div className="item-steps__box">
                              <RichText
                                tagName="h3"
                                className="tl5 regular"
                                placeholder={__(
                                  "Step title",
                                  "overchain-blocks",
                                )}
                                value={step.title}
                                onChange={(value) =>
                                  updateStep(index, { title: value })
                                }
                              />

                              <RichText
                                tagName="div"
                                className="txt2 col-alt1"
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
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  <ButtonPreview
                    text={buttonText}
                    icon={buttonIcon}
                    className="steps__btn"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
