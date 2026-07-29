import styled, { css } from "styled-components";
import type { AnimationEvent } from "react";
import {
	radius_prm,
	space_prm,
	convertToScss,
	cssValueToString,
} from "itmar-block-packages";
import type { TitleAttributes, StyleCompProps, UnderLineProp } from "./types";

type PositionKey =
	| "top left"
	| "top center"
	| "top right"
	| "center left"
	| "center center"
	| "center right"
	| "bottom left"
	| "bottom center"
	| "bottom right";

const positionKeys = new Set<PositionKey>([
	"top left",
	"top center",
	"top right",
	"center left",
	"center center",
	"center right",
	"bottom left",
	"bottom center",
	"bottom right",
]);

const normalizePositionKey = (
	value: unknown,
	fallback: PositionKey,
): PositionKey => {
	return typeof value === "string" && positionKeys.has(value as PositionKey)
		? (value as PositionKey)
		: fallback;
};

const defaultUnderLineProp: UnderLineProp = {
	width: "100%",
	height: "2px",
	distance: "0",
	is_anime: false,
	direction: "center",
};

// 20px の線を 135 度方向へ折り返したときの水平・垂直成分。
const underLineFoldOffset = "14.142px";

const createUnderLineCss = (
	selector: string,
	underLineProp: UnderLineProp,
	background: string,
): string => {
	const direction = underLineProp.direction ?? "center";
	const isDirectional = direction === "right" || direction === "left";
	const isRight = direction === "right";
	const height = underLineProp.height;
	const arrowInset = `calc(100% - ${underLineFoldOffset})`;
	const clipPath = isRight
		? `polygon(0 calc(100% - ${height}), calc(100% - ${height}) calc(100% - ${height}), ${arrowInset} ${height}, ${arrowInset} 0, 100% calc(100% - ${height}), 100% 100%, 0 100%)`
		: `polygon(100% calc(100% - ${height}), ${height} calc(100% - ${height}), ${underLineFoldOffset} ${height}, ${underLineFoldOffset} 0, 0 calc(100% - ${height}), 0 100%, 100% 100%)`;
	const position =
		direction === "right"
			? "left:0;right:auto;"
			: direction === "left"
			? "left:auto;right:0;"
			: "left:50%;right:auto;";
	const transformOrigin =
		direction === "right"
			? "left center"
			: direction === "left"
			? "right center"
			: "center center";
	const baseTransform = direction === "center" ? "translateX(-50%)" : "";
	const scale = underLineProp.is_anime ? "scaleX(0)" : "scaleX(1)";
	const expandedTransform = `${baseTransform} scaleX(1)`.trim();

	return `
		${selector}::after {
			content:"";position:absolute;display:block;
			width:${underLineProp.width};
			height:${
				isDirectional
					? `calc(${underLineFoldOffset} + ${height})`
					: height
			};
			bottom:${underLineProp.distance};
			background:${background};${position}
			transform:${baseTransform} ${scale};
			transform-origin:${transformOrigin};
			transition:transform .3s ease 0s;
			${isDirectional ? `clip-path:${clipPath};` : ""}
		}
		${
			underLineProp.is_anime
				? `${selector}:hover::after { transform:${expandedTransform}; }`
				: ""
		}
	`;
};

export const StyleComp = ({
	attributes,
	children,
	onBurstEnd,
}: StyleCompProps) => {
	return (
		<StyledDiv id={attributes.headingID} $attr={attributes}>
			{children}
			{attributes.is_waiting && (
				<>
					<div className={`spinner ${attributes.waiting_state}`}></div>
					<div
						className={`particles ${attributes.waiting_state}`}
						onAnimationEnd={(e: AnimationEvent<HTMLDivElement>) => {
							// 「done」状態で、particles コンテナの burst 終了を拾う
							if (
								attributes.waiting_state === "done" &&
								e.currentTarget === e.target // 子<i>ではなくコンテナ自身
							) {
								onBurstEnd && onBurstEnd();
							}
						}}
					>
						<i />
						<i />
						<i />
						<i />
						<i />
						<i />
						<i />
						<i />
					</div>
				</>
			)}
		</StyledDiv>
	);
};

