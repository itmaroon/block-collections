
import { __ } from '@wordpress/i18n';
import TypographyControls from '../TypographyControls'
import IconSelectControl from '../IconSelectControl';
import { StyleComp } from './StyleWapper';
import ShadowStyle from '../ShadowStyle';
import { useStyleIframe, useFontawesomeIframe } from '../iframeFooks';
import {
	Button,
	PanelBody,
	PanelRow,
	ToggleControl,
	RangeControl,
	RadioControl,
	Modal,
	TextControl,
	ToolbarDropdownMenu,
	__experimentalBoxControl as BoxControl,
	__experimentalUnitControl as UnitControl,
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
import { useEffect, useState, useRef } from '@wordpress/element';

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
//ヘッダーレベルアイコン
const getIconForLevel = level => {
	return (
		<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
			<text x="0" y="15" fontSize="15" font-weight="bold">{`H${level}`}</text>
		</svg>
	);
};


export default function Edit({ attributes, setAttributes }) {
	const {
		bgColor,
		headingContent,
		headingType,
		titleType,
		font_style_heading,
		margin_heading,
		padding_heading,
		align,
		bg_heading,
		gr_heading,
		textColor,
		radius_heading,
		border_heading,
		optionStyle,
		shadow_element,
		is_shadow,
		className,
	} = attributes;

	const blockProps = useBlockProps({ style: { backgroundColor: bgColor } });

	//最初の状態
	const prevClassRef = useRef(false);

	// ローカル状態の作成
	const [localOptionStyle, setLocalOptionStyle] = useState(optionStyle);

	// localOptionStyle の変更があるたびに setAttributes を呼び出す
	useEffect(() => {
		setAttributes({ optionStyle: localOptionStyle });
	}, [localOptionStyle]);

	// titleTypeの変更があるたびに titleの内容を変える
	const [siteTitle, setSiteTitle] = useState('');
	useEffect(() => {
		if (titleType === 'plaine') return;//plainのときは何もしない
		// Fetch site title from the REST API
		fetch('/wp-json')
			.then(response => response.json())
			.then(data => {
				if (titleType === 'site') {
					setSiteTitle(data.name);
				} else {
					setSiteTitle(data.description);
				}
			});
	}, [titleType]);

	//スタイル変更時のデフォルト再設定
	const execHandle = () => {
		let reset_style;
		switch (className) {
			case 'is-style-circle_marker':
				reset_style = {
					styleName: 'is-style-circle_marker',
					colorVal_circle: '#D1D7F2',
					colorVal_second: '#9FAEF2',
					circleScale: '3em',
					secondScale: '1.5em',
					second_opacity: 0.7,
					first_long: 10,
					first_lat: -5,
					second_long: -10,
					second_lat: 10,
					isSecond: true
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
		//refの更新
		prevClassRef.current = className;
		//確認ダイアログを消す
		setIsChangeModalOpen(false);
	}

	const cancelHandle = () => {
		//キャンセルが押されたことを記録
		setIsCancelFlg(true);
		//classNameを元に戻す
		setAttributes({ className: prevClassRef.current })
		//確認ダイアログを消す
		setIsChangeModalOpen(false);
	}

	//スタイル変更確認ダイアログ操作関数
	const [isCangeModalOpen, setIsChangeModalOpen] = useState(false);
	const [isCancelFlg, setIsCancelFlg] = useState(false);

	//スタイル変更によるoptionStyleの初期化
	useEffect(() => {
		if (prevClassRef.current != false) {//最初のレンダリングでは初期化しない
			if (isCancelFlg) {
				//isCancelFlgがtrueのときはfalseに戻して何もしない
				setIsCancelFlg(false);
				return;
			}
			if (prevClassRef.current === undefined || prevClassRef.current === 'is-style-default') {
				execHandle();
				return;
			}
			//確認ダイアログの表示
			setIsChangeModalOpen(true);
		}
		else {
			prevClassRef.current = className;
		}
	}, [className])

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);
	//iframeにfontawesomeを読み込む
	useFontawesomeIframe();

	//TextControlの表示用変数
	const [copyInputValue, setCopyInputValue] = useState((optionStyle && optionStyle.copy_content !== undefined) ? optionStyle.copy_content : 'SAMPLE');

	function renderContent() {
		return (
			<>
				{titleType === 'plaine' ? (
					<RichText
						tagName={headingType}
						className="has-text-color"
						onChange={(newContent) => {
							setAttributes({ headingContent: newContent });
						}}
						value={headingContent}
						placeholder={__('Write Title text...', 'itmar_block_collections')}
					/>
				) : (
					React.createElement(
						headingType.toLowerCase(),
						{ className: "has-text-color" },
						siteTitle
					)
				)}
			</>
		);
	}

	return (
		<>
			<InspectorControls group="settings">
				<div className="itmar_title_type">
					<RadioControl
						label={__("Title type", 'itmar_block_collections')}
						selected={titleType}
						options={[
							{ label: __("Plaine", 'itmar_block_collections'), value: 'plaine' },
							{ label: __("Site Title", 'itmar_block_collections'), value: 'site' },
							{ label: __("Chatch Phrase", 'itmar_block_collections'), value: 'catch' }
						]}
						onChange={(changeOption) => setAttributes({ titleType: changeOption })}
						help={__("You can display the site title and catchphrase in addition to the blank title.", 'itmar_block_collections')}
					/>
				</div>

			</InspectorControls >

			<InspectorControls group="styles">
				<PanelBody title={__("Global settings", 'itmar_block_collections')} initialOpen={false} className="title_design_ctrl">
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

					<ToggleControl
						label={__('Is Shadow', 'itmar_block_collections')}
						checked={is_shadow}
						onChange={(newVal) => {
							setAttributes({ is_shadow: newVal })
						}}
					/>
				</PanelBody>
				<PanelBody title={__("Heading settings", 'itmar_block_collections')} initialOpen={false} className="title_design_ctrl">
					<TypographyControls
						title={__('Typography', 'itmar_block_collections')}
						fontStyle={font_style_heading}
						onChange={(newStyle) => {
							setAttributes({ font_style_heading: newStyle })
						}}
						initialOpen={false}
					/>

					<PanelColorGradientSettings
						title={__("Heading Color Setting", 'itmar_block_collections')}
						settings={[{
							colorValue: textColor,
							label: __("Choose Text color", 'itmar_block_collections'),
							onColorChange: (newValue) => setAttributes({ textColor: newValue }),
						},
						{
							colorValue: bg_heading,
							gradientValue: gr_heading,

							label: __("Choose Background color", 'itmar_block_collections'),
							onColorChange: (newValue) => setAttributes({ bg_heading: newValue }),
							onGradientChange: (newValue) => setAttributes({ gr_heading: newValue }),
						},
						]}
					/>
					<BoxControl
						label={__("Margin settings", 'itmar_block_collections')}
						values={margin_heading}
						onChange={value => setAttributes({ margin_heading: value })}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>

					<BoxControl
						label={__("Padding settings", 'itmar_block_collections')}
						values={padding_heading}
						onChange={value => setAttributes({ padding_heading: value })}
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
				</PanelBody>


				{className === 'is-style-circle_marker' &&
					<PanelBody title={__("Circle Marker Settings", 'itmar_block_collections')} initialOpen={false} className="title_design_ctrl">
						<PanelColorGradientSettings
							title={__("Circle Color Setting", 'itmar_block_collections')}
							settings={[{
								colorValue: (optionStyle && optionStyle.colorVal_circle) ? optionStyle.colorVal_circle : '#D1D7F2',
								gradientValue: (optionStyle && optionStyle.gradientVal_circle) ? optionStyle.gradientVal_circle : undefined,

								label: __("Choose Circle Background", 'itmar_block_collections'),
								onColorChange: (newValue) => {
									setLocalOptionStyle(prev => ({ ...prev, colorVal_circle: newValue }));
								},
								onGradientChange: (newValue) => {
									setLocalOptionStyle(prev => ({ ...prev, gradientVal_circle: newValue }));
								},
							},
							]}
						/>

						<UnitControl
							dragDirection="e"
							onChange={(newValue) => {
								setLocalOptionStyle(prev => ({ ...prev, circleScale: newValue }));
							}}
							label={__("Circle Scale Setting", 'itmar_block_collections')}
							value={(optionStyle && optionStyle.circleScale) ? optionStyle.circleScale : '3em'}
						/>
						<PanelBody title={__("Position Settings", 'itmar_block_collections')} initialOpen={true} className="title_design_ctrl">
							<RangeControl
								value={(optionStyle && optionStyle.first_lat) ? optionStyle.first_lat : 10}
								label={__("Lateral direction", 'itmar_block_collections')}
								max={50}
								min={-30}
								step={1}
								onChange={(newValue) => {
									setLocalOptionStyle(prev => ({ ...prev, first_lat: newValue }));
								}}
								withInputField={false}
							/>
							<RangeControl
								value={(optionStyle && optionStyle.first_long) ? optionStyle.first_long : 10}
								label={__("Longitudinal direction", 'itmar_block_collections')}
								max={50}
								min={-30}
								step={1}
								onChange={(newValue) => {
									setLocalOptionStyle(prev => ({ ...prev, first_long: newValue }));
								}}
								withInputField={false}
							/>
						</PanelBody>
						<PanelBody title={__("Second Circle Settings", 'itmar_block_collections')} initialOpen={true}>
							<ToggleControl
								label={__('Second Circle', 'itmar_block_collections')}
								checked={(optionStyle && optionStyle.isSecond) ? optionStyle.isSecond : true}
								onChange={(newValue) => {
									setLocalOptionStyle(prev => ({ ...prev, isSecond: newValue }));
								}}
							/>
						</PanelBody>
						{((optionStyle && optionStyle.isSecond) ? optionStyle.isSecond : false) &&
							<>
								<PanelColorGradientSettings
									title={__("Circle Color Setting", 'itmar_block_collections')}
									settings={[{
										colorValue: (optionStyle && optionStyle.colorVal_second) ? optionStyle.colorVal_second : '#9FAEF2',
										gradientValue: (optionStyle && optionStyle.gradientVal_second) ? optionStyle.gradientVal_second : undefined,

										label: __("Choose Circle Background", 'itmar_block_collections'),
										onColorChange: (newValue) => {
											setLocalOptionStyle(prev => ({ ...prev, colorVal_second: newValue }));
										},
										onGradientChange: (newValue) => {
											setLocalOptionStyle(prev => ({ ...prev, gradientVal_second: newValue }));
										},
									},
									]}
								/>
								<RangeControl
									value={(optionStyle && optionStyle.second_opacity) ? optionStyle.second_opacity : 0.7}
									label={__("Opacity", 'itmar_block_collections')}
									max={1}
									min={0.1}
									step={0.1}
									onChange={(newValue) => {
										setLocalOptionStyle(prev => ({ ...prev, second_opacity: newValue }));
									}}
									withInputField={false}
								/>
								<UnitControl
									dragDirection="e"
									onChange={(newValue) => {
										setLocalOptionStyle(prev => ({ ...prev, secondScale: newValue }));
									}}
									label={__("Circle Scale Setting", 'itmar_block_collections')}
									value={(optionStyle && optionStyle.secondScale) ? optionStyle.secondScale : '1.5em'}
								/>
								<PanelBody title={__("Position Settings", 'itmar_block_collections')} initialOpen={true} className="title_design_ctrl">
									<RangeControl
										value={(optionStyle && optionStyle.second_lat) ? optionStyle.second_lat : 20}
										label={__("Lateral direction", 'itmar_block_collections')}
										max={50}
										min={-30}
										step={1}
										onChange={(newValue) => {
											setLocalOptionStyle(prev => ({ ...prev, second_lat: newValue }));
										}}
										withInputField={false}
									/>
									<RangeControl
										value={(optionStyle && optionStyle.second_long) ? optionStyle.second_long : -10}
										label={__("Longitudinal direction", 'itmar_block_collections')}
										max={50}
										min={-30}
										step={1}
										onChange={(newValue) => {
											setLocalOptionStyle(prev => ({ ...prev, second_long: newValue }));
										}}
										withInputField={false}
									/>
								</PanelBody>
							</>
						}
					</PanelBody>
				}

				{className === 'is-style-sub_copy' &&
					<PanelBody title={__("Sub Copy Settings", 'itmar_block_collections')} initialOpen={false} className="title_design_ctrl">
						<PanelColorGradientSettings
							title={__("Copy Color Setting", 'itmar_block_collections')}
							settings={[{
								colorValue: (optionStyle && optionStyle.color_text_copy) ? optionStyle.color_text_copy : '#000',
								label: __("Choose Text color", 'itmar_block_collections'),
								onColorChange: (newValue) => {
									setLocalOptionStyle(prev => ({ ...prev, color_text_copy: newValue }));
								},
							},
							{
								colorValue: (optionStyle && optionStyle.color_background_copy) ? optionStyle.color_background_copy : '#d1cece',
								gradientValue: (optionStyle && optionStyle.gradient_background_copy) ? optionStyle.gradient_background_copy : undefined,

								label: __("Choose Background color", 'itmar_block_collections'),
								onColorChange: (newValue) => {
									setLocalOptionStyle(prev => ({ ...prev, color_background_copy: newValue }));
								},
								onGradientChange: (newValue) => {

									setLocalOptionStyle(prev => ({ ...prev, gradient_background_copy: newValue }));
								},
							},
							]}
						/>

						<PanelRow className='copyInfo_row'>
							<TextControl
								label={__("Copy Text", 'itmar_block_collections')}
								labelPosition="top"
								value={copyInputValue}
								onChange={(newValue) => {
									setCopyInputValue(newValue);
									setLocalOptionStyle(prev => ({ ...prev, copy_content: newValue }));
								}}
							/>
						</PanelRow>

						<TypographyControls
							title={__('Typography', 'itmar_block_collections')}
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

						<PanelBody title={__("Border Settings", 'itmar_block_collections')} initialOpen={true}>
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
								label={__("Padding settings", 'itmar_block_collections')}
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
						<PanelBody title={__("Icon settings", 'itmar_block_collections')} initialOpen={true}>
							<ToggleControl
								label={__('Append icon', 'itmar_block_collections')}
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
					</PanelBody >
				}
			</InspectorControls >

			<BlockControls>
				<AlignmentToolbar
					value={align}
					onChange={(nextAlign) => {
						setAttributes({ align: nextAlign });
					}}
				/>
				<ToolbarDropdownMenu
					label={__('Change heading level')}
					icon={getIconForLevel(parseInt(headingType.slice(1), 10))}
					controls={[1, 2, 3, 4, 5, 6].map(level => ({
						icon: getIconForLevel(level),
						title: `Heading ${level}`,
						isActive: headingType === `H${level}`,
						onClick: () => setAttributes({ headingType: `H${level}` }),
					}))}
				/>
			</BlockControls>

			{isCangeModalOpen && (
				<Modal
					title={__("Confirm Deletion", 'itmar_block_collections')}
					onRequestClose={cancelHandle}
				>
					<p>{__("Changing a style resets the style-specific settings. Are you sure?", 'itmar_block_collections')}</p>
					<Button variant="primary" onClick={execHandle}>{__("Yes, Change", 'itmar_block_collections')}</Button>
					<Button variant="secondary" onClick={cancelHandle}>{__("Cancel", 'itmar_block_collections')}</Button>
				</Modal>
			)}


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
			</div>

		</>
	);
}
