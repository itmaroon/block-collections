import { __ } from "@wordpress/i18n";
import { TypographyControls } from "itmar-block-packages";
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
import { useState, useEffect } from "@wordpress/element";

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

export default function ToolTips(props) {
	const { attributes, isMobile } = props;

	const {
		font_style,
		color,
		bgColor,
		bgGradient,
		border,
		borderRadius,
		padding,
	} = attributes;

	const [localBgColor, setLocalBgColor] = useState(bgColor);
	const [localBgGradient, setLocalBgGradient] = useState(bgGradient);

	useEffect(() => {
		const newAttributes = {
			...attributes,
			bgColor: localBgColor === undefined ? "" : localBgColor, //デフォルト値を復活させない
			bgGradient: localBgGradient,
		};
		props.onChange(newAttributes);
	}, [localBgColor, localBgGradient]);

	return (
		<>
			<PanelBody
				title={__("Tooltip style settings", "block-collections")}
				initialOpen={false}
				className="title_design_ctrl"
			>
				<TypographyControls
					title={__("Typography", "block-collections")}
					fontStyle={font_style}
					onChange={(newStyle) => {
						const setStyle = { ...attributes, font_style: newStyle };
						props.onChange(setStyle);
					}}
					isMobile={isMobile}
					initialOpen={false}
				/>
				<PanelColorGradientSettings
					title={__("Tooltip Color Setting", "block-collections")}
					settings={[
						{
							colorValue: color,
							label: __("Choose Text color", "block-collections"),
							onColorChange: (newValue) => {
								const setStyle = { ...attributes, color: newValue };
								props.onChange(setStyle);
							},
						},
						{
							colorValue: bgColor,
							gradientValue: bgGradient,

							label: __("Choose Background color", "block-collections"),
							onColorChange: (newValue) => {
								setLocalBgColor(newValue);
								//setLocalBgGradient("");
							},

							onGradientChange: (newValue) => {
								setLocalBgGradient(newValue);
								//setLocalBgColor(""); //bgColorがundefinedだとデフォルトがセットされてしまう
							},
						},
					]}
				/>
				<PanelBody
					title={__("Border Settings", "block-collections")}
					initialOpen={false}
					className="border_design_ctrl"
				>
					<BorderBoxControl
						onChange={(newValue) => {
							const setStyle = { ...attributes, border: newValue };
							props.onChange(setStyle);
						}}
						value={border}
						allowReset={true} // リセットの可否
						resetValues={border_resetValues} // リセット時の値
					/>
					<BorderRadiusControl
						values={borderRadius}
						onChange={(newBrVal) => {
							const setVal =
								typeof newBrVal === "string" ? { value: newBrVal } : newBrVal;
							const setStyle = { ...attributes, borderRadius: setVal };
							props.onChange(setStyle);
						}}
					/>
				</PanelBody>
				<BoxControl
					label={
						!isMobile
							? __("Padding settings(desk top)", "block-collections")
							: __("Padding settings(mobile)", "block-collections")
					}
					values={!isMobile ? padding.default : padding.mobile}
					onChange={(value) => {
						const setStyle = !isMobile
							? {
									...attributes,
									padding: { ...attributes.padding, default: value },
							  }
							: {
									...attributes,
									padding: { ...attributes.padding, mobile: value },
							  };
						props.onChange(setStyle);
					}}
					units={units} // 許可する単位
					allowReset={true} // リセットの可否
					resetValues={padding_resetValues} // リセット時の値
				/>
			</PanelBody>
		</>
	);
}
