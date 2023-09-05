
import { __ } from '@wordpress/i18n';
import TypographyControls from '../TypographyControls'
import { StyleComp } from './StyleButton';
import { useStyleIframe } from '../iframeFooks';
import ShadowStyle from '../ShadowStyle';

import {
	PanelBody,
	PanelRow,
	RadioControl,
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


export default function Edit({ attributes, setAttributes }) {
	const {
		buttonType,
		bgColor,
		align,
		labelContent,
		font_style_label,
		margin_value,
		padding_value,
		buttonColor,
		buttonGradient,
		labelColor,
		radius_value,
		border_value,
		shadow_element,
		is_shadow,
	} = attributes;

	//テキストの配置
	const align_style = align === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } :
		align === 'right' ? { marginLeft: 'auto' } : null;


	const blockProps = useBlockProps({ style: { ...align_style, backgroundColor: bgColor } });

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);

	function renderContent() {
		return (
			<>
				{buttonType === 'button' ? (
					<button>
						<RichText
							onChange={
								(newContent) => {
									setAttributes({ labelContent: newContent })
								}
							}
							value={labelContent}
							placeholder={__('Button Name...', 'itmar_block_collections')}
						/>
					</button>
				) : (
					<input type="submit" value={labelContent} />
				)}
			</>
		)
	}

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody title={__("Button Type setting", 'itmar_block_collections')} initialOpen={true} className="form_setteing_ctrl">
					<label className="components-base-control__label">{__("Select Button Type", 'itmar_block_collections')}</label>
					<PanelRow className='itmar_select_row'>
						<RadioControl
							selected={buttonType}
							options={[
								{ label: __("Button", 'itmar_block_collections'), value: 'button' },
								{ label: __("Submit", 'itmar_block_collections'), value: 'submit' },
							]}
							onChange={(changeOption) => { setAttributes({ buttonType: changeOption }); }
							}
						/>
					</PanelRow>
					{buttonType === 'submit' &&
						<TextControl
							label={__("Button Label", 'itmar_block_collections')}
							value={labelContent}
							onChange={(newVal) => setAttributes({ labelContent: newVal })}
						/>
					}

				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">

				<PanelBody title={__("Global settings", 'itmar_block_collections')} initialOpen={false} className="button_design_ctrl">
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
				<PanelBody title={__("Button style settings", 'itmar_block_collections')} initialOpen={false} className="check_design_ctrl">
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
							label: __("Choose Input color", 'itmar_block_collections'),
							onColorChange: (newValue) => setAttributes({ labelColor: newValue }),
						},
						{
							colorValue: buttonColor,
							gradientValue: buttonGradient,
							label: __("Choose Button Background color", 'itmar_block_collections'),
							onColorChange: (newValue) => {
								setAttributes({ buttonColor: newValue === undefined ? '' : newValue });
							},
							onGradientChange: (newValue) => setAttributes({ buttonGradient: newValue }),
						},
						]}
					/>

				</PanelBody>

			</InspectorControls>

			<BlockControls>
				<AlignmentToolbar
					value={align}
					onChange={(nextAlign) => {
						setAttributes({ align: nextAlign });
					}}
				/>
			</BlockControls>

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
