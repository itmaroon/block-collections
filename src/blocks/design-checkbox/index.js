
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
	edit: Edit,
	save,
});
