
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
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
	attributes: {
		...metadata.attributes,
		placeFolder: {
			type: "string",
			default: __('Please Input ...', 'itmar_block_collections')
		},
		required: {
			type: "object",
			default: {
				flg: false,
				display: __('Required', 'itmar_block_collections'),
			}
		},
	},
	edit: Edit,
	save,
});
