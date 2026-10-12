import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import type { BlockConfiguration } from "@wordpress/blocks";
import * as React from "react";
import "./style.scss";

import { BlockEditWrapper } from "itmar-block-packages";
//import Edit from './edit';
import save, { legacySave } from "./save";
import metadata from "./block.json";
import { ReactComponent as Select } from "./select.svg";
import type { SelectAttributes, SelectEditProps } from "./types";

//ブロックを遅延読込
const LazyEditComponent = React.lazy(() => import("./edit"));
const BlockEdit = (props: SelectEditProps & Record<string, unknown>) => {
	return <BlockEditWrapper lazyComponent={LazyEditComponent} {...props} />;
};

const settings = {
	...metadata,
	description: __("A block for designing select elements", "block-collections"),
	icon: <Select />,
	attributes: {
		...metadata.attributes,
		required: {
			type: "object",
			default: {
				flg: false,
				display: __("Required", "block-collections"),
			},
		},
		folder_val: {
			type: "string",
			default: __("Please Select.", "block-collections"),
		},
	},
	edit: BlockEdit,
	save,
} as unknown as BlockConfiguration<SelectAttributes>;

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

registerBlockType<SelectAttributes>(metadata.name, settings);
