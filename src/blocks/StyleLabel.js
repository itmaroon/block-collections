import styled, { css } from 'styled-components';
import { radius_prm, space_prm, convertToScss, borderProperty } from './cssPropertes';

export default function StyleLabel({ attributes, children }) {
  return (
    <StyledDiv attributes={attributes}>
      {children}
    </StyledDiv >
  );
}

const StyledDiv = styled.label`
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
      labelVertAlign,
      shadow_result,
      is_shadow,
      className,
    } = attributes;

    //単色かグラデーションかの選択
    const bgLabelColor = bgColor_label || bgGradient_label;
    //斜体の設定
    const fontStyle_label = font_style_label.isItalic ? "italic" : "normal";
    //角丸の設定
    const label_radius_prm = radius_prm(radius_label);
    //スペースの設定
    const label_padding_prm = space_prm(padding_label);

    //ボックスシャドーの設定
    const box_shadow_style = is_shadow && shadow_result ? convertToScss(shadow_result) : ''
    // 共通のスタイルをここで定義します
    const commonStyle = css`
      display: flex;
      align-items: ${labelVertAlign};
      white-space: nowrap;
      background: ${bgLabelColor};
      border-radius: ${label_radius_prm};
      color: ${textColor_label};
      font-size: ${font_style_label.default_fontSize};
      font-family: ${font_style_label.fontFamily};
      font-weight: ${font_style_label.fontWeight};
      font-style: ${fontStyle_label};
      padding: ${label_padding_prm};
      ${borderProperty(border_label)};
      ${box_shadow_style};
      @media (max-width: 767px) {
        font-size: ${font_style_label.mobile_fontSize};
      }
      span{
        color:var(--wp--preset--color--accent-1);
      }
    `;

    // classNameに基づいて特定のスタイルを定義します
    let specificStyle = null;
    switch (className) {
      case 'is-style-line':
        specificStyle = css` 
          position: absolute;
          width: fit-content;
          opacity: 0;
          left: calc(2em + 10px);
          pointer-events: none;
          bottom:15px;
          z-index: 1;
          transition: all 0.5s cubic-bezier(.68, -0.55, .27, 1.55) 0s;
        `
        break;
      default:
        specificStyle = css`
            width:${labelWidth};
            margin-right: ${labelSpace};
            @media (max-width: 767px) {
              margin-bottom: 15px;
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
