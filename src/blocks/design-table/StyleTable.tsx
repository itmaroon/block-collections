import {
	radius_prm,
	space_prm,
	convertToScss,
	borderProperty,
	hslToRgb16,
	rgb16ToHsl,
	cssValueToString,
} from "itmar-block-packages/front";
import type { CellSizeValues, DesignTableAttributes } from "./types";
import { MEDIA_MOBILE } from "../breakpoints";

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
		cell_size,
		is_shadow_td,
		shadow_result_td,
		row_radius,
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

	/*
	 * サークルスタイル（カレンダー向け）。罫線を消し、セルの文字を中央に置き、
	 * 各セルを円形に切り抜く。円の大きさはセルの高さ（closest-side）で決まるので、横長のセルで使う。
	 * 背景は切り抜く前のセルの背景（色・グラデーション・選択色）がそのまま円になる。
	 */
	const styleNames = (className ?? "").split(/\s+/);
	const isCircleStyle = styleNames.includes("is-style-circle");
	const isListStyle = styleNames.includes("is-style-list");
	/*
	 * 幅と高さの両方が決まっているセルは正方形なので、border-radius で円にする
	 * （影も円の外側に出る）。そうでないときは、セルの高さに合わせて切り抜く。
	 * border-radius は border-collapse: collapse の表では効かないため、表を separate にする。
	 */
	const isSquareCell = (s?: CellSizeValues) => Boolean(s?.width && s?.height);
	const hasSquareCell =
		isSquareCell(cell_size) || isSquareCell(cell_size?.mobile);
	const circleSelCss = isCircleStyle
		? `
			${tableSelector} thead tr:last-child {
				border-bottom:none;
			}
			${headingSelector},
			${cellSelector} {
				border:none;
				text-align:center !important;
				vertical-align:middle;
			}
			${
				hasSquareCell
					? `${tableSelector} {
				border-collapse:separate;
				border-spacing:0;
			}
			${cellSelector} {
				border-radius:50%;
			}`
					: `${cellSelector} {
				clip-path:circle(closest-side);
			}`
			}
		`
		: "";

	/*
	 * リストスタイル（時間帯の一覧向け）。罫線を消し、行どうしに間隔をあけ、
	 * 行の両端のセルに角丸を付けて、行を1つの項目として見せる。
	 * 行の背景は各セルの背景（状態の色など）がそのまま使われる。
	 */
	const rowRadius = row_radius || "8px";
	const listCss = isListStyle
		? `
			${tableSelector} thead tr:last-child {
				border-bottom:none;
			}
			${headingSelector},
			${cellSelector} {
				border:none;
			}
			${tableSelector} {
				border-collapse:separate;
				border-spacing:0 0.4em;
			}
			${tableSelector} tr > :first-child {
				border-radius:${rowRadius} 0 0 ${rowRadius};
			}
			${tableSelector} tr > :last-child {
				border-radius:0 ${rowRadius} ${rowRadius} 0;
			}
			${tableSelector} tr > :only-child {
				border-radius:${rowRadius};
			}
		`
		: "";

	//セルの大きさ（幅・高さ・間隔）。幅を決めたときは表の幅を内容に合わせ、決めた幅が効くようにする
	const buildCellSizeCss = (s?: CellSizeValues): string => {
		if (!s || (!s.width && !s.height && !s.gap)) return "";
		return `
			${
				s.width
					? `${tableSelector} { width:auto !important; table-layout:auto !important; }
			${tableSelector} col { width:${s.width} !important; }
			${headingSelector} { box-sizing:border-box; width:${s.width} !important; min-width:0 !important; padding-left:0; padding-right:0; }`
					: ""
			}
			${
				s.width || s.height
					? `${cellSelector} {
				box-sizing:border-box;
				${s.width ? `width:${s.width} !important;` : ""}
				${s.height ? `height:${s.height};` : ""}
			}`
					: ""
			}
			${
				isCircleStyle && s.gap
					? `${tableSelector} { border-collapse:separate; border-spacing:${s.gap}; }`
					: ""
			}
			${
				isListStyle && (s.gap || s.colGap)
					? `${tableSelector} { border-collapse:separate; border-spacing:${s.colGap || "0"} ${s.gap || "0.4em"}; }`
					: ""
			}
			${
				// 列の間隔をあけたときは、行の両端だけでなく各セルを角丸にする
				isListStyle && s.colGap
					? `${tableSelector} tr > *,
			${tableSelector} tr > :first-child,
			${tableSelector} tr > :last-child,
			${tableSelector} tr > :only-child { border-radius:${rowRadius}; }`
					: ""
			}
		`;
	};
	// 影の設定が返す background と border は、セルの背景（色・休業日・選択色）や罫線の設定を
	// 上書きしてしまうので使わない。影そのもの（box-shadow など）だけをセルに当てる。
	const cellShadow = (() => {
		if (!is_shadow_td || !shadow_result_td) return "";
		const { background, border, ...shadowOnly } = shadow_result_td;
		return cssValueToString(convertToScss(shadowOnly));
	})();

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
			${cellShadow}
		}
		${cellSelector}.currentSel {
			color:${sel_color};
			background:${selectedBackground} !important;
		}
		${circleSelCss}
		${listCss}
		${buildCellSizeCss(cell_size)}

		${stripeCss}

		${MEDIA_MOBILE} {
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
			${buildCellSizeCss(cell_size?.mobile)}
		}
	`;
};
