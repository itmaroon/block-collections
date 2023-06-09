/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	const { 
		textContent, 
		height,
		width,
		position
	} = attributes;
	const newStyle={ 
		style: {
			width: width, 
			height: height,
			position: 'absolute',
			top: position.y,
			left: position.x,}
	}
	return (
		<div  { ...useBlockProps.save(newStyle) }>
			<RichText.Content
					tagName="p"
					value={ textContent }		
				/>
		</div>
	);
}
