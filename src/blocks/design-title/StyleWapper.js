import styled, { css } from 'styled-components';

export const StyleComp = ({ attributes, children  }) => {
  return (
    <StyledDiv attributes = { attributes }>
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
      className,
    } = attributes;

    switch (className) {
      //縦棒を入れる
      case 'is-style-virtical_line': 
        if(colorVal_border!==undefined) {
          return css`
            border-left: ${barWidth} ${colorVal_border} solid !important;
            padding-left: ${barSpace};
          `
        }else{
          return css`
            border-left: ${barWidth} solid;
            border-image: ${gradientVal_border};
            border-image-slice: 1; 
            padding-left: ${barSpace}; 
          `
        }
      case 'is-style-sub_copy': 
        //背景色の設定
        const bgColor = color_background_copy===undefined ? gradient_background_copy : color_background_copy;
        //斜体の設定
        const fontStyle = font_style_copy.isItalic ? "italic" : "nomal";
        //角丸の設定
        const radius_prm = radius_copy.length == 1 ? radius_copy.value : `${radius_copy.topLeft} ${radius_copy.topRight} ${radius_copy.bottomRight} ${radius_copy.bottomLeft}`
        //パディングの設定
        const padding_prm = `${padding_copy.top} ${padding_copy.right} ${padding_copy.bottom} ${padding_copy.left}`

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
      `
      default:
        return css`
          padding: 0;
        `
    }  
  }}
`;
  
 

