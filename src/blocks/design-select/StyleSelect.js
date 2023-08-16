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
      optionColor,
      hoverBgColor,
      font_style_option,
      margin_value,
      padding_value,
      backgroundColor,
      backgroundGradient,
      radius_value,
      border_value,
      className,
    } = attributes;

    //単色かグラデーションかの選択
    const bgColor = backgroundColor || backgroundGradient;
    //斜体の設定
    const fontStyle_option = font_style_option.isItalic ? "italic" : "normal";
    //角丸の設定
    const heading_radius_prm = radius_prm(radius_value);
    //スペースの設定
    const heading_margin_prm = space_prm(margin_value);
    const heading_padding_prm = space_prm(padding_value);

    // 共通のスタイルをここで定義します
    const commonStyle = css`
      margin: ${heading_margin_prm};
      padding: ${heading_padding_prm};

      .itmar_block_select {
        position: relative;
        border-radius: ${heading_radius_prm};
        ${BorderProperty(border_value)};
        font-size: ${font_style_option.fontSize};
        font-family: ${font_style_option.fontFamily};
        font-weight: ${font_style_option.fontWeight};
        font-style: ${fontStyle_option};
        color: ${optionColor};
    
        &>div {
          position: relative;
          background: ${bgColor};
          z-index: 2;
          padding: 0.4em 0.6em;
          border-radius: 8px;
          background: #fff;
          font-size: ${font_style_option.fontSize};
          min-height: 2.2em;
          box-shadow: 0 4px 16px 0 rgba(22, 42, 90, 0.12);
          transition: box-shadow .3s ease;
    
          &:hover {
            box-shadow: 0 4px 24px -1px rgba(22, 42, 90, 0.12);
          }
    
          .itmar_block_opener {
            right: 1px;
            top: 0;
            bottom: 0;
            cursor: pointer;
            width: 1.4em;
            position: absolute;
    
            &:after {
              content: '';
              position: absolute;
              display: block;
              width: 0.75em;
              height: 0.75em;
              border-bottom: 2px solid #99A3BA;
              border-left: 2px solid #99A3BA;
              transform: rotate(315deg);
              top: 30%;
              transition: all .3s ease;
            }
    
          }
    
          span {
            color: #99A3BA;
            display: block;
            position: absolute;
            left: 12px;
            cursor: pointer;
            top: 50%;
            transform: translateY(-50%);
            line-height: 1em;
            transition: all .3s ease;
    
            &.hide {
              opacity: 0;
              visibility: hidden;
              transform: translate(-4px, 0);
            }
          }
    
          a {
            position: relative;
            padding: 0 24px 6px 8px;
            line-height: 1.4em;
            text-decoration-line: none;
            color: ${optionColor};
            display: inline-block;
            vertical-align: top;
            margin: 6px 6px 0 0;
            cursor: pointer;
    
            em {
              font-style: normal;
              display: block;
              white-space: nowrap;
              padding: 0.1em 0.5em 0.1em 0.5em;
              position: relative;
            }
    
            &:before {
              content: '';
              left: 0;
              top: 0;
              bottom: 6px;
              width: 100%;
              position: absolute;
              display: block;
              background: ${hoverBgColor};
              z-index: -1;
              border-radius: 4px;
            }
    
            i {
              cursor: pointer;
              position: absolute;
              top: 0;
              right: 0.3em;
              width: 1.2em;
              height: 1.4em;
              display: block;
    
              &:before,
              &:after {
                content: '';
                display: block;
                width: 2px;
                height: 1.25em;
                position: absolute;
                left: 50%;
                top: 50%;
                background: rgb(153, 163, 186);
                border-radius: 1px;
              }
    
              &:before {
                transform: translate(-50%, -50%) rotate(45deg);
              }
    
              &:after {
                transform: translate(-50%, -50%) rotate(-45deg);
              }
            }
    
            &.notShown {
              opacity: 0;
              transition: opacity .3s ease;
    
              &:before {
                width: 28px;
                transition: width .45s cubic-bezier(.87, -.41, .19, 1.44) .2s;
              }
    
              i {
                opacity: 0;
                transition: all .3s ease .3s;
              }
    
              em {
                opacity: 0;
                transform: translate(-6px, 0);
                transition: all .4s ease .3s;
              }
    
              &.shown {
                opacity: 1;
                margin-top: 6px;
    
                &:before {
                  width: 100%;
                }
    
                i {
                  opacity: 1;
                }
    
                em {
                  opacity: 1;
                  transform: translate(0, 0);
                }
              }
            }
    
            &.remove {
              &:before {
                width: 28px;
                transition: width .4s cubic-bezier(.87, -.41, .19, 1.44) 0s;
              }
    
              i {
                opacity: 0;
                transition: all .3s ease 0s;
              }
    
              em {
                opacity: 0;
                transform: translate(-12px, 0);
                transition: all .4s ease 0s;
              }
    
              &.disappear {
                opacity: 0;
                transition: opacity .5s ease 0s;
              }
            }
          }
        }
    
        &>ul {
          margin: 0;
          padding: 0;
          
          list-style: none;
          font-size: 0.8em;
          max-height: 40vh;
          overflow: scroll;
          z-index: 1;
          position: relative;
          top: auto;
          left: 0;
          right: 0;
          visibility: hidden;
          opacity: 0;
          max-height: 0;
          border-radius: 8px;
          transform: translate(0, 20px) scale(.8);
          transform-origin: 0 0;
          filter: drop-shadow(0 12px 20px rgba(22, 42, 90, 0.08));
          transition: all .4s ease, transform .4s cubic-bezier(.87, -.41, .19, 1.44), filter .3s ease .2s;
    
          li {
            color: ${optionColor};
            background: #fff;
            padding: 0.5em 0.7em 0.5em 1.7em;
            font-size: ${font_style_option.fontSize};
            cursor: pointer;
            overflow: hidden;
            position: relative;
            transition: background .3s ease, color .3s ease, transform .3s ease .3s, opacity .5s ease .3s, border-radius .3s ease .3s;
    
            &:first-child {
              border-radius: 8px 8px 0 0;
    
              &:last-child {
                border-radius: 8px;
              }
            }
    
            &:last-child {
              border-radius: 0 0 8px 8px;
    
              &:first-child {
                border-radius: 8px;
              }
            }
    
            &:hover {
              background: ${hoverBgColor};
              color: #fff;
            }
    
            &:after {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              width: 6px;
              height: 6px;
              background: rgba(0,0,0, .4);
              opacity: 0;
              border-radius: 100%;
              transform: scale(1, 1) translate(-50%, -50%);
              transform-origin: 50% 50%;
            }
    
            &.beforeRemove {
              border-radius: 0 0 8px 8px;
    
              &:first-child {
                border-radius: 8px;
              }
            }
    
            &.afterRemove {
              border-radius: 8px 8px 0 0;
    
              &:last-child {
                border-radius: 8px;
              }
            }
    
            &.remove {
              transform: scale(0);
              opacity: 0;
    
              &:after {
                animation: ripple .4s ease-out;
              }
            }
    
            &.notShown {
              transform: scale(0);
              opacity: 0;
              transition: transform .35s ease, opacity .4s ease;
    
              &.show {
                transform: scale(1);
                opacity: 1;
              }
            }
          }
        }
    
        &.open {
          &>div {
            box-shadow: 0 4px 20px -1px rgba(22, 42, 90, .12);
    
            .itmar_block_opener {
              &:after {
                top: 40%;
                transform: rotate(135deg);
    
              }
            }
          }
    
          &>ul {
            transform: translate(0, 12px) scale(1);
            opacity: 1;
            visibility: visible;
            //height: auto;
            max-height: 30vh;
            overflow: hidden visible;
            filter: drop-shadow(0 16px 24px rgba(22, 42, 90, .16));
          }
        }
      }
    
      .itmar_block_select.itmar_block_selectMultiple {
        width: 50em;
    
        &>div {
          padding: 0.8em 3em 0.8em 1.2em;
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





