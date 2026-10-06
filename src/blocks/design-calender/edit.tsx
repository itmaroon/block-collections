import { __ } from "@wordpress/i18n";
import { createCalendarStyleCss } from "./StyleCalender";

import ToolTips from "../ToolTips";
import { createTooltipStyleCss } from "../tooltipCss";

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
	SelectControl,
	__experimentalConfirmDialog as ConfirmDialog,
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
import {
	useSelect,
	useDispatch,
	dispatch,
	select as dataSelect,
} from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";
import type { BlockInstance } from "@wordpress/blocks";
import type {
	CalendarEditProps,
	CalendarSelectItem,
	CalendarPosition,
	BoxValues,
	MonthNavStyle,
} from "./types";
import {
	buildMonthList,
	buildMonthDialogHtml,
	formatMonthPart,
	YEAR_LABEL_FORMATS,
	MONTH_LABEL_FORMATS,
} from "./months";
import type { TooltipAttributes } from "../../shared/types";

import { toStyleRecord } from "../front-common";
import {
	fetchCalendarKeyStatus,
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

const NAV_GROUP_DEFAULT_VAL = {
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
};

const NAV_GROUP_MOBILE_VAL = {
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
};

/** 月の切り替えに置く design-select の初期属性 */
const SELECT_BLOCK_ATTRS = {
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
};

/** ダイアログの年の文字を調整するときの出発点（未設定のときの見た目と同じ大きさ） */
const DEFAULT_DIALOG_FONT = {
	default_fontSize: "1.4em",
	mobile_fontSize: "1.4em",
	fontFamily: "inherit",
	fontWeight: "600",
	isItalic: false,
};

/** 年と月の表示をまとめる design-group。クリックで年月を選ぶダイアログを開く */
const MONTH_PICKER_GROUP_ATTRS = {
	className: "itmar_month_picker",
	default_val: {
		...NAV_GROUP_DEFAULT_VAL,
		width_val: "fit",
		inner_align: "center",
		outer_align: "center",
	},
	mobile_val: {
		...NAV_GROUP_MOBILE_VAL,
		direction: "horizen",
		width_val: "fit",
		inner_align: "center",
		outer_align: "center",
	},
};

/** 年・月の表示に使う design-title の属性。文字は月が変わるたびに書き換える */
const monthLabelAttrs = (className: string, text: string) => ({
	className,
	headingType: "H3",
	titleType: "plaine",
	headingContent: text,
	default_val: {
		width: "fit-content",
		padding_heading: { top: "0", left: "0.15em", bottom: "0", right: "0.15em" },
	},
	mobile_val: {
		width: "fit-content",
		padding_heading: { top: "0", left: "0.15em", bottom: "0", right: "0.15em" },
	},
});

/** 年月の表示ブロック一式（design-group の中に design-title を2つ）を作る */
const createMonthPickerBlock = (
	selectedMonth: string,
	yearFormat: string,
	monthFormat: string,
) =>
	createBlock("itmar/design-group", MONTH_PICKER_GROUP_ATTRS, [
		createBlock(
			"itmar/design-title",
			monthLabelAttrs(
				"itmar_year_label",
				formatMonthPart(selectedMonth, yearFormat),
			),
		),
		createBlock(
			"itmar/design-title",
			monthLabelAttrs(
				"itmar_month_label",
				formatMonthPart(selectedMonth, monthFormat),
			),
		),
	]);

const hasClassName = (block: BlockInstance | undefined, name: string) =>
	Boolean(
		typeof block?.attributes?.className === "string" &&
			block.attributes.className.split(/\s+/).includes(name),
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
		monthNavStyle,
		yearLabelFormat,
		monthLabelFormat,
		dialogBgColor,
		dialogColor,
		radius_dialog,
		border_dialog,
		is_shadow_dialog,
		shadow_dialog,
		font_style_dialog,
		dialogBackdropColor,
		dialogSelectedColor,
		dialogSelectedBgColor,
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
		[
			"itmar/design-group",
			{
				default_val: NAV_GROUP_DEFAULT_VAL,
				mobile_val: NAV_GROUP_MOBILE_VAL,
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
					SELECT_BLOCK_ATTRS,
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
	const { updateBlockAttributes, replaceBlock, insertBlock } =
		useDispatch("core/block-editor");

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
	}, [innerFlattenedBlocks]);

	//年月の表示（ダイアログ方式）。同じ種類のブロックが複数あるので、クラス名で見分ける
	const monthPickerBlock = useMemo(
		() =>
			innerFlattenedBlocks.find(
				(block) =>
					block.name === "itmar/design-group" &&
					hasClassName(block, "itmar_month_picker"),
			),
		[innerFlattenedBlocks],
	);
	const yearLabelBlock = useMemo(
		() =>
			innerFlattenedBlocks.find(
				(block) =>
					block.name === "itmar/design-title" &&
					hasClassName(block, "itmar_year_label"),
			),
		[innerFlattenedBlocks],
	);
	const monthLabelBlock = useMemo(
		() =>
			innerFlattenedBlocks.find(
				(block) =>
					block.name === "itmar/design-title" &&
					hasClassName(block, "itmar_month_label"),
			),
		[innerFlattenedBlocks],
	);

	const calendarButtonBlocks = useMemo(() => {
		return innerFlattenedBlocks.filter(
			(block) => block.name === "itmar/design-button",
		);
	}, [innerFlattenedBlocks]);

	//インナーブロック内のDesign Button（前）
	const prevButtonBlock = useMemo(() => {
		return (
			calendarButtonBlocks.find((block) =>
				block.attributes.className
					?.split(/\s+/)
					.includes("itmar_prev_month"),
			) ?? calendarButtonBlocks[0]
		);
	}, [calendarButtonBlocks]);

	//インナーブロック内のDesign Button（後）
	const nextButtonBlock = useMemo(() => {
		return (
			calendarButtonBlocks.find((block) =>
				block.attributes.className
					?.split(/\s+/)
					.includes("itmar_next_month"),
			) ??
			(calendarButtonBlocks.length > 1
				? calendarButtonBlocks[calendarButtonBlocks.length - 1]
				: undefined)
		);
	}, [calendarButtonBlocks]);

	//旧コンテンツで欠落した操作用クラスを属性へ戻し、次回保存後も維持する
	useEffect(() => {
		const ensureBlockClass = (
			block: BlockInstance | undefined,
			requiredClass: string,
		) => {
			if (!block?.clientId) return;

			const currentClassName =
				typeof block.attributes.className === "string"
					? block.attributes.className
					: "";
			const classNames = currentClassName.split(/\s+/).filter(Boolean);
			if (classNames.includes(requiredClass)) return;

			updateBlockAttributes(block.clientId, {
				className: [...classNames, requiredClass].join(" "),
			});
		};

		ensureBlockClass(prevButtonBlock, "itmar_prev_month");
		ensureBlockClass(selectMonthBlock, "itmar_select_month");
		ensureBlockClass(nextButtonBlock, "itmar_next_month");
	}, [
		prevButtonBlock,
		selectMonthBlock,
		nextButtonBlock,
		updateBlockAttributes,
	]);

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
		initiallyConfigured ? "**********" : "",
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
	/*
	 * 保存済みかどうかをサーバーに確かめる。
	 * 埋め込みのフラグはページ読み込み時の値なので、保存後に開き直したときに
	 * 「未設定」と出てしまうことがあった。
	 */
	useEffect(() => {
		let alive = true;
		(async () => {
			try {
				const configured = await fetchCalendarKeyStatus();
				if (!alive) return;
				if (configured) {
					setCalendarApiVal("**********");
					setCalendarApiState("ready");
					setCalendarApiMessage("");
				} else if (!initiallyConfigured) {
					setCalendarApiState("missing");
				}
			} catch {
				// 確認できないときは埋め込みのフラグのままにする
			}
		})();
		return () => {
			alive = false;
		};
	}, [initiallyConfigured]);

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
		//ダイアログ方式は design-select を持たない。dateSpan から作った月の一覧で前後へ動かす
		if (monthNavStyle === "dialog" && !selectMonthBlock) {
			const months = buildMonthList(dateSpan);
			const current = months.findIndex((item) => item.value === selectedMonth);
			const move = (button: BlockInstance | undefined, step: number) => {
				if (!button?.attributes.isClick) return;
				const target =
					months[Math.min(Math.max(current + step, 0), months.length - 1)];
				if (target) {
					setAttributes({ selectedMonth: target.value });
				}
				//ボタンのクリックフラグを元に戻す
				updateBlockAttributes(button.clientId, { isClick: false });
			};
			move(prevButtonBlock, -1);
			move(nextButtonBlock, 1);
			return;
		}
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

	//年月の表示（design-title）の文字を、選択中の月に合わせて書き換える
	useEffect(() => {
		if (monthNavStyle !== "dialog" || !selectedMonth) return;
		const sync = (block: BlockInstance | undefined, dateFormat: string) => {
			if (!block) return;
			const text = formatMonthPart(selectedMonth, dateFormat);
			if (block.attributes.headingContent !== text) {
				updateBlockAttributes(block.clientId, { headingContent: text });
			}
		};
		sync(yearLabelBlock, yearLabelFormat);
		sync(monthLabelBlock, monthLabelFormat);
	}, [
		monthNavStyle,
		selectedMonth,
		yearLabelFormat,
		monthLabelFormat,
		yearLabelBlock,
		monthLabelBlock,
	]);

	//年・月のタイトルをまとめるグループから itmar_month_picker のクラスが外れているとき、
	//年と月のタイトルの共通の親グループへ付け直す（このクラスがダイアログを開く目印）
	useEffect(() => {
		if (
			monthNavStyle !== "dialog" ||
			monthPickerBlock ||
			!yearLabelBlock ||
			!monthLabelBlock
		) {
			return;
		}
		const store = dataSelect("core/block-editor") as unknown as {
			getBlockParents: (clientId: string) => string[];
			getBlock: (clientId: string) => BlockInstance | null;
		};
		const yearParents = store.getBlockParents(yearLabelBlock.clientId);
		const monthParents = store.getBlockParents(monthLabelBlock.clientId);
		//親は外側から順に並んでいるので、後ろから探して、最も内側の共通の親を取る
		const commonId = [...yearParents]
			.reverse()
			.find((id) => monthParents.includes(id));
		if (!commonId) return;
		const group = store.getBlock(commonId);
		if (group?.name !== "itmar/design-group") return;
		const classNames =
			typeof group.attributes.className === "string"
				? group.attributes.className.split(/\s+/).filter(Boolean)
				: [];
		updateBlockAttributes(commonId, {
			className: [...classNames, "itmar_month_picker"].join(" "),
		});
	}, [
		monthNavStyle,
		monthPickerBlock,
		yearLabelBlock?.clientId,
		monthLabelBlock?.clientId,
	]);

	/* ------------------------------
	月の切り替えの作り（select / dialog）の切り替え
	前後のボタンはそのまま残し、真ん中の1つだけを入れ替える
	------------------------------ */
	const [pendingNavStyle, setPendingNavStyle] = useState<MonthNavStyle | null>(
		null,
	);
	const [isDialogPreview, setIsDialogPreview] = useState(false);

	//入れ替え先のブロックが見つからないとき、前後ボタンと同じグループの真ん中に差し込む
	const insertIntoNav = (block: BlockInstance) => {
		const root = prevButtonBlock
			? dataSelect("core/block-editor").getBlockRootClientId(
					prevButtonBlock.clientId,
			  )
			: null;
		insertBlock(block, 1, root || clientId);
	};

	const applyNavStyle = (style: MonthNavStyle) => {
		if (style === "dialog") {
			const block = createMonthPickerBlock(
				selectedMonth,
				yearLabelFormat,
				monthLabelFormat,
			);
			if (selectMonthBlock) {
				replaceBlock(selectMonthBlock.clientId, block);
			} else {
				insertIntoNav(block);
			}
		} else {
			const block = createBlock("itmar/design-select", SELECT_BLOCK_ATTRS);
			if (monthPickerBlock) {
				replaceBlock(monthPickerBlock.clientId, block);
			} else {
				insertIntoNav(block);
			}
		}
		setAttributes({ monthNavStyle: style });
		setIsDialogPreview(false);
	};

	//入れ替えるブロックに加えた調整は失われるので、確認してから切り替える
	const requestNavStyle = (style: MonthNavStyle) => {
		if (style === monthNavStyle) return;
		const target = style === "dialog" ? selectMonthBlock : monthPickerBlock;
		if (target) {
			setPendingNavStyle(style);
		} else {
			applyNavStyle(style);
		}
	};

	//ダイアログのプレビュー（実際は view.ts が開くので、エディターでは見た目の調整用に静的に出す）
	const dialogPreviewHtml = useMemo(
		() =>
			buildMonthDialogHtml({
				months: buildMonthList(dateSpan),
				selected: selectedMonth,
				year:
					Number(String(selectedMonth).split("/")[0]) ||
					new Date().getFullYear(),
				monthFormat: monthLabelFormat,
				yearFormat: yearLabelFormat,
			}),
		[dateSpan, selectedMonth, monthLabelFormat, yearLabelFormat],
	);

	//ダイアログの背景色が直接指定の色のとき、影の色をそれに合わせる（CSS変数の色は計算できないので触らない）
	useEffect(() => {
		if (!dialogBgColor || dialogBgColor.startsWith("var(")) return;
		setAttributes({
			shadow_dialog: { ...shadow_dialog, baseColor: dialogBgColor },
		});
		const new_shadow = ShadowElm({
			...(shadow_dialog as ShadowState),
			baseColor: dialogBgColor,
		});
		if (new_shadow) {
			setAttributes({ shadow_result_dialog: toStyleRecord(new_shadow.style) });
		}
	}, [dialogBgColor]);

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
				<PanelBody
					title={__("Month selector setting", "block-collections")}
					initialOpen={true}
					className="form_setteing_ctrl"
				>
					<div className="itmar_title_type">
						<RadioControl
							label={__("Month selector style", "block-collections")}
							selected={monthNavStyle}
							options={[
								{
									label: __("Select box", "block-collections"),
									value: "select",
								},
								{
									label: __("Dialog", "block-collections"),
									value: "dialog",
								},
							]}
							onChange={(newStyle) =>
								requestNavStyle(newStyle as MonthNavStyle)
							}
							help={__(
								"With the dialog style, clicking the year and month titles opens a dialog to choose the year and month.",
								"block-collections",
							)}
						/>
					</div>
					{monthNavStyle === "dialog" && (
						<>
							<SelectControl
								label={__("Year display format", "block-collections")}
								value={yearLabelFormat}
								options={YEAR_LABEL_FORMATS}
								onChange={(newVal) => setAttributes({ yearLabelFormat: newVal })}
							/>
							<SelectControl
								label={__("Month display format", "block-collections")}
								value={monthLabelFormat}
								options={MONTH_LABEL_FORMATS}
								onChange={(newVal) =>
									setAttributes({ monthLabelFormat: newVal })
								}
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

				{monthNavStyle === "dialog" && (
					<PanelBody
						title={__("Month dialog style settings", "block-collections")}
						initialOpen={false}
						className="check_design_ctrl"
					>
						<ToggleControl
							label={__("Preview the dialog", "block-collections")}
							checked={isDialogPreview}
							onChange={(newVal) => setIsDialogPreview(newVal)}
						/>
						<PanelColorGradientSettings
							title={__("Dialog Color Setting", "block-collections")}
							settings={[
								{
									colorValue: dialogColor,
									label: __("Choose Text color", "block-collections"),
									onColorChange: (newValue: string | undefined) =>
										setAttributes({ dialogColor: newValue }),
								},
								{
									colorValue: dialogBgColor,
									label: __("Choose Background color", "block-collections"),
									onColorChange: (newValue: string | undefined) =>
										setAttributes({ dialogBgColor: newValue }),
								},
								{
									colorValue: dialogBackdropColor,
									label: __(
										"Choose Backdrop color (behind the dialog)",
										"block-collections",
									),
									onColorChange: (newValue: string | undefined) =>
										setAttributes({ dialogBackdropColor: newValue }),
								},
								{
									colorValue: dialogSelectedColor,
									label: __(
										"Choose Selected Month Text color",
										"block-collections",
									),
									onColorChange: (newValue: string | undefined) =>
										setAttributes({ dialogSelectedColor: newValue }),
								},
								{
									colorValue: dialogSelectedBgColor,
									label: __(
										"Choose Selected Month Background color",
										"block-collections",
									),
									onColorChange: (newValue: string | undefined) =>
										setAttributes({ dialogSelectedBgColor: newValue }),
								},
							]}
							enableAlpha
						/>
						<TypographyControls
							title={__("Year Typography", "block-collections")}
							fontStyle={font_style_dialog ?? DEFAULT_DIALOG_FONT}
							isMobile={isMobile}
							onChange={(newStyle) => {
								setAttributes({ font_style_dialog: newStyle });
							}}
							initialOpen={false}
						/>
						<PanelBody
							title={__("Border Settings", "block-collections")}
							initialOpen={false}
							className="border_design_ctrl"
						>
							<BorderBoxControl
								onChange={(newValue) => setAttributes({ border_dialog: newValue })}
								value={border_dialog}
								allowReset={true} // リセットの可否
								resetValues={border_resetValues} // リセット時の値
							/>
							<BorderRadiusControl
								values={radius_dialog}
								onChange={(newBrVal: string | { value: string } | undefined) =>
									setAttributes({
										radius_dialog:
											typeof newBrVal === "string"
												? { value: newBrVal }
												: newBrVal,
									})
								}
							/>
						</PanelBody>
						<ToggleControl
							label={__("Is Shadow", "block-collections")}
							checked={is_shadow_dialog}
							onChange={(newVal) => {
								setAttributes({ is_shadow_dialog: newVal });
							}}
						/>
						{is_shadow_dialog && (
							<ShadowStyle
								shadowStyle={shadow_dialog as ShadowState}
								onChange={(newStyle, newState) => {
									setAttributes({
										shadow_result_dialog: toStyleRecord(newStyle.style),
									});
									setAttributes({ shadow_dialog: newState });
								}}
							/>
						)}
					</PanelBody>
				)}

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
					{monthNavStyle === "dialog" && isDialogPreview && (
						<div className="itmar_month_dialog_backdrop">
							<div
								className="itmar_month_dialog is-preview"
								dangerouslySetInnerHTML={{ __html: dialogPreviewHtml }}
							/>
						</div>
					)}
					{isDateArea && renderContent()}
				</div>
				{pendingNavStyle && (
					<ConfirmDialog
						onConfirm={() => {
							applyNavStyle(pendingNavStyle);
							setPendingNavStyle(null);
						}}
						onCancel={() => setPendingNavStyle(null)}
					>
						{__(
							"Switching the month selector replaces the current month control. Any design changes made to it will be lost. Continue?",
							"block-collections",
						)}
					</ConfirmDialog>
				)}
			</div>
		</>
	);
}
