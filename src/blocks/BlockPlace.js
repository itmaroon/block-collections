import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  useInnerBlocksProps,
  InspectorControls
} from '@wordpress/block-editor';

import {
  Button,
  PanelBody,
  PanelRow,
  Icon,
  ToolbarGroup,
  ToolbarItem,
  ToggleControl,
  __experimentalUnitControl as UnitControl
} from '@wordpress/components';
import { group, stack, justifyCenter, justifyLeft, justifyRight, justifySpaceBetween, justifyStretch } from '@wordpress/icons';


//横並びのアイコン
const flex = <Icon icon={stack} className="rotate-icon" />
//上よせアイコン
const upper = <Icon icon={justifyLeft} className="rotate-icon" />
//中央よせのアイコン
const middle = <Icon icon={justifyCenter} className="rotate-icon" />
//下よせのアイコン
const lower = <Icon icon={justifyRight} className="rotate-icon" />
//上下一杯に伸ばすアイコン
const vert_between = <Icon icon={justifyStretch} className="rotate-icon" />
//上下均等に伸ばすアイコン
const vert_around = <Icon icon={justifySpaceBetween} className="rotate-icon" />

export default function BlockPlace(props) {

  const {
    attributes,
    isResizing,
  } = props;

  //配置アイコンの選択
  const start_icon = direction === 'vertical' ? upper : justifyLeft;
  const center_icon = direction === 'vertical' ? middle : justifyCenter;
  const end_icon = direction === 'vertical' ? lower : justifyRight;
  const between_icon = direction === 'vertical' ? vert_between : justifyStretch;
  const around_icon = direction === 'vertical' ? vert_around : justifySpaceBetween;
  //ツールチップの選択
  const start_tip = direction === 'vertical' ? __('upper alignment', 'itmar_block_collections') : __('left alignment', 'itmar_block_collections');
  const end_tip = direction === 'vertical' ? __('lower alignment', 'itmar_block_collections') : __('right alignment', 'itmar_block_collections');

  //インナーブロックの配置を加える
  const innerBlock_style = {
    ...innerBlock_direction,
    ...{ justifyContent: inner_align }
  }

  return (
    <>

      <PanelBody
        title={__("Block placement", 'itmar_block_collections')}
        initialOpen={true}
        className='itmar_group_direction'
      >
        {direction !== 'block' &&
          <>
            <p>{__('InnerBlock alignment', 'itmar_block_collections')}</p>
            <ToolbarGroup>
              <ToolbarItem>
                {(itemProps) => (
                  <Button {...itemProps}
                    isPressed={inner_align === 'flex-start'}
                    onClick={() => props.onPlaceChange({ inner_align: 'flex-start' })}//親コンポーネントに通知
                    icon={start_icon}
                    label={start_tip}
                  />

                )}
              </ToolbarItem>
              <ToolbarItem>
                {(itemProps) => (
                  <Button {...itemProps}
                    isPressed={inner_align === 'center'}
                    onClick={() => setAttributes({ inner_align: 'center' })}
                    icon={center_icon}
                    label={__('center alignment', 'itmar_block_collections')}
                  />
                )}
              </ToolbarItem>
              <ToolbarItem>
                {(itemProps) => (
                  <Button {...itemProps}
                    isPressed={inner_align === 'flex-end'}
                    onClick={() => setAttributes({ inner_align: 'flex-end' })}
                    icon={end_icon}
                    label={end_tip}
                  />
                )}
              </ToolbarItem>
              <ToolbarItem>
                {(itemProps) => (
                  <Button {...itemProps}
                    isPressed={inner_align === 'space-between'}
                    onClick={() => setAttributes({ inner_align: 'space-between' })}
                    icon={between_icon}
                    label={__('beteen stretch', 'itmar_block_collections')}
                  />

                )}
              </ToolbarItem>
              <ToolbarItem>
                {(itemProps) => (
                  <Button {...itemProps}
                    isPressed={inner_align === 'space-around'}
                    onClick={() => setAttributes({ inner_align: 'space-around' })}
                    icon={around_icon}
                    label={__('around stretch', 'itmar_block_collections')}
                  />

                )}
              </ToolbarItem>
            </ToolbarGroup>
          </>
        }
        <p>{__('Block alignment', 'itmar_block_collections')}</p>
        <ToolbarGroup>
          <ToolbarItem>
            {(itemProps) => (
              <Button {...itemProps}
                isPressed={outer_align === 'left'}
                onClick={() => setAttributes({ outer_align: 'left' })}
                icon={justifyLeft}
                label={__('left alignment', 'itmar_block_collections')}
              />

            )}
          </ToolbarItem>
          <ToolbarItem>
            {(itemProps) => (
              <Button {...itemProps}
                isPressed={outer_align === 'center'}
                onClick={() => setAttributes({ outer_align: 'center' })}
                icon={justifyCenter}
                label={__('center alignment', 'itmar_block_collections')}
              />
            )}
          </ToolbarItem>
          <ToolbarItem>
            {(itemProps) => (
              <Button {...itemProps}
                isPressed={outer_align === 'right'}
                onClick={() => setAttributes({ outer_align: 'right' })}
                icon={justifyRight}
                label={__('right alignment', 'itmar_block_collections')}
              />
            )}
          </ToolbarItem>

        </ToolbarGroup>
        <p>{__('Block width', 'itmar_block_collections')}</p>
        <ToolbarGroup>
          <ToolbarItem>
            {(itemProps) => (
              <Button {...itemProps}
                isPressed={width_val === 'fit'}
                onClick={() => setAttributes({ width_val: 'fit' })}
                text={__('fit', 'itmar_block_collections')}
              />

            )}
          </ToolbarItem>
          <ToolbarItem>
            {(itemProps) => (
              <Button {...itemProps}
                isPressed={width_val === 'wideSize'}
                onClick={() => setAttributes({ width_val: 'wideSize' })}
                text={__('wide', 'itmar_block_collections')}
              />

            )}
          </ToolbarItem>
          <ToolbarItem>
            {(itemProps) => (
              <Button {...itemProps}
                isPressed={width_val === 'contentSize'}
                onClick={() => setAttributes({ width_val: 'contentSize' })}
                text={__('content', 'itmar_block_collections')}
              />

            )}
          </ToolbarItem>
        </ToolbarGroup>
      </PanelBody>
    </>
  );
}