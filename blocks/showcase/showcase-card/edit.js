import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

import ImageControls from "../../../components/ImageControls";
import TagListControls from "../../../components/TagListControls";
import ButtonControls from "../../../components/ButtonControls";
import ButtonPreview from "../../../components/ButtonPreview";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

const placeholderImage =
  window.ovchBlocks?.url + "resources/placeholders/card-visual.png";

export default function Edit({ attributes, setAttributes }) {
  const { imageId, imageUrl, title, text, tags, buttonText, buttonIcon } =
    attributes;

  const blockProps = useBlockProps({
    className: "card-powerful",
  });

  return (
    <>
      <InspectorControls>
        <ImageControls
          type="image"
          imageId={imageId}
          imageUrl={imageUrl}
          imageIdAttribute="imageId"
          imageUrlAttribute="imageUrl"
          setAttributes={setAttributes}
        />

        <TagListControls
          items={tags}
          itemsAttribute="tags"
          setAttributes={setAttributes}
          defaultItem={{ label: "New tag" }}
        />

        <ButtonControls attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>

      <li {...blockProps}>
        <div className="card-powerful__bg no-select" aria-hidden="true">
          <img
            src={`${themeUrl}assets/img/decor/powerful_blur_1.webp`}
            alt=""
          />
        </div>

        <div className="card-powerful__img no-select" aria-hidden="true">
          <img src={imageUrl || placeholderImage} alt="" />
        </div>

        <RichText
          tagName="h3"
          className="card-powerful__tl tl3 regular"
          placeholder={__("Card title", "overchain-blocks")}
          value={title}
          onChange={(value) => setAttributes({ title: value })}
        />

        <RichText
          tagName="div"
          className="card-powerful__desc txt2 col-alt1"
          placeholder={__("Card description", "overchain-blocks")}
          value={text}
          onChange={(value) => setAttributes({ text: value })}
        />

        {tags && tags.length > 0 && (
          <ul className="card-powerful__tags">
            {tags.map((tag, index) => (
              <li key={index}>{tag.label}</li>
            ))}
          </ul>
        )}

        <ButtonPreview
          text={buttonText}
          icon={buttonIcon}
          className="card-powerful__btn"
        />
      </li>
    </>
  );
}
