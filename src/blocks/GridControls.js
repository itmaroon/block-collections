import {
  Button,
  PanelRow,
  ComboboxControl,
  __experimentalNumberControl as NumberControl,
  __experimentalUnitControl as UnitControl,
  __experimentalInputControl as InputControl
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import isEqual from 'lodash/isEqual';


import { __ } from '@wordpress/i18n';

const units = [
  { value: 'px', label: 'px' },
  { value: 'em', label: 'em' },
  { value: 'rem', label: 'rem' },
];

const initializeArray = (rowUnit, length) => {
  if (!Array.isArray(rowUnit)) {
    // rowUnit が配列ではない（undefined を含む）場合、全て "1fr" で埋めた配列を返す
    return Array(length).fill("1fr");
  }

  return Array.from({ length }, (_, i) => rowUnit[i] || "1fr");
}

const GridControls = ({ attributes, clientId, onChange }) => {
  const {
    gridElms,
    rowNum,
    colNum,
    rowGap,
    colGap,
    rowUnit,
    colUnit
  } = attributes;

  //グリッドの配置指定用テーブル要素
  const renderRows = () => {
    let rows = [];
    // 列単位入力行を追加
    let headerCells = [<th key="header-corner"></th>]; // 左上の角の空白セル
    for (let c = 0; c < colNum; c++) {
      headerCells.push(
        <th key={`header-${c}`}>
          <InputControl
            value={colUnit ? colUnit[c] : ""}
            type="text"
            isPressEnterToChange={true}
            onChange={(newValue) => {
              const newArray = [...colUnit.slice(0, c), newValue, ...colUnit.slice(c + 1)];
              setUnitColArray(newArray);
            }}
          />
        </th>
      );
    }
    rows.push(<tr key="header-row">{headerCells}</tr>);

    // 各行とセルの生成
    for (let r = 0; r < rowNum; r++) {
      let cells = [];
      // 行行単位入力を追加
      cells.push(
        <th key={`row-header-${r}`}>
          <InputControl
            value={rowUnit ? rowUnit[r] : ""}
            type="text"
            isPressEnterToChange={true}
            onChange={(newValue) => {
              const newArray = [...rowUnit.slice(0, r), newValue, ...rowUnit.slice(r + 1)];
              setUnitRowArray(newArray);
            }}

          />
        </th>
      );

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
  const parentBlocks = useSelect((select) => {
    const innerBlocks = select('core/block-editor').getBlocks(clientId);
    const new_block_names = innerBlocks.map((block, index) => gridElms.length > index ? {
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
    return new_block_names
  }, [clientId]);
  const [blockNames, setBlockNames] = useState(parentBlocks);

  //グリッド配置のクリア
  const clear_placement = () => {
    //ブロックの配置情報削除
    const clear_block = blockNames.map((block) => ({
      value: block.value,
      label: block.label
    }
    ));
    setBlockNames(clear_block);
    //選択情報の削除
    setSelBlock(clear_block);
  }

  //単位配列の初期化
  const initRowUnitArray = initializeArray(rowUnit, rowNum);
  const [unitRowArray, setUnitRowArray] = useState(initRowUnitArray);
  const initColUnitArray = initializeArray(colUnit, colNum);;
  const [unitColArray, setUnitColArray] = useState(initColUnitArray);

  //親ブロックのコールバック呼出し（インナーブロック情報の書き戻し）
  useEffect(() => {
    console.log(blockNames)
    const newStyle = { ...attributes, gridElms: blockNames, rowUnit: unitRowArray, colUnit: unitColArray };
    onChange(newStyle);
  }, [blockNames, unitRowArray, unitColArray]);//単位変更時

  useEffect(() => {
    if (selBlock) {
      const index = gridElms?.findIndex((block) => block.value === selBlock.value);
      // インデックスが見つかった場合にのみ入れ替えを行う
      if (index !== -1) {
        gridElms[index] = selBlock;
      }
      const newStyle = { ...attributes, gridElms: gridElms };
      console.log(newStyle)
      onChange(newStyle)
    }
  }, [blockNames, unitRowArray, unitColArray, selBlock]);//selBlock更新時


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

      <PanelRow className='distance_row'>
        <p>{__('Element placement', 'itmar_block_collections')}</p>
        <Button variant="secondary" onClick={clear_placement}>
          {__("Clear", 'itmar_block_collections')}
        </Button>
      </PanelRow>

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
