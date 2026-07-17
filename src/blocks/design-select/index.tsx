import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import type { BlockConfiguration } from "@wordpress/blocks";
import * as React from "react";
import "./style.scss";

import { BlockEditWrapper } from "itmar-block-packages";
//import Edit from './edit';
import save from "./save";
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

registerBlockType<SelectAttributes>(metadata.name, settings);
