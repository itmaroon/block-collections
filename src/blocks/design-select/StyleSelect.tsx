import styled, { css } from "styled-components";
import {
	radius_prm,
	space_prm,
	convertToScss,
	borderProperty,
	cssValueToString,
} from "itmar-block-packages";
import type { ReactNode } from "react";
import type { SelectAttributes } from "./types";

interface StyleCompProps {
	attributes: SelectAttributes;
	children: ReactNode;
}

export const StyleComp = ({ attributes, children }: StyleCompProps) => {
	return <StyledDiv $attr={attributes}>{children}</StyledDiv>;
};

const StyledDiv = styled.div<{ $attr: SelectAttributes }>`
	${({ $attr }) => {
		const {
			optionColor,
			hoverBgColor,
			font_style_option,
			default_pos,
			mobile_pos,
			bgSelectColor,
			bgSelectGradient,
			radius_value,
			border_value,
			shadow_result,
			is_shadow,
			className,
		} = $attr;

		//単色かグラデーションかの選択
		const bgColor = bgSelectColor || bgSelectGradient;
		//斜体の設定
		const fontStyle_option = font_style_option.isItalic ? "italic" : "normal";
		//角丸の設定
		const heading_radius_prm = radius_prm(radius_value);
		//スペースの設定
		const default_heading_margin_prm = space_prm(default_pos.margin_value);
		const default_heading_padding_prm = space_prm(default_pos.padding_value);
		const mobile_heading_margin_prm = space_prm(mobile_pos.margin_value);
		const mobile_heading_padding_prm = space_prm(mobile_pos.padding_value);
		//ボックスシャドーの設定
		const box_shadow_style =
			is_shadow && shadow_result ? convertToScss(shadow_result) : "";
		//配置場所
		const alignMap: Record<string, string> = {
			"top left":
				"display: flex;flex-direction: column-reverse;align-items: flex-start;",
			"top center":
				"display: flex;flex-direction: column-reverse;align-items: center;",
			"top right":
				"display: flex;flex-direction: column-reverse;align-items: flex-end;",
			"center left":
				"display: flex;flex-direction: row-reverse;align-items: center;",
			"center center": "label{display: none;}",
			"center right": "display: flex;align-items: center;",
			"bottom left":
				"display: flex;flex-direction: column;align-items: flex-start;",
			"bottom center":
				"display: flex;flex-direction: column;align-items: center;",
			"bottom right":
				"display: flex;flex-direction: column;align-items: flex-end;",
		};

		// 共通のスタイルをここで定義します
		const commonStyle = css`
			margin: ${default_heading_margin_prm};
			padding: ${default_heading_padding_prm};
			position: relative;
			${alignMap[default_pos.labelPos]}
			@media (max-width: 767px) {
				margin: ${mobile_heading_margin_prm};
				padding: ${mobile_heading_padding_prm};
				${alignMap[mobile_pos.labelPos]}
			}
			.itmar_block_select {
				position: relative;
				font-size: ${font_style_option.default_fontSize};
				font-family: ${font_style_option.fontFamily};
				font-weight: ${font_style_option.fontWeight};
				font-style: ${fontStyle_option};
				color: ${optionColor};
				@media (max-width: 767px) {
					font-size: ${font_style_option.mobile_fontSize};
				}

				& > div {
					position: relative;
					background: ${bgColor};
					border-radius: ${heading_radius_prm};
					${borderProperty(border_value)};
					${box_shadow_style};
					z-index: 2;
					padding: 0.8em 3em 0.8em 1.2em;
					border-radius: 8px;
					font-size: ${font_style_option.default_fontSize};
					min-height: 2.2em;
					@media (max-width: 767px) {
						font-size: ${font_style_option.mobile_fontSize};
					}

					.itmar_block_opener {
						right: 1px;
						top: 0;
						bottom: 0;
						cursor: pointer;
						width: 1.4em;
						position: absolute;

						&:after {
							content: "";
							position: absolute;
							display: block;
							width: 0.75em;
							height: 0.75em;
							border-bottom: 2px solid #99a3ba;
							border-left: 2px solid #99a3ba;
							transform: rotate(315deg);
							top: 30%;
							transition: all 0.3s ease;
						}
					}

					span {
						color: var(--wp--preset--color--placeholder);
						display: block;
						position: absolute;
						left: 12px;
						cursor: pointer;
						top: 50%;
						transform: translateY(-50%);
						line-height: 1em;
						transition: all 0.3s ease;

						&.hide {
							opacity: 0;
							visibility: hidden;
							transform: translate(-4px, 0);
						}
					}

					a {
						position: relative;
						padding: 0 0 6px 0;
						line-height: 1.4em;
						text-decoration-line: none;
						color: ${optionColor};
						display: inline-block;
						vertical-align: top;
						margin: 6px 6px 0 0;
						cursor: pointer;

						em {
							display: block;
							white-space: nowrap;
							padding: 0.1em 0.5em 0.1em 0.5em;
							position: relative;
							font-style: ${fontStyle_option};
						}

						&:before {
							content: "";
							left: 0;
							top: 0;
							bottom: 6px;
							width: 100%;
							position: absolute;
							display: block;
							background: ${hoverBgColor};
							z-index: -1;
							border-radius: 4px;
						}

						i {
							cursor: pointer;
							position: absolute;
							top: 0;
							right: 0.3em;
							width: 1.2em;
							height: 1.4em;
							display: block;

							&:before,
							&:after {
								content: "";
								display: block;
								width: 2px;
								height: 1.25em;
								position: absolute;
								left: 50%;
								top: 50%;
								background: rgb(153, 163, 186);
								border-radius: 1px;
							}

							&:before {
								transform: translate(-50%, -50%) rotate(45deg);
							}

							&:after {
								transform: translate(-50%, -50%) rotate(-45deg);
							}
						}

						&.notShown {
							opacity: 0;
							transition: opacity 0.3s ease;

							&:before {
								width: 28px;
								transition: width 0.45s cubic-bezier(0.87, -0.41, 0.19, 1.44)
									0.2s;
							}

							i {
								opacity: 0;
								transition: all 0.3s ease 0.3s;
							}

							em {
								opacity: 0;
								transform: translate(-6px, 0);
								transition: all 0.4s ease 0.3s;
							}

							&.shown {
								opacity: 1;
								margin-top: 6px;

								&:before {
									width: 100%;
								}

								i {
									opacity: 1;
								}

								em {
									opacity: 1;
									transform: translate(0, 0);
								}
							}
						}

						&.remove {
							&:before {
								width: 28px;
								transition: width 0.4s cubic-bezier(0.87, -0.41, 0.19, 1.44) 0s;
							}

							i {
								opacity: 0;
								transition: all 0.3s ease 0s;
							}

							em {
								opacity: 0;
								transform: translate(-12px, 0);
								transition: all 0.4s ease 0s;
							}

							&.disappear {
								opacity: 0;
								transition: opacity 0.5s ease 0s;
							}
						}
					}
				}

				& > ul {
					margin: 0;
					padding: 0;

					list-style: none;
					font-size: 0.8em;
					max-height: 40vh;
					overflow: scroll;
					z-index: 1;
					position: relative;
					top: auto;
					left: 0;
					right: 0;
					visibility: hidden;
					opacity: 0;
					max-height: 0;
					border-radius: 8px;
					transform: translate(0, 20px) scale(0.8);
					transform-origin: 0 0;
					filter: drop-shadow(0 12px 20px rgba(22, 42, 90, 0.08));
					transition:
						all 0.4s ease,
						transform 0.4s cubic-bezier(0.87, -0.41, 0.19, 1.44),
						filter 0.3s ease 0.2s;

					li {
						color: ${optionColor};
						background: #fff;
						padding: 0.5em 0.7em 0.5em 1.7em;
						font-size: ${font_style_option.default_fontSize};
						cursor: pointer;
						overflow: hidden;
						position: relative;
						transition:
							background 0.3s ease,
							color 0.3s ease,
							transform 0.3s ease 0.3s,
							opacity 0.5s ease 0.3s,
							border-radius 0.3s ease 0.3s;
						@media (max-width: 767px) {
							font-size: ${font_style_option.mobile_fontSize};
						}
						&:first-child {
							border-radius: 8px 8px 0 0;

							&:last-child {
								border-radius: 8px;
							}
						}

						&:last-child {
							border-radius: 0 0 8px 8px;

							&:first-child {
								border-radius: 8px;
							}
						}

						&:hover {
							background: ${hoverBgColor};
							color: #fff;
						}

						&.beforeRemove {
							border-radius: 0 0 8px 8px;

							&:first-child {
								border-radius: 8px;
							}
						}

						&.afterRemove {
							border-radius: 8px 8px 0 0;

							&:last-child {
								border-radius: 8px;
							}
						}

						&.remove {
							transform: scale(0);
							opacity: 0;

							&:after {
								animation: ripple 0.4s ease-out;
							}
						}

						&.notShown {
							transform: scale(0);
							opacity: 0;
							transition:
								transform 0.35s ease,
								opacity 0.4s ease;

							&.show {
								transform: scale(1);
								opacity: 1;
							}
						}
					}
				}

				&.open {
					& > div {
						box-shadow: 0 4px 20px -1px rgba(22, 42, 90, 0.12);

						.itmar_block_opener {
							&:after {
								top: 40%;
								transform: rotate(135deg);
							}
						}
					}

					& > ul {
						transform: translate(0, 12px) scale(1);
						opacity: 1;
						visibility: visible;
						//height: auto;
						max-height: 30vh;
						overflow: hidden visible;
						filter: drop-shadow(0 16px 24px rgba(22, 42, 90, 0.16));
					}
				}
			}

			.itmar_block_selectSingle {
				& > div {
					a {
						&:hover {
							cursor: auto;
						}

						i {
							display: none;
						}
					}
				}
			}
		`;

		// const cssMap = {
		//   'is-style-progress': barStyle,
		//   'is-style-card': cardStyle,
		// };
		// const defaultStyle = barStyle;
		// const optionStyle = cssMap[className] || defaultStyle;
		// 共通のスタイルを組み合わせて返します
		return css`
			${commonStyle}
		`;
	}}
`;

