import styled, { css } from 'styled-components';
import BorderProperty from '../borderProperty';

export const StyleComp = ({ attributes, children }) => {
  return (
    < StyledDiv attributes={attributes} >
      {children}
    </StyledDiv >
  );
}

const StyledDiv = styled.div`
  ${({ attributes }) => {

    const {

      font_style_label,
      bgColor_label,
      bgGradient_label,
      textColor_label,
      radius_label,
      border_label,
      padding_label,
      labelSpace,
      labelWidth,
      className,
    } = attributes;

    //単色かグラデーションかの選択
    const bgLabelColor = bgColor_label || bgGradient_label;
    //斜体の設定
    const fontStyle_label = font_style_label.isItalic ? "italic" : "normal";
    //角丸の設定
    const label_radius_prm = (radius_label && Object.keys(radius_label).length === 1) ? radius_label.value : `${(radius_label && radius_label.topLeft) || ''} ${(radius_label && radius_label.topRight) || ''} ${(radius_label && radius_label.bottomRight) || ''} ${(radius_label && radius_label.bottomLeft) || ''}`
    //パディングの設定
    const padding_prm = `${padding_label.top} ${padding_label.right} ${padding_label.bottom} ${padding_label.left}`

    // 共通のスタイルをここで定義します
    const commonStyle = css`
      label{
        display: inline-block;
        vertical-align: top;
        width:${labelWidth};
        white-space: nowrap;
        background: ${bgLabelColor};
        border-radius: ${label_radius_prm};
        color: ${textColor_label};
        font-size: ${font_style_label.fontSize};
        font-family: ${font_style_label.fontFamily};
        font-weight: ${font_style_label.fontWeight};
        font-style: ${fontStyle_label};
        margin-right: ${labelSpace};
        padding: ${padding_prm};
        ${BorderProperty(border_label)};
        span{
          color:red;
        }
      }
      
      `;

    // 共通のスタイルを組み合わせて返します
    return css`
      ${commonStyle}
    `;
  }}
`;





