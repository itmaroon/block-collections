import { useBlockProps, InnerBlocks, RichText } from "@wordpress/block-editor";
import { ServerStyleSheet } from "styled-components";
import { renderToString } from "react-dom/server";
import { StyleComp } from "./StyleWapper";
import { format, getSettings } from "@wordpress/date";

export default function save({ attributes }) {
	const {
		headingType,
		align,
		titleType,
		headingContent,
		optionStyle,
		dateFormat,
		userFormat,
		linkKind,
		menu_pos,
		is_title_menu,
		selectedPageUrl,
		isBlank,
	} = attributes;

	//テキストの配置
	const align_style =
		align === "center"
			? { marginLeft: "auto", marginRight: "auto" }
			: align === "right"
			? { marginLeft: "auto" }
			: {};

	const blockProps = useBlockProps.save({
		style: {
			position: `${is_title_menu ? "relative" : "static"}`,
			...align_style,
		},
	});

	const sheet = new ServerStyleSheet();

	//リッチテキストをコンテンツにする
	const renderRichText = () => {
		//タイトルタイプがdateのときは日付のフォーマットを当てて表示
		const dispContent =
			titleType === "date"
				? format(dateFormat, headingContent, getSettings())
				: headingContent;
		return <RichText.Content tagName={headingType} value={dispContent} />;
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

	const html = renderToString(
		sheet.collectStyles(
			<StyleComp attributes={attributes}>
				{linkKind === "none" || linkKind === "submenu"
					? content
					: linkKind === "login"
					? logon_btn
					: linkContent}
			</StyleComp>,
		),
	);
	const styleTags = sheet.getStyleTags();

	return (
		<div
			{...blockProps}
			data-title_type={titleType}
			data-date_format={dateFormat}
			data-user_format={userFormat}
		>
			<div dangerouslySetInnerHTML={{ __html: html }} />

			{linkKind === "submenu" && (
				<div
					className={`submenu-block ${menu_pos.replace(/ /g, "_")} ${
						!is_title_menu ? "mobile_horizen" : "mobile_virtical"
					}`}
				>
					<InnerBlocks.Content />
				</div>
			)}
			<div
				className="itmar_style_div"
				dangerouslySetInnerHTML={{ __html: styleTags }}
			/>
		</div>
	);
}
