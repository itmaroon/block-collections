import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import type { BlockConfiguration } from "@wordpress/blocks";
import "./style.scss";

import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import type { CodeHighlightAttributes } from "./types";

const settings = {
	description: __("A block that highlights code.", "block-collections"),
	edit: Edit,
	save,
} as unknown as BlockConfiguration<CodeHighlightAttributes>;

registerBlockType<CodeHighlightAttributes>(metadata.name, settings);
