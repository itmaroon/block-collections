
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';


export default function save({ attributes }) {
	const {
		position,
		direction,
		is_mobile_vertical,
		inner_align,
		outer_align,
		width_val,
		is_moveable
	} = attributes;

	//ブロック幅
	const width_style =
		width_val === 'wideSize' ? { width: '100%', maxWidth: 'var(--wp--style--global--wide-size)' }
			: { width: 'fit-content' }
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

	const blockProps = useBlockProps.save(newStyle);

	//インナーブロックの並び
	const innerBlock_direction = direction === 'horizen' ? { display: 'flex' }
		: direction === 'vertical' ? { display: 'flex', flexDirection: 'column' }
			: { display: 'block' }
	//インナーブロックの配置を加える
	const innerBlock_style = {
		...innerBlock_direction,
		...{ justifyContent: inner_align }
	}

	return (
		<>
			<div {...blockProps}>
				<div className={is_mobile_vertical ? 'movile_vertical' : ''} style={innerBlock_style}>
					<InnerBlocks.Content />
				</div>
			</div>
		</>
	)
}