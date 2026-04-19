import { __ } from "@wordpress/i18n";
import hideIcon from "./hide.svg";
import { useBlockProps } from "@wordpress/block-editor";
import { ServerStyleSheet } from "styled-components";
import { renderToString } from "react-dom/server";
import { StyleComp } from "./StyleInput";
import StyleLabel from "../StyleLabel";

export default function save({ attributes }) {
	const {
		inputName,
		addressInput,
		bgColor,
		placeFolder,
		inputType,
		required,
		labelContent,
		numberOption,
		className,
	} = attributes;
	const blockProps = useBlockProps.save({
		style: { backgroundColor: bgColor, overflow: "hidden" },
	});

	const dispLabel = required.flg
		? `${labelContent}(${required.display})`
		: labelContent;

	const sheet = new ServerStyleSheet();

	const html = renderToString(
		sheet.collectStyles(
			<div {...blockProps} data-required={required.flg}>
				<StyleComp attributes={attributes}>
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
								placeholder={
									className && className.includes("is-style-line")
										? dispLabel
										: ""
								}
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
								data-address-target={addressInput} // 👈ここでターゲットのinputNameを指定
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
					<StyleLabel attributes={{ ...attributes, htmlFor: inputName }}>
						{required.flg ? (
							<>
								{labelContent}
								<span>({required.display})</span>
							</>
						) : (
							labelContent
						)}
					</StyleLabel>
				</StyleComp>
			</div>,
		),
	);
	const styleTags = sheet.getStyleTags();
	return (
		<>
			<div dangerouslySetInnerHTML={{ __html: html }} />
			<div dangerouslySetInnerHTML={{ __html: styleTags }} />
		</>
	);
}
