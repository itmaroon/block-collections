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
			font_style_input,
			default_pos,
			mobile_pos,
			inputColor,
			inputBgColor,
			radius_box,
			border_box,
			radius_input,
			border_input,
			shadow_result_box,
			is_shadow_box,
			shadow_result_input,
			is_shadow_input,
			buttonColor,
			buttonBgColor,
			shadow_select,
			shadow_result_select,
			is_shadow_select,
			color_select,
			bgColor_select,
			bgGradient_select,
			className,
		} = attributes;

		//斜体の設定
		const fontStyle_input = font_style_input.isItalic ? "italic" : "normal";
		//角丸の設定
		const box_radius_prm = radius_prm(radius_box);
		const input_radius_prm = radius_prm(radius_input);
		//スペースの設定
		const default_margin_prm = space_prm(default_pos.margin);
		const default_padding_prm = space_prm(default_pos.padding);
		const mobile_margin_prm = space_prm(mobile_pos.margin);
		const mobile_padding_prm = space_prm(mobile_pos.padding);
		const default_margin_input_prm = space_prm(default_pos.margin_input);
		const default_padding_input_prm = space_prm(default_pos.padding_input);
		const mobile_margin_input_prm = space_prm(mobile_pos.margin_input);
		const mobile_padding_input_prm = space_prm(mobile_pos.padding_input);
		//横並びスタイル
		const horizenStyle = css`
			display: flex;
			flex-direction: row;
		`;

		//縦並びスタイル
		const verticalStyle = css`
			display: flex;
			flex-direction: column;
		`;

		//スタイルの選択
		const directionMap = {
			horizen: horizenStyle,
			vertical: verticalStyle,
		};

		//ボックスシャドーの設定
		const box_shadow_style =
			is_shadow_box && shadow_result_box
				? convertToScss(shadow_result_box)
				: "";
		const input_shadow_style =
			is_shadow_input && shadow_result_input
				? convertToScss(shadow_result_input)
				: "";
		const select_shadow_style =
			is_shadow_select && shadow_result_select
				? convertToScss(shadow_result_select)
				: "";

		// 共通のスタイルをここで定義します
		const commonStyle = css`
			${directionMap[default_pos.direction] || null}
			flex-wrap:${default_pos.wrap ? "wrap" : null};
			justify-content: ${default_pos.inner_align};
			margin: ${default_margin_prm};
			padding: ${default_padding_prm};
			${borderProperty(border_box)};
			border-radius: ${box_radius_prm};
			${box_shadow_style};

			@media (max-width: 767px) {
				${directionMap[mobile_pos.direction] || null}
				flex-wrap:${mobile_pos.wrap ? "wrap" : null};
				justify-content: ${mobile_pos.inner_align};
				margin: ${mobile_margin_prm};
				padding: ${mobile_padding_prm};
			}

			label {
				display: flex;
				align-items: center;
				margin: ${default_margin_input_prm};
				padding: ${default_padding_input_prm};
				${borderProperty(border_input)};
				border-radius: ${input_radius_prm};
				background-color: ${inputBgColor};
				${input_shadow_style};
				@media (max-width: 767px) {
					margin: ${mobile_margin_input_prm};
					padding: ${mobile_padding_input_prm};
				}
				span,
				button {
					font-size: ${font_style_input.default_fontSize};
					font-family: ${font_style_input.fontFamily};
					font-weight: ${font_style_input.fontWeight};
					font-style: ${fontStyle_input};
					color: ${inputColor};
					margin: 0;
					line-height: 1.2;
					position: relative;
					display: inline-block;
					box-sizing: border-box;
					transition: border-color ease 0.2s;
					cursor: pointer;
					@media (max-width: 767px) {
						font-size: ${font_style_input.mobile_fontSize};
					}
				}
				button {
					text-align: center;
					margin: 0 auto;
					background-color: transparent;
					border: none;
				}
			}
		`;

		// classNameに基づいて特定のスタイルを定義します
		let specificStyle = null;
		switch (className) {
			case "is-style-button":
				specificStyle = css`
					label {
						transition:
							transform 300ms ease,
							box-shadow ease-in-out 0.5s;
						&.checked {
							background: ${bgColor_select};
							${select_shadow_style};
							span {
								color: ${color_select};
							}
						}
						&:hover {
							transform: scale(1.1, 1.1);
							${select_shadow_style};
						}
					}
					input[type="radio"] {
						display: none;
					}
				`;
				break;
			default:
				specificStyle = css`
					label {
						display: flex;

						input {
							-webkit-appearance: none;
							position: relative;
							display: block;
							margin: 10px;
							width: ${default_pos.button_scale};
							height: ${default_pos.button_scale};
							border-radius: 50%;
							cursor: pointer;
							vertical-align: middle;
							box-shadow:
								hsla(0, 0%, 100%, 0.15) 0 1px 1px,
								inset hsla(0, 0%, 0%, 0.5) 0 0 0 1px;
							background-color: ${buttonBgColor};
							background-image: -webkit-radial-gradient(
								hsla(200, 100%, 90%, 1) 0%,
								${buttonColor} 30%,
								hsla(200, 100%, 60%, 0.3) 38%,
								hsla(200, 100%, 30%, 0) 70%
							);
							background-repeat: no-repeat;
							-webkit-transition:
								background-position 0.15s cubic-bezier(0.8, 0, 1, 1),
								-webkit-transform 0.25s cubic-bezier(0.8, 0, 1, 1);
							outline: none;
							@media (max-width: 767px) {
								width: ${mobile_pos.button_scale};
								height: ${mobile_pos.button_scale};
							}
						}

						input:checked {
							-webkit-transition:
								background-position 0.2s 0.15s cubic-bezier(0, 0, 0.2, 1),
								-webkit-transform 0.25s cubic-bezier(0, 0, 0.2, 1);
						}

						input:active {
							-webkit-transform: scale(1.5);
							-webkit-transition: -webkit-transform 0.1s
								cubic-bezier(0, 0, 0.2, 1);
						}

						input {
							background-size: 0;
						}

						&.ready {
							input {
								background-size: 100%;
							}
						}

						&.check_prev {
							input {
								${default_pos.direction === "horizen"
									? "background-position: 24px 0;"
									: "background-position: 0 24px;"}
								@media (max-width: 767px) {
									${mobile_pos.direction === "horizen"
										? "background-position: 24px 0;"
										: "background-position: 0 24px;"}
								}
							}
						}

						&.checked {
							input:checked {
								background-position: 0 0;
								&::before {
									opacity: 0;
								}
							}
						}

						&.check_next {
							input {
								${default_pos.direction === "horizen"
									? "background-position: -24px 0;"
									: "background-position: 0 -24px;"}
								@media (max-width: 767px) {
									${mobile_pos.direction === "horizen"
										? "background-position: -24px 0;"
										: "background-position: 0 -24px;"}
								}
							}
						}

						span {
							display: block;
							${default_pos.direction === "horizen"
								? "padding-right: 1em;"
								: "padding-left: 1em;"}
							@media (max-width: 767px) {
								${mobile_pos.direction === "horizen"
									? "padding-right: 1em;"
									: "padding-left: 1em;"}
							}
							line-height: 2.5em;
						}
						button {
							line-height: 2.5em;
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
