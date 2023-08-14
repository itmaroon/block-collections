
import { __ } from '@wordpress/i18n';
import TypographyControls from '../TypographyControls'
import { StyleComp } from './StyleSelect';
import { NomalSelect } from './initSelect';
import { useStyleIframe } from '../iframeFooks';


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
		selectedValues,
		folder_val,
		optionColor,
		font_style_option,
		margin_value,
		padding_value,
		backgroundColor,
		backgroundGradient,
		radius_value,
		border_value,
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

				<PanelBody title={__("Global settings", 'itmar_block_collections')} initialOpen={false} className="select_design_ctrl">
					<PanelColorGradientSettings
						title={__("Background Color Setting", 'itmar_block_collections')}
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
				</PanelBody>

				<PanelBody title={__("Option Style Settings", 'itmar_block_collections')} initialOpen={false} className="select_design_ctrl">
					<TypographyControls
						title={__('Typography', 'itmar_block_collections')}
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
				<StyleComp attributes={attributes} >
					<NomalSelect
						onOptionSelect={(selIndex) => {
							if (selectedValues.includes(selIndex)) {
								return; // 既に選択されている場合はそのまま
							}
							const newArray = [...selectedValues, selIndex]
							setAttributes({ selectedValues: newArray })
						}}
						onOptionDeselect={(selIndex) => {
							const newArray = selectedValues.filter(index => index !== selIndex);
							setAttributes({ selectedValues: newArray });
						}}
					>
						<select name="category" class="nomal" multiple data-placeholder={folder_val}>
							<option class="catg_item" value="cat_1" selected={selectedValues.includes(0)}>カテゴリー１</option>
							<option class="catg_item" value="cat_2" selected={selectedValues.includes(1)}>カテゴリー２</option>
							<option class="catg_item" value="cat_3" selected={selectedValues.includes(2)}>カテゴリー３</option>
							<option class="term_item" value="term_1" selected={selectedValues.includes(3)}>ターム１</option>
							<option class="term_item" value="term_2" selected={selectedValues.includes(4)}>ターム２</option>
							<option class="term_item" value="term_3" selected={selectedValues.includes(5)}>ターム３</option>
							<option class="tag_item" value="tag_1" selected={selectedValues.includes(6)}>タグ１</option>
							<option class="tag_item" value="tag_2" selected={selectedValues.includes(7)}>タグ２</option>
							<option class="tag_item" value="tag_3" selected={selectedValues.includes(8)}>タグ３</option>
						</select>
					</NomalSelect>
				</StyleComp>
			</div >
		</>
	);
}
