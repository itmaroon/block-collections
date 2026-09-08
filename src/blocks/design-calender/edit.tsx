import { __ } from "@wordpress/i18n";
import { createCalendarStyleCss } from "./StyleCalender";

import ToolTips from "../ToolTips";
import { createTooltipStyleCss } from "../StyleTooltips";

import {
	useElementBackgroundColor,
	useIsIframeMobile,
	ShadowStyle,
	ShadowElm,
	TypographyControls,
	generateDateArray,
	generateMonthCalendar,
	//JapaneseHolidays,
	PeriodCtrl,
	flattenBlocks,
} from "itmar-block-packages";

import {
	PanelBody,
	TextControl,
	ToggleControl,
	RadioControl,
	BoxControl,
	BorderBoxControl,
	Notice,
} from "@wordpress/components";
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalBorderRadiusControl as BorderRadiusControl,
} from "@wordpress/block-editor";

import {
	useState,
	useEffect,
	useRef,
	useMemo,
	createElement,
} from "@wordpress/element";
import { useSelect, useDispatch, dispatch } from "@wordpress/data";
import type { BlockInstance } from "@wordpress/blocks";
import type {
	CalendarEditProps,
	CalendarSelectItem,
	CalendarPosition,
	BoxValues,
} from "./types";
import type { TooltipAttributes } from "../../shared/types";

import { toStyleRecord } from "../front-common";
import {
	fetchJapaneseHolidays,
	saveCalendarApiKey,
} from "./holiday-api";

import "./editor.scss";

type ShadowState = Parameters<typeof ShadowElm>[0];

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

type InnerBlocksTemplate = NonNullable<
	NonNullable<Parameters<typeof useInnerBlocksProps>[1]>["template"]
>;

