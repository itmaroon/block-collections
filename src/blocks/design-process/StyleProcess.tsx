import styled, { css } from "styled-components";
import {
	radius_prm,
	space_prm,
	convertToScss,
	borderProperty,
	cssValueToString,
} from "itmar-block-packages";
import type { ReactNode } from "react";
import type { FontStyle } from "../../shared/types";
import type { ProcessAttributes } from "./types";

interface StyleCompProps {
	attributes: ProcessAttributes;
	children: ReactNode;
}

export const StyleComp = ({ attributes, children }: StyleCompProps) => {
	return <StyledUL $attributes={attributes}>{children}</StyledUL>;
};

const StyledUL = styled.ul<{ $attributes: ProcessAttributes }>`
	${({ $attributes }) => {
		const {
			figure_blocks,
			bgColor_form,
			bgGradient_form,
			radius_form,
			border_form,
			default_pos,
			mobile_pos,
			font_style_num,
			textColor_num,
			bgColor_num,
			font_style_process,
			textColor_process,
			shadow_result,
			is_shadow,
			className,
		} = $attributes;

		//単色かグラデーションかの選択
		const bgFormColor = bgColor_form || bgGradient_form;
		//斜体の設定
		const fontStyle_num = font_style_num.isItalic ? "italic" : "normal";
		const fontStyle_process = font_style_process.isItalic ? "italic" : "normal";
		//角丸の設定
		const form_radius_prm = radius_prm(radius_form);
		//スペースの設定
		const default_form_margin_prm = space_prm(default_pos.margin_form);
		const default_form_padding_prm = space_prm(default_pos.padding_form);
		const mobile_form_margin_prm = space_prm(mobile_pos.margin_form);
		const mobile_form_padding_prm = space_prm(mobile_pos.padding_form);
		//ボックスシャドーの設定
		const box_shadow_style =
			is_shadow && shadow_result ? convertToScss(shadow_result) : "";

		// 共通のスタイルをここで定義します
		const commonStyle = css`
			list-style: none;
			overflow: hidden;
			counter-reset: step;
			position: relative;
			z-index: 10;
			margin: ${default_form_margin_prm};
			padding: ${default_form_padding_prm};
			background: ${bgFormColor};
			border-radius: ${form_radius_prm};
			${borderProperty(border_form)};
			${box_shadow_style};
			@media (max-width: 767px) {
				margin: ${mobile_form_margin_prm};
				padding: ${mobile_form_padding_prm};
			}
		`;
		const barStyle = css`
			li {
				color: ${textColor_process};
				text-transform: uppercase;
				font-size: ${font_style_process.default_fontSize};
				font-family: ${font_style_process.fontFamily};
				font-weight: ${font_style_process.fontWeight};
				font-style: ${fontStyle_process};
				width: ${Math.round(100 / figure_blocks.length)}%;
				float: left;
				position: relative;
				letter-spacing: 1px;
				text-align: center;
				@media (max-width: 767px) {
					font-size: ${font_style_process.mobile_fontSize};
					&::before {
						font-size: ${font_style_num.mobile_fontSize};
					}
					&::after {
						font-size: ${font_style_num.mobile_fontSize};
					}
				}

				&::before {
					content: counter(step);
					counter-increment: step;
					width: 1.5em;
					height: 1.5em;
					line-height: 1.3em;
					text-align: center;
					display: block;
					font-size: ${font_style_num.default_fontSize};
					font-family: ${font_style_num.fontFamily};
					font-weight: ${font_style_num.fontWeight};
					font-style: ${fontStyle_num};
					color: ${textColor_num};
					background: white;
					border: ${textColor_num} solid 1px;
					border-radius: 50%;
					margin: 0 auto;
				}

				&::after {
					content: "";
					width: 100%;
					height: 2px;
					position: absolute;
					left: -50%;
					font-size: ${font_style_num.default_fontSize};
					top: 0.75em;
					background-image: linear-gradient(
						to right,
						${textColor_num} 50%,
						${bgColor_num} 50%
					);
					background-position: 0 0;
					background-size: 200% auto;
					transition: all 1s;
					z-index: -1;
					/*put it behind the numbers*/
				}

				&:first-child {
					&::after {
						/*connector not needed before the first step*/
						content: none;
					}
				}

				&.ready {
					&::before {
						background: ${bgColor_num};
						color: white;
						border: none;
					}

					&::after {
						background-position: -100% 0;
						color: #fff;
					}
				}
			}
		`;

		const cardStyle = css`
			display: flex;
			li {
				color: ${textColor_process};
				text-transform: uppercase;
				font-size: ${font_style_process.default_fontSize};
				font-family: ${font_style_process.fontFamily};
				font-weight: ${font_style_process.fontWeight};
				font-style: ${fontStyle_process};
				width: ${Math.round(80 / figure_blocks.length)}%;
				height: 3em;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				line-height: 1.2;
				position: relative;
				letter-spacing: 1px;
				padding: 0 1em 0 3em;
				text-align: center;
				border: solid 2px ${textColor_process};
				border-radius: 15px;
				transition: all 0.3s ease 0s;
				background-image: linear-gradient(
					to right,
					rgba(255, 255, 255) 50%,
					${bgColor_num} 50%
				);
				background-position: 0 0;
				background-size: 200% auto;
				&:not(:first-child) {
					margin-left: 2em;
				}
				@media (max-width: 767px) {
					font-size: ${font_style_process.mobile_fontSize};
					padding-top: 15px;
					padding-right: 0.5em;
					padding-left: 0.5em;
				}

				&::before {
					position: absolute;
					content: counter(step);
					counter-increment: step;
					left: 0.75em;
					top: 50%;
					transform: translateY(-50%);
					width: 1.5em;
					height: 1.5em;
					line-height: 1.3em;
					text-align: center;
					display: block;
					font-size: ${font_style_num.default_fontSize};
					font-family: ${font_style_num.fontFamily};
					font-weight: ${font_style_num.fontWeight};
					font-style: ${fontStyle_num};
					color: ${textColor_num};
					background: white;
					border: ${textColor_num} solid 1px;
					border-radius: 50%;
					margin: 0 auto;
					@media (max-width: 767px) {
						font-size: ${font_style_num.mobile_fontSize};
						left: 5px;
						width: 1em;
						height: 1em;
						line-height: 0.9em;
						top: 5px;
						left: 50%;
						transform: translateX(-50%);
					}
				}

				&::after {
					content: " ";
					position: absolute;
					font-size: ${font_style_process.default_fontSize};
					top: 50%;
					transform: translateY(-50%);
					left: -25px;
					width: 0;
					height: 0;
					border-style: solid;
					border-top: 1.5em solid transparent;
					border-bottom: 1.5em solid transparent;
					border-left: 1em solid ${textColor_process};
					border-right: 0;
					@media (max-width: 767px) {
						font-size: ${font_style_process.mobile_fontSize};
						left: -20px;
					}
				}

				&:first-child {
					&::after {
						/*connector not needed before the first step*/
						content: none;
					}
				}

				&.ready {
					background-image: none;
					background-color: ${bgColor_num};
					border-color: transparent;
					color: #fff;
					&::before {
						background: #fff;
						color: ${bgColor_num};
						border: none;
					}

					&::after {
						border-left: 1em solid ${bgColor_num};
					}
				}
			}
		`;

		const optionStyle =
			className === "is-style-card" ? cardStyle : barStyle;
		// 共通のスタイルを組み合わせて返します
		return css`
			${commonStyle}
			${optionStyle}
		`;
	}}
`;

