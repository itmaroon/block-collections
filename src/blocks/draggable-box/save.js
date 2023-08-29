
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';


export default function save({ attributes }) {
	const { 
		position
	} = attributes;
	const newStyle={ 
		style: {
			width: 'fit-content', 
      height: 'fit-content',
			// left: position.x,
			transform: `translate(${position.x}px, ${position.y}px)`
		}
	}
	
	const blockProps = useBlockProps.save(newStyle);

	return(
		<>
			<div { ...blockProps }>
				<InnerBlocks.Content />
				
			</div>
		</>
	)
}