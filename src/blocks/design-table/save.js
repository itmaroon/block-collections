import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function save({ attributes }) {
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
		"data-col_heading": is_heading ? JSON.stringify(tableHeading) : null,
		"data-row_heading": is_rowHeading ? JSON.stringify(rowTableHeading) : null,
	};

	const blockProps = useBlockProps.save({
		"data-attributes": JSON.stringify(styleAttr),
		...heading_props,
		style: { backgroundColor: bgColor, overflow: "hidden" },
	});

	const renderCellContent = (value) => <RichText.Content value={value || ""} />;

	const renderBodyCell = (rowIndex, colIndex) => {
		const cell = tableSource[rowIndex]?.cells?.[colIndex] || {
			content: "",
			tag: "td",
		};
		const CellTag = cell.tag || "td";

		return (
			<CellTag
				key={colIndex}
				style={{
					position: "relative",
					width: columWidth[colIndex] || "auto",
					textAlign: columAlign[colIndex] || "left",
					...cell.style,
				}}
			>
				{renderCellContent(cell.content)}
			</CellTag>
		);
	};

	const renderRowHeading = (rowIndex) => (
		<th
			key="row-heading"
			scope="row"
			style={{
				position: "relative",
				backgroundClip: "padding-box",
				width: columWidth[0] || "auto",
				textAlign: columAlignTH,
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
			<table style={{ tableLayout: tableLayout || "auto" }}>
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
							{tableHeading.map((cell, index) => (
								<th
									key={index}
									style={{
										position: "relative",
										backgroundClip: "padding-box",
										width: columWidth[index],
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
					{is_data_form
						? tableSource?.map((row, rowIndex) => (
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
						: [...Array(tableColRow.rowNum)].map((_, rowIndex) => (
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
