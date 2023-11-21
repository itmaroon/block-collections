import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

import {
  Button,
  PanelBody,
  Icon,
  ToolbarGroup,
  ToolbarItem,
  RangeControl,
  Modal
} from '@wordpress/components';
import { group, stack, layout, justifyCenter, justifyLeft, justifyRight, justifySpaceBetween, justifyStretch } from '@wordpress/icons';
import GridControls from "./GridControls";


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
    clientId,
    blockRef,
    isMobile
  } = props;
  const {
    default_pos,
    mobile_pos
  } = attributes;

  //モバイルかデスクトップか
  const sel_pos = isMobile ? mobile_pos : default_pos

  //配置アイコンの選択
  const start_icon = sel_pos.direction === 'vertical' ? upper : justifyLeft;
  const center_icon = sel_pos.direction === 'vertical' ? middle : justifyCenter;
  const end_icon = sel_pos.direction === 'vertical' ? lower : justifyRight;
  const between_icon = sel_pos.direction === 'vertical' ? vert_between : justifyStretch;
  const around_icon = sel_pos.direction === 'vertical' ? vert_around : justifySpaceBetween;
  //ツールチップの選択
  const start_tip = sel_pos.direction === 'vertical' ? __('upper alignment', 'itmar_block_collections') : __('left alignment', 'itmar_block_collections');
  const end_tip = sel_pos.direction === 'vertical' ? __('lower alignment', 'itmar_block_collections') : __('right alignment', 'itmar_block_collections');

  //親要素がFlex又はGridコンテナか
  const [isContainer, setIsContainer] = useState(false);
  useEffect(() => {
    if (blockRef.current) {
      const element = blockRef.current;
      const parentElement = element.parentElement;
      const grandparentElement = parentElement?.parentElement;
      const computedStyle = getComputedStyle(grandparentElement);
      if (computedStyle.display === "flex" || computedStyle.display === "inline-flex" || computedStyle.display === "grid" || computedStyle.display === "inline-grid") {
        setIsContainer(true)
      }
    }
  }, []);

  //GridModalを開く
  const [isGridModalOpen, setIsGridModalOpen] = useState(false);
  const openGridModal = () => setIsGridModalOpen(true);
  const closeGridModal = () => setIsGridModalOpen(false);


  return (
    <>
      <PanelBody
        title={__("Block placement", 'itmar_block_collections')}
        initialOpen={false}
        className='itmar_group_direction'
      >
        {isMobile ?
          <p>{__('InnerBlock direction(Mobile)', 'itmar_block_collections')}</p>
          :
          <p>{__('InnerBlock direction(DeskTop)', 'itmar_block_collections')}</p>
        }

        <ToolbarGroup>
          <ToolbarItem>
            {(itemProps) => (
              <Button {...itemProps}
                isPressed={sel_pos.direction === 'block'}
                onClick={() => props.onDirectionChange('block')}
                icon={group}
                label={__('block', 'itmar_block_collections')}
              />

            )}
          </ToolbarItem>
          <ToolbarItem>
            {(itemProps) => (
              <Button {...itemProps}
                isPressed={sel_pos.direction === 'vertical'}
                onClick={() => props.onDirectionChange('vertical')}
                icon={stack}
                label={__('virtical', 'itmar_block_collections')}
              />
            )}
          </ToolbarItem>
          <ToolbarItem>
            {(itemProps) => (
              <Button {...itemProps}
                isPressed={sel_pos.direction === 'horizen'}
                onClick={() => props.onDirectionChange('horizen')}
                icon={flex}
                label={__('horizen', 'itmar_block_collections')}
              />
            )}
          </ToolbarItem>
          <ToolbarItem>
            {(itemProps) => (
              <Button {...itemProps}
                isPressed={sel_pos.direction === 'grid'}
                onClick={() => props.onDirectionChange('grid')}
                icon={layout}
                label={__('grid', 'itmar_block_collections')}
              />
            )}
          </ToolbarItem>
        </ToolbarGroup>
        {(sel_pos.direction !== 'block' && sel_pos.direction !== 'grid') &&
          <>
            {isMobile ?
              <p>{__('InnerBlock alignment(Mobile)', 'itmar_block_collections')}</p>
              :
              <p>{__('InnerBlock alignment(DeskTop)', 'itmar_block_collections')}</p>
            }
            <ToolbarGroup>
              <ToolbarItem>
                {(itemProps) => (
                  <Button {...itemProps}
                    isPressed={sel_pos.inner_align === 'flex-start'}
                    onClick={() => props.onFlexChange('flex-start')}//親コンポーネントに通知
                    icon={start_icon}
                    label={start_tip}
                  />

                )}
              </ToolbarItem>
              <ToolbarItem>
                {(itemProps) => (
                  <Button {...itemProps}
                    isPressed={sel_pos.inner_align === 'center'}
                    onClick={() => props.onFlexChange('center')}//親コンポーネントに通知
                    icon={center_icon}
                    label={__('center alignment', 'itmar_block_collections')}
                  />
                )}
              </ToolbarItem>
              <ToolbarItem>
                {(itemProps) => (
                  <Button {...itemProps}
                    isPressed={sel_pos.inner_align === 'flex-end'}
                    onClick={() => props.onFlexChange('flex-end')}//親コンポーネントに通知
                    icon={end_icon}
                    label={end_tip}
                  />
                )}
              </ToolbarItem>
              <ToolbarItem>
                {(itemProps) => (
                  <Button {...itemProps}
                    isPressed={sel_pos.inner_align === 'space-between'}
                    onClick={() => props.onFlexChange('space-between')}//親コンポーネントに通知
                    icon={between_icon}
                    label={__('beteen stretch', 'itmar_block_collections')}
                  />

                )}
              </ToolbarItem>
              <ToolbarItem>
                {(itemProps) => (
                  <Button {...itemProps}
                    isPressed={sel_pos.inner_align === 'space-around'}
                    onClick={() => props.onFlexChange('space-around')}//親コンポーネントに通知
                    icon={around_icon}
                    label={__('around stretch', 'itmar_block_collections')}
                  />

                )}
              </ToolbarItem>
            </ToolbarGroup>
          </>
        }

        {!isContainer && (
          isMobile ?
            <p>{__('Block horizen alignment(Mobile)', 'itmar_block_collections')}</p>
            :
            <p>{__('Block horizen alignment(DeskTop)', 'itmar_block_collections')}</p>
        )}

        {!isContainer &&
          <ToolbarGroup>
            <ToolbarItem>
              {(itemProps) => (
                <Button {...itemProps}
                  isPressed={sel_pos.outer_align === 'left'}
                  onClick={() => props.onAlignChange('left')}
                  icon={justifyLeft}
                  label={__('left alignment', 'itmar_block_collections')}
                />

              )}
            </ToolbarItem>
            <ToolbarItem>
              {(itemProps) => (
                <Button {...itemProps}
                  isPressed={sel_pos.outer_align === 'center'}
                  onClick={() => props.onAlignChange('center')}
                  icon={justifyCenter}
                  label={__('center alignment', 'itmar_block_collections')}
                />
              )}
            </ToolbarItem>
            <ToolbarItem>
              {(itemProps) => (
                <Button {...itemProps}
                  isPressed={sel_pos.outer_align === 'right'}
                  onClick={() => props.onAlignChange('right')}
                  icon={justifyRight}
                  label={__('right alignment', 'itmar_block_collections')}
                />
              )}
            </ToolbarItem>

          </ToolbarGroup>
        }
        {isContainer &&
          <>
            {isMobile ?
              <p>{__('Block vertical alignment(Mobile)', 'itmar_block_collections')}</p>
              :
              <p>{__('Block vertical alignment(DeskTop)', 'itmar_block_collections')}</p>
            }

            <ToolbarGroup>
              <ToolbarItem>
                {(itemProps) => (
                  <Button {...itemProps}
                    isPressed={sel_pos.outer_vertical === 'self-start'}
                    onClick={() => props.onVerticalChange('self-start')}
                    icon={upper}
                    label={__('upper alignment', 'itmar_block_collections')}
                  />

                )}
              </ToolbarItem>
              <ToolbarItem>
                {(itemProps) => (
                  <Button {...itemProps}
                    isPressed={sel_pos.outer_vertical === 'center'}
                    onClick={() => props.onVerticalChange('center')}
                    icon={middle}
                    label={__('center alignment', 'itmar_block_collections')}
                  />
                )}
              </ToolbarItem>
              <ToolbarItem>
                {(itemProps) => (
                  <Button {...itemProps}
                    isPressed={sel_pos.outer_vertical === 'self-end'}
                    onClick={() => props.onVerticalChange('self-end')}
                    icon={lower}
                    label={__('lower alignment', 'itmar_block_collections')}
                  />
                )}
              </ToolbarItem>

            </ToolbarGroup>
          </>
        }
        {isMobile ?
          <p>{__('Block Width(Mobile)', 'itmar_block_collections')}</p>
          :
          <p>{__('Block Width(DeskTop)', 'itmar_block_collections')}</p>
        }
        <ToolbarGroup>
          <ToolbarItem>
            {(itemProps) => (
              <Button {...itemProps}
                isPressed={sel_pos.width_val === 'fit'}
                onClick={() => props.onWidthChange('fit')}
                text={__('fit', 'itmar_block_collections')}
              />

            )}
          </ToolbarItem>
          <ToolbarItem>
            {(itemProps) => (
              <Button {...itemProps}
                isPressed={sel_pos.width_val === 'wideSize'}
                onClick={() => props.onWidthChange('wideSize')}
                text={__('wide', 'itmar_block_collections')}
              />

            )}
          </ToolbarItem>
          <ToolbarItem>
            {(itemProps) => (
              <Button {...itemProps}
                isPressed={sel_pos.width_val === 'contentSize'}
                onClick={() => props.onWidthChange('contentSize')}
                text={__('content', 'itmar_block_collections')}
              />

            )}
          </ToolbarItem>
          <ToolbarItem>
            {(itemProps) => (
              <Button {...itemProps}
                isPressed={sel_pos.width_val === 'free'}
                onClick={() => props.onWidthChange('free')}
                text={__('free', 'itmar_block_collections')}
              />

            )}
          </ToolbarItem>

        </ToolbarGroup>
        {sel_pos.width_val === 'free' &&
          <RangeControl
            value={sel_pos.free_val}
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
        {sel_pos.direction === 'grid' &&
          <>
            {isMobile ?
              <p>{__('Grid Info settings(Mobile)', 'itmar_block_collections')}</p>
              :
              <p>{__('Grid Info settings(DeskTop)', 'itmar_block_collections')}</p>
            }
            <Button variant="primary" onClick={openGridModal}>
              {__("Open Setting Modal", 'itmar_block_collections')}
            </Button>
            {isGridModalOpen && (
              <Modal title="Grid Info settings" onRequestClose={closeGridModal}>
                <GridControls
                  attributes={sel_pos.grid_info}
                  clientId={clientId}
                  onChange={(newValue) => {
                    props.onGridChange(newValue)
                  }}
                />
              </Modal>
            )}
          </>
        }
      </PanelBody >

    </>
  );
}