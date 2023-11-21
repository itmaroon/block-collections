
import { __ } from '@wordpress/i18n';
import './editor.scss';
import { StyleComp } from './StyleGroup';
import { useStyleIframe } from '../iframeFooks';
import ShadowStyle, { ShadowElm } from '../ShadowStyle';
import DraggableBox, { useDraggingMove } from '../DraggableBox';
import BlockPlace from '../BlockPlace';
import { useElementBackgroundColor, useIsIframeMobile } from '../CustomFooks'

import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls
} from '@wordpress/block-editor';

import {
	PanelBody,
	ToggleControl,
	RangeControl,
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';

import { useEffect, useRef } from '@wordpress/element';

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

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const {
		default_pos,
		mobile_pos,
		shadow_element,
		is_shadow,
		is_moveable,
		position
	} = attributes;

	//モバイルの判定
	const isMobile = useIsIframeMobile();

	//ブロックの参照
	const blockRef = useRef(null);

	//blockPropsの参照
	const blockProps = useBlockProps({
		ref: blockRef
	});// ここで参照を blockProps に渡しています


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

	return (
		<>
			{/* インスペクター領域内 */}
			<InspectorControls group="styles">
				<BlockPlace
					attributes={attributes}
					clientId={clientId}
					blockRef={blockRef}
					isMobile={isMobile}
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

			<StyleComp attributes={attributes}>
				<div {...blockProps} >
					<div {...innerBlocksProps}></div>
				</div>
			</StyleComp>

		</>
	);
}
