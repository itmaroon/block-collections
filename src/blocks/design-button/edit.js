
import { __ } from '@wordpress/i18n';
import TypographyControls from '../TypographyControls'
import { StyleComp } from './StyleButton';
import { useStyleIframe } from '../iframeFooks';
import ShadowStyle, { ShadowElm } from '../ShadowStyle';
import { useElementBackgroundColor, useIsIframeMobile } from '../CustomFooks';
import { PageSelectControl, ArchiveSelectControl } from '../wordpressApi';
import {
	PanelBody,
	PanelRow,
	RadioControl,
	TextControl,
	ToggleControl,
	__experimentalUnitControl as UnitControl,
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
import { useEffect, useRef } from '@wordpress/element';

import './editor.scss';
import { SingleImageSelect } from '../../mediaUpload';

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
	{ value: '%', label: '%' },
];


export default function Edit({ attributes, setAttributes }) {
	const {
		buttonType,
		displayType,
		buttonId,
		linkKind,
		selectedPageUrl,
		bgColor,
		align,
		labelContent,
		font_style_label,
		default_pos,
		mobile_pos,
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

	//モバイルの判定
	const isMobile = useIsIframeMobile();

	//ブロックの参照
	const blockRef = useRef(null);
	const blockProps = useBlockProps({
		ref: blockRef,// ここで参照を blockProps に渡しています
		style: { ...align_style, backgroundColor: bgColor }
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

	function renderContent() {
		return (
			<>
				{buttonType === 'button' ? (
					<button>
						{displayType === 'string' &&
							<RichText
								onChange={
									(newContent) => {
										setAttributes({ labelContent: newContent })
									}
								}
								value={labelContent}
								placeholder={__('Button Name...', 'itmar_block_collections')}
							/>
						}
						{displayType === 'image' &&
							<SingleImageSelect
								attributes={attributes}
								onSelectChange={(media) => {
									setAttributes({ media: media, mediaID: media.id })
								}}
							/>
						}

						{displayType === 'pseudo' &&
							<div
								className='displayType'
							/>
						}

					</button>
				) : (
					<input type="submit" value={labelContent} id={buttonId} />
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
					{buttonType === 'button' &&
						<div className='itmar_link_type'>
							<RadioControl
								label={__("Link type", 'itmar_block_collections')}
								selected={linkKind}
								options={[
									{ label: __("Fixed Page", 'itmar_block_collections'), value: 'fixed' },
									{ label: __("Archive Page", 'itmar_block_collections'), value: 'archive' },
									{ label: __("Free URL", 'itmar_block_collections'), value: 'free' },
								]}
								onChange={(changeOption) => setAttributes({ linkKind: changeOption })}
								help={__("You can select the type of URL to link to the button.", 'itmar_block_collections')}
							/>
						</div>
					}

					{(buttonType === 'button' && linkKind === 'fixed') &&
						<PageSelectControl
							attributes={attributes}
							setAttributes={setAttributes}
							label={__("Select a fixed page to link to", 'itmar_block_collections')}
							homeUrl={itmar_block_option.home_url}
						/>

					}
					{(buttonType === 'button' && linkKind === 'archive') &&
						<ArchiveSelectControl
							attributes={attributes}
							setAttributes={setAttributes}
							label={__("Select archive page to link to", 'itmar_block_collections')}
							homeUrl={itmar_block_option.home_url}
						/>

					}
					{(buttonType === 'button' && linkKind === 'free') &&
						<TextControl
							label={__("Link to URL", 'itmar_block_collections')}
							labelPosition="top"
							value={selectedPageUrl}
							onChange={(newValue) => {
								setAttributes({ selectedPageUrl: newValue });
							}}
						/>

					}


					{buttonType === 'submit' &&
						<>
							<TextControl
								label={__("Button Label", 'itmar_block_collections')}
								value={labelContent}
								onChange={(newVal) => setAttributes({ labelContent: newVal })}
							/>
							<TextControl
								label={__("Button ID", 'itmar_block_collections')}
								value={buttonId}
								onChange={(newVal) => setAttributes({ buttonId: newVal })}
							/>
						</>

					}
				</PanelBody>
				<PanelBody title={__("Display Type setting", 'itmar_block_collections')} initialOpen={true} className="form_setteing_ctrl">
					<div className='itmar_link_type'>
						<RadioControl
							selected={displayType}
							options={[
								{ label: __("String", 'itmar_block_collections'), value: 'string' },
								{ label: __("Image", 'itmar_block_collections'), value: 'image' },
								{ label: __("Pseudo", 'itmar_block_collections'), value: 'pseudo' },
							]}
							onChange={(changeOption) => { setAttributes({ displayType: changeOption }); }
							}
						/>
					</div>
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
					<PanelBody
						title={!isMobile ?
							__("Scale settings(desk top)", 'itmar_block_collections')
							: __("Scale settings(mobile)", 'itmar_block_collections')}
						initialOpen={true}
					>
						<PanelRow
							className='distance_row'
						>
							<UnitControl
								dragDirection="e"
								onChange={value => {
									if (!isMobile) {
										setAttributes({ default_pos: { ...default_pos, width: value } });
									} else {
										setAttributes({ mobile_pos: { ...mobile_pos, width: value } });
									}
								}}
								label={__("Width", 'itmar_block_collections')}
								value={!isMobile ? default_pos.width || 'auto' : mobile_pos.width || 'auto'}
							/>
							<UnitControl
								dragDirection="e"
								onChange={value => {
									if (!isMobile) {
										setAttributes({ default_pos: { ...default_pos, height: value } });
									} else {
										setAttributes({ mobile_pos: { ...mobile_pos, height: value } });
									}
								}}
								label={__("Height", 'itmar_block_collections')}
								value={!isMobile ? default_pos.height || 'auto' : mobile_pos.height || 'auto'}
							/>
						</PanelRow>
					</PanelBody>
					<BoxControl
						label={!isMobile ?
							__("Margin settings(desk top)", 'itmar_block_collections')
							: __("Margin settings(mobile)", 'itmar_block_collections')
						}
						values={!isMobile ? default_pos.margin_value : mobile_pos.margin_value}
						onChange={value => {
							if (!isMobile) {
								setAttributes({ default_pos: { ...default_pos, margin_value: value } });
							} else {
								setAttributes({ mobile_pos: { ...mobile_pos, margin_value: value } });
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
						values={!isMobile ? default_pos.padding_value : mobile_pos.padding_value}
						onChange={value => {
							if (!isMobile) {
								setAttributes({ default_pos: { ...default_pos, padding_value: value } })
							} else {
								setAttributes({ mobile_pos: { ...mobile_pos, padding_value: value } })
							}
						}}
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
							units={units}	// 許可する単位
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
					{renderContent()}
				</StyleComp>
			</div >
		</>
	);
}
