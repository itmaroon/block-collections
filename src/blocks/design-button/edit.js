
import { __ } from '@wordpress/i18n';
import TypographyControls from '../TypographyControls'
import { StyleComp } from './StyleButton';
import { useStyleIframe } from '../iframeFooks';
import ShadowStyle, { ShadowElm } from '../ShadowStyle';
import { withSelect } from '@wordpress/data';
import { useElementBackgroundColor, useIsIframeMobile } from '../CustomFooks';
import {
	PanelBody,
	PanelRow,
	RadioControl,
	TextControl,
	ToggleControl,
	ComboboxControl,
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
		buttonId,
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
					<input type="submit" value={labelContent} id={buttonId} />
				)}
			</>
		)
	}

	//終了時のリダイレクト先を固定ページから選択
	const RedirectSelectControl = withSelect((select) => {
		const pages = select('core').getEntityRecords('postType', 'page');
		if (pages && !pages.some(page => page.id === -1)) {
			// ホームページ用の選択肢を追加します。
			pages.unshift({ id: -1, title: { rendered: 'ホーム' }, link: '/' });
		}
		return { pages }

	})(function ({ pages, setAttributes, attributes, label }) {
		const { selectedPageId, selectedPageUrl } = attributes;
		// 選択肢が選択されたときの処理です。
		const handleChange = (selectedId) => {
			const selectedPage = pages.find(page => page.id === selectedId);
			setAttributes({
				selectedPageId: selectedId,
				selectedPageUrl: selectedPage ? selectedPage.link : '/'
			});
		};
		// 選択肢を作成します。
		const options = pages ? pages.map(page => ({
			value: page.id,
			label: page.title.rendered
		})) : [];

		return (
			<ComboboxControl
				label={label}
				options={options}
				value={selectedPageId}
				onChange={handleChange}
			/>
		);
	});

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
						<RedirectSelectControl
							label={__("Transition to static page", 'itmar_block_collections')}
							attributes={attributes}
							setAttributes={setAttributes}
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
