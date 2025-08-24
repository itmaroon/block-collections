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
	const html = renderToString(
		sheet.collectStyles(
			<div {...blockProps} data-source={dataSource}>
				<StyleComp attributes={attributes}>
					{tableSource.length > 0 && (
						<table>
							{is_heading && (
								<thead>
									<tr>
										{tableSource[0].cells.map((cell, index) => (
											<th
												style={{
													width: columWidth[index],
													textAlign: columAlignTH,
												}}
											>
												<RichText.Content value={tableHeading[index]} />
											</th>
										))}
									</tr>
								</thead>
							)}
							<tbody>
								{tableSource.map((row) => (
									<tr>
										{row.cells.map((cell, cellIndex) => {
											const CellTag = cell.tag;
											return (
												<CellTag
													style={{
														width: columWidth[cellIndex],
														textAlign: columAlign[cellIndex],
													}}
												>
													{cell.content}
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
