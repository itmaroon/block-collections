import type { FontStyle } from "../../shared/types";

export interface BoxValues {
	top: string;
	left: string;
	right: string;
	bottom: string;
}

export interface ProcessPosition {
	margin_form: BoxValues;
	padding_form: BoxValues;
}

export interface RadiusValue {
	value: string;
	topLeft?: string;
	topRight?: string;
	bottomRight?: string;
	bottomLeft?: string;
}

export interface FigureBlockInfo {
	block_name: string;
	block_type: string;
	stage_info: string;
}

export interface ProcessAttributes {
	figure_blocks: FigureBlockInfo[];
	bgColor: string;
	bgColor_form?: string;
	bgGradient_form?: string;
	radius_form: RadiusValue;
	border_form?: Record<string, any>;
	default_pos: ProcessPosition;
	mobile_pos: ProcessPosition;
	font_style_num: FontStyle;
	textColor_num: string;
	bgColor_num: string;
	font_style_process: FontStyle;
	textColor_process: string;
	shadow_element: Record<string, any>;
	shadow_result?: Record<string, string | number>;
	is_shadow: boolean;
	className?: string;
	[key: string]: unknown;
}

export interface ProcessEditProps {
	attributes: ProcessAttributes;
	setAttributes: (attributes: Partial<ProcessAttributes>) => void;
	context: {
		"itmar/current_step"?: number;
		[key: string]: unknown;
	};
	clientId: string;
}

export interface ProcessSaveProps {
	attributes: ProcessAttributes;
}
