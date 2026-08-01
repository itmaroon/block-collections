import {
	radius_prm,
	space_prm,
	convertToScss,
	borderProperty,
	cssValueToString,
} from "itmar-block-packages";
import type { RadioAttributes, RadioDirection } from "./types";

const resolveFontStyle = (fontStyle: RadioAttributes["font_style_input"]): string =>
	fontStyle?.isItalic ? "italic" : "normal";

const createDirectionCss = (direction?: RadioDirection): string => {
	if (direction === "horizen") {
		return "display: flex; flex-direction: row;";
	}

	if (direction === "vertical") {
		return "display: flex; flex-direction: column;";
	}

	return "";
};

const getStyleClass = (className?: string): string | null =>
	className?.split(" ").find((cls: string) => cls.startsWith("is-style-")) ||
	null;

const createCommonCss = (
	attributes: RadioAttributes,
	scopeSelector: string,
): string => {
	const {
		font_style_input,
		default_pos,
		mobile_pos,
		inputColor,
		radius_box,
		border_box,
		radius_input,
		border_input,
		shadow_result_box,
		is_shadow_box,
		shadow_result_input,
		is_shadow_input,
	} = attributes;

	const fontStyleInput = resolveFontStyle(font_style_input);
	const boxRadius = radius_prm(radius_box);
	const inputRadius = radius_prm(radius_input);
	const boxBorder = cssValueToString(borderProperty(border_box));
	const inputBorder = cssValueToString(borderProperty(border_input));
	const boxShadow =
		is_shadow_box && shadow_result_box
			? cssValueToString(convertToScss(shadow_result_box))
			: "";
	const inputShadow =
		is_shadow_input && shadow_result_input
			? cssValueToString(convertToScss(shadow_result_input))
			: "";

	return `
		${scopeSelector} {
			${createDirectionCss(default_pos.direction)}
			flex-wrap: ${default_pos.wrap ? "wrap" : "nowrap"};
			justify-content: ${default_pos.inner_align};
			margin: ${space_prm(default_pos.margin)};
			padding: ${space_prm(default_pos.padding)};
			${boxBorder}
			border-radius: ${boxRadius};
			${boxShadow}
		}
		${scopeSelector} label {
			display: flex;
			align-items: center;
			margin: ${space_prm(default_pos.margin_input)};
			padding: ${space_prm(default_pos.padding_input)};
			${inputBorder}
			border-radius: ${inputRadius};
			${inputShadow}
		}
		${scopeSelector} label span,
		${scopeSelector} label button {
			font-size: ${font_style_input.default_fontSize};
			font-family: ${font_style_input.fontFamily};
			font-weight: ${font_style_input.fontWeight};
			font-style: ${fontStyleInput};
			color: ${inputColor};
			margin: 0;
			line-height: 1.2;
			position: relative;
			display: inline-block;
			box-sizing: border-box;
			transition: border-color ease 0.2s;
			cursor: pointer;
		}
		${scopeSelector} label button {
			text-align: center;
			margin: 0 auto;
			background-color: transparent;
			border: none;
		}

		@media (max-width: 767px) {
			${scopeSelector} {
				${createDirectionCss(mobile_pos.direction)}
				flex-wrap: ${mobile_pos.wrap ? "wrap" : "nowrap"};
				justify-content: ${mobile_pos.inner_align};
				margin: ${space_prm(mobile_pos.margin)};
				padding: ${space_prm(mobile_pos.padding)};
			}
			${scopeSelector} label {
				margin: ${space_prm(mobile_pos.margin_input)};
				padding: ${space_prm(mobile_pos.padding_input)};
			}
			${scopeSelector} label span,
			${scopeSelector} label button {
				font-size: ${font_style_input.mobile_fontSize};
			}
		}
	`;
};

const createButtonCss = (
	attributes: RadioAttributes,
	scopeSelector: string,
): string => {
	const {
		color_select,
		bgColor_select,
		bgGradient_select,
		shadow_result_select,
		is_shadow_select,
	} = attributes;

	const selectBackground = bgColor_select || bgGradient_select || "transparent";
	const selectShadow =
		is_shadow_select && shadow_result_select
			? cssValueToString(convertToScss(shadow_result_select))
			: "";

	return `
		${scopeSelector} label {
			transition:
				transform 300ms ease,
				box-shadow ease-in-out 0.5s;
		}
		${scopeSelector} label.checked {
			background: ${selectBackground};
			${selectShadow}
		}
		${scopeSelector} label.checked span {
			color: ${color_select};
		}
		${scopeSelector} label:hover {
			transform: scale(1.1, 1.1);
			${selectShadow}
		}
		${scopeSelector} input[type="radio"] {
			display: none;
		}
	`;
};

