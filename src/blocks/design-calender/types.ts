import type { FontStyle, TooltipAttributes } from "../../shared/types";

export interface BoxValues {
	top: string;
	left: string;
	right: string;
	bottom: string;
}

export interface CalendarPosition {
	margin: BoxValues;
	padding: BoxValues;
	margin_input: BoxValues;
	padding_input: BoxValues;
	margin_week: BoxValues;
	padding_week: BoxValues;
}

export interface RadiusValue {
	value: string;
	topLeft?: string;
	topRight?: string;
	bottomRight?: string;
	bottomLeft?: string;
}

export interface DateSpan {
	startYear: number;
	startMonth: number;
	endYear: number;
	endMonth: number;
}

export interface CalendarDate {
	id?: string | number;
	date: number;
	weekday: number;
	holiday?: string;
}

export interface CalendarSelectItem {
	id: string;
	value: string;
	label: string;
	[key: string]: unknown;
}

/** 月の切り替え部分の作り。"select"=design-select、"dialog"=年月の表示をクリックしてダイアログで選ぶ */
export type MonthNavStyle = "select" | "dialog";

export interface CalendarAttributes {
	monthNavStyle: MonthNavStyle;
	yearLabelFormat: string;
	monthLabelFormat: string;
	dialogBgColor: string;
	dialogColor: string;
	radius_dialog?: RadiusValue;
	border_dialog?: Record<string, any>;
	is_shadow_dialog: boolean;
	shadow_dialog: Record<string, any>;
	shadow_result_dialog?: Record<string, string | number>;
	/** ダイアログの年の文字。未設定なら既定の大きさ（保存内容を増やさないため、既定値は持たない） */
	font_style_dialog?: FontStyle;
	/** ダイアログの背景（::backdrop）の色。未設定なら半透明の黒 */
	dialogBackdropColor?: string;
	/** ダイアログで選択中の月の文字色・背景色。未設定なら日付ボタンの「選択済み」の設定に従う */
	dialogSelectedColor?: string;
	dialogSelectedBgColor?: string;
	inputName: string;
	selectedValue: number;
	dateValues: CalendarDate[];
	weekTop: string;
	isHoliday: boolean;
	calendarApiMask?: string;
	isReleaseButton: boolean;
	isDateArea: boolean;
	bgColor: string;
	dateSpan: DateSpan;
	selectedMonth: string;
	default_pos: CalendarPosition;
	mobile_pos: CalendarPosition;
	radius_box: RadiusValue;
	border_box?: Record<string, any>;
	shadow_box: Record<string, any>;
	shadow_result_box?: Record<string, string | number>;
	is_shadow_box: boolean;
	inputColor: string;
	inputBgColor: string;
	radius_input: RadiusValue;
	border_input?: Record<string, any>;
	shadow_input: Record<string, any>;
	shadow_result_input?: Record<string, string | number>;
	is_shadow_input: boolean;
	font_style_input: FontStyle;
	font_style_week: FontStyle;
	weekLabelColor: string;
	weekLabelBgColor: string;
	radius_week: RadiusValue;
	border_week?: Record<string, any>;
	shadow_week: Record<string, any>;
	shadow_result_week?: Record<string, string | number>;
	is_shadow_week: boolean;
	holidayColor: string;
	holidayBgColor: string;
	staturdayColor: string;
	saturdayBgColor: string;
	shadow_select: Record<string, any>;
	shadow_result_select?: Record<string, string | number>;
	is_shadow_select: boolean;
	color_select?: string;
	bgColor_select?: string;
	bgGradient_select?: string;
	tooltip_style: TooltipAttributes;
	className?: string;
	[key: string]: unknown;
}

export interface CalendarEditProps {
	attributes: CalendarAttributes;
	setAttributes: (attributes: Partial<CalendarAttributes>) => void;
	clientId: string;
}

export interface CalendarSaveProps {
	attributes: CalendarAttributes;
}
