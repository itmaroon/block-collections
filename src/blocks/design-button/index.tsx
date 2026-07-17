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
import { ReactComponent as Button } from "./button.svg";
import type { DesignButtonAttributes } from "./types";

declare const itmar_option: { home_url: string };

const settings = {
	...metadata,
	icon: <Button />,
	description: __(
		"A block that decorates buttons with designs.",
		"block-collections",
	),
	attributes: {
		...metadata.attributes,
		selectedPageUrl: {
			type: "string",
			default: itmar_option.home_url,
		},
	},
	edit: Edit,
	save,
} as unknown as BlockConfiguration<DesignButtonAttributes>;

registerBlockType<DesignButtonAttributes>(metadata.name, settings);
