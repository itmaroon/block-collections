
import { registerBlockType } from '@wordpress/blocks';

import { ReactComponent as TextBox } from './textbox.svg';
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
	icon: <TextBox />,
	edit: Edit,
	save,
});
