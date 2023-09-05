import styled, { css } from 'styled-components';
import { radius_prm, space_prm, convertToScss, borderProperty } from '../cssPropertes';
import { ShadowElm } from '../ShadowStyle'

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
      buttonType,
      font_style_label,
      margin_value,
      padding_value,
      labelColor,
      buttonColor,
      buttonGradient,
      radius_value,
      border_value,
      shadow_element,
      shadow_result,
      is_shadow,
      className,
    } = attributes;

    const button_type = buttonType === 'button' ? 'button' : 'input'

    //単色かグラデーションかの選択
    const bgColor = buttonColor || buttonGradient;
    //斜体の設定
    const fontStyle_label = font_style_label.isItalic ? "italic" : "normal";
    //角丸の設定
    const button_radius_prm = radius_prm(radius_value);
    //スペースの設定
    const heading_margin_prm = space_prm(margin_value);
    const heading_padding_prm = space_prm(padding_value);
    //ボックスシャドーの設定
    const box_shadow_style = is_shadow && shadow_result ? convertToScss(shadow_result) : ''
    //ホバー時のスタイル
    let hover_shadow_style = '';
    if (is_shadow && shadow_result) {
      const hover_elm = ShadowElm({ ...shadow_element, embos: 'dent' });
      hover_shadow_style = convertToScss(hover_elm.style);
    }


    // 共通のスタイルをここで定義します
    const commonStyle = css`
      ${button_type}{
        margin: ${heading_margin_prm};
        padding: ${heading_padding_prm};
        background: ${bgColor};
        border-radius: ${button_radius_prm};
        ${borderProperty(border_value)};
        display: flex;
        ${box_shadow_style};
        font-size: ${font_style_label.fontSize};
        font-family: ${font_style_label.fontFamily};
        font-weight: ${font_style_label.fontWeight};
        font-style: ${fontStyle_label};
        color: ${labelColor};
        transition: box-shadow ease-in-out 0.5s;
        &:hover {
          cursor: pointer;
          ${hover_shadow_style};
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





