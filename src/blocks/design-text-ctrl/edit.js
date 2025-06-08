import { __ } from "@wordpress/i18n";

import visibleIcon from "./visible.svg";
import hideIcon from "./hide.svg";

import { StyleComp } from "./StyleInput";
import { useState, useEffect, useRef } from "@wordpress/element";
import { dispatch } from "@wordpress/data";
import { store as blockEditorStore } from "@wordpress/block-editor";

import { useStyleIframe } from "../iframeFooks";
import LabelBox from "../LabelBox ";
import {
	useElementBackgroundColor,
	useIsIframeMobile,
	ShadowStyle,
	ShadowElm,
	TypographyControls,
	useTargetBlocks,
	fetchZipToAddress,
} from "itmar-block-packages";

import {
	PanelBody,
	PanelRow,
	ToggleControl,
	RadioControl,
	TextControl,
	RangeControl,
	SelectControl,
	__experimentalBoxControl as BoxControl,
	__experimentalBorderBoxControl as BorderBoxControl,
} from "@wordpress/components";
import {
	useBlockProps,
	InspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalBorderRadiusControl as BorderRadiusControl,
} from "@wordpress/block-editor";

import "./editor.scss";

//スペースのリセットバリュー
const padding_resetValues = {
	top: "10px",
	left: "10px",
	right: "10px",
	bottom: "10px",
};

//ボーダーのリセットバリュー
const border_resetValues = {
	top: "0px",
	left: "0px",
	right: "0px",
	bottom: "0px",
};

