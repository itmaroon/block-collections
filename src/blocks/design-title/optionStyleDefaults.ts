import type { TitleOptionStyle } from "./types";

/** スタイル（サブコピー／円マーカー）ごとの optionStyle の初期値。 */
export const circleMarkerDefaults = (): TitleOptionStyle => ({
	styleName: "is-style-circle_marker",
	colorVal_circle: "var(--itmar-accent-1)",
	colorVal_second: "var(--itmar-accent-2)",
	circleScale: "3em",
	secondScale: "1.5em",
	second_opacity: 0.7,
	first_long: 10,
	first_lat: -5,
	second_long: -10,
	second_lat: 10,
	isSecond: true,
});

export const subCopyDefaults = (): TitleOptionStyle => ({
	styleName: "is-style-sub_copy",
	alignment_copy: "top left",
	color_text_copy: "var(--itmar-content)",
	color_background_copy: "var(--itmar-accent-1)",
	copy_content: "SAMPLE",
	copy_width: 0,
	font_style_copy: {
		fontSize: "16px",
		fontFamily: "Arial, sans-serif",
		fontWeight: "500",
		isItalic: false,
	},
	radius_copy: {
		topLeft: "10px",
		topRight: "10px",
		bottomRight: "0px",
		bottomLeft: "0px",
		value: "0px",
	},
	padding_copy: {
		top: "10px",
		left: "10px",
		bottom: "10px",
		right: "10px",
	},
	isIcon: false,
	icon_style: {
		icon_name: "f030",
		icon_pos: "left",
		icon_size: "24px",
		icon_color: "#000",
		icon_space: "5px",
		icon_family: "Font Awesome 6 Free",
	},
});

const styleOf = (className?: string): TitleOptionStyle | null => {
	const classes = String(className || "").split(/\s+/);
	if (classes.includes("is-style-circle_marker")) return circleMarkerDefaults();
	if (classes.includes("is-style-sub_copy")) return subCopyDefaults();
	return null;
};

/**
 * クラスにスタイルが付いているのに、optionStyle の初期化が走っていないブロックを補う。
 *
 * 初期化は、開いた後にスタイルのクラスが切り替わったときだけ走る。最初からクラスが
 * 付いて入ってきたブロック（コピー、パターン、追加CSSクラスへの手入力など）は、
 * optionStyle が空か一部だけのままになり、CSS が何も出なくなる。
 *
 * 足りない項目だけを初期値で補う。設定済みの値は変えない。コピーの文字は、
 * 初期値の「SAMPLE」を持ち込まず、未設定なら空にする。
 * 別のスタイルの設定が残っている（styleName が違う）ときは補わず null を返す。
 */
export const completeOptionStyle = (
	className: string | undefined,
	optionStyle: TitleOptionStyle | undefined | null,
): TitleOptionStyle | null => {
	const defaults = styleOf(className);
	if (!defaults) return null;
	const current = optionStyle ?? {};
	if (current.styleName && current.styleName !== defaults.styleName) return null;
	const keys = Object.keys(defaults);
	const missing = keys.some((k) => current[k] === undefined);
	if (!missing) return current;
	return {
		...defaults,
		copy_content: "",
		...Object.fromEntries(
			Object.entries(current).filter(([, v]) => v !== undefined),
		),
		styleName: defaults.styleName,
	};
};
