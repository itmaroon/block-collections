import type { CSSProperties } from "react";
import type { BoxValues } from "../../shared/types";
import type { FluidSize } from "./headingSize";
import type { CharAnime } from "./charAnime";

export type TitleOptionStyle = Record<string, any>;

export type UnderLineDirection = "center" | "right" | "left";

export interface UnderLineProp {
	width: string;
	height: string;
	distance: string;
	is_anime: boolean;
	direction?: UnderLineDirection;
}

export interface TitleStyleScopes {
	root: string;
	inner: string;
	/** サブタイトルなどの文字を出す言語。省略すると、いま表示している言語 */
	lang?: string;
}

/** モバイルでのサブメニューの開き方。
 *  "virtical" = アコーディオン（真下に展開）／"horizen" = 横からスライドする板。
 *  未設定のときは is_title_menu から導く（既存ブロックの保存内容を変えないため）。 */
export type MobileSubmenuMode = "virtical" | "horizen";

export interface TitleAttributes {
	/** 文字列、または言語コードをキーにした文字列のオブジェクト（lang.ts） */
	headingContent?: string | Record<string, string>;
	/** クリックしたときに、表示言語をこの言語（"JP" "EN" など）に切り替える。既存ブロックの保存内容を変えないため、既定値は持たない */
	langSwitch?: string;
	/** 手で直した翻訳の言語（{EN:true}）。自動翻訳で上書きしない。既定値は持たない */
	langManual?: Record<string, boolean>;
	uniqueID?: string;
	headingType: string;
	/**
	 * 見出しの文字サイズ。もう使っていない（サイズはテーマの theme.json が
	 * styles.elements.h1〜h6 で持つ）。save() が全属性を data-attributes に
	 * 書き出すため、消すと既存ブロックの検証が壊れる。互換のために残す。
	 */
	defaultHeadingSize: string;
	/** @deprecated defaultHeadingSize と同じ理由で残している。 */
	mobileHeadingSize: string;
	titleType: string;
	userFormat: string;
	freeStrFormat: string;
	decimal: number;
	isMenuItem: boolean;
	headingID?: string;
	linkKind: string;
	menu_pos: string;
	mobile_submenu?: MobileSubmenuMode;
	/** 見出しの文字サイズを、テーマの H1〜H6 のサイズで指定する（"h1"〜"h6"）。未設定ならタグ本来のサイズ。
	 *  既存ブロックの保存内容を変えないため、既定値は持たない */
	headingSizeDesktop?: string;
	headingSizeMobile?: string;
	/** headingSizeDesktop / headingSizeMobile が "fluid" のときの、最小・画面幅の割合・最大 */
	headingFluidDesktop?: FluidSize;
	headingFluidMobile?: FluidSize;
	/** 文字ごとのアニメーション（順次表示・せり上がり）。未設定ならなし */
	charAnime?: CharAnime;
	is_title_menu: boolean;
	selectedSlug: string;
	selectedPageUrl: string;
	isBlank: boolean;
	align: string;
	isVertical: boolean;
	padding_heading: BoxValues;
	optionStyle: TitleOptionStyle;
	isIdle: boolean;
	shadow_element: Record<string, unknown>;
	shadow_result?: Record<string, string | number>;
	is_shadow: boolean;
	is_underLine: boolean;
	is_wrap: boolean;
	is_waiting: boolean;
	waiting_state: string;
	underLine_prop: UnderLineProp;
	bgColor_underLine?: string;
	bgGradient_underLine?: string;
	block_style?: Record<string, unknown> | null;
	dateValue?: string;
	className?: string;
	[key: string]: any;
}

export interface TitleEditProps {
	attributes: TitleAttributes;
	setAttributes: (attributes: Partial<TitleAttributes>) => void;
	clientId: string;
}

export interface TitleSaveProps {
	attributes: TitleAttributes;
}

export interface ShadowStyleResult {
	style: CSSProperties;
}

export interface SiteInfoResponse {
	name?: string;
	description?: string;
}

export interface CurrentUserResponse {
	is_logged_in?: boolean;
	display_name?: string;
	avatar_url?: string;
}

export interface NoticesActions {
	createNotice: (
		status: string,
		content: string,
		options?: Record<string, unknown>,
	) => void;
}
