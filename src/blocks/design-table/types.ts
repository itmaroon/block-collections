import type { CSSProperties } from "react";
import type { BoxValues, FontStyle } from "../../shared/types";

export interface TableColRow {
	colNum: number;
	rowNum: number;
}

export interface CellPosition {
	row?: number;
	col?: number;
}

export type TableCellTag = "td" | "th";

export interface TableCell {
	content?: string;
	tag?: TableCellTag;
	style?: CSSProperties;
	[key: string]: unknown;
}

export interface TableRow {
	cells?: TableCell[];
	[key: string]: unknown;
}

export interface RadiusValue {
	value: string;
	topLeft?: string;
	topRight?: string;
	bottomRight?: string;
	bottomLeft?: string;
}

export interface TablePosition {
	margin_value: BoxValues;
	padding_value: BoxValues;
	padding_th: BoxValues;
	padding_td: BoxValues;
	headding_min_width: number;
}

export type TableLayout = "auto" | "fixed" | string;

export interface DesignTableAttributes {
	is_data_form: boolean;
	defineID: string;
	tableColRow: TableColRow;
	tableSource: TableRow[];
	clickCellPos: CellPosition;
	tableLayout: TableLayout;
	is_heading: boolean;
	is_rowHeading: boolean;
	tableHeading: string[];
	rowTableHeading: string[];
	bgColor: string;
	font_style_th: FontStyle;
	font_style_td: FontStyle;
	th_color: string;
	bgColor_th?: string;
	bgGradient_th?: string;
	td_color: string;
	bgColor_td?: string;
	bgGradient_td?: string;
	sel_color: string;
	bgColor_sel?: string;
	bgGradient_sel?: string;
	radius_value: RadiusValue;
	border_value?: Record<string, any>;
	default_pos: TablePosition;
	mobile_pos: TablePosition;
	columWidth: string[];
	columAlign: Array<string | undefined>;
	columAlignTH: string;
	intensity: number;
	shadow_element: Record<string, any>;
	shadow_result?: Record<string, string | number>;
	is_shadow: boolean;
	className?: string;
	[key: string]: unknown;
}

export interface DesignTableEditProps {
	attributes: DesignTableAttributes;
	setAttributes: (attributes: Partial<DesignTableAttributes>) => void;
	clientId: string;
}

export interface DesignTableSaveProps {
	attributes: DesignTableAttributes;
}

export interface BlockEditorSelectors {
	getBlockName: (clientId: string) => string | null;
	getBlockParents: (clientId: string) => string[];
}
