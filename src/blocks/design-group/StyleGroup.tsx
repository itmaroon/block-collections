import {
	width_prm,
	height_prm,
	max_width_prm,
	align_prm,
	position_prm,
	space_prm,
	convertToScss,
	anime_comp,
	cssValueToString,
} from "itmar-block-packages";
import type { GridElement, GroupAttributes, GroupLayout } from "./types";

const createGridItemCss = (gridElms: GridElement[] = []): string =>
	gridElms
		.map((element, index) => {
			if (!element?.startCell || !element?.endCell) return "";

			const minCol = Math.min(element.startCell.colInx, element.endCell.colInx);
			const maxCol = Math.max(element.startCell.colInx, element.endCell.colInx);
			const minRow = Math.min(element.startCell.rowInx, element.endCell.rowInx);
			const maxRow = Math.max(element.startCell.rowInx, element.endCell.rowInx);
			const vertical =
				element.vertAlign === "middle"
					? "center"
					: element.vertAlign === "lower"
					? "end"
					: "start";

			return `
				&:nth-child(${index + 1}) {
					grid-column: ${minCol + 1} / ${maxCol + 2};
					grid-row: ${minRow + 1} / ${maxRow + 2};
					align-self: ${vertical};
					justify-self: ${element.latAlign};
				}
			`;
		})
		.join("");

const createDirectionCss = (scope: string, values: GroupLayout): string => {
	const contentSelector = `${scope} > div > .group_contents`;
	const direction = values?.direction;

	if (direction === "grid") {
		const grid = values.grid_info ?? {};
		return `
			${contentSelector} {
				display: grid;
				grid-template-columns: ${(grid.colUnit ?? []).join(" ")};
				grid-template-rows: ${(grid.rowUnit ?? []).join(" ")};
				gap: ${grid.rowGap ?? "0"} ${grid.colGap ?? "0"};
			}
			${contentSelector} > div,
			${contentSelector} > figure {
				margin: 0;
			}
			${createGridItemCss(grid.gridElms).replaceAll("&", `${contentSelector} > div`)}
			${createGridItemCss(grid.gridElms).replaceAll(
				"&",
				`${contentSelector} > figure`,
			)}
		`;
	}

	if (direction !== "horizen" && direction !== "vertical") return "";

	const axis = direction === "horizen" ? "row" : "column";
	const reverseAxis =
		direction === "horizen" ? "row-reverse" : "column-reverse";

	return `
		${contentSelector} {
			display: flex;
			flex-direction: ${values.reverse ? reverseAxis : axis};
			flex-wrap: ${values.wrap ? "wrap" : "nowrap"};
			justify-content: ${values.inner_align};
			align-items: ${values.inner_items};
		}
	`;
};

/**
 * エディタとフロントエンドで共有する純粋CSS生成関数。
 */
export const createGroupStyleCss = (
	attributes: GroupAttributes,
	scope: string,
): string => {
	const {
		positionType = "relative",
		isPosCenter = false,
		default_val,
		mobile_val,
		shadow_result,
		is_shadow,
		is_moveable,
		position = { x: "0px", y: "0px" },
		is_menu,
		is_submenu,
		isAppear = true,
		has_submenu,
		anime_prm,
	} = attributes;

	const defaultFlex =
		default_val.flex && Object.keys(default_val.flex).length
			? `flex: ${default_val.flex.grow} ${default_val.flex.shrink} ${default_val.flex.basis}; min-width: 0; min-height: 0;`
			: "";
	const mobileFlex =
		mobile_val.flex && Object.keys(mobile_val.flex).length
			? `flex: ${mobile_val.flex.grow} ${mobile_val.flex.shrink} ${mobile_val.flex.basis}; min-width: 0; min-height: 0;`
			: "";

	const defaultPosition = cssValueToString(
		position_prm(isPosCenter || default_val.posValue, positionType),
	);
	const mobilePosition = cssValueToString(
		position_prm(isPosCenter || mobile_val.posValue, positionType),
	);
	const shadow = is_shadow && shadow_result ? convertToScss(shadow_result) : "";
	const transform = is_moveable
		? `transform: translate(${position.x}, ${position.y});`
		: "";
	const overflow = has_submenu ? "visible" : "scroll";
	const contentSelector = `${scope} > div > .group_contents`;

	const defaultDirection = createDirectionCss(scope, default_val);
	const mobileDirection = createDirectionCss(scope, mobile_val);
	const animationCss = cssValueToString(anime_comp(anime_prm));

	return `
		${scope} {
			${!isAppear ? "display: none;" : ""}
			${defaultFlex}
			box-sizing: border-box;
			position: ${positionType};
			${defaultPosition}
			margin: ${space_prm(default_val.margin)};
			padding: ${space_prm(default_val.padding)};
			${is_menu || positionType === "absolute" ? "z-index: 100;" : ""}
			${positionType === "fixed" ? "z-index: 100;" : ""}
			${cssValueToString(width_prm(default_val.width_val, default_val.free_width))}
			${cssValueToString(
				max_width_prm(default_val.width_val, default_val.free_width),
			)}
			${cssValueToString(height_prm(default_val.height_val, default_val.free_height))}
			${cssValueToString(align_prm(default_val.outer_align))}
			align-self: ${default_val.outer_vertical};
		}

		${scope} > div {
			${transform}
		}

		${contentSelector} {
			${animationCss}
			${cssValueToString(shadow)};
			padding: ${space_prm(default_val.padding_content)};
		}

		${defaultDirection}

		@media (max-width: 767px) {
			${scope} {
				${mobileFlex}
				${mobilePosition}
				margin: ${space_prm(mobile_val.margin)};
				padding: ${space_prm(mobile_val.padding)};
				${cssValueToString(width_prm(mobile_val.width_val, mobile_val.free_width))}
				${cssValueToString(max_width_prm(mobile_val.width_val, mobile_val.free_width))}
				${cssValueToString(height_prm(mobile_val.height_val, mobile_val.free_height))}
				${cssValueToString(align_prm(mobile_val.outer_align))}
			}

			${contentSelector} {
				padding: ${space_prm(mobile_val.padding_content)};
				overflow-y: ${overflow};
			}

			${mobileDirection}

			${
				is_menu
					? `
				${scope} {
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
				}
				${scope} > div,
				${scope} > div > .group_contents {
					height: 100%;
				}
				${scope}.open {
					transform: translateX(0);
				}
				${
					is_submenu
						? `
					${scope} {
						position: relative !important;
						transform: translateX(0);
						width: auto !important;
						height: auto;
					}
				`
						: ""
				}
			`
					: ""
			}
		}
	`;
};
