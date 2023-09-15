import styled, { css } from 'styled-components';
import { radius_prm, space_prm, convertToScss, borderProperty } from '../cssPropertes';

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
      font_style_th,
      font_style_td,
      margin_value,
      padding_value,
      th_color,
      bgColor_th,
      bgGradient_th,
      padding_th,
      td_color,
      bgColor_td,
      bgGradient_td,
      padding_td,
      radius_value,
      border_value,
      shadow_result,
      is_shadow,
      className,
    } = attributes;

    //単色かグラデーションかの選択
    const bgColorTh = bgColor_th || bgGradient_th;
    const bgColorTd = bgColor_td || bgGradient_td;
    //斜体の設定
    const fontStyle_th = font_style_th.isItalic ? "italic" : "normal";
    const fontStyle_td = font_style_td.isItalic ? "italic" : "normal";
    //角丸の設定
    const table_radius_prm = radius_prm(radius_value);
    //スペースの設定
    const table_margin_prm = space_prm(margin_value);
    const table_padding_prm = space_prm(padding_value);
    //ボックスシャドーの設定
    const box_shadow_style = is_shadow && shadow_result ? convertToScss(shadow_result) : ''

    // 共通のスタイルをここで定義します
    const commonStyle = css`
      margin: ${table_margin_prm};
      padding: ${table_padding_prm};
      border-radius: ${table_radius_prm};
      ${box_shadow_style};
      
      table{
        ${borderProperty(border_value)};
      }
    `;


    // const cssMap = {
    //   'is-style-progress': barStyle,
    //   'is-style-card': cardStyle,
    // };
    // const defaultStyle = barStyle;
    // const optionStyle = cssMap[className] || defaultStyle;
    // 共通のスタイルを組み合わせて返します
    return css`
      ${commonStyle}
    `;
  }}
`;





