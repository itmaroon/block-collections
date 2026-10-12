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
import { ReactComponent as Radiobutton } from "./radio.svg";
import type { RadioAttributes } from "./types";
//ブロックを遅延読込
// const LazyEditComponent = React.lazy(() => import('./edit'));
// const BlockEdit = (props) => {
// 	return <BlockEditWrapper lazyComponent={LazyEditComponent} {...props} />;
// };

const settings = {
	...metadata,
	icon: <Radiobutton />,
	description: __(
		"A block for creating radio button with designs",
		"block-collections",
	),
	styles: [
		{
			name: "nomal",
			label: __("Default", "block-collections"),
			isDefault: true,
		},
		{
			name: "button",
			label: __("Button", "block-collections"),
		},
	],
	edit: Edit,
	save,
} as unknown as BlockConfiguration<RadioAttributes>;

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

registerBlockType<RadioAttributes>(metadata.name, settings);
