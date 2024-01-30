import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

import BlockEditWrapper from '../BlockEditWrapper';
//import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { ReactComponent as Select } from './select.svg';

//ブロックを遅延読込
const LazyEditComponent = React.lazy(() => import('./edit'));
const BlockEdit = (props) => {
	return <BlockEditWrapper lazyComponent={LazyEditComponent} {...props} />;
};

registerBlockType(metadata.name, {
	description: __("A block for designing select elements", 'block-collections'),
	icon: <Select />,
	attributes: {
		...metadata.attributes,
		required: {
			type: "object",
			default: {
				flg: false,
				display: __('Required', 'block-collections'),
			}
		},
		folder_val: {
			type: "string",
			default: __('Please Select.', 'block-collections'),
		},
	},
	edit: BlockEdit,
	save,
});
