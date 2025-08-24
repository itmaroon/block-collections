import styled, { css } from "styled-components";
import { radius_prm, space_prm, convertToScss } from "itmar-block-packages";

export const StyleComp = ({ attributes, children, onBurstEnd }) => {
	return (
		<StyledDiv id={attributes.headingID} attributes={attributes}>
			{children}
			{attributes.is_waiting && (
				<>
					<div className={`spinner ${attributes.waiting_state}`}></div>
					<div
						className={`particles ${attributes.waiting_state}`}
						onAnimationEnd={(e) => {
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

const StyledDiv = styled.div`
	${({ attributes }) => {
		const {
			headingType,
			defaultHeadingSize,
			mobileHeadingSize,
			isMenuItem,
			padding_heading,
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
		} = attributes;

		//単色かグラデーションかテーマ色かの選択
		const bgUnderLine =
			bgColor_underLine ||
			bgGradient_underLine ||
			"var(--wp--preset--color--content)";

		//ボックスシャドーの設定
		const box_shadow_style =
			is_shadow && shadow_result ? convertToScss(shadow_result) : "";

		//paddingの修正関数
		const ajust_padding = (padding, pos_x, pos_y, space) => {
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
			? `
      position: relative;
      &::after{
        content: '';
        position: absolute;
        display: block;
        ${
					underLine_prop.is_anime
						? `
            width: 0;
          `
						: `width: ${underLine_prop.width};`
				} 
        height: ${underLine_prop.height};
        bottom: ${underLine_prop.distance};
        background: ${bgUnderLine};
        left: 50%;
        transform: translateX(-50%);
        transition: all 0.3s ease 0s;
      }
      ${
				underLine_prop.is_anime
					? `
          &:hover {
            &::after {
              width: ${underLine_prop.width};
            }
          }
        `
					: ""
			}
      `
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
		const render_padding =
			linkKind === "submenu"
				? ajust_padding(
						space_prm(padding_heading),
						menu_pos.split(" ")[1],
						"center",
				  )
				: space_prm(padding_heading);

		//矢印の方向
		const directionMap = {
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
		const arrow_direction = directionMap[menu_pos];

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
				position: relative;
				padding: ${render_padding};
				white-space: ${wrap};
				margin: 0;
				font-weight: inherit;
				${underLine};
				${vertical_style};
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
				const copy_padding = (isIcon, icon_style) => {
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
				const alignMap = {
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
				const alignStyle = alignMap[alignment_copy];
				//サブコピーのレンダリングスペースをパディングで確保
				const copy_space_horizen = isIcon
					? `${textWidth}px + ${padding_copy.right} + ${padding_copy.left} + ${icon_style.icon_size} + ${icon_space}`
					: `${textWidth}px + ${padding_copy.right} + ${padding_copy.left}`;
				const copy_space_vertical = `${font_style_copy.fontSize} + ${padding_copy.top} + ${padding_copy.bottom}`;
				const copy_space =
					alignment_copy.split(" ")[0] === "center"
						? copy_space_horizen
						: copy_space_vertical;
				const subcopy_padding = ajust_padding(
					"0px 0px 0px 0px",
					alignment_copy.split(" ")[1],
					alignment_copy.split(" ")[0],
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
