import { useBlockProps, RichText } from "@wordpress/block-editor";
import type { CSSProperties, ElementType } from "react";
import type { DesignTableSaveProps, TableRow } from "./types";
import { defaultText } from "../design-title/langCore";
import { buildLangTexts } from "../useLangFields";

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
		// 後から足した属性。編集した順にキーが末尾へ足されるため、そのまま出すと
		// 読み直したときの再生成（定義順）と並びが食い違って無効になる。出力位置を固定する。
		cell_size,
		is_shadow_td,
		shadow_td,
		shadow_result_td,
		row_radius,
		...styleAttr
	} = attributes;
	const addedAttr = {
		...(cell_size !== undefined && { cell_size }),
		...(is_shadow_td !== undefined && { is_shadow_td }),
		...(shadow_result_td !== undefined && { shadow_result_td }),
		...(shadow_td !== undefined && { shadow_td }),
		...(row_radius !== undefined && { row_radius }),
	};

	/*
	 * 見出し・セルの文字は、言語ごと（{JP, EN}）に持てる。保存する HTML と data-col_heading / data-row_heading
	 * には既定の言語の文字を入れる（確認画面などが、これらを文字列として読むため）。
	 * 言語を分けたものだけ、data-lang-texts に持ち、表示のとき（view.ts）に表示言語の文字へ差し替える。
	 * すべて文字列のままなら data-lang-texts は出さない（昔のブロックの保存内容は変わらない）。
	 */
	const colHeadingTexts = (tableHeading ?? []).map(defaultText);
	const rowHeadingTexts = (rowTableHeading ?? []).map(defaultText);
	const colMap: Record<string, unknown> = {};
	(tableHeading ?? []).forEach((h, i) => {
		if (h && typeof h === "object") colMap[i] = h;
	});
	const rowMap: Record<string, unknown> = {};
	(rowTableHeading ?? []).forEach((h, i) => {
		if (h && typeof h === "object") rowMap[i] = h;
	});
	const cellMap: Record<string, unknown> = {};
	(tableSource ?? []).forEach((row: TableRow, r: number) => {
		(row?.cells ?? []).forEach((cell, c) => {
			if (cell?.content && typeof cell.content === "object") {
				cellMap[`${r},${c}`] = cell.content;
			}
		});
	});
	const langTexts = buildLangTexts({
		col: Object.keys(colMap).length ? colMap : undefined,
		row: Object.keys(rowMap).length ? rowMap : undefined,
		cell: Object.keys(cellMap).length ? cellMap : undefined,
	});

	//ヘッダー情報を生成
	const heading_props = {
		"data-col_heading": is_heading ? JSON.stringify(colHeadingTexts) : undefined,
		"data-row_heading": is_rowHeading
			? JSON.stringify(rowHeadingTexts)
			: undefined,
		"data-lang-texts": langTexts,
	};

	const blockProps = useBlockProps.save({
		"data-attributes": JSON.stringify({ ...styleAttr, ...addedAttr }),
		...heading_props,
		style: { backgroundColor: bgColor, overflow: "hidden" },
	});

	const cssTableLayout = (tableLayout || "auto") as CssTableLayout;
	const cssColumnHeaderAlign = columAlignTH as CssTextAlign;

	const renderCellContent = (value?: string | Record<string, string>) => (
		<RichText.Content value={defaultText(value)} />
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
			<RichText.Content value={defaultText(rowTableHeading?.[rowIndex])} />
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
							{tableHeading.map((_cell, index: number) => (
								<th
									key={index}
									style={{
										position: "relative",
										backgroundClip: "padding-box",
										width: columWidth[index],
									textAlign: cssColumnHeaderAlign,
									}}
								>
									<RichText.Content value={defaultText(tableHeading?.[index])} />
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
