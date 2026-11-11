/**
 * 見出しの文字サイズを、テーマの見出しサイズ（H1〜H6）への参照で持つ。
 * 値は "h1"〜"h6"。テーマが settings.custom に持つ変数を指す。
 *   デスクトップ: --wp--custom--heading--h-1
 *   モバイル    : --wp--custom--heading-sp--h-1
 * （WordPress は settings.custom のキー h1 を h-1 に変換して変数名にする）
 * 変数が無いテーマでは、ブラウザ標準の見出しの比率に落とす。
 *
 * テーマの H1 より大きい文字（ファーストビューの大見出しなど）には、"fluid" を選ぶ。
 * 最小・画面幅の割合・最大の 3 つから clamp() を作り、画面幅に連動して、上限と下限で止まる。
 */
export const HEADING_SIZE_LEVELS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
export type HeadingSizeLevel = (typeof HEADING_SIZE_LEVELS)[number];

export const HEADING_SIZE_FLUID = "fluid";

/** 画面幅に連動する文字サイズ。min と max は CSS の長さ（"3rem"）、vw は画面幅に対する割合（8 → 8vw） */
export interface FluidSize {
	min?: string;
	vw?: number;
	max?: string;
}

export const FLUID_SIZE_DEFAULT: Required<FluidSize> = {
	min: "3rem",
	vw: 8,
	max: "10rem",
};

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

//CSS に書き込む値なので、数値＋単位の長さだけを通す（式や var() は通さない）
const LENGTH_PATTERN = /^\d+(\.\d+)?(px|em|rem|vw|vh|svh|lvh|dvh|vmin|vmax)$/;

const isLength = (v: unknown): v is string =>
	typeof v === "string" && LENGTH_PATTERN.test(v.trim());

/**
 * clamp(最小, 画面幅の割合, 最大)。まだ入力していない項目は、インスペクターに見せている既定値を使う。
 * 値が長さとして正しくないときは空（指定なし）にする。
 * 最大が最小より小さいと clamp は最小に固定されるので、そのまま出す。
 */
export const fluidSizeValue = (fluid: unknown): string => {
	const f = (fluid ?? {}) as FluidSize;
	const min = f.min ?? FLUID_SIZE_DEFAULT.min;
	const max = f.max ?? FLUID_SIZE_DEFAULT.max;
	const vw = Number(f.vw ?? FLUID_SIZE_DEFAULT.vw);
	if (!isLength(min) || !isLength(max) || !Number.isFinite(vw) || vw <= 0) {
		return "";
	}
	return `clamp(${min.trim()}, ${vw}vw, ${max.trim()})`;
};

/**
 * 見出し要素へ当てるCSS。両方とも未設定なら空（テーマの見出しサイズのまま）。
 * デスクトップだけ設定したときは、モバイルも同じレベルのモバイル用サイズにする。
 * "fluid" のときは、モバイル側の3つ組が無ければデスクトップの3つ組を使う（vw なので画面に追従する）。
 * モバイルだけ設定したときは、デスクトップには触れない。
 * mobileBlock にはメディアクエリ（MEDIA_MOBILE）を渡す。
 */
export const createHeadingSizeCss = (
	desktop: unknown,
	mobile: unknown,
	mobileBlock: string,
	fluidDesktop?: unknown,
	fluidMobile?: unknown,
): string => {
	const resolve = (
		kind: unknown,
		fluid: unknown,
		isMobile: boolean,
	): string => {
		if (kind === HEADING_SIZE_FLUID) return fluidSizeValue(fluid);
		return isHeadingSizeLevel(kind) ? sizeVar(kind, isMobile) : "";
	};
	const d = resolve(desktop, fluidDesktop, false);
	//モバイル側の指定が無い（または値が揃わない）ときは、デスクトップの種類を引き継ぐ
	const m =
		resolve(mobile, fluidMobile ?? fluidDesktop, true) ||
		(desktop === HEADING_SIZE_FLUID
			? fluidSizeValue(fluidMobile ?? fluidDesktop) || d
			: isHeadingSizeLevel(desktop)
				? sizeVar(desktop, true)
				: "");
	if (!d && !m) return "";
	return `
		${d ? `font-size:${d};` : ""}
		${m ? `${mobileBlock} { font-size:${m}; }` : ""}
	`;
};
