
import { __ } from '@wordpress/i18n';
import TypographyControls from '../TypographyControls'
import { StyleComp } from './StyleTable';
import { useStyleIframe } from '../iframeFooks';
import ShadowStyle from '../ShadowStyle';
import { useSelect, useDispatch, select } from '@wordpress/data';

import {
	PanelBody,
	TextControl,
	ToggleControl,
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
		shadow_element,
		is_shadow,
	} = attributes;

	const blockProps = useBlockProps({ style: { backgroundColor: bgColor } });

	//Nestされたブロックの情報取得
	function getAllNestedBlocks(clientId) {
		const block = select('core/block-editor').getBlock(clientId);
		if (!block) {
			return [];
		}
		const children = block.innerBlocks.map(innerBlock => getAllNestedBlocks(innerBlock.clientId));
		return [block, ...children.flat()];
	}

	//テーブルのソースを持つブロックを検索する
	const allBlocks = useSelect((select) => {
		return select('core/block-editor').getBlocks();
	}, []);
	console.log(allBlocks)

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);

	function renderContent() {
		return (
			<>
				<table>
					{is_heading &&
						<thead>
							<tr>
								<th>
									<RichText
										onChange={
											(newContent) => {
												setAttributes({ tableHeading: [...tableHeading, newContent] })
											}
										}
										value={tableHeading[0]}
									/>
								</th>
							</tr>
						</thead>
					}
					<tbody>

					</tbody>
				</table>

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

								label: __("Choose Select Background color", 'itmar_block_collections'),
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

								label: __("Choose Select Background color", 'itmar_block_collections'),
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
