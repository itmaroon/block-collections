
import { __ } from '@wordpress/i18n';

import {
  TextControl,
  PanelRow,
  RadioControl,
  __experimentalUnitControl as UnitControl,
} from '@wordpress/components';

import {
  PanelColorSettings
} from '@wordpress/block-editor';


const helpLink = createElement(
  'a',
  { href: 'https://fontawesome.com/search', target: '_blank' },
  'FontAwesome'
);

const helpText = createElement(
  'span',
  {},
  helpLink,
  __('Select the icon from and enter Unicode (the upper right four digits of the selection dialog). ', 'itmar_block_collections')
);

const units = [
  { value: 'px', label: 'px' },
  { value: 'em', label: 'em' },
  { value: 'rem', label: 'rem' },
];

export default ({ iconStyle, onChange }) => {
  const {
    icon_name,
    icon_pos,
    icon_size,
    icon_color,
    icon_space
  } = iconStyle;

  return (
    <>
      <TextControl
        label={__("icon name", 'itmar_block_collections')}
        help={helpText}
        labelPosition="top"
        value={icon_name}
        isPressEnterToChange
        onChange={(newValue) => {
          const newStyle = { ...iconStyle, icon_name: newValue };
          onChange(newStyle);
        }}
      />

      <PanelRow className='sizing_row'>
        <UnitControl
          dragDirection="e"
          onChange={(newValue) => {
            const newStyle = { ...iconStyle, icon_size: newValue };
            onChange(newStyle);
          }}
          label={__("Size", 'itmar_block_collections')}
          value={icon_size}
          units={units}
        />
        <UnitControl
          dragDirection="e"
          onChange={(newValue) => {
            const newStyle = { ...iconStyle, icon_space: newValue };
            onChange(newStyle);
          }}
          label={__('spacing to end', 'itmar_block_collections')}
          value={icon_space}
          units={units}
        />
      </PanelRow>

      <PanelColorSettings
        title={__('Color settings', 'itmar_location')}
        initialOpen={false}
        colorSettings={[
          {
            value: icon_color,
            onChange: (newValue) => {
              const newStyle = { ...iconStyle, icon_color: newValue };
              onChange(newStyle);
            },
            label: __('Icon color', 'itmar_location')
          },

        ]}
      />
      <label className="components-base-control__label">{__("Arrangement", 'itmar_block_collections')}</label>
      <PanelRow className='itmar_position_row'>
        <RadioControl
          selected={icon_pos}
          options={[
            { label: __("left", 'itmar_block_collections'), value: "left" },
            { label: __("right", 'itmar_block_collections'), value: "right" },
          ]}
          onChange={(newValue) => {
            const newStyle = { ...iconStyle, icon_pos: newValue };
            onChange(newStyle);
          }}
        />
      </PanelRow>
    </>

  );
}
