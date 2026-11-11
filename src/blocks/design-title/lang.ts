import * as React from "react";
import apiFetch from "@wordpress/api-fetch";

/**
 * 見出しの多言語対応。
 *
 * headingContent は、文字列か、言語コードをキーにした文字列のオブジェクトを持てる。
 *  - 文字列 … 言語を分けない（従来どおり。既存のブロックはこのまま有効）
 *  - {JP:"…", EN:"…"} … 言語ごとの文字
 * 保存される HTML には、既定の言語の文字を入れ、全言語の文字は data-lang-texts に持つ。
 * 表示のとき（view.ts）に、Cookie の言語に合わせて差し替える。
 */
import {
	DEFAULT_LANG,
	LANG_COOKIE,
	defaultText,
	isLangMap,
	textForLang,
	type LangMap,
} from "./langCore";
export {
	DEFAULT_LANG,
	LANG_COOKIE,
	defaultText,
	isLangMap,
	textForLang,
	type LangMap,
};
export type HeadingContent = string | LangMap;

export type LangOption = { value: string; label: string; htmlLang: string };

/** slug-translater の設定が読めないとき（プラグインがない）の言語。手入力の多言語は、これで使える */
export const FALLBACK_LANGS: LangOption[] = [
    { value: "JP", label: "日本語", htmlLang: "ja" },
    { value: "EN", label: "English", htmlLang: "en" },
];


/**
 * 指定した言語の文字を書き換えた新しい値を返す。
 * 既定の言語を、まだ分けていない文字列に書くときは、文字列のまま。ほかの言語を書くときに、オブジェクトにする。
 */
export const withLangText = (
	value: unknown,
	lang: string,
	text: string,
): HeadingContent => {
	if (isLangMap(value)) {
		return { ...value, [lang]: text };
	}
	if (lang === DEFAULT_LANG) {
		return text;
	}
	return { [DEFAULT_LANG]: typeof value === "string" ? value : "", [lang]: text };
};

/* ------------------------------
  エディターで編集している言語
  ------------------------------
  全てのタイトルで共通。どれか1つで切り替えると、全部が同じ言語の表示になる。 */
//ブロックごとにビルドが分かれていて、モジュールの変数は共有できないので、window に置く
type EditLangStore = { value: string; listeners: Set<() => void> };
const editLangStore: EditLangStore = (() => {
	const w = window as unknown as { __itmarEditLang?: EditLangStore };
	if (!w.__itmarEditLang) {
		w.__itmarEditLang = { value: DEFAULT_LANG, listeners: new Set() };
	}
	return w.__itmarEditLang;
})();

export const setEditLang = (lang: string): void => {
	if (lang === editLangStore.value) return;
	editLangStore.value = lang;
	editLangStore.listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
	editLangStore.listeners.add(listener);
	return () => {
		editLangStore.listeners.delete(listener);
	};
};

export const useEditLang = (): string =>
	React.useSyncExternalStore(subscribe, () => editLangStore.value);

/* ------------------------------
  翻訳の設定
  ------------------------------
  slug-translater の設定画面で決めた、翻訳する言語とブロックを、エディターを開いたときに1回だけ読む。
  プラグインがない（読めない）ときは、自動翻訳を使わず、既定の言語（JP と EN）の手入力だけにする。 */
export type TranslationConfig = {
	loaded: boolean;
	/** slug-translater が入っていて、設定が読めた */
	plugin: boolean;
	/** 翻訳エンジンが選ばれていて、認証情報が入っている */
	engine: boolean;
	languages: LangOption[];
	/** 翻訳の対象に選ばれたブロック名 */
	blocks: string[];
};

let translationConfig: TranslationConfig = {
	loaded: false,
	plugin: false,
	engine: false,
	languages: FALLBACK_LANGS,
	blocks: [],
};
let configRequested = false;
const configListeners = new Set<() => void>();

const setTranslationConfig = (next: TranslationConfig) => {
	translationConfig = next;
	configListeners.forEach((listener) => listener());
};

const requestTranslationConfig = () => {
	if (configRequested) return;
	configRequested = true;
	apiFetch({ path: "/slug-translater/v1/config" })
		.then((res) => {
			const data = res as {
				engine?: boolean;
				languages?: LangOption[];
				blocks?: string[];
			};
			const languages =
				Array.isArray(data.languages) && data.languages.length > 0
					? data.languages
					: FALLBACK_LANGS;
			setTranslationConfig({
				loaded: true,
				plugin: true,
				engine: !!data.engine,
				languages,
				blocks: Array.isArray(data.blocks) ? data.blocks : [],
			});
		})
		.catch(() => {
			//プラグインがない、権限がない、など
			setTranslationConfig({ ...translationConfig, loaded: true, plugin: false });
		});
};

const subscribeConfig = (listener: () => void) => {
	configListeners.add(listener);
	return () => {
		configListeners.delete(listener);
	};
};

export const useTranslationConfig = (): TranslationConfig => {
	React.useEffect(requestTranslationConfig, []);
	return React.useSyncExternalStore(subscribeConfig, () => translationConfig);
};

/** そのブロックの自動翻訳を使えるか（プラグインが入っていて、エンジンがあり、設定で対象に選ばれている） */
export const canTranslateBlock = (
	config: TranslationConfig,
	blockName: string,
): boolean => config.plugin && config.engine && config.blocks.includes(blockName);

/* ------------------------------
  自動翻訳
  ------------------------------
  slug-translater プラグインの REST（設定画面で選んだ翻訳エンジンを使う）に頼む。
  プラグインがない、エンジンが未設定、API のエラーのときは、理由の文字を返す。 */
export type TranslateResult = { ok: true; text: string } | { ok: false; message: string };

export const translateText = async (
	text: string,
	target: string,
	source: string = DEFAULT_LANG,
): Promise<TranslateResult> => {
	try {
		const res = (await apiFetch({
			path: "/slug-translater/v1/translate",
			method: "POST",
			data: { text, source, target },
		})) as { code?: number | string; text?: string };
		if (Number(res.code) === 0 && typeof res.text === "string") {
			return { ok: true, text: res.text };
		}
		return { ok: false, message: String(res.text ?? "Translation failed.") };
	} catch (error) {
		const message =
			error && typeof error === "object" && "message" in error
				? String((error as { message: unknown }).message)
				: "Translation failed.";
		return { ok: false, message };
	}
};