const resolveFontStyle = (
	fontStyle: SelectAttributes["font_style_option"],
): string =>
	fontStyle?.isItalic ? "italic" : "normal";

const alignMap: Record<string, string> = {
	"top left":
		"display: flex;flex-direction: column-reverse;align-items: flex-start;",
	"top center":
		"display: flex;flex-direction: column-reverse;align-items: center;",
	"top right":
		"display: flex;flex-direction: column-reverse;align-items: flex-end;",
	"center left": "display: flex;flex-direction: row-reverse;align-items: center;",
	"center center": "label{display: none;}",
	"center right": "display: flex;align-items: center;",
	"bottom left": "display: flex;flex-direction: column;align-items: flex-start;",
	"bottom center": "display: flex;flex-direction: column;align-items: center;",
	"bottom right": "display: flex;flex-direction: column;align-items: flex-end;",
};

const labelMarginPropertyMap: Record<string, string> = {
	"top left": "margin-bottom",
	"top center": "margin-bottom",
	"top right": "margin-bottom",
	"center left": "margin-right",
	"center right": "margin-left",
	"bottom left": "margin-top",
	"bottom center": "margin-top",
	"bottom right": "margin-top",
};

const createLabelMarginCss = (
	labelPos: string | undefined,
	labelSpace: string,
): string => {
	const property = labelPos ? labelMarginPropertyMap[labelPos] : undefined;
	return property ? `${property}: ${labelSpace};` : "";
};

