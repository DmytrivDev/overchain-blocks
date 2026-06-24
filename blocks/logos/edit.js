import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, Button, TextControl } from "@wordpress/components";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import ImageField from "../../components/ImageField";

const placeholderLogo =
  window.ovchBlocks?.url + "resources/placeholders/logo.png";

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, logos = [] } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `platform ${noPaddingTop ? "pbs4" : "pbs2"}`;

  const updateLogo = (index, fields) => {
    setAttributes({
      logos: logos.map((logo, i) =>
        i === index ? { ...logo, ...fields } : logo,
      ),
    });
  };

  const addLogo = () => {
    setAttributes({
      logos: [
        ...logos,
        {
          imageUrl: "",
          imageId: 0,
          link: "",
        },
      ],
    });
  };

  const removeLogo = (index) => {
    setAttributes({
      logos: logos.filter((_, i) => i !== index),
    });
  };

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
        />

        {logos.map((logo, index) => (
          <PanelBody
            key={index}
            title={`${__("Logo", "overchain-blocks")} ${index + 1}`}
            initialOpen={false}
          >
            <ImageField
              label={false}
              imageId={logo.imageId}
              imageUrl={logo.imageUrl}
              selectLabel={__("Select logo", "overchain-blocks")}
              replaceLabel={__("Replace logo", "overchain-blocks")}
              removeLabel={__("Remove logo", "overchain-blocks")}
              onSelect={(media) =>
                updateLogo(index, {
                  imageId: media.id,
                  imageUrl: media.url,
                })
              }
              onRemove={() =>
                updateLogo(index, {
                  imageId: 0,
                  imageUrl: "",
                })
              }
            />

            <TextControl
              label={__("Link optional", "overchain-blocks")}
              value={logo.link}
              placeholder="https://"
              onChange={(value) => updateLogo(index, { link: value })}
            />

            {logos.length > 1 && (
              <Button
                variant="link"
                isDestructive
                onClick={() => removeLogo(index)}
              >
                {__("Remove item", "overchain-blocks")}
              </Button>
            )}
          </PanelBody>
        ))}

        <div style={{ padding: "16px" }}>
          <Button variant="primary" onClick={addLogo}>
            {__("+ Add logo", "overchain-blocks")}
          </Button>
        </div>
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="platform__container">
            <div className="platform__body section-body">
              <h2 className="visually-hidden">
                {__("Platforms", "overchain-blocks")}
              </h2>

              <ul className="platform__list">
                {logos.map((logo, index) => (
                  <li key={index} className="item-platform">
                    {logo.link ? (
                      <a
                        href={logo.link}
                        className="item-platform__logo"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => event.preventDefault()}
                      >
                        <img
                          src={logo.imageUrl || placeholderLogo}
                          alt=""
                          style={!logo.imageUrl ? { filter: "unset" } : {}}
                        />
                      </a>
                    ) : (
                      <div className="item-platform__logo">
                        <img
                          src={logo.imageUrl || placeholderLogo}
                          alt=""
                          style={!logo.imageUrl ? { filter: "unset" } : {}}
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
