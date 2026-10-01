import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import ImageControls from "../../components/ImageControls";
import ButtonControls from "../../components/ButtonControls";
import ButtonPreview from "../../components/ButtonPreview";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

// A fallback, not a placeholder: the front renders the same file when nothing is
// uploaded, so the canvas shows exactly what will ship.
const defaultImage = `${themeUrl}assets/img/content/introflow_img_1.png`;

export default function Edit({ attributes, setAttributes }) {
  const {
    noPaddingTop,
    enableBackground,
    title,
    subtitle,
    desc,
    imageId,
    imageUrl,
    buttonText,
    buttonIcon,
  } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `introflow ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        <PanelBody title={__("Decor", "overchain-blocks")}>
          <ToggleControl
            label={__("Show background", "overchain-blocks")}
            checked={enableBackground}
            onChange={(value) => setAttributes({ enableBackground: value })}
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

        <ButtonControls
          attributes={attributes}
          setAttributes={setAttributes}
          initialOpen={false}
        />
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="introflow__container">
            <div className="introflow__wrap section-wrap">
              {/* `.introflow__bg` is deliberately NOT rendered in the canvas:
                  75.125rem wide and anchored 3rem *above* its own section-wrap,
                  so most of it spills past the section and covers the appender
                  and the next block. Same call as `.manage__bg`. The toggle
                  still controls the front. */}

              <div className="introflow__body section-body">
                <div className="introflow__content">
                  <RichText
                    tagName="h2"
                    className="tl2"
                    placeholder={__("Section title", "overchain-blocks")}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                  />

                  <RichText
                    tagName="div"
                    className="introflow__subtitle txt2 medium"
                    placeholder={__("Subtitle", "overchain-blocks")}
                    value={subtitle}
                    onChange={(value) => setAttributes({ subtitle: value })}
                  />

                  <RichText
                    tagName="div"
                    className="introflow__desc txt4"
                    placeholder={__("Description", "overchain-blocks")}
                    value={desc}
                    onChange={(value) => setAttributes({ desc: value })}
                  />

                  <ButtonPreview
                    text={buttonText}
                    icon={buttonIcon}
                    className="introflow__btn"
                  />
                </div>

                <div className="introflow__img no-select" aria-hidden="true">
                  <img src={imageUrl || defaultImage} alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
