
import { __ } from '@wordpress/i18n';
import TypographyControls from '../TypographyControls'

import { StyleComp } from './StyleInput';
import { useState, useEffect, useRef } from '@wordpress/element';
import { useStyleIframe } from '../iframeFooks';
import ShadowStyle from '../ShadowStyle';

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

export default function Edit(props) {
	const {
		attributes,
		setAttributes
	} = props;

	const {
		inputName,
		inputValue,
		placeFolder,
		inputType,
		required,
		focusColor,
		bgColor,
		font_style_input,
		bgColor_input,
		bgGradient_input,
		textColor_input,
		radius_input,
		border_input,
		margin_input,
		padding_input,
		labelContent,
		font_style_label,
		bgColor_label,
		bgGradient_label,
		textColor_label,
		radius_label,
		border_label,
		padding_label,
		labelSpace,
		shadow_element,
		is_shadow,
		className
	} = attributes;

	const blockProps = useBlockProps({ style: { backgroundColor: bgColor } });

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);

	//必須項目の表示
	const dispLabel = required.flg ? `${labelContent}(${required.display})` : labelContent;

	//親コンポーネントからのラベル幅の指定があればそれを採用して記録する
	const label_width = props.context['itmar/label_width'] || 'auto';
	useEffect(() => {
		setAttributes({ labelWidth: label_width });
	}, [label_width]);

	//入力値の確保
	const [stateValue, setInputValue] = useState(inputValue);

	//テキストエリアの高さ設定
	const [height, setHeight] = useState('auto');
	const textAreaRef = useRef(null);

	useEffect(() => {
		if (textAreaRef.current) {
			setHeight(`${textAreaRef.current.scrollHeight}px`);
		}
	}, [className]);

	function renderContent() {
		return (
			<>
				{inputType === 'text' &&
					<input
						type="text"
						name={inputName}
						placeholder={className === 'is-style-line' ? dispLabel : placeFolder}
						className={`contact_text ${stateValue ? "" : "empty"}`}
						value={stateValue}
						onChange={(event) => {
							const newValue = event.target.value;
							setInputValue(newValue);
							setAttributes({ inputValue: newValue });
						}}
					/>
				}
				{inputType === 'email' &&
					<input
						type="email"
						placeholder={className === 'is-style-line' ? dispLabel : placeFolder}
						className={`contact_text ${stateValue ? "" : "empty"}`}
						value={stateValue}
						onChange={(event) => {
							const newValue = event.target.value;
							setInputValue(newValue);
							setAttributes({ inputValue: newValue });
						}}
					/>
				}
				{inputType === 'textarea' &&
					<textarea
						ref={textAreaRef}
						style={{ height }}
						name={inputName}
						placeholder={className === 'is-style-line' ? dispLabel : placeFolder}
						className={`contact_text ${stateValue ? "" : "empty"}`}
						value={stateValue}

						onChange={(event) => {
							const newValue = event.target.value;
							const scrollHeight = event.target.scrollHeight;
							setInputValue(newValue);
							setHeight(`${scrollHeight}px`);
							setAttributes({ inputValue: newValue });
						}}
					/>
				}

				<label className="fit-label">
					{required.flg ? <>{labelContent}<span>({required.display})</span></> : labelContent}
				</label>
			</>
		);
	}


	return (
		<>
			<InspectorControls group="settings">
				<PanelBody title={__("Input element information setting", 'itmar_block_collections')} initialOpen={true} className="title_design_ctrl">
					<PanelRow>
						<TextControl
							label={__("name attribute name", 'itmar_block_collections')}
							value={inputName}
							onChange={(newVal) => setAttributes({ inputName: newVal })}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={__("PlaceHolder", 'itmar_block_collections')}
							value={placeFolder}
							isPressEnterToChange
							onChange={(newVal) => setAttributes({ placeFolder: newVal })}
						/>
					</PanelRow>
					<PanelRow className='itmar_weight_row'>
						<RadioControl
							selected={inputType}
							label={__("Kind of Input Element", 'itmar_block_collections')}
							options={[
								{ label: 'TEXT', value: "text" },
								{ label: 'E-MAIL', value: "email" },
								{ label: 'AREA', value: "textarea" },
							]}
							onChange={(changeOption) => { setAttributes({ inputType: changeOption }); }}
						/>
					</PanelRow>

					<PanelRow className='labelRequierd_row'>
						<ToggleControl
							label={__('Required input', 'itmar_block_collections')}
							checked={required.flg}
							onChange={(newVal) => {
								const newObj = { ...required, flg: newVal }
								setAttributes({ required: newObj })
							}}
						/>
						{required.flg &&
							<TextControl
								label={__("Show 'required'", 'itmar_block_collections')}
								value={required.display}
								isPressEnterToChange
								onChange={(newVal) => {
									const newObj = { ...required, display: newVal }
									setAttributes({ required: newObj })
								}}
							/>
						}
					</PanelRow>


				</PanelBody>
				<PanelBody title={__("Label Settings", 'itmar_block_collections')} initialOpen={true} className="title_design_ctrl">
					<PanelRow
						className='labelInfo_row'
					>
						<TextControl
							label={__("Text of Label", 'itmar_block_collections')}
							labelPosition="top"
							value={labelContent}
							isPressEnterToChange
							onChange={(newValue) => setAttributes({ labelContent: newValue })}
						/>
					</PanelRow>
				</PanelBody>

			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody title={__("Global settings", 'itmar_block_collections')} initialOpen={false} className="title_design_ctrl">
					<PanelColorGradientSettings
						title={__("Background Color Setting", 'itmar_block_collections')}
						settings={[
							{
								colorValue: bgColor,
								label: __("Choose Background color", 'itmar_block_collections'),
								onColorChange: (newValue) => setAttributes({ bgColor: newValue }),
							},
						]}
					/>
					<PanelColorGradientSettings
						title={__("Focus Color Setting", 'itmar_block_collections')}
						settings={[
							{
								colorValue: focusColor,
								label: __("Choose Focus color", 'itmar_block_collections'),
								onColorChange: (newValue) => setAttributes({ focusColor: newValue }),
							},
						]}
					/>
					<BoxControl
						label={__("Margin settings", 'itmar_block_collections')}
						values={margin_input}
						onChange={value => setAttributes({ margin_input: value })}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値
					/>
					<BoxControl
						label={__("Padding settings", 'itmar_block_collections')}
						values={padding_input}
						onChange={value => setAttributes({ padding_input: value })}
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
				<PanelBody title={__("Input Box style settings", 'itmar_block_collections')} initialOpen={false} className="title_design_ctrl">

					<TypographyControls
						title={__('Typography', 'itmar_block_collections')}
						fontStyle={font_style_input}
						onChange={(newStyle) => {
							setAttributes({ font_style_input: newStyle })
						}}
						initialOpen={false}
					/>
					<PanelColorGradientSettings
						title={__("Color Settings", 'itmar_block_collections')}
						settings={[{
							colorValue: textColor_input,
							label: __("Choose Text color", 'itmar_block_collections'),
							onColorChange: (newValue) => setAttributes({ textColor_input: newValue }),
						},
						{
							colorValue: bgColor_input,
							gradientValue: bgGradient_input,

							label: __("Choose Background color", 'itmar_block_collections'),
							onColorChange: (newValue) => setAttributes({ bgColor_input: newValue }),
							onGradientChange: (newValue) => setAttributes({ bgGradient_input: newValue }),
						},
						]}
					/>
					<PanelBody title={__("Border Settings", 'itmar_block_collections')} initialOpen={false} className="border_design_ctrl">
						<BorderBoxControl

							onChange={(newValue) => setAttributes({ border_input: newValue })}
							value={border_input}
							allowReset={true}	// リセットの可否
							resetValues={border_resetValues}	// リセット時の値
						/>
						<BorderRadiusControl
							values={radius_input}
							onChange={(newBrVal) =>
								setAttributes({ radius_input: typeof newBrVal === 'string' ? { "value": newBrVal } : newBrVal })}
						/>
					</PanelBody>

				</PanelBody>
				<PanelBody title={__("Label style settings", 'itmar_block_collections')} initialOpen={false} className="title_design_ctrl">

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
							colorValue: textColor_label,
							label: __("Choose Text color", 'itmar_block_collections'),
							onColorChange: (newValue) => setAttributes({ textColor_label: newValue }),
						},
						{
							colorValue: bgColor_label,
							gradientValue: bgGradient_label,

							label: __("Choose Background color", 'itmar_block_collections'),
							onColorChange: (newValue) => setAttributes({ bgColor_label: newValue }),
							onGradientChange: (newValue) => setAttributes({ bgGradient_label: newValue }),
						},
						]}
					/>
					<PanelBody title={__("Border Settings", 'itmar_block_collections')} initialOpen={false} className="border_design_ctrl">
						<BorderBoxControl

							onChange={(newValue) => setAttributes({ border_label: newValue })}
							value={border_label}
							allowReset={true}	// リセットの可否
							resetValues={border_resetValues}	// リセット時の値
						/>
						<BorderRadiusControl
							values={radius_label}
							onChange={(newBrVal) =>
								setAttributes({ radius_label: typeof newBrVal === 'string' ? { "value": newBrVal } : newBrVal })}
						/>
					</PanelBody>
					<BoxControl
						label={__("Padding settings", 'itmar_block_collections')}
						values={padding_label}
						onChange={value => setAttributes({ padding_label: value })}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>
					<UnitControl
						dragDirection="e"
						onChange={(newValue) => setAttributes({ labelSpace: newValue })}
						label={__('Spacing with textbox', 'itmar_block_collections')}
						value={labelSpace}
					/>
				</PanelBody>
			</InspectorControls>

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
