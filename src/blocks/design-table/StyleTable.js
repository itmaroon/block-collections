import styled, { css } from 'styled-components';
import { radius_prm, space_prm, convertToScss, borderProperty } from '../cssPropertes';
import { hslToRgb16, HexToRGB, rgb16ToHsl } from '../hslToRgb';
import { dispatch } from '@wordpress/data';

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
      default_pos,
      mobile_pos,
      th_color,
      bgColor_th,
      bgGradient_th,
      td_color,
      bgColor_td,
      bgGradient_td,
      radius_value,
      border_value,
      intensity,
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
    const default_table_margin_prm = space_prm(default_pos.margin_value);
    const default_table_padding_prm = space_prm(default_pos.padding_value);
    const default_th_padding_prm = space_prm(default_pos.padding_th);
    const default_td_padding_prm = space_prm(default_pos.padding_td);
    const mobile_table_margin_prm = space_prm(mobile_pos.margin_value);
    const mobile_table_padding_prm = space_prm(mobile_pos.padding_value);
    const mobile_th_padding_prm = space_prm(mobile_pos.padding_th);
    const mobile_td_padding_prm = space_prm(mobile_pos.padding_td);
    //ボックスシャドーの設定
    const box_shadow_style = is_shadow && shadow_result ? convertToScss(shadow_result) : ''
    //ボーダーの代表色
    const borderColor = border_value.bottom ? border_value.bottom.color : border_value.color;


    // 共通のスタイルをここで定義します
    const commonStyle = css`
      margin: ${default_table_margin_prm};
      padding: ${default_table_padding_prm};
      border-radius: ${table_radius_prm};
      ${box_shadow_style};
      @media (max-width: 767px) {
        margin: ${mobile_table_margin_prm};
        padding: ${mobile_table_padding_prm};
      }
      table{
        width:100%;
        border-collapse: collapse;
        thead{
          tr:last-child{
            border-bottom:  4px double ${borderColor}; 
          }
        }
       
        th,td{
          ${borderProperty(border_value)};
        }
        th{
          font-size: ${font_style_th.fontSize};
          font-family: ${font_style_th.fontFamily};
          font-weight: ${font_style_th.fontWeight};
          font-style: ${fontStyle_th};
          color: ${th_color};
          background: ${bgColorTh};
          padding: ${default_th_padding_prm};
          min-width:${default_pos.headding_min_width}px;
          @media (max-width: 767px) {
            padding: ${mobile_th_padding_prm};
            min-width:${mobile_pos.headding_min_width}px;
          }
        }
        td{
          font-size: ${font_style_td.fontSize};
          font-family: ${font_style_td.fontFamily};
          font-weight: ${font_style_td.fontWeight};
          font-style: ${fontStyle_td};
          color: ${td_color};
          background: ${bgColorTd};
          padding: ${default_td_padding_prm};
          @media (max-width: 767px) {
            padding: ${mobile_td_padding_prm};
          }
        }
        
      }
    `;

    //ストライプ色
    const stripe = (baseColor, is_dark) => {
      if (baseColor) {
        const hslValue = rgb16ToHsl(baseColor);
        //明るさを変更
        const lightVal = (hslValue.lightness + intensity) < 100 ? hslValue.lightness + intensity : 100;
        const darkVal = (hslValue.lightness - intensity) > 0 ? hslValue.lightness - intensity : 0;
        return is_dark ? hslToRgb16(hslValue.hue, hslValue.saturation, darkVal) : hslToRgb16(hslValue.hue, hslValue.saturation, lightVal);
      }
      else {
        return null;
      }
    }
    const lightValueTh = stripe(bgColor_th, false);//明るい色
    const darkValueTh = stripe(bgColor_th, true);//暗い色
    const lightValueTd = stripe(bgColor_td, false);//明るい色
    const darkValueTd = stripe(bgColor_td, true);//暗い色

    //エラーメッセージの表示
    if (!(lightValueTh && darkValueTh && lightValueTd && darkValueTd) && className === 'is-style-stripe') {
      dispatch('core/notices').createNotice(
        'error',
        __("If the background color of the cell is set to gradient, stripes will not be applied.", 'itmar_block_collections'),
        { type: 'snackbar' }
      );
    }

    const stripeStyle = css`
      table{
        tr{
          &:nth-child(even){
            th{
              background: ${darkValueTh};
            }
            td{
              background: ${darkValueTd};
            }
          }
          &:nth-child(odd){
            th{
              background: ${lightValueTh};
            }
            td{
              background: ${lightValueTd};
            }
          }
        }
        
      }
    `


    const cssMap = {
      'is-style-stripe': stripeStyle,
    };

    const optionStyle = cssMap[className] || null;
    // 共通のスタイルを組み合わせて返します
    return css`
      ${commonStyle}
      ${optionStyle}
    `;
  }}
`;







