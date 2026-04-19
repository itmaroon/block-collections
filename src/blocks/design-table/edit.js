import { __ } from "@wordpress/i18n";
import { StyleComp } from "./StyleTable";
import { useStyleIframe } from "../iframeFooks";
import { useSelect } from "@wordpress/data";
import { useEffect, useState, useCallback, useRef } from "@wordpress/element";
import {
	useElementBackgroundColor,
	useIsIframeMobile,
	ShadowStyle,
	ShadowElm,
	TypographyControls,
} from "itmar-block-packages";

import {
	PanelBody,
	PanelRow,
	ToggleControl,
	RangeControl,
	TextControl,
	BoxControl,
	BorderBoxControl,
	__experimentalNumberControl as NumberControl,
} from "@wordpress/components";
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalBorderRadiusControl as BorderRadiusControl,
} from "@wordpress/block-editor";

import "./editor.scss";

//スペースのリセットバリュー
const padding_resetValues = {
	top: "10px",
	left: "10px",
	right: "10px",
	bottom: "10px",
};

//ボーダーのリセットバリュー
const border_resetValues = {
	top: "0px",
	left: "0px",
	right: "0px",
	bottom: "0px",
};

const units = [
	{ value: "px", label: "px" },
	{ value: "em", label: "em" },
	{ value: "rem", label: "rem" },
];

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		is_data_form,
		tableColRow,
		defineID,
		tableSource,
		clickCellPos,
		is_heading,
		tableHeading,
		tableLayout,
		bgColor,
		font_style_th,
		font_style_td,
		th_color,
		td_color,
		sel_color,
		bgColor_th,
		bgGradient_th,
		bgColor_td,
		bgGradient_td,
		bgColor_sel,
		bgGradient_sel,
		default_pos,
		mobile_pos,
		radius_value,
		border_value,
		columWidth,
		columAlign,
		columAlignTH,
		intensity,
		shadow_element,
		is_shadow,
		className,
	} = attributes;

	//データソースの選択オプション配列
	//const [dataSources, setdataSources] = useState([]);

	//テーブルの選択カラム
	const [selCulumn, setSelCulumn] = useState();

	//テーブルヘッダーの選択中か否か
	const [isSelHeader, setIsSelHeader] = useState(false);

	// 子ブロック（design-table）の Edit コンポーネント内
	const isInsideParent = useSelect(
		(select) => {
			const { getBlockName, getBlockParents } = select("core/block-editor");

			// 1. 自分の「すべての親・先祖」の clientId 配列を取得
			const parentClientIds = getBlockParents(clientId);

			// 2. その中のいずれかが "itmar/reservation-block" であるか確認
			return parentClientIds.some((id) => {
				return getBlockName(id) === "itmar/reservation-block";
			});
		},
		[clientId],
	);

	//ヘッダー配列の生成
	// useEffect(() => {
	// 	if (!tableSource || tableSource.length === 0) return;

	// 	// 1. 各行のセル数を取得し、その中の最大値を求める
	// 	const maxCols = Math.max(
	// 		...tableSource.map((row) => (row.cells ? row.cells.length : 0)),
	// 	);

	// 	// 2. 現在のヘッダー配列をコピーし、最大列数に合わせて長さを調整する
	// 	let newHeading = [...tableHeading];

	// 	if (newHeading.length < maxCols) {
	// 		// 足りない分だけ空文字で埋める
	// 		const diff = maxCols - newHeading.length;
	// 		const extraPadding = Array(diff).fill("");
	// 		newHeading = [...newHeading, ...extraPadding];

	// 		setAttributes({ tableHeading: newHeading });
	// 	} else if (newHeading.length > maxCols && maxCols > 0) {
	// 		// 逆に列が減った場合にヘッダーも切り詰めたいならここ
	// 		newHeading = newHeading.slice(0, maxCols);
	// 		setAttributes({ tableHeading: newHeading });
	// 	}
	// }, [tableSource, is_heading]);

	useEffect(() => {
		// 1. 期待される列数（targetCols）を決定する
		let targetCols = 0;

		if (!is_data_form) {
			// 静的モード：インスペクターで設定された数値を優先
			targetCols = tableColRow.colNum;
		} else if (tableSource && tableSource.length > 0) {
			// 動的モード：流し込まれたデータの最大列数を計算
			targetCols = Math.max(
				...tableSource.map((row) => (row.cells ? row.cells.length : 0)),
			);
		}

		// 2. ターゲットとなる列数が決まらない場合は何もしない
		if (targetCols === 0) return;

		// 3. 現在のヘッダー長と比較して調整
		let newHeading = [...tableHeading];

		if (newHeading.length !== targetCols) {
			if (newHeading.length < targetCols) {
				// 足りない分を追加
				const diff = targetCols - newHeading.length;
				newHeading = [...newHeading, ...Array(diff).fill("")];
			} else {
				// 多い分をカット
				newHeading = newHeading.slice(0, targetCols);
			}

			// 属性を更新
			setAttributes({ tableHeading: newHeading });
		}

		// 依存配列に tableColRow.colNum と is_data_form を追加して、切り替え時に即座に反応させる
	}, [tableSource, is_heading, is_data_form, tableColRow.colNum]);

	//マウスドラッグの処理（カラム幅の変更）
	const handleMouseDown = useCallback(
		(index) => (e) => {
			e.preventDefault();
			e.stopPropagation();

			const ownerDocument = e.target.ownerDocument;

			// ✅ 1. 画面全体を覆う透明なガードパネルを作成
			const overlay = ownerDocument.createElement("div");
			Object.assign(overlay.style, {
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				zIndex: 999999,
				cursor: "col-resize",
				backgroundColor: "transparent",
				userSelect: "none",
			});
			ownerDocument.body.appendChild(overlay);

			// ✅ 2. columWidth の初期化（依存関係を安全に処理）
			const currentCount = tableHeading.length;
			let safeWidths = Array.isArray(columWidth) ? [...columWidth] : [];
			if (safeWidths.length < currentCount) {
				const defaultW = `${Math.floor(100 / currentCount)}%`;
				safeWidths = Array.from(
					{ length: currentCount },
					(_, i) => columWidth[i] || defaultW,
				);
			}

			const tableElement = e.currentTarget.closest("table");
			if (!tableElement) {
				if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
				return;
			}

			const tableRect = tableElement.getBoundingClientRect();
			const startX = e.pageX;

			const cols = tableElement.querySelectorAll("colgroup col");
			const targetCol = cols[index];

			if (!targetCol) {
				if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
				return;
			}

			// 開始時の物理幅(px)を基準として取得
			const startWidthPx = targetCol.getBoundingClientRect().width;

			// ✅ マウス移動時の処理
			const handleMouseMove = (moveEvent) => {
				const diffX = moveEvent.pageX - startX;
				const currentWidthPx = startWidthPx + diffX;

				// テーブル幅に対する割合を計算
				let finalPercent = (currentWidthPx / tableRect.width) * 100;
				finalPercent = Math.max(15, finalPercent); // 最小幅15%

				// DOMへ即時反映
				targetCol.style.width = `${finalPercent.toFixed(2)}%`;
			};

			// ✅ マウスを離した時の処理
			const handleMouseUp = (upEvent) => {
				const diffX = upEvent.pageX - startX;
				let finalPercent = ((startWidthPx + diffX) / tableRect.width) * 100;
				finalPercent = Math.max(15, finalPercent);

				// 属性の保存
				const newColWidths = [...safeWidths];
				newColWidths[index] = `${finalPercent.toFixed(2)}%`;
				setAttributes({ columWidth: newColWidths });

				// クリーンアップ
				if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
				ownerDocument.removeEventListener("mousemove", handleMouseMove);
				ownerDocument.removeEventListener("mouseup", handleMouseUp);
			};

			// ✅ 登録先を ownerDocument に統一（overlay越しでも確実に拾うため）
			ownerDocument.addEventListener("mousemove", handleMouseMove, {
				passive: true,
			});
			ownerDocument.addEventListener("mouseup", handleMouseUp);
		},
		[columWidth, tableHeading, setAttributes],
	);

	//クリックされたセルの取得
	const bodyCellClick = (tag, rowIndex, colIndex) => {
		//theaderの選択状態は解除
		setIsSelHeader(false);
		//初期値の設定
		const nextAlign =
			tag === "th" && columAlign[colIndex] === undefined
				? "center"
				: columAlign[colIndex];
		const newColumAlign = [...columAlign];
		newColumAlign[colIndex] = nextAlign;
		//属性に記録
		setAttributes({
			columAlign: newColumAlign,
			clickCellPos: { row: rowIndex, col: colIndex },
		});
		//クリックされた列を記録
		setSelCulumn(colIndex);
	};

	//モバイルの判定
	const isMobile = useIsIframeMobile();

	//ブロックの参照
	const blockRef = useRef(null);
	const blockProps = useBlockProps({
		ref: blockRef, // ここで参照を blockProps に渡しています
		style: { backgroundColor: bgColor },
	});

	//背景色の取得
	const baseColor = useElementBackgroundColor(blockRef, blockProps.style);

	//背景色変更によるシャドー属性の書き換え
	useEffect(() => {
		if (baseColor) {
			setAttributes({
				shadow_element: { ...shadow_element, baseColor: baseColor },
			});
			const new_shadow = ShadowElm({ ...shadow_element, baseColor: baseColor });
			if (new_shadow) {
				setAttributes({ shadow_result: new_shadow.style });
			}
		}
	}, [baseColor]);

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);
	const CellHtml = ({ html }) => (
		<span
			className="cell-html"
			dangerouslySetInnerHTML={{ __html: html || "" }}
		/>
	);

	function renderContent() {
		//レンダリングするテーブル
		return (
			<>
				<table style={{ tableLayout: tableLayout || "auto" }}>
					{is_heading && (
						<>
							<colgroup>
								{tableHeading.map((_, i) => (
									<col key={i} style={{ width: columWidth[i] || "auto" }} />
								))}
							</colgroup>
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
											onClick={() => setIsSelHeader(true)}
										>
											<RichText
												onChange={(newContent) => {
													const updatedTableHeading = [...tableHeading];
													updatedTableHeading[index] = newContent;
													setAttributes({
														tableHeading: updatedTableHeading,
													});
												}}
												value={tableHeading[index]}
												placeholder={__("Enter header...", "block-collections")}
											/>
											{index !== tableHeading.length - 1 && (
												<div
													className="resize-handle"
													onMouseDown={handleMouseDown(index)}
												/>
											)}
										</th>
									))}
								</tr>
							</thead>
						</>
					)}
					<tbody>
						{is_data_form
							? tableSource &&
							  tableSource.map((row, rowIndex) => (
									<tr key={rowIndex}>
										{/* 重要：row.cells の数ではなく、tableHeading の数に合わせてループを回す。
                    これにより、データが足りないセルも空として描画されます。
                */}
										{tableHeading.map((_, colIndex) => {
											const cell = row.cells[colIndex] || {
												content: "",
												tag: "td",
											}; // データがない場合の補完
											const CellTag = cell.tag || "td";

											return (
												<CellTag
													key={colIndex}
													className={
														CellTag === "td" &&
														clickCellPos.row === rowIndex &&
														clickCellPos.col === colIndex
															? "currentSel"
															: undefined
													}
													style={{
														position: "relative",
														width: columWidth[colIndex],
														textAlign: columAlign[colIndex],
													}}
													onMouseDown={(e) => {
														// 予約管理モード時は、クリックしても親ブロック（予約ブロック）の選択を維持
														if (isInsideParent) e.preventDefault();
													}}
													onClick={() =>
														bodyCellClick(CellTag, rowIndex, colIndex)
													}
												>
													<CellHtml html={cell.content || ""} />
													{/* ボディ側にもリサイズハンドルが必要な場合はここに追加 */}
												</CellTag>
											);
										})}
									</tr>
							  ))
							: // --- 静的データモード (ユーザー設定の colNum / rowNum で作成) ---
							  // rowNum 分の配列を生成してループ
							  [...Array(tableColRow.rowNum)].map((_, rowIndex) => (
									<tr key={`static-row-${rowIndex}`}>
										{/* colNum 分の配列を生成してループ */}
										{[...Array(tableColRow.colNum)].map((_, colIndex) => (
											<td
												key={`static-col-${colIndex}`}
												style={{
													width: columWidth[colIndex] || "auto",
													textAlign: columAlign[colIndex] || "left",
													position: "relative",
												}}
											>
												{/* 自分で入力できるように RichText を配置 */}
												<RichText
													value={
														tableSource[rowIndex]?.cells[colIndex]?.content ||
														""
													}
													onChange={(newContent) => {
														// tableSource を手動で更新するロジック
														const newSource = [...tableSource];
														if (!newSource[rowIndex])
															newSource[rowIndex] = { cells: [] };
														newSource[rowIndex].cells[colIndex] = {
															content: newContent,
															tag: "td",
														};
														setAttributes({ tableSource: newSource });
													}}
													placeholder={__("...", "itmar")}
												/>
											</td>
										))}
									</tr>
							  ))}
					</tbody>
				</table>
			</>
		);
	}

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody
					title={__("Table Structure setting", "block-collections")}
					initialOpen={true}
					className="form_setteing_ctrl"
				>
					<ToggleControl
						label={__("Table Data form Extra", "block-collections")}
						checked={is_data_form}
						onChange={(newValue) => setAttributes({ is_data_form: newValue })}
					/>
					{is_data_form && (
						<TextControl
							label={__("Identification ID", "block-collections")}
							value={defineID}
							onChange={(newValue) => {
								setAttributes({ defineID: newValue });
							}}
						/>
					)}
					{!is_data_form && (
						<PanelRow className="itmar_date_span">
							<NumberControl
								label={__("Col Num", "block-collections")}
								labelPosition="side"
								max={50}
								min={1}
								onChange={(newValue) => {
									const newTableObj = {
										...tableColRow,
										colNum: Number(newValue),
									};
									setAttributes({ tableColRow: newTableObj });
								}}
								value={tableColRow.colNum}
							/>

							<NumberControl
								label={__("Row Num", "block-collections")}
								labelPosition="side"
								max={50}
								min={1}
								onChange={(newValue) => {
									const newTableObj = {
										...tableColRow,
										rowNum: Number(newValue),
									};
									setAttributes({ tableColRow: newTableObj });
								}}
								value={tableColRow.rowNum}
							/>
						</PanelRow>
					)}
					<ToggleControl
						label={__("table header", "block-collections")}
						checked={is_heading}
						onChange={(newValue) => setAttributes({ is_heading: newValue })}
						help={__(
							"Turn this on if you want to add a table header.",
							"block-collections",
						)}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody
					title={__("Global settings", "block-collections")}
					initialOpen={false}
					className="check_design_ctrl"
				>
					<PanelColorGradientSettings
						title={__("Background Color Setting", "block-collections")}
						settings={[
							{
								colorValue: bgColor,
								label: __("Choose Block Background color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ bgColor: newValue }),
							},
						]}
					/>
					<BoxControl
						label={
							!isMobile
								? __("Margin settings(desk top)", "block-collections")
								: __("Margin settings(mobile)", "block-collections")
						}
						values={
							!isMobile ? default_pos.margin_value : mobile_pos.margin_value
						}
						onChange={(value) => {
							if (!isMobile) {
								setAttributes({
									default_pos: { ...default_pos, margin_value: value },
								});
							} else {
								setAttributes({
									mobile_pos: { ...mobile_pos, margin_value: value },
								});
							}
						}}
						units={units} // 許可する単位
						allowReset={true} // リセットの可否
						resetValues={padding_resetValues} // リセット時の値
					/>
					<BoxControl
						label={
							!isMobile
								? __("Padding settings(desk top)", "block-collections")
								: __("Padding settings(mobile)", "block-collections")
						}
						values={
							!isMobile ? default_pos.padding_value : mobile_pos.padding_value
						}
						onChange={(value) => {
							if (!isMobile) {
								setAttributes({
									default_pos: { ...default_pos, padding_value: value },
								});
							} else {
								setAttributes({
									mobile_pos: { ...mobile_pos, padding_value: value },
								});
							}
						}}
						units={units} // 許可する単位
						allowReset={true} // リセットの可否
						resetValues={padding_resetValues} // リセット時の値
					/>
					<PanelBody
						title={__("Border Settings", "block-collections")}
						initialOpen={false}
						className="border_design_ctrl"
					>
						<BorderBoxControl
							colors={[
								{ color: "#72aee6" },
								{ color: "#000" },
								{ color: "#fff" },
							]}
							onChange={(newValue) => setAttributes({ border_value: newValue })}
							value={border_value}
							allowReset={true} // リセットの可否
							resetValues={border_resetValues} // リセット時の値
						/>
						<BorderRadiusControl
							values={radius_value}
							onChange={(newBrVal) =>
								setAttributes({
									radius_value:
										typeof newBrVal === "string"
											? { value: newBrVal }
											: newBrVal,
								})
							}
						/>
					</PanelBody>
					<ToggleControl
						label={__("Is Shadow", "block-collections")}
						checked={is_shadow}
						onChange={(newVal) => {
							setAttributes({ is_shadow: newVal });
						}}
					/>
					{is_shadow && (
						<ShadowStyle
							shadowStyle={{ ...shadow_element }}
							onChange={(newStyle, newState) => {
								setAttributes({ shadow_result: newStyle.style });
								setAttributes({ shadow_element: newState });
							}}
						/>
					)}
					{className === "is-style-stripe" && (
						<RangeControl
							value={intensity}
							label={__("Striped Contrast", "block-collections")}
							max={100}
							min={0}
							onChange={(val) => setAttributes({ intensity: val })}
							withInputField={false}
						/>
					)}
				</PanelBody>

				<PanelBody
					title={__("Heading style settings", "block-collections")}
					initialOpen={false}
					className="check_design_ctrl"
				>
					<TypographyControls
						title={__("Typography", "block-collections")}
						fontStyle={font_style_th}
						onChange={(newStyle) => {
							setAttributes({ font_style_th: newStyle });
						}}
						initialOpen={false}
					/>

					<PanelColorGradientSettings
						title={__("Heading Color Setting", "block-collections")}
						settings={[
							{
								colorValue: th_color,
								label: __("Choose Text color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ th_color: newValue }),
							},
							{
								colorValue: bgColor_th,
								gradientValue: bgGradient_th,

								label: __("Choose Background color", "block-collections"),
								onColorChange: (newValue) => {
									setAttributes({
										bgColor_th: newValue === undefined ? "" : newValue,
									});
								},
								onGradientChange: (newValue) =>
									setAttributes({ bgGradient_th: newValue }),
							},
						]}
					/>
					<RangeControl
						value={
							!isMobile
								? default_pos.headding_min_width
								: mobile_pos.headding_min_width
						}
						label={
							!isMobile
								? __("Minimum heading width(PX)(desk top)", "block-collections")
								: __("Minimum heading width(PX)(mobile)", "block-collections")
						}
						onChange={(value) => {
							if (!isMobile) {
								setAttributes({
									default_pos: { ...default_pos, headding_min_width: value },
								});
							} else {
								setAttributes({
									mobile_pos: { ...mobile_pos, headding_min_width: value },
								});
							}
						}}
						max={500}
						min={50}
						withInputField={true}
					/>

					<BoxControl
						label={
							!isMobile
								? __("Padding settings(desk top)", "block-collections")
								: __("Padding settings(mobile)", "block-collections")
						}
						values={!isMobile ? default_pos.padding_th : mobile_pos.padding_th}
						onChange={(value) => {
							if (!isMobile) {
								setAttributes({
									default_pos: { ...default_pos, padding_th: value },
								});
							} else {
								setAttributes({
									mobile_pos: { ...mobile_pos, padding_th: value },
								});
							}
						}}
						units={units} // 許可する単位
						allowReset={true} // リセットの可否
						resetValues={padding_resetValues} // リセット時の値
					/>
				</PanelBody>

				<PanelBody
					title={__("Data style settings", "block-collections")}
					initialOpen={false}
					className="check_design_ctrl"
				>
					<TypographyControls
						title={__("Typography", "block-collections")}
						fontStyle={font_style_td}
						onChange={(newStyle) => {
							setAttributes({ font_style_td: newStyle });
						}}
						isMobile={isMobile}
						initialOpen={false}
					/>

					<PanelColorGradientSettings
						title={__("Data Color Setting", "block-collections")}
						settings={[
							{
								colorValue: td_color,
								label: __("Choose Text color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ td_color: newValue }),
							},
							{
								colorValue: bgColor_td,
								gradientValue: bgGradient_td,

								label: __("Choose Background color", "block-collections"),
								onColorChange: (newValue) => {
									setAttributes({
										bgColor_td: newValue === undefined ? "" : newValue,
									});
								},
								onGradientChange: (newValue) =>
									setAttributes({ bgGradient_td: newValue }),
							},
						]}
					/>
					<PanelColorGradientSettings
						title={__("Select Cell Color Setting", "block-collections")}
						settings={[
							{
								colorValue: sel_color,
								label: __("Choose Text color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ sel_color: newValue }),
							},
							{
								colorValue: bgColor_sel,
								gradientValue: bgGradient_sel,

								label: __("Choose Background color", "block-collections"),
								onColorChange: (newValue) => {
									setAttributes({
										bgColor_sel: newValue === undefined ? "" : newValue,
									});
								},
								onGradientChange: (newValue) =>
									setAttributes({ bgGradient_sel: newValue }),
							},
						]}
					/>
					<BoxControl
						label={
							!isMobile
								? __("Padding settings(desk top)", "block-collections")
								: __("Padding settings(mobile)", "block-collections")
						}
						values={!isMobile ? default_pos.padding_td : mobile_pos.padding_td}
						onChange={(value) => {
							if (!isMobile) {
								setAttributes({
									default_pos: { ...default_pos, padding_td: value },
								});
							} else {
								setAttributes({
									mobile_pos: { ...mobile_pos, padding_td: value },
								});
							}
						}}
					/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<AlignmentToolbar
					value={isSelHeader ? columAlignTH : columAlign[selCulumn]}
					onChange={(nextAlign) => {
						if (isSelHeader) {
							setAttributes({ columAlignTH: nextAlign });
						} else {
							const newColumAlign = [...columAlign];
							newColumAlign[selCulumn] = nextAlign;
							setAttributes({ columAlign: newColumAlign });
						}
					}}
				/>
			</BlockControls>

			<div {...blockProps}>
				<StyleComp attributes={attributes}>{renderContent()}</StyleComp>
			</div>
		</>
	);
}