const units = [
	{ value: "px", label: "px" },
	{ value: "em", label: "em" },
	{ value: "rem", label: "rem" },
];

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;

	const {
		inputName,
		inputValue,
		placeFolder,
		inputType,
		addressInput,
		required,
		focusColor,
		bgColor,
		font_style_input,
		bgColor_input,
		bgGradient_input,
		textColor_input,
		radius_input,
		border_input,
		default_pos,
		mobile_pos,
		labelContent,
		shadow_element,
		is_shadow,
		className,
	} = attributes;

	//モバイルの判定
	const isMobile = useIsIframeMobile();

	//ブロックの参照
	const blockRef = useRef(null);
	const blockProps = useBlockProps({
		ref: blockRef, // ここで参照を blockProps に渡しています
		style: { backgroundColor: bgColor },
	});

	//背景色の取得
	const baseColor = useElementBackgroundColor(blockRef, blockProps.style);

	//背景色変更によるシャドー属性の書き換え
	useEffect(() => {
		if (baseColor) {
			setAttributes({
				shadow_element: { ...shadow_element, baseColor: baseColor },
			});
			const new_shadow = ShadowElm({ ...shadow_element, baseColor: baseColor });
			if (new_shadow) {
				setAttributes({ shadow_result: new_shadow.style });
			}
		}
	}, [baseColor]);

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);

	//必須項目の表示
	const dispLabel = required.flg
		? `${labelContent}(${required.display})`
		: labelContent;

	//親コンポーネントからのラベル幅の指定があればそれを採用して記録する
	const label_width = props.context["itmar/label_width"] || "auto";
	useEffect(() => {
		setAttributes({ labelWidth: label_width });
	}, [label_width]);

	//入力値の確保
	const [stateValue, setInputValue] = useState(inputValue);
	useEffect(() => {
		setInputValue(inputValue); // ← 属性が変わったら useState も追従
	}, [inputValue]);

	//テキストエリアの高さ設定
	const [height, setHeight] = useState("auto");
	const textAreaRef = useRef(null);

	useEffect(() => {
		if (textAreaRef.current) {
			setHeight(`${textAreaRef.current.scrollHeight}px`);
		}
	}, [className]);

	//パスワードの表示トグル
	const [showPassword, setShowPassword] = useState(false);

	//住所の入力対象となるブロックの配列
	const targetblocks = useTargetBlocks(clientId, "itmar/design-text-ctrl");
	const targetArray = targetblocks.map((block) => ({
		label: block.attributes.labelContent,
		value: block.attributes.inputName,
	}));
	//住所の代入対象のブロック
	const targetBlock = useTargetBlocks(clientId, "itmar/design-text-ctrl", {
		inputName: addressInput,
	});

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody
					title={__("Input element information setting", "block-collections")}
					initialOpen={true}
					className="title_design_ctrl"
				>
					<PanelRow>
						<TextControl
							label={__("name attribute name", "block-collections")}
							value={inputName}
							onChange={(newVal) => setAttributes({ inputName: newVal })}
						/>
					</PanelRow>
					<PanelRow>
						<TextControl
							label={__("PlaceHolder", "block-collections")}
							value={placeFolder}
							isPressEnterToChange
							onChange={(newVal) => setAttributes({ placeFolder: newVal })}
						/>
					</PanelRow>
					<PanelRow className="itmar_weight_row">
						<RadioControl
							selected={inputType}
							label={__("Kind of Input Element", "block-collections")}
							options={[
								{ label: "TEXT", value: "text" },
								{ label: "E-MAIL", value: "email" },
								{ label: "PASSWORD", value: "pass" },
								{ label: "ZIP", value: "zip" },
								{ label: "AREA", value: "textarea" },
							]}
							onChange={(changeOption) => {
								setAttributes({ inputType: changeOption });
							}}
						/>
					</PanelRow>
					{inputType === "zip" && (
						<PanelRow>
							<SelectControl
								label={__("Address text box", "block-collections")}
								value={addressInput}
								options={targetArray}
								onChange={(newName) => {
									setAttributes({ addressInput: newName });
								}}
							/>
						</PanelRow>
					)}
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody
					title={__("Global settings", "block-collections")}
					initialOpen={false}
					className="title_design_ctrl"
				>
					<PanelColorGradientSettings
						title={__("Background Color Setting", "block-collections")}
						settings={[
							{
								colorValue: bgColor,
								label: __("Choose Background color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ bgColor: newValue }),
							},
						]}
					/>
					<PanelColorGradientSettings
						title={__("Focus Color Setting", "block-collections")}
						settings={[
							{
								colorValue: focusColor,
								label: __("Choose Focus color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ focusColor: newValue }),
							},
						]}
					/>
					<BoxControl
						label={
							!isMobile
								? __("Margin settings(desk top)", "block-collections")
								: __("Margin settings(mobile)", "block-collections")
						}
						values={
							!isMobile ? default_pos.margin_input : mobile_pos.margin_input
						}
						onChange={(value) => {
							if (!isMobile) {
								setAttributes({
									default_pos: { ...default_pos, margin_input: value },
								});
							} else {
								setAttributes({
									mobile_pos: { ...mobile_pos, margin_input: value },
								});
							}
						}}
						units={units} // 許可する単位
						allowReset={true} // リセットの可否
						resetValues={padding_resetValues} // リセット時の値
					/>
					<BoxControl
						label={
							!isMobile
								? __("Padding settings(desk top)", "block-collections")
								: __("Padding settings(mobile)", "block-collections")
						}
						values={
							!isMobile ? default_pos.padding_input : mobile_pos.padding_input
						}
						onChange={(value) => {
							if (!isMobile) {
								setAttributes({
									default_pos: { ...default_pos, padding_input: value },
								});
							} else {
								setAttributes({
									mobile_pos: { ...mobile_pos, padding_input: value },
								});
							}
						}}
						units={units} // 許可する単位
						allowReset={true} // リセットの可否
						resetValues={padding_resetValues} // リセット時の値
					/>
					<ToggleControl
						label={__("Is Shadow", "block-collections")}
						checked={is_shadow}
						onChange={(newVal) => {
							setAttributes({ is_shadow: newVal });
						}}
					/>
					{is_shadow && (
						<ShadowStyle
							shadowStyle={{ ...shadow_element }}
							onChange={(newStyle, newState) => {
								setAttributes({ shadow_result: newStyle.style });
								setAttributes({ shadow_element: newState });
							}}
						/>
					)}
				</PanelBody>
				<PanelBody
					title={__("Input Box style settings", "block-collections")}
					initialOpen={false}
					className="title_design_ctrl"
				>
					<TypographyControls
						title={__("Typography", "block-collections")}
						fontStyle={font_style_input}
						onChange={(newStyle) => {
							setAttributes({ font_style_input: newStyle });
						}}
						isMobile={isMobile}
						initialOpen={false}
					/>
					<RangeControl
						value={
							!isMobile
								? default_pos.inputLineHeight
								: mobile_pos.inputLineHeight
						}
						label={
							!isMobile
								? __("Line Height(desk top)", "block-collections")
								: __("Line Height(mobile)", "block-collections")
						}
						max={3}
						min={1}
						step={0.1}
						onChange={(value) => {
							if (!isMobile) {
								setAttributes({
									default_pos: { ...default_pos, inputLineHeight: value },
								});
							} else {
								setAttributes({
									mobile_pos: { ...mobile_pos, inputLineHeight: value },
								});
							}
						}}
						withInputField={true}
					/>
					<PanelColorGradientSettings
						title={__("Color Settings", "block-collections")}
						settings={[
							{
								colorValue: textColor_input,
								label: __("Choose Text color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ textColor_input: newValue }),
							},
							{
								colorValue: bgColor_input,
								gradientValue: bgGradient_input,

								label: __("Choose Background color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ bgColor_input: newValue }),
								onGradientChange: (newValue) =>
									setAttributes({ bgGradient_input: newValue }),
							},
						]}
					/>
					<PanelBody
						title={__("Border Settings", "block-collections")}
						initialOpen={false}
						className="border_design_ctrl"
					>
						<BorderBoxControl
							onChange={(newValue) => setAttributes({ border_input: newValue })}
							value={border_input}
							allowReset={true} // リセットの可否
							resetValues={border_resetValues} // リセット時の値
						/>
						<BorderRadiusControl
							values={radius_input}
							onChange={(newBrVal) =>
								setAttributes({
									radius_input:
										typeof newBrVal === "string"
											? { value: newBrVal }
											: newBrVal,
								})
							}
						/>
					</PanelBody>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<StyleComp attributes={attributes}>
					{inputType === "text" && (
						<input
							type="text"
							name={inputName}
							placeholder={
								className?.includes("is-style-line") ? dispLabel : placeFolder
							}
							className={`contact_text ${stateValue ? "" : "empty"}`}
							value={stateValue}
							onChange={(event) => {
								const newValue = event.target.value;
								setInputValue(newValue);
								setAttributes({ inputValue: newValue });
							}}
						/>
					)}
					{inputType === "email" && (
						<input
							type="email"
							placeholder={
								className?.includes("is-style-line") ? dispLabel : placeFolder
							}
							className={`contact_text ${stateValue ? "" : "empty"}`}
							value={stateValue}
							onChange={(event) => {
								const newValue = event.target.value;
								setInputValue(newValue);
								setAttributes({ inputValue: newValue });
							}}
						/>
					)}

					{inputType === "pass" && (
						<div className="password-wrapper">
							<input
								type={showPassword ? "text" : "password"}
								placeholder={
									className?.includes("is-style-line") ? dispLabel : placeFolder
								}
								className={`contact_text ${stateValue ? "" : "empty"}`}
								value={stateValue}
								onChange={(event) => {
									const newValue = event.target.value;
									setInputValue(newValue);
									setAttributes({ inputValue: newValue });
								}}
							/>
							<button
								type="button"
								className="toggle-password-button"
								onClick={() => setShowPassword(!showPassword)}
								aria-label={
									showPassword ? "パスワードを非表示" : "パスワードを表示"
								}
							>
								<img
									src={showPassword ? visibleIcon : hideIcon}
									alt=""
									aria-hidden="true"
								/>
							</button>
						</div>
					)}
					{inputType === "zip" && (
						<div className="zip-search-wrapper">
							<input
								type="text"
								value={stateValue}
								placeholder={`${__("example", "block-collections")}) 1234567`}
								className={`contact_text ${stateValue ? "" : "empty"}`}
								onChange={(event) => {
									const newValue = event.target.value;
									setInputValue(newValue);
									setAttributes({ inputValue: newValue });
								}}
							/>
							<button
								type="button"
								onClick={async () => {
									const address_obj = await fetchZipToAddress(stateValue);
									if (!address_obj) return;

									const fullAddress = `${address_obj.address1}${address_obj.address2}${address_obj.address3}`;
									if (targetBlock) {
										dispatch(blockEditorStore).updateBlockAttributes(
											targetBlock.clientId,
											{
												inputValue: fullAddress,
											},
										);
									} else {
										alert(
											__(
												"The block to enter the address cannot be found.",
												"block-collections",
											),
										);
									}
								}}
								className="zip-search-button"
							>
								{__("Address Search", "block-collections")}
							</button>
						</div>
					)}
					{inputType === "textarea" && (
						<textarea
							ref={textAreaRef}
							style={{ height }}
							name={inputName}
							placeholder={
								className?.includes("is-style-line") ? dispLabel : placeFolder
							}
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
					)}
					<LabelBox
						attributes={{ ...attributes, isMobile: isMobile }}
						onChange={(target, newVal) => setAttributes({ [target]: newVal })}
					/>
				</StyleComp>
			</div>
		</>
	);
}