export default function Edit({
	attributes,
	setAttributes,
	clientId,
}: CalendarEditProps) {
	const {
		inputName,
		isReleaseButton,
		isDateArea,
		bgColor,
		selectedValue,
		dateValues,
		weekTop,
		isHoliday,
		calendarApiMask,
		dateSpan: savedDateSpan,
		selectedMonth: savedSelectedMonth,
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
	} = attributes;

	const initialCalendarValues = useMemo(() => {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1;
		return {
			dateSpan: {
				startYear: year - 3,
				startMonth: month,
				endYear: year + 1,
				endMonth: month,
			},
			selectedMonth: `${year}/${String(month).padStart(2, "0")}`,
		};
	}, []);

	const dateSpan = savedDateSpan ?? initialCalendarValues.dateSpan;
	const selectedMonth = savedSelectedMonth ?? initialCalendarValues.selectedMonth;

	useEffect(() => {
		const initialAttributes: Partial<CalendarAttributes> = {};
		if (!savedDateSpan) {
			initialAttributes.dateSpan = initialCalendarValues.dateSpan;
		}
		if (!savedSelectedMonth) {
			initialAttributes.selectedMonth = initialCalendarValues.selectedMonth;
		}
		if (Object.keys(initialAttributes).length > 0) {
			setAttributes(initialAttributes);
		}
	}, [
		savedDateSpan,
		savedSelectedMonth,
		initialCalendarValues,
		setAttributes,
	]);

	//モバイルの判定
	const isMobile = useIsIframeMobile();

	//ブロックの参照
	const blockRef = useRef<HTMLDivElement | null>(null);
	const editorStyleClass = `itmar-calendar-editor-${clientId.replace(
		/[^a-zA-Z0-9_-]/g,
		"",
	)}`;
	const editorScope = `.${editorStyleClass}`;
	const editorStyleCss = `${createCalendarStyleCss(attributes, editorScope)}
		${createTooltipStyleCss(
			tooltip_style,
			`${editorScope} [data-tooltip]`,
		)}`;
	const blockProps = useBlockProps({
		style: { width: "100%" },
	});

	//インナーブロックのひな型を用意
	const TEMPLATE: InnerBlocksTemplate = [
		//同一ブロックを２つ以上入れないこと（名称の文字列が重ならないこと）
		[
			"itmar/design-group",
			{
				default_val: {
					direction: "horizen",
					reverse: false,
					wrap: false,
					inner_align: "flex-start",
					outer_align: "center",
					outer_vertical: "center",
					width_val: "full",
					max_width: "full",
					free_width: "400px",
					max_free_width: "100%",
					height_val: "fit",
					free_height: "300px",
					posValue: {
						vertBase: "top",
						horBase: "left",
						vertValue: "3em",
						horValue: "3em",
						isVertCenter: false,
						isHorCenter: false,
					},
					margin: {
						top: "0px",
						left: "0px",
						bottom: "0px",
						right: "0px",
					},
					padding: {
						top: "0px",
						left: "0px",
						bottom: "0px",
						right: "0px",
					},
					padding_content: {
						top: "0px",
						left: "0px",
						bottom: "0px",
						right: "0px",
					},
					grid_info: {
						gridElms: [],
						rowNum: 2,
						colNum: 2,
						rowGap: "5px",
						colGap: "5px",
						rowUnit: [],
						colUnit: [],
					},
				},
				mobile_val: {
					direction: "vertical",
					reverse: false,
					wrap: false,
					inner_align: "flex-start",
					outer_align: "center",
					outer_vertical: "center",
					width_val: "full",
					max_width: "100%",
					free_width: "200px",
					max_free_width: "100%",
					height_val: "fit",
					free_height: "300px",
					posValue: {
						vertBase: "top",
						horBase: "left",
						vertValue: "2em",
						horValue: "1em",
						isVertCenter: false,
						isHorCenter: false,
					},
					margin: {
						top: "0px",
						left: "0px",
						bottom: "0px",
						right: "0px",
					},
					padding: {
						top: "0px",
						left: "0px",
						bottom: "0px",
						right: "0px",
					},
					padding_content: {
						top: "20px",
						left: "10px",
						bottom: "20px",
						right: "10px",
					},
					grid_info: {
						gridElms: [],
						rowNum: 2,
						colNum: 2,
						rowGap: "5px",
						colGap: "5px",
					},
				},
			},
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
			templateLock: false,
		},
	);

	//属性変更関数を取得
	const { updateBlockAttributes } = useDispatch("core/block-editor");

	//エディタ内ブロックの取得
	const { innerBlocks } = useSelect(
		(select) => {
			const blockEditorSelectors = select("core/block-editor") as unknown as {
				getBlocks: (rootClientId?: string) => BlockInstance[];
			};

			return {
				innerBlocks: blockEditorSelectors.getBlocks(clientId),
			};
		},
		[clientId],
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

	//カレンダーの表示月範囲の更新
	useEffect(() => {
		if (!selectMonthBlock?.clientId) return;
		//選択可能期間取得
		const periodArray = generateDateArray(dateSpan, true);
		//取得した期間に変化がないときは処理しない
		const currentValues = selectMonthBlock.attributes?.selectValues ?? [];
		if (JSON.stringify(currentValues) === JSON.stringify(periodArray)) {
			return;
		}

		updateBlockAttributes(selectMonthBlock?.clientId, {
			selectValues: periodArray,
		});
	}, [dateSpan, selectMonthBlock?.clientId]);

	//カレンダーの表示月の更新
	useEffect(() => {
		if (selectMonthBlock) {
			const selectMonthAttr = selectMonthBlock.attributes;

			const selectMonth = selectMonthAttr.selectValues.find(
				(item: CalendarSelectItem) =>
					item.id === selectMonthAttr.selectedValues[0],
			);

			if (selectMonth) {
				setAttributes({ selectedMonth: selectMonth.label });
			} else {
				//初期値を設定
				const selectItem = selectMonthAttr.selectValues.find(
					(item: CalendarSelectItem) => item.value === selectedMonth,
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
	const initiallyConfigured = Boolean(itmar_calendar_option.apiConfigured);
	const [calendar_key_editing, setCalendarApiVal] = useState<string>(
		initiallyConfigured ? (calendarApiMask ?? "**********") : "",
	);
	//wp_optionに保存するための変数
	const [calendarKey, setCalendarKey] = useState("");
	const [calendarApiState, setCalendarApiState] = useState<
		"ready" | "missing" | "saving" | "error"
	>(initiallyConfigured ? "ready" : "missing");
	const [calendarApiMessage, setCalendarApiMessage] = useState(
		initiallyConfigured
			? ""
			: __(
					"Google Calendar API key is not configured. Holidays cannot be displayed until a key is saved.",
					"block-collections",
				),
	);
	//キーがあればサーバーに格納
	useEffect(() => {
		// 内部で async 関数を定義
		const saveKey = async () => {
			if (!calendarKey) return;
			setCalendarApiState("saving");
			setCalendarApiMessage(
				__("Saving the Google Calendar API key…", "block-collections"),
			);
			try {
				await saveCalendarApiKey(calendarKey);
				setAttributes({ calendarApiMask: "**********" });
				setCalendarApiVal("**********");
				setCalendarApiState("ready");
				setCalendarApiMessage("");
			} catch (err) {
				setCalendarApiState("error");
				setCalendarApiMessage(
					err instanceof Error
						? err.message
						: __("The API key could not be saved.", "block-collections"),
				);
			}
		};

		saveKey(); // 実行
	}, [calendarKey]);

	//前後ボタンによる表示月の更新
	useEffect(() => {
		if (prevButtonBlock && nextButtonBlock && selectMonthBlock) {
			const selectMonthAttr = selectMonthBlock.attributes;
			const selectIndex = selectMonthAttr.selectValues.findIndex(
				(item: CalendarSelectItem) => item.value === selectedMonth,
			);

			if (prevButtonBlock.attributes.isClick) {
				//選択されている月の前のインデックス
				const newIndex = selectIndex - 1 > 0 ? selectIndex - 1 : 0;
				//セレクトボックスの更新
				const newId = selectMonthAttr.selectValues[newIndex].id;
				updateBlockAttributes(selectMonthBlock.clientId, {
					selectedValues: [newId],
				});
				//カレンダーの更新
				const newValue = selectMonthAttr.selectValues[newIndex].value;
				setAttributes({ selectedMonth: newValue });
				//ボタンのクリックフラグを元に戻す
				updateBlockAttributes(prevButtonBlock.clientId, {
					isClick: false,
				});
			}
			if (nextButtonBlock.attributes.isClick) {
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
				const newValue = selectMonthAttr.selectValues[newIndex].value;
				setAttributes({ selectedMonth: newValue });
				//ボタンのクリックフラグを元に戻す
				updateBlockAttributes(nextButtonBlock.clientId, {
					isClick: false,
				});
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
			const new_shadow = ShadowElm({
				...(shadow_box as ShadowState),
				baseColor: baseColor,
			});
			if (new_shadow) {
				setAttributes({ shadow_result_box: toStyleRecord(new_shadow.style) });
			}
		}
		if (labelBaseColor) {
			setAttributes({
				shadow_input: { ...shadow_input, baseColor: labelBaseColor },
			});
			const new_shadow = ShadowElm({
				...(shadow_input as ShadowState),
				baseColor: labelBaseColor,
			});
			if (new_shadow) {
				setAttributes({ shadow_result_input: toStyleRecord(new_shadow.style) });
			}
		}

		if (weekBaseColor) {
			setAttributes({
				shadow_week: { ...shadow_week, baseColor: weekBaseColor },
			});
			const new_shadow = ShadowElm({
				...(shadow_week as ShadowState),
				baseColor: weekBaseColor,
			});
			if (new_shadow) {
				setAttributes({ shadow_result_week: toStyleRecord(new_shadow.style) });
			}
		}

		if (bgColor_select) {
			setAttributes({
				shadow_select: { ...shadow_select, baseColor: bgColor_select },
			});
			const new_shadow = ShadowElm({
				...(shadow_select as ShadowState),
				baseColor: bgColor_select,
			});
			if (new_shadow) {
				setAttributes({
					shadow_result_select: toStyleRecord(new_shadow.style),
				});
			}
		}
	}, [baseColor, labelBaseColor, weekBaseColor, bgColor_select]);

	//選択された月の変更による書き換え
	useEffect(() => {
		if (selectedMonth) {
			if (isHoliday && calendarApiState === "ready") {
				//祝日の処理
				const get_holiday_info = async () => {
					try {
						const holidayList = await fetchJapaneseHolidays(selectedMonth);
						const newDateValues = generateMonthCalendar(
							selectedMonth,
							holidayList,
						);
						setAttributes({ dateValues: newDateValues });
					} catch (err) {
						setCalendarApiState("error");
						setCalendarApiMessage(
							err instanceof Error
								? err.message
								: __(
										"Holiday information could not be retrieved.",
										"block-collections",
									),
						);
						setAttributes({
							dateValues: generateMonthCalendar(selectedMonth),
						});
					}
				};
				get_holiday_info();
			} else {
				const newDateValues = generateMonthCalendar(selectedMonth);
				setAttributes({ dateValues: newDateValues });
			}
		}
	}, [selectedMonth, isHoliday, calendarApiState]);

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
							: item.holiday
							? "holiday"
							: item.weekday === 6
							? "saturday"
							: "";
					const dispSpan = item.holiday ? (
						<span data-tooltip={item.holiday}>{String(item.date)}</span>
					) : (
						<span>{String(item.date)}</span>
					);

					return (
						<label
							ref={labelRef}
							key={item.id ?? item.date}
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
	const handleResponsive = (
		property: keyof CalendarPosition,
		value: Partial<BoxValues>,
	) => {
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

	//今日の日付
	const today = new Date();

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
						label={__("Is display date area", "block-collections")}
						checked={isDateArea}
						onChange={(newVal) => {
							setAttributes({ isDateArea: newVal });
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
						<>
							{calendarApiState !== "ready" && (
								<Notice
									status={calendarApiState === "error" ? "error" : "warning"}
									isDismissible={false}
								>
									{calendarApiMessage}
								</Notice>
							)}
							<TextControl
								label={__("Google Calendar API KEY", "block-collections")}
								value={calendar_key_editing}
								onFocus={() => {
									if (calendar_key_editing === "**********") {
										setCalendarApiVal("");
									}
								}}
								onChange={(newVal) => setCalendarApiVal(newVal)}
								onBlur={() => {
									const newKey = calendar_key_editing.trim();
									if (newKey && newKey !== "**********") {
										setCalendarKey(newKey);
									}
								}}
								help={helpTextCode}
							/>
						</>
					)}
				</PanelBody>
				<PeriodCtrl
					startYear={2000}
					endYear={today.getFullYear() + 3}
					dateSpan={dateSpan}
					isMonth={true}
					onChange={(newObj) => {
						setAttributes(newObj);
					}}
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
								onColorChange: (newValue: string | undefined) =>
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
							onChange={(newBrVal: string | { value: string } | undefined) =>
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
							shadowStyle={shadow_box as ShadowState}
							onChange={(newStyle, newState) => {
								setAttributes({
									shadow_result_box: toStyleRecord(newStyle.style),
								});
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
								onColorChange: (newValue: string | undefined) =>
									setAttributes({ inputColor: newValue }),
							},
							{
								colorValue: inputBgColor,
								label: __("Choose Input Background color", "block-collections"),
								onColorChange: (newValue: string | undefined) =>
									setAttributes({ inputBgColor: newValue }),
							},
							{
								colorValue: holidayColor,
								label: __("Choose Holiday color", "block-collections"),
								onColorChange: (newValue: string | undefined) =>
									setAttributes({ holidayColor: newValue }),
							},
							{
								colorValue: holidayBgColor,
								label: __(
									"Choose Horiday Background color",
									"block-collections",
								),
								onColorChange: (newValue: string | undefined) =>
									setAttributes({ holidayBgColor: newValue }),
							},
							{
								colorValue: staturdayColor,
								label: __("Choose Saturday color", "block-collections"),
								onColorChange: (newValue: string | undefined) =>
									setAttributes({ staturdayColor: newValue }),
							},
							{
								colorValue: saturdayBgColor,
								label: __(
									"Choose Saturday Background color",
									"block-collections",
								),
								onColorChange: (newValue: string | undefined) =>
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
									onColorChange: (newValue: string | undefined) =>
										setAttributes({ color_select: newValue }),
								},
								{
									colorValue: bgColor_select,
									gradientValue: bgGradient_select,
									label: __(
										"Choose Selected Button color",
										"block-collections",
									),

									onColorChange: (newValue: string | undefined) => {
										setAttributes({
											bgColor_select: newValue === undefined ? "" : newValue,
										});
									},
									onGradientChange: (newValue: string | undefined) => {
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
								shadowStyle={shadow_select as ShadowState}
								onChange={(newStyle, newState) => {
									setAttributes({
										shadow_result_select: toStyleRecord(newStyle.style),
									});
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
							onChange={(newBrVal: string | { value: string } | undefined) =>
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
							shadowStyle={shadow_input as ShadowState}
							onChange={(newStyle, newState) => {
								setAttributes({
									shadow_result_input: toStyleRecord(newStyle.style),
								});
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
								onColorChange: (newValue: string | undefined) =>
									setAttributes({ weekLabelColor: newValue }),
							},
							{
								colorValue: weekLabelBgColor,
								label: __("Choose Label Background color", "block-collections"),
								onColorChange: (newValue: string | undefined) =>
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
							onChange={(newBrVal: string | { value: string } | undefined) =>
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
							shadowStyle={shadow_week as ShadowState}
							onChange={(newStyle, newState) => {
								setAttributes({
									shadow_result_week: toStyleRecord(newStyle.style),
								});
								setAttributes({ shadow_week: newState });
							}}
						/>
					)}
				</PanelBody>
				<ToolTips
					attributes={tooltip_style}
					isMobile={isMobile}
					onChange={(newValue: TooltipAttributes) => {
						setAttributes({ tooltip_style: newValue });
					}}
				/>
			</InspectorControls>

			<div {...blockProps}>
				{isHoliday && calendarApiState !== "ready" && (
					<Notice
						status={calendarApiState === "error" ? "error" : "warning"}
						isDismissible={false}
					>
						{calendarApiMessage}
					</Notice>
				)}
				<div className={`itmar-wrap ${editorStyleClass}`}>
					<style>{editorStyleCss}</style>
					<div {...innerBlocksProps}></div>
					{isDateArea && renderContent()}
				</div>
			</div>
		</>
	);
}
