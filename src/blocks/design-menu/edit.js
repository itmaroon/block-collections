
import { __ } from '@wordpress/i18n';
import './editor.scss';
import { StyleComp } from './StyleMenu';
import { useStyleIframe } from '../iframeFooks';
import ShadowStyle, { ShadowElm } from '../ShadowStyle';
import ToggleElement from './ToggleElement';
import DraggableBox from '../DraggableBox';
import BlockPlace from '../BlockPlace';
import { useElementBackgroundColor, useIsIframeMobile } from '../CustomFooks'

import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	__experimentalBorderRadiusControl as BorderRadiusControl
} from '@wordpress/block-editor';

import {
	PanelBody,
	PanelRow,
	ToggleControl,
	RangeControl,
	__experimentalBoxControl as BoxControl,
	__experimentalAlignmentMatrixControl as AlignmentMatrixControl
} from '@wordpress/components';

import { useSelect, useDispatch, dispatch } from '@wordpress/data';
import { useEffect, useState, useRef } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';

//スペースのリセットバリュー
const padding_resetValues = {
	top: '0px',
	left: '0px',
	right: '0px',
	bottom: '0px',
}
const padding_mobile_resetValues = {
	top: '20px',
	left: '10px',
	right: '10px',
	bottom: '20px',
}

