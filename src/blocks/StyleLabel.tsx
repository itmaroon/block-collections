import styled, { css } from "styled-components";
import {
	radius_prm,
	space_prm,
	convertToScss,
	borderProperty,
	cssValueToString,
} from "itmar-block-packages";
import type { ReactNode } from "react";
import type { LabelStyleAttributes } from "../shared/types";

interface StyleLabelProps {
	attributes: LabelStyleAttributes;
	children: ReactNode;
}

export default function StyleLabel({ attributes, children }: StyleLabelProps) {
	// 1. attributesの中から htmlFor とスタイル用を分ける
	const { htmlFor, ...styleConfig } = attributes;

	return (
		/* 2. $attrs という名前（Transient props）でスタイル用オブジェクトを渡す */
		<StyledDiv htmlFor={htmlFor} $attrs={styleConfig}>
			{children}
		</StyledDiv>
	);
}

const StyledDiv = styled.label`
	${({ $attrs }) => {
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
			isMobile,
			className,
		} = $attrs;

		//単色かグラデーションかの選択
		const bgLabelColor = bgColor_label || bgGradient_label;
		//斜体の設定
		const fontStyle_label = font_style_label.isItalic ? "italic" : "normal";
		//角丸の設定
		const label_radius_prm = radius_prm(radius_label);
		//スペースの設定
		const label_padding_prm = space_prm(padding_label);

		//インプットボックスとの距離
		const alignMap = {
			"top left": "margin-bottom",
			"top center": "margin-bottom",
			"top right": "margin-bottom",
			"center left": "margin-right",
			"center right": "margin-left",
			"bottom left": "margin-top",
			"bottom center": "margin-top",
			"bottom right": "margin-top",
		};
		const defaultMargin = `${alignMap[default_pos.labelPos]}: ${labelSpace};`;
		const mobileMargin = `${alignMap[mobile_pos.labelPos]}: ${labelSpace};`;
		//ボックスシャドーの設定
		const box_shadow_style =
			is_shadow && shadow_result ? convertToScss(shadow_result) : "";
		// 共通のスタイルをここで定義します
		const commonStyle = css`
			white-space: nowrap;
			background: ${bgLabelColor};
			border-radius: ${label_radius_prm};
			color: ${textColor_label};
			font-size: ${font_style_label.default_fontSize};
			font-family: ${font_style_label.fontFamily};
			font-weight: ${font_style_label.fontWeight};
			font-style: ${fontStyle_label};
			padding: ${label_padding_prm};
			${borderProperty(border_label)};
			${box_shadow_style};
			@media (max-width: 767px) {
				font-size: ${font_style_label.mobile_fontSize};
			}
			span {
				color: var(--wp--preset--color--accent-1);
			}
		`;

		// classNameに基づいて特定のスタイルを定義します
		let specificStyle = null;
		//スタイルのクラスを抽出
		const styleClass = className
			?.split(" ") // スペースで文字列を分割
			.find((cls) => cls.startsWith("is-style"));
		switch (styleClass) {
			case "is-style-line":
				specificStyle = css`
					position: absolute;
					width: fit-content;
					opacity: 0;
					left: calc(2em + 10px);
					pointer-events: none;
					bottom: 15px;
					z-index: 1;
					transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s;
				`;
				break;
			default:
				specificStyle = css`
					width: ${labelWidth};
					${defaultMargin}
					@media (max-width: 767px) {
						${mobileMargin}
					}
				`;
		}

		// 共通のスタイルを組み合わせて返します
		return css`
			${commonStyle}
			${specificStyle}
		`;
	}}
`;

const labelMarginPropertyMap = {
	"top left": "margin-bottom",
	"top center": "margin-bottom",
	"top right": "margin-bottom",
	"center left": "margin-right",
	"center right": "margin-left",
	"bottom left": "margin-top",
	"bottom center": "margin-top",
	"bottom right": "margin-top",
};

const createLabelMarginCss = (labelPos, labelSpace) => {
	const property = labelMarginPropertyMap[labelPos];
	return property ? `${property}: ${labelSpace};` : "";
};

const getStyleClass = (className) =>
	className?.split(" ").find((cls) => cls.startsWith("is-style"));

/**
 * フロントエンド用のラベルCSSを生成する。
 * styled-componentsの生成クラス名には依存しない。
 */
export const createLabelStyleCss = (
	attributes: LabelStyleAttributes,
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
		className,
	} = attributes;

	const bgLabelColor = bgColor_label || bgGradient_label || "transparent";
	const fontStyleLabel = font_style_label?.isItalic ? "italic" : "normal";
	const labelRadius = radius_prm(radius_label);
	const labelPadding = space_prm(padding_label);
	const labelBorder = cssValueToString(borderProperty(border_label));
	const boxShadowStyle =
		is_shadow && shadow_result
			? cssValueToString(convertToScss(shadow_result))
			: "";
	const styleClass = getStyleClass(className);

	const specificStyle =
		styleClass === "is-style-line"
			? `
				position: absolute;
				width: fit-content;
				opacity: 0;
				left: calc(2em + 10px);
				pointer-events: none;
				bottom: 15px;
				z-index: 1;
				transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s;
			`
			: `
				width: ${labelWidth || "auto"};
				${createLabelMarginCss(default_pos?.labelPos, labelSpace)}
			`;

	const mobileSpecificStyle =
		styleClass === "is-style-line"
			? ""
			: createLabelMarginCss(mobile_pos?.labelPos, labelSpace);

	return `
		${scopeSelector} label {
			white-space: nowrap;
			background: ${bgLabelColor};
			border-radius: ${labelRadius};
			color: ${textColor_label || "inherit"};
			font-size: ${font_style_label?.default_fontSize || "inherit"};
			font-family: ${font_style_label?.fontFamily || "inherit"};
			font-weight: ${font_style_label?.fontWeight || "inherit"};
			font-style: ${fontStyleLabel};
			padding: ${labelPadding};
			${labelBorder}
			${boxShadowStyle}
			${specificStyle}
		}
		${scopeSelector} label span {
			color: var(--wp--preset--color--accent-1);
		}

		@media (max-width: 767px) {
			${scopeSelector} label {
				font-size: ${
					font_style_label?.mobile_fontSize ||
					font_style_label?.default_fontSize ||
					"inherit"
				};
				${mobileSpecificStyle}
			}
		}
	`;
};
