import styled, { css } from 'styled-components';
import BorderProperty from '../borderProperty';

export const StyleComp = ({ attributes, children }) => {
  return (
    <StyledDiv attributes={attributes}>
      {children}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  ${({ attributes }) => {
    const {
      font_style_heading,
      margin_heading,
      padding_heading,
      backgroundColor,
      backgroundGradient,
      textColor,
      radius_heading,
      border_heading,
      optionStyle,
      className,
    } = attributes;

    //単色かグラデーションかの選択
    const bgColor = backgroundColor || backgroundGradient;
    //斜体の設定
    const fontStyle_header = font_style_heading.isItalic ? "italic" : "normal";
    //角丸の設定
    const header_radius_prm = (radius_heading && Object.keys(radius_heading).length === 1) ? radius_heading.value : `${(radius_heading && radius_heading.topLeft) || ''} ${(radius_heading && radius_heading.topRight) || ''} ${(radius_heading && radius_heading.bottomRight) || ''} ${(radius_heading && radius_heading.bottomLeft) || ''}`

    // 共通のスタイルをここで定義します
    const commonStyle = css`
      background: ${bgColor};
      margin: ${margin_heading.top} ${margin_heading.right} ${margin_heading.bottom} ${margin_heading.left};
      border-radius: ${header_radius_prm};
      ${BorderProperty(border_heading)};
      > div{
        color: ${textColor};
        font-size: ${font_style_heading.fontSize};
        font-family: ${font_style_heading.fontFamily};
        font-weight: ${font_style_heading.fontWeight};
        font-style: ${fontStyle_header};
        padding: ${padding_heading.top} ${padding_heading.right} ${padding_heading.bottom} ${padding_heading.left};
      }
      `;

    // classNameに基づいて特定のスタイルを定義します
    let specificStyle = null;

    if (optionStyle) {//optionStyleが初期化されているとき
      switch (className) {
        //縦棒を入れる
        case 'is-style-virtical_line':
          if (optionStyle.colorVal_border !== undefined) {
            specificStyle = css`
            border-left: ${optionStyle.barWidth} ${optionStyle.colorVal_border} solid !important;
            padding-left: ${optionStyle.barSpace};
          `
          } else {
            specificStyle = css`
            border-left: ${optionStyle.barWidth} solid;
            border-image: ${optionStyle.gradientVal_border};
            border-image-slice: 1; 
            padding-left: ${optionStyle.barSpace}; 
          `
          }
          break;
        case 'is-style-sub_copy':
          //背景色の設定
          const bgColor = optionStyle.color_background_copy || optionStyle.gradient_background_copy;
          //斜体の設定
          const fontStyle = optionStyle.font_style_copy.isItalic ? "italic" : "normal";
          //角丸の設定
          const radius_prm = (optionStyle.radius_copy && Object.keys(optionStyle.radius_copy).length === 1) ? optionStyle.radius_copy.value : `${(optionStyle.radius_copy && optionStyle.radius_copy.topLeft) || ''} ${(optionStyle.radius_copy && optionStyle.radius_copy.topRight) || ''} ${(optionStyle.radius_copy && optionStyle.radius_copy.bottomRight) || ''} ${(optionStyle.radius_copy && optionStyle.radius_copy.bottomLeft) || ''}`
          //パディングの設定（アイコン幅の確保）
          const getPadding = (isIcon, icon_style) => {
            if (!isIcon) {
              return `${optionStyle.padding_copy.top} ${optionStyle.padding_copy.right} ${optionStyle.padding_copy.bottom} ${optionStyle.padding_copy.left}`
            }
            if (icon_style.icon_pos === "left") {
              return `${optionStyle.padding_copy.top} ${optionStyle.padding_copy.right} ${optionStyle.padding_copy.bottom} calc(${optionStyle.padding_copy.left} + ${icon_style.icon_size} +  ${icon_style.icon_space})`
            }
            if (icon_style.icon_pos === "right") {
              return `${optionStyle.padding_copy.top} calc(${optionStyle.padding_copy.right} + ${icon_style.icon_size} +  ${icon_style.icon_space}) ${optionStyle.padding_copy.bottom} ${optionStyle.padding_copy.left}`
            }
          }
          const padding_prm = getPadding(optionStyle.isIcon, optionStyle.icon_style);

          //文字列のレンダリングの長さ
          function measureTextWidth(text, fontSize, fontFamily) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            context.font = `${fontSize} ${fontFamily}`;
            const metrics = context.measureText(text);
            return metrics.width;
          }

          const textWidth = `${measureTextWidth(optionStyle.copy_content, optionStyle.font_style_copy.fontSize, optionStyle.font_style_copy.fontFamily)}px`;

          //アイコンの位置計算
          const tranceX = optionStyle.icon_style.icon_pos !== 'left' ?
            `calc(${optionStyle.padding_copy.left} + ${optionStyle.padding_copy.right} + ${textWidth} )` :
            ` ${optionStyle.icon_style.icon_space}`;
          const tranceY = `calc((${optionStyle.padding_copy.top} + ${optionStyle.padding_copy.bottom} + ${optionStyle.font_style_copy.fontSize} - ${optionStyle.icon_style.icon_size}) / 2 * -1)`

          specificStyle = css`
            position: relative;
            &::before{
              font-size: ${optionStyle.font_style_copy.fontSize};
              font-family: ${optionStyle.font_style_copy.fontFamily};
              font-weight: ${optionStyle.font_style_copy.fontWeight};
              font-style: ${fontStyle};
              position: absolute;
              bottom: 100%;
              left: 0;
              content: '${optionStyle.copy_content}';
              color:${optionStyle.color_text_copy};
              border-radius: ${radius_prm};
              background: ${bgColor};
              padding:${padding_prm};
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