const resolveFontStyle = (fontStyle: FontStyle): string =>
	fontStyle?.isItalic ? "italic" : "normal";

const createCommonCss = (
	attributes: ProcessAttributes,
	scopeSelector: string,
): string => {
	const {
		bgColor_form,
		bgGradient_form,
		radius_form,
		border_form,
		default_pos,
		mobile_pos,
		shadow_result,
		is_shadow,
	} = attributes;

	const bgFormColor = bgColor_form || bgGradient_form || "transparent";
	const formRadius = radius_prm(radius_form);
	const border = cssValueToString(borderProperty(border_form));
	const shadow =
		is_shadow && shadow_result ? cssValueToString(convertToScss(shadow_result)) : "";

	return `
		${scopeSelector} {
			list-style: none;
			overflow: hidden;
			counter-reset: step;
			position: relative;
			z-index: 10;
			margin: ${space_prm(default_pos?.margin_form)};
			padding: ${space_prm(default_pos?.padding_form)};
			background: ${bgFormColor};
			border-radius: ${formRadius};
			${border}
			${shadow}
		}

		@media (max-width: 767px) {
			${scopeSelector} {
				margin: ${space_prm(mobile_pos?.margin_form)};
				padding: ${space_prm(mobile_pos?.padding_form)};
			}
		}
	`;
};

