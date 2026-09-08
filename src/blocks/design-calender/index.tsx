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
import { ReactComponent as Calenderbutton } from "./calender.svg";
import type { CalendarAttributes } from "./types";

const settings = {
	...metadata,
	icon: <Calenderbutton />,
	description: __(
		"A block for display calender with designs",
		"block-collections",
	),

	edit: Edit,
	save,
} as unknown as BlockConfiguration<CalendarAttributes>;

registerBlockType<CalendarAttributes>(metadata.name, settings);
