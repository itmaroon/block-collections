import styled, { css } from "styled-components";
import {
	radius_prm,
	space_prm,
	convertToScss,
	borderProperty,
	cssValueToString,
} from "itmar-block-packages";
import { createLabelStyleCss } from "../StyleLabel";

//配置場所
const alignMap = {
	"top left":
		"display: flex;flex-direction: column-reverse;align-items: flex-start;",
	"top center":
		"display: flex;flex-direction: column-reverse;align-items: center;",
	"top right":
		"display: flex;flex-direction: column-reverse;align-items: flex-end;",
	"center left":
		"display: flex;flex-direction: row-reverse;justify-content: flex-end;align-items: center;",
	"center center": "label{display: none;}",
	"center right": "display: flex;align-items: center;",
	"bottom left":
		"display: flex;flex-direction: column;align-items: flex-start;",
	"bottom center": "display: flex;flex-direction: column;align-items: center;",
	"bottom right": "display: flex;flex-direction: column;align-items: flex-end;",
};

export const StyleComp = ({ attributes, children }) => {
	return <StyledDiv $attr={attributes}>{children}</StyledDiv>;
};

const StyledDiv = styled.div`
	${({ $attr }) => {
		const {
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
			shadow_result,
			is_shadow,
			className,
		} = $attr;

		//単色かグラデーションかの選択
		const bgInputColor = bgColor_input || bgGradient_input;

		//斜体の設定
		const fontStyle_input = font_style_input.isItalic ? "italic" : "normal";

		//角丸の設定
		const input_radius_prm = radius_prm(radius_input);

		//スペースの設定
		const default_form_margin_prm = space_prm(default_pos.margin_input);
		const default_form_padding_prm = space_prm(default_pos.padding_input);
		const mobile_form_margin_prm = space_prm(mobile_pos.margin_input);
		const mobile_form_padding_prm = space_prm(mobile_pos.padding_input);

		//幅の設定
		const default_width = default_pos.free_width
			? default_pos.free_width
			: "100%";
		const mobile_width = mobile_pos.free_width ? mobile_pos.free_width : "100%";

		//ボックスシャドーの設定
		const box_shadow_style =
			is_shadow && shadow_result ? convertToScss(shadow_result) : "";

		// 共通のスタイルをここで定義します
		const commonStyle = css`
			padding: ${default_form_padding_prm};
			margin: ${default_form_margin_prm};
			background: ${bgColor};
			position: relative;
			@media (max-width: 767px) {
				margin: ${mobile_form_margin_prm};
				padding: ${mobile_form_padding_prm};
			}

			input,
			textarea {
				flex-grow: 1;
				background: ${bgInputColor};
				border-radius: ${input_radius_prm};
				color: ${textColor_input};
				font-size: ${font_style_input.default_fontSize};
				font-family: ${font_style_input.fontFamily};
				font-weight: ${font_style_input.fontWeight};
				font-style: ${fontStyle_input};
				@media (max-width: 767px) {
					font-size: ${font_style_input.mobile_fontSize};
				}
				&::placeholder {
					color: var(--wp--preset--color--placeholder);
				}
			}
			input {
				width: ${default_width};
				line-height: ${default_pos.inputLineHeight};
				@media (max-width: 767px) {
					width: ${mobile_width};
					line-height: ${mobile_pos.inputLineHeight};
				}
			}
			textarea {
				min-height: 60px;
				box-sizing: border-box;
				padding: 6px 10px;
			}
		`;

		// classNameに基づいて特定のスタイルを定義します
		let specificStyle = null;
		//スタイルのクラスを抽出
		const styleClass = className
			?.split(" ") // スペースで文字列を分割
			.find((cls) => cls.startsWith("is-style"));
		switch (styleClass) {
			case "is-style-line":
				specificStyle = css`
					display: flex;
					height: auto;
					${box_shadow_style};
					input,
					textarea {
						background-color: transparent;
						outline: none;
						padding: 0 8px;
						border-style: solid;
						border-color: ${bgColor_input};
						border-width: 0px 0px 2px 0px;
						box-shadow: none;
						transition: border-color 0.45s ease 0s;
						transform: translateY(1em);

						&:focus {
							box-shadow: none;
							border-color: ${focusColor};
							~ label {
								opacity: 1;
								z-index: 1;
								top: -0.3em;
								font-size: 0.8em;
							}
							~ label {
								color: ${focusColor};
							}
						}
						&:not(.empty) ~ label {
							opacity: 1;
							z-index: 1;
							top: -0.3em;
							font-size: 0.8em;
						}
					}
					textarea {
						padding: 8px 10px;
					}
				`;
				break;
			default:
				specificStyle = css`
					${alignMap[default_pos.labelPos]}
					@media (max-width: 767px) {
						${alignMap[mobile_pos.labelPos]}
					}
					input,
					textarea {
						${borderProperty(border_input)};
						${box_shadow_style};
						transition: box-shadow 0.45s ease 0s;
						&:focus {
							outline: none;
							box-shadow: 0 0 5px ${focusColor};
						}
					}
				`;
		}

		// 共通のスタイルを組み合わせて返します
		return css`
			${commonStyle}
			${specificStyle}
		`;
	}}
`;

const resolveFontStyle = (fontStyle) =>
	fontStyle?.isItalic ? "italic" : "normal";

const createAlignCss = (labelPos) => alignMap[labelPos] || "";

