
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { ReactComponent as Menu } from './menu.svg';


registerBlockType(metadata.name, {
	styles: [
		{
			name: "horizen",
			label: __("Horizen", 'itmar_block_collections'),
			isDefault: true
		},
		{
			name: "virticle",
			label: __("Virticle", 'itmar_block_collections'),
		},
		{
			name: "grid",
			label: __("Grid", 'itmar_block_collections'),
		}
	],
	description: __("This block allows you to design menus with various variations.", 'itmar_block_collections'),
	icon: <Menu />,
	edit: Edit,
	save,
});
