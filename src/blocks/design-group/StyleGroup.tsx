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
} from "itmar-block-packages/front";
import type { GridElement, GroupAttributes, GroupLayout } from "./types";
import { MEDIA_MOBILE } from "../breakpoints";

/*
 * 最大幅のCSSを作る。
 * max_width は block.json の既定値が "100%" で、これはインスペクタからは
 * 選べない値（設定できるのは full / fit / wideSize / contentSize / free の5つ）。
 * つまり "100%" は「最大幅が未設定」を意味する。
 * max_width_prm は未知の値をすべて fit-content に落とすため、そのまま渡すと
 * 未設定のグループにまで max-width: fit-content が付き、幅が 0 に潰れる。
 * 設定済みの値のときだけ宣言を出す。
 */
const MAX_WIDTH_VALUES = ["full", "fit", "wideSize", "contentSize", "free"];

const maxWidthCss = (max_width?: string, max_free_width?: string): string =>
	max_width && MAX_WIDTH_VALUES.includes(max_width)
		? cssValueToString(max_width_prm(max_width, max_free_width))
		: "";

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
			/*
			 * グリッドの既定として子の余白を落とす。ただし :where() で詳細度を 0 にして
			 * おかないと、子ブロック自身の margin 設定（.itmar-group-style-* 側）を
			 * 上書きしてしまい、インスペクタで余白を変えても効かなくなる。
			 */
			:where(${contentSelector}) > :is(div, figure) {
				margin: 0;
			}
			${createGridItemCss(grid.gridElms).replaceAll("&", `${contentSelector} > div`)}
			${createGridItemCss(grid.gridElms).replaceAll(
				"&",
				`${contentSelector} > figure`,
			)}
		`;
	}

	/*
	 * "block" はフレックス解除。何も出さないとデスクトップの display:flex が
	 * メディアクエリの外に残ったまま効いてしまうので、明示的に戻す。
	 */
	if (direction === "block") {
		return `
			${contentSelector} {
				display: block;
			}
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
			justify-content: ${values.inner_align ?? "flex-start"};
			align-items: ${values.inner_items ?? "stretch"};
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
		zIndex,
		anime_prm,
	} = attributes;

	/*
	 * flex は3つの値が揃っていないと `flex: null null ;` のような不正な宣言になる。
	 * キーの有無ではなく、値が入っているかで判定する。
	 */
	const flexCss = (layout: GroupLayout): string => {
		const f = layout?.flex;
		if (!f) return "";
		const grow = f.grow ?? "";
		const shrink = f.shrink ?? "";
		const basis = f.basis ?? "";
		if (grow === "" && shrink === "" && basis === "") return "";
		return `flex: ${grow || 0} ${shrink || 0} ${basis || "auto"}; min-width: 0; min-height: 0;`;
	};
	const defaultFlex = flexCss(default_val);
	/*
	 * モバイルに指定が無いとき、デスクトップの flex が（メディアクエリの外にあるため）
	 * そのまま効いてしまう。flex はフレックスアイテムの主軸サイズを決めるので、
	 * 高さ・幅の指定より優先され、インスペクタで直しても変わらなくなる。
	 * 指定が無ければ初期値へ明示的に戻す。
	 */
	const mobileFlex =
		flexCss(mobile_val) ||
		(defaultFlex ? "flex: 0 1 auto; min-width: auto; min-height: auto;" : "");

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

	/*
	 * 重ね順。position_prm は absolute のとき `z-index: auto` を出すので、
	 * その後ろで上書きする必要がある。モバイル側のブロックでも同じ指定を
	 * 入れないと @media の中で `z-index: auto` に戻ってしまい、前面に出したい
	 * グループ（ログオンバーなど）が背面に沈む。
	 */
	const stackingCss =
		typeof zIndex === "number"
			? `z-index: ${zIndex};`
			: is_menu || positionType === "absolute" || positionType === "fixed"
				? "z-index: 100;"
				: "";

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
			${stackingCss}
			${
				/*
				 * サブメニューを持つグループは、兄弟のグループより手前に置く。
				 * サブメニュー自身は z-index:1000 を持つが、glassmorphism の影を
				 * 付けると .group_contents に backdrop-filter が乗って積層コンテキストが
				 * できるため、その z-index はグループの外まで効かない。結果として
				 * DOM順で後ろにある兄弟グループ（ボタン列など）にサブメニューが
				 * 隠れる。ここで持ち上げておけば、影の設定に関わらず前面に出る。
				 */
				/*
				 * 30 なのは、design-title の内側ラッパが全て z-index:10 を持つため
				 * （StyleWapper の innerScope）。同値だとDOM順で後ろの項目（LINEボタン等）
				 * が前に来てしまい、開いたサブメニューが下に潜る。
				 */
				has_submenu && !is_menu && positionType === "relative"
					? "z-index: 30;"
					: ""
			}
			${cssValueToString(width_prm(default_val.width_val, default_val.free_width))}
			${maxWidthCss(default_val.max_width, default_val.max_free_width)}
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

		${MEDIA_MOBILE} {
			${scope} {
				${mobileFlex}
				${mobilePosition}
				${stackingCss}
				margin: ${space_prm(mobile_val.margin)};
				padding: ${space_prm(mobile_val.padding)};
				${cssValueToString(width_prm(mobile_val.width_val, mobile_val.free_width))}
				${maxWidthCss(mobile_val.max_width, mobile_val.max_free_width)}
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
					background-color: var(--itmar-content-back);
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
