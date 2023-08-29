import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';


import './style.scss';


import Edit from './edit';
import save from './save';
import metadata from './block.json';


registerBlockType(metadata.name, {
	description: __("It is a block that has a function to adjust the placement by dragging.", 'itmar_block_collections'),
	edit: Edit,
	save,
});
