
import { __ } from '@wordpress/i18n';
import TypographyControls from '../TypographyControls'
import { StyleComp } from './StyleTable';
import { useStyleIframe } from '../iframeFooks';
import ShadowStyle from '../ShadowStyle';
import { useSelect, useDispatch, select } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

import {
	PanelBody,
	TextControl,
	ToggleControl,
	RangeControl,
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


export default function Edit({ attributes, setAttributes }) {
	const {
		dataSource,
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
		margin_value,
		padding_value,
		padding_th,
		padding_td,
		radius_value,
		border_value,
		columWidth,
		intensity,
		shadow_element,
		is_shadow,
		className
	} = attributes;
	//ルートブロックに背景色を設定
	const blockProps = useBlockProps({ style: { backgroundColor: bgColor } });


	//インナーブロックを含む全てのブロックを配列にする関数
	const getFlattenedBlocks = (blocks) => {
		let flatBlocks = [];

		blocks.forEach((block) => {
			flatBlocks.push(block);

			if (block.innerBlocks && block.innerBlocks.length) {
				flatBlocks = flatBlocks.concat(getFlattenedBlocks(block.innerBlocks));
			}
		});
		return flatBlocks;
	};

	// セル要素を生成する関数
	const cellObjects = (inputFigureBlock) => {
		//その中のインナーブロック
		const inputInnerBlocks = inputFigureBlock ? inputFigureBlock.innerBlocks : [];
		//'itmar/design-checkbox''itmar/design-button'を除外
		const filteredBlocks = inputInnerBlocks.filter(block => block.name !== 'itmar/design-checkbox' && block.name !== 'itmar/design-button');
		return filteredBlocks.map((input_elm) => ({
			cells: [
				{
					content: input_elm.attributes.labelContent,
					tag: 'th'
				},
				{
					content: input_elm.attributes.inputValue,
					tag: 'td'
				}
			]
		}));
	}

	//itmar/input-figure-blockを抽出
	const inputFigureBlock = useSelect((select) => {
		const allBlocks = select('core/block-editor').getBlocks();
		return getFlattenedBlocks(allBlocks).filter(block => block.name === 'itmar/input-figure-block');
	}, []);

	//itmar/input-figure-blockの変化に応じてブロック属性を更新
	useEffect(() => {
		const bodySource = inputFigureBlock[0].name === 'itmar/input-figure-block' ? cellObjects(inputFigureBlock[0]) : [];
		setAttributes({ dataSource: bodySource });
	}, [inputFigureBlock[0]]);

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);

	function renderContent() {
		//データソースがitmar/input-figure-blockのとき
		return (
			<>
				{dataSource &&
					<table>
						{is_heading &&
							<thead>
								<tr>
									{dataSource[0].cells.map((cell, index) => (
										<th key={index}>
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
										</th>
									))}
								</tr>

							</thead>
						}
						<tbody>
							{dataSource.map((row, rowIndex) => (
								<tr key={rowIndex}>
									{row.cells.map((cell, cellIndex) => {
										const CellTag = cell.tag;
										return (
											<CellTag key={cellIndex}>
												{cell.content}
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
					<TextControl
						label={__("Form Object name", 'itmar_block_collections')}
						value={dataSource}
						help={__("Please specify the form object that will be the data source for the table.", 'itmar_block_collections')}
						onChange={(newVal) => setAttributes({ dataSource: newVal })}
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
						label={__("Margin settings", 'itmar_block_collections')}
						values={margin_value}
						onChange={value => setAttributes({ margin_value: value })}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>

					<BoxControl
						label={__("Padding settings", 'itmar_block_collections')}
						values={padding_value}
						onChange={value => setAttributes({ padding_value: value })}
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
					<BoxControl
						label={__("Padding settings", 'itmar_block_collections')}
						values={padding_th}
						onChange={value => setAttributes({ padding_th: value })}
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
						label={__("Padding settings", 'itmar_block_collections')}
						values={padding_td}
						onChange={value => setAttributes({ padding_td: value })}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>
				</PanelBody>
			</InspectorControls>


			<div {...blockProps}>
				<StyleComp attributes={attributes}>
					{is_shadow ? (
						<ShadowStyle
							shadowStyle={{ ...shadow_element, backgroundColor: bgColor }}
							onChange={(newStyle, newState) => {
								setAttributes({ shadow_result: newStyle.style });
								setAttributes({ shadow_element: newState })
							}}
						>
							{renderContent()}
						</ShadowStyle>
					) : (
						renderContent()
					)}
				</StyleComp>
			</div >
		</>
	);
}