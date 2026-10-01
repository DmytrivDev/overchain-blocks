import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import ImageControls from "../../components/ImageControls";
import TagListControls from "../../components/TagListControls";
import ButtonControls from "../../components/ButtonControls";
import ButtonPreview from "../../components/ButtonPreview";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

// A fallback, not a placeholder: with nothing uploaded the front renders the
// design's own picture, which is what the canvas shows too.
const defaultImage = `${themeUrl}assets/img/content/way_img_1.png`;

export default function Edit({ attributes, setAttributes }) {
  const {
    noPaddingTop,
    enableImage,
    imageId,
    imageUrl,
    title,
    text,
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

  const sectionClass = `way ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        <PanelBody title={__("Decor", "overchain-blocks")}>
          <ToggleControl
            label={__("Show image", "overchain-blocks")}
            checked={enableImage}
            onChange={(value) => setAttributes({ enableImage: value })}
          />
        </PanelBody>

        <ImageControls
          type="image"
          imageId={imageId}
          imageUrl={imageUrl}
          imageIdAttribute="imageId"
          imageUrlAttribute="imageUrl"
          setAttributes={setAttributes}
        />

        <TagListControls
          items={items}
          itemsAttribute="items"
          setAttributes={setAttributes}
          title={__("List items", "overchain-blocks")}
          labelText={__("Item", "overchain-blocks")}
          addItemText={__("+ Add item", "overchain-blocks")}
          removeItemText={__("Remove item", "overchain-blocks")}
          defaultItem={{ label: "" }}
          initialOpen={true}
        />

        <ButtonControls
          attributes={attributes}
          setAttributes={setAttributes}
          initialOpen={false}
        />
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="way__container">
            <div className="way__wrap section-wrap">
              <div className="way__body section-body">
                <div className="heading aic mbe2">
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
                    placeholder={__("Supporting text", "overchain-blocks")}
                    value={text}
                    onChange={(value) => setAttributes({ text: value })}
                  />
                </div>

                <div className="way__content">
                  {enableImage && (
                    <div className="way__img no-select" aria-hidden="true">
                      <img src={imageUrl || defaultImage} alt="" />
                    </div>
                  )}

                  {items.length > 0 && (
                    <ul className="way__items">
                      {items.map((item, index) => (
                        <li key={index} className="item-way">
                          <div className="item-way__box">
                            <h3 className="tl5">{item.label}</h3>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  <ButtonPreview
                    text={buttonText}
                    icon={buttonIcon}
                    className="way__btn"
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
