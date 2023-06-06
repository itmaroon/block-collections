import styled, { css } from 'styled-components';

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
      barWidth,
      colorVal_border,
      barSpace,
      gradientVal_border,
      color_text_copy,
      color_background_copy,
      gradient_background_copy,
      copy_content,
      font_style_copy,
      radius_copy,
      padding_copy,
      isIcon,
      icon_style,
      className,
    } = attributes;

    switch (className) {
      //縦棒を入れる
      case 'is-style-virtical_line':
        if (colorVal_border !== undefined) {
          return css`
            border-left: ${barWidth} ${colorVal_border} solid !important;
            padding-left: ${barSpace};
          `
        } else {
          return css`
            border-left: ${barWidth} solid;
            border-image: ${gradientVal_border};
            border-image-slice: 1; 
            padding-left: ${barSpace}; 
          `
        }
      case 'is-style-sub_copy':
        //背景色の設定
        const bgColor = color_background_copy === undefined ? gradient_background_copy : color_background_copy;
        //斜体の設定
        const fontStyle = font_style_copy.isItalic ? "italic" : "nomal";
        //角丸の設定
        const radius_prm = radius_copy.length == 1 ? radius_copy.value : `${radius_copy.topLeft} ${radius_copy.topRight} ${radius_copy.bottomRight} ${radius_copy.bottomLeft}`
        //パディングの設定（アイコン幅の確保）
        const getPadding = (isIcon, icon_style) => {
          if (!isIcon) {
            return `${padding_copy.top} ${padding_copy.right} ${padding_copy.bottom} ${padding_copy.left}`
          }
          if (icon_style.icon_pos === "left") {
            return `${padding_copy.top} ${padding_copy.right} ${padding_copy.bottom} calc(${padding_copy.left} + ${icon_style.icon_size} +  ${icon_style.icon_space})`
          }
          if (icon_style.icon_pos === "right") {
            return `${padding_copy.top} calc(${padding_copy.right} + ${icon_style.icon_size} +  ${icon_style.icon_space}) ${padding_copy.bottom} ${padding_copy.left}`
          }
        }
        const padding_prm = getPadding(isIcon, icon_style);

        //文字列のレンダリングの長さ
        function measureTextWidth(text, fontSize, fontFamily) {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          context.font = `${fontSize} ${fontFamily}`;
          const metrics = context.measureText(text);
          return metrics.width;
        }

        const textWidth = `${measureTextWidth(copy_content, font_style_copy.fontSize, font_style_copy.fontFamily)}px`;

        //アイコンの位置計算
        const tranceX = icon_style.icon_pos !== 'left' ?
          `calc(${padding_copy.left} + ${padding_copy.right} + ${textWidth} )` :
          ` ${icon_style.icon_space}`;
        const tranceY = `calc((${padding_copy.top} + ${padding_copy.bottom} + ${font_style_copy.fontSize} - ${icon_style.icon_size}) / 2 * -1)`

        return css`
        position: relative;
        &::before{
          font-size: ${font_style_copy.fontSize};
          font-family: ${font_style_copy.fontFamily};
          font-weight: ${font_style_copy.fontWeight};
          font-style: ${fontStyle};
          position: absolute;
          bottom: 100%;
          left: 0;
          content: '${copy_content}';
          color:${color_text_copy};
          border-radius: ${radius_prm};
          background: ${bgColor};
          padding:${padding_prm};
        }
        ${isIcon && css`
          &::after{
            content: '\\${icon_style.icon_name}';
            font-family: 'Font Awesome 5 Free';
            font-weight: 900;
            position: absolute;
            font-size: ${icon_style.icon_size};
            color: ${icon_style.icon_color};
            left: 0;
            bottom: 100%;
            transform: translate(${tranceX}, ${tranceY});
          }
        `}
      `
      default:
        return css`
          padding: 0;
        `
    }
  }}
`;



