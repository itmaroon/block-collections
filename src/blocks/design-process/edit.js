
import { __ } from '@wordpress/i18n';
import './editor.scss';
import { StyleComp } from './StyleProcess';
import TypographyControls from '../TypographyControls'
import { useStyleIframe } from '../iframeFooks';
import ShadowStyle, { ShadowElm } from '../ShadowStyle';
import { useElementBackgroundColor, useIsIframeMobile } from '../CustomFooks'

import {
	useBlockProps,
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
import { useEffect, useRef } from '@wordpress/element';

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

export default function Edit({ attributes, setAttributes, context, clientId }) {
	const {
		bgColor,
		bgColor_form,
		bgGradient_form,
		radius_form,
		border_form,
		default_pos,
		mobile_pos,
		font_style_num,
		textColor_num,
		bgColor_num,
		font_style_process,
		textColor_process,
		shadow_element,
		is_shadow
	} = attributes;

	//モバイルの判定
	const isMobile = useIsIframeMobile();

	//ブロックの参照
	const blockRef = useRef(null);
	const blockProps = useBlockProps({
		ref: blockRef,// ここで参照を blockProps に渡しています
		style: { backgroundColor: bgColor }
	});

	//背景色の取得
	const baseColor = useElementBackgroundColor(blockRef, blockProps.style);

	//背景色変更によるシャドー属性の書き換え
	useEffect(() => {
		if (baseColor) {
			setAttributes({ shadow_element: { ...shadow_element, baseColor: baseColor } });
			const new_shadow = ShadowElm({ ...shadow_element, baseColor: baseColor });
			if (new_shadow) { setAttributes({ shadow_result: new_shadow.style }); }
		}
	}, [baseColor]);

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);

	//ステージの状態を親ブロックから取得
	const state_process = context['itmar/state_process'];

	// 兄弟ブロックの取得
	const figureBlocks = useSelect((select) => {
		const { getBlockRootClientId, getBlocks } = select('core/block-editor');
		// 親ブロックのclientIdを取得
		const parentClientId = getBlockRootClientId(clientId);
		// 兄弟ブロックを取得
		let siblingBlocks = getBlocks(parentClientId);
		// 特定のブロック名のリスト
		const allowedBlocks = [
			'itmar/confirm-figure-block',
			'itmar/input-figure-block',
			'itmar/thanks-figure-block'
		];
		//自分を抜く
		siblingBlocks = siblingBlocks.filter(block => block.clientId !== clientId && allowedBlocks.includes(block.name));
		return siblingBlocks; //ブロックを返す
	}, [clientId]); // clientIdが変わるたびに監視対象のstateを更新する

	// noticeの表示
	const { removeBlock } = useDispatch('core/block-editor');
	const { createNotice } = useDispatch('core/notices');
	if (figureBlocks.length === 0) {
		createNotice(
			'error',
			__('This block will not work unless the Form Send plugin block is a sibling block.', 'itmar_block_collections'),
			{ type: 'snackbar', isDismissible: true, }
		);
		// メッセージ表示後、ブロックを削除
		removeBlock(clientId);
	}

	//属性にブロック情報を格納
	useEffect(() => {
		const blocks = figureBlocks.map((block) => {
			return {
				block_name: block.name,
				stage_info: block.attributes.stage_info
			};
		});
		setAttributes({ figure_blocks: blocks })
	}, [figureBlocks]);

	//現在のステージはどこにあるか
	const stage_index = figureBlocks.findIndex(block => block.name.includes(state_process));

	return (
		<>
			<InspectorControls group="styles">
				<PanelBody title={__("Global settings", 'itmar_block_collections')} initialOpen={false} className="form_design_ctrl">

					<PanelColorGradientSettings
						title={__("Background Color Setting", 'itmar_block_collections')}
						settings={[
							{
								colorValue: bgColor,
								label: __("Choose Block Background color", 'itmar_block_collections'),
								onColorChange: (newValue) => setAttributes({ bgColor: newValue }),
							},
							{
								colorValue: bgColor_form,
								gradientValue: bgGradient_form,

								label: __("Choose Form Background color", 'itmar_block_collections'),
								onColorChange: (newValue) => setAttributes({ bgColor_form: newValue }),
								onGradientChange: (newValue) => setAttributes({ bgGradient_form: newValue }),
							},
						]}
					/>
					<PanelBody title={__("Border Settings", 'itmar_block_collections')} initialOpen={false} className="border_design_ctrl">
						<BorderBoxControl

							onChange={(newValue) => setAttributes({ border_form: newValue })}
							value={border_form}
							allowReset={true}	// リセットの可否
							resetValues={border_resetValues}	// リセット時の値
						/>
						<BorderRadiusControl
							values={radius_form}
							onChange={(newBrVal) =>
								setAttributes({ radius_form: typeof newBrVal === 'string' ? { "value": newBrVal } : newBrVal })}
						/>
					</PanelBody>
					<BoxControl
						label={!isMobile ?
							__("Margin settings(desk top)", 'itmar_block_collections')
							: __("Margin settings(mobile)", 'itmar_block_collections')
						}
						values={!isMobile ? default_pos.margin_form : mobile_pos.margin_form}
						onChange={value => {
							if (!isMobile) {
								setAttributes({ default_pos: { ...default_pos, margin_form: value } });
							} else {
								setAttributes({ mobile_pos: { ...mobile_pos, margin_form: value } });
							}
						}}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>
					<BoxControl
						label={!isMobile ?
							__("Padding settings(desk top)", 'itmar_block_collections')
							: __("Padding settings(mobile)", 'itmar_block_collections')
						}
						values={!isMobile ? default_pos.padding_form : mobile_pos.padding_form}
						onChange={value => {
							if (!isMobile) {
								setAttributes({ default_pos: { ...default_pos, padding_form: value } })
							} else {
								setAttributes({ mobile_pos: { ...mobile_pos, padding_form: value } })
							}
						}}
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
					{is_shadow &&
						<ShadowStyle
							shadowStyle={{ ...shadow_element }}
							onChange={(newStyle, newState) => {
								setAttributes({ shadow_result: newStyle.style });
								setAttributes({ shadow_element: newState })
							}}
						/>
					}
				</PanelBody>

				<PanelBody title={__("Settings by style", 'itmar_block_collections')} initialOpen={false} className="form_design_ctrl">
					<PanelBody title={__("process number", 'itmar_block_collections')} initialOpen={false} className="form_design_ctrl">
						<TypographyControls
							title={__("Typography", 'itmar_block_collections')}
							fontStyle={font_style_num}
							onChange={(newStyle) => {
								setAttributes({ font_style_num: newStyle })
							}}
							initialOpen={false}
						/>
						<PanelColorGradientSettings
							title={__("Color Setting", 'itmar_block_collections')}
							settings={[
								{
									colorValue: textColor_num,
									label: __("Choose Text color", 'itmar_block_collections'),
									onColorChange: (newValue) => setAttributes({ textColor_num: newValue }),
								},
								{
									colorValue: bgColor_num,
									label: __("Choose background color", 'itmar_block_collections'),
									onColorChange: (newValue) => setAttributes({ bgColor_num: newValue }),
								}
							]}
						/>
					</PanelBody>

					<PanelBody title={__("Process Display", 'itmar_block_collections')} initialOpen={false} className="form_design_ctrl">
						<TypographyControls
							title={__("Typography", 'itmar_block_collections')}
							fontStyle={font_style_process}
							onChange={(newStyle) => {
								setAttributes({ font_style_process: newStyle })
							}}
							initialOpen={false}
						/>
						<PanelColorGradientSettings
							title={__("Color Setting", 'itmar_block_collections')}
							settings={[
								{
									colorValue: textColor_process,
									label: __("Choose Text color", 'itmar_block_collections'),
									onColorChange: (newValue) => setAttributes({ textColor_process: newValue }),
								}
							]}
						/>
					</PanelBody>

				</PanelBody>

			</InspectorControls>

			<div {...blockProps} >

				<StyleComp attributes={attributes} >
					{figureBlocks.map((block, index) =>
						<li key={index} className={stage_index >= index ? "ready" : ""}>
							{block.attributes.stage_info}
						</li>
					)}
				</StyleComp>
			</div>
		</>
	);
}
