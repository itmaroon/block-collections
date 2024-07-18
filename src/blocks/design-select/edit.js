import { __ } from "@wordpress/i18n";

import { StyleComp } from "./StyleSelect";
import { NomalSelect } from "./initSelect";
import { useStyleIframe } from "../iframeFooks";
import { useEffect, useRef } from "@wordpress/element";
import LabelBox from "../LabelBox ";
import OptionModal from "../OptionModal";
import {
	useElementBackgroundColor,
	useIsIframeMobile,
	ShadowStyle,
	ShadowElm,
} from "itmar-block-packages";
import { TypographyControls } from "itmar-block-packages";

import {
	Button,
	PanelBody,
	PanelRow,
	Modal,
	RadioControl,
	TextControl,
	ToggleControl,
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

export default function Edit({ attributes, setAttributes, context }) {
	const {
		inputName,
		selPattern,
		selectValues,
		selectedValues,
		folder_val,
		required,
		bgColor,
		optionColor,
		hoverBgColor,
		font_style_option,
		default_pos,
		mobile_pos,
		bgSelectColor,
		bgSelectGradient,
		radius_value,
		border_value,
		labelContent,
		labelWidth,
		labelVertAlign,
		font_style_label,
		bgColor_label,
		bgGradient_label,
		textColor_label,
		radius_label,
		border_label,
		padding_label,
		labelSpace,
		shadow_element,
		shadow_result,
		is_shadow,
		className,
	} = attributes;

	//モバイルの判定
	const isMobile = useIsIframeMobile();

	//ブロックの参照
	const blockRef = useRef(null);
	const blockProps = useBlockProps({
		ref: blockRef, // ここで参照を blockProps に渡しています
		style: { backgroundColor: bgColor }, //背景色をブロックのルートにインラインでセット
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

	// selPatternがtrueの場合、multiple属性を持つオブジェクトを返す
	const selectAttributes = selPattern === "multi" ? { multiple: true } : {};

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);

	//親コンポーネントからのラベル幅の指定があればそれを採用して記録する
	const label_width = context["itmar/label_width"] || "auto";
	useEffect(() => {
		setAttributes({ labelWidth: label_width });
	}, [label_width]);

	//選択要素のクリア
	useEffect(() => {
		setAttributes({ selectedValues: [] });
	}, [selPattern]);

	function renderContent() {
		return (
			<>
				<NomalSelect
					onOptionSelect={(selID) => {
						if (selID == undefined) {
							//undefinedのときは設定を解除
							setAttributes({ selectedValues: [] });
							return;
						}
						if (selectedValues.includes(selID)) {
							return; // 既に選択されている場合はそのまま
						}
						//複数選択のときは複数配列、単数選択の時は単数配列
						const newArray =
							selPattern === "multi" ? [...selectedValues, selID] : [selID];
						setAttributes({ selectedValues: newArray });
					}}
					onOptionDeselect={(selID) => {
						const newArray = selectedValues.filter((index) => index !== selID);
						setAttributes({ selectedValues: newArray });
					}}
				>
					<select
						class="nomal"
						{...selectAttributes}
						name={inputName}
						data-placeholder={folder_val}
					>
						{selPattern === "single" && (
							<option value="">
								{__("Please Select.", "block-collections")}
							</option>
						)}
						{selectValues.map((option_item) => {
							return (
								<option
									id={option_item.id}
									className={option_item.classname}
									value={option_item.value}
									selected={selectedValues.includes(option_item.id)}
								>
									{option_item.label}
								</option>
							);
						})}
					</select>
				</NomalSelect>

				<LabelBox
					attributes={{
						required,
						labelContent,
						font_style_label,
						bgColor_label,
						bgGradient_label,
						textColor_label,
						radius_label,
						border_label,
						padding_label,
						labelSpace,
						labelWidth,
						labelVertAlign,
						shadow_result,
						is_shadow,
						isMobile,
						className,
					}}
					setAttributes={setAttributes}
				/>
			</>
		);
	}

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody
					title={__("Select Element Settings", "block-collections")}
					initialOpen={true}
					className="select_design_ctrl"
				>
					<PanelRow>
						<TextControl
							label={__("name attribute name", "block-collections")}
							value={inputName}
							onChange={(newVal) => setAttributes({ inputName: newVal })}
						/>
					</PanelRow>
					<label className="components-base-control__label">
						{__("Select Pattern", "block-collections")}
					</label>
					<PanelRow className="itmar_select_row">
						<RadioControl
							selected={selPattern}
							options={[
								{
									label: __("Single Select", "block-collections"),
									value: "single",
								},
								{
									label: __("Nulti Select", "block-collections"),
									value: "multi",
								},
							]}
							onChange={(changeOption) => {
								setAttributes({ selPattern: changeOption });
							}}
						/>
					</PanelRow>

					<TextControl
						label={__("Place Folder Display", "block-collections")}
						value={folder_val}
						onChange={(newVal) => setAttributes({ folder_val: newVal })}
					/>
					<PanelBody
						className={"itmar_notice_select_panel"}
						title={__("Option info Setting", "block-collections")}
					>
						<OptionModal
							optionValues={selectValues}
							onAddOption={(selectedOption) => {
								setAttributes({
									selectValues: [...selectValues, selectedOption],
								});
							}}
							onUpdateOption={(updatedValues) => {
								setAttributes({ selectValues: updatedValues });
							}}
						/>
					</PanelBody>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody
					title={__("Global settings", "block-collections")}
					initialOpen={false}
					className="select_design_ctrl"
				>
					<PanelColorGradientSettings
						title={__("Background Color Setting", "block-collections")}
						settings={[
							{
								colorValue: bgColor,
								label: __("Choose Block Background color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ bgColor: newValue }),
							},
							{
								colorValue: bgSelectColor,
								gradientValue: bgSelectGradient,

								label: __(
									"Choose Select Background color",
									"block-collections",
								),
								onColorChange: (newValue) => {
									setAttributes({
										bgSelectColor: newValue === undefined ? "" : newValue,
									});
								},
								onGradientChange: (newValue) =>
									setAttributes({ bgSelectGradient: newValue }),
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
							!isMobile ? default_pos.margin_value : mobile_pos.margin_value
						}
						onChange={(value) => {
							if (!isMobile) {
								setAttributes({
									default_pos: { ...default_pos, margin_value: value },
								});
							} else {
								setAttributes({
									mobile_pos: { ...mobile_pos, margin_value: value },
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
							!isMobile ? default_pos.padding_value : mobile_pos.padding_value
						}
						onChange={(value) => {
							if (!isMobile) {
								setAttributes({
									default_pos: { ...default_pos, padding_value: value },
								});
							} else {
								setAttributes({
									mobile_pos: { ...mobile_pos, padding_value: value },
								});
							}
						}}
						units={units} // 許可する単位
						allowReset={true} // リセットの可否
						resetValues={padding_resetValues} // リセット時の値
					/>
					<PanelBody
						title={__("Border Settings", "block-collections")}
						initialOpen={false}
						className="border_design_ctrl"
					>
						<BorderBoxControl
							colors={[
								{ color: "#72aee6" },
								{ color: "#000" },
								{ color: "#fff" },
							]}
							onChange={(newValue) => setAttributes({ border_value: newValue })}
							value={border_value}
							allowReset={true} // リセットの可否
							resetValues={border_resetValues} // リセット時の値
						/>
						<BorderRadiusControl
							values={radius_value}
							onChange={(newBrVal) =>
								setAttributes({
									radius_value:
										typeof newBrVal === "string"
											? { value: newBrVal }
											: newBrVal,
								})
							}
						/>
					</PanelBody>
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
					title={__("Option Style Settings", "block-collections")}
					initialOpen={false}
					className="select_design_ctrl"
				>
					<TypographyControls
						title={__("Typography", "block-collections")}
						fontStyle={font_style_option}
						onChange={(newStyle) => {
							setAttributes({ font_style_option: newStyle });
						}}
						isMobile={isMobile}
						initialOpen={false}
					/>

					<PanelColorGradientSettings
						title={__("Option Color Setting", "block-collections")}
						settings={[
							{
								colorValue: optionColor,
								label: __("Choose Text color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ optionColor: newValue }),
							},
							{
								colorValue: hoverBgColor,
								label: __(
									"Choose Background color on mouse hover",
									"block-collections",
								),
								onColorChange: (newValue) =>
									setAttributes({ hoverBgColor: newValue }),
							},
						]}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<StyleComp attributes={attributes}>{renderContent()}</StyleComp>
			</div>
		</>
	);
}
