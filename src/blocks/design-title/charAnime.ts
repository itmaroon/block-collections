/**
 * 文字ごとのアニメーション（順次表示・せり上がり）。
 *
 * 保存される HTML には手を入れない。表示のとき（view.ts）に、見出しの文字を 1 文字ずつの span に分け、
 * CSS（style.scss）の transition を、文字ごとにずらした遅延で動かす。
 * エディターのプレビューも、同じ分割（splitCharsHtml）を使う。
 */
import type { CSSProperties } from "react";

export type CharAnimePattern = "fade" | "rise";
export type CharAnimeTrigger = "visible" | "slide";

export interface CharAnime {
	/** fade: 1 文字ずつ現れる / rise: 1 文字ずつ、下からせり上がる */
	pattern: CharAnimePattern;
	/** visible: 画面に入ったとき / slide: 入っているスライドが表示されたとき */
	trigger: CharAnimeTrigger;
	/** 文字と文字の開始のずれ（秒） */
	stagger: number;
	/** 1 文字の動きの長さ（秒） */
	duration: number;
	/** 最初の文字が動き出すまで（秒） */
	delay: number;
}

export const CHAR_ANIME_DEFAULT: CharAnime = {
	pattern: "rise",
	trigger: "visible",
	stagger: 0.05,
	duration: 0.7,
	delay: 0,
};

const PATTERNS: readonly string[] = ["fade", "rise"];
const TRIGGERS: readonly string[] = ["visible", "slide"];

const clampNum = (v: unknown, min: number, max: number, fallback: number) => {
	const n = Number(v);
	return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
};

/**
 * 保存された値を、使える形にそろえる。パターンが無い・正しくないときは null（アニメーションなし）。
 * 値は CSS に書き込むので、数値は範囲に収める。
 */
export const normalizeCharAnime = (v: unknown): CharAnime | null => {
	const o = (v ?? {}) as Partial<Record<keyof CharAnime, unknown>>;
	if (typeof o.pattern !== "string" || !PATTERNS.includes(o.pattern)) {
		return null;
	}
	return {
		pattern: o.pattern as CharAnimePattern,
		trigger: TRIGGERS.includes(o.trigger as string)
			? (o.trigger as CharAnimeTrigger)
			: CHAR_ANIME_DEFAULT.trigger,
		stagger: clampNum(o.stagger, 0, 1, CHAR_ANIME_DEFAULT.stagger),
		duration: clampNum(o.duration, 0.05, 5, CHAR_ANIME_DEFAULT.duration),
		delay: clampNum(o.delay, 0, 10, CHAR_ANIME_DEFAULT.delay),
	};
};

/** 見出しに当てる CSS 変数（style.scss が読む） */
export const charAnimeVars = (c: CharAnime): CSSProperties =>
	({
		"--char-stagger": `${c.stagger}s`,
		"--char-duration": `${c.duration}s`,
		"--char-delay": `${c.delay}s`,
	}) as CSSProperties;

/** 英数字などの単語は、途中で折り返さないよう、まとめて 1 つの塊にする（日本語は 1 文字ずつ折り返せる） */
const WORD_CHAR = /[A-Za-z0-9\u00C0-\u024F'’\-&.,!?:;]/;

const graphemes = (text: string): string[] => {
	const Seg = (
		Intl as unknown as {
			Segmenter?: new (
				l?: string,
				o?: { granularity: string },
			) => { segment: (s: string) => Iterable<{ segment: string }> };
		}
	).Segmenter;
	if (Seg) {
		return Array.from(
			new Seg(undefined, { granularity: "grapheme" }).segment(text),
			(s) => s.segment,
		);
	}
	return Array.from(text);
};

/**
 * 見出しの HTML の文字を、1 文字ずつの span に分けた HTML を返す。
 * 太字・リンクなどのタグと <br> は残し、空白は分けない。count は動かす文字の数。
 * 読み上げ用に、分けた側は aria-hidden にする（元の文字は、呼び出し側が aria-label に持たせる）。
 */
export const splitCharsHtml = (html: string): { html: string; count: number } => {
	const tpl = document.createElement("template");
	tpl.innerHTML = html;
	let index = 0;

	const makeChar = (ch: string): HTMLSpanElement => {
		const outer = document.createElement("span");
		outer.className = "itmar-char";
		outer.style.setProperty("--i", String(index++));
		const inner = document.createElement("span");
		inner.className = "itmar-char-in";
		inner.textContent = ch;
		outer.appendChild(inner);
		return outer;
	};

	const split = (node: Node) => {
		Array.from(node.childNodes).forEach((child) => {
			if (child.nodeType === Node.ELEMENT_NODE) {
				split(child);
				return;
			}
			if (child.nodeType !== Node.TEXT_NODE) return;
			const frag = document.createDocumentFragment();
			let word: HTMLSpanElement | null = null;
			graphemes(child.textContent ?? "").forEach((g) => {
				if (/^\s+$/.test(g)) {
					word = null;
					frag.appendChild(document.createTextNode(g));
					return;
				}
				const el = makeChar(g);
				if (WORD_CHAR.test(g)) {
					if (!word) {
						word = document.createElement("span");
						word.className = "itmar-char-word";
						frag.appendChild(word);
					}
					word.appendChild(el);
				} else {
					word = null;
					frag.appendChild(el);
				}
			});
			child.parentNode?.replaceChild(frag, child);
		});
	};
	split(tpl.content);

	const holder = document.createElement("div");
	holder.appendChild(tpl.content);
	holder.querySelectorAll(".itmar-char-word, :scope > .itmar-char, .itmar-char").forEach((el) => {
		el.setAttribute("aria-hidden", "true");
	});
	return { html: holder.innerHTML, count: index };
};
