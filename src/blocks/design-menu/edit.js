
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
	RangeControl,
	__experimentalBoxControl as BoxControl,
	__experimentalBorderBoxControl as BorderBoxControl
} from '@wordpress/components';

import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';

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
		bgColor_val,
		bgGradient_val,
		radius_val,
		border_val,
		margin_val,
		padding_val,
		shadow_element,
		grid_info,
		is_shadow,
		className
	} = attributes;

	//単色かグラデーションかの選択
	const bgColor = bgColor_val || bgGradient_val;
	const blockProps = useBlockProps({ style: { background: bgColor } });

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);

	// 子ブロックのリストを取得
	const innerBlocks = useSelect((select) => {
		return select('core/block-editor').getBlockOrder(clientId);
	}, [clientId]);

	// 子ブロックのリストを確認して、core/image が存在するかどうかを判断
	const hasImageBlock = innerBlocks.some(blockId => {
		const block = useSelect((select) => select('core/block-editor').getBlock(blockId), [blockId]);
		return block.name === 'core/image';
	});

	//メニューアイテム（インナーブロック）
	const TEMPLATE = [
		['itmar/design-title', {}]
	]
	// className が 'is-style-grid' に含まれ、かつ、core/imageがないときは、allowedBlocks に 'core/image' を追加
	const allowedBlocks = (className === 'is-style-grid') && !hasImageBlock
		? ['itmar/design-title', 'core/image']
		: ['itmar/design-title'];
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks: allowedBlocks,
			template: TEMPLATE,
			templateLock: false
		}
	);

	//イメージブロック
	const { insertBlocks } = useDispatch('core/block-editor');
	useEffect(() => {//スタイルがグリッドでイメージ挿入モードがtrueの場合

		if (className === 'is-style-grid' && grid_info.is_image) {
			const imageBlock = createBlock('core/image', {});
			insertBlocks(imageBlock, 0, clientId);  // insert new block at the first position
		}

	}, [className, grid_info.is_image]);

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
				{className === 'is-style-grid' &&
					<PanelBody title={__("Grid Info settings", 'itmar_block_collections')} initialOpen={false} className="form_design_ctrl">

						<RangeControl
							value={grid_info.col_num}
							label={__("Number of Columns", 'itmar_block_collections')}
							max={6}
							min={2}
							onChange={(val) => {
								const newVal = { ...grid_info, col_num: val }
								setAttributes({ grid_info: newVal })
							}}
							withInputField={true}
						/>
						<ToggleControl
							label={__('Is Image', 'itmar_block_collections')}
							checked={grid_info.is_image}
							onChange={(val) => {
								const newVal = { ...grid_info, is_image: val }
								setAttributes({ grid_info: newVal })
							}}
						/>
						{grid_info.is_image &&
							<PanelBody title={__("Image Settings", 'itmar_block_collections')} initialOpen={false} className="border_design_ctrl">

								<BoxControl
									label={__("Image Padding settings", 'itmar_block_collections')}
									values={grid_info.image_padding}
									onChange={val => {
										const newVal = { ...grid_info, image_padding: val }
										setAttributes({ grid_info: newVal })
									}}
									units={units}	// 許可する単位
									allowReset={true}	// リセットの可否
									resetValues={padding_resetValues}	// リセット時の値

								/>
							</PanelBody>
						}
					</PanelBody>
				}
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