const createLabelStyleCss = (
	attributes: SelectAttributes,
	scopeSelector: string,
): string => {
	const {
		font_style_label,
		bgColor_label,
		bgGradient_label,
		textColor_label,
		radius_label,
		border_label,
		padding_label,
		labelSpace,
		labelWidth,
		default_pos,
		mobile_pos,
		shadow_result,
		is_shadow,
	} = attributes;

	const bgLabelColor = bgColor_label || bgGradient_label || "transparent";
	const fontStyleLabel = resolveFontStyle(font_style_label);
	const labelRadius = radius_prm(radius_label);
	const labelPadding = space_prm(padding_label);
	const labelBorder = cssValueToString(borderProperty(border_label));
	const labelShadow =
		is_shadow && shadow_result ? cssValueToString(convertToScss(shadow_result)) : "";

	return `
		${scopeSelector} label {
			white-space: nowrap;
			width: ${labelWidth || "auto"};
			background: ${bgLabelColor};
			border-radius: ${labelRadius};
			color: ${textColor_label || "inherit"};
			font-size: ${font_style_label?.default_fontSize || "inherit"};
			font-family: ${font_style_label?.fontFamily || "inherit"};
			font-weight: ${font_style_label?.fontWeight || "inherit"};
			font-style: ${fontStyleLabel};
			padding: ${labelPadding};
			${labelBorder}
			${labelShadow}
			${createLabelMarginCss(default_pos?.labelPos, labelSpace)}
		}
		${scopeSelector} label span {
			color: var(--wp--preset--color--accent-1);
		}

		@media (max-width: 767px) {
			${scopeSelector} label {
				font-size: ${font_style_label?.mobile_fontSize || font_style_label?.default_fontSize || "inherit"};
				${createLabelMarginCss(mobile_pos?.labelPos, labelSpace)}
			}
		}
	`;
};

