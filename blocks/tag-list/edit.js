import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import TagListControls from "../../components/TagListControls";

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, title, text, tags } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `modern ${noPaddingTop ? "pbs4" : "pbs2"}`;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        <TagListControls
          items={tags}
          itemsAttribute="tags"
          setAttributes={setAttributes}
          placeholder={__("Tag label", "overchain-blocks")}
          defaultItem={{ label: "New tag" }}
          initialOpen={true}
        />
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="modern__container">
            <div className="modern__wrap section-wrap">
              <div className="modern__body section-body">
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
                    className="txt2"
                    placeholder={__("Section text", "overchain-blocks")}
                    value={text}
                    onChange={(value) => setAttributes({ text: value })}
                  />
                </div>

                {/* The tags are a repeater, so the canvas only previews them —
                    they are edited in the sidebar via TagListControls. */}
                {tags.length > 0 && (
                  <ul className="modern__list">
                    {tags.map((tag, index) =>
                      tag?.label ? (
                        <li className="modern__tag" key={index}>
                          {tag.label}
                        </li>
                      ) : null,
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
