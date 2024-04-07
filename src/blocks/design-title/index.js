import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import "./style.scss";

/**
 * Internal dependencies
 */
import BlockEditWrapper from "../BlockEditWrapper";
//import Edit from './edit';
import save from "./save";
import metadata from "./block.json";
import { ReactComponent as Title } from "./title.svg";
//ブロックを遅延読込
const LazyEditComponent = React.lazy(() => import("./edit"));
const BlockEdit = (props) => {
	return <BlockEditWrapper lazyComponent={LazyEditComponent} {...props} />;
};

registerBlockType(metadata.name, {
	styles: [
		{
			name: "default",
			label: __("Default", "block-collections"),
			isDefault: true,
		},
		{
			name: "circle_marker",
			label: __("Circle Marker", "block-collections"),
		},
		{
			name: "sub_copy",
			label: __("Sub Copy", "block-collections"),
		},
	],
	attributes: {
		...metadata.attributes,
		selectedPageUrl: {
			type: "string",
			default: block_collections.home_url,
		},
	},
	description: __(
		"A block with various styles applied to heading tags",
		"block-collections"
	),
	icon: <Title />,
	edit: BlockEdit,
	save,
});
