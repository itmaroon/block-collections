import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

import Edit from './edit';
import save from './save';
import metadata from './block.json';


registerBlockType(metadata.name, {
	description: __("A block that highlights code.", 'itmar_block_collections'),
	edit: Edit,
	save,
});
