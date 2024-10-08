import styled, { css } from "styled-components";
import {
	radius_prm,
	space_prm,
	convertToScss,
	borderProperty,
} from "itmar-block-packages";

export default function StyleLabel({ attributes, children }) {
	return <StyledDiv attributes={attributes}>{children}</StyledDiv>;
}

const StyledDiv = styled.label`
	${({ attributes }) => {
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
		} = attributes;

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
