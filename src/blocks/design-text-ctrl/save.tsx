import { __ } from "@wordpress/i18n";
import hideIcon from "./hide.svg";
import { useBlockProps } from "@wordpress/block-editor";
import type { TextCtrlSaveProps } from "./types";

export default function save({ attributes }: TextCtrlSaveProps) {
	const {
		inputName,
		addressInput,
		bgColor,
		focusColor,
		font_style_input,
		bgColor_input,
		bgGradient_input,
		textColor_input,
		radius_input,
		border_input,
		default_pos,
		mobile_pos,
		placeFolder,
		inputType,
		required,
		labelContent,
		labelWidth,
		font_style_label,
		bgColor_label,
		bgGradient_label,
		textColor_label,
		radius_label,
		border_label,
		padding_label,
		labelSpace,
		shadow_result,
		is_shadow,
		numberOption,
		className,
	} = attributes;
	const styleAttributes = {
		focusColor,
		bgColor,
		font_style_input,
		bgColor_input,
		bgGradient_input,
		textColor_input,
		radius_input,
		border_input,
		default_pos,
		mobile_pos,
		labelWidth,
		font_style_label,
		bgColor_label,
		bgGradient_label,
		textColor_label,
		radius_label,
		border_label,
		padding_label,
		labelSpace,
		shadow_result,
		is_shadow,
		className,
	};
	const blockProps = useBlockProps.save({
		"data-attributes": JSON.stringify(styleAttributes),
		"data-required": required.flg,
		style: { backgroundColor: bgColor, overflow: "hidden" },
	});

	const dispLabel = required.flg
		? `${labelContent}(${required.display})`
		: labelContent;

	return (
		<div {...blockProps}>
			<div className="itmar-wrap">
				{inputType === "text" && (
					<input
						type="text"
						id={inputName}
						name={inputName}
						className="contact_text empty"
						placeholder={
							className?.includes("is-style-line") ? dispLabel : placeFolder
						}
					/>
				)}
				{inputType === "email" && (
					<input
						type="email"
						id={inputName}
						name={inputName}
						className="contact_text empty"
						placeholder={
							className?.includes("is-style-line") ? dispLabel : placeFolder
						}
					/>
				)}
				{inputType === "pass" && (
					<div className="password-wrapper">
						<input
							type="password"
							id={inputName}
							name={inputName}
							placeholder={
								className?.includes("is-style-line") ? dispLabel : placeFolder
							}
							className="contact_text empty"
						/>
						<button type="button" className="toggle-password-button">
							<img src={hideIcon} alt="" aria-hidden="true" />
						</button>
					</div>
				)}
				{inputType === "number" && (
					<div className="number-input-wrapper">
						<button
							type="button"
							className="number-stepper-minus"
							aria-label="Decrease value"
						>
							-
						</button>
						<input
							type="number"
							id={inputName}
							name={inputName}
							min={numberOption.min}
							max={numberOption.max}
							step={numberOption.step}
							className="contact_text empty"
							placeholder={className?.includes("is-style-line") ? dispLabel : ""}
						/>
						<button
							type="button"
							className="number-stepper-plus"
							aria-label="Increase value"
						>
							+
						</button>
					</div>
				)}
				{inputType === "zip" && (
					<div className="zip-search-wrapper">
						<input
							type="text"
							id={inputName}
							name={inputName}
							placeholder={`${__("example", "block-collections")}) 1234567`}
							className="contact_text empty"
							data-address-target={addressInput}
						/>
						<button type="button" className="zip-search-button">
							{__("Address Search", "block-collections")}
						</button>
					</div>
				)}
				{inputType === "textarea" && (
					<textarea
						id={inputName}
						name={inputName}
						className="contact_text empty"
						placeholder={
							className?.includes("is-style-line") ? dispLabel : placeFolder
						}
					/>
				)}
				<label htmlFor={inputName}>
					{required.flg ? (
						<>
							{labelContent}
							<span>({required.display})</span>
						</>
					) : (
						labelContent
					)}
				</label>
			</div>
		</div>
	);
}