const StyledDiv = styled.div<{ $attr: TitleAttributes }>`
	${({ $attr }) => {
		const {
			headingType,
			defaultHeadingSize,
			mobileHeadingSize,
			align,
			default_val,
			mobile_val,
			isVertical,
			optionStyle,
			shadow_result,
			is_shadow,
			is_underLine,
			is_waiting,
			is_wrap,
			underLine_prop,
			linkKind,
			menu_pos,
			bgColor_underLine,
			bgGradient_underLine,
			className,
		} = $attr;

		//単色かグラデーションかテーマ色かの選択
		const bgUnderLine =
			bgColor_underLine ||
			bgGradient_underLine ||
			"var(--wp--preset--color--content)";

		//ボックスシャドーの設定
		const box_shadow_style =
			is_shadow && shadow_result ? convertToScss(shadow_result) : "";

		//スペースの設定
		const default_padding_prm = space_prm(default_val.padding_heading);
		const mobile_padding_prm = space_prm(mobile_val.padding_heading);

		//paddingの修正関数
		const ajust_padding = (
			padding: string,
			pos_x: string,
			pos_y: string,
			space?: string,
		) => {
			const values = padding.split(" ");
			const pos_num =
				pos_x === "left" && pos_y === "center"
					? 3
					: (pos_x === "right" || pos_x === "center") && pos_y === "center"
					? 1
					: pos_y === "top"
					? 0
					: pos_y === "bottom"
					? 2
					: null;
			if (pos_num === null) return values.join(" ");
			if (pos_y === "center") {
				//横方向のパディング
				values[pos_num] = space
					? `calc(${values[pos_num]} + ${space})`
					: `calc(${values[pos_num]} + 1em)`;
			} else {
				//縦方向のパディング
				values[pos_num] = `calc(${space})`;
			}

			// 配列をスペースで連結して文字列に戻す
			return values.join(" ");
		};
		//アニメーション

		//アンダーライン
		const underLine = is_underLine
			? `position:relative;${createUnderLineCss("&", underLine_prop, bgUnderLine)}`
			: null;

		//処理中のアニメーション
		const pendding_anime = is_waiting
			? `
	.spinner{
		position:absolute;
		inset:0;
		border:3px solid #e0e0e0;
		border-top-color:currentColor;
		border-radius:50%;
		animation:spin 1s linear infinite;
		&.hold{
			display: none;
		}
		&.exec{
			display: block;
		}
		&.done{
			animation: explode 1s ease-out forwards;
			border-color:transparent;
		} 
	}

	.particles {
		position: absolute;
		inset: 0;
		pointer-events: none;

		i {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 8px;
			height: 8px;
			background: currentColor;
			border-radius: 50%;
			transform: translate(-50%, -50%) scale(0);
			opacity: 0;
		}
		&.hold{
			display: none;
		}
		&.exec{
			display: block;
		}
		&.done {
			i {
				animation: pop 1s ease-out forwards;
			}
  			animation: burst 1s ease-out 1 forwards;
		}
		i:nth-child(1) { --dx:  0;  --dy: -12; }
		i:nth-child(2) { --dx: 10;  --dy:  -6; }
		i:nth-child(3) { --dx: 12;  --dy:   0; }
		i:nth-child(4) { --dx: 10;  --dy:   6; }
		i:nth-child(5) { --dx:  0;  --dy:  12; }
		i:nth-child(6) { --dx:-10;  --dy:   6; }
		i:nth-child(7) { --dx:-12;  --dy:   0; }
		i:nth-child(8) { --dx:-10;  --dy:  -6; }
	}
		/* KEYFRAMES */
		@keyframes spin{to{transform:rotate(360deg)}}
		@keyframes explode {
			0%{transform:scale(1);opacity:1}
			60%{transform:scale(1.4);opacity:.7}
			100%{transform:scale(0);opacity:0}
		}
		@keyframes pop{
			0%{transform:translate(-50%,-50%) scale(0);opacity:0}
			10%{transform:translate(-50%,-50%) scale(1);opacity:1}
			100%{
				transform:translate(calc(-50% + var(--dx)*5px), calc(-50% + var(--dy)*5px)) scale(.2);
				opacity:0
			}
		}
		@keyframes burst {
		from { opacity: 1; }
		to   { opacity: 1; } 
		}
    `
			: null;

		//paddingの調整（サブメニューの印分の幅）
		const default_render_padding =
			linkKind === "submenu"
				? ajust_padding(default_padding_prm, menu_pos.split(" ")[1], "center")
				: default_padding_prm;
		const mobile_render_padding =
			linkKind === "submenu"
				? ajust_padding(mobile_padding_prm, menu_pos.split(" ")[1], "center")
				: mobile_padding_prm;

		//矢印の方向
		const directionMap: Record<PositionKey, string> = {
			"top left":
				"height: calc(12px / 2);width: 12px;left: 10px;clip-path: polygon(50% 0, 100% 100%, 0 100%);",
			"top center":
				"height: calc(12px / 2);width: 12px;right: 10px;clip-path: polygon(50% 0, 100% 100%, 0 100%);",
			"top right":
				"height: calc(12px / 2);width: 12px;right: 10px;clip-path: polygon(50% 0, 100% 100%, 0 100%);",
			"center left":
				"height: 12px;width: calc(12px / 2);left: 10px;clip-path: polygon(100% 0, 100% 100%, 0 50%);",
			"center center":
				"height: calc(12px / 2);width: 12px;right: 10px;clip-path: polygon(0 0, 100% 0, 50% 100%);",
			"center right":
				"height: 12px;width: calc(12px / 2);right: 10px;clip-path: polygon(100% 50%, 0 100%, 0 0);",
			"bottom left":
				"height: calc(12px / 2);width: 12px;left: 10px;clip-path: polygon(0 0, 100% 0, 50% 100%);",
			"bottom center":
				"height: calc(12px / 2);width: 12px;right: 10px;clip-path: polygon(0 0, 100% 0, 50% 100%);",
			"bottom right":
				"height: calc(12px / 2);width: 12px;right: 10px;clip-path: polygon(0 0, 100% 0, 50% 100%);",
		};
		const menuPosition = normalizePositionKey(menu_pos, "bottom right");
		const arrow_direction = directionMap[menuPosition];

		const wrap = !is_wrap ? "nowrap !important" : "pre-wrap";

		const vertical_style = isVertical
			? "writing-mode: vertical-rl;text-orientation: upright;"
			: "";

		// 共通のスタイルをここで定義します
		const commonStyle = css`
			position: relative;
			${pendding_anime}
			z-index: 10;
			font-size: ${defaultHeadingSize};
			${box_shadow_style};
			@media (max-width: 767px) {
				font-size: ${mobileHeadingSize};
			}
			${headingType} {
				box-sizing: border-box;
				position: relative;
				padding: ${default_render_padding};
				width: ${default_val.width ?? "fit-content"};
				text-align: ${align};
				white-space: ${wrap};
				margin: 0;
				font-weight: inherit;
				${underLine};
				${vertical_style};
				@media (max-width: 767px) {
					padding: ${mobile_render_padding};
					width: ${mobile_val.width ?? "fit-content"};
				}
			}
			a {
				text-decoration: none !important;
			}
			${linkKind === "submenu" &&
			`
        ${headingType}{
          &::before {
            content: '';
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: var(--wp--preset--color--content);
            ${arrow_direction}
          }
        }
      `}
		`;

		// classNameに基づいて特定のスタイルを定義します
		let specificStyle = null;

		if (optionStyle && className?.split(" ").includes(optionStyle.styleName)) {
			//optionStyleが初期化されていてスタイル名とclassNameが一致する
			if (className?.split(" ").includes("is-style-circle_marker")) {
				//サークルを入れる
				//背景色の設定
				const circleColor =
					optionStyle.colorVal_circle ||
					optionStyle.gradientVal_circle ||
					"var(--wp--preset--color--accent-1)";
				const secondColor =
					optionStyle.colorVal_second ||
					optionStyle.gradientVal_second ||
					"var(--wp--preset--color--accent-2)";
				specificStyle = css`
					&:before {
						content: "";
						position: absolute;
						display: block;
						width: ${optionStyle.circleScale};
						height: ${optionStyle.circleScale};
						border-radius: 50%;
						background: ${circleColor};
						top: ${optionStyle.first_long}px;
						left: ${optionStyle.first_lat}px;
						z-index: -1;
					}
					${optionStyle.isSecond &&
					css`
						&:after {
							content: "";
							position: absolute;
							display: block;
							opacity: ${optionStyle.second_opacity};
							width: ${optionStyle.secondScale};
							height: ${optionStyle.secondScale};
							border-radius: 50%;
							background: ${secondColor};
							top: ${optionStyle.second_long}px;
							left: ${optionStyle.second_lat}px;
							z-index: -1;
						}
					`}
				`;
			} else if (className?.split(" ").includes("is-style-sub_copy")) {
				const {
					color_text_copy,
					color_background_copy,
					gradient_background_copy,
					font_style_copy,
					radius_copy,
					isIcon,
					icon_style,
					padding_copy,
					copy_content,
					alignment_copy,
				} = optionStyle;

				//背景色の設定
				const bgColor =
					color_background_copy ||
					gradient_background_copy ||
					"var(--wp--preset--color--accent-1)";
				//斜体の設定
				const fontStyle = font_style_copy.isItalic ? "italic" : "normal";
				//角丸の設定
				const copy_radius_prm = radius_prm(radius_copy);
				//アイコンスペースの設定
				const icon_space = icon_style.icon_space || "0px";

				//サブコピーのパディングの設定（アイコン幅の確保）
				const copy_padding = (
					isIcon: boolean,
					icon_style: Record<string, any>,
				) => {
					if (!isIcon) {
						return space_prm(padding_copy);
					}

					if (icon_style.icon_pos === "left") {
						return `${padding_copy.top} ${padding_copy.right} ${padding_copy.bottom} calc(${padding_copy.left} + ${icon_style.icon_size} + ${icon_space})`;
					}
					if (icon_style.icon_pos === "right") {
						return `${padding_copy.top} calc(${padding_copy.right} + ${icon_style.icon_size} + ${icon_space}) ${padding_copy.bottom} ${padding_copy.left} `;
					}
				};
				const copy_padding_prm = copy_padding(isIcon, icon_style);

				//文字列のレンダリングの長さ
				// function measureTextWidth(text, fontSize, fontFamily) {
				//   const canvas = document.createElement('canvas');
				//   const context = canvas.getContext('2d');
				//   context.font = `${fontSize} ${fontFamily} `;
				//   const metrics = context.measureText(text);
				//   return metrics.width;
				// }

				const textWidth = optionStyle.copy_width
					? Number(optionStyle.copy_width)
					: 0;

				//アイコンの位置計算
				const tranceLeft =
					icon_style.icon_pos !== "left"
						? `left:calc(${padding_copy.left} + ${padding_copy.right} + ${textWidth}px)`
						: `left:${icon_space}`;
				const tranceCenter =
					icon_style.icon_pos !== "left"
						? `left:50%;transform: translateX(calc(-50% + ${textWidth / 2}px))`
						: `left:50%;transform: translateX(calc(-50% - ${textWidth / 2}px))`;
				const tranceRight =
					icon_style.icon_pos !== "left"
						? `right:${icon_space}`
						: `right:calc(${padding_copy.left} + ${padding_copy.right} + ${textWidth}px)`;

				//配置場所
				const alignMap: Record<PositionKey, { before: string; after: string }> =
					{
						"top left": {
							before: "top:0;left: 0;",
							after: `top:0;${tranceLeft}`,
						},
						"top center": {
							before: "top:0;left:50%;transform: translateX(-50%);",
							after: `top:0;${tranceCenter}`,
						},
						"top right": {
							before: "top:0;right: 0;",
							after: `top:0;${tranceRight}`,
						},
						"center left": {
							before: "top:50%;transform: translateY(-50%);left:0;",
							after: `top:50%;transform: translateY(-50%);${tranceLeft}`,
						},
						"center center": {
							before: "top:50%;left:50%;transform: translate(-50%,-50%);",
							after: "top:50%;left:50%;transform: translate(-50%,-50%);",
						},
						"center right": {
							before: "top:50%;transform: translateY(-50%);right:0;",
							after: `top:50%;transform: translateY(-50%);${tranceRight}`,
						},
						"bottom left": {
							before: "bottom:0;left: 0;",
							after: `bottom:0;${tranceLeft}`,
						},
						"bottom center": {
							before: "bottom:0;left:50%;transform: translateX(-50%);",
							after: `bottom:0;${tranceCenter}`,
						},
						"bottom right": {
							before: "bottom:0;right: 0;",
							after: `bottom:0;${tranceRight}`,
						},
					};
				const alignmentPosition = normalizePositionKey(
					alignment_copy,
					"top left",
				);
				const alignStyle = alignMap[alignmentPosition];
				//サブコピーのレンダリングスペースをパディングで確保
				const copy_space_horizen = isIcon
					? `${textWidth}px + ${padding_copy.right} + ${padding_copy.left} + ${icon_style.icon_size} + ${icon_space}`
					: `${textWidth}px + ${padding_copy.right} + ${padding_copy.left}`;
				const copy_space_vertical = `${font_style_copy.fontSize} + ${padding_copy.top} + ${padding_copy.bottom}`;
				const copy_space =
					alignmentPosition.split(" ")[0] === "center"
						? copy_space_horizen
						: copy_space_vertical;
				const subcopy_padding = ajust_padding(
					"0px 0px 0px 0px",
					alignmentPosition.split(" ")[1],
					alignmentPosition.split(" ")[0],
					copy_space,
				);

				//CSSの生成
				specificStyle = css`
					padding: ${subcopy_padding};
					&::before {
						font-size: ${font_style_copy.default_fontSize};
						font-family: ${font_style_copy.fontFamily};
						font-weight: ${font_style_copy.fontWeight};
						font-style: ${fontStyle};
						position: absolute;
						${alignStyle.before}
						content: '${copy_content}';
						color: ${color_text_copy};
						border-radius: ${copy_radius_prm};
						background: ${bgColor};
						padding: ${copy_padding_prm};
						line-height: 1;
					}
					@media (max-width: 767px) {
						&::before {
							font-size: ${font_style_copy.mobile_fontSize};
						}
					}
					${isIcon &&
					icon_style.icon_type === "awesome" &&
					css`
						&::after {
							content: "\\${icon_style.icon_name}";
							font-family: "${icon_style.icon_family}";
							font-weight: ${icon_style.icon_family === "Font Awesome 6 Free"
								? "900"
								: "400"};
							position: absolute;
							font-size: ${icon_style.icon_size};
							color: ${icon_style.icon_color};
							${alignStyle.after}
						}
					`}
					${isIcon &&
					(icon_style.icon_type === "image" ||
						icon_style.icon_type === "avatar") &&
					css`
						img {
							position: absolute;
							width: ${icon_style.icon_size};
							height: ${icon_style.icon_size};
							${alignStyle.after}
						}
					`}
				`;
			}
		}

		// 共通のスタイルと特定のスタイルを組み合わせて返します
		return css`
			${commonStyle}
			${specificStyle}
		`;
	}}
`;

