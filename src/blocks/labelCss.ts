/**
 * ラベルのCSS生成。
 *
 * 【重要】このモジュールは @wordpress/* と react に値として依存しない。
 * view.ts と Style*.tsx から読まれるため、依存を足すとエディタ一式が
 * フロントエンドへ配信される。itmar-block-packages も必ず `/front` から読むこと。
 * Reactコンポーネント版は StyleLabel.tsx にある。
 */
import {
	radius_prm,
	space_prm,
	convertToScss,
	borderProperty,
	cssValueToString,
} from "itmar-block-packages/front";
import type { LabelStyleAttributes } from "../shared/types";
import { MEDIA_MOBILE } from "./breakpoints";

const labelMarginPropertyMap: Record<string, string> = {
	"top left": "margin-bottom",
	"top center": "margin-bottom",
	"top right": "margin-bottom",
	"center left": "margin-right",
	"center right": "margin-left",
	"bottom left": "margin-top",
	"bottom center": "margin-top",
	"bottom right": "margin-top",
};

const createLabelMarginCss = (
	labelPos: unknown,
	labelSpace: unknown,
): string => {
	if (typeof labelPos !== "string") return "";
	const property = labelMarginPropertyMap[labelPos];
	const space = typeof labelSpace === "string" ? labelSpace : "0";
	return property ? `${property}: ${space};` : "";
};

const getStyleClass = (className: unknown): string | undefined =>
	typeof className === "string"
		? className.split(" ").find((cls) => cls.startsWith("is-style"))
		: undefined;

/**
 * エディタ・フロントエンド共通のラベルCSSを生成する。
 */
export const createLabelStyleCss = (
	attributes: LabelStyleAttributes,
	scopeSelector: string,
	target: "descendant" | "self" = "descendant",
): string => {
	const {
		font_style_label,
		bgColor_label,
		bgGradient_label,
		textColor_label,
		radius_label,
		border_label,
		padding_label,
		labelSpace,
		labelWidth,
		default_pos,
		mobile_pos,
		shadow_result,
		is_shadow,
		className,
	} = attributes;

	const bgLabelColor = bgColor_label || bgGradient_label || "transparent";
	const fontStyleLabel = font_style_label?.isItalic ? "italic" : "normal";
	const labelRadius = radius_prm(radius_label);
	const labelPadding = space_prm(padding_label);
	const labelBorder = cssValueToString(borderProperty(border_label));
	const boxShadowStyle =
		is_shadow && shadow_result
			? cssValueToString(convertToScss(shadow_result))
			: "";
	const styleClass = getStyleClass(className);
	const labelSelector =
		target === "self" ? scopeSelector : `${scopeSelector} label`;

	const specificStyle =
		styleClass === "is-style-line"
			? `
				position: absolute;
				width: fit-content;
				opacity: 0;
				left: calc(2em + 10px);
				pointer-events: none;
				bottom: 15px;
				z-index: 1;
				transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s;
			`
			: `
				width: ${labelWidth || "auto"};
				/*
				 * 入力フォーム（input-figure-block）が全項目のラベル幅をそろえるので、
				 * 行の幅が足りなくてもラベルは縮ませない。縮むと入力欄の左端がずれる。
				 * 幅は内容の幅（padding は外側に足す）として扱う。design-select と揃える。
				 */
				flex-shrink: 0;
				box-sizing: content-box;
				${createLabelMarginCss(default_pos?.labelPos, labelSpace)}
			`;

	const mobileSpecificStyle =
		styleClass === "is-style-line"
			? ""
			: createLabelMarginCss(mobile_pos?.labelPos, labelSpace);

	return `
		${labelSelector} {
			white-space: nowrap;
			background: ${bgLabelColor};
			border-radius: ${labelRadius};
			color: ${textColor_label || "inherit"};
			font-size: ${font_style_label?.default_fontSize || "inherit"};
			font-family: ${font_style_label?.fontFamily || "inherit"};
			font-weight: ${font_style_label?.fontWeight || "inherit"};
			font-style: ${fontStyleLabel};
			padding: ${labelPadding};
			${labelBorder}
			${boxShadowStyle}
			${specificStyle}
		}
		${labelSelector} span {
			color: var(--itmar-accent-1);
		}

		${MEDIA_MOBILE} {
			${labelSelector} {
				font-size: ${
					font_style_label?.mobile_fontSize ||
					font_style_label?.default_fontSize ||
					"inherit"
				};
				${mobileSpecificStyle}
			}
		}
	`;
};
