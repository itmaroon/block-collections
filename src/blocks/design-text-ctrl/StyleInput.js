import styled, { css } from "styled-components";
import {
	radius_prm,
	space_prm,
	convertToScss,
	borderProperty,
} from "itmar-block-packages";

//配置場所
const alignMap = {
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
	"bottom center": "display: flex;flex-direction: column;align-items: center;",
	"bottom right": "display: flex;flex-direction: column;align-items: flex-end;",
};

export const StyleComp = ({ attributes, children }) => {
	return <StyledDiv attributes={attributes}>{children}</StyledDiv>;
};

const StyledDiv = styled.div`
	${({ attributes }) => {
		const {
			focusColor,
			bgColor,
			font_style_input,
			bgColor_input,
			bgGradient_input,
			textColor_input,
			radius_input,
			border_input,
			default_pos,
			mobile_pos,
			shadow_result,
			is_shadow,
			className,
		} = attributes;

		//単色かグラデーションかの選択
		const bgInputColor = bgColor_input || bgGradient_input;

		//斜体の設定
		const fontStyle_input = font_style_input.isItalic ? "italic" : "normal";

		//角丸の設定
		const input_radius_prm = radius_prm(radius_input);

		//スペースの設定
		const default_form_margin_prm = space_prm(default_pos.margin_input);
		const default_form_padding_prm = space_prm(default_pos.padding_input);
		const mobile_form_margin_prm = space_prm(mobile_pos.margin_input);
		const mobile_form_padding_prm = space_prm(mobile_pos.padding_input);

		//ボックスシャドーの設定
		const box_shadow_style =
			is_shadow && shadow_result ? convertToScss(shadow_result) : "";

		// 共通のスタイルをここで定義します
		const commonStyle = css`
			padding: ${default_form_padding_prm};
			margin: ${default_form_margin_prm};
			background: ${bgColor};
			position: relative;
			@media (max-width: 767px) {
				margin: ${mobile_form_margin_prm};
				padding: ${mobile_form_padding_prm};
			}
			input,
			textarea {
				flex-grow: 1;
				background: ${bgInputColor};
				border-radius: ${input_radius_prm};
				color: ${textColor_input};
				font-size: ${font_style_input.default_fontSize};
				font-family: ${font_style_input.fontFamily};
				font-weight: ${font_style_input.fontWeight};
				font-style: ${fontStyle_input};
				@media (max-width: 767px) {
					font-size: ${font_style_input.mobile_fontSize};
				}
				&::placeholder {
					color: var(--wp--preset--color--placeholder);
				}
			}
			textarea {
				min-height: 60px;
				box-sizing: border-box;
				padding: 6px 10px;
			}
		`;

		// classNameに基づいて特定のスタイルを定義します
		let specificStyle = null;
		switch (className) {
			case "is-style-line":
				specificStyle = css`
					display: flex;
					height: auto;
					${box_shadow_style};
					input,
					textarea {
						background-color: transparent;
						outline: none;
						padding: 0 8px;
						border-style: solid;
						border-color: ${bgColor_input};
						border-width: 0px 0px 2px 0px;
						box-shadow: none;
						transition: border-color 0.45s ease 0s;
						transform: translateY(1em);

						&:focus {
							box-shadow: none;
							border-color: ${focusColor};
							~ label {
								opacity: 1;
								z-index: 1;
								top: -0.3em;
								font-size: 0.8em;
							}
							~ label {
								color: ${focusColor};
							}
						}
						&:not(.empty) ~ label {
							opacity: 1;
							z-index: 1;
							top: -0.3em;
							font-size: 0.8em;
						}
					}
					textarea {
						padding: 8px 10px;
					}
				`;
				break;
			default:
				specificStyle = css`
					${alignMap[default_pos.labelPos]}
					@media (max-width: 767px) {
						${alignMap[mobile_pos.labelPos]}
					}
					input,
					textarea {
						${borderProperty(border_input)};
						${box_shadow_style};
						transition: box-shadow 0.45s ease 0s;
						&:focus {
							outline: none;
							box-shadow: 0 0 5px ${focusColor};
						}
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
