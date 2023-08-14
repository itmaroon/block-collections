import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';


import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { ReactComponent as Select } from './select.svg';

registerBlockType(metadata.name, {
	description: __("A block for designing select elements", 'itmar_block_collections'),
	icon: <Select />,
	edit: Edit,
	save,
});