const createDefaultCss = (
	attributes: RadioAttributes,
	scopeSelector: string,
): string => {
	const {
		default_pos,
		mobile_pos,
		buttonColor,
		buttonBgColor,
	} = attributes;

	const defaultPrevPosition =
		default_pos.direction === "horizen"
			? "background-position: 24px 0;"
			: "background-position: 0 24px;";
	const defaultNextPosition =
		default_pos.direction === "horizen"
			? "background-position: -24px 0;"
			: "background-position: 0 -24px;";
	const mobilePrevPosition =
		mobile_pos.direction === "horizen"
			? "background-position: 24px 0;"
			: "background-position: 0 24px;";
	const mobileNextPosition =
		mobile_pos.direction === "horizen"
			? "background-position: -24px 0;"
			: "background-position: 0 -24px;";
	const defaultSpanPadding =
		default_pos.direction === "horizen" ? "padding-right: 1em;" : "padding-left: 1em;";
	const mobileSpanPadding =
		mobile_pos.direction === "horizen" ? "padding-right: 1em;" : "padding-left: 1em;";

	return `
		${scopeSelector} label {
			display: flex;
		}
		${scopeSelector} label input {
			-webkit-appearance: none;
			position: relative;
			display: block;
			margin: 10px;
			width: ${default_pos.button_scale};
			height: ${default_pos.button_scale};
			border-radius: 50%;
			cursor: pointer;
			vertical-align: middle;
			box-shadow:
				hsla(0, 0%, 100%, 0.15) 0 1px 1px,
				inset hsla(0, 0%, 0%, 0.5) 0 0 0 1px;
			background-color: ${buttonBgColor};
			background-image: -webkit-radial-gradient(
				hsla(200, 100%, 90%, 1) 0%,
				${buttonColor} 30%,
				hsla(200, 100%, 60%, 0.3) 38%,
				hsla(200, 100%, 30%, 0) 70%
			);
			background-repeat: no-repeat;
			-webkit-transition:
				background-position 0.15s cubic-bezier(0.8, 0, 1, 1),
				-webkit-transform 0.25s cubic-bezier(0.8, 0, 1, 1);
			outline: none;
			background-size: 0;
		}
		${scopeSelector} label input:checked {
			-webkit-transition:
				background-position 0.2s 0.15s cubic-bezier(0, 0, 0.2, 1),
				-webkit-transform 0.25s cubic-bezier(0, 0, 0.2, 1);
		}
		${scopeSelector} label input:active {
			-webkit-transform: scale(1.5);
			-webkit-transition: -webkit-transform 0.1s cubic-bezier(0, 0, 0.2, 1);
		}
		${scopeSelector} label.ready input {
			background-size: 100%;
		}
		${scopeSelector} label.check_prev input {
			${defaultPrevPosition}
		}
		${scopeSelector} label.checked input:checked {
			background-position: 0 0;
		}
		${scopeSelector} label.checked input:checked::before {
			opacity: 0;
		}
		${scopeSelector} label.check_next input {
			${defaultNextPosition}
		}
		${scopeSelector} label span {
			display: block;
			${defaultSpanPadding}
			line-height: 2.5em;
		}
		${scopeSelector} label button {
			line-height: 2.5em;
		}

		@media (max-width: 767px) {
			${scopeSelector} label input {
				width: ${mobile_pos.button_scale};
				height: ${mobile_pos.button_scale};
			}
			${scopeSelector} label.check_prev input {
				${mobilePrevPosition}
			}
			${scopeSelector} label.check_next input {
				${mobileNextPosition}
			}
			${scopeSelector} label span {
				${mobileSpanPadding}
			}
		}
	`;
};

/**
 * エディタ・フロントエンド共通のスコープ付きCSSを生成する。
 */
export const createRadioStyleCss = (
	attributes: RadioAttributes,
	scopeSelector: string,
): string => {
	const styleClass = getStyleClass(attributes.className);
	const optionCss =
		styleClass === "is-style-button"
			? createButtonCss(attributes, scopeSelector)
			: createDefaultCss(attributes, scopeSelector);

	return `
		${createCommonCss(attributes, scopeSelector)}
		${optionCss}
	`;
};
