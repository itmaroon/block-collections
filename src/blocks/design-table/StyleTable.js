import styled, { css } from "styled-components";
import {
	radius_prm,
	space_prm,
	convertToScss,
	borderProperty,
	hslToRgb16,
	rgb16ToHsl,
	cssValueToString,
} from "itmar-block-packages";
//import { hslToRgb16, HexToRGB, rgb16ToHsl } from "../hslToRgb";
import { dispatch } from "@wordpress/data";

export const StyleComp = ({ attributes, children }) => {
	return <StyledDiv $attr={attributes}>{children}</StyledDiv>;
};

const StyledDiv = styled.div`
	${({ $attr }) => {
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
		} = $attr;

		//単色かグラデーションかの選択
		const bgColorTh = bgColor_th || bgGradient_th;
		const bgColorTd = bgColor_td || bgGradient_td;
		const bgColorSel = bgColor_sel || bgGradient_sel;
		//斜体の設定
		const fontStyle_th = font_style_th.isItalic ? "italic" : "normal";
		const fontStyle_td = font_style_td.isItalic ? "italic" : "normal";
		//角丸の設定
		const table_radius_prm = radius_prm(radius_value);
		//スペースの設定
		const default_table_margin_prm = space_prm(default_pos.margin_value);
		const default_table_padding_prm = space_prm(default_pos.padding_value);
		const default_th_padding_prm = space_prm(default_pos.padding_th);
		const default_td_padding_prm = space_prm(default_pos.padding_td);
		const mobile_table_margin_prm = space_prm(mobile_pos.margin_value);
		const mobile_table_padding_prm = space_prm(mobile_pos.padding_value);
		const mobile_th_padding_prm = space_prm(mobile_pos.padding_th);
		const mobile_td_padding_prm = space_prm(mobile_pos.padding_td);
		//ボックスシャドーの設定
		const box_shadow_style =
			is_shadow && shadow_result ? convertToScss(shadow_result) : "";
		//ボーダーの代表色
		const borderColor = border_value.bottom
			? border_value.bottom.color
			: border_value.color;

		// 共通のスタイルをここで定義します
		const commonStyle = css`
			margin: ${default_table_margin_prm};
			padding: ${default_table_padding_prm};
			border-radius: ${table_radius_prm};
			${box_shadow_style};
			@media (max-width: 767px) {
				margin: ${mobile_table_margin_prm};
				padding: ${mobile_table_padding_prm};
			}
			table {
				width: 100%;
				border-collapse: collapse;
				thead {
					tr:last-child {
						border-bottom: 4px double ${borderColor};
					}
				}

				th,
				td {
					${borderProperty(border_value)};
				}
				th {
					font-size: ${font_style_th.default_fontSize};
					font-family: ${font_style_th.fontFamily};
					font-weight: ${font_style_th.fontWeight};
					font-style: ${fontStyle_th};
					color: ${th_color};
					background: ${bgColorTh};
					padding: ${default_th_padding_prm};
					min-width: ${default_pos.headding_min_width}px;
					@media (max-width: 767px) {
						font-size: ${font_style_td.mobile_fontSize};
						padding: ${mobile_th_padding_prm};
						min-width: ${mobile_pos.headding_min_width}px;
					}
				}
				td {
					font-size: ${font_style_td.default_fontSize};
					font-family: ${font_style_td.fontFamily};
					font-weight: ${font_style_td.fontWeight};
					font-style: ${fontStyle_td};
					color: ${td_color};
					background: ${bgColorTd};
					padding: ${default_td_padding_prm};
					&.currentSel {
						color: ${sel_color};
						background: ${bgColorSel} !important;
					}
					@media (max-width: 767px) {
						font-size: ${font_style_td.mobile_fontSize};
						padding: ${mobile_td_padding_prm};
					}
				}
			}
		`;

		//ストライプ色
		const stripe = (baseColor, is_dark) => {
			if (baseColor) {
				const hslValue = rgb16ToHsl(baseColor);
				//明るさを変更
				const lightVal =
					hslValue.lightness + intensity < 100
						? hslValue.lightness + intensity
						: 100;
				const darkVal =
					hslValue.lightness - intensity > 0
						? hslValue.lightness - intensity
						: 0;
				return is_dark
					? hslToRgb16(hslValue.hue, hslValue.saturation, darkVal)
					: hslToRgb16(hslValue.hue, hslValue.saturation, lightVal);
			} else {
				return null;
			}
		};
		const lightValueTh = stripe(bgColor_th, false); //明るい色
		const darkValueTh = stripe(bgColor_th, true); //暗い色
		const lightValueTd = stripe(bgColor_td, false); //明るい色
		const darkValueTd = stripe(bgColor_td, true); //暗い色

		//エラーメッセージの表示
		if (
			!(lightValueTh && darkValueTh && lightValueTd && darkValueTd) &&
			className === "is-style-stripe"
		) {
			dispatch("core/notices").createNotice(
				"error",
				__(
					"If the background color of the cell is set to gradient, stripes will not be applied.",
					"itmar_block_collections",
				),
				{ type: "snackbar" },
			);
		}

		const stripeStyle = css`
			table {
				tr {
					&:nth-child(even) {
						th {
							background: ${darkValueTh};
						}
						td {
							background: ${darkValueTd};
						}
					}
					&:nth-child(odd) {
						th {
							background: ${lightValueTh};
						}
						td {
							background: ${lightValueTd};
						}
					}
				}
			}
		`;

		const cssMap = {
			"is-style-stripe": stripeStyle,
		};

		const optionStyle = cssMap[className] || null;
		// 共通のスタイルを組み合わせて返します
		return css`
			${commonStyle}
			${optionStyle}
		`;
	}}
`;

const createStripeColor = (baseColor, intensity, dark) => {
	if (!baseColor) return "";

	try {
		const hslValue = rgb16ToHsl(baseColor);
		if (!hslValue) return "";

		const lightness = dark
			? Math.max(0, hslValue.lightness - intensity)
			: Math.min(100, hslValue.lightness + intensity);

		return hslToRgb16(hslValue.hue, hslValue.saturation, lightness);
	} catch {
		return "";
	}
};

/**
 * テーブルのフロントエンド用スコープ付きCSSを生成する。
 */
export const createTableStyleCss = (attributes, scopeSelector) => {
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
			${cssValueToString(borderProperty(border_value))}
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
