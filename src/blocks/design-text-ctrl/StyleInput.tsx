import {
	radius_prm,
	space_prm,
	convertToScss,
	borderProperty,
	cssValueToString,
} from "itmar-block-packages";
import { createLabelStyleCss } from "../StyleLabel";
import type { TextCtrlAttributes } from "./types";

//配置場所
const alignMap: Record<string, string> = {
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

const resolveFontStyle = (fontStyle?: TextCtrlAttributes["font_style_input"]) =>
	fontStyle?.isItalic ? "italic" : "normal";

const createAlignCss = (labelPos?: string) => (labelPos ? alignMap[labelPos] : "") || "";

/**
 * エディタ・フロントエンド共通のスコープ付きCSSを生成する。
 */
export const createInputStyleCss = (
	attributes: TextCtrlAttributes,
	scopeSelector: string,
): string => {
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
	const inputBorder = cssValueToString(borderProperty(border_input ?? {}));
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
