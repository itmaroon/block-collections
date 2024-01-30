import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { ReactComponent as Table } from './table.svg';
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
	icon: <Table />,
	description: __('A table with a design.', 'block-collections'),
	styles: [
		{
			name: "nomal",
			label: __('Default', 'block-collections'),
			isDefault: true
		},
		{
			name: "stripe",
			label: __('Stripe', 'block-collections')
		}
	],

	edit: Edit,
	save,
});
