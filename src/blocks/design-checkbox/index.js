import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import "./style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import { ReactComponent as CheckBox } from "./square-check-regular.svg";
//ブロックを遅延読込
// const LazyEditComponent = React.lazy(() => import('./edit'));
// const BlockEdit = (props) => {
// 	return <BlockEditWrapper lazyComponent={LazyEditComponent} {...props} />;
// };

registerBlockType(metadata.name, {
	icon: <CheckBox />,
	description: __(
		"A block for creating check boxes with designs",
		"block-collections"
	),
	edit: Edit,
	save,
});
