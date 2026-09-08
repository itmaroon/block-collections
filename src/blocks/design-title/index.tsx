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
import { ReactComponent as Title } from "./title.svg";
import type { TitleAttributes, TitleEditProps } from "./types";
//ブロックを遅延読込
// const LazyEditComponent = React.lazy(() => import("./edit"));
// const BlockEdit = (props) => {
// 	return <BlockEditWrapper lazyComponent={LazyEditComponent} {...props} />;
// };

const BlockEdit = (props: TitleEditProps & Record<string, unknown>) => {
	return <Edit {...props} />;
};

const settings = {
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
		dateValue: {
			type: "string",
			default: new Date().toISOString(),
		},
	},
	description: __(
		"A block with various styles applied to heading tags",
		"block-collections",
	),
	icon: <Title />,
	edit: BlockEdit,
	save,
} as unknown as BlockConfiguration<TitleAttributes>;

registerBlockType<TitleAttributes>(metadata.name, settings);
