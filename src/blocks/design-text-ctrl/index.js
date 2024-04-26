import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { ReactComponent as TextBox } from "./textbox.svg";
import "./style.scss";

import { BlockEditWrapper } from "itmar-block-packages";
//import Edit from './edit';
import save from "./save";
import metadata from "./block.json";
//ブロックを遅延読込
const LazyEditComponent = React.lazy(() => import("./edit"));
const BlockEdit = (props) => {
	return <BlockEditWrapper lazyComponent={LazyEditComponent} {...props} />;
};

registerBlockType(metadata.name, {
	icon: <TextBox />,
	description: __("A block for styling text controls.", "block-collections"),
	styles: [
		{
			name: "nomal",
			label: __("Default", "block-collections"),
			isDefault: true,
		},
		{
			name: "line",
			label: __("Line", "block-collections"),
		},
	],
	attributes: {
		...metadata.attributes,
		placeFolder: {
			type: "string",
			default: __("Please Input ...", "block-collections"),
		},
		required: {
			type: "object",
			default: {
				flg: false,
				display: __("Required", "block-collections"),
			},
		},
	},
	edit: BlockEdit,
	save,
});
