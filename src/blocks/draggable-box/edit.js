import { __ } from '@wordpress/i18n';
import { useRef } from '@wordpress/element';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls
} from '@wordpress/block-editor';

import {
	Button,
	PanelBody,
	Icon,
	ToolbarGroup,
	ToolbarItem,
	ToggleControl
} from '@wordpress/components';
import { group, stack } from '@wordpress/icons';

import './editor.scss';
import DraggableBox from '../DraggableBox';
import BlockPlace from '../BlockPlace';

//横並びのアイコン
const flex = <Icon icon={stack} className="rotate-icon" />

export default function Edit(props) {

	//ブロック属性の読み込み
	const {
		attributes,
		setAttributes
	} = props;
	const {
		direction,
		inner_align,
		outer_align,
		outer_vertical,
		is_moveable,
		is_mobile_vertical,
		width_val,
		free_val,
		position,
		unit_x,
		unit_y
	} = attributes;

	//インナーブロックの並び
	const innerBlock_direction = direction === 'horizen' ? { display: 'flex' }
		: direction === 'vertical' ? { display: 'flex', flexDirection: 'column' }
			: { display: 'block' };

	//インナーブロックの配置を加える
	const innerBlock_style = {
		...innerBlock_direction,
		...{ justifyContent: inner_align }
	}

	const innerBlocksProps = useInnerBlocksProps(
		//モバイル時の配置のためのクラスを付加
		{ style: innerBlock_style, className: is_mobile_vertical ? 'movile_vertical' : '' },
		{
			templateLock: false
		}
	);


	//ブロック幅
	const width_style =
		width_val === 'wideSize' ? { width: '100%', maxWidth: 'var(--wp--style--global--wide-size)' }
			: width_val === 'contentSize' ? { width: '100%', maxWidth: 'var(--wp--style--global--content-size)' }
				: width_val === 'free' ? { width: '100%', maxWidth: free_val }
					: { width: 'fit-content' };

	//ブロックの配置
	const block_align = outer_align === 'center' ? { margin: '0 auto' }
		: outer_align === 'right' ? { marginLeft: 'auto' }
			: { marginRight: 'auto' };


	const newStyle = {
		...width_style,
		...block_align,
		...{ alignSelf: outer_vertical },
		...(is_moveable ? { transform: `translate(${position.x}${unit_x}, ${position.y}${unit_y})` } : {})
	}

	//ブロックの参照
	const blockRef = useRef(null);

	const blockProps = useBlockProps({
		ref: blockRef,// ここで参照を blockProps に渡しています
		style: newStyle
	});


	return (
		<>
			<InspectorControls group="styles">
				<PanelBody
					title={__("Direction of lining up", 'itmar_block_collections')}
					initialOpen={true}
					className='itmar_group_direction'
				>
					<ToolbarGroup>
						<ToolbarItem>
							{(itemProps) => (
								<Button {...itemProps}
									isPressed={direction === 'block'}
									onClick={() => setAttributes({ direction: 'block' })}
									icon={group}
									label={__('block', 'itmar_block_collections')}
								/>

							)}
						</ToolbarItem>
						<ToolbarItem>
							{(itemProps) => (
								<Button {...itemProps}
									isPressed={direction === 'vertical'}
									onClick={() => setAttributes({ direction: 'vertical' })}
									icon={stack}
									label={__('virtical', 'itmar_block_collections')}
								/>
							)}
						</ToolbarItem>
						<ToolbarItem>
							{(itemProps) => (
								<Button {...itemProps}
									isPressed={direction === 'horizen'}
									onClick={() => setAttributes({ direction: 'horizen' })}
									icon={flex}
									label={__('horizen', 'itmar_block_collections')}
								/>
							)}
						</ToolbarItem>
					</ToolbarGroup>
					<ToggleControl
						label={__('Vertical on mobile', 'itmar_block_collections')}
						checked={is_mobile_vertical}
						onChange={(newVal) => {
							setAttributes({ is_mobile_vertical: newVal })
						}}
					/>
				</PanelBody>
				<BlockPlace
					attributes={attributes}
					blockRef={blockRef}
					onFlexChange={(position) => setAttributes({ inner_align: position })}
					onAlignChange={(position) => setAttributes({ outer_align: position })}
					onVerticalChange={(position) => setAttributes({ outer_vertical: position })}
					onWidthChange={(position) => setAttributes({ width_val: position })}
					onFreevalChange={(value) => setAttributes({ free_val: value })}
				/>

				<PanelBody
					title={__("Position moveable", 'itmar_block_collections')}
					initialOpen={true}
				>
					<ToggleControl
						label={__('make it moveable', 'itmar_block_collections')}
						checked={is_moveable}
						onChange={(newVal) => {
							setAttributes({ is_moveable: newVal })
						}}
					/>

				</PanelBody>
			</InspectorControls>


			{is_moveable ?
				(<DraggableBox
					attributes={attributes}
					onPositionChange={(position, unit) => setAttributes({ position: position, unit_x: unit.unit_x, unit_y: unit.unit_y })}
				>
					<div {...blockProps}>
						<div {...innerBlocksProps}></div>
					</div>
				</DraggableBox>)
				: (
					<div {...blockProps}>
						<div {...innerBlocksProps}></div>
					</div>
				)
			}
		</>
	);
}