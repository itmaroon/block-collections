import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

import {
  Button,
  PanelBody,
  Icon,
  ToolbarGroup,
  ToolbarItem,
  RangeControl
} from '@wordpress/components';
import { justifyCenter, justifyLeft, justifyRight, justifySpaceBetween, justifyStretch } from '@wordpress/icons';



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
    blockRef
  } = props;
  const {
    direction,
    inner_align,
    outer_align,
    outer_vertical,
    width_val,
    free_val
  } = attributes;

  //配置アイコンの選択
  const start_icon = direction === 'vertical' ? upper : justifyLeft;
  const center_icon = direction === 'vertical' ? middle : justifyCenter;
  const end_icon = direction === 'vertical' ? lower : justifyRight;
  const between_icon = direction === 'vertical' ? vert_between : justifyStretch;
  const around_icon = direction === 'vertical' ? vert_around : justifySpaceBetween;
  //ツールチップの選択
  const start_tip = direction === 'vertical' ? __('upper alignment', 'itmar_block_collections') : __('left alignment', 'itmar_block_collections');
  const end_tip = direction === 'vertical' ? __('lower alignment', 'itmar_block_collections') : __('right alignment', 'itmar_block_collections');

  //親要素がFlex又はGridコンテナか
  // ローカル状態の作成
  const [isContainer, setIsContainer] = useState(false);
  useEffect(() => {
    if (blockRef) {
      const element = blockRef.current;
      const parentElement = element.parentElement;
      const computedStyle = getComputedStyle(parentElement);
      if (computedStyle.display === "flex" || computedStyle.display === "inline-flex" || computedStyle.display === "grid" || computedStyle.display === "inline-grid") {
        setIsContainer(true)
      }
    }
  }, []);



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
                    onClick={() => props.onFlexChange('flex-start')}//親コンポーネントに通知
                    icon={start_icon}
                    label={start_tip}
                  />

                )}
              </ToolbarItem>
              <ToolbarItem>
                {(itemProps) => (
                  <Button {...itemProps}
                    isPressed={inner_align === 'center'}
                    onClick={() => props.onFlexChange('center')}//親コンポーネントに通知
                    icon={center_icon}
                    label={__('center alignment', 'itmar_block_collections')}
                  />
                )}
              </ToolbarItem>
              <ToolbarItem>
                {(itemProps) => (
                  <Button {...itemProps}
                    isPressed={inner_align === 'flex-end'}
                    onClick={() => props.onFlexChange('flex-end')}//親コンポーネントに通知
                    icon={end_icon}
                    label={end_tip}
                  />
                )}
              </ToolbarItem>
              <ToolbarItem>
                {(itemProps) => (
                  <Button {...itemProps}
                    isPressed={inner_align === 'space-between'}
                    onClick={() => props.onFlexChange('space-between')}//親コンポーネントに通知
                    icon={between_icon}
                    label={__('beteen stretch', 'itmar_block_collections')}
                  />

                )}
              </ToolbarItem>
              <ToolbarItem>
                {(itemProps) => (
                  <Button {...itemProps}
                    isPressed={inner_align === 'space-around'}
                    onClick={() => props.onFlexChange('space-around')}//親コンポーネントに通知
                    icon={around_icon}
                    label={__('around stretch', 'itmar_block_collections')}
                  />

                )}
              </ToolbarItem>
            </ToolbarGroup>
          </>
        }
        <p>{__('Block horizen alignment', 'itmar_block_collections')}</p>
        <ToolbarGroup>
          <ToolbarItem>
            {(itemProps) => (
              <Button {...itemProps}
                isPressed={outer_align === 'left'}
                onClick={() => props.onAlignChange('left')}
                icon={justifyLeft}
                label={__('left alignment', 'itmar_block_collections')}
              />

            )}
          </ToolbarItem>
          <ToolbarItem>
            {(itemProps) => (
              <Button {...itemProps}
                isPressed={outer_align === 'center'}
                onClick={() => props.onAlignChange('center')}
                icon={justifyCenter}
                label={__('center alignment', 'itmar_block_collections')}
              />
            )}
          </ToolbarItem>
          <ToolbarItem>
            {(itemProps) => (
              <Button {...itemProps}
                isPressed={outer_align === 'right'}
                onClick={() => props.onAlignChange('right')}
                icon={justifyRight}
                label={__('right alignment', 'itmar_block_collections')}
              />
            )}
          </ToolbarItem>

        </ToolbarGroup>
        {isContainer &&
          <>
            <p>{__('Block vertical alignment', 'itmar_block_collections')}</p>
            <ToolbarGroup>
              <ToolbarItem>
                {(itemProps) => (
                  <Button {...itemProps}
                    isPressed={outer_vertical === 'self-start'}
                    onClick={() => props.onVerticalChange('self-start')}
                    icon={upper}
                    label={__('upper alignment', 'itmar_block_collections')}
                  />

                )}
              </ToolbarItem>
              <ToolbarItem>
                {(itemProps) => (
                  <Button {...itemProps}
                    isPressed={outer_vertical === 'center'}
                    onClick={() => props.onVerticalChange('center')}
                    icon={middle}
                    label={__('center alignment', 'itmar_block_collections')}
                  />
                )}
              </ToolbarItem>
              <ToolbarItem>
                {(itemProps) => (
                  <Button {...itemProps}
                    isPressed={outer_vertical === 'self-end'}
                    onClick={() => props.onVerticalChange('self-end')}
                    icon={lower}
                    label={__('lower alignment', 'itmar_block_collections')}
                  />
                )}
              </ToolbarItem>

            </ToolbarGroup>
          </>
        }
        <p>{__('Block width', 'itmar_block_collections')}</p>
        <ToolbarGroup>
          <ToolbarItem>
            {(itemProps) => (
              <Button {...itemProps}
                isPressed={width_val === 'fit'}
                onClick={() => props.onWidthChange('fit')}
                text={__('fit', 'itmar_block_collections')}
              />

            )}
          </ToolbarItem>
          <ToolbarItem>
            {(itemProps) => (
              <Button {...itemProps}
                isPressed={width_val === 'wideSize'}
                onClick={() => props.onWidthChange('wideSize')}
                text={__('wide', 'itmar_block_collections')}
              />

            )}
          </ToolbarItem>
          <ToolbarItem>
            {(itemProps) => (
              <Button {...itemProps}
                isPressed={width_val === 'contentSize'}
                onClick={() => props.onWidthChange('contentSize')}
                text={__('content', 'itmar_block_collections')}
              />

            )}
          </ToolbarItem>
          <ToolbarItem>
            {(itemProps) => (
              <Button {...itemProps}
                isPressed={width_val === 'free'}
                onClick={() => props.onWidthChange('free')}
                text={__('free', 'itmar_block_collections')}
              />

            )}
          </ToolbarItem>

        </ToolbarGroup>
        {width_val === 'free' &&
          <RangeControl
            value={free_val}
            label={__("Max width", 'itmar_block_collections')}
            max={1800}
            min={300}
            step={100}
            onChange={(newValue) => {
              props.onFreevalChange(newValue)
            }}
            withInputField={true}
          />
        }
      </PanelBody>
    </>
  );
}