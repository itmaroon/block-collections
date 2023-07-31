
import { __ } from '@wordpress/i18n';
import './editor.scss';
import { StyleComp } from './StyleProcess';
import TypographyControls from '../TypographyControls'

import {
	useBlockProps,
	InnerBlocks,
	RichText,
	useInnerBlocksProps,
	InspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalBorderRadiusControl as BorderRadiusControl
} from '@wordpress/block-editor';

import {
	Button,
	Panel,
	PanelBody,
	PanelRow,
	ToggleControl,
	TextareaControl,
	Notice,
	RangeControl,
	RadioControl,
	TextControl,
	__experimentalBoxControl as BoxControl,
	__experimentalUnitControl as UnitControl,
	__experimentalBorderBoxControl as BorderBoxControl
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
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

export default function Edit({ attributes, setAttributes, context, clientId }) {
	const {
		bgColor_form,
		bgGradient_form,
		radius_form,
		border_form,
		margin_form,
		padding_form,
		font_style_num,
		textColor_num,
		bgColor_num,
		font_style_process,
		textColor_process
	} = attributes;

	//ステージの状態を親ブロックから取得
	const state_process = context['itmar/state_process'];

	// 兄弟ブロックの取得
	const figureBlocks = useSelect((select) => {
		const { getBlockRootClientId, getBlocks } = select('core/block-editor');
		// 親ブロックのclientIdを取得
		const parentClientId = getBlockRootClientId(clientId);
		// 兄弟ブロックを取得
		let siblingBlocks = getBlocks(parentClientId);
		//自分を抜く
		siblingBlocks = siblingBlocks.filter(block => block.clientId !== clientId);
		return siblingBlocks; //ブロックを返す
	}, [clientId]); // clientIdが変わるたびに監視対象のstateを更新する

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
				<PanelBody title="共通設定" initialOpen={false} className="form_design_ctrl">

					<PanelColorGradientSettings
						title={__(" Background Color Setting")}
						settings={[
							{
								colorValue: bgColor_form,
								gradientValue: bgGradient_form,

								label: __("Choose Background color"),
								onColorChange: (newValue) => setAttributes({ bgColor_form: newValue }),
								onGradientChange: (newValue) => setAttributes({ bgGradient_form: newValue }),
							},
						]}
					/>
					<PanelBody title="ボーダー設定" initialOpen={false} className="border_design_ctrl">
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
						label="マージン設定"
						values={margin_form}
						onChange={value => setAttributes({ margin_form: value })}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>
					<BoxControl
						label="パティング設定"
						values={padding_form}
						onChange={value => setAttributes({ padding_form: value })}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>

				</PanelBody>

				<PanelBody title="スタイル別設定" initialOpen={false} className="form_design_ctrl">
					<PanelBody title="プロセス番号" initialOpen={false} className="form_design_ctrl">
						<TypographyControls
							title='タイポグラフィー'
							fontStyle={font_style_num}
							onChange={(newStyle) => {
								setAttributes({ font_style_num: newStyle })
							}}
							initialOpen={false}
						/>
						<PanelColorGradientSettings
							title={__("Color Setting")}
							settings={[
								{
									colorValue: textColor_num,
									label: __("Choose Text color"),
									onColorChange: (newValue) => setAttributes({ textColor_num: newValue }),
								},
								{
									colorValue: bgColor_num,
									label: __("Choose background color"),
									onColorChange: (newValue) => setAttributes({ bgColor_num: newValue }),
								}
							]}
						/>
					</PanelBody>

					<PanelBody title="プロセス表示" initialOpen={false} className="form_design_ctrl">
						<TypographyControls
							title='タイポグラフィー'
							fontStyle={font_style_process}
							onChange={(newStyle) => {
								setAttributes({ font_style_process: newStyle })
							}}
							initialOpen={false}
						/>
						<PanelColorGradientSettings
							title={__("Color Setting")}
							settings={[
								{
									colorValue: textColor_process,
									label: __("Choose Text color"),
									onColorChange: (newValue) => setAttributes({ textColor_process: newValue }),
								}
							]}
						/>


					</PanelBody>
				</PanelBody>

			</InspectorControls>

			<div {...useBlockProps()} >
				<StyleComp attributes={attributes}>
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
