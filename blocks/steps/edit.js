import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import IconListControls from "../../components/IconListControls";

const placeholderIcon =
  window.ovchBlocks?.url + "resources/placeholders/feature-icon.svg";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, title, subtitle, steps } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `oneflow ${noPaddingTop ? "pbs4" : "pbs2"}`;

  const updateStep = (index, key, value) => {
    const updated = steps.map((step, i) =>
      i === index ? { ...step, [key]: value } : step,
    );

    setAttributes({ steps: updated });
  };

  const formatStepNumber = (index) => String(index + 1).padStart(2, "0");

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        <IconListControls
          items={steps}
          itemsAttribute="steps"
          itemTitle={__("Step", "overchain-blocks")}
          removeItemText={__("Remove step", "overchain-blocks")}
          addItemText={__("+ Add step", "overchain-blocks")}
          maxItems={4}
          defaultItem={{
            iconUrl: "",
            iconId: 0,
            label: "Step title",
          }}
          setAttributes={setAttributes}
        />
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="oneflow__container">
            <div className="oneflow__wrap">
              <div
                className="oneflow__decor decor1 no-select"
                aria-hidden="true"
              >
                <img
                  src={`${themeUrl}assets/img/decor/oneflow_dec_1.jpg`}
                  alt=""
                />
              </div>

              <div className="oneflow__body section-body">
                <div className="heading aic">
                  <RichText
                    tagName="h2"
                    className="tl2"
                    placeholder={__("Section title", "overchain-blocks")}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                  />

                  <RichText
                    tagName="div"
                    className="txt4 col-alt1"
                    placeholder={__("Short subtitle", "overchain-blocks")}
                    value={subtitle}
                    onChange={(value) => setAttributes({ subtitle: value })}
                  />
                </div>

                <div className="oneflow__layout" data-threshold-desktop="0.4">
                  <div className="oneflow__line" aria-hidden="true"></div>

                  <ul className="oneflow__steps">
                    {steps.map((step, index) => (
                      <li key={index} className="item-oneflow">
                        <div className="item-oneflow__icon">
                          <img src={step.iconUrl || placeholderIcon} alt="" />
                        </div>

                        <div className="item-oneflow__box">
                          <RichText
                            tagName="h3"
                            className="item-oneflow__tl"
                            placeholder={__("Step title", "overchain-blocks")}
                            value={step.label}
                            onChange={(value) =>
                              updateStep(index, "label", value)
                            }
                          />

                          <p className="item-oneflow__step">
                            {formatStepNumber(index)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
