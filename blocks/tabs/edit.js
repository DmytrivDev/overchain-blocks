import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";

const ALLOWED_BLOCKS = ["overchain/tab"];

const TEMPLATE = [
  ["overchain/tab", { tabLabel: "Direct bank deposits" }],
  ["overchain/tab", { tabLabel: "Diverse currency range" }],
  ["overchain/tab", { tabLabel: "Automated settlements" }],
  ["overchain/tab", { tabLabel: "24/7 support" }],
];

const themeUrl =
  window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

export default function Edit({ attributes, setAttributes, clientId }) {
  const { noPaddingTop, title } = attributes;
  const [activeTab, setActiveTab] = useState(0);

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const innerBlocks = useSelect(
    (select) => select("core/block-editor").getBlocks(clientId),
    [clientId],
  );

  const sectionClass = `settlement ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="settlement__container">
            <div className="settlement__wrap">
              <div
                className="settlement__blur no-select"
                aria-hidden="true"
              >
                <img
                  src={`${themeUrl}assets/img/decor/settlement_blur_1.webp`}
                  alt=""
                />
              </div>

              <div className="settlement__body section-body">
                <div className="heading">
                  <RichText
                    tagName="h2"
                    className="tl2"
                    placeholder={__("Section title", "overchain-blocks")}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                  />
                </div>

                <div className="settlement__main tabs">
                  <div className="settlement__btns tabs__btns" data-center-tab>
                    <ul>
                      {innerBlocks.map((block, index) => (
                        <li key={block.clientId}>
                          <button
                            type="button"
                            className={`tab__btn${
                              activeTab === index ? " is-active" : ""
                            }`}
                            data-tab={`tb-block${index + 1}`}
                            onClick={() => setActiveTab(index)}
                          >
                            {block.attributes.tabLabel ||
                              `${__("Tab", "overchain-blocks")} ${index + 1}`}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="settlement__layout overchain-tabs__content"
                    data-active-tab={activeTab}
                  >
                    <InnerBlocks
                      allowedBlocks={ALLOWED_BLOCKS}
                      template={TEMPLATE}
                      renderAppender={InnerBlocks.ButtonBlockAppender}
                    />
                  </div>

                  <div
                    className="settlement__bg no-select"
                    aria-hidden="true"
                  >
                    <img
                      src={`${themeUrl}assets/img/decor/settlement_blur_2.webp`}
                      alt=""
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