import { __ } from "@wordpress/i18n";
import { StyleComp } from "./StyleRadio";
import { useStyleIframe } from "../iframeFooks";
import OptionModal from "../OptionModal";

import {
	useElementBackgroundColor,
	useIsIframeMobile,
	ShadowStyle,
	ShadowElm,
	TypographyControls,
} from "itmar-block-packages";
import {
	PanelBody,
	PanelRow,
	TextControl,
	ToggleControl,
	Button,
	Icon,
	ToolbarGroup,
	ToolbarItem,
	__experimentalBoxControl as BoxControl,
	__experimentalUnitControl as UnitControl,
	__experimentalBorderBoxControl as BorderBoxControl,
} from "@wordpress/components";
import {
	useBlockProps,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalBorderRadiusControl as BorderRadiusControl,
} from "@wordpress/block-editor";

import { useEffect, useRef } from "@wordpress/element";

import "./editor.scss";

import {
	stack,
	justifyCenter,
	justifyLeft,
	justifyRight,
	justifySpaceBetween,
	justifyStretch,
} from "@wordpress/icons";

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

//横並びのアイコン
const flex = <Icon icon={stack} className="rotate-icon" />;
//上よせアイコン
const upper = <Icon icon={justifyLeft} className="rotate-icon" />;
//中央よせのアイコン
const middle = <Icon icon={justifyCenter} className="rotate-icon" />;
//下よせのアイコン
const lower = <Icon icon={justifyRight} className="rotate-icon" />;
//上下一杯に伸ばすアイコン
const vert_between = <Icon icon={justifyStretch} className="rotate-icon" />;
//上下均等に伸ばすアイコン
const vert_around = <Icon icon={justifySpaceBetween} className="rotate-icon" />;

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		inputName,
		optionValues,
		selectedValues,
		isSetSelect,
		bgColor,
		font_style_input,
		default_pos,
		mobile_pos,
		inputColor,
		inputBgColor,
		radius_box,
		border_box,
		shadow_box,
		is_shadow_box,
		radius_input,
		border_input,
		shadow_input,
		is_shadow_input,
		buttonColor,
		buttonBgColor,
		color_select,
		bgColor_select,
		bgGradient_select,
		shadow_select,

		is_shadow_select,
		isReleaseButton,
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

	//ラベルの参照
	const labelRef = useRef(null); //レンダリングで参照の設定を忘れないこと

	//背景色の取得(カスタムプロパティの時はシャドウの背景色設定ができないため)
	const baseColor = useElementBackgroundColor(blockRef, blockProps.style);
	const labelBaseColor = useElementBackgroundColor(labelRef, blockProps, {
		backgroundColor: inputBgColor,
	});

	//背景色変更によるシャドー属性の書き換え
	useEffect(() => {
		if (baseColor) {
			setAttributes({
				shadow_box: { ...shadow_box, baseColor: baseColor },
			});
			const new_shadow = ShadowElm({ ...shadow_box, baseColor: baseColor });
			if (new_shadow) {
				setAttributes({ shadow_result_box: new_shadow.style });
			}
		}
		if (labelBaseColor) {
			setAttributes({
				shadow_input: { ...shadow_input, baseColor: labelBaseColor },
			});
			const new_shadow = ShadowElm({
				...shadow_input,
				baseColor: labelBaseColor,
			});
			if (new_shadow) {
				setAttributes({ shadow_result_input: new_shadow.style });
			}
		}
		if (bgColor_select) {
			setAttributes({
				shadow_select: { ...shadow_select, baseColor: bgColor_select },
			});
			const new_shadow = ShadowElm({
				...shadow_select,
				baseColor: bgColor_select,
			});
			if (new_shadow) {
				setAttributes({ shadow_result_select: new_shadow.style });
			}
		}
	}, [baseColor, inputBgColor, bgColor_select]);

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);

	const renderContent = () => {
		return (
			<>
				{optionValues.map((item, index) => {
					const isChecked = selectedValues === item.value;
					let labelClass = "";
					// 選択されたラジオボタンのインデックスを見つける
					const selectedIndex = optionValues.findIndex(
						(option) => option.value === selectedValues,
					);

					if (isChecked) {
						labelClass = "ready checked"; //チェックされているボタンのラベルにはcheckedクラスを付加
					} else if (selectedIndex !== -1) {
						// 選択された項目が存在する場合
						if (index < selectedIndex) {
							labelClass = "ready check_prev"; //チェックされている前のボタンのラベルにはcheck_prevクラスを付加
						} else if (index > selectedIndex) {
							labelClass = "ready check_next"; //チェックされている後のボタンのラベルにはcheck_nextクラスを付加
						}
					}

					return (
						<label
							ref={labelRef}
							key={item.id}
							className={`itmar_radio ${labelClass}`}
						>
							<input
								type="radio"
								name={inputName}
								value={item.value}
								checked={selectedValues === item.value}
								onChange={() => {
									setAttributes({ selectedValues: item.value });
								}}
							/>
							<span>{item.label}</span>
						</label>
					);
				})}
				{isReleaseButton && (
					<label className="itmar_radio">
						<button
							onClick={() => {
								setAttributes({ selectedValues: "" });
							}}
						>
							{__("Clear", "block-collections")}
						</button>
					</label>
				)}
			</>
		);
	};

	//モバイルかデスクトップか
	const sel_pos = isMobile ? mobile_pos : default_pos;
	//配置アイコンの選択
	const start_icon = sel_pos.direction === "vertical" ? upper : justifyLeft;
	const center_icon = sel_pos.direction === "vertical" ? middle : justifyCenter;
	const end_icon = sel_pos.direction === "vertical" ? lower : justifyRight;
	const between_icon =
		sel_pos.direction === "vertical" ? vert_between : justifyStretch;
	const around_icon =
		sel_pos.direction === "vertical" ? vert_around : justifySpaceBetween;
	//ツールチップの選択
	const start_tip =
		sel_pos.direction === "vertical"
			? __("upper alignment", "block-collections")
			: __("left alignment", "block-collections");
	const end_tip =
		sel_pos.direction === "vertical"
			? __("lower alignment", "block-collections")
			: __("right alignment", "block-collections");
	//属性のセットハンドル
	const handleResponsive = (property, value) => {
		if (!isMobile) {
			setAttributes({
				default_pos: { ...default_pos, [property]: value },
			});
		} else {
			setAttributes({
				mobile_pos: { ...mobile_pos, [property]: value },
			});
		}
	};

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
						onChange={(newVal) => setAttributes({ inputName: newVal })}
					/>
				</PanelBody>
				{isSetSelect && (
					<PanelBody
						className={"itmar_notice_select_panel"}
						title={__("Option info Setting", "block-collections")}
					>
						<OptionModal
							optionValues={optionValues}
							onAddOption={(selectedOption) => {
								setAttributes({
									optionValues: [...optionValues, selectedOption],
								});
							}}
							onUpdateOption={(updatedValues) => {
								setAttributes({ optionValues: updatedValues });
							}}
						/>
					</PanelBody>
				)}
				<PanelBody
					className={"itmar_notice_select_panel"}
					title={__("Select Release Setting", "block-collections")}
				>
					<ToggleControl
						label={__("Is Select Release Button", "block-collections")}
						checked={isReleaseButton}
						onChange={(newVal) => {
							setAttributes({ isReleaseButton: newVal });
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody
					title={__("Global settings", "block-collections")}
					initialOpen={false}
					className="itmar_group_direction"
				>
					{isMobile ? (
						<p>{__("Radiobutton direction(Mobile)", "block-collections")}</p>
					) : (
						<p>{__("Radiobutton direction(DeskTop)", "block-collections")}</p>
					)}
					<PanelRow className="direction_row">
						<ToolbarGroup>
							<ToolbarItem>
								{(itemProps) => (
									<Button
										{...itemProps}
										isPressed={sel_pos.direction === "vertical"}
										icon={stack}
										onClick={() => handleResponsive("direction", "vertical")}
										label={__("virtical", "block-collections")}
									/>
								)}
							</ToolbarItem>
							<ToolbarItem>
								{(itemProps) => (
									<Button
										{...itemProps}
										isPressed={sel_pos.direction === "horizen"}
										onClick={() => handleResponsive("direction", "horizen")}
										icon={flex}
										label={__("horizen", "block-collections")}
									/>
								)}
							</ToolbarItem>
						</ToolbarGroup>
						<ToggleControl
							label={__("Wrap", "block-collections")}
							checked={sel_pos.wrap}
							onChange={(checked) => handleResponsive("wrap", checked)}
						/>
					</PanelRow>
					{isMobile ? (
						<p>{__("Radiobutton alignment(Mobile)", "block-collections")}</p>
					) : (
						<p>{__("Radiobutton alignment(DeskTop)", "block-collections")}</p>
					)}
					<ToolbarGroup>
						<ToolbarItem>
							{(itemProps) => (
								<Button
									{...itemProps}
									isPressed={sel_pos.inner_align === "flex-start"}
									onClick={() => handleResponsive("inner_align", "flex-start")}
									icon={start_icon}
									label={start_tip}
								/>
							)}
						</ToolbarItem>
						<ToolbarItem>
							{(itemProps) => (
								<Button
									{...itemProps}
									isPressed={sel_pos.inner_align === "center"}
									onClick={() => handleResponsive("inner_align", "center")}
									icon={center_icon}
									label={__("center alignment", "block-collections")}
								/>
							)}
						</ToolbarItem>
						<ToolbarItem>
							{(itemProps) => (
								<Button
									{...itemProps}
									isPressed={sel_pos.inner_align === "flex-end"}
									onClick={() => handleResponsive("inner_align", "flex-end")}
									icon={end_icon}
									label={end_tip}
								/>
							)}
						</ToolbarItem>
						<ToolbarItem>
							{(itemProps) => (
								<Button
									{...itemProps}
									isPressed={sel_pos.inner_align === "space-between"}
									onClick={() =>
										handleResponsive("inner_align", "space-between")
									}
									icon={between_icon}
									label={__("beteen stretch", "block-collections")}
								/>
							)}
						</ToolbarItem>
						<ToolbarItem>
							{(itemProps) => (
								<Button
									{...itemProps}
									isPressed={sel_pos.inner_align === "space-around"}
									onClick={() =>
										handleResponsive("inner_align", "space-around")
									}
									icon={around_icon}
									label={__("around stretch", "block-collections")}
								/>
							)}
						</ToolbarItem>
					</ToolbarGroup>
					<PanelColorGradientSettings
						title={__("Background Color Setting", "block-collections")}
						settings={[
							{
								colorValue: bgColor,
								label: __("Choose Block Background color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ bgColor: newValue }),
							},
						]}
					/>
					<BoxControl
						label={
							!isMobile
								? __("Margin settings(desk top)", "block-collections")
								: __("Margin settings(mobile)", "block-collections")
						}
						values={sel_pos.margin}
						onChange={(value) => handleResponsive("margin", value)}
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
						values={sel_pos.padding}
						onChange={(value) => handleResponsive("padding", value)}
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
							onChange={(newValue) => setAttributes({ border_box: newValue })}
							value={border_box}
							allowReset={true} // リセットの可否
							resetValues={border_resetValues} // リセット時の値
						/>
						<BorderRadiusControl
							values={radius_box}
							onChange={(newBrVal) =>
								setAttributes({
									radius_box:
										typeof newBrVal === "string"
											? { value: newBrVal }
											: newBrVal,
								})
							}
						/>
					</PanelBody>
					<ToggleControl
						label={__("Is Shadow", "block-collections")}
						checked={is_shadow_box}
						onChange={(newVal) => {
							setAttributes({ is_shadow_box: newVal });
						}}
					/>
					{is_shadow_box && (
						<ShadowStyle
							shadowStyle={{ ...shadow_box }}
							onChange={(newStyle, newState) => {
								setAttributes({ shadow_result_box: newStyle.style });
								setAttributes({ shadow_box: newState });
							}}
						/>
					)}
				</PanelBody>
				<PanelBody
					title={__("Input style settings", "block-collections")}
					initialOpen={false}
					className="check_design_ctrl"
				>
					<TypographyControls
						title={__("Typography", "block-collections")}
						fontStyle={font_style_input}
						isMobile={isMobile}
						onChange={(newStyle) => {
							setAttributes({ font_style_input: newStyle });
						}}
						initialOpen={false}
					/>
					<PanelColorGradientSettings
						title={__("Input Color Setting", "block-collections")}
						settings={[
							{
								colorValue: inputColor,
								label: __("Choose Input color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ inputColor: newValue }),
							},
							{
								colorValue: inputBgColor,
								label: __("Choose Input Background color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ inputBgColor: newValue }),
							},
						]}
					/>

					{(className === undefined ||
						className?.split(" ").includes("is-style-nomal")) && (
						<>
							<PanelColorGradientSettings
								title={__("Radiobutton Color Setting", "block-collections")}
								settings={[
									{
										colorValue: buttonColor,
										label: __("Choose Radiobutton color", "block-collections"),
										onColorChange: (newValue) =>
											setAttributes({ buttonColor: newValue }),
									},
									{
										colorValue: buttonBgColor,
										label: __(
											"Choose Button Background color",
											"block-collections",
										),
										onColorChange: (newValue) =>
											setAttributes({ buttonBgColor: newValue }),
									},
								]}
							/>

							<UnitControl
								dragDirection="e"
								label={
									!isMobile
										? __("Button Scale(desk top)", "block-collections")
										: __("Button Scale(mobile)", "block-collections")
								}
								onChange={(value) => handleResponsive("button_scale", value)}
								value={sel_pos.button_scale}
							/>
						</>
					)}
					{className?.split(" ").includes("is-style-button") && (
						<PanelBody
							title={__("Selected Button settings", "block-collections")}
							initialOpen={false}
							className="itmar_group_direction"
						>
							<PanelColorGradientSettings
								title={__("Selected Button Color Setting", "block-collections")}
								settings={[
									{
										colorValue: color_select,
										label: __(
											"Choose Selected Text color",
											"block-collections",
										),
										onColorChange: (newValue) =>
											setAttributes({ color_select: newValue }),
									},
									{
										colorValue: bgColor_select,
										gradientValue: bgGradient_select,
										label: __(
											"Choose Selected Button color",
											"block-collections",
										),

										onColorChange: (newValue) => {
											setAttributes({
												bgColor_select: newValue === undefined ? "" : newValue,
											});
										},
										onGradientChange: (newValue) => {
											setAttributes({ bgGradient_select: newValue });
										},
									},
								]}
							/>
							<ToggleControl
								label={__("Is Shadow", "block-collections")}
								checked={is_shadow_select}
								onChange={(newVal) => {
									setAttributes({ is_shadow_select: newVal });
								}}
							/>
							{is_shadow_select && (
								<ShadowStyle
									shadowStyle={{ ...shadow_select }}
									onChange={(newStyle, newState) => {
										setAttributes({ shadow_result_select: newStyle.style });
										setAttributes({ shadow_select: newState });
									}}
								/>
							)}
						</PanelBody>
					)}

					<BoxControl
						label={
							!isMobile
								? __("Margin settings(desk top)", "block-collections")
								: __("Margin settings(mobile)", "block-collections")
						}
						values={sel_pos.margin_input}
						onChange={(value) => handleResponsive("margin_input", value)}
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
						values={sel_pos.padding_input}
						onChange={(value) => handleResponsive("padding_input", value)}
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
					<ToggleControl
						label={__("Is Shadow", "block-collections")}
						checked={is_shadow_input}
						onChange={(newVal) => {
							setAttributes({ is_shadow_input: newVal });
						}}
					/>
					{is_shadow_input && (
						<ShadowStyle
							shadowStyle={{ ...shadow_input }}
							onChange={(newStyle, newState) => {
								setAttributes({ shadow_result_input: newStyle.style });
								setAttributes({ shadow_input: newState });
							}}
						/>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<StyleComp attributes={attributes}>{renderContent()}</StyleComp>
			</div>
		</>
	);
}
