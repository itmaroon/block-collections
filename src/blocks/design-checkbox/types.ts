import type { FontStyle } from "../../shared/types";

export interface BoxValues {
	top: string;
	left: string;
	right: string;
	bottom: string;
}

export interface CheckboxPosition {
	margin_value: BoxValues;
	padding_value: BoxValues;
}

export interface RadiusValue {
	value: string;
	topLeft?: string;
	topRight?: string;
	bottomRight?: string;
	bottomLeft?: string;
}

export interface CheckboxAttributes {
	inputName: string;
	inputValue: boolean;
	proceedCheck: boolean;
	align: string;
	bgColor: string;
	/** 文字列なら言語を分けていない。{JP, EN} なら言語ごとの文字 */
	labelContent?: string | Record<string, string>;
	/** 手で直した言語の印。{ 項目キー: { 言語: true } } */
	langManual?: Record<string, Record<string, boolean>>;
	font_style_label: FontStyle;
	labelColor: string;
	default_pos: CheckboxPosition;
	mobile_pos: CheckboxPosition;
	bgColor_form?: string;
	boxColor: string;
	boxBgColor: string;
	radius_heading: RadiusValue;
	border_heading?: Record<string, any>;
	shadow_element: Record<string, any>;
	shadow_result?: Record<string, string | number>;
	is_shadow: boolean;
	className?: string;
	[key: string]: unknown;
}

export interface CheckboxEditProps {
	attributes: CheckboxAttributes;
	setAttributes: (attributes: Partial<CheckboxAttributes>) => void;
	clientId: string;
}

export interface CheckboxSaveProps {
	attributes: CheckboxAttributes;
}
