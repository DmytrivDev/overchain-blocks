const themeUrl =
  window.ovchBlocks?.themeUrl || "/wp-content/themes/overchain/";

export default function ButtonPreview({
  text,
  icon = "calendar",
  className = "",
}) {
  if (!text) {
    return null;
  }

  const iconUrl =
    icon === "arrow"
      ? `${themeUrl}assets/img/icons/btn_2.svg`
      : `${themeUrl}assets/img/icons/btn_1.svg`;

  const buttonClassName = `btn-icon${className ? ` ${className}` : ""}`;

  return (
    <span className={buttonClassName}>
      <span className="txt">{text}</span>
      <span className="icon">
        <img src={iconUrl} alt="" />
      </span>
    </span>
  );
}