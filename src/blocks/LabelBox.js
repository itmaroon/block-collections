import { __ } from "@wordpress/i18n";
import { TypographyControls } from "itmar-block-packages";
import { useStyleIframe } from "./iframeFooks";
import {
	InspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalBorderRadiusControl as BorderRadiusControl,
} from "@wordpress/block-editor";
import {
	ToggleControl,
	TextControl,
	PanelBody,
	PanelRow,
	__experimentalBoxControl as BoxControl,
	__experimentalBorderBoxControl as BorderBoxControl,
	__experimentalUnitControl as UnitControl,
	__experimentalAlignmentMatrixControl as AlignmentMatrixControl,
} from "@wordpress/components";
import StyleLabel from "./StyleLabel";

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

export default function LabelBox(props) {
	const { attributes } = props;

	const {
		required,
		labelContent,
		default_pos,
		mobile_pos,
		font_style_label,
		bgColor_label,
		bgGradient_label,
		textColor_label,
		radius_label,
		border_label,
		padding_label,
		labelSpace,
		isMobile,
	} = attributes;

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleLabel, props.attributes);

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody
					title={__("Required Settings", "block-collections")}
					initialOpen={true}
					className="title_design_ctrl"
				>
					<PanelRow className="labelRequierd_row">
						<ToggleControl
							label={__("Required input", "block-collections")}
							checked={required.flg}
							onChange={(newVal) => {
								const newObj = { ...required, flg: newVal };

								props.onChange("required", newObj);
							}}
						/>
					</PanelRow>
					{required.flg && (
						<PanelRow>
							<TextControl
								label={__("Show 'required'", "block-collections")}
								value={required.display}
								isPressEnterToChange
								onChange={(newVal) => {
									const newObj = { ...required, display: newVal };

									props.onChange("required", newObj);
								}}
							/>
						</PanelRow>
					)}
				</PanelBody>
				<PanelBody
					title={__("Label Settings", "block-collections")}
					initialOpen={true}
					className="title_design_ctrl"
				>
					<PanelRow className="labelInfo_row">
						<TextControl
							label={__("Text of Label", "block-collections")}
							labelPosition="top"
							value={labelContent}
							isPressEnterToChange
							onChange={(newValue) => props.onChange("labelContent", newValue)}
						/>
					</PanelRow>
					<label>
						{!isMobile
							? __("Label Alignment(desk top)", "block-collections")
							: __("Label Alignment(mobile)", "block-collections")}
					</label>
					<AlignmentMatrixControl
						label={
							!isMobile
								? __("Label Alignment(desk top)", "block-collections")
								: __("Label Alignment(mobile)", "block-collections")
						}
						value={!isMobile ? default_pos.labelPos : mobile_pos.labelPos}
						onChange={(newValue) => {
							if (!isMobile) {
								props.onChange("default_pos", {
									...default_pos,
									labelPos: newValue,
								});
							} else {
								props.onChange("mobile_pos", {
									...mobile_pos,
									labelPos: newValue,
								});
							}
						}}
					/>
					<label>
						{__(
							"Selecting the center vertically or horizontally will hide it.",
							"block-collections",
						)}
					</label>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody
					title={__("Label style settings", "block-collections")}
					initialOpen={false}
					className="title_design_ctrl"
				>
					<TypographyControls
						title={__("Typography", "block-collections")}
						fontStyle={font_style_label}
						onChange={(newStyle) => {
							props.onChange("font_style_label", newStyle);
						}}
						isMobile={isMobile}
						initialOpen={false}
					/>
					<PanelColorGradientSettings
						title={__("Label Color Setting", "block-collections")}
						settings={[
							{
								colorValue: textColor_label,
								label: __("Choose Text color", "block-collections"),
								onColorChange: (newValue) =>
									props.onChange("textColor_label", newValue),
							},
							{
								colorValue: bgColor_label,
								gradientValue: bgGradient_label,

								label: __("Choose Background color", "block-collections"),
								onColorChange: (newValue) =>
									props.onChange("bgColor_label", newValue),

								onGradientChange: (newValue) =>
									props.onChange("bgGradient_label", newValue),
							},
						]}
					/>
					<PanelBody
						title={__("Border Settings", "block-collections")}
						initialOpen={false}
						className="border_design_ctrl"
					>
						<BorderBoxControl
							onChange={(newValue) => props.onChange("border_label", newValue)}
							value={border_label}
							allowReset={true} // リセットの可否
							resetValues={border_resetValues} // リセット時の値
						/>
						<BorderRadiusControl
							values={radius_label}
							onChange={(newBrVal) =>
								props.onChange(
									"radius_label",
									typeof newBrVal === "string" ? { value: newBrVal } : newBrVal,
								)
							}
						/>
					</PanelBody>
					<BoxControl
						label={__("Padding settings", "block-collections")}
						values={padding_label}
						onChange={(value) => props.onChange("padding_label", value)}
						units={units} // 許可する単位
						allowReset={true} // リセットの可否
						resetValues={padding_resetValues} // リセット時の値
					/>
					<UnitControl
						dragDirection="e"
						onChange={(newValue) => props.onChange("labelSpace", newValue)}
						label={__("Spacing with textbox", "block-collections")}
						value={labelSpace}
					/>
				</PanelBody>
			</InspectorControls>

			<StyleLabel attributes={attributes}>
				{required.flg ? (
					<>
						{labelContent}
						<span>({required.display})</span>
					</>
				) : (
					labelContent
				)}
			</StyleLabel>
		</>
	);
}
