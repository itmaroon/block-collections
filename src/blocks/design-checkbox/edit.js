
import { __ } from '@wordpress/i18n';
import TypographyControls from '../TypographyControls'
import { StyleComp } from './StyleCheckbox';
import { useStyleIframe } from '../iframeFooks';
import ShadowStyle from '../ShadowStyle';
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
		inputName,
		labelContent,
		font_style_label,
		margin_value,
		padding_value,
		backgroundColor,
		labelColor,
		boxColor,
		boxBgColor,
		radius_heading,
		border_heading,
		shadow_element,
		is_shadow,
	} = attributes;


	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);

	function renderContent() {
		return (
			<>
				<label>
					<input type="checkbox" name={inputName} />
					<span></span>
				</label>
				<RichText
					onChange={
						(newContent) => {
							setAttributes({ labelContent: newContent })
						}
					}
					value={labelContent}
					placeholder={__('Write Checkbox Label...', 'itmar_block_collections')}
				/>
			</>
		)
	}

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody title={__("Input element information setting", 'itmar_block_collections')} initialOpen={true} className="form_setteing_ctrl">
					<TextControl
						label={__("name attribute name", 'itmar_block_collections')}
						value={inputName}
						help={__("When using another design-checkbox as one of the options as an inner block, please use the same name.", 'itmar_block_collections')}
						onChange={(newVal) => setAttributes({ inputName: newVal })}
					/>

				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">

				<PanelBody title={__("Global settings", 'itmar_block_collections')} initialOpen={false} className="check_design_ctrl">
					<PanelColorGradientSettings
						title={__("Background Color Setting", 'itmar_block_collections')}
						settings={[
							{
								colorValue: backgroundColor,
								label: __("Choose Background color", 'itmar_block_collections'),
								onColorChange: (newValue) => setAttributes({ backgroundColor: newValue })
							},
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
					<ToggleControl
						label={__('Is Shadow', 'itmar_block_collections')}
						checked={is_shadow}
						onChange={(newVal) => {
							setAttributes({ is_shadow: newVal })
						}}
					/>
				</PanelBody>
				<PanelBody title={__("Input style settings", 'itmar_block_collections')} initialOpen={false} className="check_design_ctrl">
					<PanelColorGradientSettings
						title={__("Input Color Setting", 'itmar_block_collections')}
						settings={[{
							colorValue: boxColor,
							label: __("Choose Input color", 'itmar_block_collections'),
							onColorChange: (newValue) => setAttributes({ boxColor: newValue }),
						},
						{
							colorValue: boxBgColor,
							label: __("Choose Input Background color", 'itmar_block_collections'),
							onColorChange: (newValue) => setAttributes({ boxBgColor: newValue }),
						},
						]}
					/>

				</PanelBody>
				<PanelBody title={__("Label style settings", 'itmar_block_collections')} initialOpen={false} className="check_design_ctrl">
					<TypographyControls
						title={__('Typography', 'itmar_block_collections')}
						fontStyle={font_style_label}
						onChange={(newStyle) => {
							setAttributes({ font_style_label: newStyle })
						}}
						initialOpen={false}
					/>

					<PanelColorGradientSettings
						title={__("Label Color Setting", 'itmar_block_collections')}
						settings={[{
							colorValue: labelColor,
							label: __("Choose Text color", 'itmar_block_collections'),
							onColorChange: (newValue) => setAttributes({ labelColor: newValue }),
						},
						]}
					/>

				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<StyleComp attributes={attributes}>
					{is_shadow ? (
						<ShadowStyle
							shadowStyle={{ ...shadow_element, backgroundColor: backgroundColor }}
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
