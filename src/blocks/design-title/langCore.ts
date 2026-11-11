/**
 * 言語まわりの、React や REST に依存しない関数。
 * フロントのスクリプト（view.ts、StyleWapper.tsx）が、重い読み込みなしで使う。
 */
export type LangMap = Record<string, string>;

export const DEFAULT_LANG = "JP";

/** 言語を覚える Cookie の名前 */
export const LANG_COOKIE = "itmar_lang";

export const isLangMap = (value: unknown): value is LangMap =>
	!!value && typeof value === "object" && !Array.isArray(value);

/** 既定の言語の文字（なければ最初の言語の文字） */
export const defaultText = (value: unknown): string => {
	if (isLangMap(value)) {
		return value[DEFAULT_LANG] ?? Object.values(value)[0] ?? "";
	}
	return typeof value === "string" ? value : "";
};

/** 指定した言語の文字。ない言語は、既定の言語の文字で代える */
export const textForLang = (value: unknown, lang: string): string => {
	if (isLangMap(value)) {
		return value[lang] ?? defaultText(value);
	}
	return typeof value === "string" ? value : "";
};

/**
 * いまページを表示している言語。
 * URL（サーバーが <html data-itmar-lang> で知らせる）が先、なければ Cookie、それもなければ既定の言語。
 */
export const currentViewLang = (): string => {
	if (typeof document === "undefined") return DEFAULT_LANG;
	const fromUrl = document.documentElement.dataset.itmarLang;
	if (fromUrl) return fromUrl;
	const match = document.cookie.match(
		new RegExp(`(?:^|; )${LANG_COOKIE}=([^;]*)`),
	);
	return (match ? decodeURIComponent(match[1]) : "") || DEFAULT_LANG;
};
