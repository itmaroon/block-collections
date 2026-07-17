import type { FontStyle } from "../../shared/types";
import type { OptionItem } from "../OptionModal";

export type RadioDirection = "horizen" | "vertical";

export type RadioOption = OptionItem;

export type RadioAlign =
	| "flex-start"
	| "center"
	| "flex-end"
	| "space-between"
	| "space-around";

export interface BoxValues {
	top: string;
	left: string;
	right: string;
	bottom: string;
}

export interface RadiusValue {
	value: string;
	topLeft?: string;
	topRight?: string;
	bottomRight?: string;
	bottomLeft?: string;
}

export interface RadioPosition {
	direction: RadioDirection;
	wrap: boolean;
	inner_align: RadioAlign;
	margin: BoxValues;
	padding: BoxValues;
	margin_input: BoxValues;
	padding_input: BoxValues;
	button_scale: string;
}

export interface RadioAttributes {
	inputName: string;
	optionValues: RadioOption[];
	selectedValues: string;
	isSetSelect: boolean;
	isReleaseButton: boolean;
	bgColor: string;
	font_style_input: FontStyle;
	default_pos: RadioPosition;
	mobile_pos: RadioPosition;
	inputColor: string;
	inputBgColor: string;
	radius_box: RadiusValue;
	border_box?: Record<string, any>;
	shadow_box: Record<string, any>;
	shadow_result_box?: Record<string, string | number>;
	is_shadow_box: boolean;
	radius_input: RadiusValue;
	border_input?: Record<string, any>;
	shadow_input: Record<string, any>;
	shadow_result_input?: Record<string, string | number>;
	is_shadow_input: boolean;
	buttonColor: string;
	buttonBgColor: string;
	shadow_select: Record<string, any>;
	shadow_result_select?: Record<string, string | number>;
	is_shadow_select: boolean;
	color_select?: string;
	bgColor_select?: string;
	bgGradient_select?: string;
	className?: string;
	[key: string]: unknown;
}

export interface RadioEditProps {
	attributes: RadioAttributes;
	setAttributes: (attributes: Partial<RadioAttributes>) => void;
	clientId: string;
}

export interface RadioSaveProps {
	attributes: RadioAttributes;
}
