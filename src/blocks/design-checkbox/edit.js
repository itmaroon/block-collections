import { __ } from "@wordpress/i18n";
import { StyleComp } from "./StyleCheckbox";
import { useStyleIframe } from "../iframeFooks";

import {
	useElementBackgroundColor,
	useIsIframeMobile,
	ShadowStyle,
	ShadowElm,
	TypographyControls,
} from "itmar-block-packages";
import {
	PanelBody,
	TextControl,
	ToggleControl,
	__experimentalBoxControl as BoxControl,
	__experimentalBorderBoxControl as BorderBoxControl,
} from "@wordpress/components";
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalBorderRadiusControl as BorderRadiusControl,
} from "@wordpress/block-editor";

import { useEffect, useRef } from "@wordpress/element";

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

export default function Edit({ attributes, setAttributes }) {
	const {
		inputName,
		inputValue,
		proceedCheck,
		bgColor,
		align,
		labelContent,
		font_style_label,
		default_pos,
		mobile_pos,
		bgColor_form,
		labelColor,
		boxColor,
		boxBgColor,
		radius_heading,
		border_heading,
		shadow_element,
		is_shadow,
	} = attributes;

	//テキストの配置
	const align_style =
		align === "center"
			? { marginLeft: "auto", marginRight: "auto" }
			: align === "right"
			? { marginLeft: "auto" }
			: null;

	//モバイルの判定
	const isMobile = useIsIframeMobile();

	//ブロックの参照
	const blockRef = useRef(null);
	const blockProps = useBlockProps({
		ref: blockRef, // ここで参照を blockProps に渡しています
		style: { ...align_style, backgroundColor: bgColor },
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

	function renderContent() {
		return (
			<>
				<label>
					<input
						type="checkbox"
						name={inputName}
						checked={inputValue}
						onChange={(event) => {
							setAttributes({ inputValue: event.target.checked });
						}}
					/>
					<span></span>
				</label>
				<RichText
					onChange={(newContent) => {
						setAttributes({ labelContent: newContent });
					}}
					value={labelContent}
					placeholder={__("Write Checkbox Label...", "block-collections")}
				/>
			</>
		);
	}

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody
					title={__("Input element information setting", "block-collections")}
					initialOpen={true}
					className="form_setteing_ctrl"
				>
					<TextControl
						label={__("name attribute name", "block-collections")}
						value={inputName}
						help={__(
							"When using another design-checkbox as one of the options as an inner block, please use the same name.",
							"block-collections",
						)}
						onChange={(newVal) => setAttributes({ inputName: newVal })}
					/>
					<ToggleControl
						label={__("Check to proceed", "block-collections")}
						checked={proceedCheck}
						onChange={(newValue) => setAttributes({ proceedCheck: newValue })}
						help={__(
							"When it is the inner block of the block where the submit button is placed, the submit button is enabled by checking it.",
							"block-collections",
						)}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody
					title={__("Global settings", "block-collections")}
					initialOpen={false}
					className="check_design_ctrl"
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
								colorValue: bgColor_form,
								label: __("Choose Input Background color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ bgColor_form: newValue }),
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
							onChange={(newValue) =>
								setAttributes({ border_heading: newValue })
							}
							value={border_heading}
							allowReset={true} // リセットの可否
							resetValues={border_resetValues} // リセット時の値
						/>
						<BorderRadiusControl
							values={radius_heading}
							onChange={(newBrVal) =>
								setAttributes({
									radius_heading:
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
					title={__("Input style settings", "block-collections")}
					initialOpen={false}
					className="check_design_ctrl"
				>
					<PanelColorGradientSettings
						title={__("Input Color Setting", "block-collections")}
						settings={[
							{
								colorValue: boxColor,
								label: __("Choose Input color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ boxColor: newValue }),
							},
							{
								colorValue: boxBgColor,
								label: __("Choose Input Background color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ boxBgColor: newValue }),
							},
						]}
					/>
				</PanelBody>
				<PanelBody
					title={__("Label style settings", "block-collections")}
					initialOpen={false}
					className="check_design_ctrl"
				>
					<TypographyControls
						title={__("Typography", "block-collections")}
						fontStyle={font_style_label}
						isMobile={isMobile}
						onChange={(newStyle) => {
							setAttributes({ font_style_label: newStyle });
						}}
						initialOpen={false}
					/>

					<PanelColorGradientSettings
						title={__("Label Color Setting", "block-collections")}
						settings={[
							{
								colorValue: labelColor,
								label: __("Choose Text color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ labelColor: newValue }),
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
				<StyleComp attributes={attributes}>{renderContent()}</StyleComp>
			</div>
		</>
	);
}
