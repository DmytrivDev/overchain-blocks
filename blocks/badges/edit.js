import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import ImageControls from "../../components/ImageControls";
import IconListControls from "../../components/IconListControls";

const placeholderIcon =
  window.ovchBlocks?.url + "resources/placeholders/icon.svg";
const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

export default function Edit({ attributes, setAttributes }) {
  const {
    noPaddingTop,
    title,
    decoLeftId,
    decoLeftUrl,
    decoRightId,
    decoRightUrl,
    badges,
  } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `operation ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        <ImageControls
          type="image"
          title={__("Left decorative image", "overchain-blocks")}
          imageId={decoLeftId}
          imageUrl={decoLeftUrl}
          imageIdAttribute="decoLeftId"
          imageUrlAttribute="decoLeftUrl"
          selectLabel={__("Select left image", "overchain-blocks")}
          replaceLabel={__("Replace left image", "overchain-blocks")}
          removeLabel={__("Remove left image", "overchain-blocks")}
          initialOpen={false}
          setAttributes={setAttributes}
        />

        <ImageControls
          type="image"
          title={__("Right decorative image", "overchain-blocks")}
          imageId={decoRightId}
          imageUrl={decoRightUrl}
          imageIdAttribute="decoRightId"
          imageUrlAttribute="decoRightUrl"
          selectLabel={__("Select right image", "overchain-blocks")}
          replaceLabel={__("Replace right image", "overchain-blocks")}
          removeLabel={__("Remove right image", "overchain-blocks")}
          initialOpen={false}
          setAttributes={setAttributes}
        />

        <IconListControls
          items={badges}
          itemsAttribute="badges"
          itemTitle={__("Badge", "overchain-blocks")}
          removeItemText={__("Remove badge", "overchain-blocks")}
          addItemText={__("+ Add badge", "overchain-blocks")}
          defaultItem={{
            iconUrl: "",
            iconId: 0,
            label: "Badge title",
          }}
          setAttributes={setAttributes}
        />
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="operation__container">
            <div className="operation__wrap">
              <div className="operation__bg no-select" aria-hidden="true">
                <img
                  src={`${themeUrl}assets/img/decor/operation_bg_1.svg`}
                  alt=""
                />
              </div>

              <div
                className="operation__decor decor1 no-select"
                aria-hidden="true"
              ></div>

              <div
                className="operation__decor decor2 no-select"
                aria-hidden="true"
              ></div>

              <div className="operation__body section-body">
                {decoLeftUrl && (
                  <div
                    className="operation__img img1 no-select mouse-prllx"
                    aria-hidden="true"
                  >
                    <img src={decoLeftUrl} alt="" />
                  </div>
                )}

                {decoRightUrl && (
                  <div
                    className="operation__img img2 no-select mouse-prllx reverse"
                    aria-hidden="true"
                  >
                    <img src={decoRightUrl} alt="" />
                  </div>
                )}

                <div className="heading aic">
                  <RichText
                    tagName="h2"
                    className="tl2"
                    placeholder={__("Section title", "overchain-blocks")}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                  />
                </div>

                <ul className="operation__list">
                  {badges.map((badge, index) => (
                    <li key={index} className="item-operation">
                      <img src={badge.iconUrl || placeholderIcon} alt="" />
                      <p>{badge.label}</p>
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
