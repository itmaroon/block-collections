import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { ReactComponent as CheckBox } from './square-check-regular.svg';


registerBlockType(metadata.name, {
	icon: <CheckBox />,
	description: __("A block for creating check boxes with designs", 'itmar_block_collections'),
	edit: Edit,
	save,
});
