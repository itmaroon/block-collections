
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import { InnerBlocks, MediaPlaceholder } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';

export default function Edit(props) {
	const [media, setMedia] = useState();

  const onSelectMedia = (newMedia) => {
    setMedia(newMedia);
  };
	const {
		attributes,
		setAttributes
	} = props;

	const {
		isDragging,
		position,
		mousePosition,
		mediaID
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
		<>
			
		<div { ...useBlockProps(dragProps) }>
			<div
				style = {{width: '100%', height: '100%'}}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
			>
				 {media ? (
        <img src={media.url} alt={media.alt} />
      ) : (
				<MediaPlaceholder
					icon="format-image"
					labels={{
						title: 'Image',
						instructions: 'Drag an image, upload a new one or select a file from your library.'
					}}
					accept="image/*"
					allowedTypes={['image']}
					value={media}
					onSelect={onSelectMedia}
					onError={(message) => {
						console.log(message);
					}}

				/>)}
			</div>

			
      
    </div> 
		</>
		
		
  );
}
