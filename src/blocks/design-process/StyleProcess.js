import styled, { css } from 'styled-components';
import BorderProperty from '../borderProperty';

export const StyleComp = ({ attributes, children }) => {
  return (
    < StyledUL attributes={attributes} >
      {children}
    </StyledUL >
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

const StyledUL = styled.ul`
  ${({ attributes }) => {

    const {
      bgColor_form,
      bgGradient_form,
      radius_form,
      border_form,
      margin_form,
      padding_form,
      font_style_num,
      textColor_num,
      bgColor_num,
      font_style_process,
      textColor_process,

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
    const form_margin_prm = space_prm(margin_form);
    const form_padding_prm = space_prm(padding_form);

    // 共通のスタイルをここで定義します
    const commonStyle = css`
      list-style: none;
      overflow: hidden;
      counter-reset: step;
      position: relative;
      z-index: 10;
      margin: ${form_margin_prm};
      padding: ${form_padding_prm};
      background: ${bgFormColor};
      border-radius: ${form_radius_prm};
      ${BorderProperty(border_form)};
      li {
        color: ${textColor_process};
        text-transform: uppercase;
        font-size: ${font_style_process.fontSize};
        font-family: ${font_style_process.fontFamily};
        font-weight: ${font_style_process.fontWeight};
        font-style: ${fontStyle_process};
        width: 33.33%;
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

    // 共通のスタイルを組み合わせて返します
    return css`
      ${commonStyle}
    `;
  }}
`;




