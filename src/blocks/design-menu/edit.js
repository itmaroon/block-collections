
import { __ } from '@wordpress/i18n';
import './editor.scss';
import { StyleComp } from './StyleMenu';
import { useStyleIframe } from '../iframeFooks';
import ShadowStyle from '../ShadowStyle';

import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalBorderRadiusControl as BorderRadiusControl
} from '@wordpress/block-editor';

import {
	PanelBody,
	ToggleControl,
	__experimentalBoxControl as BoxControl,
	__experimentalBorderBoxControl as BorderBoxControl
} from '@wordpress/components';

import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

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
		bgColor_val,
		bgGradient_val,
		radius_val,
		border_val,
		margin_val,
		padding_val,
		shadow_element,
		is_shadow
	} = attributes;

	//単色かグラデーションかの選択
	const bgColor = bgColor_val || bgGradient_val;
	const blockProps = useBlockProps({ style: { background: bgColor } });

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);
	//メニューアイテム（インナーブロック）
	const TEMPLATE = [
		['itmar/design-title', {}]
	]
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks: ['itmar/design-title'],
			template: TEMPLATE,
			templateLock: false
		}
	);

	return (
		<>
			<InspectorControls group="styles">
				<PanelBody title={__("Global settings", 'itmar_block_collections')} initialOpen={false} className="form_design_ctrl">

					<PanelColorGradientSettings
						title={__("Background Color Setting", 'itmar_block_collections')}
						settings={[
							{
								colorValue: bgColor_val,
								gradientValue: bgGradient_val,
								enableAlpha: true,
								label: __("Choose Background color", 'itmar_block_collections'),
								onColorChange: (newValue) => {
									setAttributes({ bgColor_val: newValue === undefined ? '' : newValue });
								},
								onGradientChange: (newValue) => setAttributes({ bgGradient_val: newValue }),
							},
						]}
					/>
					<PanelBody title={__("Border Settings", 'itmar_block_collections')} initialOpen={false} className="border_design_ctrl">
						<BorderBoxControl

							onChange={(newValue) => setAttributes({ border_val: newValue })}
							value={border_val}
							allowReset={true}	// リセットの可否
							resetValues={border_resetValues}	// リセット時の値
						/>
						<BorderRadiusControl
							values={radius_val}
							onChange={(newBrVal) =>
								setAttributes({ radius_val: typeof newBrVal === 'string' ? { "value": newBrVal } : newBrVal })}
						/>
					</PanelBody>
					<BoxControl
						label={__("Margin settings", 'itmar_block_collections')}
						values={margin_val}
						onChange={value => setAttributes({ margin_val: value })}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>
					<BoxControl
						label={__("Padding settings", 'itmar_block_collections')}
						values={padding_val}
						onChange={value => setAttributes({ padding_val: value })}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>
					<ToggleControl
						label={__('Is Shadow', 'itmar_block_collections')}
						checked={is_shadow}
						onChange={(newVal) => {
							setAttributes({ is_shadow: newVal })
						}}
					/>
				</PanelBody>

			</InspectorControls>

			<div {...blockProps} >
				<StyleComp attributes={attributes} >
					{is_shadow ? (
						<ShadowStyle
							shadowStyle={{ ...shadow_element, backgroundColor: bgColor }}
							onChange={(newStyle, newState) => {
								setAttributes({ shadow_result: newStyle.style });
								setAttributes({ shadow_element: newState })
							}}
						>
							<div {...innerBlocksProps}></div>
						</ShadowStyle>
					) : (
						<div {...innerBlocksProps}></div>
					)}
				</StyleComp>
			</div>
		</>
	);
}
