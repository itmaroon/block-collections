
import { useBlockProps } from '@wordpress/block-editor';
import { Icon, more } from '@wordpress/icons';
import './editor.scss';
import { Draggable } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit(props) {
	const {
		attributes,
		setAttributes
	} = props;

	const {
		isDragging,
		position,
		mousePosition,
	} = attributes;

  const handleMouseDown = (event) => {
    setAttributes({isDragging:true});
    setAttributes({mousePosition: { x: event.clientX, y: event.clientY }});
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const dx = event.clientX - mousePosition.x;
    const dy = event.clientY - mousePosition.y;
    setAttributes({position: {
      x: position.x + dx,
      y: position.y + dy,
    }});
    setAttributes({mousePosition:{ x: event.clientX, y: event.clientY }});
  };

  const handleMouseUp = () => {
    setAttributes({isDragging:false});
  };
	const dragProps={
		style:{position: 'absolute',
		top: position.y,
		left: position.x,
		},
		
	}
  return (
		<div { ...useBlockProps(dragProps) }>
			<div
				style = {{width: '100%', height: '100%'}}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
			>
				<p>Drag me!</p>
			</div>
      
    </div> 
  );
}
