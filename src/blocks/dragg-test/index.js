/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps
} from '@wordpress/block-editor';
import {
	useInteractJS
} from './hooks';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */

import metadata from './block.json';

import MoveResizeBox from './moveResize'



//const scaleObj = { width: interact.style.width, height: interact.style.height }
//setAttributes({ position: {transform: interact.style.transform}})
//setAttributes({ scale: scaleObj})

registerBlockType( metadata.name, {
	
	edit: ({ attributes, setAttributes }) => {
		const blockProps = useBlockProps();
		
		return (
			<div className { ...blockProps }>
				<MoveResizeBox
					scale = { attributes.scale }
					position= { attributes.position }
				/>
			</div>
			
		);
	},

	save: ({ attributes }) => {
		const { items } = attributes;

		return (
				<div>
					プレビュー画面		
				</div>
		);
	},
} );
