import styled, { css } from "styled-components";
import {
	radius_prm,
	space_prm,
	convertToScss,
	borderProperty,
	Arrow,
	ShadowElm,
} from "itmar-block-packages";

export const StyleComp = ({ attributes, children }) => {
	return <StyledDiv attributes={attributes}>{children}</StyledDiv>;
};

const StyledDiv = styled.div`
	${({ attributes }) => {
		const {
			buttonType,
			displayType,
			font_style_label,
			pseudoInfo,
			default_pos,
			mobile_pos,
			labelColor,
			buttonColor,
			buttonGradient,
			radius_value,
			border_value,
			shadow_element,
			shadow_result,
			is_shadow,
			className,
		} = attributes;

		const button_type = buttonType === "button" ? "button" : "input";

		//単色かグラデーションかの選択
		const bgColor = buttonColor || buttonGradient;
		//斜体の設定
		const fontStyle_label = font_style_label.isItalic ? "italic" : "normal";
		//角丸の設定
		const button_radius_prm = radius_prm(radius_value);

		//スペースの設定
		const default_heading_margin_prm = space_prm(default_pos.margin_value);
		const default_heading_padding_prm = space_prm(default_pos.padding_value);
		const mobile_heading_margin_prm = space_prm(mobile_pos.margin_value);
		const mobile_heading_padding_prm = space_prm(mobile_pos.padding_value);

		//ボックスシャドーの設定
		const box_shadow_style =
			is_shadow && shadow_result ? convertToScss(shadow_result) : "";
		//ホバー時のスタイル
		let hover_shadow_style = "";
		if (is_shadow && shadow_result) {
			const hover_elm = ShadowElm({ ...shadow_element, embos: "dent" });
			hover_shadow_style = convertToScss(hover_elm.style);
		}
		//擬似要素
		const arrow = Arrow({ direction: pseudoInfo.option });

		// 共通のスタイルをここで定義します
		const commonStyle = css`
			${button_type} {
				width: ${default_pos.width};
				height: ${default_pos.height};
				margin: ${default_heading_margin_prm};
				padding: ${default_heading_padding_prm};
				background: ${bgColor};
				border-radius: ${button_radius_prm};
				${borderProperty(border_value)};
				display: flex;
				${box_shadow_style};
				font-size: ${font_style_label.default_fontSize};
				font-family: ${font_style_label.fontFamily};
				font-weight: ${font_style_label.fontWeight};
				font-style: ${fontStyle_label};
				color: ${labelColor};
				transition: box-shadow ease-in-out 0.5s;
				&:hover {
					cursor: pointer;
					${hover_shadow_style};
				}
				& figure {
					margin: 0;
					width: 100%;
					height: 100%;
					position: relative;
					& img {
						width: 100%;
						height: 100%;
						margin: 0;
					}
				}
				${displayType === "pseudo" ? arrow : null}

				@media (max-width: 767px) {
					width: ${mobile_pos.width};
					height: ${mobile_pos.height};
					margin: ${mobile_heading_margin_prm};
					padding: ${mobile_heading_padding_prm};
					font-size: ${font_style_label.mobile_fontSize};
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