const createBarCss = (
	attributes: ProcessAttributes,
	scopeSelector: string,
): string => {
	const {
		figure_blocks,
		font_style_num,
		textColor_num,
		bgColor_num,
		font_style_process,
		textColor_process,
	} = attributes;

	const itemWidth = Math.round(100 / Math.max(figure_blocks?.length || 1, 1));
	const fontStyleNum = resolveFontStyle(font_style_num);
	const fontStyleProcess = resolveFontStyle(font_style_process);

	return `
		${scopeSelector} li {
			list-style: none;
			color: ${textColor_process};
			text-transform: uppercase;
			font-size: ${font_style_process?.default_fontSize};
			font-family: ${font_style_process?.fontFamily};
			font-weight: ${font_style_process?.fontWeight};
			font-style: ${fontStyleProcess};
			width: ${itemWidth}%;
			float: left;
			position: relative;
			letter-spacing: 1px;
			text-align: center;
		}
		${scopeSelector} li::before {
			position: relative;
			z-index: 1;
			content: counter(step);
			counter-increment: step;
			width: 1.5em;
			height: 1.5em;
			line-height: 1.3em;
			text-align: center;
			display: block;
			font-size: ${font_style_num?.default_fontSize};
			font-family: ${font_style_num?.fontFamily};
			font-weight: ${font_style_num?.fontWeight};
			font-style: ${fontStyleNum};
			color: ${textColor_num};
			background: white;
			border: ${textColor_num} solid 1px;
			border-radius: 50%;
			margin: 0 auto;
		}
		${scopeSelector} li::after {
			content: "";
			width: 100%;
			height: 2px;
			position: absolute;
			left: -50%;
			font-size: ${font_style_num?.default_fontSize};
			top: 0.75em;
			background-image: linear-gradient(
				to right,
				${textColor_num} 50%,
				${bgColor_num} 50%
			);
			background-position: 0 0;
			background-size: 200% auto;
			transition: all 1s;
			z-index: 0;
		}
		${scopeSelector} li:first-child::after {
			content: none;
		}
		${scopeSelector} li.ready::before {
			background: ${bgColor_num};
			color: white;
			border: none;
		}
		${scopeSelector} li.ready::after {
			background-position: -100% 0;
			color: #fff;
		}

		@media (max-width: 767px) {
			${scopeSelector} li {
				font-size: ${font_style_process?.mobile_fontSize};
			}
			${scopeSelector} li::before,
			${scopeSelector} li::after {
				font-size: ${font_style_num?.mobile_fontSize};
			}
		}
	`;
};

