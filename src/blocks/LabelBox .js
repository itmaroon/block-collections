
import { __ } from '@wordpress/i18n';
import TypographyControls from './TypographyControls'
import {
  InspectorControls,
  __experimentalPanelColorGradientSettings as PanelColorGradientSettings,
  __experimentalBorderRadiusControl as BorderRadiusControl
} from '@wordpress/block-editor';
import {
  ToggleControl,
  TextControl,
  PanelBody,
  PanelRow,
  __experimentalBoxControl as BoxControl,
  __experimentalBorderBoxControl as BorderBoxControl,
  __experimentalUnitControl as UnitControl
} from '@wordpress/components';

//スペースのリセットバリュー
const padding_resetValues = {
  top: '10px',
  left: '10px',
  right: '10px',
  bottom: '10px',
}

//ボーダーのリセットバリュー
const border_resetValues = {
  top: '0px',
  left: '0px',
  right: '0px',
  bottom: '0px',
}

const units = [
  { value: 'px', label: 'px' },
  { value: 'em', label: 'em' },
  { value: 'rem', label: 'rem' },
];

export default function LabelBox(props) {

  const {
    required,
    labelContent,
    font_style_label,
    bgColor_label,
    bgGradient_label,
    textColor_label,
    radius_label,
    border_label,
    padding_label,
    labelSpace,
  } = props.attributes



  return (
    <>
      <InspectorControls group="settings">
        <PanelBody title={__("Required Settings", 'itmar_block_collections')} initialOpen={true} className="title_design_ctrl">
          <PanelRow className='labelRequierd_row'>
            <ToggleControl
              label={__('Required input', 'itmar_block_collections')}
              checked={required.flg}
              onChange={(newVal) => {
                const newObj = { ...required, flg: newVal }
                setAttributes({ required: newObj })
              }}
            />
          </PanelRow>
          {required.flg &&
            <PanelRow>
              <TextControl
                label={__("Show 'required'", 'itmar_block_collections')}
                value={required.display}
                isPressEnterToChange
                onChange={(newVal) => {
                  const newObj = { ...required, display: newVal }
                  setAttributes({ required: newObj })
                }}
              />
            </PanelRow>
          }
        </PanelBody>
        <PanelBody title={__("Label Settings", 'itmar_block_collections')} initialOpen={true} className="title_design_ctrl">
          <PanelRow
            className='labelInfo_row'
          >
            <TextControl
              label={__("Text of Label", 'itmar_block_collections')}
              labelPosition="top"
              value={labelContent}
              isPressEnterToChange
              onChange={(newValue) => setAttributes({ labelContent: newValue })}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <InspectorControls group="styles">
        <PanelBody title={__("Label style settings", 'itmar_block_collections')} initialOpen={false} className="title_design_ctrl">

          <TypographyControls
            title={__('Typography', 'itmar_block_collections')}
            fontStyle={font_style_label}
            onChange={(newStyle) => {
              setAttributes({ font_style_label: newStyle })
            }}
            initialOpen={false}
          />
          <PanelColorGradientSettings
            title={__("Label Color Setting", 'itmar_block_collections')}
            settings={[{
              colorValue: textColor_label,
              label: __("Choose Text color", 'itmar_block_collections'),
              onColorChange: (newValue) => setAttributes({ textColor_label: newValue }),
            },
            {
              colorValue: bgColor_label,
              gradientValue: bgGradient_label,

              label: __("Choose Background color", 'itmar_block_collections'),
              onColorChange: (newValue) => setAttributes({ bgColor_label: newValue }),
              onGradientChange: (newValue) => setAttributes({ bgGradient_label: newValue }),
            },
            ]}
          />
          <PanelBody title={__("Border Settings", 'itmar_block_collections')} initialOpen={false} className="border_design_ctrl">
            <BorderBoxControl

              onChange={(newValue) => setAttributes({ border_label: newValue })}
              value={border_label}
              allowReset={true}	// リセットの可否
              resetValues={border_resetValues}	// リセット時の値
            />
            <BorderRadiusControl
              values={radius_label}
              onChange={(newBrVal) =>
                setAttributes({ radius_label: typeof newBrVal === 'string' ? { "value": newBrVal } : newBrVal })}
            />
          </PanelBody>
          <BoxControl
            label={__("Padding settings", 'itmar_block_collections')}
            values={padding_label}
            onChange={value => setAttributes({ padding_label: value })}
            units={units}	// 許可する単位
            allowReset={true}	// リセットの可否
            resetValues={padding_resetValues}	// リセット時の値

          />
          <UnitControl
            dragDirection="e"
            onChange={(newValue) => setAttributes({ labelSpace: newValue })}
            label={__('Spacing with textbox', 'itmar_block_collections')}
            value={labelSpace}
          />
        </PanelBody>
      </InspectorControls>

      <label className="fit-label">
        {required.flg ? <>{labelContent}<span>({required.display})</span></> : labelContent}
      </label>
    </>
  )
}