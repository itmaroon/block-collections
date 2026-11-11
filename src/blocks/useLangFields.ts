import { useEffect, useRef } from "@wordpress/element";
import { useDispatch } from "@wordpress/data";
import {
	DEFAULT_LANG,
	canTranslateBlock,
	defaultText,
	textForLang,
	translateText,
	useEditLang,
	useTranslationConfig,
	withLangText,
	type LangOption,
} from "./design-title/lang";

/**
 * 言語ごとの文字を持つ項目を、ブロックの編集画面で扱うための共通のフック。
 * design-button で作った仕組み（編集言語の切り替え、既定言語を書き換えたあとの自動翻訳、
 * 手で直した言語を上書きしない印 langManual）を、フォーム系のブロックでも使えるように切り出したもの。
 *
 * 項目は、キー名ごとに「属性からの読み出し」と「書き込み用の属性の差分」を渡す。
 * 属性 langManual は { 項目キー: { 言語: true } } の形（block.json に type: object で宣言する）。
 */
export type LangFieldDef<A> = {
	get: (attributes: A) => unknown;
	patch: (attributes: A, value: any) => Partial<A>;
};

type WithManual = { langManual?: Record<string, Record<string, boolean>> };

export function useLangFields<A extends WithManual, K extends string>({
	blockName,
	attributes,
	setAttributes,
	fields,
	/** 自動翻訳で日本語から訳す前に、文字を整える（例: 必須項目の語尾など）。省略可 */
	enabled = true,
}: {
	blockName: string;
	attributes: A;
	setAttributes: (patch: Partial<A>) => void;
	fields: Record<K, LangFieldDef<A>>;
	enabled?: boolean;
}) {
	const keys = Object.keys(fields) as K[];
	const translationConfig = useTranslationConfig();
	const langOptions: LangOption[] = translationConfig.languages;
	const hasMultiLang = enabled && langOptions.length > 1;
	const canAutoTranslate = canTranslateBlock(translationConfig, blockName);
	const editLang = useEditLang();
	const activeLang = hasMultiLang ? editLang : DEFAULT_LANG;
	const otherLangs = langOptions
		.map((l) => l.value)
		.filter((code) => code !== DEFAULT_LANG);

	//非同期の翻訳が終わったときに、最新の属性を読むための参照
	const latestRef = useRef(attributes);
	latestRef.current = attributes;
	const translateTimers = useRef<Record<string, number>>({});
	useEffect(
		() => () =>
			Object.values(translateTimers.current).forEach((t) =>
				window.clearTimeout(t),
			),
		[],
	);
	const { createNotice } = useDispatch("core/notices") as {
		createNotice: (
			status: string,
			content: string,
			options?: Record<string, unknown>,
		) => void;
	};

	/**
	 * 既定の言語の文字を、指定した言語に自動翻訳して入れる。
	 * 手で直した言語は、force が true のとき（ボタンで頼んだとき）以外は上書きしない。
	 */
	const autoTranslateField = async (
		key: K,
		langs: string[],
		force: boolean,
	) => {
		const field = fields[key];
		const source = defaultText(field.get(latestRef.current));
		if (!source.trim()) return;
		const results: Record<string, string> = {};
		for (const lang of langs) {
			if (!force && latestRef.current.langManual?.[key]?.[lang]) continue;
			const res = await translateText(source, lang);
			if (!res.ok) {
				createNotice("error", res.message, {
					type: "snackbar",
					isDismissible: true,
				});
				return;
			}
			results[lang] = res.text;
		}
		if (Object.keys(results).length === 0) return;
		const cur = latestRef.current;
		let next = field.get(cur);
		const manual = { ...(cur.langManual ?? {}) };
		const fieldManual = { ...(manual[key] ?? {}) };
		Object.entries(results).forEach(([lang, text]) => {
			next = withLangText(next, lang, text);
			delete fieldManual[lang];
		});
		if (Object.keys(fieldManual).length) manual[key] = fieldManual;
		else delete manual[key];
		const patch = {
			...field.patch(cur, next),
			langManual: Object.keys(manual).length ? manual : undefined,
		} as Partial<A>;
		latestRef.current = { ...cur, ...patch };
		setAttributes(patch);
	};

	/** 編集中の言語の文字を書き込む */
	const setFieldText = (key: K, text: string) => {
		const field = fields[key];
		const next = withLangText(field.get(attributes), activeLang, text);
		if (activeLang === DEFAULT_LANG) {
			setAttributes(field.patch(attributes, next));
			//既定の言語を書き換えたら、少し待って、ほかの言語を自動翻訳する
			if (canAutoTranslate) {
				window.clearTimeout(translateTimers.current[key]);
				translateTimers.current[key] = window.setTimeout(() => {
					autoTranslateField(key, otherLangs, false);
				}, 1500);
			}
		} else {
			//ほかの言語を手で直したら、自動翻訳で上書きしない印を付ける
			setAttributes({
				...field.patch(attributes, next),
				langManual: {
					...(attributes.langManual ?? {}),
					[key]: { ...(attributes.langManual?.[key] ?? {}), [activeLang]: true },
				},
			} as Partial<A>);
		}
	};

	/** 編集中の言語の文字（その言語がなければ既定の言語の文字） */
	const fieldText = (key: K): string =>
		textForLang(fields[key].get(attributes), activeLang);

	/** 編集中の言語を、全項目まとめて翻訳し直す */
	const retranslateAll = async () => {
		for (const key of keys) {
			await autoTranslateField(key, [activeLang], true);
		}
	};
	const isManualLang = keys.some(
		(key) => attributes.langManual?.[key]?.[activeLang],
	);

	return {
		langOptions,
		hasMultiLang,
		canAutoTranslate,
		activeLang,
		fieldText,
		setFieldText,
		retranslateAll,
		isManualLang,
	};
}

/**
 * 保存する HTML に、全言語の文字を持たせるための値（data-lang-texts）。
 * どの項目も言語を分けていない（文字列のまま）ときは undefined を返す。
 * → 昔のブロックは、保存内容が変わらず、検証エラーにならない。
 */
export const buildLangTexts = (
	fields: Record<string, unknown>,
): string | undefined => {
	const out: Record<string, Record<string, string>> = {};
	Object.entries(fields).forEach(([key, value]) => {
		if (value && typeof value === "object" && !Array.isArray(value)) {
			out[key] = value as Record<string, string>;
		}
	});
	return Object.keys(out).length ? JSON.stringify(out) : undefined;
};
