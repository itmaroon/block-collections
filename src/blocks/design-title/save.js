import { useBlockProps, InnerBlocks, RichText } from "@wordpress/block-editor";

import { displayFormated } from "itmar-block-packages";

export default function save({ attributes }) {
	const {
		headingType,
		uniqueID,
		align,
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
	const align_style =
		align === "center"
			? { marginLeft: "auto", marginRight: "auto" }
			: align === "right"
			? { marginLeft: "auto" }
			: {};
	const dataAttributes = {
		...styleAttributes,
		headingType,
		linkKind,
		menu_pos,
	};

	if (
		optionStyle &&
		typeof optionStyle === "object" &&
		!Array.isArray(optionStyle) &&
		Object.keys(optionStyle).length > 0
	) {
		dataAttributes.optionStyle = optionStyle;
	}
	const blockProps = useBlockProps.save({
		"data-attributes": JSON.stringify(dataAttributes),
		style: {
			position: `${is_title_menu ? "relative" : "static"}`,
			...align_style,
		},
	});

	//リッチテキストをコンテンツにする
	const renderRichText = () => {
		//フォーマットを当てて表示
		const formatedValue = displayFormated(
			headingContent,
			userFormat,
			freeStrFormat,
			decimal,
		);
		return <RichText.Content tagName={headingType} value={formatedValue} />;
	};

	//ヘッダー要素をコンテンツにする
	const renderElement = () =>
		React.createElement(headingType.toLowerCase(), {
			className: `itmar_${titleType}_title`,
		});

	// アイコン画像の条件判定
	const isIcon = optionStyle?.isIcon;
	const iconType = optionStyle?.icon_style?.icon_type;
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
	const linkContent = isBlank ? (
		<a href={selectedPageUrl} target="_blank">
			{content}
		</a>
	) : (
		<a href={selectedPageUrl}>{content}</a>
	);

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
			<div className="itmar-wrap" attributes={attributes}>
				{content}
			</div>
		) : linkKind === "login" ? (
			<div className="itmar-wrap" attributes={attributes}>
				{logon_btn}
			</div>
		) : linkKind === "open" ? (
			<div className="itmar-wrap" attributes={attributes}>
				{open_modal_btn}
			</div>
		) : isBlank ? (
			<a href={selectedPageUrl} target="_blank" rel="noopener noreferrer">
				<div className="itmar-wrap" attributes={attributes}>
					{content}
				</div>
			</a>
		) : (
			<a href={selectedPageUrl}>
				<div className="itmar-wrap" attributes={attributes}>
					{content}
				</div>
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
