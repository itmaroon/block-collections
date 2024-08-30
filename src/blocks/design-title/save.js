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
		dateFormat,
		linkKind,
		menu_pos,
		is_title_menu,
		selectedPageUrl,
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
	//コンテンツの選択
	const content =
		titleType === "plaine" || titleType === "date"
			? renderRichText()
			: renderElement();

	//フロントエンドに出力
	const html = renderToString(
		sheet.collectStyles(
			<StyleComp attributes={attributes}>
				{linkKind === "none" || linkKind === "submenu" ? (
					content
				) : (
					<a href={selectedPageUrl}>{content}</a>
				)}
			</StyleComp>,
		),
	);
	const styleTags = sheet.getStyleTags();

	return (
		<div {...blockProps} data-date_format={dateFormat}>
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