const createCardCss = (
	attributes: ProcessAttributes,
	scopeSelector: string,
): string => {
	const {
		figure_blocks,
		font_style_num,
		textColor_num,
		bgColor_num,
		font_style_process,
		textColor_process,
	} = attributes;

	const itemWidth = Math.round(80 / Math.max(figure_blocks?.length || 1, 1));
	const fontStyleNum = resolveFontStyle(font_style_num);
	const fontStyleProcess = resolveFontStyle(font_style_process);

	return `
		${scopeSelector} {
			display: flex;
		}
		${scopeSelector} li {
			list-style: none;
			color: ${textColor_process};
			text-transform: uppercase;
			font-size: ${font_style_process?.default_fontSize};
			font-family: ${font_style_process?.fontFamily};
			font-weight: ${font_style_process?.fontWeight};
			font-style: ${fontStyleProcess};
			width: ${itemWidth}%;
			height: 3em;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			line-height: 1.2;
			position: relative;
			letter-spacing: 1px;
			padding: 0 1em 0 3em;
			text-align: center;
			border: solid 2px ${textColor_process};
			border-radius: 15px;
			transition: all 0.3s ease 0s;
			background-image: linear-gradient(
				to right,
				rgba(255, 255, 255) 50%,
				${bgColor_num} 50%
			);
			background-position: 0 0;
			background-size: 200% auto;
		}
		${scopeSelector} li:not(:first-child) {
			margin-left: 2em;
		}
		${scopeSelector} li::before {
			position: absolute;
			content: counter(step);
			counter-increment: step;
			left: 0.75em;
			top: 50%;
			transform: translateY(-50%);
			width: 1.5em;
			height: 1.5em;
			line-height: 1.3em;
			text-align: center;
			display: block;
			font-size: ${font_style_num?.default_fontSize};
			font-family: ${font_style_num?.fontFamily};
			font-weight: ${font_style_num?.fontWeight};
			font-style: ${fontStyleNum};
			color: ${textColor_num};
			background: white;
			border: ${textColor_num} solid 1px;
			border-radius: 50%;
			margin: 0 auto;
		}
		${scopeSelector} li::after {
			content: " ";
			position: absolute;
			font-size: ${font_style_process?.default_fontSize};
			top: 50%;
			transform: translateY(-50%);
			left: -25px;
			width: 0;
			height: 0;
			border-style: solid;
			border-top: 1.5em solid transparent;
			border-bottom: 1.5em solid transparent;
			border-left: 1em solid ${textColor_process};
			border-right: 0;
		}
		${scopeSelector} li:first-child::after {
			content: none;
		}
		${scopeSelector} li.ready {
			background-image: none;
			background-color: ${bgColor_num};
			border-color: transparent;
			color: #fff;
		}
		${scopeSelector} li.ready::before {
			background: #fff;
			color: ${bgColor_num};
			border: none;
		}
		${scopeSelector} li.ready::after {
			border-left: 1em solid ${bgColor_num};
		}

		@media (max-width: 767px) {
			${scopeSelector} li {
				font-size: ${font_style_process?.mobile_fontSize};
				padding-top: 15px;
				padding-right: 0.5em;
				padding-left: 0.5em;
			}
			${scopeSelector} li::before {
				font-size: ${font_style_num?.mobile_fontSize};
				left: 50%;
				width: 1em;
				height: 1em;
				line-height: 0.9em;
				top: 5px;
				transform: translateX(-50%);
			}
			${scopeSelector} li::after {
				font-size: ${font_style_process?.mobile_fontSize};
				left: -20px;
			}
		}
	`;
};

/**
 * フロントエンド用のスコープ付きCSSを生成する。
 * React、renderToString、styled-componentsのクラス名には依存しない。
 */
export const createProcessStyleCss = (
	attributes: ProcessAttributes,
	scopeSelector: string,
): string => {
	const optionStyle =
		attributes.className === "is-style-card"
			? createCardCss(attributes, scopeSelector)
			: createBarCss(attributes, scopeSelector);

	return `
		${createCommonCss(attributes, scopeSelector)}
		${optionStyle}
	`;
};
