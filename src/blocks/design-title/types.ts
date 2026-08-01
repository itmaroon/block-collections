import type { CSSProperties } from "react";
import type { BoxValues } from "../../shared/types";

export type TitleOptionStyle = Record<string, any>;

export type UnderLineDirection = "center" | "right" | "left";

export interface UnderLineProp {
	width: string;
	height: string;
	distance: string;
	is_anime: boolean;
	direction?: UnderLineDirection;
}

export interface TitleStyleScopes {
	root: string;
	inner: string;
}

export interface TitleAttributes {
	headingContent?: string;
	uniqueID?: string;
	headingType: string;
	defaultHeadingSize: string;
	mobileHeadingSize: string;
	titleType: string;
	userFormat: string;
	freeStrFormat: string;
	decimal: number;
	isMenuItem: boolean;
	headingID?: string;
	linkKind: string;
	menu_pos: string;
	is_title_menu: boolean;
	selectedSlug: string;
	selectedPageUrl: string;
	isBlank: boolean;
	align: string;
	isVertical: boolean;
	padding_heading: BoxValues;
	optionStyle: TitleOptionStyle;
	isIdle: boolean;
	shadow_element: Record<string, unknown>;
	shadow_result?: Record<string, string | number>;
	is_shadow: boolean;
	is_underLine: boolean;
	is_wrap: boolean;
	is_waiting: boolean;
	waiting_state: string;
	underLine_prop: UnderLineProp;
	bgColor_underLine?: string;
	bgGradient_underLine?: string;
	block_style?: Record<string, unknown> | null;
	dateValue?: string;
	className?: string;
	[key: string]: any;
}

export interface TitleEditProps {
	attributes: TitleAttributes;
	setAttributes: (attributes: Partial<TitleAttributes>) => void;
	clientId: string;
}

export interface TitleSaveProps {
	attributes: TitleAttributes;
}

export interface ShadowStyleResult {
	style: CSSProperties;
}

export interface SiteInfoResponse {
	name?: string;
	description?: string;
}

export interface CurrentUserResponse {
	is_logged_in?: boolean;
	display_name?: string;
	avatar_url?: string;
}

export interface NoticesActions {
	createNotice: (
		status: string,
		content: string,
		options?: Record<string, unknown>,
	) => void;
}
