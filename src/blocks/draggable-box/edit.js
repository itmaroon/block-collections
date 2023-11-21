import { __ } from '@wordpress/i18n';
import { useRef } from '@wordpress/element';
import { StyleComp } from './StyleGroup';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls
} from '@wordpress/block-editor';

import {
	PanelBody,
	ToggleControl
} from '@wordpress/components';


import './editor.scss';
import DraggableBox from '../DraggableBox';
import BlockPlace from '../BlockPlace';
import { useIsIframeMobile } from '../CustomFooks'


export default function Edit(props) {

	//ブロック属性の読み込み
	const {
		attributes,
		setAttributes
	} = props;
	const {
		direction,
		mobile_direction,
		inner_align,
		outer_align,
		outer_vertical,
		is_moveable,
		width_val,
		free_val,
		position,
		unit_x,
		unit_y
	} = attributes;

	//モバイル表示の判定
	const isMoblie = useIsIframeMobile();

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
		{ style: innerBlock_style },
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
						<StyleComp
							attributes={attributes}
						>
							<div {...innerBlocksProps}></div>
						</StyleComp>
					</div>
				</DraggableBox>)
				: (
					<div {...blockProps}>
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