/**
 * フロントエンド用のスコープ付きCSSを生成する。
 * React、renderToString、styled-componentsのクラス名には依存しない。
 */
export const createSelectStyleCss = (
	attributes: SelectAttributes,
	scopeSelector: string,
): string => {
	const {
		optionColor,
		hoverBgColor,
		font_style_option,
		default_pos,
		mobile_pos,
		bgSelectColor,
		bgSelectGradient,
		radius_value,
		border_value,
		shadow_result,
		is_shadow,
	} = attributes;

	const bgColor = bgSelectColor || bgSelectGradient || "#fff";
	const fontStyleOption = resolveFontStyle(font_style_option);
	const selectRadius = radius_prm(radius_value);
	const border = cssValueToString(borderProperty(border_value));
	const shadow =
		is_shadow && shadow_result ? cssValueToString(convertToScss(shadow_result)) : "";

	return `
		${scopeSelector} {
			margin: ${space_prm(default_pos?.margin_value)};
			padding: ${space_prm(default_pos?.padding_value)};
			position: relative;
			${alignMap[default_pos?.labelPos] || ""}
		}
		${scopeSelector} .itmar_block_select select.nomal {
			display: none;
		}
		${scopeSelector} .itmar_block_select {
			position: relative;
			font-size: ${font_style_option?.default_fontSize};
			font-family: ${font_style_option?.fontFamily};
			font-weight: ${font_style_option?.fontWeight};
			font-style: ${fontStyleOption};
			color: ${optionColor};
		}
		${scopeSelector} .itmar_block_select > div {
			position: relative;
			background: ${bgColor};
			${border}
			${shadow}
			z-index: 2;
			padding: 0.8em 3em 0.8em 1.2em;
			border-radius: ${selectRadius};
			border-radius: 8px;
			font-size: ${font_style_option?.default_fontSize};
			min-height: 2.2em;
		}
		${scopeSelector} .itmar_block_opener {
			right: 1px;
			top: 0;
			bottom: 0;
			cursor: pointer;
			width: 1.4em;
			position: absolute;
		}
		${scopeSelector} .itmar_block_opener::after {
			content: "";
			position: absolute;
			display: block;
			width: 0.75em;
			height: 0.75em;
			border-bottom: 2px solid #99a3ba;
			border-left: 2px solid #99a3ba;
			transform: rotate(315deg);
			top: 30%;
			transition: all 0.3s ease;
		}
		${scopeSelector} .itmar_block_select > div > span {
			color: var(--wp--preset--color--placeholder);
			display: block;
			position: absolute;
			left: 12px;
			cursor: pointer;
			top: 50%;
			transform: translateY(-50%);
			line-height: 1em;
			transition: all 0.3s ease;
		}
		${scopeSelector} .itmar_block_select > div > span.hide {
			opacity: 0;
			visibility: hidden;
			transform: translate(-4px, 0);
		}
		${scopeSelector} .itmar_block_select > div a {
			position: relative;
			padding: 0 0 6px 0;
			line-height: 1.4em;
			text-decoration-line: none;
			color: ${optionColor};
			display: inline-block;
			vertical-align: top;
			margin: 6px 6px 0 0;
			cursor: pointer;
		}
		${scopeSelector} .itmar_block_select > div a em {
			display: block;
			white-space: nowrap;
			padding: 0.1em 0.5em;
			position: relative;
			font-style: ${fontStyleOption};
		}
		${scopeSelector} .itmar_block_select > div a::before {
			content: "";
			left: 0;
			top: 0;
			bottom: 6px;
			width: 100%;
			position: absolute;
			display: block;
			background: ${hoverBgColor};
			z-index: -1;
			border-radius: 4px;
		}
		${scopeSelector} .itmar_block_select > div a i {
			cursor: pointer;
			position: absolute;
			top: 0;
			right: 0.3em;
			width: 1.2em;
			height: 1.4em;
			display: block;
		}
		${scopeSelector} .itmar_block_select > div a i::before,
		${scopeSelector} .itmar_block_select > div a i::after {
			content: "";
			display: block;
			width: 2px;
			height: 1.25em;
			position: absolute;
			left: 50%;
			top: 50%;
			background: rgb(153, 163, 186);
			border-radius: 1px;
		}
		${scopeSelector} .itmar_block_select > div a i::before {
			transform: translate(-50%, -50%) rotate(45deg);
		}
		${scopeSelector} .itmar_block_select > div a i::after {
			transform: translate(-50%, -50%) rotate(-45deg);
		}
		${scopeSelector} .itmar_block_select > div a.notShown {
			opacity: 0;
			transition: opacity 0.3s ease;
		}
		${scopeSelector} .itmar_block_select > div a.notShown::before {
			width: 28px;
			transition: width 0.45s cubic-bezier(0.87, -0.41, 0.19, 1.44) 0.2s;
		}
		${scopeSelector} .itmar_block_select > div a.notShown i {
			opacity: 0;
			transition: all 0.3s ease 0.3s;
		}
		${scopeSelector} .itmar_block_select > div a.notShown em {
			opacity: 0;
			transform: translate(-6px, 0);
			transition: all 0.4s ease 0.3s;
		}
		${scopeSelector} .itmar_block_select > div a.notShown.shown {
			opacity: 1;
			margin-top: 6px;
		}
		${scopeSelector} .itmar_block_select > div a.notShown.shown::before {
			width: 100%;
		}
		${scopeSelector} .itmar_block_select > div a.notShown.shown i,
		${scopeSelector} .itmar_block_select > div a.notShown.shown em {
			opacity: 1;
			transform: translate(0, 0);
		}
		${scopeSelector} .itmar_block_select > div a.remove::before {
			width: 28px;
			transition: width 0.4s cubic-bezier(0.87, -0.41, 0.19, 1.44) 0s;
		}
		${scopeSelector} .itmar_block_select > div a.remove i {
			opacity: 0;
			transition: all 0.3s ease 0s;
		}
		${scopeSelector} .itmar_block_select > div a.remove em {
			opacity: 0;
			transform: translate(-12px, 0);
			transition: all 0.4s ease 0s;
		}
		${scopeSelector} .itmar_block_select > div a.remove.disappear {
			opacity: 0;
			transition: opacity 0.5s ease 0s;
		}
		${scopeSelector} .itmar_block_select > ul {
			margin: 0;
			padding: 0;
			list-style: none;
			font-size: 0.8em;
			overflow: scroll;
			z-index: 1;
			position: relative;
			top: auto;
			left: 0;
			right: 0;
			visibility: hidden;
			opacity: 0;
			max-height: 0;
			border-radius: 8px;
			transform: translate(0, 20px) scale(0.8);
			transform-origin: 0 0;
			filter: drop-shadow(0 12px 20px rgba(22, 42, 90, 0.08));
			transition:
				all 0.4s ease,
				transform 0.4s cubic-bezier(0.87, -0.41, 0.19, 1.44),
				filter 0.3s ease 0.2s;
		}
		${scopeSelector} .itmar_block_select > ul li {
			color: ${optionColor};
			background: #fff;
			padding: 0.5em 0.7em 0.5em 1.7em;
			font-size: ${font_style_option?.default_fontSize};
			cursor: pointer;
			overflow: hidden;
			position: relative;
			transition:
				background 0.3s ease,
				color 0.3s ease,
				transform 0.3s ease 0.3s,
				opacity 0.5s ease 0.3s,
				border-radius 0.3s ease 0.3s;
		}
		${scopeSelector} .itmar_block_select > ul li:first-child {
			border-radius: 8px 8px 0 0;
		}
		${scopeSelector} .itmar_block_select > ul li:first-child:last-child,
		${scopeSelector} .itmar_block_select > ul li:last-child:first-child {
			border-radius: 8px;
		}
		${scopeSelector} .itmar_block_select > ul li:last-child {
			border-radius: 0 0 8px 8px;
		}
		${scopeSelector} .itmar_block_select > ul li:hover {
			background: ${hoverBgColor};
			color: #fff;
		}
		${scopeSelector} .itmar_block_select > ul li.beforeRemove {
			border-radius: 0 0 8px 8px;
		}
		${scopeSelector} .itmar_block_select > ul li.beforeRemove:first-child,
		${scopeSelector} .itmar_block_select > ul li.afterRemove:last-child {
			border-radius: 8px;
		}
		${scopeSelector} .itmar_block_select > ul li.afterRemove {
			border-radius: 8px 8px 0 0;
		}
		${scopeSelector} .itmar_block_select > ul li.remove {
			transform: scale(0);
			opacity: 0;
		}
		${scopeSelector} .itmar_block_select > ul li.remove::after {
			animation: ripple 0.4s ease-out;
		}
		${scopeSelector} .itmar_block_select > ul li.notShown {
			transform: scale(0);
			opacity: 0;
			transition:
				transform 0.35s ease,
				opacity 0.4s ease;
		}
		${scopeSelector} .itmar_block_select > ul li.notShown.show {
			transform: scale(1);
			opacity: 1;
		}
		${scopeSelector} .itmar_block_select.open > div {
			box-shadow: 0 4px 20px -1px rgba(22, 42, 90, 0.12);
		}
		${scopeSelector} .itmar_block_select.open .itmar_block_opener::after {
			top: 40%;
			transform: rotate(135deg);
		}
		${scopeSelector} .itmar_block_select.open > ul {
			transform: translate(0, 12px) scale(1);
			opacity: 1;
			visibility: visible;
			max-height: 30vh;
			overflow: hidden visible;
			filter: drop-shadow(0 16px 24px rgba(22, 42, 90, 0.16));
		}
		${scopeSelector} .itmar_block_selectSingle > div a:hover {
			cursor: auto;
		}
		${scopeSelector} .itmar_block_selectSingle > div a i {
			display: none;
		}

		@media (max-width: 767px) {
			${scopeSelector} {
				margin: ${space_prm(mobile_pos?.margin_value)};
				padding: ${space_prm(mobile_pos?.padding_value)};
				${alignMap[mobile_pos?.labelPos] || ""}
			}
			${scopeSelector} .itmar_block_select,
			${scopeSelector} .itmar_block_select > div,
			${scopeSelector} .itmar_block_select > ul li {
				font-size: ${font_style_option?.mobile_fontSize};
			}
		}

		${createLabelStyleCss(attributes, scopeSelector)}
	`;
};
