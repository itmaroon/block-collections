import styled, { css } from "styled-components";
import {
	width_prm,
	height_prm,
	max_width_prm,
	align_prm,
	position_prm,
	space_prm,
	convertToScss,
	anime_comp,
} from "itmar-block-packages";

export const StyleComp = ({ attributes, isMenuOpen, children }) => {
	const swiperParallaxAttributes =
		attributes.parallax_obj != null
			? {
					[`data-swiper-parallax-${attributes.parallax_obj.type}`]: `${
						attributes.parallax_obj.scale
					}${attributes.parallax_obj.unit === "%" ? "%" : ""}`,
			  }
			: {};
	const content = (
		<StyledDiv
			{...swiperParallaxAttributes}
			attributes={{ ...attributes }}
			className={`${isMenuOpen ? "open" : ""} ${
				attributes.is_submenu ? "sub_menu" : ""
			}`}
		>
			{children}
		</StyledDiv>
	);

	return attributes.is_swiper ? (
		<div className="swiper-slide">{content}</div>
	) : (
		content
	);
};

const StyledDiv = styled.div`
	${({ attributes }) => {
		const {
			positionType,
			heightValue,
			default_pos,
			mobile_pos,
			shadow_result,
			is_shadow,
			is_moveable,
			position,
			is_menu,
			is_submenu,
			has_submenu,
			anime_prm,
		} = attributes;

		//スペースの設定
		const default_margin_prm = space_prm(default_pos.margin);
		const mobile_margin_prm = space_prm(mobile_pos.margin);
		const default_padding_prm = space_prm(default_pos.padding);
		const mobile_padding_prm = space_prm(mobile_pos.padding);
		const default_content_padding_prm = space_prm(default_pos.padding_content);
		const mobile_contnt_padding_prm = space_prm(mobile_pos.padding_content);
		//ブロック幅
		const default_width_style = width_prm(
			default_pos.width_val,
			default_pos.free_val,
		);
		const mobile_width_style = width_prm(
			mobile_pos.width_val,
			default_pos.free_val,
		);
		const default_max_width_style = max_width_prm(
			default_pos.width_val,
			default_pos.free_val,
		);
		const mobile_max_width_style = max_width_prm(
			mobile_pos.width_val,
			default_pos.free_val,
		);
		//ブロックの高さ
		const height_style = height_prm(heightValue);
		//ブロックの配置
		const default_block_align = align_prm(default_pos.outer_align);
		const mobile_block_align = align_prm(mobile_pos.outer_align);
		//シャドースタイル
		const box_shadow_style =
			is_shadow && shadow_result ? convertToScss(shadow_result) : "";
		//ブロックの位置
		const default_block_position = position_prm(
			default_pos.posValue,
			positionType,
		);
		const mobile_block_position = position_prm(
			mobile_pos.posValue,
			positionType,
		);
		//位置調整
		const tranceform = is_moveable
			? `transform: translate(${position.x}, ${position.y});`
			: "";
		//オーバーフロー
		const over_flow = has_submenu ? "visible" : "scroll";

		// 共通のスタイルをここで定義します
		const commonStyle = css`
			position: ${positionType};
			${default_block_position}
			margin: ${default_margin_prm};
			padding: ${default_padding_prm};
			${is_menu &&
			css`
				z-index: 100;
			`}
			${is_submenu ? default_width_style : default_max_width_style}
      ${height_style}
      ${default_block_align}
      align-self: ${default_pos.outer_vertical};
			@media (max-width: 767px) {
				${mobile_block_position}
				margin: ${mobile_margin_prm};
				padding: ${mobile_padding_prm};
				${is_submenu ? mobile_width_style : mobile_max_width_style}
				${mobile_block_align}
        ${is_menu &&
				css`
					position: fixed !important;
					top: 0;
					left: 0;
					margin-top: 0;
					transform: translateX(-100%);
					transition: all 0.5s ease 0s;
					z-index: 120;
					height: 100vh;
					width: 80% !important;
					background-color: var(--wp--preset--color--content-back);
					> div {
						height: 100%;
						> .group_contents {
							height: 100%;
						}
					}

					&.open {
						transform: translateX(0);
					}

					&.sub_menu {
						position: relative !important;
						transform: translateX(0);
						width: auto !important;
						height: auto;
					}
				`}
			}
			> div {
				${tranceform}
				>.group_contents {
					${anime_comp(anime_prm)}
					${box_shadow_style};
					padding: ${default_content_padding_prm};
					@media (max-width: 767px) {
						padding: ${mobile_contnt_padding_prm};
						max-height: 90vh;
						overflow-y: ${over_flow};
					}
				}
			}
		`;

		//横並びスタイル
		const horizenStyle = css`
			> div {
				> .group_contents {
					display: flex;
					flex-direction: ${!default_pos.reverse ? "row" : "row-reverse"};
					justify-content: ${default_pos.inner_align};
					> div {
						margin: 0;
					}
					@media (max-width: 767px) {
						flex-direction: ${!mobile_pos.reverse ? "row" : "row-reverse"};
						justify-content: ${mobile_pos.inner_align};
					}
				}
			}
		`;

		//縦並びスタイル
		const verticalStyle = css`
			> div {
				> .group_contents {
					display: flex;
					flex-direction: ${!default_pos.reverse ? "column" : "column-reverse"};
					justify-content: ${default_pos.inner_align};
					> div {
						margin: 0;
					}
					@media (max-width: 767px) {
						justify-content: ${mobile_pos.inner_align};
					}
				}
			}
		`;

		//グリッドスタイル
		const createNthChildStyles = (numItems) => {
			let styles = "";
			if (numItems) {
				numItems.forEach((element, index) => {
					if (element.startCell && element.endCell) {
						// 各座標の最小値と最大値を計算
						const minCol = Math.min(
							element.startCell.colInx,
							element.endCell.colInx,
						);
						const maxCol = Math.max(
							element.startCell.colInx,
							element.endCell.colInx,
						);
						const minRow = Math.min(
							element.startCell.rowInx,
							element.endCell.rowInx,
						);
						const maxRow = Math.max(
							element.startCell.rowInx,
							element.endCell.rowInx,
						);

						const verPos =
							element.vertAlign === "middle"
								? "center"
								: element.vertAlign === "lower"
								? "end"
								: "start";
						styles += `
            &:nth-child(${index + 1}) {
              grid-column: ${minCol + 1} / ${maxCol + 2};
              grid-row: ${minRow + 1} / ${maxRow + 2};
              align-self: ${verPos};
              justify-self: ${element.latAlign};
            }
          `;
					}
				});
			}

			return styles;
		};

		const gridStyle = css`
			> div {
				> .group_contents {
					display: grid;
					grid-template-columns: ${default_pos.grid_info?.colUnit?.join(" ")};
					grid-template-rows: ${default_pos.grid_info?.rowUnit?.join(" ")};
					gap: ${default_pos.grid_info?.rowGap} ${default_pos.grid_info?.colGap};
					> div,
					> figure {
						${createNthChildStyles(default_pos.grid_info?.gridElms)}
						margin:0;
					}

					@media (max-width: 767px) {
						grid-template-columns: ${mobile_pos.grid_info?.colUnit?.join(" ")};
						grid-template-rows: ${mobile_pos.grid_info?.rowUnit?.join(" ")};
						gap: ${mobile_pos.grid_info?.rowGap} ${mobile_pos.grid_info?.colGap};
						> div,
						> figure {
							${createNthChildStyles(mobile_pos.grid_info?.gridElms)}
						}
					}
				}
			}
		`;

		//スタイルの選択
		const cssMap = {
			horizen: horizenStyle,
			vertical: verticalStyle,
			grid: gridStyle,
		};

		const optionStyle = cssMap[default_pos.direction] || null;
		const mobileOptionStyle = cssMap[mobile_pos.direction] || null;

		// 共通のスタイルを組み合わせて返します
		return css`
			${commonStyle}
			${optionStyle}
    @media (max-width: 767px) {
				${mobileOptionStyle}
			}
		`;
	}}
`;
