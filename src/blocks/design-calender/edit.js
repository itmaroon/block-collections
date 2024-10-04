import { __ } from "@wordpress/i18n";
import { StyleComp } from "./StyleCalender";

import { useStyleIframe } from "../iframeFooks";
import ToolTips from "../ToolTips";
import StyleTooltips from "../StyleTooltips";

import {
	useElementBackgroundColor,
	useIsIframeMobile,
	ShadowStyle,
	ShadowElm,
	TypographyControls,
	generateDateArray,
	generateMonthCalendar,
	JapaneseHolidays,
	PeriodCtrl,
	flattenBlocks,
} from "itmar-block-packages";

import {
	PanelBody,
	TextControl,
	ToggleControl,
	RadioControl,
	__experimentalBoxControl as BoxControl,
	__experimentalBorderBoxControl as BorderBoxControl,
} from "@wordpress/components";
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalBorderRadiusControl as BorderRadiusControl,
} from "@wordpress/block-editor";

import { useState, useEffect, useRef, useMemo } from "@wordpress/element";
import { useSelect, useDispatch, dispatch } from "@wordpress/data";

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

const helpLink = createElement(
	"a",
	{ href: "https://console.cloud.google.com/welcome", target: "_blank" },
	"Google Cloud Console",
);

const helpTextCode = createElement(
	"span",
	{},
	helpLink,
	__(
		"Go to the Google Cloud Console, create a new project, enable the Google Calendar API in the project, and enter the API key you just created. ",
		"block-collections",
	),
);

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		inputName,
		isReleaseButton,
		bgColor,
		selectedValue,
		dateValues,
		weekTop,
		isHoliday,
		calenderApiKey,
		dateSpan,
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
		tooltip_style,
		className,
	} = attributes;

	//選択可能期間取得
	const periodArray = generateDateArray(dateSpan, true);

	//モバイルの判定
	const isMobile = useIsIframeMobile();

	//ブロックの参照
	const blockRef = useRef(null);
	const blockProps = useBlockProps({
		style: { width: "fit-content" },
	});

	//インナーブロックのひな型を用意
	const TEMPLATE = [
		//同一ブロックを２つ以上入れないこと（名称の文字列が重ならないこと）
		[
			"itmar/design-group",
			{},
			[
				[
					"itmar/design-button",
					{
						linkKind: "none",
						displayType: "pseudo",
						pseudoInfo: { element: "Arrow", option: "left" },
						default_pos: {
							width: "2.5em",
							height: "2.5em",
							margin_value: {
								top: "10px",
								left: "10px",
								bottom: "10px",
								right: "10px",
							},
							padding_value: {
								top: "10px",
								left: "10px",
								bottom: "10px",
								right: "10px",
							},
						},
						mobile_pos: {
							width: "2em",
							height: "2em",
							margin_value: {
								top: "10px",
								left: "0",
								bottom: "10px",
								right: "0",
							},
							padding_value: {
								top: "10px",
								left: "10px",
								bottom: "10px",
								right: "10px",
							},
						},
						radius_value: { value: "50%" },
						className: "itmar_prev_month",
					},
				],
				[
					"itmar/design-select",
					{
						selectValues: periodArray,
						isSetSelect: false,
						default_pos: {
							margin_value: {
								top: "0",
								left: "0",
								bottom: "0",
								right: "0",
							},
							padding_value: {
								top: "0.5em",
								left: "1em",
								bottom: "0.5em",
								right: "1em",
							},
							labelPos: "center center",
						},

						mobile_pos: {
							margin_value: {
								top: "0",
								left: "0",
								bottom: "0",
								right: "0",
							},
							padding_value: {
								top: "0.5em",
								left: "0em",
								bottom: "0.5em",
								right: "0em",
							},
							labelPos: "center center",
						},
						className: "itmar_select_month",
					},
				],
				[
					"itmar/design-button",
					{
						linkKind: "none",
						displayType: "pseudo",
						pseudoInfo: { element: "Arrow", option: "right" },
						default_pos: {
							width: "2.5em",
							height: "2.5em",
							margin_value: {
								top: "10px",
								left: "10px",
								bottom: "10px",
								right: "10px",
							},
							padding_value: {
								top: "10px",
								left: "10px",
								bottom: "10px",
								right: "10px",
							},
						},
						mobile_pos: {
							width: "2em",
							height: "2em",
							margin_value: {
								top: "10px",
								left: "0",
								bottom: "10px",
								right: "0",
							},
							padding_value: {
								top: "10px",
								left: "10px",
								bottom: "10px",
								right: "10px",
							},
						},
						radius_value: { value: "50%" },
						className: "itmar_next_month",
					},
				],
			],
		],
	];
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			template: TEMPLATE,
			templateLock: "all",
		},
	);

	//属性変更関数を取得
	const { updateBlockAttributes } = useDispatch("core/block-editor");

	//エディタ内ブロックの取得
	const { innerBlocks } = useSelect(
		(select) => ({
			innerBlocks: select("core/block-editor").getBlocks(clientId),
		}),
		[],
	);
	//インナーブロックを平坦化
	const innerFlattenedBlocks = useMemo(() => {
		return flattenBlocks(innerBlocks);
	}, [innerBlocks]);

	//インナーブロック内のDesign Select
	const selectMonthBlock = useMemo(() => {
		return innerFlattenedBlocks.find(
			(block) => block.name === "itmar/design-select",
		);
	}, [innerBlocks]);
	//インナーブロック内のDesign Button（前）
	const prevButtonBlock = useMemo(() => {
		return innerFlattenedBlocks.find(
			(block) =>
				block.attributes.className &&
				block.attributes.className?.split(" ").includes("itmar_prev_month"),
		);
	}, [innerBlocks]);
	//インナーブロック内のDesign Button（後）
	const nextButtonBlock = useMemo(() => {
		return innerFlattenedBlocks.find(
			(block) =>
				block.attributes.className &&
				block.attributes.className?.split(" ").includes("itmar_next_month"),
		);
	}, [innerBlocks]);
	//カレンダーの表示月の更新
	useEffect(() => {
		if (selectMonthBlock) {
			const selectMonthAttr = selectMonthBlock.attributes;
			const selectMonth = selectMonthAttr.selectValues.find(
				(item) => item.id === selectMonthAttr.selectedValues[0],
			);
			if (selectMonth) {
				setAttributes({ selectedMonth: selectMonth.label });
			} else {
				//初期値を設定
				const selectItem = selectMonthAttr.selectValues.find(
					(item) => item.value === selectedMonth,
				);
				if (selectItem) {
					updateBlockAttributes(selectMonthBlock.clientId, {
						selectedValues: [selectItem.id],
					});
				}
			}
		}
	}, [selectMonthBlock]);

	//CalenderAPIキーの一時保存
	const [calenderApiVal, setCalenderApiVal] = useState("");

	//前後ボタンによる表示月の更新

	useEffect(() => {
		if (prevButtonBlock && nextButtonBlock && selectMonthBlock) {
			const selectMonthAttr = selectMonthBlock.attributes;
			const selectIndex = selectMonthAttr.selectValues.findIndex(
				(item) => item.value === selectedMonth,
			);

			if (prevButtonBlock.attributes.isClick) {
				//ボタンのクリックフラグを元に戻す
				updateBlockAttributes(prevButtonBlock.clientId, {
					isClick: false,
				});
				//選択されている月の前のインデックス
				const newIndex = selectIndex - 1 > 0 ? selectIndex - 1 : 0;
				//セレクトボックスの更新
				const newId = selectMonthAttr.selectValues[newIndex].id;
				updateBlockAttributes(selectMonthBlock.clientId, {
					selectedValues: [newId],
				});
				//カレンダーの更新
				const newValue = selectMonthAttr.selectValues[newIndex].id;
				setAttributes({ selectedMonth: newValue });
			}
			if (nextButtonBlock.attributes.isClick) {
				//ボタンのクリックフラグを元に戻す
				updateBlockAttributes(nextButtonBlock.clientId, {
					isClick: false,
				});
				//選択されている月の次のインデックス
				const newIndex =
					selectIndex + 1 < selectMonthAttr.selectValues.length
						? selectIndex + 1
						: selectIndex;
				//セレクトボックスの更新
				const newId = selectMonthAttr.selectValues[newIndex].id;
				updateBlockAttributes(selectMonthBlock.clientId, {
					selectedValues: [newId],
				});
				//カレンダーの更新
				const newValue = selectMonthAttr.selectValues[newIndex].id;
				setAttributes({ selectedMonth: newValue });
			}
		}
	}, [prevButtonBlock, nextButtonBlock]);

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
	}, [baseColor, labelBaseColor, weekBaseColor, bgColor_select]);

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);

	//選択された月の変更による書き換え
	useEffect(() => {
		if (selectedMonth) {
			if (isHoliday && calenderApiKey) {
				//祝日フラグとAPIキーに入力があること
				//祝日の表示処理
				JapaneseHolidays(calenderApiKey, selectedMonth)
					.then((data) => {
						// ここで祝日データを使用する処理を行う
						const newDateValues = generateMonthCalendar(selectedMonth, data);
						setAttributes({ dateValues: newDateValues });
					})
					.catch((error) => {
						console.error("エラーが発生しました:", error);
						const errorMess = __(
							"Failed to get holiday data.",
							"block-collections",
						);

						dispatch("core/notices").createNotice(
							"error",
							`${errorMess}\n${error.error.message}`,
							{
								type: "snackbar",
								isDismissible: true,
							},
						);
					});
			} else {
				const newDateValues = generateMonthCalendar(selectedMonth);
				setAttributes({ dateValues: newDateValues });
			}
		}
	}, [selectedMonth, isHoliday, calenderApiKey]);

	const renderContent = () => {
		return (
			<div ref={blockRef} className="itmar_date_area">
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
							: item.holiday
							? "holiday"
							: "";
					const dispSpan = item.holiday ? (
						<StyleTooltips attributes={tooltip_style} tooltip={item.holiday}>
							{String(item.date)}
						</StyleTooltips>
					) : (
						<span>{String(item.date)}</span>
					);

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

							{dispSpan}
						</label>
					);
				})}
				{isReleaseButton && (
					<label
						ref={labelRef}
						className="itmar_radio"
						style={{ gridArea: "day_clear" }}
					>
						<button
							onClick={() => {
								setAttributes({ selectedValue: 0 });
							}}
						>
							{__("Clear", "block-collections")}
						</button>
					</label>
				)}
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
					<ToggleControl
						label={__("Is Select Release Button", "block-collections")}
						checked={isReleaseButton}
						onChange={(newVal) => {
							setAttributes({ isReleaseButton: newVal });
						}}
					/>
					<ToggleControl
						label={__("Is Holiday Display", "block-collections")}
						checked={isHoliday}
						onChange={(newVal) => {
							setAttributes({ isHoliday: newVal });
						}}
					/>
					{isHoliday && (
						<TextControl
							label={__("Google Calender API KEY", "block-collections")}
							value={calenderApiVal}
							onChange={(newVal) => setCalenderApiVal(newVal)}
							onBlur={() => {
								setAttributes({ calenderApiKey: calenderApiVal }); //フォーカスが離れてから記録
							}}
							help={helpTextCode}
						/>
					)}
				</PanelBody>
				<PeriodCtrl
					startYear={2010}
					endYear={2030}
					dateSpan={dateSpan}
					isMonth={true}
					onChange={(newObj) => setAttributes(newObj)}
				/>
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
				<ToolTips
					attributes={tooltip_style}
					isMobile={isMobile}
					onChange={(newValue) => {
						setAttributes({ tooltip_style: newValue });
					}}
				/>
			</InspectorControls>

			<div {...blockProps}>
				<StyleComp attributes={attributes}>
					<div {...innerBlocksProps}></div>
					{renderContent()}
				</StyleComp>
			</div>
		</>
	);
}
