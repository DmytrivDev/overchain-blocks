import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";

import SectionSettingsControls from "../../components/SectionSettingsControls";
import ImageControls from "../../components/ImageControls";
import VideoControls from "../../components/VideoControls";

const placeholderUrl =
  window.ovchBlocks?.url + "resources/placeholders/video.jpg";

export default function Edit({ attributes, setAttributes }) {
  const { noPaddingTop, videoId, videoUrl, videoType, posterId, posterUrl } =
    attributes;

  const blockProps = useBlockProps({
    style: {
      padding: 0,
      margin: 0,
    },
  });

  const sectionClass = `preview${noPaddingTop ? "" : " pbs2"}`;
  const previewPoster = posterUrl || placeholderUrl;

  return (
    <>
      <InspectorControls>
        <SectionSettingsControls
          attributes={attributes}
          setAttributes={setAttributes}
          noPaddingTopLabel={__("Remove top padding", "overchain-blocks")}
        />

        <VideoControls
          videoId={videoId}
          videoUrl={videoUrl}
          videoType={videoType}
          setAttributes={setAttributes}
        />

        <ImageControls
          type="image"
          title={__("Poster", "overchain-blocks")}
          imageId={posterId}
          imageUrl={posterUrl}
          imageIdAttribute="posterId"
          imageUrlAttribute="posterUrl"
          selectLabel={__("Select poster", "overchain-blocks")}
          replaceLabel={__("Replace poster", "overchain-blocks")}
          removeLabel={__("Remove poster", "overchain-blocks")}
          initialOpen={false}
          setAttributes={setAttributes}
        />
      </InspectorControls>

      <div {...blockProps}>
        <section className={sectionClass}>
          <div className="preview__container">
            <div className="preview__body section-body">
              <h2 className="tl2 visually-hidden">
                {__("Video Preview", "overchain-blocks")}
              </h2>

              <div className="preview__video media-box ibg">
                {videoUrl ? (
                  <video
                    poster={posterUrl || undefined}
                    preload="auto"
                    muted
                    onLoadedMetadata={(e) => {
                      e.target.currentTime = 0.1;
                    }}
                  >
                    <source src={videoUrl} type={videoType || "video/mp4"} />
                  </video>
                ) : (
                  <img src={previewPoster} alt="" />
                )}

                <button
                  type="button"
                  className="video-play"
                  aria-label={__("Video play", "overchain-blocks")}
                  onClick={(event) => event.preventDefault()}
                >
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
