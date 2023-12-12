
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { ReactComponent as TextBox } from './textbox.svg';
import './style.scss';


import BlockEditWrapper from '../BlockEditWrapper';
//import Edit from './edit';
import save from './save';
import metadata from './block.json';
//ブロックを遅延読込
const LazyEditComponent = React.lazy(() => import('./edit'));
const BlockEdit = (props) => {
	return <BlockEditWrapper lazyComponent={LazyEditComponent} {...props} />;
};

registerBlockType(metadata.name, {
	icon: <TextBox />,
	description: __('A block for styling text controls.', 'itmar_block_collections'),
	styles: [
		{
			name: "nomal",
			label: __('Default', 'itmar_block_collections'),
			isDefault: true
		},
		{
			name: "line",
			label: __('Line', 'itmar_block_collections')
		}
	],
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
	edit: BlockEdit,
	save,
});
