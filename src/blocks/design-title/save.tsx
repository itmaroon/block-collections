import { useBlockProps, InnerBlocks, RichText } from "@wordpress/block-editor";
import * as React from "react";

import { formatStoredTitleDate } from "./date";
import { defaultText, isLangMap } from "./lang";

import { displayFormated } from "itmar-block-packages";
import type { TitleOptionStyle, TitleSaveProps } from "./types";

const toOptionStyleObject = (value: unknown): TitleOptionStyle => {
	if (value && typeof value === "object" && !Array.isArray(value)) {
		return value as TitleOptionStyle;
	}
	return {};
};

/**
 * 保存する数値・金額の書式は、サイトの言語で変えない（共有パッケージの displayFormated は、サイトの言語で書式を決めるので、
 * 言語が違うサイトに移すと、保存された内容と食い違って、ブロックが無効になる）。金額は日本円なので、日本語の書式にそろえる。
 * サイトの言語での表示は、表示のとき（query-blocks などの front）に整える。サイトの言語で保存した昔の内容は、legacySave（deprecated）で読む。
 */
const NUMBER_FORMATS: Record<string, Intl.NumberFormatOptions> = {
	num_comma: { style: "decimal", useGrouping: true },
	num_no_comma: { style: "decimal", useGrouping: false },
	num_amount: { style: "currency", currency: "JPY" },
};
export const displayFormatedForSave = (
	content: any,
	userFormat: string | undefined,
	freeStrFormat: string,
	decimal: number,
): string => {
	const base = userFormat ? NUMBER_FORMATS[userFormat] : undefined;
	if (!base) {
		return displayFormated(content, userFormat, freeStrFormat, decimal);
	}
	if (content === undefined || content === null) return "";
	const numeric = typeof content === "number" ? content : parseFloat(content);
	if (isNaN(numeric)) return String(content);
	const options: Intl.NumberFormatOptions = { ...base };
	if (typeof decimal === "number" && decimal > 0) {
		options.minimumFractionDigits = decimal;
		options.maximumFractionDigits = decimal;
	}
	try {
		return new Intl.NumberFormat("ja", options).format(numeric);
	} catch (e) {
		return String(content);
	}
};

/**
 * data-lang-texts の JSON を属性に入れるときの &。
 * WordPress の属性の出力は、&quot; のような文字参照に見える & を、そのまま残す（&amp; にしない）。
 * 翻訳エンジンが返した &quot; などが JSON の中にあると、読み込んだときに " に戻って、JSON が壊れる。
 * 文字参照に見える & だけ \u0026 にして、JSON のまま運ぶ（ふつうの & は、これまでどおり &amp; になるので、保存内容は変わらない）。
 */