//リセットバリュー
const units = [
	{ value: 'px', label: 'px' },
	{ value: 'em', label: 'em' },
	{ value: 'rem', label: 'rem' },
];

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		direction,
		mobile_direction,
		inner_align,
		outer_align,
		outer_vertical,
		width_val,
		free_val,
		shadow_element,
		grid_info,
		is_shadow,
		is_submenu,
		is_moveable,
		padding_menu,
		mobile_padding_menu,
		position,
		unit_x,
		unit_y,
	} = attributes;

	//モバイル表示の判定
	const isMoblie = useIsIframeMobile();

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
		//...top_margin,
		...(is_moveable ? { transform: `translate(${position.x}${unit_x}, ${position.y}${unit_y})` } : {})
	}

	//ブロックの参照
	const blockRef = useRef(null);

	//ハンバーガーボタンのクリックによるイベントハンドラ(クラス名の付加)
	const [isMenuOpen, setIsmenuOpen] = useState(false);
	const handleHambergerToggle = (isOpen) => {
		setIsmenuOpen(isOpen)
	}

	//ブロックの属性を生成
	const blockProps = useBlockProps({
		ref: blockRef,
		style: newStyle,
		className: `${isMenuOpen ? 'open' : ''} ${is_submenu ? 'sub_menu' : ''}`
	});

	//背景色の取得
	const baseColor = useElementBackgroundColor(blockRef, blockProps.style);
	//背景色変更によるシャドー属性の書き換え
	useEffect(() => {
		if (baseColor) {
			setAttributes({ shadow_element: { ...shadow_element, baseColor: baseColor } });
			const new_shadow = ShadowElm({ ...shadow_element, baseColor: baseColor });
			if (new_shadow) { setAttributes({ shadow_result: new_shadow.style }); }

		}
	}, [baseColor]);


	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);

	//インナーブロックの監視
	const blocks = useSelect(select => select('core/block-editor').getBlocks(clientId), [clientId]);

	//メニューアイテム（インナーブロック）
	const TEMPLATE = [
		['itmar/design-title', {}]
	]
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'menu_contents', style: { justifyContent: inner_align } },
		{
			allowedBlocks: ['itmar/design-title', 'core/image'],
			template: TEMPLATE,
			templateLock: false
		}
	);

	//イメージブロック
	const { insertBlocks, removeBlock } = useDispatch('core/block-editor');

	useEffect(() => {//イメージの挿入・削除

		if ((direction === 'grid' || mobile_direction === 'grid') && grid_info.is_image) {
			const imageBlock = createBlock('core/image', {});
			insertBlocks(imageBlock, 0, clientId);  // insert new block at the first position
		}
		if (((direction === 'grid' || mobile_direction === 'grid') && !grid_info.is_image) || (direction !== 'grid' && mobile_direction !== 'grid')) {
			const imageBlockClientIds = blocks
				.filter(block => block.name === 'core/image')
				.map(block => block.clientId);

			// core/image ブロックを削除
			imageBlockClientIds.forEach(id => {
				removeBlock(id);
			});
		}

	}, [direction, mobile_direction, grid_info.is_image]);

	useEffect(() => {//イメージはグリッドでかつ１つだけ
		//このタイミングでブロック属性に記録
		setAttributes({ blockNum: blocks.length });

		if (direction !== 'grid' && mobile_direction !== 'grid') {//グリッドスタイル以外は消す
			const imageBlockClientIds = blocks
				.filter(block => block.name === 'core/image')
				.map(block => block.clientId);
			if (imageBlockClientIds.length > 0) {
				dispatch('core/notices').createNotice(
					'error',
					__("Images cannot be included in anything other than grid style.", 'itmar_block_collections'),
					{ type: 'snackbar' }
				);
				// core/image ブロックを削除
				imageBlockClientIds.forEach(id => {
					removeBlock(id);
				});

			}

		}
		if (direction === 'grid' || mobile_direction === 'grid') {//２つ以上にはしない
			const imageBlockClientIds = blocks
				.filter(block => block.name === 'core/image')
				.map(block => block.clientId);
			if (imageBlockClientIds.length > 1) {
				dispatch('core/notices').createNotice(
					'error',
					__("Only one image can be inserted.", 'itmar_block_collections'),
					{ type: 'snackbar' }
				);
				// core/image ブロックを削除
				removeBlock(imageBlockClientIds[1]);
			} else if (imageBlockClientIds.length === 1) {//１つならフラグを上げる
				const newVal = { ...grid_info, is_image: true }
				setAttributes({ grid_info: newVal })

			} else if (imageBlockClientIds.length === 0) {//0ならフラグを下げる
				const newVal = { ...grid_info, is_image: false }
				setAttributes({ grid_info: newVal })
			}
		}

	}, [blocks]);

	return (
		<>
			<InspectorControls group="styles">
				<BlockPlace
					attributes={attributes}
					blockRef={blockRef}
					onDirectionChange={(position) => {
						if (isMoblie) {
							setAttributes({ mobile_direction: position });
						} else {
							setAttributes({ direction: position });
						}
					}}
					onFlexChange={(position) => setAttributes({ inner_align: position })}
					onAlignChange={(position) => setAttributes({ outer_align: position })}
					onVerticalChange={(position) => setAttributes({ outer_vertical: position })}
					onWidthChange={(position) => setAttributes({ width_val: position })}
					onFreevalChange={(value) => setAttributes({ free_val: value })}
					isMobile={isMoblie}
				/>
				<PanelBody title={__("Menu Style", 'itmar_block_collections')} initialOpen={false} className="form_design_ctrl">
					{!isMoblie ?
						<BoxControl
							label={__("Padding settings(desk top)", 'itmar_block_collections')}
							values={padding_menu}
							onChange={value => setAttributes({ padding_menu: value })}
							units={units}	// 許可する単位
							allowReset={true}	// リセットの可否
							resetValues={padding_resetValues}	// リセット時の値

						/>
						:
						<BoxControl
							label={__("Padding settings(mobile)", 'itmar_block_collections')}
							values={mobile_padding_menu}
							onChange={value => setAttributes({ mobile_padding_menu: value })}
							units={units}	// 許可する単位
							allowReset={true}	// リセットの可否
							resetValues={padding_mobile_resetValues}	// リセット時の値

						/>
					}

					<ToggleControl
						label={__('Is Shadow', 'itmar_block_collections')}
						checked={is_shadow}
						onChange={(newVal) => {
							setAttributes({ is_shadow: newVal })
						}}
					/>
					{is_shadow &&
						<ShadowStyle
							shadowStyle={{ ...shadow_element }}
							onChange={(newStyle, newState) => {
								setAttributes({ shadow_result: newStyle.style });
								setAttributes({ shadow_element: newState })
							}}
						/>
					}
				</PanelBody>
				{(!isMoblie && direction === 'grid' || isMoblie && mobile_direction === 'grid') &&
					<PanelBody title={__("Grid Info settings", 'itmar_block_collections')} initialOpen={false} className="form_design_ctrl">

						<RangeControl
							value={grid_info.col_num}
							label={__("Number of Columns", 'itmar_block_collections')}
							max={6}
							min={1}
							onChange={(val) => {
								const newVal = { ...grid_info, col_num: val }
								setAttributes({ grid_info: newVal })
							}}
							withInputField={true}
						/>
						<ToggleControl
							label={__('Is Image', 'itmar_block_collections')}
							checked={grid_info.is_image}
							onChange={(val) => {
								const newVal = { ...grid_info, is_image: val }
								setAttributes({ grid_info: newVal })
							}}
						/>
						{grid_info.is_image &&
							<PanelBody title={__("Image Settings", 'itmar_block_collections')} initialOpen={false} className="border_design_ctrl">

								<BoxControl
									label={__("Image Padding settings", 'itmar_block_collections')}
									values={grid_info.image_padding}
									onChange={val => {
										const newVal = { ...grid_info, image_padding: val }
										setAttributes({ grid_info: newVal })
									}}
									units={units}	// 許可する単位
									allowReset={true}	// リセットの可否
									resetValues={padding_resetValues}	// リセット時の値

								/>
								<PanelRow className='imgPos_row'>
									<label>{__("Image Alignment", 'itmar_block_collections')}</label>
									<AlignmentMatrixControl
										value={grid_info.image_pos}
										onChange={(newValue) => {
											const newVal = { ...grid_info, image_pos: newValue }
											setAttributes({ grid_info: newVal })
										}}
									/>
								</PanelRow>
								<PanelBody title={__("Border Settings", 'itmar_block_collections')} initialOpen={false} className="border_design_ctrl">
									<BorderRadiusControl
										values={grid_info.image_radius}
										onChange={(newBrVal) => {
											const setVal = typeof newBrVal === 'string' ? { "value": newBrVal } : newBrVal
											const newVal = { ...grid_info, image_radius: setVal }
											setAttributes({ grid_info: newVal })
										}}
									/>
								</PanelBody>
								<RangeControl
									value={grid_info.image_blur}
									label={__("Blur", 'itmar_block_collections')}
									max={6}
									min={0}
									onChange={(val) => {
										const newVal = { ...grid_info, image_blur: val }
										setAttributes({ grid_info: newVal })
									}}
									withInputField={true}
								/>
							</PanelBody>
						}
					</PanelBody>
				}

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

			{!is_submenu &&
				<>
					<ToggleElement
						onToggle={handleHambergerToggle}
						className='itmar_hamberger_btn'
						openFlg={isMenuOpen}
					>
						<span></span>
						<span></span>
						<span></span>
					</ToggleElement>
					<ToggleElement
						onToggle={handleHambergerToggle}
						openFlg={isMenuOpen}
						className='itmar_back_ground'
					/>
				</>
			}

			{/* ブロックエディタ領域内 */}

			{is_moveable ?
				(<DraggableBox
					attributes={attributes}
					onPositionChange={(position, unit) => setAttributes({ position: position, unit_x: unit.unit_x, unit_y: unit.unit_y })}
				>
					<div {...blockProps} >
						<StyleComp
							attributes={attributes}
						>
							<div {...innerBlocksProps}></div>
						</StyleComp>
					</div>
				</DraggableBox>)
				: (
					<div {...blockProps} >
						<StyleComp
							attributes={attributes}
						>
							<div {...innerBlocksProps}></div>
						</StyleComp>
					</div>

				)
			}

		</>
	);
}
