
import { __ } from '@wordpress/i18n';

import {
  TextControl,
  PanelBody,
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
  ' からアイコンを選んでUnicode(選択ダイアログの右上４桁）を入力してください。'
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
        label="アイコン名"
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
          label='サイズ'
          value={icon_size}
          units={units}
        />
        <UnitControl
          dragDirection="e"
          onChange={(newValue) => {
            const newStyle = { ...iconStyle, icon_space: newValue };
            onChange(newStyle);
          }}
          label='終端までの間隔'
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
      <label className="components-base-control__label">配置</label>
      <PanelRow className='itmar_position_row'>
        <RadioControl
          selected={icon_pos}
          options={[
            { label: '左', value: "left" },
            { label: '右', value: "right" },
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
