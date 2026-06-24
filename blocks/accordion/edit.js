import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, Button, TextControl } from "@wordpress/components";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import ImageField from "../../components/ImageField";
import LinkFields from "../../components/LinkFields";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";
const placeholderUrl =
  window.ovchBlocks?.url + "resources/placeholders/image.png";

const createItem = () => ({
  heading: "Item title",
  text: "",
  imageId: 0,
  imageUrl: "",
  buttonType: "link",
  buttonLink: "",
  buttonLinkId: 0,
  buttonLinkTitle: "",
  buttonNewTab: false,
  buttonAnchor: "",
  buttonPopupId: "",
});

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, title, subtitle, items = [] } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `paid ${noPaddingTop ? "pbs4" : "pbs2"}`;

  const updateItem = (index, fields) => {
    setAttributes({
      items: items.map((item, i) =>
        i === index ? { ...item, ...fields } : item,
      ),
    });
  };

  const addItem = () => {
    setAttributes({
      items: [...items, createItem()],
    });
  };

  const removeItem = (index) => {
    setAttributes({
      items: items.filter((_, i) => i !== index),
    });
  };

  const getItemHref = (item) => {
    if (item.buttonType === "anchor") {
      return item.buttonAnchor || "";
    }

    if (item.buttonType === "popup") {
      return item.buttonPopupId || "";
    }

    return item.buttonLink || "";
  };

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        {items.map((item, index) => (
          <PanelBody
            key={index}
            title={
              item.heading || `${__("Item", "overchain-blocks")} ${index + 1}`
            }
            initialOpen={false}
          >
            <TextControl
              label={__("Heading", "overchain-blocks")}
              value={item.heading || ""}
              onChange={(value) => updateItem(index, { heading: value })}
            />

            <ImageField
              imageId={item.imageId}
              imageUrl={item.imageUrl}
              onSelect={(media) =>
                updateItem(index, {
                  imageId: media.id,
                  imageUrl: media.url,
                })
              }
              onRemove={() =>
                updateItem(index, {
                  imageId: 0,
                  imageUrl: "",
                })
              }
            />

            <LinkFields
              type={item.buttonType}
              link={item.buttonLink}
              linkId={item.buttonLinkId}
              linkTitle={item.buttonLinkTitle}
              newTab={item.buttonNewTab}
              anchor={item.buttonAnchor}
              popupId={item.buttonPopupId}
              onChange={(fields) => updateItem(index, fields)}
            />

            {items.length > 1 && (
              <Button
                variant="link"
                isDestructive
                onClick={() => removeItem(index)}
                style={{
                  display: "block",
                  marginTop: "8px",
                }}
              >
                {__("Remove item", "overchain-blocks")}
              </Button>
            )}
          </PanelBody>
        ))}

        <div style={{ padding: "16px" }}>
          <Button variant="primary" onClick={addItem}>
            {__("+ Add item", "overchain-blocks")}
          </Button>
        </div>
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="paid__container">
            <div className="paid__body section-body">
              <div className="paid__layout">
                <div className="paid__heading">
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
                    placeholder={__("Short subtitle", "overchain-blocks")}
                    value={subtitle}
                    onChange={(value) => setAttributes({ subtitle: value })}
                  />
                </div>

                <div className="paid__splide splide">
                  <div className="splide__track">
                    <ul className="splide__list">
                      {items.map((item, index) => {
                        const hasLink = !!getItemHref(item);

                        return (
                          <li key={index} className="splide__slide card-paid">
                            {hasLink && (
                              <span className="card-paid__link">
                                <img
                                  src={`${themeUrl}assets/img/icons/vec_1b.svg`}
                                  alt=""
                                />
                              </span>
                            )}

                            <div
                              className="card-paid__bg ibg no-select"
                              aria-hidden="true"
                            >
                              <img
                                src={`${themeUrl}assets/img/decor/paid_bg_1.jpg`}
                                alt=""
                              />
                            </div>

                            <div className="card-paid__img">
                              <img
                                src={item.imageUrl || placeholderUrl}
                                alt=""
                              />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <ul className="paid__tabs">
                  {items.map((item, index) => {
                    const hasLink = !!getItemHref(item);

                    return (
                      <li key={index} className="tab-paid">
                        <span className="progress" aria-hidden="true">
                          <span></span>
                        </span>

                        <div className="tab-paid__head">
                          <RichText
                            tagName="h3"
                            className="tl5"
                            placeholder={__("Item title", "overchain-blocks")}
                            value={item.heading}
                            onChange={(value) =>
                              updateItem(index, { heading: value })
                            }
                          />
                        </div>

                        <div className="tab-paid__dropdown">
                          <div className="tab-paid__content">
                            <RichText
                              tagName="div"
                              className="txt3 light"
                              placeholder={__(
                                "Item description",
                                "overchain-blocks",
                              )}
                              value={item.text}
                              onChange={(value) =>
                                updateItem(index, { text: value })
                              }
                            />

                            {hasLink && (
                              <a href="#" className="link-more">
                                {__("Discover More", "overchain-blocks")}
                              </a>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
