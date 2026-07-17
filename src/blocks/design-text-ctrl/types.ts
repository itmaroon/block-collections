import type { CSSProperties } from "react";
import type { BoxValues, FontStyle } from "../../shared/types";

export type TextCtrlInputType =
	| "text"
	| "number"
	| "email"
	| "pass"
	| "zip"
	| "textarea";

export interface NumberOption {
	max: number;
	min: number;
	step: number;
}

export interface RequiredInfo {
	flg: boolean;
	display: string;
}

export interface RadiusValue {
	topLeft?: string;
	topRight?: string;
	bottomRight?: string;
	bottomLeft?: string;
	value?: string;
}

export type BorderValue = Record<string, unknown>;

export interface TextCtrlPosition {
	margin_input: BoxValues;
	padding_input: BoxValues;
	labelPos: string;
	inputLineHeight: string | number;
	freeWidth?: string;
	free_width?: string;
}

export interface TextCtrlAttributes {
	inputName: string;
	inputValue: string;
	inputType: TextCtrlInputType;
	numberOption: NumberOption;
	addressInput: string;
	placeFolder: string;
	required: RequiredInfo;
	focusColor?: string;
	bgColor: string;
	font_style_input: FontStyle;
	bgColor_input?: string;
	bgGradient_input?: string;
	textColor_input: string;
	radius_input: RadiusValue;
	border_input?: BorderValue;
	default_pos: TextCtrlPosition;
	mobile_pos: TextCtrlPosition;
	labelContent: string;
	labelWidth: string;
	labelVertAlign?: string;
	font_style_label: FontStyle;
	bgColor_label?: string;
	bgGradient_label?: string;
	textColor_label: string;
	radius_label: RadiusValue;
	border_label?: BorderValue;
	padding_label: BoxValues;
	labelSpace: string;
	shadow_element: Record<string, unknown>;
	shadow_result?: Record<string, string | number>;
	is_shadow: boolean;
	className?: string;
	[key: string]: unknown;
}

export interface TextCtrlEditProps {
	attributes: TextCtrlAttributes;
	setAttributes: (attributes: Partial<TextCtrlAttributes>) => void;
	clientId: string;
	context: Record<string, unknown>;
}

export interface TextCtrlSaveProps {
	attributes: TextCtrlAttributes;
}

export interface TargetTextBlock {
	clientId: string;
	attributes: Partial<TextCtrlAttributes>;
}

export interface ZipAddress {
	address1?: string;
	address2?: string;
	address3?: string;
}

export interface ShadowStyleResult {
	style: CSSProperties;
}
