
import { __ } from '@wordpress/i18n';
import './editor.scss';
import { StyleComp } from './StyleGroup';
import ToggleElement from './ToggleElement';
import { useStyleIframe } from '../iframeFooks';
import ShadowStyle, { ShadowElm } from '../ShadowStyle';
import DraggableBox, { useDraggingMove } from '../DraggableBox';
import BlockPlace from '../BlockPlace';
import { useElementBackgroundColor, useIsIframeMobile } from '../CustomFooks'
import { useSelect, dispatch } from '@wordpress/data';

import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls
} from '@wordpress/block-editor';

import {
	PanelBody,
	ToggleControl,
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';

import { useEffect, useRef, useState } from '@wordpress/element';

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

//単位のリセットバリュー
const units = [
	{ value: 'px', label: 'px' },
	{ value: 'em', label: 'em' },
	{ value: 'rem', label: 'rem' },
];

function checkInnerGroupBlocks(blocks) {
	for (const block of blocks) {
		// itmar/design-group ブロックで is_menu が true の場合
		if (block.name === 'itmar/design-group' && block.attributes.is_menu === true) {
			return true;
		}

		// インナーブロックがある場合、それらもチェック
		if (block.innerBlocks && block.innerBlocks.length > 0) {
			if (checkInnerGroupBlocks(block.innerBlocks)) {
				return true;
			}
		}
	}
	return false;
}

function checkSubmenuBlocks(blocks) {
	for (const block of blocks) {
		// itmar/design-title ブロックで linkKind が submenu の場合
		if (block.name === 'itmar/design-title' && block.attributes.linkKind === 'submenu') {
			return true;
		}
	}
	return false;
}

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		default_pos,
		mobile_pos,
		shadow_element,
		is_shadow,
		is_moveable,
		position,
		is_menu,
		is_submenu,
		is_swiper
	} = attributes;

	//モバイルの判定
	const isMobile = useIsIframeMobile();

	//ブロックの参照
	const blockRef = useRef(null);

	//ハンバーガーボタンのクリックによるイベントハンドラ(クラス名の付加)
	const [isMenuOpen, setIsmenuOpen] = useState(false);
	const handleHambergerToggle = (isOpen) => {
		setIsmenuOpen(isOpen)
	}

	//blockPropsの参照
	const blockProps = useBlockProps({
		ref: blockRef,// ここで参照を blockProps に渡しています
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

	//ブロックアイテム（インナーブロック）
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'group_contents' },
		{
			templateLock: false
		}
	);
	//移動可能ブロックならドラッグのカスタムフックを付加
	const handlePositionChange = (newPosition) => {
		setAttributes({ position: newPosition })
	};
	useDraggingMove(is_moveable, blockRef, position, handlePositionChange);

	//ブロックの監視（メニューに設定されているitmar/design-groupが存在するかのチェック
	const isMenuBlockPresent = useSelect((select) => {
		const blocks = select('core/block-editor').getBlocks();
		return checkInnerGroupBlocks(blocks);
	}, []);

	//ブロックの監視（サブメニューをもつデザインタイトルが含まれるか)
	const isSubmenuInclude = useSelect((select) => {
		// ブロックエディタから現在のブロックの子ブロックを取得
		const { getBlocksByClientId } = select('core/block-editor');
		const innerBlocks = getBlocksByClientId(clientId)[0]?.innerBlocks;
		// 子ブロックをチェックする関数を呼び出し
		return checkSubmenuBlocks(innerBlocks);
	}, [clientId]);

	useEffect(() => {
		setAttributes({ has_submenu: isSubmenuInclude })
	}, [isSubmenuInclude]);

	return (
		<>
			{/* インスペクター領域内 */}
			<InspectorControls group="settings">
				<PanelBody title={__("Menu or Group", 'itmar_block_collections')} initialOpen={true} className="form_design_ctrl">
					<ToggleControl
						label={__('Is Menu', 'itmar_block_collections')}
						checked={is_menu}
						onChange={(newVal) => {
							if (!isMenuBlockPresent) {
								setAttributes({ is_menu: newVal })
							} else {
								dispatch('core/notices').createNotice(
									'error',
									__('Only one group can be placed as a menu on each page.', 'itmar_guest_contact_block'),
									{ type: 'snackbar', isDismissible: true, }
								);
							}

						}}
					/>
				</PanelBody>

			</InspectorControls>
			<InspectorControls group="styles">
				<BlockPlace
					attributes={attributes}
					clientId={clientId}
					blockRef={blockRef}
					isMobile={isMobile}
					isSubmenu={is_submenu}
					onDirectionChange={(position) => {
						if (!isMobile) {
							setAttributes({ default_pos: { ...default_pos, direction: position } });
						} else {
							setAttributes({ mobile_pos: { ...mobile_pos, direction: position } });
						}
					}}
					onFlexChange={(position) => {
						if (!isMobile) {
							setAttributes({ default_pos: { ...default_pos, inner_align: position } });
						} else {
							setAttributes({ mobile_pos: { ...mobile_pos, inner_align: position } });
						}
					}}
					onAlignChange={(position) => {
						if (!isMobile) {
							setAttributes({ default_pos: { ...default_pos, outer_align: position } });
						} else {
							setAttributes({ mobile_pos: { ...mobile_pos, outer_align: position } });
						}
					}}
					onVerticalChange={(position) => {
						if (!isMobile) {
							setAttributes({ default_pos: { ...default_pos, outer_vertical: position } });
						} else {
							setAttributes({ mobile_pos: { ...mobile_pos, outer_vertical: position } });
						}
					}}
					onWidthChange={(position) => {
						if (!isMobile) {
							setAttributes({ default_pos: { ...default_pos, width_val: position } });
						} else {
							setAttributes({ mobile_pos: { ...mobile_pos, width_val: position } });
						}
					}}
					onFreevalChange={(value) => {
						if (!isMobile) {
							setAttributes({ default_pos: { ...default_pos, free_val: value } });
						} else {
							setAttributes({ mobile_pos: { ...mobile_pos, free_val: value } });
						}
					}}
					onGridChange={(value) => {
						if (!isMobile) {
							setAttributes({ default_pos: { ...default_pos, grid_info: value } });
						} else {
							setAttributes({ mobile_pos: { ...mobile_pos, grid_info: value } });
						}
					}}
				/>

				<PanelBody title={__("Content Style", 'itmar_block_collections')} initialOpen={false} className="form_design_ctrl">
					<BoxControl
						label={!isMobile ?
							__("Padding settings(desk top)", 'itmar_block_collections')
							: __("Padding settings(mobile)", 'itmar_block_collections')}
						values={!isMobile ? default_pos.padding_content : mobile_pos.padding_content}
						onChange={value => setAttributes(!isMobile ?
							{ default_pos: { ...default_pos, padding_content: value } }
							: { mobile_pos: { ...mobile_pos, padding_content: value } }
						)}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={!isMobile ? padding_resetValues : padding_mobile_resetValues}	// リセット時の値
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
							onChange={(newStyle, newState) => {
								setAttributes({ shadow_result: newStyle.style });
								setAttributes({ shadow_element: newState })
							}}
						/>
					}
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
						<DraggableBox
							attributes={attributes.position}
							onPositionChange={(position) => setAttributes({ position: position })}
						/>
					}

				</PanelBody>
			</InspectorControls>


			{/* ブロックエディタ領域内 */}

			{(is_menu && !is_submenu) &&
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

			<StyleComp
				attributes={attributes}
				isMenuOpen={isMenuOpen}
			>
				<div {...blockProps} >
					<div {...innerBlocksProps}></div>
				</div>
			</StyleComp >

		</>
	);
}
