import styled, { css } from 'styled-components';
import { radius_prm, space_prm, convertToScss, borderProperty } from '../cssPropertes';
import { ShadowElm } from '../ShadowStyle'

export const StyleComp = ({ attributes, children }) => {
  return (
    < StyledDiv id={attributes.headingID} attributes={attributes} >
      {children}
    </StyledDiv >
  );
}

const StyledDiv = styled.div`
  ${({ attributes }) => {

    const {
      headingType,
      align,
      padding_heading,
      radius_heading,
      border_heading,
      optionStyle,
      shadow_result,
      shadow_element,
      is_shadow,
      is_underLine,
      underLine_prop,
      linkKind,
      menu_pos,
      bgColor_underLine,
      bgGradient_underLine,
      className,
    } = attributes;

    //単色かグラデーションかテーマ色かの選択
    const bgUnderLine = bgColor_underLine || bgGradient_underLine || 'var(--wp--preset--color--text)';

    //角丸の設定
    const header_radius_prm = radius_prm(radius_heading);
    //ボックスシャドーの設定
    const box_shadow_style = is_shadow && shadow_result ? convertToScss(shadow_result) : ''
    //テキストの配置
    const align_style = align === 'center' ? 'margin-left:auto; margin-right: auto' :
      align === 'right' ? 'margin-left:auto' : '';
    //paddingの修正関数
    const ajust_padding = (padding, pos) => {
      const values = padding.split(' ');
      const pos_num = pos === 'left' ? 3 : 1
      values[pos_num] = `calc(${values[pos_num]} + 1em)`;
      // 配列をスペースで連結して文字列に戻す
      return values.join(' ');
    }
    //アニメーション

    //アンダーライン
    const underLine = is_underLine ?
      `
      position: relative;
      &::after{
        content: '';
        position: absolute;
        display: block;
        ${underLine_prop.is_anime
        ? `
            width: 0;
          `
        : `width: ${underLine_prop.width};`} 
        height: ${underLine_prop.height};
        bottom: ${underLine_prop.distance};
        background: ${bgUnderLine};
        left: 50%;
        transform: translateX(-50%);
        transition: all 0.3s ease 0s;
      }
      ${underLine_prop.is_anime
        ? `
          &:hover {
            &::after {
              width: ${underLine_prop.width};
            }
          }
        `
        : ''}
      `
      : null;
    //paddingの調整（サブメニューの印）
    const render_padding = linkKind === 'submenu' ? ajust_padding(space_prm(padding_heading), menu_pos.split(' ')[1]) : space_prm(padding_heading);
    //矢印の方向
    const directionMap = {
      'top left': 'height: calc(12px / 2);width: 12px;left: 10px;clip-path: polygon(50% 0, 100% 100%, 0 100%);',
      'top center': 'height: calc(12px / 2);width: 12px;right: 10px;clip-path: polygon(50% 0, 100% 100%, 0 100%);',
      'top right': 'height: calc(12px / 2);width: 12px;right: 10px;clip-path: polygon(50% 0, 100% 100%, 0 100%);',
      'center left': 'height: 12px;width: calc(12px / 2);left: 10px;clip-path: polygon(100% 0, 100% 100%, 0 50%);',
      'center center': 'height: calc(12px / 2);width: 12px;right: 10px;clip-path: polygon(0 0, 100% 0, 50% 100%);',
      'center right': 'height: 12px;width: calc(12px / 2);right: 10px;clip-path: polygon(100% 50%, 0 100%, 0 0);',
      'bottom left': 'height: calc(12px / 2);width: 12px;left: 10px;clip-path: polygon(0 0, 100% 0, 50% 100%);',
      'bottom center': 'height: calc(12px / 2);width: 12px;right: 10px;clip-path: polygon(0 0, 100% 0, 50% 100%);',
      'bottom right': 'height: calc(12px / 2);width: 12px;right: 10px;clip-path: polygon(0 0, 100% 0, 50% 100%);'
    };
    const arrow_direction = directionMap[menu_pos];

    // 共通のスタイルをここで定義します
    const commonStyle = css`
      position: relative;
      z-index: 10;
      ${align_style};
      border-radius: ${header_radius_prm};
      ${borderProperty(border_heading)};
      ${box_shadow_style};
      ${headingType}{
        position: relative;
        padding: ${render_padding};
        white-space: nowrap !important;
        margin:0;
        font-weight: inherit;
        ${underLine}
      }
      a{
        text-decoration: none !important;
      }
      ${linkKind === 'submenu' && `
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: var(--wp--preset--color--text);
          ${arrow_direction}
        }
      `}
      
      `;

    // classNameに基づいて特定のスタイルを定義します
    let specificStyle = null;

    if (optionStyle && (className?.split(' ').includes(optionStyle.styleName))) {//optionStyleが初期化されていてスタイル名とclassNameが一致する
      if (className?.split(' ').includes('is-style-circle_marker')) {
        //サークルを入れる
        //背景色の設定
        const circleColor = optionStyle.colorVal_circle || optionStyle.gradientVal_circle || 'var(--wp--preset--color--accent-1)';
        const secondColor = optionStyle.colorVal_second || optionStyle.gradientVal_second || 'var(--wp--preset--color--accent-2)';
        specificStyle = css`
            &:before {
              content: '';
              position: absolute;
              display: block;
              width: ${optionStyle.circleScale};
              height: ${optionStyle.circleScale};
              border-radius: 50%;
              background: ${circleColor};
              top: ${optionStyle.first_long}%;
              left: ${optionStyle.first_lat}%;
              z-index: -1;
            }  
            ${optionStyle.isSecond && css`
              &:after {
                content: '';
                position: absolute;
                display: block;
                opacity: ${optionStyle.second_opacity};
                width: ${optionStyle.secondScale};
                height: ${optionStyle.secondScale};
                border-radius: 50%;
                background: ${secondColor};
                top: ${optionStyle.second_long}%;
                left: ${optionStyle.second_lat}%;
                z-index: -1;
              }
            `}
          `
      }
      else if (className?.split(' ').includes('is-style-sub_copy')) {
        //背景色の設定
        const bgColor = optionStyle.color_background_copy || optionStyle.gradient_background_copy;
        //斜体の設定
        const fontStyle = optionStyle.font_style_copy.isItalic ? "italic" : "normal";
        //角丸の設定
        const copy_radius_prm = radius_prm(optionStyle.radius_copy);
        //アイコンスペースの設定
        const icon_space = optionStyle.icon_style.icon_space || '0px'

        //パディングの設定（アイコン幅の確保）
        const getPadding = (isIcon, icon_style) => {
          if (!isIcon) {
            return space_prm(optionStyle.padding_copy)
          }
          if (icon_style.icon_pos === "left") {

            return `${optionStyle.padding_copy.top} ${optionStyle.padding_copy.right} ${optionStyle.padding_copy.bottom} calc(${optionStyle.padding_copy.left} + ${icon_style.icon_size} + ${icon_space})`
          }
          if (icon_style.icon_pos === "right") {
            return `${optionStyle.padding_copy.top} calc(${optionStyle.padding_copy.right} + ${icon_style.icon_size} + ${icon_space}) ${optionStyle.padding_copy.bottom} ${optionStyle.padding_copy.left} `
          }
        }
        const padding_prm = getPadding(optionStyle.isIcon, optionStyle.icon_style);


        //文字列のレンダリングの長さ
        function measureTextWidth(text, fontSize, fontFamily) {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          context.font = `${fontSize} ${fontFamily} `;
          const metrics = context.measureText(text);
          return metrics.width;
        }

        const textWidth = `${measureTextWidth(optionStyle.copy_content, optionStyle.font_style_copy.fontSize, optionStyle.font_style_copy.fontFamily)}px`;

        //アイコンの位置計算
        const tranceX = optionStyle.icon_style.icon_pos !== 'left' ?
          `calc(${optionStyle.padding_copy.left} + ${optionStyle.padding_copy.right} + ${textWidth})` :
          ` ${icon_space} `;
        const tranceY = `calc((${optionStyle.padding_copy.top} + ${optionStyle.padding_copy.bottom} + ${optionStyle.font_style_copy.fontSize} - ${optionStyle.icon_style.icon_size}) / 2 * -1)`

        //配置場所
        const alignMap = {
          'top left': 'bottom: 100%;left: 0;',
          'top center': 'bottom: 100%;left:50%;transform: translateX(-50%);',
          'top right': 'bottom: 100%;right: 0;',
          'center left': 'top:50%;transform: translateY(-50%);left:0;',
          'center center': 'top:50%;left:50%;transform: translate(-50%,-50%);',
          'center right': 'top:50%;transform: translateY(-50%);right:0;',
          'bottom left': 'top: 100%;left: 0;',
          'bottom center': 'top: 100%;left:50%;transform: translateX(-50%);',
          'bottom right': 'top: 100%;right: 0;',
        };
        const alignStyle = alignMap[optionStyle.alignment_copy];
        //上部マージンの確保
        const vMarginMap = {
          'top': `margin-top: calc(${padding_heading.top} + ${optionStyle.font_style_copy.fontSize} + ${optionStyle.padding_copy.top} + ${optionStyle.padding_copy.bottom})`,
          'bottom': `margin-bottom: calc(${padding_heading.top} + ${optionStyle.font_style_copy.fontSize} + ${optionStyle.padding_copy.top} + ${optionStyle.padding_copy.bottom})`
        }
        const virtical_margin = vMarginMap[optionStyle.alignment_copy.split(' ')[0]];

        specificStyle = css`
            position: relative;
            ${virtical_margin};
            &::before{
              font-size: ${optionStyle.font_style_copy.fontSize};
              font-family: ${optionStyle.font_style_copy.fontFamily};
              font-weight: ${optionStyle.font_style_copy.fontWeight};
              font-style: ${fontStyle};
              position: absolute;
              ${alignStyle}
              content: '${optionStyle.copy_content}';
              color:${optionStyle.color_text_copy};
              border-radius: ${copy_radius_prm};
              background: ${bgColor};
              padding:${padding_prm};
              line-height: 1
            }
            ${optionStyle.isIcon && css`
              &::after{
                content: '\\${optionStyle.icon_style.icon_name}';
                font-family: 'Font Awesome 5 Free';
                font-weight: 900;
                position: absolute;
                font-size: ${optionStyle.icon_style.icon_size};
                color: ${optionStyle.icon_style.icon_color};
                left: 0;
                bottom: 100%;
                transform: translate(${tranceX}, ${tranceY});
              }
            `}
          `
      }
    }


    // 共通のスタイルと特定のスタイルを組み合わせて返します
    return css`
      ${commonStyle}
      ${specificStyle}
      `;
  }}
`;





