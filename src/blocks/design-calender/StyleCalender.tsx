import {
	radius_prm,
	space_prm,
	convertToScss,
	borderProperty,
	generateGridAreas,
	cssValueToString,
} from "itmar-block-packages";
import type { CalendarAttributes } from "./types";

/**
 * カレンダー本体のエディタ・フロントエンド共通のスコープ付きCSSを生成する。
 */
export const createCalendarStyleCss = (
	attributes: CalendarAttributes,
	scopeSelector: string,
): string => {
	const {
		dateValues = [],
		weekTop,
		font_style_input,
		default_pos,
		mobile_pos,
		bgColor,
		inputColor,
		inputBgColor,
		radius_box,
		border_box,
		radius_input,
		border_input,
		shadow_result_box,
		is_shadow_box,
		shadow_result_input,
		is_shadow_input,
		weekLabelColor,
		weekLabelBgColor,
		font_style_week,
		radius_week,
		border_week,
		shadow_result_week,
		is_shadow_week,
		holidayColor,
		holidayBgColor,
		staturdayColor,
		saturdayBgColor,
		shadow_result_select,
		is_shadow_select,
		color_select,
		bgColor_select,
	} = attributes;

	const dateArea = `${scopeSelector} .itmar_date_area`;
	const radio = `${scopeSelector} .itmar_radio`;
	const weekLabel = `${scopeSelector} .itmar_week_label`;
	const gridAreas =
		dateValues.length > 0
			? generateGridAreas(
					dateValues[0].weekday,
					dateValues.length,
					weekTop === "mon",
			  )
			: "none";
	const boxShadow =
		is_shadow_box && shadow_result_box
			? cssValueToString(convertToScss(shadow_result_box))
			: "";
	const inputShadow =
		is_shadow_input && shadow_result_input
			? cssValueToString(convertToScss(shadow_result_input))
			: "";
	const weekShadow =
		is_shadow_week && shadow_result_week
			? cssValueToString(convertToScss(shadow_result_week))
			: "";
	const selectedShadow =
		is_shadow_select && shadow_result_select
			? cssValueToString(convertToScss(shadow_result_select))
			: "";

	return `
		${dateArea} {
			display: grid;
			grid-template-areas: ${gridAreas};
			grid-template-columns: repeat(auto-fit, minmax(5px, 1fr));
			margin: ${space_prm(default_pos.margin)};
			padding: ${space_prm(default_pos.padding)};
			${cssValueToString(borderProperty(border_box))}
			border-radius: ${radius_prm(radius_box)};
			background-color: ${bgColor};
			${boxShadow}
		}

		${radio} {
			display: flex;
			width: auto;
			align-items: center;
			margin: ${space_prm(default_pos.margin_input)};
			padding: ${space_prm(default_pos.padding_input)};
			${cssValueToString(borderProperty(border_input))}
			border-radius: ${radius_prm(radius_input)};
			background-color: ${inputBgColor};
			${inputShadow}
			transition: transform 300ms ease, box-shadow ease-in-out 0.5s;
		}
		${radio}.holiday { background-color: ${holidayBgColor}; }
		${radio}.holiday span { color: ${holidayColor}; }
		${radio}.saturday { background-color: ${saturdayBgColor}; }
		${radio}.saturday span { color: ${staturdayColor}; }
		${radio}.checked {
			background: ${bgColor_select};
			${selectedShadow}
		}
		${radio}.checked span { color: ${color_select}; }
		${radio}:hover {
			transform: scale(1.1, 1.1);
			${selectedShadow}
		}
		${radio} input[type="radio"] { display: none; }
		${radio} span {
			font-size: ${font_style_input.default_fontSize};
			font-family: ${font_style_input.fontFamily};
			font-weight: ${font_style_input.fontWeight};
			font-style: ${font_style_input.isItalic ? "italic" : "normal"};
			color: ${inputColor};
			margin: 0;
			line-height: 1.2;
			position: relative;
			display: inline-block;
			box-sizing: border-box;
			transition: border-color ease 0.2s;
			cursor: pointer;
		}
		${radio} button {
			text-align: center;
			margin: 0 auto;
			background-color: transparent;
			border: none;
		}

		${weekLabel} {
			display: flex;
			justify-content: center;
			width: auto;
			align-items: center;
			margin: ${space_prm(default_pos.margin_week)};
			padding: ${space_prm(default_pos.padding_week)};
			${cssValueToString(borderProperty(border_week))}
			border-radius: ${radius_prm(radius_week)};
			background-color: ${weekLabelBgColor};
			${weekShadow}
		}
		${weekLabel} span {
			font-size: ${font_style_week.default_fontSize};
			font-family: ${font_style_week.fontFamily};
			font-weight: ${font_style_week.fontWeight};
			font-style: ${font_style_week.isItalic ? "italic" : "normal"};
			color: ${weekLabelColor};
			margin: 0;
			line-height: 1.2;
			position: relative;
			display: inline-block;
			box-sizing: border-box;
		}

		@media (max-width: 767px) {
			${dateArea} {
				margin: ${space_prm(mobile_pos.margin)};
				padding: ${space_prm(mobile_pos.padding)};
			}
			${radio} {
				margin: ${space_prm(mobile_pos.margin_input)};
				padding: ${space_prm(mobile_pos.padding_input)};
			}
			${radio} span {
				font-size: ${font_style_input.mobile_fontSize};
			}
			${weekLabel} {
				margin: ${space_prm(mobile_pos.margin_week)};
				padding: ${space_prm(mobile_pos.padding_week)};
			}
			${weekLabel} span {
				font-size: ${font_style_week.mobile_fontSize};
			}
		}
	`;
};
