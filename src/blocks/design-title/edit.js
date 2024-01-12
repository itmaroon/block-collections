
import { __ } from '@wordpress/i18n';
import TypographyControls from '../TypographyControls'
import IconSelectControl from '../IconSelectControl';
import { StyleComp } from './StyleWapper';
import ShadowStyle, { ShadowElm } from '../ShadowStyle';
import { PageSelectControl, ArchiveSelectControl } from '../wordpressApi';
import apiFetch from '@wordpress/api-fetch';
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
	__experimentalAlignmentMatrixControl as AlignmentMatrixControl
} from '@wordpress/components';
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalBorderRadiusControl as BorderRadiusControl
} from '@wordpress/block-editor';

import './editor.scss';
import { useEffect, useState, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useElementBackgroundColor } from '../CustomFooks'

//スペースのリセットバリュー
const padding_resetValues = {
	top: '10px',
	left: '10px',
	right: '10px',
	bottom: '10px',
}

//リセットバリュー

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


export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		headingContent,
		headingType,
		titleType,
		align,
		padding_heading,
		optionStyle,
		shadow_element,
		is_shadow,
		is_underLine,
		underLine_prop,
		bgColor_underLine,
		bgGradient_underLine,
		linkKind,
		menu_pos,
		is_title_menu,
		selectedPageUrl,
		className,
	} = attributes;

	//テキストの配置
	const align_style = align === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } :
		align === 'right' ? { marginLeft: 'auto' } : {};

	//ブロックの参照
	const blockRef = useRef(null);

	const blockProps = useBlockProps({
		ref: blockRef,// ここで参照を blockProps に渡しています
		style: { position: `${is_title_menu ? 'relative' : 'static'}`, ...align_style }
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

		const fetchSiteInfo = async () => {
			try {
				const response = await apiFetch({ path: '/' });
				if (titleType === 'site') {
					setSiteTitle(response.name);
				} else {
					setSiteTitle(response.description);
				}
			} catch (error) {
				console.error('Error fetching data:', error.message);
			}
		};
		fetchSiteInfo();
	}, [titleType]);

	//スタイル変更時のデフォルト再設定
	const execHandle = () => {

		let reset_style;
		if (className?.split(' ').includes('is-style-circle_marker')) {
			reset_style = {
				styleName: 'is-style-circle_marker',
				colorVal_circle: 'var(--wp--preset--color--accent-1)',
				colorVal_second: 'var(--wp--preset--color--accent-2)',
				circleScale: '3em',
				secondScale: '1.5em',
				second_opacity: 0.7,
				first_long: 10,
				first_lat: -5,
				second_long: -10,
				second_lat: 10,
				isSecond: true
			}
		}
		else if (className?.split(' ').includes('is-style-sub_copy')) {
			reset_style = {
				styleName: 'is-style-sub_copy',
				alignment_copy: 'top left',
				color_text_copy: 'var(--wp--preset--color--text)',
				color_background_copy: 'var(--wp--preset--color--accent-1)',
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
					icon_space: "5px",
					icon_family: "Font Awesome 6 Free"
				}
			}
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
			if (prevClassRef.current === undefined || prevClassRef.current?.split(' ').includes('is-style-default')) {
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
	//useFontawesomeIframe();

	//TextControlの表示用変数
	const [copyInputValue, setCopyInputValue] = useState((optionStyle && optionStyle.copy_content !== undefined) ? optionStyle.copy_content : 'SAMPLE');

	//サブメニュー（インナーブロック）
	const hasSelectedInnerBlock = useSelect((select) => {
		return select('core/block-editor').hasSelectedInnerBlock(clientId, true);
	}, [clientId]);//ブロックの選択状態を把握

	//親ブロックがメニューかサブメニューの判定
	const [menuItemFlg, setMenuItemFlg] = useState(false);
	useSelect((select) => {
		//親IDを取得
		const parentBlockIds = select('core/block-editor').getBlockParents(clientId);
		// 各親ブロックを走査
		for (let i = 0; i < parentBlockIds.length; i++) {
			const parentBlock = select('core/block-editor').getBlock(parentBlockIds[i]);
			if (parentBlock.attributes?.is_menu) {
				setMenuItemFlg(true);
				break;
			}
			if (parentBlock.attributes?.is_submenu) {
				setMenuItemFlg(true);
				break;
			}

		}
	}, [clientId]);
	//メニューアイテムフラグをオンにする
	useEffect(() => {
		setAttributes({ isMenuItem: menuItemFlg })
	}, [menuItemFlg])

	const subMenuBlocksProps = useInnerBlocksProps(
		{ className: `submenu-block ${hasSelectedInnerBlock ? 'visible' : ''} ${menu_pos.replace(/ /g, "_")} ${!is_title_menu ? 'mobile_horizen' : 'mobile_virtical'}` },
		{
			allowedBlocks: ['itmar/design-group'],
			template: [['itmar/design-group', { is_submenu: true },
				[['itmar/design-title', { headingType: 'H3' }]]
			]],
			templateLock: false
		}
	);



	//リッチテキストをコンテンツにする
	const renderRichText = () => (
		<RichText
			tagName={headingType}
			className="has-text-color"
			onChange={(newContent) => {
				setAttributes({ headingContent: newContent });
			}}
			value={headingContent}
			placeholder={__('Write Title text...', 'itmar_block_collections')}
		/>
	);
	//ヘッダー要素をコンテンツにする
	const renderElement = () => (
		React.createElement(
			headingType.toLowerCase(),
			{ className: "has-text-color" },
			siteTitle
		)
	);


	//コンテンツの選択
	const content = titleType === 'plaine'
		? renderRichText()
		: renderElement();

	//コンテンツを返す
	function renderContent() {
		return (
			content
		);
	}

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody title={__("Title Source Setting", 'itmar_block_collections')}>
					<div className='itmar_title_type'>
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

					<div className='itmar_link_type'>
						<RadioControl
							label={__("Link type", 'itmar_block_collections')}
							selected={linkKind}
							options={[
								{ label: __("None", 'itmar_block_collections'), value: 'none' },
								{ label: __("Fixed Page", 'itmar_block_collections'), value: 'fixed' },
								{ label: __("Archive Page", 'itmar_block_collections'), value: 'archive' },
								{ label: __("Free URL", 'itmar_block_collections'), value: 'free' },
								{ label: __("Sub Menu", 'itmar_block_collections'), value: 'submenu' }
							]}
							onChange={(changeOption) => setAttributes({ linkKind: changeOption })}
							help={__("You can select the type of URL to link to the title.", 'itmar_block_collections')}
						/>
					</div>

					{linkKind === 'fixed' &&
						<PageSelectControl
							attributes={attributes}
							setAttributes={setAttributes}
							label={__("Select a fixed page to link to", 'itmar_block_collections')}
							homeUrl={itmar_block_option.home_url}
						/>

					}
					{linkKind === 'archive' &&
						<ArchiveSelectControl
							attributes={attributes}
							setAttributes={setAttributes}
							label={__("Select archive page to link to", 'itmar_block_collections')}
							homeUrl={itmar_block_option.home_url}
						/>

					}
					{linkKind === 'free' &&
						<TextControl
							label={__("Link to URL", 'itmar_block_collections')}
							labelPosition="top"
							value={selectedPageUrl}
							onChange={(newValue) => {
								setAttributes({ selectedPageUrl: newValue });
							}}
						/>

					}
					{linkKind === 'submenu' &&
						<PanelBody title={__("Submenu position settings", 'itmar_block_collections')}>
							<PanelRow className='imgPos_row'>
								<label>{__("Menu Alignment", 'itmar_block_collections')}</label>
								<AlignmentMatrixControl
									value={menu_pos}
									onChange={(newVal) => {
										setAttributes({ menu_pos: newVal })
									}}
								/>
							</PanelRow>
							<ToggleControl
								label={__('Based on title', 'itmar_block_collections')}
								checked={is_title_menu}
								help={__('If unchecked, the parent menu will be used as the reference. If there is no parent menu, do not uncheck it.', 'itmar_block_collections')}
								onChange={(newVal) => {
									setAttributes({ is_title_menu: newVal })
								}}
							/>
						</PanelBody>
					}
				</PanelBody>

			</InspectorControls >

			<InspectorControls group="styles">

				<PanelBody title={__("Title settings", 'itmar_block_collections')} initialOpen={true} className="title_design_ctrl">
					<BoxControl
						label={__("Padding settings", 'itmar_block_collections')}
						values={padding_heading}
						onChange={value => setAttributes({ padding_heading: value })}
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

					<ToggleControl
						label={__('Add an underline', 'itmar_block_collections')}
						checked={is_underLine}
						onChange={(newVal) => {
							setAttributes({ is_underLine: newVal })
						}}
					/>
					{is_underLine &&
						<PanelBody title={__("UnderLine settings", 'itmar_block_collections')} initialOpen={true} className="title_design_ctrl">
							<PanelRow className='distance_row'>
								<UnitControl
									dragDirection="e"
									onChange={(newValue) => {
										const newStyle = { ...underLine_prop, height: newValue };
										setAttributes({ underLine_prop: newStyle });
									}}
									label={__("Height", 'itmar_block_collections')}
									value={underLine_prop.height}
								/>
								<UnitControl
									dragDirection="e"
									onChange={(newValue) => {
										const newStyle = { ...underLine_prop, width: newValue };
										setAttributes({ underLine_prop: newStyle });
									}}
									label={__("Width", 'itmar_block_collections')}
									value={underLine_prop.width}
								/>
								<UnitControl
									dragDirection="e"
									onChange={(newValue) => {
										const newStyle = { ...underLine_prop, distance: newValue };
										setAttributes({ underLine_prop: newStyle });
									}}
									label={__("Distance", 'itmar_block_collections')}
									value={underLine_prop.distance}
								/>
							</PanelRow>
							<PanelColorGradientSettings
								title={__("Under Line Color Setting", 'itmar_block_collections')}
								settings={[
									{
										colorValue: bgColor_underLine,
										gradientValue: bgGradient_underLine,
										label: __("Choose Under Line color", 'itmar_block_collections'),

										onColorChange: (newValue) => {
											setAttributes({ bgColor_underLine: newValue === undefined ? '' : newValue });
										},
										onGradientChange: (newValue) => {
											setAttributes({ bgGradient_underLine: newValue })
										}
									},
								]}
							/>
							<ToggleControl
								label={__('Animation on hover', 'itmar_block_collections')}
								checked={underLine_prop.is_anime}
								onChange={(newVal) => {
									const newStyle = { ...underLine_prop, is_anime: newVal };
									setAttributes({ underLine_prop: newStyle })
								}}
							/>
						</PanelBody>
					}
				</PanelBody>

				{className?.split(' ').includes('is-style-circle_marker') &&
					<PanelBody title={__("Circle Marker Settings", 'itmar_block_collections')} initialOpen={false} className="title_design_ctrl">
						<PanelColorGradientSettings
							title={__("Circle Color Setting", 'itmar_block_collections')}
							settings={[{
								colorValue: (optionStyle && optionStyle.colorVal_circle) ? optionStyle.colorVal_circle : 'var(--wp--preset--color--accent-1)',
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
										colorValue: (optionStyle && optionStyle.colorVal_second) ? optionStyle.colorVal_second : 'var(--wp--preset--color--accent-2)',
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

				{className?.split(' ').includes('is-style-sub_copy') &&
					<PanelBody title={__("Sub Copy Settings", 'itmar_block_collections')} initialOpen={false} className="title_design_ctrl">
						<PanelColorGradientSettings
							title={__("Copy Color Setting", 'itmar_block_collections')}
							settings={[{
								colorValue: (optionStyle && optionStyle.color_text_copy) ? optionStyle.color_text_copy : 'var(--wp--preset--color--text)',
								label: __("Choose Text color", 'itmar_block_collections'),
								onColorChange: (newValue) => {
									setLocalOptionStyle(prev => ({ ...prev, color_text_copy: newValue }));
								},
							},
							{
								colorValue: (optionStyle && optionStyle.color_background_copy) ? optionStyle.color_background_copy : 'var(--wp--preset--color--accent-2)',
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
						<PanelRow className='copyInfo_row'>
							<label>{__("Copy Alignment", 'itmar_block_collections')}</label>
							<AlignmentMatrixControl

								value={(optionStyle && optionStyle.alignment_copy) ? optionStyle.alignment_copy : 'top left'}
								onChange={(newValue) => {
									setLocalOptionStyle(prev => ({ ...prev, alignment_copy: newValue }));
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
										icon_color: "var(--wp--preset--color--text)",
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
					{renderContent()}
				</StyleComp>
				{linkKind === 'submenu' &&
					<div {...subMenuBlocksProps}></div>
				}
			</div>



		</>
	);
}
