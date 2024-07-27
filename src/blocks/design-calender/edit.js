import { __ } from "@wordpress/i18n";
import { StyleComp } from "./StyleCalender";
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
	PanelRow,
	TextControl,
	ToggleControl,
	RadioControl,
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

import { useEffect, useRef, useState } from "@wordpress/element";

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

const weekLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

//与えられた月から日付と曜日を要素とする配列を生成する
const generateMonthCalendar = (dateString) => {
	const [year, month] = dateString.split("/").map(Number);
	const date = new Date(year, month - 1, 1);
	const lastDay = new Date(year, month, 0).getDate();

	const calendar = [];

	for (let day = 1; day <= lastDay; day++) {
		date.setDate(day);
		calendar.push({
			date: day,
			weekday: date.getDay(),
		});
	}

	return calendar;
};

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		inputName,
		bgColor,
		selectedValue,
		dateValues,
		weekTop,
		selectedMonth,
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
		holidayColor,
		holidayBgColor,
		staturdayColor,
		saturdayBgColor,
		color_select,
		bgColor_select,
		bgGradient_select,
		shadow_select,
		weekLabelColor,
		weekLabelBgColor,
		font_style_week,
		is_shadow_select,
		font_style_input,
		radius_week,
		border_week,
		shadow_week,
		is_shadow_week,
		className,
	} = attributes;

	//モバイルの判定
	const isMobile = useIsIframeMobile();

	//ブロックの参照
	const blockRef = useRef(null);
	const blockProps = useBlockProps({
		//ref: blockRef, // ここで参照を blockProps に渡しています
		style: { width: "fit-content" },
	});

	//ラベルの参照
	const labelRef = useRef(null); //レンダリングで参照の設定を忘れないこと
	const weekRef = useRef(null); //レンダリングで参照の設定を忘れないこと

	//背景色の取得(カスタムプロパティの時はシャドウの背景色設定ができないため)
	const baseColor = useElementBackgroundColor(blockRef, {
		backgroundColor: bgColor,
	});

	const labelBaseColor = useElementBackgroundColor(labelRef, {
		backgroundColor: inputBgColor,
	});

	const weekBaseColor = useElementBackgroundColor(weekRef, {
		backgroundColor: weekLabelBgColor,
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

		if (weekBaseColor) {
			setAttributes({
				shadow_week: { ...shadow_week, baseColor: weekBaseColor },
			});
			const new_shadow = ShadowElm({
				...shadow_week,
				baseColor: weekBaseColor,
			});
			if (new_shadow) {
				setAttributes({ shadow_result_week: new_shadow.style });
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
		console.log(labelBaseColor);
	}, [baseColor, labelBaseColor, weekBaseColor, bgColor_select]);

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);

	//選択された月の変更による書き換え
	useEffect(() => {
		if (selectedMonth) {
			const newDateValues = generateMonthCalendar(selectedMonth);
			setAttributes({ dateValues: newDateValues });
		}
	}, [selectedMonth]);

	const renderContent = () => {
		return (
			<div ref={blockRef}>
				{week.map((item, index) => (
					<label
						ref={weekRef}
						key={index}
						className="itmar_week_label"
						style={{ gridArea: item }}
					>
						<span>{item}</span>
					</label>
				))}

				{dateValues.map((item, index) => {
					const checkClass =
						selectedValue === item.date ? "ready checked" : "ready";
					const weekClass =
						item.weekday === 0
							? "holiday"
							: item.weekday === 6
							? "saturday"
							: "";

					return (
						<label
							ref={labelRef}
							key={item.id}
							className={`itmar_radio ${checkClass} ${weekClass}`}
							style={{ gridArea: `day${item.date}` }}
						>
							<input
								type="radio"
								name={inputName}
								value={item.date}
								checked={selectedValue === item.date}
								onChange={() => {
									setAttributes({ selectedValue: item.date });
								}}
							/>
							<span>{String(item.date)}</span>
						</label>
					);
				})}
			</div>
		);
	};

	//モバイルかデスクトップか
	const sel_pos = isMobile ? mobile_pos : default_pos;

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
				<PanelBody
					title={__("Date Alignment Setting", "block-collections")}
					initialOpen={true}
					className="form_setteing_ctrl"
				>
					<div className="itmar_title_type">
						<RadioControl
							label={__("First day of the week", "block-collections")}
							selected={weekTop}
							options={[
								{ label: __("Sunday", "block-collections"), value: "sun" },
								{ label: __("Monday", "block-collections"), value: "mon" },
							]}
							onChange={(changeOption) =>
								setAttributes({ weekTop: changeOption })
							}
							help={__(
								"Select the day of the week that you want to place at the top of the calendar.",
								"block-collections",
							)}
						/>
					</div>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<PanelBody
					title={__("Global settings", "block-collections")}
					initialOpen={false}
					className="itmar_group_direction"
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
					title={__("Day style settings", "block-collections")}
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
							{
								colorValue: holidayColor,
								label: __("Choose Holiday color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ holidayColor: newValue }),
							},
							{
								colorValue: holidayBgColor,
								label: __(
									"Choose Horiday Background color",
									"block-collections",
								),
								onColorChange: (newValue) =>
									setAttributes({ holidayBgColor: newValue }),
							},
							{
								colorValue: staturdayColor,
								label: __("Choose Saturday color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ staturdayColor: newValue }),
							},
							{
								colorValue: saturdayBgColor,
								label: __(
									"Choose Saturday Background color",
									"block-collections",
								),
								onColorChange: (newValue) =>
									setAttributes({ saturdayBgColor: newValue }),
							},
						]}
					/>

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
									label: __("Choose Selected Text color", "block-collections"),
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

				<PanelBody
					title={__("Week Label style settings", "block-collections")}
					initialOpen={false}
					className="check_design_ctrl"
				>
					<TypographyControls
						title={__("Typography", "block-collections")}
						fontStyle={font_style_week}
						isMobile={isMobile}
						onChange={(newStyle) => {
							setAttributes({ font_style_week: newStyle });
						}}
						initialOpen={false}
					/>
					<PanelColorGradientSettings
						title={__("Label Color Setting", "block-collections")}
						settings={[
							{
								colorValue: weekLabelColor,
								label: __("Choose Text color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ weekLabelColor: newValue }),
							},
							{
								colorValue: weekLabelBgColor,
								label: __("Choose Label Background color", "block-collections"),
								onColorChange: (newValue) =>
									setAttributes({ weekLabelBgColor: newValue }),
							},
						]}
					/>

					<BoxControl
						label={
							!isMobile
								? __("Margin settings(desk top)", "block-collections")
								: __("Margin settings(mobile)", "block-collections")
						}
						values={sel_pos.margin_week}
						onChange={(value) => handleResponsive("margin_week", value)}
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
						values={sel_pos.padding_week}
						onChange={(value) => handleResponsive("padding_week", value)}
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
							onChange={(newValue) => setAttributes({ border_week: newValue })}
							value={border_week}
							allowReset={true} // リセットの可否
							resetValues={border_resetValues} // リセット時の値
						/>
						<BorderRadiusControl
							values={radius_week}
							onChange={(newBrVal) =>
								setAttributes({
									radius_week:
										typeof newBrVal === "string"
											? { value: newBrVal }
											: newBrVal,
								})
							}
						/>
					</PanelBody>
					<ToggleControl
						label={__("Is Shadow", "block-collections")}
						checked={is_shadow_week}
						onChange={(newVal) => {
							setAttributes({ is_shadow_week: newVal });
						}}
					/>
					{is_shadow_week && (
						<ShadowStyle
							shadowStyle={{ ...shadow_week }}
							onChange={(newStyle, newState) => {
								setAttributes({ shadow_result_week: newStyle.style });
								setAttributes({ shadow_week: newState });
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
