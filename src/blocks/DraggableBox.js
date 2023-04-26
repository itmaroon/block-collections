import React, { useState } from 'react';
import classnames from 'classnames';

export default function DraggableBox( props ) {
  
  const {
		position,
    isResizing,
	} = props

  const [elmposition, setPosition] = useState(position);
  const [isDragging, setIsDragging] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseDown = (event) => {
    setIsDragging(true);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event) => {
    if (!isDragging || isResizing) return;//ドラッグ中でないかリサイズ中の時は処理を中止
    const dx = event.clientX - mousePosition.x;
    const dy = event.clientY - mousePosition.y;
    setPosition((prevElmposition) => ({
      x: prevElmposition.x + dx,
      y: prevElmposition.y + dy,
    }));
    setMousePosition({ x: event.clientX, y: event.clientY });
    props.onPositionChange(elmposition);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsMouseOver(false);
  };
  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };
	
  //isMouseOverフラグによってクラス名をつける
  const classes = classnames( {'on_moving': isMouseOver} );
  
  return(
    <div className = 'draggablebox' 
      style = {{
        width: 'fit-content', 
        height: 'fit-content',
        //position: 'absolute',
        //top: elmposition.y,
        //left: elmposition.x
        transform: `translate(${elmposition.x}px, ${elmposition.y}px)`,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {props.children}
    </div>
  )
}