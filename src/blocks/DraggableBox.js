
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
  InspectorControls
} from '@wordpress/block-editor';
import {
  Button,
  PanelBody,
  PanelRow,
  __experimentalUnitControl as UnitControl
} from '@wordpress/components';

export default function DraggableBox(props) {

  const {
    position,
    unit_x,
    unit_y
  } = props.attributes


  const [elmposition, setPosition] = useState(position);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;//ドラッグ中の時は処理を中止
    const dx = event.clientX - mousePosition.x;
    const dy = event.clientY - mousePosition.y;
    //ドラッグ後の位置を保存
    const newPosition = {
      x: elmposition.x + dx,
      y: elmposition.y + dy,
    };

    setPosition(newPosition);//状態変数に保存
    setMousePosition({ x: event.clientX, y: event.clientY });//マウス位置の保存
    const newUnit = { unit_x: 'px', unit_y: 'px' }
    props.onPositionChange(newPosition, newUnit);//親コンポーネントに通知
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  //props経由でpositionが変化したときの処理
  useEffect(() => {
    setPosition(position);
  }, [position]);

  //インスペクター内のコントロールからの移動操作
  const chagePosition = (value, cordinate) => {
    const unit_value = value.match(/(\d+)([a-zA-Z]+)/);
    if (unit_value) {
      const newPos = { ...position, [cordinate]: parseInt(unit_value[1]) };
      const orgUnit = { unit_x: unit_x, unit_y: unit_y }
      const unit = `unit_${cordinate}`;
      const newUnit = { ...orgUnit, [unit]: unit_value[2] };
      props.onPositionChange(newPos, newUnit);
    }
  }

  //リセット
  const resetPos = () => {
    const newPos = { "x": 0, "y": 0 };
    const newUnit = { unit_x: 'px', unit_y: 'px' }
    props.onPositionChange(newPos, newUnit);
  }

  //移動後の位置
  const movePosition = { x: `${position.x}${unit_x}`, y: `${position.y}${unit_y}` }
  //渡されたブロックにドラッガブルのクラスとハンドラを渡す。
  const childrenWithProps = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        className: child.props.className ? `${child.props.className} itmar_isDraggable` : 'itmar_isDraggable',
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseLeave,
      });
    }
    return child;
  });

  return (
    <>
      <InspectorControls group="styles">
        <PanelBody
          title={__("Position Setting", 'itmar_block_collections')}
          initialOpen={true}
        >
          <PanelRow
            className='distance_row'
          >
            <UnitControl
              dragDirection="e"
              onChange={(value) => chagePosition(value, 'x')}
              label={__("Lateral direction", 'itmar_block_collections')}
              value={movePosition.x}
            />
            <UnitControl
              dragDirection="e"
              onChange={(value) => chagePosition(value, 'y')}
              label={__("Longitudinal direction", 'itmar_block_collections')}
              value={movePosition.y}
            />
          </PanelRow>
          <PanelRow
            className='reset_row'
          >
            <Button
              variant="secondary"
              onClick={() => resetPos()}
            >
              {__("Reset", 'itmar_block_collections')}
            </Button>
          </PanelRow>
        </PanelBody>
      </InspectorControls>


      {/* //ブロックのレンダリング */}
      <>{childrenWithProps}</>
    </>
  )
}