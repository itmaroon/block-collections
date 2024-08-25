import styled, { css } from "styled-components";
import {
	radius_prm,
	space_prm,
	convertToScss,
	borderProperty,
} from "itmar-block-packages";

export default function StyleTooltips({ attributes, tooltip, children }) {
	return (
		<StyledDiv attributes={attributes} tooltip={tooltip}>
			{children}
		</StyledDiv>
	);
}

const StyledDiv = styled.span.attrs((props) => ({
	"data-tooltip": props.tooltip,
}))`
	${({ attributes }) => {
		const {
			font_style,
			color,
			bgColor,
			bgGradient,
			border,
			borderRadius,
			padding,
		} = attributes;

		//単色かグラデーションかの選択
		const bgTooltipColor = bgColor || bgGradient;
		//斜体の設定
		const fontStyle_tooltip = font_style.isItalic ? "italic" : "normal";
		//角丸の設定
		const tooltip_radius_prm = radius_prm(borderRadius);
		//スペースの設定
		const default_padding_prm = space_prm(padding.default);
		const mobile_padding_prm = space_prm(padding.mobile);

		// 共通のスタイルをここで定義します
		const commonStyle = css`
			&::before,
			&::after {
				text-transform: none;
				font-size: ${font_style.default_fontSize};
				font-style: ${fontStyle_tooltip};
				line-height: 1;
				pointer-events: none;
				position: absolute;
				display: none;
				opacity: 0;
				left: 50%;
				transform: translate(-50%, -0.5em);
				@media (max-width: 767px) {
					font-size: ${font_style.mobile_fontSize};
				}
			}
			&::after {
				content: attr(data-tooltip);
				font-family: ${font_style.fontFamily};
				text-align: center;
				min-width: 3em;
				max-width: 21em;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				padding: ${default_padding_prm};
				border-radius: ${tooltip_radius_prm};
				box-shadow: 0 1em 2em -0.5em rgba(0, 0, 0, 0.35);
				background: ${bgTooltipColor};
				color: ${color};
				z-index: 1000; /* absurdity 2 */
				bottom: calc(100% + 4px);
				@media (max-width: 767px) {
					padding: ${mobile_padding_prm};
				}
			}
			&::before {
				content: "";
				border: 5px solid transparent; /* opinion 4 */
				z-index: 1001; /* absurdity 1 */
				bottom: 100%;
				border-bottom-width: 0;
				border-top-color: ${bgTooltipColor};
			}
			&:hover {
				&::before,
				&::after {
					display: block;
					animation: tooltips-vert 300ms ease-out forwards;
				}
			}

			/* KEYFRAMES */
			@keyframes tooltips-vert {
				to {
					opacity: 0.9;
					transform: translate(-50%, 0);
				}
			}

			@keyframes tooltips-horz {
				to {
					opacity: 0.9;
					transform: translate(0, -50%);
				}
			}
		`;

		// 共通のスタイルを組み合わせて返します
		return css`
			${commonStyle}
		`;
	}}
`;
