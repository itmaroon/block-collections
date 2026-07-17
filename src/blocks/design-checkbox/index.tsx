import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import type { BlockConfiguration } from "@wordpress/blocks";
import "./style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import { ReactComponent as CheckBox } from "./square-check-regular.svg";
import type { CheckboxAttributes } from "./types";
//ブロックを遅延読込
// const LazyEditComponent = React.lazy(() => import('./edit'));
// const BlockEdit = (props) => {
// 	return <BlockEditWrapper lazyComponent={LazyEditComponent} {...props} />;
// };

const settings = {
	...metadata,
	icon: <CheckBox />,
	description: __(
		"A block for creating check boxes with designs",
		"block-collections"
	),
	edit: Edit,
	save,
} as unknown as BlockConfiguration<CheckboxAttributes>;

registerBlockType<CheckboxAttributes>(metadata.name, settings);
