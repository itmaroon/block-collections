
import { __ } from '@wordpress/i18n';
import TypographyControls from '../TypographyControls'

import {
	Button,
	Panel,
	PanelBody,
	PanelRow,
	ToggleControl,
	RangeControl,
	RadioControl,
	TextControl,
	__experimentalBoxControl as BoxControl,
	__experimentalUnitControl as UnitControl,
	__experimentalBorderBoxControl as BorderBoxControl
} from '@wordpress/components';
import {
	useBlockProps,
	RichText,
	BlockAlignmentControl,
	BlockControls,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
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
		folder_val,
		optionColor,
		font_style_option,
		margin_value,
		padding_value,
		backgroundColor,
		backgroundGradient,
		radius_heading,
		border_heading,
		className,
	} = attributes;

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody title={
					__("Select Element Settings", 'itmar_block_collections')
				}
					initialOpen={true}
					className="select_design_ctrl"
				>
					<TextControl
						label={__("Place Folder Display", 'itmar_block_collections')}
						value={folder_val}
						onChange={(newVal) => setAttributes({ folder_val: newVal })}
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">

				<PanelBody title="全体設定" initialOpen={false} className="select_design_ctrl">
					<PanelColorGradientSettings
						title={__("Heading Color Setting", 'itmar_block_collections')}
						settings={[
							{
								colorValue: backgroundColor,
								gradientValue: backgroundGradient,

								label: __("Choose Background color", 'itmar_block_collections'),
								onColorChange: (newValue) => setAttributes({ backgroundColor: newValue }),
								onGradientChange: (newValue) => setAttributes({ backgroundGradient: newValue }),
							},
						]}
					/>
					<BoxControl
						label={__("Margin Setting", 'itmar_block_collections')}
						values={margin_value}
						onChange={value => setAttributes({ margin_value: value })}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>

					<BoxControl
						label="パティング設定"
						values={padding_value}
						onChange={value => setAttributes({ padding_value: value })}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>
					<PanelBody title="ボーダー設定" initialOpen={false} className="border_design_ctrl">
						<BorderBoxControl
							colors={[{ color: '#72aee6' }, { color: '#000' }, { color: '#fff' }]}
							onChange={(newValue) => setAttributes({ border_heading: newValue })}
							value={border_heading}
							allowReset={true}	// リセットの可否
							resetValues={border_resetValues}	// リセット時の値
						/>
						<BorderRadiusControl
							values={radius_heading}
							onChange={(newBrVal) =>
								setAttributes({ radius_heading: typeof newBrVal === 'string' ? { "value": newBrVal } : newBrVal })}
						/>
					</PanelBody>
				</PanelBody>

				<PanelBody title="オプションスタイル設定" initialOpen={false} className="select_design_ctrl">
					<TypographyControls
						title='タイポグラフィー'
						fontStyle={font_style_option}
						onChange={(newStyle) => {
							setAttributes({ font_style_label: newStyle })
						}}
						initialOpen={false}
					/>

					<PanelColorGradientSettings
						title={__("Option Color Setting", 'itmar_block_collections')}
						settings={[{
							colorValue: optionColor,
							label: __("Choose Text color", 'itmar_block_collections'),
							onColorChange: (newValue) => setAttributes({ optionColor: newValue }),
						},
						]}
					/>

				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<select name="category" class="nomal" id="id_category" multiple data-placeholder="カテゴリを選択してください">
					<option class="catg_item" value="cat_1">カテゴリー１</option>
					<option class="catg_item" value="cat_2">カテゴリー２</option>
					<option class="catg_item" value="cat_3">カテゴリー３</option>
					<option class="term_item" value="term_1">ターム１</option>
					<option class="term_item" value="term_2">ターム２</option>
					<option class="term_item" value="term_3">ターム３</option>
					<option class="tag_item" value="tag_1">タグ１</option>
					<option class="tag_item" value="tag_2">タグ２</option>
					<option class="tag_item" value="tag_3">タグ３</option>
				</select>

			</div >
		</>
	);
}
