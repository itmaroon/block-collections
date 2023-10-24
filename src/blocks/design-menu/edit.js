
import { __ } from '@wordpress/i18n';
import './editor.scss';
import { StyleComp } from './StyleMenu';
import { useStyleIframe } from '../iframeFooks';
import ShadowStyle from '../ShadowStyle';
import ToggleElement from './ToggleElement';
import { useIsMobile } from '../CustomFooks';

import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalBorderRadiusControl as BorderRadiusControl
} from '@wordpress/block-editor';

import {
	PanelBody,
	PanelRow,
	ToggleControl,
	RangeControl,
	__experimentalBoxControl as BoxControl,
	__experimentalBorderBoxControl as BorderBoxControl,
	__experimentalAlignmentMatrixControl as AlignmentMatrixControl
} from '@wordpress/components';

import { useSelect, useDispatch, dispatch } from '@wordpress/data';
import { useEffect, useState, useRef } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';

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

export default function Edit({ attributes, setAttributes, clientId }) {

	const {
		radius_val,
		border_val,
		shadow_element,
		grid_info,
		is_shadow,
		is_submenu,
		className
	} = attributes;

	//ブロックの参照
	const blockRef = useRef(null);

	//ハンバーガーボタンのクリックによるイベントハンドラ(クラス名の付加)
	const [isMenuOpen, setIsmenuOpen] = useState(false);
	const handleHambergerToggle = (isOpen) => {
		setIsmenuOpen(isOpen)
	}

	//ブロック属性の追加
	const top_margin = useIsMobile() ? { top: '9%' } : {};

	//ブロックの属性を生成
	const blockProps = useBlockProps({
		ref: blockRef,// ここで参照を blockProps に渡しています
		style: { ...top_margin },
		className: `${isMenuOpen ? 'open' : ''} ${is_submenu ? 'sub_menu' : ''}`
	});

	//サイトエディタの場合はiframeにスタイルをわたす。
	useStyleIframe(StyleComp, attributes);

	//インナーブロックの監視
	const blocks = useSelect(select => select('core/block-editor').getBlocks(clientId), [clientId]);

	//メニューアイテム（インナーブロック）
	const TEMPLATE = [
		['itmar/design-title', {}]
	]
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'menu_contents' },
		{
			allowedBlocks: ['itmar/design-title', 'core/image'],
			template: TEMPLATE,
			templateLock: false
		}
	);

	//イメージブロック
	const { insertBlocks, removeBlock } = useDispatch('core/block-editor');

	useEffect(() => {//イメージの挿入・削除

		if (className === 'is-style-grid' && grid_info.is_image) {
			const imageBlock = createBlock('core/image', {});
			insertBlocks(imageBlock, 0, clientId);  // insert new block at the first position
		}
		if ((className === 'is-style-grid' && !grid_info.is_image) || (className !== 'is-style-grid')) {
			const imageBlockClientIds = blocks
				.filter(block => block.name === 'core/image')
				.map(block => block.clientId);

			// core/image ブロックを削除
			imageBlockClientIds.forEach(id => {
				removeBlock(id);
			});
		}

	}, [className, grid_info.is_image]);

	useEffect(() => {//イメージはグリッドでかつ１つだけ
		//このタイミングでブロック属性に記録
		setAttributes({ blockNum: blocks.length });

		if (className !== 'is-style-grid') {//グリッドスタイル以外は消す
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
		if (className === 'is-style-grid') {//２つ以上にはしない
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
				<PanelBody title={__("Border Settings", 'itmar_block_collections')} initialOpen={false} className="border_design_ctrl">
					<BorderBoxControl

						onChange={(newValue) => setAttributes({ border_val: newValue })}
						value={border_val}
						allowReset={true}	// リセットの可否
						resetValues={border_resetValues}	// リセット時の値
					/>
					<BorderRadiusControl
						values={radius_val}
						onChange={(newBrVal) =>
							setAttributes({ radius_val: typeof newBrVal === 'string' ? { "value": newBrVal } : newBrVal })}
					/>
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
							blockRef={blockRef}
							onChange={(newStyle, newState) => {
								setAttributes({ shadow_result: newStyle.style });
								setAttributes({ shadow_element: newState })
							}}
						/>
					}

				</PanelBody>
				{className === 'is-style-grid' &&
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
			<StyleComp attributes={attributes} >
				<div {...blockProps} >
					<div {...innerBlocksProps}></div>
				</div>
			</StyleComp>

		</>
	);
}
