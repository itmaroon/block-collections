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

//スタイルオブジェクト変換関数
function convertToScss(styleObject) {
  let scss = '';
  for (const prop in styleObject) {
    if (styleObject.hasOwnProperty(prop)) {
      const scssProp = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
      scss += `${scssProp}: ${styleObject[prop]};\n`;
    }
  }
  return scss;
}


const StyledDiv = styled.div`
  ${({ attributes }) => {

    const {
      focusColor,
      bgColor,
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
      shadow_result,
      is_shadow,
      className,
    } = attributes;
    console.log(convertToScss(shadow_result));

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
    const box_shadow_style = is_shadow && shadow_result ? convertToScss(shadow_result) : ''


    // 共通のスタイルをここで定義します
    const commonStyle = css`
      
      padding: ${input_padding_prm};
      margin: ${input_margin_prm};
      background: ${bgColor};
      
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
      }
      label{
        display: inline-block;
        vertical-align: top;
        
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
        ${box_shadow_style};
        span{
          color:red;
        }
      }
      
    `;

    // classNameに基づいて特定のスタイルを定義します
    let specificStyle = null;
    switch (className) {
      case 'is-style-line':
        specificStyle = css`
          display: flex;
          height: 4em;
          input, textarea{
            width: 100%;
            height:1.5em;
            position: absolute;
            bottom:15px;
            left:5px;
            background-color: transparent;
            outline: none;
            border-style: solid;
            border-color: ${bgColor_input};
            border-width: 0px 0px 2px 0px;
            box-shadow: none;
            transition: border-color 0.45s ease 0s;
            &:focus {
              box-shadow: none;
              border-color: ${focusColor};
              ~label
              {
                opacity: 1;
                z-index: 1;
                bottom: 55%;
                font-size: 0.6em;
              }
              ~label{
                color:${focusColor}
              }
            }
            &:not(.empty)~label {
              opacity: 1;
              z-index: 1;
              bottom: 55%;
              font-size: 0.6em;
            }
          }
          label{
            position: absolute;
            width: fit-content;
            left:10px;
            opacity: 0.1;
	          pointer-events: none;
            bottom:15px;
	          z-index: 1;
            transition: all 0.5s cubic-bezier(.68, -0.55, .27, 1.55) 0s;
            
          }
        `
        break;
      default:
        specificStyle = css`
            display: flex;
            flex-direction: row-reverse;
            input, textarea{
              ${BorderProperty(border_input)};
              ${box_shadow_style};
              transition: box-shadow 0.45s ease 0s;
              &:focus {
                outline: none;
                box-shadow: 0 0 5px ${focusColor};
              }
            }
            label{
              width:${labelWidth};
            }
          `;
    }


    // 共通のスタイルを組み合わせて返します
    return css`
      ${commonStyle}
      ${specificStyle}
    `;
  }
  }
    `;
