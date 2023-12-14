
import { __ } from '@wordpress/i18n';
import TypographyControls from '../TypographyControls'
import { StyleComp } from './StyleTable';
import { useStyleIframe } from '../iframeFooks';
import ShadowStyle, { ShadowElm } from '../ShadowStyle';
import { useSelect } from '@wordpress/data';
import { useEffect, useState, useCallback, useRef } from '@wordpress/element';
import { useElementBackgroundColor, useIsIframeMobile } from '../CustomFooks';

import {
	PanelBody,
	ToggleControl,
	RangeControl,
	ComboboxControl,
	__experimentalBoxControl as BoxControl,
	__experimentalBorderBoxControl as BorderBoxControl
} from '@wordpress/components';
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalBorderRadiusControl as BorderRadiusControl
} from '@wordpress/block-editor';

import './editor.scss';

//スペースのリセットバリュー
const padding_resetValues = {
	top: '10px',
	left: '10px',
	right: '10px',
	bottom: '10px',
}

//ボーダーのリセットバリュー
const border_resetValues = {
	top: '0px',
	left: '0px',
	right: '0px',
	bottom: '0px',
}

const units = [
	{ value: 'px', label: 'px' },
	{ value: 'em', label: 'em' },
	{ value: 'rem', label: 'rem' },
];


