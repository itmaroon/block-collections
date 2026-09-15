import { registerBlockType } from "@wordpress/blocks";
import type { BlockConfiguration } from "@wordpress/blocks";
import "./style.scss";
import { __ } from "@wordpress/i18n";
/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";
import deprecated from "./deprecated";
import metadata from "./block.json";
import { ReactComponent as Group } from "./group.svg";
import type { GroupAttributes } from "./types";

const settings = {
	...metadata,
	description: __(
		"A block for storing and arranging multiple blocks. The position can be adjusted.",
		"block-collections",
	),
	icon: <Group />,
	edit: Edit,
	save,
	deprecated,
} as unknown as BlockConfiguration<GroupAttributes>;

registerBlockType<GroupAttributes>(metadata.name, settings);
