import styled, { css } from 'styled-components';
import { radius_prm, space_prm, convertToScss, borderProperty } from '../cssPropertes';

export const StyleComp = ({ attributes, children }) => {
  return (
    < StyledUL attributes={attributes} >
      {children}
    </StyledUL >
  );
}


const StyledUL = styled.ul`
  ${({ attributes }) => {

    const {
      figure_blocks,
      bgColor_form,
      bgGradient_form,
      radius_form,
      border_form,
      default_pos,
      mobile_pos,
      font_style_num,
      textColor_num,
      bgColor_num,
      font_style_process,
      textColor_process,
      shadow_result,
      is_shadow,
      className,
    } = attributes;

    //単色かグラデーションかの選択
    const bgFormColor = bgColor_form || bgGradient_form;
    //斜体の設定
    const fontStyle_num = font_style_num.isItalic ? "italic" : "normal";
    const fontStyle_process = font_style_process.isItalic ? "italic" : "normal";
    //角丸の設定
    const form_radius_prm = radius_prm(radius_form);
    //スペースの設定
    const default_form_margin_prm = space_prm(default_pos.margin_form);
    const default_form_padding_prm = space_prm(default_pos.padding_form);
    const mobile_form_margin_prm = space_prm(mobile_pos.margin_form);
    const mobile_form_padding_prm = space_prm(mobile_pos.padding_form);
    //ボックスシャドーの設定
    const box_shadow_style = is_shadow && shadow_result ? convertToScss(shadow_result) : ''

    // 共通のスタイルをここで定義します
    const commonStyle = css`
      list-style: none;
      overflow: hidden;
      counter-reset: step;
      position: relative;
      z-index: 10;
      margin: ${default_form_margin_prm};
      padding: ${default_form_padding_prm};
      background: ${bgFormColor};
      border-radius: ${form_radius_prm};
      ${borderProperty(border_form)};
      ${box_shadow_style};
      @media (max-width: 767px) {
        margin: ${mobile_form_margin_prm};
        padding: ${mobile_form_padding_prm};
      }
    `;
    const barStyle = css`
      li {
        color: ${textColor_process};
        text-transform: uppercase;
        font-size: ${font_style_process.fontSize};
        font-family: ${font_style_process.fontFamily};
        font-weight: ${font_style_process.fontWeight};
        font-style: ${fontStyle_process};
        width: ${Math.round(100 / figure_blocks.length)}%;
        float: left;
        position: relative;
        letter-spacing: 1px;
        text-align: center;
        
  
        &::before {
          content: counter(step);
          counter-increment: step;
          width: 1.5em;
          height: 1.5em;
          line-height: 1.3em;
          text-align: center;
          display: block;
          font-size: ${font_style_num.fontSize};
          font-family: ${font_style_num.fontFamily};
          font-weight: ${font_style_num.fontWeight};
          font-style: ${fontStyle_num};
          color: ${textColor_num};
          background: white;
          border: ${textColor_num} solid 1px;
          border-radius: 50%;
          margin: 0 auto;
        }
  
        &::after {
          content: '';
          width: 100%;
          height: 2px;
          position: absolute;
          left: -50%;
          font-size: ${font_style_num.fontSize};
          top: 0.75em;
          background-image: linear-gradient(to right, ${textColor_num} 50%, ${bgColor_num} 50%);
          background-position: 0 0;
          background-size: 200% auto;
          transition: all 1s;
          z-index: -1;
          /*put it behind the numbers*/
        }
  
        &:first-child {
          &::after {
            /*connector not needed before the first step*/
            content: none;
          }
        }
  
        &.ready {
          &::before {
            background: ${bgColor_num};
            color: white;
            border: none;
          }
  
          &::after {
            background-position: -100% 0;
            color: #fff;
          }
        }
      }  
    `;

    const cardStyle = css`
      display:flex;
      li {
        color: ${textColor_process};
        text-transform: uppercase;
        font-size: ${font_style_process.fontSize};
        font-family: ${font_style_process.fontFamily};
        font-weight: ${font_style_process.fontWeight};
        font-style: ${fontStyle_process};
        width: ${Math.round(80 / figure_blocks.length)}%;
        height: 3em;
        line-height: 3em;
        position: relative;
        letter-spacing: 1px;
        padding-left:10px;
        text-align: center;
        border: solid 2px ${textColor_process};
        border-radius: 15px;
        transition: all 0.3s ease 0s;
        background-image: linear-gradient(to right, rgba(255, 255, 255) 50%, ${bgColor_num} 50%);
        background-position: 0 0;
        background-size: 200% auto;
        &:not(:first-child){
          margin-left: 2em;
        }
        
        &::before {
          position: absolute;
          content: counter(step);
          counter-increment: step;
          left:15px;
          top:50%;
          transform: translateY(-50%);
          width: 1.5em;
          height: 1.5em;
          line-height: 1.3em;
          text-align: center;
          display: block;
          font-size: ${font_style_num.fontSize};
          font-family: ${font_style_num.fontFamily};
          font-weight: ${font_style_num.fontWeight};
          font-style: ${fontStyle_num};
          color: ${textColor_num};
          background: white;
          border: ${textColor_num} solid 1px;
          border-radius: 50%;
          margin: 0 auto;
        }

        &::after {
          content: " ";
          position: absolute;
          font-size: ${font_style_num.fontSize};
          top: 50%;
          transform: translateY(-50%);
          left: -25px;
          width: 0;
          height: 0;
          border-style: solid;
          border-top: 1.5em solid transparent;
          border-bottom: 1.5em solid transparent;
          border-left: 1em solid  ${textColor_process};
          border-right: 0;
        }

        &:first-child {
          &::after {
            /*connector not needed before the first step*/
            content: none;
          }
        }

        &.ready {
          background-position: -100% 0;
          border: none;
          color: #fff;
          &::before {
            background: #fff;
            color: ${bgColor_num};
            border: none;
          }

          &::after {
            border-left: 1em solid ${bgColor_num};
          }
        }
      }  
    `;

    const cssMap = {
      'is-style-progress': barStyle,
      'is-style-card': cardStyle,
    };
    const defaultStyle = barStyle;
    const optionStyle = cssMap[className] || defaultStyle;
    // 共通のスタイルを組み合わせて返します
    return css`
      ${commonStyle}
      ${optionStyle}
    `;
  }}
`;





