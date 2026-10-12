import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import type { BlockConfiguration } from "@wordpress/blocks";
import "./style.scss";

import Edit from "./edit";
import save, { legacySave } from "./save";
import metadata from "./block.json";
import type { CodeHighlightAttributes } from "./types";

const settings = {
	description: __("A block that highlights code.", "block-collections"),
	edit: Edit,
	save,
} as unknown as BlockConfiguration<CodeHighlightAttributes>;

// 昔の save() で保存された内容（サイトの言語で訳した文言・書式）を、読めるようにする。
// deprecated の定義は、ブロックの定義を引き継がないので、attributes・supports・apiVersion を、自分で持たせる
(settings as unknown as { deprecated: unknown[] }).deprecated = [
	{
		apiVersion: (metadata as { apiVersion?: number }).apiVersion,
		attributes:
			(settings as unknown as { attributes?: unknown }).attributes ??
			(metadata as { attributes?: unknown }).attributes,
		supports: (metadata as { supports?: unknown }).supports,
		save: legacySave,
	},
];

registerBlockType<CodeHighlightAttributes>(metadata.name, settings);
