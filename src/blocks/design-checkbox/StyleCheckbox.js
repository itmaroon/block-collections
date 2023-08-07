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
      font_style_label,
      margin_value,
      padding_value,
      backgroundColor,
      backgroundGradient,
      labelColor,
      boxColor,
      boxBgColor,
      radius_heading,
      border_heading,
      className,
    } = attributes;

    //単色かグラデーションかの選択
    const bgColor = backgroundColor || backgroundGradient;
    //斜体の設定
    const fontStyle_label = font_style_label.isItalic ? "italic" : "normal";
    //角丸の設定
    const heading_radius_prm = radius_prm(radius_heading);
    //スペースの設定
    const heading_margin_prm = space_prm(margin_value);
    const heading_padding_prm = space_prm(padding_value);

    // 共通のスタイルをここで定義します
    const commonStyle = css`
      margin: ${heading_margin_prm};
      padding: ${heading_padding_prm};
      background: ${bgColor};
      border-radius: ${heading_radius_prm};
      ${BorderProperty(border_heading)};
      display: flex;
      input[type='checkbox'] {
        display: none;
      }
      div{
        font-size: ${font_style_label.fontSize};
        font-family: ${font_style_label.fontFamily};
        font-weight: ${font_style_label.fontWeight};
        font-style: ${fontStyle_label};
        color: ${labelColor};
        margin:0;
        line-height: 1.2;
      }
		  
    
      @keyframes dothabottomcheck{
          0% { height: 0; }
          100% { height: 0.5em;  }
      }
      
      @keyframes dothatopcheck{
          0% { height: 0; }
          50% { height: 0; }
          100% { height: 1.2em; }
      }
      
      label{
        display: flex;
        span {
        font-size: ${font_style_label.fontSize};
        border: 0.2em solid ${boxColor};
        height: 1.2em;
        width: 1.2em;
        background-color: transparent;
        border-radius: 5px;
        position: relative;
        display: inline-block;
        box-sizing: border-box;
        transition: border-color ease 0.2s;
        margin-right: 1em;
        cursor:pointer;

        &::before, &::after {
          box-sizing: border-box;
          position: absolute;
          height: 0;
          width: 0.2em;
          background-color: ${boxBgColor};
          display: inline-block;
          
          transform-origin: left top;
          border-radius: 5px;
          content: ' ';
          
          transition: opacity ease .5s;
        }
    
        &::before {
          top:.72em;
          left: .41em;
          box-shadow: 0 0 0 .05em ${bgColor};
          transform: rotate(-135deg);
        }
    
        &::after {
            top: .37em;
            left:.05em;
            transform: rotate(-45deg);
        }
      }

      input[type=checkbox]:checked + span{
        border-color: ${boxBgColor};
        
        &::after{
            height: .5em;
            animation: dothabottomcheck 0.2s ease 0s forwards;
        }
        
        &::before{
            height:1.2em;
            animation: dothatopcheck 0.4s ease 0s forwards;
        }
      }
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





