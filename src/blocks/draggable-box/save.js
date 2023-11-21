
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';


export default function save({ attributes }) {
	const {
		direction,
		inner_align,
		outer_align,
		outer_vertical,
		width_val,
		is_moveable,
		free_val,
		position,
		unit_x,
		unit_y
	} = attributes;

	//ブロック幅
	const width_style =
		width_val === 'wideSize' ? { width: '100%', maxWidth: 'var(--wp--style--global--wide-size)' }
			: width_val === 'free' ? { width: '100%', maxWidth: free_val }
				: { width: 'fit-content' }
	//ブロックの配置
	const block_align = outer_align === 'center' ? { margin: '0 auto' }
		: outer_align === 'right' ? { marginLeft: 'auto' }
			: { marginRight: 'auto' };

	const newStyle = {
		style: {
			...width_style,
			...block_align,
			...{ alignSelf: outer_vertical },
			...(is_moveable ? { transform: `translate(${position.x}${unit_x}, ${position.y}${unit_y})` } : {})
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
				<div style={innerBlock_style}>
					<InnerBlocks.Content />
				</div>
			</div>
		</>
	)
}