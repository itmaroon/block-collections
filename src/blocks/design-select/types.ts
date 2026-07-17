import type { FontStyle, BoxValues } from "../../shared/types";
import type { OptionItem } from "../OptionModal";

export type SelectPattern = "single" | "multi";
export type SelectOption = OptionItem;

export interface RadiusValue {
	value: string;
	topLeft?: string;
	topRight?: string;
	bottomRight?: string;
	bottomLeft?: string;
}

export interface SelectPosition {
	margin_value: BoxValues;
	padding_value: BoxValues;
	labelPos: string;
}

export interface RequiredInfo {
	flg: boolean;
	display: string;
}

export interface SelectAttributes {
	inputName: string;
	selPattern: SelectPattern;
	selectValues: SelectOption[];
	isSetSelect: boolean;
	selectedValues: Array<string | number>;
	folder_val: string;
	required: RequiredInfo;
	font_style_option: FontStyle;
	optionColor: string;
	hoverBgColor: string;
	default_pos: SelectPosition;
	mobile_pos: SelectPosition;
	bgColor: string;
	bgSelectColor?: string;
	bgSelectGradient?: string;
	radius_value: RadiusValue;
	border_value?: Record<string, any>;
	labelContent: string;
	labelWidth: string;
	font_style_label: FontStyle;
	bgColor_label?: string;
	bgGradient_label?: string;
	textColor_label: string;
	radius_label: RadiusValue;
	border_label?: Record<string, any>;
	padding_label: BoxValues;
	labelSpace: string;
	shadow_element: Record<string, any>;
	shadow_result?: Record<string, string | number>;
	is_shadow: boolean;
	className?: string;
	[key: string]: unknown;
}

export interface SelectEditProps {
	attributes: SelectAttributes;
	setAttributes: (attributes: Partial<SelectAttributes>) => void;
	context: Record<string, unknown>;
}

export interface SelectSaveProps {
	attributes: SelectAttributes;
}
