import {
	radius_prm,
	space_prm,
	convertToScss,
	borderProperty,
	generateGridAreas,
	cssValueToString,
} from "itmar-block-packages/front";
import type { CalendarAttributes } from "./types";
import { MEDIA_MOBILE } from "../breakpoints";

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
		monthNavStyle,
		dialogBgColor,
		dialogColor,
		radius_dialog,
		border_dialog,
		is_shadow_dialog,
		shadow_result_dialog,
		font_style_dialog,
		dialogBackdropColor,
		dialogSelectedColor,
		dialogSelectedBgColor,
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

	const dialogShadow =
		is_shadow_dialog && shadow_result_dialog
			? cssValueToString(convertToScss(shadow_result_dialog))
			: "";
	const dialog = `${scopeSelector} .itmar_month_dialog`;
	//年月の選択ダイアログ（月の切り替えを「dialog」にしたときだけ出す）
	const dialogCss =
		monthNavStyle === "dialog"
			? `
		${scopeSelector} .itmar_month_picker {
			cursor: pointer;
		}
		${scopeSelector} .itmar_month_picker:focus-visible {
			outline: 2px solid currentColor;
			outline-offset: 2px;
		}

		${dialog} {
			position: relative;
			box-sizing: border-box;
			width: min(22em, calc(100vw - 2em));
			margin: auto;
			padding: 2.4em 1.25em 1.25em;
			border: none;
			${cssValueToString(borderProperty(border_dialog))}
			border-radius: ${radius_prm(radius_dialog)};
			background-color: ${dialogBgColor};
			color: ${dialogColor};
			${dialogShadow}
		}
		${dialog}::backdrop {
			background: ${dialogBackdropColor || "rgb(0 0 0 / 0.4)"};
		}
		/* エディターのプレビュー。フロントの <dialog> と同じく、画面の中央に背景ごと重ねる */
		${scopeSelector} .itmar_month_dialog_backdrop {
			position: fixed;
			inset: 0;
			z-index: 100;
			display: flex;
			align-items: center;
			justify-content: center;
			background: ${dialogBackdropColor || "rgb(0 0 0 / 0.4)"};
			pointer-events: none;
		}
		${dialog}.is-preview {
			margin: 0;
		}
		${dialog} .itmar_month_dialog_head {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		${dialog} .itmar_dialog_year {
			font-size: ${font_style_dialog?.default_fontSize ?? "1.4em"};
			${font_style_dialog ? `font-family: ${font_style_dialog.fontFamily};` : ""}
			font-weight: ${font_style_dialog?.fontWeight ?? "600"};
			font-style: ${font_style_dialog?.isItalic ? "italic" : "normal"};
			line-height: 1.2;
		}
		${dialog} .itmar_month_grid .itmar_radio.checked span {
			font-weight: 700;
		}
		${
			dialogSelectedBgColor
				? `${dialog} .itmar_month_grid .itmar_radio.checked { background: ${dialogSelectedBgColor}; }`
				: ""
		}
		${
			dialogSelectedColor
				? `${dialog} .itmar_month_grid .itmar_radio.checked span { color: ${dialogSelectedColor}; }`
				: ""
		}
		${dialog} .itmar_dialog_year_prev,
		${dialog} .itmar_dialog_year_next,
		${dialog} .itmar_dialog_close {
			position: relative;
			flex-shrink: 0;
			width: 2.2em;
			height: 2.2em;
			padding: 0;
			border: none;
			border-radius: 50%;
			background: transparent;
			color: inherit;
			cursor: pointer;
		}
		${dialog} .itmar_dialog_year_prev::before,
		${dialog} .itmar_dialog_year_next::before {
			content: "";
			position: absolute;
			top: 50%;
			left: 50%;
			width: 0.55em;
			height: 0.55em;
			border-top: 2px solid currentColor;
			border-left: 2px solid currentColor;
		}
		${dialog} .itmar_dialog_year_prev::before {
			transform: translate(-30%, -50%) rotate(-45deg);
		}
		${dialog} .itmar_dialog_year_next::before {
			transform: translate(-70%, -50%) rotate(135deg);
		}
		${dialog} .itmar_dialog_year_prev:disabled,
		${dialog} .itmar_dialog_year_next:disabled {
			opacity: 0.3;
			cursor: default;
		}
		${dialog} .itmar_dialog_close {
			position: absolute;
			top: 0.4em;
			right: 0.4em;
			width: 1.8em;
			height: 1.8em;
		}
		${dialog} .itmar_dialog_close::before,
		${dialog} .itmar_dialog_close::after {
			content: "";
			position: absolute;
			top: 50%;
			left: 50%;
			width: 1em;
			height: 2px;
			background: currentColor;
		}
		${dialog} .itmar_dialog_close::before {
			transform: translate(-50%, -50%) rotate(45deg);
		}
		${dialog} .itmar_dialog_close::after {
			transform: translate(-50%, -50%) rotate(-45deg);
		}
		${dialog} .itmar_month_grid {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 0.4em;
			margin-top: 1em;
		}
		${dialog} .itmar_month_grid .itmar_radio {
			justify-content: center;
			margin: 0;
			cursor: pointer;
		}
		${dialog} .itmar_month_grid .itmar_radio.is-disabled {
			opacity: 0.3;
			pointer-events: none;
		}
		${dialog} .itmar_month_grid .itmar_radio:focus-visible {
			outline: 2px solid currentColor;
			outline-offset: 2px;
		}
	`
			: "";

	return `
		${dialogCss}
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

		${MEDIA_MOBILE} {
			${
				monthNavStyle === "dialog" && font_style_dialog
					? `${dialog} .itmar_dialog_year { font-size: ${font_style_dialog.mobile_fontSize}; }`
					: ""
			}
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
