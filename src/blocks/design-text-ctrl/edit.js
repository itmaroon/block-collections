
import { __ } from '@wordpress/i18n';
import TypographyControls from '../TypographyControls'
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { StyleComp } from './StyleInput';
import { useState, useEffect, useRef } from '@wordpress/element';

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
		rowNum,
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
		required,
		className
	} = attributes;

	//必須項目の表示
	const dispLabel = required.flg ? <>{labelContent}<span>({required.display})</span></> : labelContent;

	//親コンポーネントからのラベル幅の指定があればそれを採用して記録する
	const label_width = props.context['itmar/label_width'] || 'auto';
	useEffect(() => {
		setAttributes({ labelWidth: label_width });
	}, [label_width]);

	//入力値の確保
	const [stateValue, setInputValue] = useState(inputValue);

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody title="入力欄情報" initialOpen={true} className="title_design_ctrl">
					<PanelRow>
						<TextControl
							label="入力要素のname属性"
							value={inputName}
							isPressEnterToChange
							onChange={(newVal) => setAttributes({ inputName: newVal })}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label="プレースフォルダ"
							value={placeFolder}
							isPressEnterToChange
							onChange={(newVal) => setAttributes({ placeFolder: newVal })}
						/>
					</PanelRow>
					<PanelRow className='itmar_weight_row'>
						<RadioControl
							selected={inputType}
							label="テキストボックスの種類"
							options={[
								{ label: 'TEXT', value: "text" },
								{ label: 'E-MAIL', value: "email" },
								{ label: 'AREA', value: "textarea" },
							]}
							onChange={(changeOption) => { setAttributes({ inputType: changeOption }); }}
						/>
					</PanelRow>
					{inputType === 'textarea' &&
						<PanelRow className='areaNum_row'>
							<RangeControl
								value={rowNum}
								label="テキストエリアの行数"
								max={20}
								min={3}
								step={1}
								onChange={(val) => setAttributes({ rowNum: val })}
								withInputField={true}
							/>
						</PanelRow>
					}
					<PanelRow className='labelRequierd_row'>
						<ToggleControl
							label='必須入力'
							checked={required.flg}
							onChange={(newVal) => {
								const newObj = { ...required, flg: newVal }
								setAttributes({ required: newObj })
							}}
						/>
						{required.flg &&
							<TextControl
								label="必須の表示"
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
				<PanelBody title="ラベル情報" initialOpen={true} className="title_design_ctrl">
					<PanelRow
						className='labelInfo_row'
					>
						<TextControl
							label="ラベルのテキスト"
							labelPosition="top"
							value={labelContent}
							isPressEnterToChange
							onChange={(newValue) => setAttributes({ labelContent: newValue })}
						/>
					</PanelRow>
				</PanelBody>

			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody title="インプットボックススタイル設定" initialOpen={false} className="title_design_ctrl">

					<TypographyControls
						title='タイポグラフィー'
						fontStyle={font_style_input}
						onChange={(newStyle) => {
							setAttributes({ font_style_input: newStyle })
						}}
						initialOpen={false}
					/>
					<PanelColorGradientSettings
						title={__("Color Setting")}
						settings={[{
							colorValue: textColor_input,
							label: __("Choose Text color"),
							onColorChange: (newValue) => setAttributes({ textColor_input: newValue }),
						},
						{
							colorValue: bgColor_input,
							gradientValue: bgGradient_input,

							label: __("Choose Background color"),
							onColorChange: (newValue) => setAttributes({ bgColor_input: newValue }),
							onGradientChange: (newValue) => setAttributes({ bgGradient_input: newValue }),
						},
						]}
					/>
					<PanelBody title="ボーダー設定" initialOpen={false} className="border_design_ctrl">
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
					<BoxControl
						label="マージン設定"
						values={margin_input}
						onChange={value => setAttributes({ margin_input: value })}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>
					<BoxControl
						label="パティング設定"
						values={padding_input}
						onChange={value => setAttributes({ padding_input: value })}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>

				</PanelBody>
				<PanelBody title="ラベルスタイル設定" initialOpen={false} className="title_design_ctrl">

					<TypographyControls
						title='タイポグラフィー'
						fontStyle={font_style_label}
						onChange={(newStyle) => {
							setAttributes({ font_style_label: newStyle })
						}}
						initialOpen={false}
					/>
					<PanelColorGradientSettings
						title={__("Color Setting")}
						settings={[{
							colorValue: textColor_label,
							label: __("Choose Text color"),
							onColorChange: (newValue) => setAttributes({ textColor_label: newValue }),
						},
						{
							colorValue: bgColor_label,
							gradientValue: bgGradient_label,

							label: __("Choose Background color"),
							onColorChange: (newValue) => setAttributes({ bgColor_label: newValue }),
							onGradientChange: (newValue) => setAttributes({ bgGradient_label: newValue }),
						},
						]}
					/>
					<PanelBody title="ボーダー設定" initialOpen={false} className="border_design_ctrl">
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
						label="パティング設定"
						values={padding_label}
						onChange={value => setAttributes({ padding_label: value })}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>
					<UnitControl
						dragDirection="e"
						onChange={(newValue) => setAttributes({ labelSpace: newValue })}
						label='テキストボックスとの間隔'
						value={labelSpace}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...useBlockProps()}>
				<StyleComp attributes={attributes}>
					<label class="fit-label">
						{dispLabel}
					</label>

					{inputType === 'text' &&
						<input
							type="text"
							name={inputName}
							placeholder={placeFolder}
							className="contact_text"
							value={stateValue} // ここでstateを読み込みます
							onChange={(event) => { // onChangeイベントを使ってstateと属性を更新します
								const newValue = event.target.value;
								setInputValue(newValue);
								setAttributes({ inputValue: newValue });
							}}
						/>
					}
					{inputType === 'email' &&
						<input
							type="email"
							placeholder={placeFolder}
							className="contact_text"
							value={stateValue} // ここでstateを読み込みます
							onChange={(event) => { // onChangeイベントを使ってstateと属性を更新します
								const newValue = event.target.value;
								setInputValue(newValue);
								setAttributes({ inputValue: newValue });
							}}
						/>
					}
					{inputType === 'textarea' &&
						<textarea
							name={inputName}
							rows={rowNum}
							placeholder={placeFolder}
							className="contact_text"
							value={stateValue} // ここでstateを読み込みます
							onChange={(event) => { // onChangeイベントを使ってstateと属性を更新します
								const newValue = event.target.value;
								setInputValue(newValue);
								setAttributes({ inputValue: newValue });
							}}
						/>
					}

				</StyleComp>

			</div>
		</>

	);
}
