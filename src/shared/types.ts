import type { ReactNode } from "react";

export interface BoxValues {
	top: string;
	left: string;
	right: string;
	bottom: string;
}

export interface FontStyle {
	default_fontSize: string;
	mobile_fontSize: string;
	fontFamily: string;
	fontWeight: string;
	isItalic: boolean;
}

export interface TooltipAttributes {
	font_style: FontStyle;
	color: string;
	bgColor?: string;
	bgGradient?: string;
	border: BoxValues;
	borderRadius: { value: string };
	padding: { default: BoxValues; mobile: BoxValues };
	tooltip_text?: string;
	[key: string]: unknown;
}

export interface ToolTipsProps {
	attributes: TooltipAttributes;
	isMobile: boolean;
	onChange: (attributes: TooltipAttributes) => void;
}

export interface LabelStyleAttributes {
	htmlFor?: string;
	[key: string]: unknown;
}

export interface LabelBoxProps {
	attributes: Record<string, any>;
	onChange: (key: string, value: unknown) => void;
	children?: ReactNode;
}

export interface OptionItem {
	id: string;
	value: string;
	label: string;
	classname: string;
}

export interface OptionModalProps {
	optionValues: OptionItem[];
	onUpdateOption: (options: OptionItem[]) => void;
	onAddOption: (option: OptionItem | null) => void;
}