export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		dataSource,
		tableSource,
		is_heading,
		tableHeading,
		bgColor,
		font_style_th,
		font_style_td,
		th_color,
		td_color,
		bgColor_th,
		bgGradient_th,
		bgColor_td,
		bgGradient_td,
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
		className
	} = attributes;


	//データソースの選択オプション配列
	const [dataSources, setdataSources] = useState([]);

	//テーブルの選択カラム
	const [selCulumn, setSelCulumn] = useState();

	//テーブルヘッダーの選択中か否か
	const [isSelHeader, setIsSelHeader] = useState(false);


	//インナーブロックを含む全てのブロックを配列にする関数
	const getFlattenedBlocks = (blocks) => {
		let flatBlocks = [];
		const blocksArray = Array.isArray(blocks) ? blocks : [blocks];

		blocksArray.forEach((block) => {
			flatBlocks.push(block);

			if (block.innerBlocks && block.innerBlocks.length) {
				flatBlocks = flatBlocks.concat(getFlattenedBlocks(block.innerBlocks));
			}
		});
		return flatBlocks;
	};
	//トップレベルのブロック（親ブロックがないブロック）のIDを取得する関数
	const getTopLevelClientId = (select, clientId) => {
		const { getBlockRootClientId, getBlock } = select('core/block-editor');

		let currentClientId = clientId;

		while (true) {
			const parentClientId = getBlockRootClientId(currentClientId);
			const parentBlock = getBlock(parentClientId);
			// 親ブロックがないか親ブロックが'core/post-content'（サイトエディタの投稿コンテンツ）なら終了
			if (!parentClientId || parentBlock.name === 'core/post-content') {
				return currentClientId;
			}

			// IDを入れ替えてループを続ける
			currentClientId = parentClientId;
		}
	}

	// セル要素を生成する関数
	const cellObjects = (inputFigureBlock) => {
		//その中のインナーブロック
		const inputInnerBlocks = inputFigureBlock ? inputFigureBlock.innerBlocks : [];
		//'itmar/design-checkbox''itmar/design-button'を除外
		const filteredBlocks = inputInnerBlocks.filter(block => block.name !== 'itmar/design-checkbox' && block.name !== 'itmar/design-button');
		return filteredBlocks.map((input_elm) => {
			//design-selectで選択された要素を抽出
			const sel_content = input_elm.attributes.selectValues ? input_elm.attributes.selectValues.filter(obj => input_elm.attributes.selectedValues.includes(obj.id)) : undefined;
			//選択された要素をカンマ区切りの文字列にして、input要素と選択
			const content_td = sel_content ? sel_content.map(obj => obj.label).join(', ') : input_elm.attributes.inputValue;

			return ({
				cells: [
					{
						content: input_elm.attributes.labelContent,
						tag: 'th'
					},
					{
						content: content_td,
						tag: 'td'
					}
				]
			})
		});
	}

	//itmar/input-figure-blockを抽出
	useSelect((select) => {
		const topBlockId = getTopLevelClientId(select, clientId);
		const topBlock = select('core/block-editor').getBlock(topBlockId);
		const targetBlocks = getFlattenedBlocks(topBlock).filter(block => block.name === 'itmar/input-figure-block');


		//選択用のコンボボックスのオプションを生成
		const sourceOption = targetBlocks.map((block) => ({
			value: block.attributes.form_name,
			label: block.attributes.form_name
		}));

		if (sourceOption.length > 0) {
			setdataSources(sourceOption);//コンボボックスにセット
		}
	}, []);

	//コンボボックスの初期値を設定
	useEffect(() => {
		if (!dataSource && dataSources.length > 0) {
			setAttributes({ dataSource: dataSources[0].value });
		}
	}, [dataSources, dataSource]);

	//選択されたitmar/input-figure-blockを返す
	const inputFigureBlock = useSelect((select) => {
		const topBlockId = getTopLevelClientId(select, clientId);
		const topBlock = select('core/block-editor').getBlock(topBlockId);
		const targetBlocks = getFlattenedBlocks(topBlock).find(block => block.attributes.form_name === dataSource);

		return targetBlocks;
	}, [dataSource]);

	//inputFigureBlockの変化に合わせてテーブルソースを更新
	useEffect(() => {
		const bodySource = inputFigureBlock ? cellObjects(inputFigureBlock) : null;
		setAttributes({ tableSource: bodySource });
	}, [inputFigureBlock]);



	//マウスドラッグの処理（カラム幅の変更）
	const handleMouseDown = useCallback(
		(index) => (e) => {
			const startX = e.pageX;//スタート地点を記録
			//クリックされたハンドルの親要素であるtr要素を取得
			const trElement = e.target.parentElement.parentElement;
			const rect = trElement.getBoundingClientRect();//位置を取得
			//そのtr要素の最後のcellの幅を取得
			const lastCell = trElement.children[trElement.children.length - 1];
			const lastCellWidth = lastCell.offsetWidth;

			const handleMouseMove = (e) => {
				const moveX = e.pageX;

				//最低幅の確保
				const newvalue = Math.round((moveX - rect.left) / (rect.right - rect.left) * 100);
				if (newvalue < 15) return;//幅１５％以下にはしない
				const distanceX = startX - moveX //移動幅
				const newlastCellvalue = Math.round((lastCellWidth + distanceX) / (rect.right - rect.left) * 100);
				if (newlastCellvalue < 15) return;//最終セルも幅１５％以下にはしない

				//幅の変更
				const newWidth = `${newvalue}%`;

				const newColumWidth = [...columWidth,];
				newColumWidth[index] = newWidth;
				setAttributes({ columWidth: newColumWidth })
			};

			//サイトエディタの場合のドキュメント
			const iframeInstance = document.getElementsByName('editor-canvas')[0];

			if (iframeInstance) {
				const iframeDocument = iframeInstance.contentDocument || iframeInstance.contentWindow.document;
				const handleMouseUp = () => {
					iframeDocument.removeEventListener("mousemove", handleMouseMove);
					iframeDocument.removeEventListener("mouseup", handleMouseUp);
				};

				iframeDocument.addEventListener("mousemove", handleMouseMove);
				iframeDocument.addEventListener("mouseup", handleMouseUp);
			} else {
				const handleMouseUp = () => {
					document.removeEventListener("mousemove", handleMouseMove);
					document.removeEventListener("mouseup", handleMouseUp);
				};

				document.addEventListener("mousemove", handleMouseMove);
				document.addEventListener("mouseup", handleMouseUp);
			}


		},
		[columWidth]
	);

	//クリックされたセルの取得
	const bodyCellClick = (tag, rowIndex, cellIndex) => {
		//theaderの選択状態は解除
		setIsSelHeader(false);
		//初期値の設定
		const nextAlign = tag === 'th' && columAlign[cellIndex] === undefined ? 'center' : columAlign[cellIndex];
		const newColumAlign = [...columAlign];
		newColumAlign[cellIndex] = nextAlign;
		setAttributes({ columAlign: newColumAlign });
		//クリックされた列を記録
		setSelCulumn(cellIndex);
	}

	//モバイルの判定
	const isMobile = useIsIframeMobile();

	//ブロックの参照
	const blockRef = useRef(null);
	const blockProps = useBlockProps({
		ref: blockRef,// ここで参照を blockProps に渡しています
		style: { backgroundColor: bgColor }
	});

	//背景色の取得
	const baseColor = useElementBackgroundColor(blockRef, blockProps.style);

	//背景色変更によるシャドー属性の書き換え
	useEffect(() => {
		if (baseColor) {
			setAttributes({ shadow_element: { ...shadow_element, baseColor: baseColor } });
			const new_shadow = ShadowElm({ ...shadow_element, baseColor: baseColor });
			if (new_shadow) { setAttributes({ shadow_result: new_shadow.style }); }
		}
	}, [baseColor]);



	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);

	function renderContent() {
		//レンダリングするテーブル
		return (
			<>
				{tableSource &&
					<table>
						{is_heading &&
							<thead>
								<tr>
									{tableSource[0].cells.map((cell, index) => (
										<th
											key={index}
											style={{
												position: "relative",
												backgroundClip: "padding-box",
												width: columWidth[index],
												textAlign: columAlignTH
											}}
											onClick={() => setIsSelHeader(true)}
										>
											<RichText
												onChange={
													(newContent) => {
														const updatedTableHeading = [...tableHeading];
														updatedTableHeading[index] = newContent;
														setAttributes({ tableHeading: updatedTableHeading });
													}
												}
												value={tableHeading[index]}
												placeholder={__('Enter header...', 'itmar_block_collections')}

											/>
											{index !== tableSource[0].cells.length - 1 && (
												<div className="resize-handle" onMouseDown={handleMouseDown(index)} />
											)}
										</th>
									))}
								</tr>

							</thead>
						}
						<tbody>
							{tableSource.map((row, rowIndex) => (
								<tr key={rowIndex}>
									{row.cells.map((cell, cellIndex) => {
										const CellTag = cell.tag;
										return (
											<CellTag
												key={cellIndex}
												style={{
													position: "relative",
													backgroundClip: "padding-box",
													width: columWidth[cellIndex],
													textAlign: columAlign[cellIndex]
												}}
												onClick={() => bodyCellClick(cell.tag, rowIndex, cellIndex)}
											>
												{cell.content}
												{cellIndex !== row.cells.length - 1 && (
													<div className="resize-handle" onMouseDown={handleMouseDown(cellIndex)} />
												)}
											</CellTag>
										);
									})}
								</tr>
							))}
						</tbody>
					</table>
				}
			</>
		)
	}

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody title={__("Table Structure setting", 'itmar_block_collections')} initialOpen={true} className="form_setteing_ctrl">
					<ComboboxControl
						label={__("Form Object name", 'itmar_block_collections')}
						value={dataSource}
						help={__("Please specify the form object that will be the data source for the table.", 'itmar_block_collections')}
						options={dataSources}
						onChange={(newValue) => {
							setAttributes({ dataSource: newValue });
						}}

					/>
					<ToggleControl
						label={__('table header', 'itmar_block_collections')}
						checked={is_heading}
						onChange={(newValue) => setAttributes({ is_heading: newValue })}
						help={__("Turn this on if you want to add a table header.", 'itmar_block_collections')}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">

				<PanelBody title={__("Global settings", 'itmar_block_collections')} initialOpen={false} className="check_design_ctrl">
					<PanelColorGradientSettings
						title={__("Background Color Setting", 'itmar_block_collections')}
						settings={[
							{
								colorValue: bgColor,
								label: __("Choose Block Background color", 'itmar_block_collections'),
								onColorChange: (newValue) => setAttributes({ bgColor: newValue })
							}
						]}
					/>
					<BoxControl
						label={!isMobile ?
							__("Margin settings(desk top)", 'itmar_block_collections')
							: __("Margin settings(mobile)", 'itmar_block_collections')
						}
						values={!isMobile ? default_pos.margin_value : mobile_pos.margin_value}
						onChange={value => {
							if (!isMobile) {
								setAttributes({ default_pos: { ...default_pos, margin_value: value } });
							} else {
								setAttributes({ mobile_pos: { ...mobile_pos, margin_value: value } });
							}
						}}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>
					<BoxControl
						label={!isMobile ?
							__("Padding settings(desk top)", 'itmar_block_collections')
							: __("Padding settings(mobile)", 'itmar_block_collections')
						}
						values={!isMobile ? default_pos.padding_value : mobile_pos.padding_value}
						onChange={value => {
							if (!isMobile) {
								setAttributes({ default_pos: { ...default_pos, padding_value: value } })
							} else {
								setAttributes({ mobile_pos: { ...mobile_pos, padding_value: value } })
							}
						}}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>
					<PanelBody title={__("Border Settings", 'itmar_block_collections')} initialOpen={false} className="border_design_ctrl">
						<BorderBoxControl
							colors={[{ color: '#72aee6' }, { color: '#000' }, { color: '#fff' }]}
							onChange={(newValue) => setAttributes({ border_value: newValue })}
							value={border_value}
							allowReset={true}	// リセットの可否
							resetValues={border_resetValues}	// リセット時の値
						/>
						<BorderRadiusControl
							values={radius_value}
							onChange={(newBrVal) =>
								setAttributes({ radius_value: typeof newBrVal === 'string' ? { "value": newBrVal } : newBrVal })}
						/>
					</PanelBody>
					<ToggleControl
						label={__('Is Shadow', 'itmar_block_collections')}
						checked={is_shadow}
						onChange={(newVal) => {
							setAttributes({ is_shadow: newVal })
						}}
					/>
					{is_shadow &&
						<ShadowStyle
							shadowStyle={{ ...shadow_element }}
							onChange={(newStyle, newState) => {
								setAttributes({ shadow_result: newStyle.style });
								setAttributes({ shadow_element: newState })
							}}
						/>
					}
					{className === 'is-style-stripe' &&
						<RangeControl
							value={intensity}
							label={__("Striped Contrast", 'itmar_block_collections')}
							max={100}
							min={0}
							onChange={(val) => setAttributes({ intensity: val })}
							withInputField={false}
						/>
					}
				</PanelBody>

				<PanelBody title={__("Heading style settings", 'itmar_block_collections')} initialOpen={false} className="check_design_ctrl">
					<TypographyControls
						title={__('Typography', 'itmar_block_collections')}
						fontStyle={font_style_th}
						onChange={(newStyle) => {
							setAttributes({ font_style_th: newStyle })
						}}
						initialOpen={false}
					/>

					<PanelColorGradientSettings
						title={__("Heading Color Setting", 'itmar_block_collections')}
						settings={[
							{
								colorValue: th_color,
								label: __("Choose Text color", 'itmar_block_collections'),
								onColorChange: (newValue) => setAttributes({ th_color: newValue }),
							},
							{
								colorValue: bgColor_th,
								gradientValue: bgGradient_th,

								label: __("Choose Background color", 'itmar_block_collections'),
								onColorChange: (newValue) => {
									setAttributes({ bgColor_th: newValue === undefined ? '' : newValue });
								},
								onGradientChange: (newValue) => setAttributes({ bgGradient_th: newValue }),
							},
						]}
					/>
					<RangeControl
						value={!isMobile ? default_pos.headding_min_width : mobile_pos.headding_min_width}
						label={!isMobile ?
							__("Minimum heading width(PX)(desk top)", 'itmar_block_collections')
							: __("Minimum heading width(PX)(mobile)", 'itmar_block_collections')
						}
						onChange={value => {
							if (!isMobile) {
								setAttributes({ default_pos: { ...default_pos, headding_min_width: value } })
							} else {
								setAttributes({ mobile_pos: { ...mobile_pos, headding_min_width: value } })
							}
						}}
						max={500}
						min={50}
						withInputField={true}
					/>

					<BoxControl
						label={!isMobile ?
							__("Padding settings(desk top)", 'itmar_block_collections')
							: __("Padding settings(mobile)", 'itmar_block_collections')
						}
						values={!isMobile ? default_pos.padding_th : mobile_pos.padding_th}
						onChange={value => {
							if (!isMobile) {
								setAttributes({ default_pos: { ...default_pos, padding_th: value } })
							} else {
								setAttributes({ mobile_pos: { ...mobile_pos, padding_th: value } })
							}
						}}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>

				</PanelBody>

				<PanelBody title={__("Data style settings", 'itmar_block_collections')} initialOpen={false} className="check_design_ctrl">
					<TypographyControls
						title={__('Typography', 'itmar_block_collections')}
						fontStyle={font_style_td}
						onChange={(newStyle) => {
							setAttributes({ font_style_td: newStyle })
						}}
						initialOpen={false}
					/>

					<PanelColorGradientSettings
						title={__("Data Color Setting", 'itmar_block_collections')}
						settings={[
							{
								colorValue: td_color,
								label: __("Choose Text color", 'itmar_block_collections'),
								onColorChange: (newValue) => setAttributes({ td_color: newValue }),
							},
							{
								colorValue: bgColor_td,
								gradientValue: bgGradient_td,

								label: __("Choose Background color", 'itmar_block_collections'),
								onColorChange: (newValue) => {
									setAttributes({ bgColor_td: newValue === undefined ? '' : newValue });
								},
								onGradientChange: (newValue) => setAttributes({ bgGradient_td: newValue }),
							},
						]}
					/>
					<BoxControl
						label={!isMobile ?
							__("Padding settings(desk top)", 'itmar_block_collections')
							: __("Padding settings(mobile)", 'itmar_block_collections')
						}
						values={!isMobile ? default_pos.padding_td : mobile_pos.padding_td}
						onChange={value => {
							if (!isMobile) {
								setAttributes({ default_pos: { ...default_pos, padding_td: value } })
							} else {
								setAttributes({ mobile_pos: { ...mobile_pos, padding_td: value } })
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
							setAttributes({ columAlignTH: nextAlign })
						} else {
							const newColumAlign = [...columAlign];
							newColumAlign[selCulumn] = nextAlign;
							setAttributes({ columAlign: newColumAlign });
						}
					}}
				/>
			</BlockControls>


			<div {...blockProps}>
				<StyleComp attributes={attributes}>
					{renderContent()}
				</StyleComp>
			</div >
		</>
	);
}
