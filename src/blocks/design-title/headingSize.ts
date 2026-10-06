/**
 * 見出しの文字サイズを、テーマの見出しサイズ（H1〜H6）への参照で持つ。
 * 値は "h1"〜"h6"。テーマが settings.custom に持つ変数を指す。
 *   デスクトップ: --wp--custom--heading--h-1
 *   モバイル    : --wp--custom--heading-sp--h-1
 * （WordPress は settings.custom のキー h1 を h-1 に変換して変数名にする）
 * 変数が無いテーマでは、ブラウザ標準の見出しの比率に落とす。
 */
export const HEADING_SIZE_LEVELS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
export type HeadingSizeLevel = (typeof HEADING_SIZE_LEVELS)[number];

const FALLBACK: Record<HeadingSizeLevel, string> = {
	h1: "2em",
	h2: "1.5em",
	h3: "1.17em",
	h4: "1em",
	h5: "0.83em",
	h6: "0.67em",
};

export const isHeadingSizeLevel = (v: unknown): v is HeadingSizeLevel =>
	typeof v === "string" && (HEADING_SIZE_LEVELS as readonly string[]).includes(v);

const sizeVar = (level: HeadingSizeLevel, mobile: boolean) =>
	`var(--wp--custom--heading${mobile ? "-sp" : ""}--h-${level.slice(1)}, ${FALLBACK[level]})`;

/**
 * 見出し要素へ当てるCSS。両方とも未設定なら空（テーマの見出しサイズのまま）。
 * デスクトップだけ設定したときは、モバイルも同じレベルのモバイル用サイズにする。
 * モバイルだけ設定したときは、デスクトップには触れない。
 * mobileBlock にはメディアクエリ（MEDIA_MOBILE）を渡す。
 */
export const createHeadingSizeCss = (
	desktop: unknown,
	mobile: unknown,
	mobileBlock: string,
): string => {
	const d = isHeadingSizeLevel(desktop) ? desktop : undefined;
	const m = isHeadingSizeLevel(mobile) ? mobile : d;
	if (!d && !m) return "";
	return `
		${d ? `font-size:${sizeVar(d, false)};` : ""}
		${m ? `${mobileBlock} { font-size:${sizeVar(m, true)}; }` : ""}
	`;
};
