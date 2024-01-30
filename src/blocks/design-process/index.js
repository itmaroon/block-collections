
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { ReactComponent as Process } from './process.svg';


registerBlockType(metadata.name, {
	styles: [
		{
			name: "progress",
			label: __("Default", 'block-collections'),
			isDefault: true
		},
		{
			name: "card",
			label: __("Card", 'block-collections'),
		}
	],
	description: __("A block for stylish display of process progress", 'block-collections'),
	icon: <Process />,
	edit: Edit,
	save,
});
