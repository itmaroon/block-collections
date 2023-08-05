
import { __ } from '@wordpress/i18n';
import TypographyControls from '../TypographyControls'
import IconSelectControl from '../IconSelectControl';
import { StyleComp } from './StyleWapper';
import { useStyleIframe, useFontawesomeIframe } from '../iframeFooks';

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
import { useEffect, useState, useRef } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const {
		headingContent,
		font_style_heading,
		margin_heading,
		padding_heading,
		align,
		backgroundColor,
		backgroundGradient,
		textColor,
		radius_heading,
		border_heading,
		optionStyle,
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

	//最初の状態
	const renderFlgRef = useRef(false);

	// ローカル状態の作成
	const [localOptionStyle, setLocalOptionStyle] = useState(optionStyle);

	// localOptionStyle の変更があるたびに setAttributes を呼び出す
	useEffect(() => {
		setAttributes({ optionStyle: localOptionStyle });
	}, [localOptionStyle]);

	//スタイル変更によるoptionStyleの初期化
	useEffect(() => {
		if (renderFlgRef.current) {//最初のレンダリングでは初期化しない
			let reset_style;
			switch (className) {
				case 'is-style-virtical_line':
					reset_style = {
						styleName: 'is-style-virtical_line',
						colorVal_border: '#000',
						barWidth: '5px',
						barSpace: '10px'
					}
					break;
				case 'is-style-sub_copy':
					reset_style = {
						styleName: 'is-style-sub_copy',
						color_text_copy: '#000',
						color_background_copy: '#d1cece',
						copy_content: 'SAMPLE',
						font_style_copy: {
							fontSize: "16px",
							fontFamily: "Arial, sans-serif",
							fontWeight: "500",
							isItalic: false
						},
						radius_copy: {
							topLeft: "10px",
							topRight: "10px",
							bottomRight: "0px",
							bottomLeft: "0px",
							value: "0px"

						},
						padding_copy: {
							top: "10px",
							left: "10px",
							bottom: "10px",
							right: "10px"

						},
						isIcon: false,
						icon_style: {
							icon_name: "f030",
							icon_pos: "left",
							icon_size: "24px",
							icon_color: "#000",
							icon_space: "5px"

						}
					}
					break;
			}
			setLocalOptionStyle(reset_style);
		}
		else {
			renderFlgRef.current = true
		}
	}, [className])

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);
	//iframeにfontawesomeを読み込む
	useFontawesomeIframe();

	//TextControlの表示用変数
	const [copyInputValue, setCopyInputValue] = useState((optionStyle && optionStyle.copy_content !== undefined) ? optionStyle.copy_content : 'SAMPLE');

	return (
		<>
			<InspectorControls group="styles">
				<PanelBody title="ヘディングスタイル設定" initialOpen={false} className="title_design_ctrl">
					<TypographyControls
						title='タイポグラフィー'
						fontStyle={font_style_heading}
						onChange={(newStyle) => {
							setAttributes({ font_style_heading: newStyle })
						}}
						initialOpen={false}
					/>

					<PanelColorGradientSettings
						title={__("Heading Color Setting")}
						settings={[{
							colorValue: textColor,
							label: __("Choose Text color"),
							onColorChange: (newValue) => setAttributes({ textColor: newValue }),
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
						values={margin_heading}
						onChange={value => setAttributes({ margin_heading: value })}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>

					<BoxControl
						label="パティング設定"
						values={padding_heading}
						onChange={value => setAttributes({ padding_heading: value })}
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
				<PanelBody title="スタイル別設定" initialOpen={false} className="title_design_ctrl">

					{className === 'is-style-virtical_line' &&
						<>
							<PanelColorGradientSettings
								title={__("Bar Color Setting")}
								settings={[{
									colorValue: (optionStyle && optionStyle.colorVal_border) ? optionStyle.colorVal_border : '#000',
									gradientValue: (optionStyle && optionStyle.gradientVal_border) ? optionStyle.gradientVal_border : undefined,

									label: __("Choose Line Background"),
									onColorChange: (newValue) => {
										setLocalOptionStyle(prev => ({ ...prev, colorVal_border: newValue }));
									},
									onGradientChange: (newValue) => {
										setLocalOptionStyle(prev => ({ ...prev, gradientVal_border: newValue }));
									},
								},
								]}
							/>

							<PanelRow
								className='sizing_row'
							>
								<UnitControl
									dragDirection="e"
									onChange={(newValue) => {
										setLocalOptionStyle(prev => ({ ...prev, barWidth: newValue }));
									}}
									label='ラインの幅'
									value={(optionStyle && optionStyle.barWidth) ? optionStyle.barWidth : '5px'}
								/>
								<UnitControl
									dragDirection="e"
									onChange={(newValue) => {
										setLocalOptionStyle(prev => ({ ...prev, barSpace: newValue }));
									}}
									label='文字との間隔'
									value={(optionStyle && optionStyle.barSpace) ? optionStyle.barSpace : '10px'}
								/>
							</PanelRow>
						</>
					}

					{className === 'is-style-sub_copy' &&
						<>
							<PanelColorGradientSettings
								title={__("Copy Color Setting")}
								settings={[{
									colorValue: (optionStyle && optionStyle.color_text_copy) ? optionStyle.color_text_copy : '#000',
									label: __("Choose Text color"),
									onColorChange: (newValue) => {
										setLocalOptionStyle(prev => ({ ...prev, color_text_copy: newValue }));
									},
								},
								{
									colorValue: (optionStyle && optionStyle.color_background_copy) ? optionStyle.color_background_copy : '#d1cece',
									gradientValue: (optionStyle && optionStyle.gradient_background_copy) ? optionStyle.gradient_background_copy : undefined,

									label: __("Choose Background color"),
									onColorChange: (newValue) => {
										setLocalOptionStyle(prev => ({ ...prev, color_background_copy: newValue }));
									},
									onGradientChange: (newValue) => {

										setLocalOptionStyle(prev => ({ ...prev, gradient_background_copy: newValue }));
									},
								},
								]}
							/>

							<PanelRow
								className='copyInfo_row'
							>
								<TextControl
									label="コピーテキスト"
									labelPosition="top"
									value={copyInputValue}
									onChange={(newValue) => {
										setCopyInputValue(newValue);
										setLocalOptionStyle(prev => ({ ...prev, copy_content: newValue }));
									}}
								/>
							</PanelRow>

							<TypographyControls
								title='コーピーのタイポグラフィー'
								fontStyle={(optionStyle && optionStyle.font_style_copy) ? optionStyle.font_style_copy : {
									fontSize: "16px",
									fontFamily: "Arial, sans-serif",
									fontWeight: "500",
									isItalic: false
								}}
								initialOpen={false}
								onChange={(newValue) => {
									setLocalOptionStyle(prev => ({ ...prev, font_style_copy: newValue }));
								}}
							/>

							<PanelBody title="ボーダー設定" initialOpen={true}>
								<BorderRadiusControl
									values={(optionStyle && optionStyle.radius_copy) ? optionStyle.radius_copy : {
										topLeft: "10px",
										topRight: "10px",
										bottomRight: "0px",
										bottomLeft: "0px",
										value: "0px"
									}}
									onChange={(newBrVal) => {
										setLocalOptionStyle(prev => ({ ...prev, radius_copy: typeof newBrVal === 'string' ? { "value": newBrVal } : newBrVal }));
									}}
								/>

								<BoxControl
									label="パティング設定"
									values={(optionStyle && optionStyle.padding_copy) ? optionStyle.padding_copy : {
										top: "10px",
										left: "10px",
										bottom: "10px",
										right: "10px"
									}}
									onChange={(newValue) => {
										setLocalOptionStyle(prev => ({ ...prev, padding_copy: newValue }));
									}}
									units={units}	// 許可する単位
									allowReset={true}	// リセットの可否
									resetValues={padding_resetValues}	// リセット時の値

								/>
							</PanelBody>
							<PanelBody title="アイコン設定" initialOpen={true}>
								<ToggleControl
									label='アイコンを付加する'
									checked={(optionStyle && optionStyle.isIcon) ? optionStyle.isIcon : false}
									onChange={(newValue) => {
										setLocalOptionStyle(prev => ({ ...prev, isIcon: newValue }));
									}}
								/>
								{((optionStyle && optionStyle.isIcon) ? optionStyle.isIcon : false) &&
									<IconSelectControl
										iconStyle={(optionStyle && optionStyle.icon_style) ? optionStyle.icon_style : {
											icon_name: "f030",
											icon_pos: "left",
											icon_size: "24px",
											icon_color: "#000",
											icon_space: "5px"
										}}
										onChange={(newValue) => {
											setLocalOptionStyle(prev => ({ ...prev, icon_style: newValue }));
										}}
									/>
								}
							</PanelBody>

						</>
					}
				</PanelBody>


			</InspectorControls>

			<div {...useBlockProps()}>
				<StyleComp attributes={attributes}>
					<RichText
						onChange={
							(newContent) => {
								setAttributes({ headingContent: newContent })
							}
						}
						value={headingContent}
						placeholder={__('Write your text...')}
					/>
				</StyleComp>
			</div>

		</>
	);
}
