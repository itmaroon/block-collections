/**
 * コアブロックカスタマイズ高階コンポーネント
 *
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import {
  InspectorControls,
} from '@wordpress/block-editor';

import {
  Button,
  Panel,
  PanelBody,
  PanelRow,
  ToggleControl,
  RangeControl,
  RadioControl,
  TextControl,
  __experimentalBoxControl as BoxControl,
  __experimentalUnitControl as UnitControl,
  __experimentalBorderBoxControl as BorderBoxControl
} from '@wordpress/components';

//BlockEditカスタムフック（インスペクターの追加）
const withInspectorControl = createHigherOrderComponent((BlockEdit) => {
  //スペースのリセットバリュー
  const padding_resetValues = {
    top: '1em',
    left: '1em',
    right: '1em',
    bottom: '1em',
  }

  const units = [
    { value: 'px', label: 'px' },
    { value: 'em', label: 'em' },
    { value: 'rem', label: 'rem' },
  ];

  return (props) => {
    if (props.name === 'core/paragraph') {
      const {
        lineHeight,
        margin_val,
        padding_val
      } = props.attributes;
      const setAttributes = props.setAttributes;
      return (
        <>
          <BlockEdit {...props} />
          <InspectorControls group="styles">
            <PanelBody title="行間設定">
              <RangeControl
                value={lineHeight}
                label="lineHeight"
                max={3}
                min={1}
                step={.1}
                onChange={(val) => setAttributes({ lineHeight: val })}
                withInputField={true}
              />
            </PanelBody>
            <PanelBody title="間隔設定" initialOpen={false}>
              <BoxControl
                label="マージン設定"
                values={margin_val}
                onChange={newValue => setAttributes({ margin_val: newValue })}
                units={units}	// 許可する単位
                allowReset={true}	// リセットの可否
                resetValues={padding_resetValues}	// リセット時の値

              />

              <BoxControl
                label="パティング設定"
                values={padding_val}
                onChange={newValue => setAttributes({ padding_val: newValue })}
                units={units}	// 許可する単位
                allowReset={true}	// リセットの可否
                resetValues={padding_resetValues}	// リセット時の値

              />
            </PanelBody>
          </InspectorControls>
        </>
      );
    }
    return <BlockEdit {...props} />;
  };
}, 'withInspectorControl');

addFilter('editor.BlockEdit', 'block-collections/with-inspector-control', withInspectorControl);

//block登録フック（カスタム属性の追加）
function addLineHeightAttribute(settings, name) {
  if (name !== 'core/paragraph') {
    return settings;
  }

  return lodash.assign({}, settings, {
    attributes: lodash.assign({}, settings.attributes, {
      lineHeight: {
        type: 'number',
        default: 1.6,
      },
      margin_val: {
        type: "object",
        default: {
          top: "1em",
          left: "1em",
          bottom: "1em",
          right: "1em"
        }
      },
      padding_val: {
        type: "object",
        default: {
          top: "1em",
          left: "1em",
          bottom: "1em",
          right: "1em"
        }
      },
    }),
  });
}

addFilter(
  'blocks.registerBlockType',
  'block-collections/add-attribute',
  addLineHeightAttribute
);

//BlockListBlockフック（ブロックの外観等の反映）
const applyExtraAttributesInEditor = createHigherOrderComponent((BlockListBlock) => {
  return (props) => {
    //propsを展開
    const {
      attributes,
      className,
      name,
      isValid,
      wrapperProps
    } = props;

    //core/paragraphの場合
    if (name === 'core/paragraph') {
      if (isValid) {
        //属性の取り出し
        const {
          lineHeight,
          margin_val,
          padding_val
        } = attributes;

        //拡張したスタイル
        const extraStyle = {
          lineHeight: lineHeight,
          margin: `${margin_val.top} ${margin_val.right} ${margin_val.bottom} ${margin_val.left}`,
          padding: `${padding_val.top} ${padding_val.right} ${padding_val.bottom} ${padding_val.left}`,
        }
        //既存スタイルとマージ
        let blockWrapperProps = wrapperProps;
        blockWrapperProps = {
          ...blockWrapperProps,
          style: {
            ...(blockWrapperProps && { ...blockWrapperProps.style }),
            ...extraStyle
          },
        };

        return (
          <BlockListBlock {...props}
            wrapperProps={blockWrapperProps}
          />
        );
      }
    } else {
      return (
        <BlockListBlock {...props} />
      );
    }

  };
}, 'applyExtraAttributesInEditor');

addFilter(
  'editor.BlockListBlock',
  'block-collections/extra-attributes-in-editor',
  applyExtraAttributesInEditor,
);

//blocks.getSaveContent.extraPropsフック（フロントエンドへの反映）
const applyExtraAttributesInFrontEnd = (props, blockType, attributes) => {
  //core/paragraphの場合
  if (blockType.name === 'core/paragraph') {

    //属性の取り出し
    const {
      lineHeight,
      margin_val,
      padding_val
    } = attributes;

    //拡張したスタイル
    const extraStyle = {
      lineHeight: lineHeight,
      margin: `${margin_val.top} ${margin_val.right} ${margin_val.bottom} ${margin_val.left}`,
      padding: `${padding_val.top} ${padding_val.right} ${padding_val.bottom} ${padding_val.left}`,
    }
    lodash.assign(
      props,
      {
        ...extraStyle
      },
    );
  }
  return props;
}

addFilter(
  'blocks.getSaveContent.extraProps',
  'block-collections/-extra-attributes-in-front-end',
  applyExtraAttributesInFrontEnd,
);
