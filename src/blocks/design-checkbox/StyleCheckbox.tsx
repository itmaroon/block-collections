import {
	radius_prm,
	space_prm,
	convertToScss,
	borderProperty,
	cssValueToString,
} from "itmar-block-packages/front";
import type { CheckboxAttributes } from "./types";
import { MEDIA_MOBILE } from "../breakpoints";

/**
 * チェックボックスのエディタ・フロントエンド共通のスコープ付きCSSを生成する。
 */
export const createCheckboxStyleCss = (
	attributes: CheckboxAttributes,
	scopeSelector: string,
): string => {
	const {
		font_style_label,
		default_pos,
		mobile_pos,
		bgColor_form,
		labelColor,
		boxBgColor,
		radius_heading,
		border_heading,
		shadow_result,
		is_shadow,
	} = attributes;

	const spanSelector = `${scopeSelector} label span`;
	const inputSelector = `${scopeSelector} input[type="checkbox"]`;
	const keyframeSuffix = scopeSelector.replace(/[^a-zA-Z0-9_-]/g, "");
	const bottomCheck = `itmar-bottom-check-${keyframeSuffix}`;
	const topCheck = `itmar-top-check-${keyframeSuffix}`;
	const shadow =
		is_shadow && shadow_result
			? cssValueToString(convertToScss(shadow_result))
			: "";

	return `
		${scopeSelector} {
			margin:${space_prm(default_pos.margin_value)};
			padding:${space_prm(default_pos.padding_value)};
			background:${bgColor_form};
			border-radius:${radius_prm(radius_heading)};
			${cssValueToString(borderProperty(border_heading))}
			display:flex;
			${shadow}
		}

		${inputSelector} { display:none; }

		${scopeSelector} div {
			font-size:${font_style_label.default_fontSize};
			font-family:${font_style_label.fontFamily};
			font-weight:${font_style_label.fontWeight};
			font-style:${font_style_label.isItalic ? "italic" : "normal"};
			color:${labelColor};
			margin:0;
			line-height:1.2;
		}

		${scopeSelector} label { display:flex; }
		${spanSelector} {
			font-size:${font_style_label.default_fontSize};
			/*
			 * 未チェックの枠。以前はページ背景色（--itmar-background）で、
			 * フォームの背景とページ背景が同じ色のテーマ（kiln-theme 等）では
			 * 枠が見えなかった。文字色を半透明にして、どの背景でも見えるようにする。
			 */
			border:.2em solid color-mix(in srgb, ${labelColor || "currentColor"} 45%, transparent);
			height:1.2em;
			width:1.2em;
			background-color:transparent;
			border-radius:5px;
			position:relative;
			display:inline-block;
			box-sizing:border-box;
			transition:border-color ease .2s;
			margin-right:1em;
			cursor:pointer;
		}
		${spanSelector}::before,
		${spanSelector}::after {
			box-sizing:border-box;
			position:absolute;
			height:0;
			width:.2em;
			background-color:${boxBgColor};
			display:inline-block;
			transform-origin:left top;
			border-radius:5px;
			content:" ";
			transition:opacity ease .5s;
		}
		${spanSelector}::before {
			top:.72em;
			left:.41em;
			transform:rotate(-135deg);
		}
		${spanSelector}::after {
			top:.37em;
			left:.05em;
			transform:rotate(-45deg);
		}
		${inputSelector}:checked + span {
			border-color:${boxBgColor};
		}
		${inputSelector}:checked + span::after {
			height:.5em;
			animation:${bottomCheck} .2s ease 0s forwards;
		}
		${inputSelector}:checked + span::before {
			height:1.2em;
			animation:${topCheck} .4s ease 0s forwards;
		}

		@keyframes ${bottomCheck} {
			0% { height:0; }
			100% { height:.5em; }
		}
		@keyframes ${topCheck} {
			0%, 50% { height:0; }
			100% { height:1.2em; }
		}

		${MEDIA_MOBILE} {
			${scopeSelector} {
				margin:${space_prm(mobile_pos.margin_value)};
				padding:${space_prm(mobile_pos.padding_value)};
			}
			${scopeSelector} div,
			${spanSelector} {
				font-size:${font_style_label.mobile_fontSize};
			}
		}
	`;
};
