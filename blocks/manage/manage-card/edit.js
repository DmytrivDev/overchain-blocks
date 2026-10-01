import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

import ImageControls from "../../../components/ImageControls";
import ButtonControls from "../../../components/ButtonControls";
import ButtonPreview from "../../../components/ButtonPreview";

const placeholderIcon =
  window.ovchBlocks?.url + "resources/placeholders/icon.svg";

export default function Edit({ attributes, setAttributes }) {
  const { iconId, iconUrl, title, text, buttonText, buttonIcon } = attributes;

  const blockProps = useBlockProps({
    className: "card-manage",
  });

  return (
    <>
      <InspectorControls>
        <ImageControls
          type="icon"
          imageId={iconId}
          imageUrl={iconUrl}
          imageIdAttribute="iconId"
          imageUrlAttribute="iconUrl"
          setAttributes={setAttributes}
        />

        <ButtonControls attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <li {...blockProps}>
        <div className="card-manage__head">
          <div className="card-manage__icon">
            <img
              src={iconUrl || placeholderIcon}
              alt=""
              style={!iconUrl ? { opacity: 0.3 } : {}}
            />
          </div>

          <RichText
            tagName="h3"
            className="tl5"
            placeholder={__("Card title", "overchain-blocks")}
            value={title}
            onChange={(value) => setAttributes({ title: value })}
          />
        </div>

        <RichText
          tagName="div"
          className="card-manage__desc txt3 light"
          placeholder={__("Card description", "overchain-blocks")}
          value={text}
          onChange={(value) => setAttributes({ text: value })}
        />

        <ButtonPreview
          text={buttonText}
          icon={buttonIcon}
          className="card-manage__btn"
        />
      </li>
    </>
  );
}
