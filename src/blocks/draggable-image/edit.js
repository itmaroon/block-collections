import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps,InnerBlocks } from '@wordpress/block-editor';

import './editor.scss';
import DraggableBox from '../DraggableBox';

export default function Edit(props) {
	const {
		attributes,
		setAttributes
	} = props;

	const {
		position,
	} = attributes;

	const newStyle={ 
		style: {
			width: 'fit-content', 
      height: 'fit-content',
			// left: position.x,
			transform: `translate(${position.x}px, ${position.y}px)`
		}
	}
	const innerBlocksProps = useInnerBlocksProps( { 
    // 要素の追加/削除を可能にする
    allowedBlocks: [ 'core/image', 'core/paragraph' ],
  } );
	return (
		<>
			<div { ...useBlockProps( newStyle) }>
				<DraggableBox  
					position={position}
					onPositionChange={(position) => setAttributes({position: position})}
				>
					<InnerBlocks
						template={[
							['core/image', {}],
						]}
						templateLock="all"
					/>
				</DraggableBox>
			
			</div>
		</>
	);
}