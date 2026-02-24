import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { ServerStyleSheet } from "styled-components";
import { renderToString } from "react-dom/server";
import { StyleComp } from "./StyleTable";

export default function save({ attributes }) {
	const {
		dataSource,
		tableSource,
		is_heading,
		columWidth,
		columAlign,
		columAlignTH,
		tableHeading,
		bgColor,
	} = attributes;

	const blockProps = useBlockProps.save({
		style: { backgroundColor: bgColor, overflow: "hidden" },
	});

	const sheet = new ServerStyleSheet();

	// ✅ セルHTMLを安全に注入するためのヘルパ（null/undefined対策）
	const cellHtml = (v) => (typeof v === "string" ? v : "");

	// ✅ ボディはヘッダー行を除外（ヘッダー行は thead 側で描画する設計）
	const bodyRows =
		Array.isArray(tableSource) && tableSource.length > 0
			? is_heading
				? tableSource.slice(1)
				: tableSource
			: [];

	const html = renderToString(
		sheet.collectStyles(
			<div {...blockProps} data-source={dataSource}>
				<StyleComp attributes={attributes}>
					{Array.isArray(tableSource) && tableSource.length > 0 && (
						<table>
							{is_heading && tableSource[0]?.cells?.length > 0 && (
								<thead>
									<tr>
										{tableSource[0].cells.map((cell, index) => (
											<th
												key={`h-${index}`}
												style={{
													width: columWidth?.[index],
													textAlign: columAlignTH,
												}}
											>
												<RichText.Content value={tableHeading?.[index]} />
											</th>
										))}
									</tr>
								</thead>
							)}

							<tbody>
								{bodyRows.map((row, rowIndex) => (
									<tr key={`r-${rowIndex}`}>
										{row.cells.map((cell, cellIndex) => {
											// ✅ タグはホワイトリスト（th/td以外が来ても壊れない）
											const CellTag = cell.tag === "th" ? "th" : "td";

											// ✅ ここが重要：HTML文字列は children ではなく dangerouslySetInnerHTML
											// こうしないと React がエスケープしてしまう
											return (
												<CellTag
													key={`c-${rowIndex}-${cellIndex}`}
													style={{
														width: columWidth?.[cellIndex],
														textAlign: columAlign?.[cellIndex],
													}}
												>
													<span
														dangerouslySetInnerHTML={{
															__html: cellHtml(cell.content),
														}}
													/>
												</CellTag>
											);
										})}
									</tr>
								))}
							</tbody>
						</table>
					)}
				</StyleComp>
			</div>,
		),
	);

	const styleTags = sheet.getStyleTags();

	return (
		<>
			<div dangerouslySetInnerHTML={{ __html: html }} />
			<div dangerouslySetInnerHTML={{ __html: styleTags }} />
		</>
	);
}
