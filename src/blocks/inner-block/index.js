/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType, registerBlockStyle } from '@wordpress/blocks';

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
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );

registerBlockStyle( metadata.name, {
	name: 'top',
	label: '画像を上',
	isDefault:true	
});
registerBlockStyle( metadata.name, {
	name: 'bottom',
	label: '画像を下',	
});

if(window.innerWidth > 767){
	registerBlockStyle( metadata.name, {
		name: 'float_right',
		label: '画像を右フロート',	
	});
	registerBlockStyle( metadata.name, {
		name: 'float_left',
		label: '画像を左フロート',	
	});
	registerBlockStyle( metadata.name, {
		name: 'right',
		label: '画像を右',	
	});
	registerBlockStyle( metadata.name, {
		name: 'left',
		label: '画像を左',	
	});
}

