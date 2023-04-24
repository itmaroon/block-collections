/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */

import {
	useBlockProps,
	RichText,
	InspectorControls, 
	MediaUpload, 
	MediaUploadCheck 
} from '@wordpress/block-editor';
import { __experimentalBorderRadiusControl as BorderRadiusControl } from '@wordpress/block-editor';
import  BorderControl from '../borderControl';
import  BoxControl from '../boxControl';
import { 
	Button,
	PanelBody, 
	PanelRow, 
	ToggleControl,
	ResizableBox
} from '@wordpress/components';

import './editor.scss';

export default function Edit( props ) {
	const blockProps = useBlockProps();
	const {
		attributes,
		setAttributes
	} = props;

	const {
		height,
		width,
		textContent,
	} = attributes;
	return (
		<>
			<div {...blockProps}>
				<ResizableBox 
					__experimentalShowTooltip
					onResizeStop={( event, direction, elt, delta ) => {
						setAttributes( {
								height: height + delta.height,
								width: width + delta.width,
						});}
					}
					showHandle
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
			</div>		
		</>
			
	);
}