const escapeCssContent = (value: unknown): string =>
	String(value ?? "")
		.replace(/\\/g, "\\\\")
		.replace(/"/g, '\\"')
		.replace(/\r?\n/g, "\\A ");

const adjustPadding = (
	padding: string,
	posX?: string,
	posY?: string,
	space?: string,
): string => {
	const values = String(padding || "0 0 0 0")
		.trim()
		.split(/\s+/);
	while (values.length < 4) values.push(values[values.length - 1] || "0");

	const index =
		posX === "left" && posY === "center"
			? 3
			: (posX === "right" || posX === "center") && posY === "center"
			? 1
			: posY === "top"
			? 0
			: posY === "bottom"
			? 2
			: null;

	if (index == null) return values.join(" ");

	values[index] =
		posY === "center"
			? `calc(${values[index]} + ${space || "1em"})`
			: `calc(${space || "0px"})`;

	return values.join(" ");
};

const menuArrowDirections: Record<PositionKey, string> = {
	"top left":
		"height:calc(12px / 2);width:12px;left:10px;clip-path:polygon(50% 0,100% 100%,0 100%);",
	"top center":
		"height:calc(12px / 2);width:12px;right:10px;clip-path:polygon(50% 0,100% 100%,0 100%);",
	"top right":
		"height:calc(12px / 2);width:12px;right:10px;clip-path:polygon(50% 0,100% 100%,0 100%);",
	"center left":
		"height:12px;width:calc(12px / 2);left:10px;clip-path:polygon(100% 0,100% 100%,0 50%);",
	"center center":
		"height:calc(12px / 2);width:12px;right:10px;clip-path:polygon(0 0,100% 0,50% 100%);",
	"center right":
		"height:12px;width:calc(12px / 2);right:10px;clip-path:polygon(100% 50%,0 100%,0 0);",
	"bottom left":
		"height:calc(12px / 2);width:12px;left:10px;clip-path:polygon(0 0,100% 0,50% 100%);",
	"bottom center":
		"height:calc(12px / 2);width:12px;right:10px;clip-path:polygon(0 0,100% 0,50% 100%);",
	"bottom right":
		"height:calc(12px / 2);width:12px;right:10px;clip-path:polygon(0 0,100% 0,50% 100%);",
};

const createWaitingCss = (scope: string): string => {
	const suffix = scope.replace(/[^a-zA-Z0-9_-]/g, "");
	const spin = `itmar-title-spin-${suffix}`;
	const explode = `itmar-title-explode-${suffix}`;
	const pop = `itmar-title-pop-${suffix}`;
	const burst = `itmar-title-burst-${suffix}`;

	return `
		${scope} .spinner {
			position:absolute;inset:0;border:3px solid #e0e0e0;
			border-top-color:currentColor;border-radius:50%;
			animation:${spin} 1s linear infinite;
		}
		${scope} .spinner.hold, ${scope} .particles.hold { display:none; }
		${scope} .spinner.exec, ${scope} .particles.exec { display:block; }
		${scope} .spinner.done {
			animation:${explode} 1s ease-out forwards;
			border-color:transparent;
		}
		${scope} .particles { position:absolute;inset:0;pointer-events:none; }
		${scope} .particles i {
			position:absolute;top:50%;left:50%;width:8px;height:8px;
			background:currentColor;border-radius:50%;
			transform:translate(-50%,-50%) scale(0);opacity:0;
		}
		${scope} .particles.done { animation:${burst} 1s ease-out 1 forwards; }
		${scope} .particles.done i { animation:${pop} 1s ease-out forwards; }
		${scope} .particles i:nth-child(1){--dx:0;--dy:-12}
		${scope} .particles i:nth-child(2){--dx:10;--dy:-6}
		${scope} .particles i:nth-child(3){--dx:12;--dy:0}
		${scope} .particles i:nth-child(4){--dx:10;--dy:6}
		${scope} .particles i:nth-child(5){--dx:0;--dy:12}
		${scope} .particles i:nth-child(6){--dx:-10;--dy:6}
		${scope} .particles i:nth-child(7){--dx:-12;--dy:0}
		${scope} .particles i:nth-child(8){--dx:-10;--dy:-6}
		@keyframes ${spin}{to{transform:rotate(360deg)}}
		@keyframes ${explode}{
			0%{transform:scale(1);opacity:1}
			60%{transform:scale(1.4);opacity:.7}
			100%{transform:scale(0);opacity:0}
		}
		@keyframes ${pop}{
			0%{transform:translate(-50%,-50%) scale(0);opacity:0}
			10%{transform:translate(-50%,-50%) scale(1);opacity:1}
			100%{
				transform:translate(
					calc(-50% + var(--dx)*5px),
					calc(-50% + var(--dy)*5px)
				) scale(.2);
				opacity:0;
			}
		}
		@keyframes ${burst}{from{opacity:1}to{opacity:1}}
	`;
};

const createOptionStyleCss = (
	attributes: TitleAttributes,
	scope: string,
): string => {
	const { optionStyle, className } = attributes;
	const classes = String(className || "").split(/\s+/);

	if (!optionStyle || !classes.includes(optionStyle.styleName)) {
		return "";
	}

	if (classes.includes("is-style-circle_marker")) {
		const circleColor =
			optionStyle.colorVal_circle ||
			optionStyle.gradientVal_circle ||
			"var(--wp--preset--color--accent-1)";
		const secondColor =
			optionStyle.colorVal_second ||
			optionStyle.gradientVal_second ||
			"var(--wp--preset--color--accent-2)";

		return `
			${scope}::before {
				content:"";position:absolute;display:block;
				width:${optionStyle.circleScale};height:${optionStyle.circleScale};
				border-radius:50%;background:${circleColor};
				top:${optionStyle.first_long}px;left:${optionStyle.first_lat}px;
				z-index:-1;
			}
			${
				optionStyle.isSecond
					? `
				${scope}::after {
					content:"";position:absolute;display:block;
					opacity:${optionStyle.second_opacity};
					width:${optionStyle.secondScale};height:${optionStyle.secondScale};
					border-radius:50%;background:${secondColor};
					top:${optionStyle.second_long}px;left:${optionStyle.second_lat}px;
					z-index:-1;
				}
			`
					: ""
			}
		`;
	}

	if (!classes.includes("is-style-sub_copy")) return "";

	const {
		color_text_copy,
		color_background_copy,
		gradient_background_copy,
		font_style_copy,
		radius_copy,
		isIcon,
		icon_style,
		padding_copy,
		copy_content,
		alignment_copy,
	} = optionStyle;

	if (!font_style_copy || !icon_style || !padding_copy || !alignment_copy) {
		return "";
	}

	const background =
		color_background_copy ||
		gradient_background_copy ||
		"var(--wp--preset--color--accent-1)";
	const fontStyle = font_style_copy.isItalic ? "italic" : "normal";
	const iconSpace = icon_style.icon_space || "0px";
	const copyPadding = !isIcon
		? space_prm(padding_copy)
		: icon_style.icon_pos === "left"
		? `${padding_copy.top} ${padding_copy.right} ${padding_copy.bottom} calc(${padding_copy.left} + ${icon_style.icon_size} + ${iconSpace})`
		: `${padding_copy.top} calc(${padding_copy.right} + ${icon_style.icon_size} + ${iconSpace}) ${padding_copy.bottom} ${padding_copy.left}`;
	const textWidth = optionStyle.copy_width ? Number(optionStyle.copy_width) : 0;
	const leftPosition =
		icon_style.icon_pos !== "left"
			? `left:calc(${padding_copy.left} + ${padding_copy.right} + ${textWidth}px);`
			: `left:${iconSpace};`;
	const centerPosition =
		icon_style.icon_pos !== "left"
			? `left:50%;transform:translateX(calc(-50% + ${textWidth / 2}px));`
			: `left:50%;transform:translateX(calc(-50% - ${textWidth / 2}px));`;
	const rightPosition =
		icon_style.icon_pos !== "left"
			? `right:${iconSpace};`
			: `right:calc(${padding_copy.left} + ${padding_copy.right} + ${textWidth}px);`;
	const alignMap: Record<PositionKey, [string, string]> = {
		"top left": ["top:0;left:0;", `top:0;${leftPosition}`],
		"top center": [
			"top:0;left:50%;transform:translateX(-50%);",
			`top:0;${centerPosition}`,
		],
		"top right": ["top:0;right:0;", `top:0;${rightPosition}`],
		"center left": [
			"top:50%;transform:translateY(-50%);left:0;",
			`top:50%;transform:translateY(-50%);${leftPosition}`,
		],
		"center center": [
			"top:50%;left:50%;transform:translate(-50%,-50%);",
			"top:50%;left:50%;transform:translate(-50%,-50%);",
		],
		"center right": [
			"top:50%;transform:translateY(-50%);right:0;",
			`top:50%;transform:translateY(-50%);${rightPosition}`,
		],
		"bottom left": ["bottom:0;left:0;", `bottom:0;${leftPosition}`],
		"bottom center": [
			"bottom:0;left:50%;transform:translateX(-50%);",
			`bottom:0;${centerPosition}`,
		],
		"bottom right": ["bottom:0;right:0;", `bottom:0;${rightPosition}`],
	};
	const alignmentPosition = normalizePositionKey(alignment_copy, "top left");
	const [beforePosition, afterPosition] = alignMap[alignmentPosition];
	const horizontalSpace = isIcon
		? `${textWidth}px + ${padding_copy.right} + ${padding_copy.left} + ${icon_style.icon_size} + ${iconSpace}`
		: `${textWidth}px + ${padding_copy.right} + ${padding_copy.left}`;
	const verticalSpace = `${font_style_copy.fontSize} + ${padding_copy.top} + ${padding_copy.bottom}`;
	const copySpace =
		alignmentPosition.split(" ")[0] === "center"
			? horizontalSpace
			: verticalSpace;
	const rootPadding = adjustPadding(
		"0px 0px 0px 0px",
		alignmentPosition.split(" ")[1],
		alignmentPosition.split(" ")[0],
		copySpace,
	);

	const awesomeIcon =
		isIcon && icon_style.icon_type === "awesome"
			? `
			${scope}::after {
				content:"\\${icon_style.icon_name}";
				font-family:"${escapeCssContent(icon_style.icon_family)}";
				font-weight:${icon_style.icon_family === "Font Awesome 6 Free" ? "900" : "400"};
				position:absolute;font-size:${icon_style.icon_size};
				color:${icon_style.icon_color};${afterPosition}
			}
		`
			: "";
	const imageIcon =
		isIcon &&
		(icon_style.icon_type === "image" || icon_style.icon_type === "avatar")
			? `
			${scope} img {
				position:absolute;width:${icon_style.icon_size};
				height:${icon_style.icon_size};${afterPosition}
			}
		`
			: "";

	return `
		${scope} { padding:${rootPadding}; }
		${scope}::before {
			font-size:${font_style_copy.default_fontSize};
			font-family:${font_style_copy.fontFamily};
			font-weight:${font_style_copy.fontWeight};
			font-style:${fontStyle};position:absolute;${beforePosition}
			content:"${escapeCssContent(copy_content)}";
			color:${color_text_copy};border-radius:${radius_prm(radius_copy)};
			background:${background};padding:${copyPadding};line-height:1;
		}
		@media (max-width:767px) {
			${scope}::before { font-size:${font_style_copy.mobile_fontSize}; }
		}
		${awesomeIcon}
		${imageIcon}
	`;
};

/**
 * フロントエンド用のスコープ付きCSSを生成する。
 */
export const createTitleStyleCss = (
	attributes: TitleAttributes,
	scope: string,
): string => {
	const {
		headingType = "H2",
		defaultHeadingSize = "16px",
		mobileHeadingSize = "16px",
		align,
		default_val,
		mobile_val,
		isVertical,
		shadow_result,
		is_shadow,
		is_underLine,
		is_waiting,
		is_wrap,
		underLine_prop = defaultUnderLineProp,
		linkKind,
		menu_pos = "bottom right",
		bgColor_underLine,
		bgGradient_underLine,
	} = attributes;

	const headingSelector = `${scope} ${headingType}`;
	const background =
		bgColor_underLine ||
		bgGradient_underLine ||
		"var(--wp--preset--color--content)";
	const shadow =
		is_shadow && shadow_result
			? cssValueToString(convertToScss(shadow_result))
			: "";
	//スペースの設定
	const default_padding_prm = space_prm(default_val.padding_heading);
	const mobile_padding_prm = space_prm(mobile_val.padding_heading);

	const default_renderedPadding =
		linkKind === "submenu"
			? adjustPadding(
					default_padding_prm,
					normalizePositionKey(menu_pos, "bottom right").split(" ")[1],
					"center",
			  )
			: default_padding_prm;
	const mobile_renderedPadding =
		linkKind === "submenu"
			? adjustPadding(
					mobile_padding_prm,
					normalizePositionKey(menu_pos, "bottom right").split(" ")[1],
					"center",
			  )
			: mobile_padding_prm;

	const underlineCss = is_underLine
		? createUnderLineCss(headingSelector, underLine_prop, background)
		: "";
	const submenuCss =
		linkKind === "submenu"
			? `
		${headingSelector}::before {
			content:"";position:absolute;top:50%;transform:translateY(-50%);
			background:var(--wp--preset--color--content);
			${menuArrowDirections[normalizePositionKey(menu_pos, "bottom right")] || ""}
		}
	`
			: "";

	return `
		${scope} {
			position:relative;z-index:10;font-size:${defaultHeadingSize};
			${shadow}
		}
		${headingSelector} {
			box-sizing: border-box;
			position:relative;padding:${default_renderedPadding};
			width: ${default_val.width ?? "fit-content"};
			text-align: ${align};
			white-space:${is_wrap ? "pre-wrap" : "nowrap !important"};
			margin:0;font-weight:inherit;
			${isVertical ? "writing-mode:vertical-rl;text-orientation:upright;" : ""}
			@media (max-width:767px) {
				padding:${mobile_renderedPadding};
				width: ${mobile_val.width ?? "fit-content"};
			}
		}
		${scope} a { text-decoration:none !important; }
		${underlineCss}
		${submenuCss}
		${is_waiting ? createWaitingCss(scope) : ""}
		${createOptionStyleCss(attributes, scope)}
		@media (max-width:767px) {
			${scope} { font-size:${mobileHeadingSize}; }
		}
	`;
};
