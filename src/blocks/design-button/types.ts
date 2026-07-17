import type { TooltipAttributes, FontStyle } from "../../shared/types";
import type { ArrowDirection, IconStyle } from "itmar-block-packages";

export type ButtonType = "button" | "submit" | "reset";
export type DisplayType = "string" | "image" | "pseudo" | "icon";

export interface BoxValues {
	top: string;
	left: string;
	right: string;
	bottom: string;
}

export interface StretchInfo {
	groupId: string;
	isOpen: boolean;
	isArrow: boolean;
	arrowSize: string;
	openText: string;
	closeText: string;
}

export interface DesignButtonAttributes {
	buttonType: ButtonType;
	displayType: DisplayType;
	linkKind: string;
	selectedSlug: string;
	selectedPageUrl: string;
	modalClassName: string;
	stretchInfo: StretchInfo;
	isBlank: boolean;
	isClick: boolean;
	isEditing: boolean;
	buttonKey?: string;
	align: string;
	outer_align: string;
	bgColor: string;
	labelContent?: string;
	disabled: boolean;
	disableOpacity: number;
	mediaID: number;
	media: { id: number; url: string; [key: string]: unknown } | null;
	pseudoInfo: {
		element: string;
		option: ArrowDirection;
	};
	iconStyle: IconStyle;
	font_style_label: FontStyle;
	labelColor: string;
	disableLabelColor: string;
	default_pos: Record<string, any>;
	mobile_pos: Record<string, any>;
	buttonColor: string;
	buttonGradient?: string;
	disableButtonColor: string;
	disableButtonGradient?: string;
	radius_value: { value: string };
	border_value?: Record<string, unknown>;
	shadow_element: Record<string, any>;
	shadow_result?: Record<string, string | number>;
	is_shadow: boolean;
	is_tooltip: boolean;
	tooltip_style: TooltipAttributes;
	tooltip_text: string;
	[key: string]: unknown;
}

export interface DesignButtonEditProps {
	attributes: DesignButtonAttributes;
	setAttributes: (attributes: Partial<DesignButtonAttributes>) => void;
	clientId?: string;
}

export interface DesignButtonSaveProps {
	attributes: DesignButtonAttributes;
}
