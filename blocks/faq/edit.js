import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, Button, TextControl, ToggleControl } from "@wordpress/components";

import SectionSettingsControls from "../../components/SectionSettingsControls";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

const decorUrl = `${themeUrl}assets/img/decor/faq_decor_1.png`;

const createItem = () => ({ question: "", answer: "" });

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, enableDecor, title, items = [] } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `faq ${noPaddingTop ? "pbs4" : "pbs2"}`;

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

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        <PanelBody title={__("Decor", "overchain-blocks")} initialOpen={false}>
          <ToggleControl
            label={__("Show background decor", "overchain-blocks")}
            checked={enableDecor}
            onChange={(value) => setAttributes({ enableDecor: value })}
          />
        </PanelBody>

        <PanelBody title={__("Questions", "overchain-blocks")} initialOpen={true}>
          {items.map((item, index) => (
            <div key={index} style={{ marginBottom: "8px" }}>
              <TextControl
                label={`${__("Question", "overchain-blocks")} ${index + 1}`}
                value={item.question}
                onChange={(value) => updateItem(index, { question: value })}
              />

              <Button
                variant="link"
                isDestructive
                onClick={() => removeItem(index)}
              >
                {__("Remove question", "overchain-blocks")}
              </Button>
            </div>
          ))}

          <Button variant="primary" onClick={addItem}>
            {__("+ Add question", "overchain-blocks")}
          </Button>
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="faq__container">
            <div className="faq__wrap section-wrap">
              {/* `.faq__decor` is deliberately NOT rendered in the canvas: it is
                  86.5rem wide and hangs 41.6rem below its own section, so it would
                  paint over the block that follows. The toggle still drives the
                  front — same call as the Locations decor. */}

              <div className="faq__body section-body">
                <div className="heading aic">
                  <RichText
                    tagName="h2"
                    className="tl2"
                    placeholder={__("Section title", "overchain-blocks")}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                  />
                </div>

                {/* No `.is-active` here: the theme's css/editor.css forces the open
                    state for every `.ac` in the canvas, so the editor markup stays
                    identical to what Blade emits. */}
                <ul className="faq__list base-accord accord">
                  {items.map((item, index) => (
                    <li className="ac" key={index}>
                      <div className="ac-trigger">
                        <div className="ac-head">
                          <RichText
                            tagName="h3"
                            className="tl5 regular"
                            placeholder={__("Question", "overchain-blocks")}
                            value={item.question}
                            onChange={(value) =>
                              updateItem(index, { question: value })
                            }
                          />

                          <button
                            type="button"
                            className="ac-toggle"
                            aria-label={__("Toggle answer", "overchain-blocks")}
                            onClick={(event) => event.preventDefault()}
                          >
                            <span></span>
                          </button>
                        </div>

                        <div className="ac-panel">
                          <RichText
                            tagName="div"
                            className="faq__content txt2 light"
                            placeholder={__("Answer", "overchain-blocks")}
                            value={item.answer}
                            onChange={(value) =>
                              updateItem(index, { answer: value })
                            }
                          />
                        </div>
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
