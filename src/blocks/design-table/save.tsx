import { useBlockProps, RichText } from "@wordpress/block-editor";
import type { CSSProperties, ElementType } from "react";
import type { DesignTableSaveProps, TableRow } from "./types";

type CssTableLayout = CSSProperties["tableLayout"];
type CssTextAlign = CSSProperties["textAlign"];

export default function save({ attributes }: DesignTableSaveProps) {
	const {
		tableSource,
		is_data_form,
		defineID,
		tableColRow,
		is_heading,
		is_rowHeading,
		columWidth,
		columAlign,
		columAlignTH,
		tableHeading,
		rowTableHeading,
		tableLayout,
		clickCellPos,
		bgColor,
		...styleAttr
	} = attributes;

	//ヘッダー情報を生成
	const heading_props = {
		"data-col_heading": is_heading ? JSON.stringify(tableHeading) : undefined,
		"data-row_heading": is_rowHeading
			? JSON.stringify(rowTableHeading)
			: undefined,
	};

	const blockProps = useBlockProps.save({
		"data-attributes": JSON.stringify(styleAttr),
		...heading_props,
		style: { backgroundColor: bgColor, overflow: "hidden" },
	});

	const cssTableLayout = (tableLayout || "auto") as CssTableLayout;
	const cssColumnHeaderAlign = columAlignTH as CssTextAlign;

	const renderCellContent = (value?: string) => (
		<RichText.Content value={value || ""} />
	);

	const renderBodyCell = (rowIndex: number, colIndex: number) => {
		const cell = tableSource[rowIndex]?.cells?.[colIndex] || {
			content: "",
			tag: "td",
		};
		const CellTag = (cell.tag || "td") as ElementType;

		return (
			<CellTag
				key={colIndex}
				style={{
					position: "relative",
					width: columWidth[colIndex] || "auto",
					textAlign: (columAlign[colIndex] || "left") as CssTextAlign,
					...cell.style,
				}}
			>
				{renderCellContent(cell.content)}
			</CellTag>
		);
	};

	const renderRowHeading = (rowIndex: number) => (
		<th
			key="row-heading"
			scope="row"
			style={{
				position: "relative",
				backgroundClip: "padding-box",
				width: columWidth[0] || "auto",
				textAlign: cssColumnHeaderAlign,
			}}
		>
			<RichText.Content value={rowTableHeading?.[rowIndex] || ""} />
		</th>
	);

	const columnIndexes = [...Array(tableColRow.colNum)]
		.map((_, colIndex) => colIndex)
		.slice(is_rowHeading ? 1 : 0);

	return (
		<div {...blockProps} data-define_id={defineID}>
			<table style={{ tableLayout: cssTableLayout }}>
				{is_heading && tableHeading.length > 0 && (
					<colgroup>
						{tableHeading.map((_, i) => (
							<col key={i} style={{ width: columWidth[i] || "auto" }} />
						))}
					</colgroup>
				)}
				{is_heading && tableHeading.length > 0 && (
					<thead>
						<tr>
							{tableHeading.map((cell: string, index: number) => (
								<th
									key={index}
									style={{
										position: "relative",
										backgroundClip: "padding-box",
										width: columWidth[index],
									textAlign: cssColumnHeaderAlign,
									}}
								>
									<RichText.Content value={tableHeading?.[index]} />
								</th>
							))}
						</tr>
					</thead>
				)}

				<tbody>
					{is_data_form
					? tableSource?.map((row: TableRow, rowIndex: number) => (
								<tr key={rowIndex}>
									{is_rowHeading && renderRowHeading(rowIndex)}
									{tableHeading
										.slice(is_rowHeading ? 1 : 0)
										.map((_, renderColIndex) => {
											const colIndex = is_rowHeading
												? renderColIndex + 1
												: renderColIndex;
											return renderBodyCell(rowIndex, colIndex);
										})}
								</tr>
						  ))
						: [...Array(tableColRow.rowNum)].map((_, rowIndex: number) => (
								<tr key={rowIndex}>
									{is_rowHeading && renderRowHeading(rowIndex)}
									{columnIndexes.map((colIndex) =>
										renderBodyCell(rowIndex, colIndex),
									)}
								</tr>
						  ))}
				</tbody>
			</table>
		</div>
	);
}
