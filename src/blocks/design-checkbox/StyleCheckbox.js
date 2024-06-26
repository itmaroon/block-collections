import styled, { css } from "styled-components";
import {
	radius_prm,
	space_prm,
	convertToScss,
	borderProperty,
} from "itmar-block-packages";

export const StyleComp = ({ attributes, children }) => {
	return <StyledDiv attributes={attributes}>{children}</StyledDiv>;
};

const StyledDiv = styled.div`
	${({ attributes }) => {
		const {
			font_style_label,
			default_pos,
			mobile_pos,
			bgColor_form,
			labelColor,
			boxColor,
			boxBgColor,
			radius_heading,
			border_heading,
			shadow_result,
			is_shadow,
			className,
		} = attributes;

		//斜体の設定
		const fontStyle_label = font_style_label.isItalic ? "italic" : "normal";
		//角丸の設定
		const heading_radius_prm = radius_prm(radius_heading);
		//スペースの設定
		const default_heading_margin_prm = space_prm(default_pos.margin_value);
		const default_heading_padding_prm = space_prm(default_pos.padding_value);
		const mobile_heading_margin_prm = space_prm(mobile_pos.margin_value);
		const mobile_heading_padding_prm = space_prm(mobile_pos.padding_value);

		//ボックスシャドーの設定
		const box_shadow_style =
			is_shadow && shadow_result ? convertToScss(shadow_result) : "";

		// 共通のスタイルをここで定義します
		const commonStyle = css`
			margin: ${default_heading_margin_prm};
			padding: ${default_heading_padding_prm};
			background: ${bgColor_form};
			border-radius: ${heading_radius_prm};
			${borderProperty(border_heading)};
			display: flex;
			${box_shadow_style};
			@media (max-width: 767px) {
				margin: ${mobile_heading_margin_prm};
				padding: ${mobile_heading_padding_prm};
			}
			input[type="checkbox"] {
				display: none;
			}
			div {
				font-size: ${font_style_label.default_fontSize};
				font-family: ${font_style_label.fontFamily};
				font-weight: ${font_style_label.fontWeight};
				font-style: ${fontStyle_label};
				color: ${labelColor};
				margin: 0;
				line-height: 1.2;
				@media (max-width: 767px) {
					font-size: ${font_style_label.mobile_fontSize};
				}
			}

			@keyframes dothabottomcheck {
				0% {
					height: 0;
				}
				100% {
					height: 0.5em;
				}
			}

			@keyframes dothatopcheck {
				0% {
					height: 0;
				}
				50% {
					height: 0;
				}
				100% {
					height: 1.2em;
				}
			}

			label {
				display: flex;
				span {
					font-size: ${font_style_label.default_fontSize};
					border: 0.2em solid var(--wp--preset--color--background);
					height: 1.2em;
					width: 1.2em;
					background-color: transparent;
					border-radius: 5px;
					position: relative;
					display: inline-block;
					box-sizing: border-box;
					transition: border-color ease 0.2s;
					margin-right: 1em;
					cursor: pointer;
					@media (max-width: 767px) {
						font-size: ${font_style_label.mobile_fontSize};
					}

					&::before,
					&::after {
						box-sizing: border-box;
						position: absolute;
						height: 0;
						width: 0.2em;
						background-color: ${boxBgColor};
						display: inline-block;

						transform-origin: left top;
						border-radius: 5px;
						content: " ";

						transition: opacity ease 0.5s;
					}

					&::before {
						top: 0.72em;
						left: 0.41em;

						transform: rotate(-135deg);
					}

					&::after {
						top: 0.37em;
						left: 0.05em;
						transform: rotate(-45deg);
					}
				}

				input[type="checkbox"]:checked + span {
					border-color: ${boxBgColor};

					&::after {
						height: 0.5em;
						animation: dothabottomcheck 0.2s ease 0s forwards;
					}

					&::before {
						height: 1.2em;
						animation: dothatopcheck 0.4s ease 0s forwards;
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
