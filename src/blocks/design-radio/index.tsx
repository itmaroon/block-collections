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
import { ReactComponent as Radiobutton } from "./radio.svg";
import type { RadioAttributes } from "./types";
//ブロックを遅延読込
// const LazyEditComponent = React.lazy(() => import('./edit'));
// const BlockEdit = (props) => {
// 	return <BlockEditWrapper lazyComponent={LazyEditComponent} {...props} />;
// };

const settings = {
	...metadata,
	icon: <Radiobutton />,
	description: __(
		"A block for creating radio button with designs",
		"block-collections",
	),
	styles: [
		{
			name: "nomal",
			label: __("Default", "block-collections"),
			isDefault: true,
		},
		{
			name: "button",
			label: __("Button", "block-collections"),
		},
	],
	edit: Edit,
	save,
} as unknown as BlockConfiguration<RadioAttributes>;

registerBlockType<RadioAttributes>(metadata.name, settings);
