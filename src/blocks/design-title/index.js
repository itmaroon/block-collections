import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

/**
 * Internal dependencies
 */
import BlockEditWrapper from './BlockEditWrapper';
//import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { ReactComponent as Title } from './title.svg';


registerBlockType(metadata.name, {
	styles: [
		{
			name: "default",
			label: __("Default", 'itmar_block_collections'),
			isDefault: true
		},
		{
			name: "circle_marker",
			label: __("Circle Marker", 'itmar_block_collections'),
		},
		{
			name: "sub_copy",
			label: __("Sub Copy", 'itmar_block_collections'),
		}
	],
	description: __("A block with various styles applied to heading tags", 'itmar_block_collections'),
	icon: <Title />,
	edit: BlockEditWrapper,
	save,
});
