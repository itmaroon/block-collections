import {
	radius_prm,
	space_prm,
	align_prm,
	convertToScss,
	borderProperty,
	Arrow,
	ShadowElm,
	cssValueToString,
} from "itmar-block-packages";
import { toStyleRecord } from "../front-common";

import type { DesignButtonAttributes } from "./types";

type ShadowState = Parameters<typeof ShadowElm>[0];
type ArrowDirection = NonNullable<Parameters<typeof Arrow>[0]["direction"]>;

/**
 * ボタンのエディタ・フロントエンド共通のスコープ付きCSSを生成する。
 */
export const createButtonStyleCss = (
	attributes: DesignButtonAttributes,
	scopeSelector: string,
): string => {
	const {
		displayType,
		align,
		font_style_label,
		pseudoInfo,
		iconStyle,
		default_pos,
		mobile_pos,
		disableOpacity,
		labelColor,
		disableLabelColor,
		buttonColor,
		disableButtonColor,
		disableButtonGradient,
		buttonGradient,
		radius_value,
		border_value,
		shadow_element,
		shadow_result,
		is_shadow,
	} = attributes;

	const buttonSelector = `${scopeSelector} button`;
	const background = buttonColor || buttonGradient || "transparent";
	const disabledBackground =
		disableButtonColor || disableButtonGradient || "transparent";
	const shadow =
		is_shadow && shadow_result
			? cssValueToString(convertToScss(shadow_result))
			: "";
	let hoverShadow = "";

	if (is_shadow && shadow_result) {
		const hoverElement = ShadowElm({
			...(shadow_element as ShadowState),
			embos: "dent",
		});
		hoverShadow = hoverElement?.style
			? cssValueToString(convertToScss(toStyleRecord(hoverElement.style)))
			: "";
	}

	const pseudoCss =
		displayType === "pseudo"
			? cssValueToString(
					Arrow({ direction: pseudoInfo?.option as ArrowDirection }),
			  ).replaceAll("&", buttonSelector)
			: "";
	const iconCss =
		displayType === "icon"
			? `
			${buttonSelector}::after {
				content:"\\${iconStyle.icon_name}";
				font-family:"${iconStyle.icon_family}";
				font-weight:${iconStyle.icon_family === "Font Awesome 6 Free" ? "900" : "400"};
				position:absolute;
				top:50%;
				left:50%;
				transform:translate(-50%,-50%);
				font-size:${iconStyle.icon_size};
				color:${iconStyle.icon_color};
			}
		`
			: "";

	return `
		${scopeSelector} {
			display:flex;
			align-items:center;
			height:100%;
		}

		${buttonSelector} {
			position:relative;
			width:${default_pos.width};
			height:${default_pos.height};
			margin:${space_prm(default_pos.margin_value)};
			padding:${space_prm(default_pos.padding_value)};
			background:${background};
			border-radius:${radius_prm(radius_value)};
			${cssValueToString(borderProperty(border_value))}
			display:flex;
			align-items:center;
			${shadow}
			font-size:${font_style_label.default_fontSize};
			font-family:${font_style_label.fontFamily};
			font-weight:${font_style_label.fontWeight};
			font-style:${font_style_label.isItalic ? "italic" : "normal"};
			color:${labelColor};
			transition:box-shadow ease-in-out .5s;
		}
		${buttonSelector}:hover {
			cursor:pointer;
			${hoverShadow}
		}
		${buttonSelector} figure {
			margin:0;
			width:100%;
			height:100%;
			position:relative;
		}
		${buttonSelector} figure img {
			width:100%;
			height:100%;
			margin:0;
		}
		${buttonSelector}[disabled] {
			color:${disableLabelColor};
			background:${disabledBackground};
			cursor:not-allowed;
			opacity:${disableOpacity};
		}
		${buttonSelector} > div {
			${cssValueToString(align_prm(align))}
		}

		${pseudoCss}
		${iconCss}

		@media (max-width:767px) {
			${buttonSelector} {
				width:${mobile_pos.width};
				height:${mobile_pos.height};
				margin:${space_prm(mobile_pos.margin_value)};
				padding:${space_prm(mobile_pos.padding_value)};
				font-size:${font_style_label.mobile_fontSize};
			}
		}
	`;
};
