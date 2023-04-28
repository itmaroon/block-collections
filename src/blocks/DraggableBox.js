//import React, { useState } from 'react';
import { useState } from '@wordpress/element';
export default function DraggableBox( props ) {
  
  const {
		position,
    isResizing,
	} = props

  const [elmposition, setPosition] = useState(position);
  const [isDragging, setIsDragging] = useState(false);
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
  };
  
  return(
    <div className = 'draggablebox' 
      style = {{
        width: 'fit-content', 
        height: 'fit-content',
        //position: 'absolute',
        //top: elmposition.y,
        //left: elmposition.x
        //transform: `translate(${elmposition.x}px, ${elmposition.y}px)`,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {props.children}
    </div>
  )
}