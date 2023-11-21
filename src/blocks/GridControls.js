import {
  PanelBody,
  PanelRow,
  ComboboxControl,
  RadioControl,
  ToggleControl,
  __experimentalNumberControl as NumberControl,
  __experimentalUnitControl as UnitControl,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

const units = [
  { value: 'px', label: 'px' },
  { value: 'em', label: 'em' },
  { value: 'rem', label: 'rem' },
];

const GridControls = ({ attributes, clientId, onChange }) => {
  const {
    gridElms,
    rowNum,
    colNum,
    rowGap,
    colGap
  } = attributes;

  //グリッドの配置指定用テーブル要素
  const renderRows = () => {
    let rows = [];
    for (let r = 0; r < rowNum; r++) {
      let cells = [];
      cells.push(<td><input type="text" /></td>);
      // 各行に対するセルを生成
      for (let c = 0; c < colNum; c++) {
        cells.push(<td
          key={`cell-${r}-${c}`}
          className={isCellSelected(r, c) ? 'selected' : ''}
          onClick={() => detectCellPosition(r, c)}
        />)
      }
      // 行の追加
      rows.push(<tr key={`row-${r}`}>{cells}</tr>);
    }
    return rows;
  };
  //テーブルの位置選択関数
  const detectCellPosition = (rowIndex, colIndex) => {
    if (!selBlock) return;

    const newBlock = !selBlock.startCell
      ? { ...selBlock, startCell: { rowInx: rowIndex, colInx: colIndex }, endCell: { rowInx: rowIndex, colInx: colIndex } }
      : { ...selBlock, endCell: { rowInx: rowIndex, colInx: colIndex } };

    setSelBlock(newBlock);
  };
  // セルが選択されているか判断する関数
  const isCellSelected = (rowIndex, colIndex) => {
    if (selBlock) {
      return (
        rowIndex >= selBlock.startCell?.rowInx && rowIndex <= selBlock.endCell?.rowInx &&
        colIndex >= selBlock.startCell?.colInx && colIndex <= selBlock.endCell?.colInx
      );
    } else {
      return false;
    }

  };

  //選択したインナーブロック
  const [selBlock, setSelBlock] = useState();

  //インナーブロックを取得
  const [blockNames, setBlockNames] = useState();
  useSelect((select) => {
    const innerBlocks = select('core/block-editor').getBlocks(clientId);
    const block_names = innerBlocks.map((block, index) => gridElms.length > index ? {
      value: block.clientId,
      label: block.name,
      startCell: gridElms[index].startCell,
      endCell: gridElms[index].endCell
    } :
      {
        value: block.clientId,
        label: block.name
      }
    );

    setBlockNames(block_names);
  }, [clientId]);

  //親ブロックのコールバック呼出し（インナーブロック情報の書き戻し）
  useEffect(() => {
    const newStyle = { ...attributes, gridElms: blockNames };
    onChange(newStyle)
  }, []);//インナーブロック変更時

  useEffect(() => {
    if (selBlock) {
      const index = gridElms?.findIndex((block) => block.value === selBlock.value);
      // インデックスが見つかった場合にのみ入れ替えを行う
      if (index !== -1) {
        gridElms[index] = selBlock;
      }
      const newStyle = { ...attributes, gridElms: gridElms };
      onChange(newStyle)
    }
  }, [selBlock]);//selBlock更新時


  return (
    <>
      <PanelRow
        className='distance_row'
      >
        <NumberControl
          onChange={(newValue) => {
            const newStyle = { ...attributes, rowNum: newValue };
            onChange(newStyle);
          }}
          label={__('Number of Row ', 'itmar_block_collections')}
          value={rowNum}
          min={2}
        />
        <NumberControl
          onChange={(newValue) => {
            const newStyle = { ...attributes, colNum: newValue };
            onChange(newStyle);
          }}
          label={__('Number of Colum', 'itmar_block_collections')}
          value={colNum}
        />
      </PanelRow>
      <PanelRow
        className='distance_row'
      >
        <UnitControl
          onChange={(newValue) => {
            newValue = newValue != '' ? newValue : '0px'
            const newStyle = { ...attributes, rowGap: newValue };
            onChange(newStyle);
          }}
          label={__('Row Gap', 'itmar_block_collections')}
          value={rowGap}
          units={units}
        />
        <UnitControl
          onChange={(newValue) => {
            newValue = newValue != '' ? newValue : '0px'
            const newStyle = { ...attributes, colGap: newValue };
            onChange(newStyle);
          }}
          label={__('Colum Gap', 'itmar_block_collections')}
          value={colGap}
          units={units}
        />

      </PanelRow>
      <p>{__('Element placement', 'itmar_block_collections')}</p>
      <PanelRow className='grid_table' >
        <table>
          {renderRows()}
        </table>
      </PanelRow>
      <ComboboxControl
        label={__('InnerBlock Name', 'itmar_block_collections')}
        options={gridElms}
        value={selBlock ? selBlock.value : null}
        onChange={(sel_id) => {
          const matchedBlock = gridElms.find(block => block.value === sel_id);
          setSelBlock(matchedBlock)
        }}
      />
    </>
  );
};
export default GridControls;
