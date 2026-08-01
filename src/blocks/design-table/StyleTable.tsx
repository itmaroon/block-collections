import {
	radius_prm,
	space_prm,
	convertToScss,
	borderProperty,
	hslToRgb16,
	rgb16ToHsl,
	cssValueToString,
} from "itmar-block-packages";
import type { DesignTableAttributes } from "./types";

interface HSL {
	hue: number;
	saturation: number;
	lightness: number;
}

const isHsl = (value: unknown): value is HSL =>
	typeof value === "object" &&
	value !== null &&
	"hue" in value &&
	"saturation" in value &&
	"lightness" in value;

const toRgbString = (
	hue: number,
	saturation: number,
	lightness: number,
): string => {
	const rgb = hslToRgb16(hue, saturation, lightness);
	return typeof rgb === "string" ? rgb : "";
};

const createStripeColor = (
	baseColor: string | undefined,
	intensity: number,
	dark: boolean,
): string => {
	if (!baseColor) return "";

	try {
		const hslValue = rgb16ToHsl(baseColor);
		if (!isHsl(hslValue)) return "";

		const lightness = dark
			? Math.max(0, hslValue.lightness - intensity)
			: Math.min(100, hslValue.lightness + intensity);

		return toRgbString(hslValue.hue, hslValue.saturation, lightness);
	} catch {
		return "";
	}
};

/**
 * テーブルのエディタ・フロントエンド共通のスコープ付きCSSを生成する。
 */
export const createTableStyleCss = (
	attributes: DesignTableAttributes,
	scopeSelector: string,
): string => {
	const {
		font_style_th,
		font_style_td,
		default_pos,
		mobile_pos,
		th_color,
		bgColor_th,
		bgGradient_th,
		td_color,
		bgColor_td,
		bgGradient_td,
		sel_color,
		bgColor_sel,
		bgGradient_sel,
		radius_value,
		border_value,
		intensity,
		shadow_result,
		is_shadow,
		className,
	} = attributes;

	const tableSelector = `${scopeSelector} table`;
	const headingSelector = `${tableSelector} th`;
	const cellSelector = `${tableSelector} td`;
	const headingBackground = bgColor_th || bgGradient_th || "transparent";
	const cellBackground = bgColor_td || bgGradient_td || "transparent";
	const selectedBackground = bgColor_sel || bgGradient_sel || "transparent";
	const borderColor = border_value?.bottom
		? border_value.bottom.color
		: border_value?.color;
	const shadow =
		is_shadow && shadow_result
			? cssValueToString(convertToScss(shadow_result))
			: "";

	const lightHeading = createStripeColor(bgColor_th, intensity, false);
	const darkHeading = createStripeColor(bgColor_th, intensity, true);
	const lightCell = createStripeColor(bgColor_td, intensity, false);
	const darkCell = createStripeColor(bgColor_td, intensity, true);
	const stripeCss =
		className === "is-style-stripe" &&
		lightHeading &&
		darkHeading &&
		lightCell &&
		darkCell
			? `
			${tableSelector} tr:nth-child(even) th { background:${darkHeading}; }
			${tableSelector} tr:nth-child(even) td { background:${darkCell}; }
			${tableSelector} tr:nth-child(odd) th { background:${lightHeading}; }
			${tableSelector} tr:nth-child(odd) td { background:${lightCell}; }
		`
			: "";

	return `
		${scopeSelector} {
			margin:${space_prm(default_pos.margin_value)};
			padding:${space_prm(default_pos.padding_value)};
			border-radius:${radius_prm(radius_value)};
			${shadow}
		}

		${tableSelector} {
			width:100%;
			border-collapse:collapse;
		}
		${tableSelector} thead tr:last-child {
			border-bottom:4px double ${borderColor};
		}
		${headingSelector},
		${cellSelector} {
			${cssValueToString(borderProperty(border_value ?? {}))}
		}
		${headingSelector} {
			font-size:${font_style_th.default_fontSize};
			font-family:${font_style_th.fontFamily};
			font-weight:${font_style_th.fontWeight};
			font-style:${font_style_th.isItalic ? "italic" : "normal"};
			color:${th_color};
			background:${headingBackground};
			padding:${space_prm(default_pos.padding_th)};
			min-width:${default_pos.headding_min_width}px;
		}
		${cellSelector} {
			font-size:${font_style_td.default_fontSize};
			font-family:${font_style_td.fontFamily};
			font-weight:${font_style_td.fontWeight};
			font-style:${font_style_td.isItalic ? "italic" : "normal"};
			color:${td_color};
			background:${cellBackground};
			padding:${space_prm(default_pos.padding_td)};
		}
		${cellSelector}.currentSel {
			color:${sel_color};
			background:${selectedBackground} !important;
		}

		${stripeCss}

		@media (max-width:767px) {
			${scopeSelector} {
				margin:${space_prm(mobile_pos.margin_value)};
				padding:${space_prm(mobile_pos.padding_value)};
			}
			${headingSelector} {
				font-size:${font_style_td.mobile_fontSize};
				padding:${space_prm(mobile_pos.padding_th)};
				min-width:${mobile_pos.headding_min_width}px;
			}
			${cellSelector} {
				font-size:${font_style_td.mobile_fontSize};
				padding:${space_prm(mobile_pos.padding_td)};
			}
		}
	`;
};