const ENTITY_AMPERSAND = /&(?=([a-z0-9]+|#[0-9]+|#x[a-f0-9]+);)/gi;
const protectEntities = (json: string): string =>
	json.replace(ENTITY_AMPERSAND, "\\u0026");

export function createSave(
	format: typeof displayFormated,
	protectLangEntities = true,
) {
	return function save({ attributes }: TitleSaveProps) {
	const {
		headingType,
		uniqueID,
		//align,
		titleType,
		headingContent,
		optionStyle,
		userFormat,
		freeStrFormat,
		decimal,
		linkKind,
		menu_pos,
		is_title_menu,
		mobile_submenu,
		selectedPageUrl,
		isBlank,
		dateValue,
		headingSizeDesktop,
		headingSizeMobile,
		headingFluidDesktop,
		headingFluidMobile,
		charAnime,
		langSwitch,
		langManual,
		...styleAttributes
	} = attributes;

	/*
	 * 言語ごとの文字を持つタイトル。保存する文字は既定の言語のもの。全言語の文字は data-lang-texts に持ち、
	 * 表示のとき（view.ts）に Cookie の言語へ差し替える。
	 * 言語を分けていないタイトルには、どちらの属性も出さない（既存のブロックの保存内容は変わらない）。
	 */
	const langMap =
		titleType === "plaine" && isLangMap(headingContent) ? headingContent : null;
	const shownContent = isLangMap(headingContent)
		? defaultText(headingContent)
		: headingContent;
	const langTextsJson = langMap
		? JSON.stringify(
				Object.fromEntries(
					Object.entries(langMap).map(([code, text]) => [
						code,
						format(text, userFormat, freeStrFormat, decimal),
					]),
				),
		  )
		: undefined;
	const langTexts =
		langTextsJson !== undefined && protectLangEntities
			? protectEntities(langTextsJson)
			: langTextsJson;

	//テキストの配置
	// const align_style: CSSProperties =
	// 	align === "center"
	// 		? { marginLeft: "auto", marginRight: "auto" }
	// 		: align === "right"
	// 		? { marginLeft: "auto" }
	// 		: {};
	const optionStyleObj = toOptionStyleObject(optionStyle);
	const dataAttributes: Record<string, unknown> = {
		...styleAttributes,
		headingType,
		linkKind,
		menu_pos,
	};

	if (Object.keys(optionStyleObj).length > 0) {
		dataAttributes.optionStyle = optionStyleObj;
	}
	/*
	 * 後から足した属性。編集した順にキーが末尾へ足される一方、読み直したときの再生成は
	 * 定義順になり、並びが食い違って無効になる。出力位置を最後に固定し、
	 * 未設定のときは出さない（既存のブロックの保存内容は変わらない）。
	 */
	if (headingSizeDesktop !== undefined) {
		dataAttributes.headingSizeDesktop = headingSizeDesktop;
	}
	if (headingSizeMobile !== undefined) {
		dataAttributes.headingSizeMobile = headingSizeMobile;
	}
	if (headingFluidDesktop !== undefined) {
		dataAttributes.headingFluidDesktop = headingFluidDesktop;
	}
	if (headingFluidMobile !== undefined) {
		dataAttributes.headingFluidMobile = headingFluidMobile;
	}
	if (charAnime !== undefined) {
		dataAttributes.charAnime = charAnime;
	}
	const blockProps = useBlockProps.save({
		"data-attributes": JSON.stringify(dataAttributes),
		style: {
			position: `${is_title_menu ? "relative" : "static"}`,
			//...align_style,
		},
	});

	//リッチテキストをコンテンツにする
	const renderRichText = () => {
		//フォーマットを当てて表示
		const formatedValue =
			titleType === "date"
				? formatStoredTitleDate(shownContent, dateValue, userFormat)
				: format(shownContent, userFormat, freeStrFormat, decimal);
		return (
			<RichText.Content tagName={headingType as any} value={formatedValue} />
		);
	};

	//ヘッダー要素をコンテンツにする
	const renderElement = () =>
		React.createElement(headingType.toLowerCase(), {
			className: `itmar_${titleType}_title`,
		});

	// アイコン画像の条件判定
	const isIcon = optionStyleObj.isIcon;
	const iconType = optionStyleObj.icon_style?.icon_type;
	const iconImg =
		(iconType === "image" || iconType === "avatar") && isIcon
			? React.createElement("img", {
					className: "itmar_avatar_url",
					alt: "",
					"aria-hidden": true,
			  })
			: null;
	//コンテンツの選択
	let content =
		titleType === "plaine" || titleType === "date"
			? renderRichText()
			: renderElement();
	// ラッパーを使わず複数要素を並べる
	if (iconImg) {
		content = React.createElement(React.Fragment, {}, content, iconImg);
	}
	//リンクをフロントエンドに出力
	// const linkContent = isBlank ? (
	// 	<a href={selectedPageUrl} target="_blank">
	// 		{content}
	// 	</a>
	// ) : (
	// 	<a href={selectedPageUrl}>{content}</a>
	// );

	//ログオンボタン処理
	const logon_btn = (
		<div
			id="itmar_logon_btn"
			data-logon_url={selectedPageUrl}
			data-target={isBlank}
		>
			{content}
		</div>
	);

	const open_modal_btn = (
		<div className="modal_open_btn" data-modal_id={selectedPageUrl}>
			{content}
		</div>
	);

	//言語切替。押すと、表示言語を data-lang の言語に切り替える（view.ts）
	const lang_switch_btn = (
		<div
			className="lang_switch_btn"
			data-lang={langSwitch}
			role="button"
			tabIndex={0}
		>
			{content}
		</div>
	);

	const wrappedContent =
		linkKind === "none" || linkKind === "submenu" ? (
			<div className="itmar-wrap">{content}</div>
		) : linkKind === "lang" ? (
			<div className="itmar-wrap">{lang_switch_btn}</div>
		) : linkKind === "login" ? (
			<div className="itmar-wrap">{logon_btn}</div>
		) : linkKind === "open" ? (
			<div className="itmar-wrap">{open_modal_btn}</div>
		) : isBlank ? (
			<a href={selectedPageUrl} target="_blank" rel="noopener noreferrer">
				<div className="itmar-wrap">{content}</div>
			</a>
		) : (
			<a href={selectedPageUrl}>
				<div className="itmar-wrap">{content}</div>
			</a>
		);

	return (
		<div
			{...blockProps}
			data-title_type={titleType}
			data-user_format={userFormat}
			data-free_format={freeStrFormat}
			data-decimal={decimal}
			data-unique_id={uniqueID}
				data-lang-texts={langTexts}
		>
			{wrappedContent}

			{linkKind === "submenu" && (
				<div
					className={`submenu-block ${menu_pos.replace(/ /g, "_")} mobile_${
						mobile_submenu ?? (is_title_menu ? "virtical" : "horizen")
					}`}
				>
					<InnerBlocks.Content />
				</div>
			)}
		</div>
	);
	};
}

export default createSave(displayFormatedForSave);

/** 昔の save()（サイトの言語で書式を決めていたもの） */
export const legacySave = createSave(displayFormated);

/** 文字参照の & を守る前の save()（&quot; などを含む翻訳で、data-lang-texts の JSON が壊れていたもの） */
export const entityLegacySave = createSave(displayFormatedForSave, false);
