import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

import TextSettingsControls from "../../../components/TextSettingsControls";
import ImageControls from "../../../components/ImageControls";
import ButtonControls from "../../../components/ButtonControls";
import ButtonPreview from "../../../components/ButtonPreview";

const placeholderImage =
  window.ovchBlocks?.url + "resources/placeholders/tabs.png";

export default function Edit({ attributes, setAttributes }) {
  const { tabLabel, heading, buttonText, buttonIcon, imageId, imageUrl } =
    attributes;

  const blockProps = useBlockProps({
    className: "tabs__inner overchain-tab",
  });

  return (
    <>
      <InspectorControls>
        <TextSettingsControls
          title={__("Tab settings", "overchain-blocks")}
          controls={[
            {
              attribute: "tabLabel",
              label: __("Tab label", "overchain-blocks"),
              value: tabLabel,
              onChange: (value) => setAttributes({ tabLabel: value }),
            },
          ]}
        />

        <ImageControls
          type="image"
          imageId={imageId}
          imageUrl={imageUrl}
          imageIdAttribute="imageId"
          imageUrlAttribute="imageUrl"
          initialOpen={false}
          setAttributes={setAttributes}
        />

        <ButtonControls
          attributes={attributes}
          setAttributes={setAttributes}
          initialOpen={false}
        />
      </InspectorControls>

      <div {...blockProps}>
        <div className="settlement__content">
          <div className="settlement__top">
            <RichText
              tagName="h3"
              className="tl3 regular"
              placeholder={__("Tab heading", "overchain-blocks")}
              value={heading}
              onChange={(value) => setAttributes({ heading: value })}
            />
          </div>

          {buttonText && (
            <div className="settlement__bottom">
              <ButtonPreview text={buttonText} icon={buttonIcon} />
            </div>
          )}
        </div>

        <div className="settlement__img">
          <img
            src={imageUrl || placeholderImage}
            alt=""
            style={imageUrl ? {} : { opacity: 0.5 }}
          />
        </div>
      </div>
    </>
  );
}
