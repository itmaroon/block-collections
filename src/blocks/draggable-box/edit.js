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

import './editor.scss';
import DraggableBox from '../DraggableBox';

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
		is_moveable,
		is_mobile_vertical,
		width_val
	} = attributes;

	const {
		position,
		unit_x,
		unit_y
	} = attributes;

	//インナーブロックの並び
	const innerBlock_direction = direction === 'horizen' ? { display: 'flex' }
		: direction === 'vertical' ? { display: 'flex', flexDirection: 'column' }
			: { display: 'block' };

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

	const innerBlocksProps = useInnerBlocksProps(
		//モバイル時の配置のためのクラスを付加
		{ style: innerBlock_style, className: is_mobile_vertical ? 'movile_vertical' : '' },
		{
			templateLock: false
		}
	);

	//インスペクター内のコントロールからの操作
	//横移動
	const chagePositionX = (value) => {
		if (value === "") {
			const newPos = { ...position, x: 0 }
			setAttributes({ position: newPos });
		} else {
			const unit_value = value.match(/(-*[0-9]+)([^0-9]+)/);
			const newPos = { ...position, x: parseInt(unit_value[1]) };
			setAttributes({ position: newPos });
			setAttributes({ unit_x: unit_value[2] });
		}
	}
	//縦移動
	const chagePositionY = (value) => {
		if (value === "") {
			const newPos = { ...position, y: 0 }
			setAttributes({ position: newPos });
		} else {
			const unit_value = value.match(/(-*[0-9]+)([^0-9]+)/);
			const newPos = { ...position, y: parseInt(unit_value[1]) };
			setAttributes({ position: newPos });
			setAttributes({ unit_y: unit_value[2] });
		}
	}
	//リセット
	const resetPos = () => {
		const newPos = { "x": 0, "y": 0 };
		setAttributes({ position: newPos });
		setAttributes({ unit_x: 'px', unit_y: 'px' });
	}

	//移動後の位置
	const movePosition = { x: `${position.x}${unit_x}`, y: `${position.y}${unit_y}` }
	//ブロック幅
	const width_style =
		width_val === 'wideSize' ? { width: '100%', maxWidth: 'var(--wp--style--global--wide-size)' }
			: width_val === 'contentSize' ? { width: '100%', maxWidth: 'var(--wp--style--global--content-size)' }
				: { width: 'fit-content' };

	//ブロックの配置
	const block_align = outer_align === 'center' ? { margin: '0 auto' }
		: outer_align === 'right' ? { marginLeft: 'auto' }
			: {};
	const newStyle = {
		style: {
			...width_style,
			...block_align,
			...(is_moveable ? { transform: `translate(${position.x}px, ${position.y}px)` } : {})
		}
	}

	return (
		<>
			<InspectorControls group="settings">
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
											onClick={() => setAttributes({ inner_align: 'flex-start' })}
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
					{is_moveable &&
						<>
							<PanelRow
								className='distance_row'
							>
								<UnitControl
									dragDirection="e"
									onChange={(value) => chagePositionX(value)}
									label={__("Lateral direction", 'itmar_block_collections')}
									value={movePosition.x}
								/>
								<UnitControl
									dragDirection="e"
									onChange={(value) => chagePositionY(value)}
									label={__("Longitudinal direction", 'itmar_block_collections')}
									value={movePosition.y}
								/>
							</PanelRow>
							<PanelRow
								className='reset_row'
							>
								<Button
									variant="secondary"
									onClick={() => resetPos()}
								>
									{__("Reset", 'itmar_block_collections')}
								</Button>
							</PanelRow>
						</>
					}
				</PanelBody>

			</InspectorControls>
			<div {...useBlockProps(newStyle)}>
				{is_moveable ?
					(<DraggableBox
						position={position}
						onPositionChange={(position) => setAttributes({ position: position })}
					>
						<div {...innerBlocksProps}></div>
					</DraggableBox>)
					: (<div {...innerBlocksProps}></div>)
				}

			</div>
		</>
	);
}