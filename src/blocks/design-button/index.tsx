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

const settings = {
	...metadata,
	icon: <Button />,
	description: __(
		"A block that decorates buttons with designs.",
		"block-collections",
	),
	edit: Edit,
	save,
} as unknown as BlockConfiguration<DesignButtonAttributes>;

registerBlockType<DesignButtonAttributes>(metadata.name, settings);
