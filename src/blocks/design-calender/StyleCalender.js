import styled, { css } from "styled-components";
import {
	radius_prm,
	space_prm,
	convertToScss,
	borderProperty,
} from "itmar-block-packages";

const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

// grid-template-areasの文字列を生成
const generateGridAreas = (firstDayOfMonth, totalDays, isMonday) => {
	let areas = [];
	let currentDay = 1;
	//月曜日を先頭に持ってくる場合の係数
	const mondayFirstDay = firstDayOfMonth - 1 < 0 ? 6 : firstDayOfMonth - 1;
	//先頭曜日の選択
	const modifyFirstDay = isMonday ? mondayFirstDay : firstDayOfMonth;

	//曜日ラベル
	let weekLabels = [];
	let week_index;
	for (let i = 0; i < 7; i++) {
		week_index = isMonday ? i + 1 : i; //月曜日を先頭に持ってくる場合の補正
		if (week_index > 6) week_index = 0;
		weekLabels.push(week[week_index]);
	}
	areas.push(weekLabels.join(" "));

	for (let i = 0; i < 6; i++) {
		let week = [];

		for (let j = 0; j < 7; j++) {
			// 1週間の7日分のループ
			if ((i === 0 && j < modifyFirstDay) || currentDay > totalDays) {
				week.push(`empty${i}`);
			} else {
				week.push(`day${currentDay}`);
				currentDay++;
			}
		}
		if (i == 5) {
			//最後の週
			week[5] = "day_clear";
			week[6] = "day_clear";
		}
		areas.push(week.join(" "));
	}
	return areas.map((week) => `"${week}"`).join("\n");
};

export const StyleComp = ({ attributes, children }) => {
	return <StyledDiv attributes={attributes}>{children}</StyledDiv>;
};

const StyledDiv = styled.div`
	${({ attributes }) => {
		const {
			dateValues,
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
			bgGradient_select,
			className,
		} = attributes;

		//斜体の設定
		const fontStyle_input = font_style_input.isItalic ? "italic" : "normal";
		const fontStyle_week = font_style_week.isItalic ? "italic" : "normal";
		//角丸の設定
		const box_radius_prm = radius_prm(radius_box);
		const input_radius_prm = radius_prm(radius_input);
		const week_radius_prm = radius_prm(radius_week);
		//スペースの設定
		const default_margin_prm = space_prm(default_pos.margin);
		const default_padding_prm = space_prm(default_pos.padding);
		const mobile_margin_prm = space_prm(mobile_pos.margin);
		const mobile_padding_prm = space_prm(mobile_pos.padding);
		const default_margin_input_prm = space_prm(default_pos.margin_input);
		const default_padding_input_prm = space_prm(default_pos.padding_input);
		const mobile_margin_input_prm = space_prm(mobile_pos.margin_input);
		const mobile_padding_input_prm = space_prm(mobile_pos.padding_input);
		const default_margin_week_prm = space_prm(default_pos.margin_week);
		const default_padding_week_prm = space_prm(default_pos.padding_week);
		const mobile_margin_week_prm = space_prm(mobile_pos.margin_week);
		const mobile_padding_week_prm = space_prm(mobile_pos.padding_week);

		//ボックスシャドーの設定
		const box_shadow_style =
			is_shadow_box && shadow_result_box
				? convertToScss(shadow_result_box)
				: "";

		const input_shadow_style =
			is_shadow_input && shadow_result_input
				? convertToScss(shadow_result_input)
				: "";

		const week_shadow_style =
			is_shadow_week && shadow_result_week
				? convertToScss(shadow_result_week)
				: "";

		const select_shadow_style =
			is_shadow_select && shadow_result_select
				? convertToScss(shadow_result_select)
				: "";
		//指定された月のgrid-areas
		const gridAreas =
			dateValues.length > 0
				? generateGridAreas(
						dateValues[0].weekday,
						dateValues.length,
						weekTop === "mon",
				  )
				: null;
		// 共通のスタイルをここで定義します
		const commonStyle = css`
			.itmar_date_area {
				display: grid;
				grid-template-areas: ${gridAreas};
				margin: ${default_margin_prm};
				padding: ${default_padding_prm};
				${borderProperty(border_box)};
				border-radius: ${box_radius_prm};
				background-color: ${bgColor};
				${box_shadow_style};

				@media (max-width: 767px) {
					margin: ${mobile_margin_prm};
					padding: ${mobile_padding_prm};
				}
			}

			.itmar_radio {
				display: flex;

				width: auto;
				align-items: center;
				margin: ${default_margin_input_prm};
				padding: ${default_padding_input_prm};
				${borderProperty(border_input)};
				border-radius: ${input_radius_prm};
				background-color: ${inputBgColor};
				${input_shadow_style};
				transition:
					transform 300ms ease,
					box-shadow ease-in-out 0.5s;
				&.holiday {
					background-color: ${holidayBgColor};
					span {
						color: ${holidayColor};
					}
				}
				&.saturday {
					background-color: ${saturdayBgColor};
					span {
						color: ${staturdayColor};
					}
				}
				&.checked {
					background: ${bgColor_select};
					${select_shadow_style};
					span {
						color: ${color_select};
					}
				}
				&:hover {
					transform: scale(1.1, 1.1);
					${select_shadow_style};
				}

				input[type="radio"] {
					display: none;
				}
				@media (max-width: 767px) {
					margin: ${mobile_margin_input_prm};
					padding: ${mobile_padding_input_prm};
				}
				span {
					font-size: ${font_style_input.default_fontSize};
					font-family: ${font_style_input.fontFamily};
					font-weight: ${font_style_input.fontWeight};
					font-style: ${fontStyle_input};
					color: ${inputColor};
					margin: 0;
					line-height: 1.2;
					position: relative;
					display: inline-block;
					box-sizing: border-box;
					transition: border-color ease 0.2s;
					cursor: pointer;
					@media (max-width: 767px) {
						font-size: ${font_style_input.mobile_fontSize};
					}
				}
				button {
					text-align: center;
					margin: 0 auto;
					background-color: transparent;
					border: none;
				}
			}
			.itmar_week_label {
				display: flex;
				justify-content: center;
				width: auto;
				align-items: center;
				margin: ${default_margin_week_prm};
				padding: ${default_padding_week_prm};
				${borderProperty(border_week)};
				border-radius: ${week_radius_prm};
				background-color: ${weekLabelBgColor};
				${week_shadow_style};
				@media (max-width: 767px) {
					margin: ${mobile_margin_week_prm};
					padding: ${mobile_padding_week_prm};
				}
				span {
					font-size: ${font_style_week.default_fontSize};
					font-family: ${font_style_week.fontFamily};
					font-weight: ${font_style_week.fontWeight};
					font-style: ${fontStyle_week};
					color: ${weekLabelColor};
					margin: 0;
					line-height: 1.2;
					position: relative;
					display: inline-block;
					box-sizing: border-box;

					@media (max-width: 767px) {
						font-size: ${font_style_week.mobile_fontSize};
					}
				}
			}
		`;

		// 共通のスタイルを組み合わせて返します
		return css`
			${commonStyle}
		`;
	}}
`;
