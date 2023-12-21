import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

/**
 * Internal dependencies
 */
import BlockEditWrapper from '../BlockEditWrapper';
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { ReactComponent as CheckBox } from './square-check-regular.svg';
//ブロックを遅延読込
// const LazyEditComponent = React.lazy(() => import('./edit'));
// const BlockEdit = (props) => {
// 	return <BlockEditWrapper lazyComponent={LazyEditComponent} {...props} />;
// };

registerBlockType(metadata.name, {
	icon: <CheckBox />,
	description: __("A block for creating check boxes with designs", 'itmar_block_collections'),
	edit: Edit,
	save,
});
