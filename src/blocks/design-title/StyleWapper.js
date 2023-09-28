import styled, { css } from 'styled-components';
import { radius_prm, space_prm, convertToScss, borderProperty } from '../cssPropertes';

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
      font_style_heading,
      margin_heading,
      padding_heading,
      align,
      bg_heading,
      gr_heading,
      textColor,
      radius_heading,
      border_heading,
      optionStyle,
      shadow_result,
      is_shadow,
      is_underLine,
      underLine_prop,
      bgColor_underLine,
      bgGradient_underLine,
      className,
    } = attributes;

    //単色かグラデーションかの選択
    const bgColor = bg_heading || gr_heading;
    const bgUnderLine = bgColor_underLine || bgGradient_underLine;
    //斜体の設定
    const fontStyle_header = font_style_heading.isItalic ? "italic" : "normal";
    //角丸の設定
    const header_radius_prm = radius_prm(radius_heading);
    //ボックスシャドーの設定
    const box_shadow_style = is_shadow && shadow_result ? convertToScss(shadow_result) : ''
    //テキストの配置
    const align_style = align === 'center' ? 'margin-left:auto; margin-right: auto' :
      align === 'right' ? 'margin-left:auto' : '';
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
        left: 0;
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


    // 共通のスタイルをここで定義します
    const commonStyle = css`
      position: relative;
      z-index: 10;
      background: ${bgColor};
      margin: ${space_prm(margin_heading)};
      ${align_style};
      border-radius: ${header_radius_prm};
      ${borderProperty(border_heading)};
      ${box_shadow_style};
      ${headingType}{
        color: ${textColor};
        font-size: ${font_style_heading.fontSize};
        font-family: ${font_style_heading.fontFamily};
        font-weight: ${font_style_heading.fontWeight};
        font-style: ${fontStyle_header};
        padding: ${space_prm(padding_heading)};
        ${underLine}
      }
      a{
        color: ${textColor};
        text-decoration: none !important;
      }
      `;

    // classNameに基づいて特定のスタイルを定義します
    let specificStyle = null;

    if (optionStyle && (className === optionStyle.styleName)) {//optionStyleが初期化されていてスタイル名とclassNameが一致する
      switch (className) {
        //サークルを入れる
        case 'is-style-circle_marker':
          //背景色の設定
          const circleColor = optionStyle.colorVal_circle || optionStyle.gradientVal_circle;
          const secondColor = optionStyle.colorVal_second || optionStyle.gradientVal_second;
          specificStyle = css`
            border: none;
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
          break;
        case 'is-style-sub_copy':
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
            'top': `margin-top: calc(${margin_heading.top} + ${optionStyle.font_style_copy.fontSize} + ${optionStyle.padding_copy.top} + ${optionStyle.padding_copy.bottom})`,
            'bottom': `margin-bottom: calc(${margin_heading.top} + ${optionStyle.font_style_copy.fontSize} + ${optionStyle.padding_copy.top} + ${optionStyle.padding_copy.bottom})`
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
          break

      }
    }


    // 共通のスタイルと特定のスタイルを組み合わせて返します
    return css`
      ${commonStyle}
      ${specificStyle}
      `;
  }}
`;





