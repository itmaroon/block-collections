import { registerBlockType } from "@wordpress/blocks";
import type { BlockConfiguration } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import * as React from "react";
import { ReactComponent as TextBox } from "./textbox.svg";
import "./style.scss";

import { BlockEditWrapper } from "itmar-block-packages";
//import Edit from './edit';
import save, { legacySave } from "./save";
import metadata from "./block.json";
import type { TextCtrlAttributes, TextCtrlEditProps } from "./types";

//ブロックを遅延読込
const LazyEditComponent = React.lazy(() => import("./edit"));
const BlockEdit = (props: TextCtrlEditProps & Record<string, unknown>) => {
	return <BlockEditWrapper lazyComponent={LazyEditComponent} {...props} />;
};

const settings = {
	icon: <TextBox />,
	description: __("A block for styling text controls.", "block-collections"),
	styles: [
		{
			name: "nomal",
			label: __("Default", "block-collections"),
			isDefault: true,
		},
		{
			name: "line",
			label: __("Line", "block-collections"),
		},
	],
	attributes: {
		...metadata.attributes,
		placeFolder: {
			type: "string",
			default: __("Please Input ...", "block-collections"),
		},
		required: {
			type: "object",
			default: {
				flg: false,
				display: __("Required", "block-collections"),
			},
		},
	},
	edit: BlockEdit,
	save,
} as unknown as BlockConfiguration<TextCtrlAttributes>;

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

registerBlockType<TextCtrlAttributes>(metadata.name, settings);
