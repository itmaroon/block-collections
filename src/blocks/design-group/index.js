
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { ReactComponent as Group } from './group.svg';


registerBlockType(metadata.name, {

	description: __("A block for storing and arranging multiple blocks. The position can be adjusted.", 'block-collections'),
	icon: <Group />,
	edit: Edit,
	save,
});
