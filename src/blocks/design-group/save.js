import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { ServerStyleSheet } from "styled-components";
import { renderToString } from "react-dom/server";
import { StyleComp } from "./StyleGroup";

export default function save({ attributes }) {
	const { is_menu, is_submenu, is_anime, anime_prm, is_swiper } = attributes;

	const blockProps = useBlockProps.save();

	//styled-componentsのHTML化
	const sheet = new ServerStyleSheet();
	const html = renderToString(
		sheet.collectStyles(<StyleComp attributes={attributes} />),
	);

	//スタイルシートの生成
	const styleTags = sheet.getStyleTags();

	// div要素を抽出する正規表現
	const divRegex = /<div[^>]*>/g;
	// 属性を抽出するための正規表現
	const attrRegex = /([^\s=]+)="([^"]*)"/g;

	const divs = html.match(divRegex);
	const divObjects = divs.map((div) => {
		const attributes = {};
		let match;
		while ((match = attrRegex.exec(div)) !== null) {
			const [fullMatch, key, value] = match;
			attributes[key] = value;
		}
		return attributes;
	});

	const ContentComponent = ({ blockProps, is_anime, anime_prm }) => {
		return (
			<div {...blockProps}>
				<div
					className={`group_contents ${is_anime ? "fadeTrigger" : ""}`}
					data-is_anime={is_anime}
					data-anime_prm={JSON.stringify(anime_prm)}
				>
					<InnerBlocks.Content />
				</div>
				<div
					className="itmar_style_div"
					dangerouslySetInnerHTML={{ __html: styleTags }}
				/>
			</div>
		);
	};

	const renderNestedDivs = (divObjects) => {
		if (!divObjects.length) {
			return (
				<ContentComponent
					blockProps={blockProps}
					is_anime={is_anime}
					anime_prm={anime_prm}
				/>
			);
		}

		return divObjects.reduceRight(
			(inner, divObject) => {
				// 'class'属性を除く'data-swiper-parallax'で始まる属性を抽出
				const { class: className, ...parallaxAttrs } = divObject;
				const attrs = {
					className,
					...parallaxAttrs,
				};
				// div要素に属性を適用
				return <div {...attrs}>{inner}</div>;
			},
			<ContentComponent
				blockProps={blockProps}
				is_anime={is_anime}
				anime_prm={anime_prm}
			/>,
		);
	};

	return (
		<>
			{is_menu && !is_submenu && (
				<>
					<div className="itmar_hamberger_btn">
						<span></span>
						<span></span>
						<span></span>
					</div>
					<div className="itmar_back_ground"></div>
				</>
			)}
			{renderNestedDivs(divObjects)}
		</>
	);
}
