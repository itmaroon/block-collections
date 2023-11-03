import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { StyleComp } from './StyleMenu';

export default function save({ attributes }) {
	const {
		inner_align,
		outer_align,
		outer_vertical,
		width_val,
		free_val,
		is_submenu,
		is_moveable,
		position,
		unit_x,
		unit_y,
	} = attributes;

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
	//ブロックのスタイル
	const newStyle = {
		...width_style,
		...block_align,
		...{ alignSelf: outer_vertical },
		...(is_moveable ? { transform: `translate(${position.x}${unit_x}, ${position.y}${unit_y})` } : {})
	}

	//ブロックのスタイル適用とサブメニューの場合はクラスを付加
	const blockProps = useBlockProps.save({
		style: newStyle,
		className: `${is_submenu ? 'sub_menu' : ''}`
	});

	//styled-componentsのHTML化
	const sheet = new ServerStyleSheet();
	const html = renderToString(sheet.collectStyles(
		<StyleComp attributes={attributes} />
	));
	const styleTags = sheet.getStyleTags();
	// 正規表現で styled-components のクラス名を取得
	const classMatch = html.match(/class="([^"]+)"/);
	const className = classMatch ? classMatch[1] : "";

	return (
		<>
			{!is_submenu &&
				<>
					<div className="itmar_hamberger_btn">
						<span></span>
						<span></span>
						<span></span>
					</div>
					<div className='itmar_back_ground'></div>
				</>
			}

			<div {...blockProps}>
				<div className={className}>
					<div
						style={{ justifyContent: inner_align }}
						className='menu_contents'
					>
						<InnerBlocks.Content />
					</div>
				</div>
				<div className='itmar_style_div' dangerouslySetInnerHTML={{ __html: styleTags }} />
			</div>
		</>
	);
}
