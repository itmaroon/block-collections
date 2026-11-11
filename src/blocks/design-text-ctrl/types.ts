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

/** 言語ごとの文字を持てる値。文字列なら言語を分けていない */
export type LangText = string | Record<string, string>;

export interface RequiredInfo {
	flg: boolean;
	display: LangText;
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
	placeFolder: LangText;
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
	labelContent: LangText;
	/** 手で直した言語の印。{ 項目キー: { 言語: true } } */
	langManual?: Record<string, Record<string, boolean>>;
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
