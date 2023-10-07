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
      blockNum,
      className,
    } = attributes;

    //角丸の設定
    const form_radius_prm = radius_prm(radius_val);
    const img_radius_prm = radius_prm(grid_info.image_radius);
    console.log(grid_info)
    //スペースの設定
    const form_margin_prm = space_prm(margin_val);
    const form_padding_prm = space_prm(padding_val);
    const figure_padding_prm = space_prm(grid_info.image_padding);
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


    const gridStyle = css`
      > div{
        display: grid;
          .wp-block-image {
            padding: ${figure_padding_prm};
            img{
              border-radius: ${img_radius_prm};
              filter: blur(${grid_info.image_blur}px);
            }
          }
        ${() => {
        //ポジションの分解
        const image_pos = grid_info.image_pos.split(' ');
        //縦の位置
        const virtcal_pos = image_pos[0] === 'top' ? 'start' : image_pos[0] === 'bottom' ? 'end' : 'center';
        //グリッドの生成
        if (grid_info.is_image) {
          if (image_pos[1] === 'left') {
            return css`
                grid-template-columns: auto repeat(${grid_info.col_num}, 1fr);
                .wp-block-image {
                  grid-column: 1 / 2;
                  grid-row: 1 / ${Math.ceil((blockNum - 1) / grid_info.col_num) + 1};
                  align-self: ${virtcal_pos};
                }
              `;
          } else if (image_pos[1] === 'right') {
            return css`
                grid-template-columns: repeat(${grid_info.col_num}, 1fr) auto;
                .wp-block-image {
                  grid-column: ${grid_info.col_num + 1} / ${grid_info.col_num + 2};
                  grid-row: 1 / ${Math.ceil((blockNum - 1) / grid_info.col_num) + 1};
                  align-self: ${virtcal_pos};
                }
            `;
          } else {
            return css`
                grid-template-columns: repeat(${grid_info.col_num}, 1fr);
                .wp-block-image {
                  grid-column: 1 / ${grid_info.col_num + 1};
                  grid-row: ${image_pos[0] === 'bottom' ? Math.ceil((blockNum - 1) / grid_info.col_num) + 1 : 1} / ${image_pos[0] === 'bottom' ? Math.ceil((blockNum - 1) / grid_info.col_num) + 2 : 2} 
                }
            `;
          }
        } else {
          return css`
            grid-template-columns: repeat(${grid_info.col_num}, 1fr);
            `;
        }
      }}
      
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
  }
  }
        `;





