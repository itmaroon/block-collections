
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

import './editor.scss';
import DraggableBox from '../DraggableBox';

export default function Edit(props) {
	const {
		attributes,
		setAttributes
	} = props;

	const {
		position,
		isResizing
	} = attributes;
	return (
		<>
			<div { ...useBlockProps() }>
				
				<DraggableBox  
					position={position}
					isResizing = {isResizing}
					onPositionChange={(position) => setAttributes({position: position})}
				>
					<InnerBlocks name="image-block"
						template={[
							['core/image', {}],
						]}
						templateLock="all"
					/>
				</DraggableBox>
				<InnerBlocks
					template={[
						['core/heading', {placeholder: 'タイトルを入れてください...', level: 2}],
					]}
					templateLock="all"
				/>
			</div>
			
		</>
		
	);
}
