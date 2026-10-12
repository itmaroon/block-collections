import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import type { BlockConfiguration } from "@wordpress/blocks";
import "./style.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import save, { legacySave } from "./save";
import metadata from "./block.json";
import { ReactComponent as Title } from "./title.svg";
import type { TitleAttributes, TitleEditProps } from "./types";
//ブロックを遅延読込
// const LazyEditComponent = React.lazy(() => import("./edit"));
// const BlockEdit = (props) => {
// 	return <BlockEditWrapper lazyComponent={LazyEditComponent} {...props} />;
// };

const BlockEdit = (props: TitleEditProps & Record<string, unknown>) => {
	return <Edit {...props} />;
};

const settings = {
	styles: [
		{
			name: "default",
			label: __("Default", "block-collections"),
			isDefault: true,
		},
		{
			name: "circle_marker",
			label: __("Circle Marker", "block-collections"),
		},
		{
			name: "sub_copy",
			label: __("Sub Copy", "block-collections"),
		},
	],
	attributes: {
		...metadata.attributes,
		dateValue: {
			type: "string",
			default: new Date().toISOString(),
		},
	},
	description: __(
		"A block with various styles applied to heading tags",
		"block-collections",
	),
	icon: <Title />,
	edit: BlockEdit,
	save,
} as unknown as BlockConfiguration<TitleAttributes>;

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

registerBlockType<TitleAttributes>(metadata.name, settings);
