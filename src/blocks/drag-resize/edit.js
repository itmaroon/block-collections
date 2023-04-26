
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	
} from '@wordpress/block-editor';

import { 
	ResizableBox,
} from '@wordpress/components';

import './editor.scss';
import DraggableBox from '../DraggableBox';

export default function Edit( props ) {
	const {
		attributes,
		setAttributes
	} = props;

	const {
		height,
		width,
		textContent,
		showHandle,
		position,
		isResizing
	} = attributes;
	
	const blockProps=useBlockProps();

	return (
		<>
			<div {...useBlockProps()}>
				<DraggableBox  
					position={position}
					isResizing = {isResizing}
					onPositionChange={(position) => setAttributes({position: position})}
				>
					<ResizableBox 
						__experimentalShowTooltip
						onResizeStart={ () =>setAttributes({isResizing:true})}
						onResizeStop={( event, direction, elt, delta ) => {
							setAttributes( {
									height: height + delta.height,
									width: width + delta.width,
							});
							setAttributes({isResizing:false})}
							
						}
						showHandle={showHandle}
						onMouseEnter={() => setAttributes({showHandle:true})}
						onMouseLeave={() => setAttributes({showHandle:false})}
						
						size={{
							height: `${height}px`,
							width: `${width}px`
						}}
						minHeight="50"
						minWidth="50"
					>
						<RichText
							tagName="p"
							onChange={ (newContent) => setAttributes( {textContent:newContent} ) }
							allowedFormats={ [ 'core/bold', 'core/italic', 'core/text-color' ] }
							value={ textContent }
							placeholder={ __( 'Write your text...' ) }
						/>
					</ResizableBox>
				</DraggableBox>
			</div>
		</>
			
	);
}