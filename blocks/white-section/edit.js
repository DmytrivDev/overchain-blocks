import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

const themeUrl = window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

export default function Edit({ attributes, setAttributes }) {
  const { showDecor } = attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  return (
    <>
      <InspectorControls>
        <PanelBody
          title={__("Settings", "overchain-blocks")}
          initialOpen={true}
        >
          <ToggleControl
            label={__("Show decor", "overchain-blocks")}
            checked={showDecor}
            onChange={(value) => setAttributes({ showDecor: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="frame-colored pbs2">
          <div className="frame-colored__container">
            <div className="frame-colored__body pbe4">
              <InnerBlocks />
            </div>
            {showDecor && (
              <div
                className="frame-colored__blur blur1 no-select"
                aria-hidden="true"
              >
                <img
                  src={`${themeUrl}assets/img/decor/frame_blur_1.webp`}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
