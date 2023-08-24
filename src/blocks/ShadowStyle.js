
import { __ } from '@wordpress/i18n';
import {
  InspectorControls,
  __experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor';
import {
  PanelBody,
  PanelRow,
  ToggleControl,
  RangeControl,
  RadioControl
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

import { hslToRgb16, HexToRGB, rgb16ToHsl } from './hslToRgb';

//方向と距離
const dirctionDigit = (direction, distance) => {
  let destTopLeft, destTopRight, destBottomLeft, destBottomRight;
  switch (direction) {
    case "top_left":
      destTopLeft = distance;
      destTopRight = distance;
      destBottomLeft = distance * -1;
      destBottomRight = distance * -1;
      break;
    case "top_right":
      destTopLeft = distance * -1;
      destTopRight = distance;
      destBottomLeft = distance;
      destBottomRight = distance * -1;
      break;
    case "bottom_left":
      destTopLeft = distance * -1;
      destTopRight = distance;
      destBottomLeft = distance;
      destBottomRight = distance * -1;
      break;
    case "bottom_right":
      destTopLeft = distance;
      destTopRight = distance;
      destBottomLeft = distance * -1;
      destBottomRight = distance * -1;
      break;
    case "right_bottom":
      destTopLeft = distance;
      destTopRight = distance * -1;
      destBottomLeft = distance * -1;
      destBottomRight = distance;
      break;
    case "top":
      destTopLeft = 0;
      destTopRight = 0;
      destBottomLeft = distance * -1;
      destBottomRight = distance;
      break;
  }
  return (
    {
      topLeft: destTopLeft,
      topRight: destTopRight,
      bottomLeft: destBottomLeft,
      bottmRight: destBottomRight
    }
  )
}

const ShadowStyle = ({ shadowStyle, onChange, children }) => {

  const [shadowState, setShadowState] = useState(shadowStyle);
  const {
    shadowType,
    spread,
    lateral,
    longitude,
    nomalBlur,
    shadowColor,
    blur,
    intensity,
    distance,
    newDirection,
    clayDirection,
    embos,
    opacity,
    depth,
    bdBlur,
    expand,
    glassblur,
    glassopa,
    hasOutline,
    backgroundColor,
  } = shadowState;


  useEffect(() => {
    //ノーマル
    if (shadowType === 'nomal') {
      //boxshadowの生成
      const ShadowStyle = {
        style: {
          boxShadow: `${lateral}px ${longitude}px ${nomalBlur}px ${spread}px ${shadowColor}`
        }
      }
      //Shadowのスタイルを返す
      onChange(ShadowStyle, shadowState);
    }
    //ニューモフィズム
    else if (shadowType === 'newmor') {
      const baseColor = backgroundColor || "#ffffff";
      //ボタン背景色のHSL値
      const hslValue = rgb16ToHsl(baseColor);
      //影の明るさを変更
      const lightVal = (hslValue.lightness + intensity) < 100 ? hslValue.lightness + intensity : 100;
      const darkVal = (hslValue.lightness - intensity) > 0 ? hslValue.lightness - intensity : 0;
      const lightValue = hslToRgb16(hslValue.hue, hslValue.saturation, lightVal);
      const darkValue = hslToRgb16(hslValue.hue, hslValue.saturation, darkVal);
      //boxshadowの生成
      //立体の方向
      const dircObj = dirctionDigit(newDirection, distance)
      const ShadowStyle = embos === 'swell' ? {
        style: {
          boxShadow: `${dircObj.topLeft}px ${dircObj.topRight}px ${blur}px ${darkValue}, ${dircObj.bottomLeft}px ${dircObj.bottmRight}px ${blur}px ${lightValue}`,
          border: 'none',
          backgroundColor: baseColor
        }
      } : {
        style: {
          boxShadow: `inset ${dircObj.topLeft}px ${dircObj.topRight}px ${blur}px ${darkValue}, inset ${dircObj.bottomLeft}px ${dircObj.bottmRight}px ${blur}px ${lightValue}`,
          border: 'none',
          backgroundColor: baseColor
        }
      }

      //Shadowのスタイルを返す
      onChange(ShadowStyle, shadowState);
    }

    //クレイモーフィズム
    else if (shadowType === 'claymor') {
      const baseColor = backgroundColor || "#C0C0C0";
      const rgbValue = HexToRGB(baseColor)
      const outsetObj = dirctionDigit(clayDirection, expand)
      const insetObj = dirctionDigit(clayDirection, depth)
      const claymorStyle = {
        style:
        {
          boxShadow: `${outsetObj.topLeft}px ${outsetObj.bottmRight}px ${expand * 2}px 0px rgba(${rgbValue.red}, ${rgbValue.green}, ${rgbValue.blue}, 0.5), inset ${insetObj.topRight}px ${insetObj.bottomLeft}px 16px 0px rgba(${rgbValue.red}, ${rgbValue.green}, ${rgbValue.blue}, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)`,
          backgroundColor: `rgba(255, 255, 255, ${opacity})`,
          backdropFilter: `blur(${bdBlur}px)`,
          border: 'none',
          backgroundColor: baseColor
        }
      }
      //attributesに保存
      onChange(claymorStyle, shadowState)
    }

    //グラスモーフィズム
    else if (shadowType === 'glassmor') {
      const baseColor = backgroundColor || "#C0C0C0";
      const rgbValue = HexToRGB(baseColor)
      let glassmorStyle = {
        style:
        {
          backgroundColor: `rgba( ${rgbValue.red}, ${rgbValue.green}, ${rgbValue.blue}, ${glassopa} )`,
          boxShadow: `0 8px 32px 0 rgba( 31, 38, 135, 0.37 )`,
          backdropFilter: `blur( ${glassblur}px )`,
          WebkitBackdropFilter: `blur( ${glassblur}px )`,
          border: 'none',
          backgroundColor: baseColor
        }
      }
      if (hasOutline) {
        glassmorStyle.style.border = '1px solid rgba( 255, 255, 255, 0.18 )'
      }
      //attributesに保存
      onChange(glassmorStyle, shadowState)
    }

  }, [shadowState]);

  return (
    <>
      <InspectorControls group='styles'>
        <PanelBody title={__("Shadow Type", 'itmar_block_collections')} initialOpen={true}>
          <div className="itmar_shadow_type">
            <RadioControl
              selected={shadowType}
              options={[
                { label: __("Nomal", 'itmar_block_collections'), value: 'nomal' },
                { label: __("Neumorphism", 'itmar_block_collections'), value: 'newmor' },
                { label: __("Claymorphism ", 'itmar_block_collections'), value: 'claymor' },
                { label: __("Grassmophism", 'itmar_block_collections'), value: 'glassmor' },
              ]}
              onChange={(changeOption) => setShadowState({ ...shadowState, shadowType: changeOption })}
            />
          </div>
        </PanelBody>

        {shadowType === 'nomal' &&
          <PanelBody title={__("Nomal settings", 'itmar_block_collections')} initialOpen={false}>
            <RangeControl
              value={spread}
              label={__("Spread", 'itmar_block_collections')}
              max={50}
              min={0}
              onChange={(val) => setShadowState({ ...shadowState, spread: val })}
              withInputField={false}
            />
            <RangeControl
              value={lateral}
              label={__("Lateral direction", 'itmar_block_collections')}
              max={50}
              min={0}
              onChange={(val) => setShadowState({ ...shadowState, lateral: val })}
              withInputField={false}
            />
            <RangeControl
              value={longitude}
              label={__("Longitudinal direction", 'itmar_block_collections')}
              max={50}
              min={0}
              onChange={(val) => setShadowState({ ...shadowState, longitude: val })}
              withInputField={false}
            />
            <RangeControl
              value={nomalBlur}
              label={__("Blur", 'itmar_block_collections')}
              max={20}
              min={0}
              onChange={(val) => setShadowState({ ...shadowState, nomalBlur: val })}
              withInputField={false}
            />
            <PanelColorGradientSettings
              title={__("Shadow Color Setting", 'itmar_block_collections')}
              settings={[
                {
                  colorValue: shadowColor,
                  label: __("Choose Shadow color", 'itmar_block_collections'),
                  onColorChange: (newValue) => setShadowState({ ...shadowState, shadowColor: newValue }),
                },
              ]}
            />

          </PanelBody>
        }

        {shadowType === 'newmor' &&
          <PanelBody title={__("Neumorphism settings", 'itmar_block_collections')} initialOpen={false}>
            <RangeControl
              value={distance}
              label={__("Distance", 'itmar_block_collections')}
              max={50}
              min={0}
              onChange={(val) => setShadowState({ ...shadowState, distance: val })}
              withInputField={false}
            />
            <RangeControl
              value={intensity}
              label={__("Intensity", 'itmar_block_collections')}
              max={100}
              min={0}
              onChange={(val) => setShadowState({ ...shadowState, intensity: val })}
              withInputField={false}
            />
            <RangeControl
              value={blur}
              label={__("Blur", 'itmar_block_collections')}
              max={20}
              min={0}
              onChange={(val) => setShadowState({ ...shadowState, blur: val })}
              withInputField={false}
            />
            <PanelRow>
              <div className="light_direction">
                <RadioControl
                  selected={newDirection}
                  options={[
                    { value: 'top_left' },
                    { value: 'top_right' },
                    { value: 'bottom_left' },
                    { value: 'bottom_right' },
                  ]}
                  onChange={(changeOption) => setShadowState({ ...shadowState, newDirection: changeOption })}
                />
              </div>
              <div className="embos">
                <RadioControl
                  selected={embos}
                  options={[
                    { value: 'swell' },
                    { value: 'dent' },

                  ]}
                  onChange={(changeOption) => setShadowState({ ...shadowState, embos: changeOption })}
                />
              </div>

            </PanelRow>

          </PanelBody>

        }
        {shadowType === 'claymor' &&

          <PanelBody title={__("Claymorphism settings", 'itmar_block_collections')} initialOpen={false}>
            <RangeControl
              value={opacity}
              label={__("Opacity", 'itmar_block_collections')}
              max={1}
              min={0}
              step={.1}
              onChange={(val) => setShadowState({ ...shadowState, opacity: val })}
              withInputField={false}
            />
            <RangeControl
              value={depth}
              label="Depth"
              max={20}
              min={0}
              onChange={(val) => setShadowState({ ...shadowState, depth: val })}
              withInputField={false}
            />
            <RangeControl
              value={expand}
              label="Expand"
              max={50}
              min={0}
              onChange={(val) => setShadowState({ ...shadowState, expand: val })}
              withInputField={false}
            />
            <RangeControl
              value={bdBlur}
              label="Background Blur"
              max={10}
              min={0}
              onChange={(val) => setShadowState({ ...shadowState, bdBlur: val })}
              withInputField={false}
            />
            <div className="light_direction claymor">
              <RadioControl
                selected={clayDirection}
                options={[
                  { value: 'right_bottom' },
                  { value: 'top_right' },
                  { value: 'top' },
                ]}
                onChange={(changeOption) => setShadowState({ ...shadowState, clayDirection: changeOption })}
              />
            </div>
          </PanelBody>
        }

        {shadowType === 'glassmor' &&
          <PanelBody title={__("Grassmophism settings", 'itmar_block_collections')} initialOpen={false}>
            <RangeControl
              value={glassblur}
              label={__("Glass blur", 'itmar_block_collections')}
              max={20}
              min={0}
              onChange={(val) => setShadowState({ ...shadowState, glassblur: val })}
              withInputField={false}
            />
            <RangeControl
              value={glassopa}
              label={__("Glass Opacity", 'itmar_block_collections')}
              max={1}
              min={0}
              step={.1}
              onChange={(val) => setShadowState({ ...shadowState, glassopa: val })}
              withInputField={false}
            />
            <fieldset>
              <ToggleControl
                label={__("Show outline", 'itmar_block_collections')}
                checked={hasOutline}
                onChange={() => setShadowState({ ...shadowState, hasOutline: !hasOutline })}
              />
            </fieldset>
          </PanelBody>
        }
      </InspectorControls>

      {children}

    </>

  );
};
export default ShadowStyle;
