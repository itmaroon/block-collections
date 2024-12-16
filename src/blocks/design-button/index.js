import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import "./style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import { ReactComponent as Button } from "./button.svg";

registerBlockType(metadata.name, {
	icon: <Button />,
	description: __(
		"A block that decorates buttons with designs.",
		"block-collections",
	),
	attributes: {
		...metadata.attributes,
		selectedPageUrl: {
			type: "string",
			default: block_collections.home_url,
		},
	},
	edit: Edit,
	save,
});
