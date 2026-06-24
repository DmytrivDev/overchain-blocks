import { RichText } from "@wordpress/block-editor";

export default function FormCheckboxPreview({
  value,
  onChange,
  placeholder,
  required = false,
  rowClassName = "hsfc-Row",
}) {
  return (
    <div className={rowClassName}>
      <div className="hsfc-CheckboxField">
        <label className="hsfc-FieldLabel">
          <input
            type="checkbox"
            className="hsfc-CheckboxInput"
            disabled
          />

          <span>
            <RichText
              tagName="span"
              value={value}
              onChange={onChange}
              allowedFormats={[
                "core/bold",
                "core/italic",
                "core/link",
              ]}
              placeholder={placeholder}
            />

            {required && (
              <span className="hsfc-FieldLabel__RequiredIndicator">*</span>
            )}
          </span>
        </label>
      </div>
    </div>
  );
}