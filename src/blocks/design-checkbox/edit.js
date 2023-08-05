
import { __ } from '@wordpress/i18n';
import TypographyControls from '../TypographyControls'
import { StyleComp } from './StyleCheckbox';
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


export default function Edit({ attributes, setAttributes }) {
	const {
		inputName,
		labelContent,
		font_style_label,
		margin_value,
		padding_value,
		backgroundColor,
		backgroundGradient,
		labelColor,
		boxColor,
		boxBgColor,
		radius_heading,
		border_heading,
		className,
	} = attributes;

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

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody title="Input要素情報設定" initialOpen={true} className="form_setteing_ctrl">
					<TextControl
						label="name属性の名称"
						value={inputName}
						help="他のdesign-checkboxとインナーブロックとして選択肢の一つにするときは同じ名称に併せて下さい。"
						onChange={(newVal) => setAttributes({ inputName: newVal })}
					/>

				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">

				<PanelBody title="全体設定" initialOpen={false} className="check_design_ctrl">
					<PanelColorGradientSettings
						title={__("Heading Color Setting")}
						settings={[{
							colorValue: labelColor,
							label: __("Choose Text color"),
							onColorChange: (newValue) => setAttributes({ labelColor: newValue }),
						},
						{
							colorValue: backgroundColor,
							gradientValue: backgroundGradient,

							label: __("Choose Background color"),
							onColorChange: (newValue) => setAttributes({ backgroundColor: newValue }),
							onGradientChange: (newValue) => setAttributes({ backgroundGradient: newValue }),
						},
						]}
					/>
					<BoxControl
						label="マージン設定"
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
				<PanelBody title="インプットスタイル設定" initialOpen={false} className="check_design_ctrl">
					<PanelColorGradientSettings
						title={__("Input Color Setting")}
						settings={[{
							colorValue: boxColor,
							label: __("Choose Input color"),
							onColorChange: (newValue) => setAttributes({ boxColor: newValue }),
						},
						{
							colorValue: boxBgColor,
							label: __("Choose Input Background color"),
							onColorChange: (newValue) => setAttributes({ boxBgColor: newValue }),
						},
						]}
					/>

				</PanelBody>
				<PanelBody title="ラベルスタイル設定" initialOpen={false} className="check_design_ctrl">
					<TypographyControls
						title='タイポグラフィー'
						fontStyle={font_style_label}
						onChange={(newStyle) => {
							setAttributes({ font_style_label: newStyle })
						}}
						initialOpen={false}
					/>

					<PanelColorGradientSettings
						title={__("Label Color Setting")}
						settings={[{
							colorValue: labelColor,
							label: __("Choose Text color"),
							onColorChange: (newValue) => setAttributes({ labelColor: newValue }),
						},
						]}
					/>

				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<StyleComp attributes={attributes}>
					<label>
						<input type="checkbox" name={inputName} />
						<span></span>
					</label>
					<RichText
						tagName="p"
						onChange={
							(newContent) => {
								setAttributes({ labelContent: newContent })
							}
						}
						value={labelContent}
						placeholder={__('Write Checkbox Label...')}
					/>

				</StyleComp>
			</div >
		</>
	);
}
