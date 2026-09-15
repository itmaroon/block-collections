/**
 * ツールチップのCSS生成。
 *
 * 【重要】このモジュールは @wordpress/* と react に値として依存しない。
 * view.ts から読まれるため、依存を足すとエディタ一式がフロントエンドへ配信される。
 * itmar-block-packages も必ず `/front` から読むこと（バレルはエディタ用を含む）。
 * Reactコンポーネント版は StyleTooltips.tsx にある。
 */
import {
	radius_prm,
	space_prm,
	borderProperty,
} from "itmar-block-packages/front";
import type { TooltipAttributes } from "../shared/types";
import { MEDIA_MOBILE } from "./breakpoints";

const toCssText = (value: unknown): string => {
	if (value == null || value === false) return "";
	if (Array.isArray(value)) return value.map(toCssText).join("");
	return String(value);
};

/**
 * data-tooltip属性を持つ要素へ、エディタ・フロントエンド共通のCSSを生成する。
 */
export const createTooltipStyleCss = (
	attributes: TooltipAttributes,
	scopeSelector: string,
): string => {
	if (!attributes) return "";

	const {
		font_style,
		color,
		bgColor,
		bgGradient,
		border,
		borderRadius,
		padding,
	} = attributes;

	const background = bgColor || bgGradient || "transparent";
	const fontStyle = font_style?.isItalic ? "italic" : "normal";
	const radius = radius_prm(borderRadius);
	const defaultPadding = space_prm(padding?.default);
	const mobilePadding = space_prm(padding?.mobile);
	const borderCss = toCssText(borderProperty(border));
	const keyframeSuffix = scopeSelector.replace(/[^a-zA-Z0-9_-]/g, "");
	const keyframeName = `itmar-tooltip-${keyframeSuffix}`;

	return `
		${scopeSelector} {
			position: relative;
		}

		${scopeSelector}::before,
		${scopeSelector}::after {
			text-transform: none;
			font-size: ${font_style?.default_fontSize};
			font-style: ${fontStyle};
			line-height: 1;
			pointer-events: none;
			position: absolute;
			display: none;
			opacity: 0;
			left: 50%;
			transform: translate(-50%, -0.5em);
		}

		${scopeSelector}::after {
			content: attr(data-tooltip);
			font-family: ${font_style?.fontFamily};
			font-weight: ${font_style?.fontWeight};
			text-align: center;
			min-width: 3em;
			max-width: 21em;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			padding: ${defaultPadding};
			border-radius: ${radius};
			${borderCss}
			box-shadow: 0 1em 2em -0.5em rgba(0, 0, 0, 0.35);
			background: ${background};
			color: ${color};
			z-index: 1000;
			bottom: calc(100% + 4px);
		}

		${scopeSelector}::before {
			content: "";
			border: 5px solid transparent;
			z-index: 1001;
			bottom: 100%;
			border-bottom-width: 0;
			border-top-color: ${background};
		}

		${scopeSelector}:hover::before,
		${scopeSelector}:hover::after {
			display: block;
			animation: ${keyframeName} 300ms ease-out forwards;
		}

		@keyframes ${keyframeName} {
			to {
				opacity: 0.9;
				transform: translate(-50%, 0);
			}
		}

		${MEDIA_MOBILE} {
			${scopeSelector}::before,
			${scopeSelector}::after {
				font-size: ${font_style?.mobile_fontSize};
			}
			${scopeSelector}::after {
				padding: ${mobilePadding};
			}
		}
	`;
};
