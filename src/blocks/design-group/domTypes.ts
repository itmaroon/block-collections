/**
 * design-group の内側要素（.group_contents）に使えるタグ。
 *
 * div / form は従来からの選択肢。ほかはページの構造を表す要素で、
 * コアのグループブロックの「HTML要素」の代わりに使う。
 * スタイルとスクリプトは .group_contents のクラスで要素を探すので、
 * タグを変えても見た目と動作は変わらない。
 *
 * 【重要】save.tsx からも読むので React や @wordpress/* を import しないこと。
 */
export const SECTIONING_DOM_TYPES = [
	"main",
	"section",
	"article",
	"aside",
	"header",
	"footer",
	"nav",
] as const;

export type SectioningDomType = (typeof SECTIONING_DOM_TYPES)[number];
export type GroupDomType = "div" | "form" | SectioningDomType;

export const isSectioningDomType = (value: unknown): value is SectioningDomType =>
	typeof value === "string" &&
	(SECTIONING_DOM_TYPES as readonly string[]).includes(value);

export const isGroupDomType = (value: unknown): value is GroupDomType =>
	value === "div" || value === "form" || isSectioningDomType(value);
