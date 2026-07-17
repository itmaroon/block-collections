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

export interface CalendarAttributes {
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
