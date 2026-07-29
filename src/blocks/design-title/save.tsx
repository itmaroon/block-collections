import { useBlockProps, InnerBlocks, RichText } from "@wordpress/block-editor";
import * as React from "react";

import { formatStoredTitleDate } from "./date";

import { displayFormated } from "itmar-block-packages";
import type { TitleOptionStyle, TitleSaveProps } from "./types";

const toOptionStyleObject = (value: unknown): TitleOptionStyle => {
	if (value && typeof value === "object" && !Array.isArray(value)) {
		return value as TitleOptionStyle;
	}
	return {};
};

export default function save({ attributes }: TitleSaveProps) {
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
		selectedPageUrl,
		isBlank,
		dateValue,
		...styleAttributes
	} = attributes;

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
				? formatStoredTitleDate(headingContent, dateValue, userFormat)
				: displayFormated(headingContent, userFormat, freeStrFormat, decimal);
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

	const wrappedContent =
		linkKind === "none" || linkKind === "submenu" ? (
			<div className="itmar-wrap">{content}</div>
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
		>
			{wrappedContent}

			{linkKind === "submenu" && (
				<div
					className={`submenu-block ${menu_pos.replace(/ /g, "_")} ${
						!is_title_menu ? "mobile_horizen" : "mobile_virtical"
					}`}
				>
					<InnerBlocks.Content />
				</div>
			)}
		</div>
	);
}
