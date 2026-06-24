import { __ } from "@wordpress/i18n";
import {
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import {
  PanelBody,
  Button,
} from "@wordpress/components";

export default function VideoControls({
  videoId,
  videoUrl,
  videoType,

  videoIdAttribute = "videoId",
  videoUrlAttribute = "videoUrl",
  videoTypeAttribute = "videoType",

  title = __("Video", "overchain-blocks"),
  selectLabel = __("Select video", "overchain-blocks"),
  replaceLabel = __("Replace video", "overchain-blocks"),
  removeLabel = __("Remove video", "overchain-blocks"),

  allowedTypes = ["video/mp4", "video/webm"],
  defaultVideoType = "video/mp4",

  initialOpen = true,
  setAttributes,
}) {
  return (
    <PanelBody title={title} initialOpen={initialOpen}>
      <MediaUploadCheck>
        <MediaUpload
          onSelect={(media) =>
            setAttributes({
              [videoIdAttribute]: media.id,
              [videoUrlAttribute]: media.url,
              [videoTypeAttribute]: media.mime || defaultVideoType,
            })
          }
          allowedTypes={allowedTypes}
          value={videoId}
          render={({ open }) => (
            <Button
              variant="secondary"
              onClick={open}
              style={{ marginBottom: "8px" }}
            >
              {videoUrl ? replaceLabel : selectLabel}
            </Button>
          )}
        />
      </MediaUploadCheck>

      {videoUrl && (
        <>
          <p
            style={{
              margin: "4px 0 8px",
              fontSize: "12px",
              color: "#757575",
              wordBreak: "break-all",
            }}
          >
            {videoUrl.split("/").pop()}
          </p>

          <Button
            variant="link"
            isDestructive
            onClick={() =>
              setAttributes({
                [videoIdAttribute]: 0,
                [videoUrlAttribute]: "",
                [videoTypeAttribute]: defaultVideoType,
              })
            }
          >
            {removeLabel}
          </Button>
        </>
      )}
    </PanelBody>
  );
}