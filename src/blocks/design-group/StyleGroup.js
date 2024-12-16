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
			isPosCenter,
			default_val,
			mobile_val,
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
		const default_margin_prm = space_prm(default_val.margin);
		const mobile_margin_prm = space_prm(mobile_val.margin);
		const default_padding_prm = space_prm(default_val.padding);
		const mobile_padding_prm = space_prm(mobile_val.padding);
		const default_content_padding_prm = space_prm(default_val.padding_content);
		const mobile_contnt_padding_prm = space_prm(mobile_val.padding_content);
		//ブロック幅
		const default_width_style = width_prm(
			default_val.width_val,
			default_val.free_width,
		);
		const mobile_width_style = width_prm(
			mobile_val.width_val,
			mobile_val.free_width,
		);
		const default_max_width_style = max_width_prm(
			default_val.width_val,
			default_val.free_width,
		);
		const mobile_max_width_style = max_width_prm(
			mobile_val.width_val,
			mobile_val.free_width,
		);
		//ブロックの高さ
		const default_height_style = height_prm(
			default_val.height_val,
			default_val.free_height,
		);
		const mobile_height_style = height_prm(
			mobile_val.height_val,
			mobile_val.free_height,
		);
		//ブロックの配置
		const default_block_align = align_prm(default_val.outer_align);
		const mobile_block_align = align_prm(mobile_val.outer_align);
		//シャドースタイル
		const box_shadow_style =
			is_shadow && shadow_result ? convertToScss(shadow_result) : "";
		//ブロックの位置
		const default_block_position = position_prm(
			isPosCenter ? isPosCenter : default_val.posValue,
			positionType,
		);
		const mobile_block_position = position_prm(
			isPosCenter ? isPosCenter : mobile_val.posValue,
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
			box-sizing: border-box;
			position: ${positionType};
			${default_block_position}
			margin: ${default_margin_prm};
			padding: ${default_padding_prm};
			${is_menu &&
			css`
				z-index: 100;
			`}
			${default_width_style}
			${default_max_width_style}
      		${default_height_style}
      		${default_block_align}
      		align-self: ${default_val.outer_vertical};
			@media (max-width: 767px) {
				${mobile_block_position}
				margin: ${mobile_margin_prm};
				padding: ${mobile_padding_prm};
				${mobile_width_style}
				${mobile_max_width_style}
				${mobile_height_style}
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
					flex-direction: ${!default_val.reverse ? "row" : "row-reverse"};
					flex-wrap: ${default_val.wrap ? "wrap" : "nowrap"};
					justify-content: ${default_val.inner_align};
					align-items: ${default_val.inner_items};

					@media (max-width: 767px) {
						flex-direction: ${!mobile_val.reverse ? "row" : "row-reverse"};
						flex-wrap: ${mobile_val.wrap ? "wrap" : "nowrap"};
						justify-content: ${mobile_val.inner_align};
						align-items: ${mobile_val.inner_items};
					}
				}
			}
		`;

		//縦並びスタイル
		const verticalStyle = css`
			> div {
				> .group_contents {
					display: flex;
					flex-direction: ${!default_val.reverse ? "column" : "column-reverse"};
					flex-wrap: ${default_val.wrap ? "wrap" : "nowrap"};
					justify-content: ${default_val.inner_align};
					align-items: ${default_val.inner_items};

					@media (max-width: 767px) {
						flex-direction: ${!mobile_val.reverse
							? "column"
							: "column-reverse"};
						flex-wrap: ${mobile_val.wrap ? "wrap" : "nowrap"};
						justify-content: ${mobile_val.inner_align};
						align-items: ${mobile_val.inner_items};
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
					grid-template-columns: ${default_val.grid_info?.colUnit?.join(" ")};
					grid-template-rows: ${default_val.grid_info?.rowUnit?.join(" ")};
					gap: ${default_val.grid_info?.rowGap} ${default_val.grid_info?.colGap};
					> div,
					> figure {
						${createNthChildStyles(default_val.grid_info?.gridElms)}
						margin:0;
					}

					@media (max-width: 767px) {
						grid-template-columns: ${mobile_val.grid_info?.colUnit?.join(" ")};
						grid-template-rows: ${mobile_val.grid_info?.rowUnit?.join(" ")};
						gap: ${mobile_val.grid_info?.rowGap} ${mobile_val.grid_info?.colGap};
						> div,
						> figure {
							${createNthChildStyles(mobile_val.grid_info?.gridElms)}
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

		const optionStyle = cssMap[default_val.direction] || null;
		const mobileOptionStyle = cssMap[mobile_val.direction] || null;

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
