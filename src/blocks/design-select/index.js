
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';


import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { ReactComponent as Select } from './select.svg';

registerBlockType(metadata.name, {
	icon: <Select />,
	edit: Edit,
	save,
});
