
import { registerBlockType } from '@wordpress/blocks';
import type { BlockConfiguration } from "@wordpress/blocks";
import './style.scss';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { ReactComponent as Process } from './process.svg';
import type { ProcessAttributes } from "./types";


const settings = {
	...metadata,
	styles: [
		{
			name: "progress",
			label: __("Default", 'block-collections'),
			isDefault: true
		},
		{
			name: "card",
			label: __("Card", 'block-collections'),
		}
	],
	description: __("A block for stylish display of process progress", 'block-collections'),
	icon: <Process />,
	edit: Edit,
	save,
} as unknown as BlockConfiguration<ProcessAttributes>;

registerBlockType<ProcessAttributes>(metadata.name, settings);
