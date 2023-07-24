import styled, { css } from 'styled-components';
import BorderProperty from '../borderProperty';

export const StyleComp = ({ attributes, children }) => {
  return (
    < StyledDiv attributes={attributes} >
      {children}
    </StyledDiv >
  );
}
//角丸のパラメータを返す
const radius_prm = (radius) => {
  const ret_radius_prm = (radius && Object.keys(radius).length === 1) ? radius.value : `${(radius && radius.topLeft) || ''} ${(radius && radius.topRight) || ''} ${(radius && radius.bottomRight) || ''} ${(radius && radius.bottomLeft) || ''}`
  return (
    ret_radius_prm
  )
}
//スペースのパラメータを返す
const space_prm = (space) => {
  const ret_space_prm = `${space.top} ${space.right} ${space.bottom} ${space.left}`;
  return (
    ret_space_prm
  )
}

const StyledDiv = styled.div`
  ${({ attributes }) => {

    const {
      font_style_input,
      bgColor_input,
      bgGradient_input,
      textColor_input,
      radius_input,
      border_input,
      margin_input,
      padding_input,
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
    const bgInputColor = bgColor_input || bgGradient_input;
    const bgLabelColor = bgColor_label || bgGradient_label;
    //斜体の設定
    const fontStyle_input = font_style_input.isItalic ? "italic" : "normal";
    const fontStyle_label = font_style_label.isItalic ? "italic" : "normal";
    //角丸の設定
    const input_radius_prm = radius_prm(radius_input);
    const label_radius_prm = radius_prm(radius_label);
    //スペースの設定
    const input_margin_prm = space_prm(margin_input);
    const input_padding_prm = space_prm(padding_input);
    const label_padding_prm = space_prm(padding_label);

    // 共通のスタイルをここで定義します
    const commonStyle = css`
      display: flex;
      margin: ${input_margin_prm};
      padding: ${input_padding_prm};
      position: relative;
      input, textarea{
        flex-grow: 1;
        background: ${bgInputColor};
        border-radius: ${input_radius_prm};
        color: ${textColor_input};
        font-size: ${font_style_input.fontSize};
        font-family: ${font_style_input.fontFamily};
        font-weight: ${font_style_input.fontWeight};
        font-style: ${fontStyle_input};
        ${BorderProperty(border_input)};
      }
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
        padding: ${label_padding_prm};
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





