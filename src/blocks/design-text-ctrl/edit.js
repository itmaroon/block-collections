
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
		labelContent,
		font_style_label,
		bgColor_label,
		bgGradient_label,
		textColor_label,
		radius_label,
		border_label,
		labelSpace,
		className
	} = attributes;


	return (
		<>
			<InspectorControls group="styles">
				<PanelBody title="ラベルスタイル設定" initialOpen={false} className="title_design_ctrl">
					<PanelRow
						className='labelInfo_row'
					>
						<TextControl
							label="ラベルのテキスト"
							labelPosition="top"
							value={(labelContent !== undefined) ? labelContent : 'Lable Name'}
							isPressEnterToChange
							onChange={(newValue) => setAttributes({ labelContent: newValue })}
						/>
					</PanelRow>
					<TypographyControls
						title='タイポグラフィー'
						fontStyle={font_style_label}
						onChange={(newStyle) => {
							setAttributes({ font_style_label: newStyle })
						}}
						initialOpen={false}
					/>
					<PanelColorGradientSettings
						title={__("Color Setting")}
						settings={[{
							colorValue: textColor_label,
							label: __("Choose Text color"),
							onColorChange: (newValue) => setAttributes({ textColor_label: newValue }),
						},
						{
							colorValue: bgColor_label,
							gradientValue: bgGradient_label,

							label: __("Choose Background color"),
							onColorChange: (newValue) => setAttributes({ bgColor_label: newValue }),
							onGradientChange: (newValue) => setAttributes({ bgGradient_label: newValue }),
						},
						]}
					/>
					<PanelBody title="ボーダー設定" initialOpen={false} className="border_design_ctrl">
						<BorderBoxControl

							onChange={(newValue) => setAttributes({ border_label: newValue })}
							value={border_label}
							allowReset={true}	// リセットの可否
							resetValues={border_resetValues}	// リセット時の値
						/>
						<BorderRadiusControl
							values={radius_label}
							onChange={(newValue) => setAttributes({ radius_label: newValue })}
						/>
					</PanelBody>
					<UnitControl
						dragDirection="e"
						onChange={(newValue) => setAttributes({ labelSpace: newValue })}
						label='テキストボックスとの間隔'
						value={labelSpace}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<label class="fit-label">
					{labelContent}
					<input type="email" name="email" className="contact_text" />
				</label>
			</div>
		</>

	);
}