/**
 * フロントエンド用のスコープ付きCSSを生成する。
 * React、renderToString、styled-componentsのクラス名には依存しない。
 */
export const createInputStyleCss = (attributes, scopeSelector) => {
	const {
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
		shadow_result,
		is_shadow,
		className,
	} = attributes;

	const bgInputColor = bgColor_input || bgGradient_input || "#fff";
	const fontStyleInput = resolveFontStyle(font_style_input);
	const inputRadius = radius_prm(radius_input);
	const defaultFormMargin = space_prm(default_pos?.margin_input);
	const defaultFormPadding = space_prm(default_pos?.padding_input);
	const mobileFormMargin = space_prm(mobile_pos?.margin_input);
	const mobileFormPadding = space_prm(mobile_pos?.padding_input);
	const defaultWidth =
		default_pos?.free_width || default_pos?.freeWidth || "100%";
	const mobileWidth = mobile_pos?.free_width || mobile_pos?.freeWidth || "100%";
	const boxShadowStyle =
		is_shadow && shadow_result
			? cssValueToString(convertToScss(shadow_result))
			: "";
	const inputBorder = cssValueToString(borderProperty(border_input));
	const isLineStyle = className?.split(" ").includes("is-style-line");

	const commonCss = `
		${scopeSelector} {
			padding: ${defaultFormPadding};
			margin: ${defaultFormMargin};
			background: ${bgColor || "transparent"};
			position: relative;
		}
		${scopeSelector} input,
		${scopeSelector} textarea {
			flex-grow: 1;
			background: ${bgInputColor};
			border-radius: ${inputRadius};
			color: ${textColor_input || "inherit"};
			font-size: ${font_style_input?.default_fontSize || "inherit"};
			font-family: ${font_style_input?.fontFamily || "inherit"};
			font-weight: ${font_style_input?.fontWeight || "inherit"};
			font-style: ${fontStyleInput};
		}
		${scopeSelector} input::placeholder,
		${scopeSelector} textarea::placeholder {
			color: var(--wp--preset--color--placeholder);
		}
		${scopeSelector} input {
			width: ${defaultWidth};
			line-height: ${default_pos?.inputLineHeight || "normal"};
		}
		${scopeSelector} textarea {
			min-height: 60px;
			box-sizing: border-box;
			padding: 6px 10px;
		}
		${scopeSelector} .password-wrapper,
		${scopeSelector} .number-input-wrapper,
		${scopeSelector} .zip-search-wrapper {
			display: flex;
			align-items: center;
			width: ${defaultWidth};
		}
		${scopeSelector} .password-wrapper input,
		${scopeSelector} .number-input-wrapper input,
		${scopeSelector} .zip-search-wrapper input {
			width: 100%;
		}

		@media (max-width: 767px) {
			${scopeSelector} {
				margin: ${mobileFormMargin};
				padding: ${mobileFormPadding};
			}
			${scopeSelector} input,
			${scopeSelector} textarea {
				font-size: ${
					font_style_input?.mobile_fontSize ||
					font_style_input?.default_fontSize ||
					"inherit"
				};
			}
			${scopeSelector} input {
				width: ${mobileWidth};
				line-height: ${
					mobile_pos?.inputLineHeight ||
					default_pos?.inputLineHeight ||
					"normal"
				};
			}
			${scopeSelector} .password-wrapper,
			${scopeSelector} .number-input-wrapper,
			${scopeSelector} .zip-search-wrapper {
				width: ${mobileWidth};
			}
		}
	`;

	const specificCss = isLineStyle
		? `
			${scopeSelector} {
				display: flex;
				height: auto;
				${boxShadowStyle}
			}
			${scopeSelector} input,
			${scopeSelector} textarea {
				background-color: transparent;
				outline: none;
				padding: 0 8px;
				border-style: solid;
				border-color: ${bgColor_input || "currentColor"};
				border-width: 0px 0px 2px 0px;
				box-shadow: none;
				transition: border-color 0.45s ease 0s;
				transform: translateY(1em);
			}
			${scopeSelector} input:focus,
			${scopeSelector} textarea:focus {
				box-shadow: none;
				border-color: ${focusColor || "currentColor"};
			}
			${scopeSelector} input:focus ~ label,
			${scopeSelector} textarea:focus ~ label,
			${scopeSelector} input:not(.empty) ~ label,
			${scopeSelector} textarea:not(.empty) ~ label {
				opacity: 1;
				z-index: 1;
				top: -0.3em;
				font-size: 0.8em;
			}
			${scopeSelector} input:focus ~ label,
			${scopeSelector} textarea:focus ~ label {
				color: ${focusColor || "currentColor"};
			}
			${scopeSelector} textarea {
				padding: 8px 10px;
			}
		`
		: `
			${scopeSelector} {
				${createAlignCss(default_pos?.labelPos)}
			}
			@media (max-width: 767px) {
				${scopeSelector} {
					${createAlignCss(mobile_pos?.labelPos)}
				}
			}
			${scopeSelector} input,
			${scopeSelector} textarea {
				${inputBorder}
				${boxShadowStyle}
				transition: box-shadow 0.45s ease 0s;
			}
			${scopeSelector} input:focus,
			${scopeSelector} textarea:focus {
				outline: none;
				box-shadow: 0 0 5px ${focusColor || "currentColor"};
			}
		`;

	return `
		${commonCss}
		${specificCss}
		${createLabelStyleCss(attributes, scopeSelector)}
	`;
};
