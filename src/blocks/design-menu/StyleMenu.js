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
      radius_val,
      border_val,
      margin_val,
      padding_val,
      shadow_result,
      is_shadow,
      grid_info,
      className,
    } = attributes;


    //角丸の設定
    const form_radius_prm = radius_prm(radius_val);
    //スペースの設定
    const form_margin_prm = space_prm(margin_val);
    const form_padding_prm = space_prm(padding_val);
    //ボックスシャドーの設定
    const box_shadow_style = is_shadow && shadow_result ? convertToScss(shadow_result) : ''

    // 共通のスタイルをここで定義します
    const commonStyle = css`
      position: relative;
      margin: ${form_margin_prm};
      padding: ${form_padding_prm};
      border-radius: ${form_radius_prm};
      ${borderProperty(border_val)};
      ${box_shadow_style};
    `;
    //横並びスタイル
    const horizenStyle = css`
      > div{
        display: flex;
      }
    `;

    //縦並びスタイル
    const virticalStyle = css`
      > div{
        display: block;
      }
    `;

    //カードスタイル
    const gridStyle = css`
      > div{
        display: grid;
        grid-template-columns: repeat(${grid_info.col_num}, 1fr);
      }
    `;

    const cssMap = {
      'is-style-horizen': horizenStyle,
      'is-style-virticle': virticalStyle,
      'is-style-grid': gridStyle,
    };

    const optionStyle = cssMap[className] || horizenStyle;

    // 共通のスタイルを組み合わせて返します
    return css`
      ${commonStyle}
      ${optionStyle}
    `;
  }}
`;





