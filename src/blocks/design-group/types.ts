export interface BoxValues {
	top: string;
	left: string;
	right: string;
	bottom: string;
}

export interface PositionValue {
	vertBase: string;
	horBase: string;
	vertValue: string;
	horValue: string;
	isVertCenter: boolean;
	isHorCenter: boolean;
}

export interface GridCell {
	rowInx: number;
	colInx: number;
}

export interface GridElement {
	startCell?: GridCell;
	endCell?: GridCell;
	vertAlign?: string;
	latAlign?: string;
}

export type GroupDirection = "horizen" | "vertical" | "grid";

export interface GroupLayout {
	direction: GroupDirection;
	flex: { grow?: number; shrink?: number; basis?: string };
	reverse: boolean;
	wrap: boolean;
	inner_align: string;
	inner_items: string;
	outer_align: string;
	outer_vertical: string;
	width_val: string;
	max_width: string;
	free_width: string;
	max_free_width: string;
	height_val: string;
	free_height: string;
	posValue: PositionValue;
	margin: BoxValues;
	padding: BoxValues;
	padding_content: BoxValues;
	grid_info: {
		gridElms: GridElement[];
		rowNum: number;
		colNum: number;
		rowGap: string | number;
		colGap: string | number;
		rowUnit?: unknown[];
		colUnit?: unknown[];
	};
}

export interface AnimationParams {
	pattern: string;
	trigger: string;
	delay: number;
	duration: number;
}

export interface MovePosition {
	x: string;
	y: string;
}

export interface ParallaxValue {
	type: string;
	scale: number;
	unit: string;
}

export interface GroupAttributes {
	className: string;
	domType: "div" | "form";
	formID: string;
	positionType: string;
	isPosCenter: boolean;
	default_val: GroupLayout;
	mobile_val: GroupLayout;
	shadow_element: Record<string, any>;
	shadow_result?: Record<string, string | number>;
	is_shadow: boolean;
	is_anime: boolean;
	anime_prm: AnimationParams;
	blockNum: number;
	is_moveable: boolean;
	position: MovePosition;
	is_menu: boolean;
	is_swiper: boolean;
	parallax_obj: ParallaxValue | null;
	is_submenu: boolean;
	is_link: boolean;
	selectedPageUrl: string;
	isBlank: boolean;
	isAppear: boolean;
	has_submenu: boolean;
	block_style: Record<string, unknown> | null;
	[key: string]: unknown;
}

export interface GroupEditProps {
	attributes: GroupAttributes;
	setAttributes: (attributes: Partial<GroupAttributes>) => void;
	clientId: string;
}

export interface GroupSaveProps {
	attributes: GroupAttributes;
}
