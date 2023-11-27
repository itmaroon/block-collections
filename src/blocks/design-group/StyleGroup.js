import styled, { css } from 'styled-components';
import { width_prm, align_prm, space_prm, convertToScss } from '../cssPropertes';
import { useRef, useEffect } from '@wordpress/element';

export const StyleComp = ({ attributes, children }) => {
  const ref = useRef(null);
  useEffect(() => {
    const parent = ref.current.parentElement;
    const style = window.getComputedStyle(parent);
  }, []);
  return (
    <StyledDiv attributes={attributes} ref={ref}>
      {children}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
${({ attributes }) => {
    const {
      default_pos,
      mobile_pos,
      shadow_result,
      is_shadow,
      is_moveable,
      position
    } = attributes;

    //スペースの設定
    const default_content_padding_prm = space_prm(default_pos.padding_content);
    const mobile_contnt_padding_prm = space_prm(mobile_pos.padding_content);
    //ブロック幅
    const default_width_style = width_prm(default_pos.width_val, default_pos.free_val);
    const mobile_width_style = width_prm(mobile_pos.width_val, default_pos.free_val);
    //ブロックの配置
    const default_block_align = align_prm(default_pos.outer_align);
    const mobile_block_align = align_prm(mobile_pos.outer_align);
    //シャドースタイル
    const box_shadow_style = is_shadow && shadow_result ? convertToScss(shadow_result) : '';
    //位置調整
    const tranceform = is_moveable ? `transform: translate(${position.x}, ${position.y});` : '';

    // 共通のスタイルをここで定義します
    const commonStyle = css`
      position: relative;
      ${default_width_style}
      ${default_block_align}
      align-self: ${default_pos.outer_vertical};
      @media (max-width: 767px) {
        ${mobile_width_style}
        ${mobile_block_align}
      }
      > div{
        ${tranceform}
        >.group_contents{
          ${box_shadow_style};
          padding: ${default_content_padding_prm};
          @media (max-width: 767px) {
            padding: ${mobile_contnt_padding_prm};
          }
        }
      }
    `;

    //横並びスタイル
    const horizenStyle = css`
    > div{
      >.group_contents{
        display: flex;
        flex-direction: row;
        justify-content: ${default_pos.inner_align};
        >div{
          margin:0;
        }
        @media (max-width: 767px) {
          justify-content: ${mobile_pos.inner_align};
        }
      } 
    }
  `;

    //縦並びスタイル
    const verticalStyle = css`
    > div{
      >.group_contents{
        display: flex;
        flex-direction: column;
        justify-content: ${default_pos.inner_align};
        >div{
          margin:0;
        }
        @media (max-width: 767px) {
          justify-content: ${mobile_pos.inner_align};
        }
      } 
    }
    
  `;

    //グリッドスタイル
    const createNthChildStyles = (numItems) => {

      let styles = '';
      if (numItems) {
        numItems.forEach((element, index) => {
          if (element.startCell && element.endCell) {
            const verPos = element.vertAlign === 'middle' ? 'center' :
              element.verAlign === 'lower' ? 'end' :
                'start';
            styles += `
            &:nth-child(${index + 1}) {
              grid-column: ${element.startCell.colInx + 1} / ${element.endCell.colInx + 2};
              grid-row: ${element.startCell.rowInx + 1} / ${element.endCell.rowInx + 2};
              align-self: ${verPos};
              justify-self: ${element.latAlign};
            }
          `;
          }
        });
      }

      return styles;
    };

    const gridStyle = css`
    > div {
      >.group_contents{
        display: grid;
        grid-template-columns: ${default_pos.grid_info.colUnit?.join(' ')};
        grid-template-rows: ${default_pos.grid_info.rowUnit?.join(' ')};
        gap: ${default_pos.grid_info.rowGap} ${default_pos.grid_info.colGap};
        > div{
          ${createNthChildStyles(default_pos.grid_info.gridElms)}
        }
        
        @media (max-width: 767px) {
          grid-template-columns: repeat(${mobile_pos.grid_info.colNum}, 1fr);
          grid-template-rows: repeat(${mobile_pos.grid_info.rowNum}, 1fr);
          gap: ${mobile_pos.grid_info.rowGap} ${mobile_pos.grid_info.colGap};
          > div{
            ${createNthChildStyles(mobile_pos.grid_info.gridElms)}
          }
        }
      }
    }
  `;

    //スタイルの選択
    const cssMap = {
      'horizen': horizenStyle,
      'vertical': verticalStyle,
      'grid': gridStyle,
    };

    const optionStyle = cssMap[default_pos.direction] || horizenStyle;
    const mobileOptionStyle = cssMap[mobile_pos.direction] || verticalStyle;

    // 共通のスタイルを組み合わせて返します
    return css`
    ${commonStyle}
    ${optionStyle}
    @media (max-width: 767px) {
      ${mobileOptionStyle}
    }
  `;

  }
  }
`;




