
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { StyleComp } from './StyleGroup';

export default function save({ attributes }) {
	const {
		is_menu,
		is_submenu,
		is_anime,
		anime_prm
	} = attributes;

	const blockProps = useBlockProps.save();

	//styled-componentsのHTML化
	const sheet = new ServerStyleSheet();
	const html = renderToString(sheet.collectStyles(
		<StyleComp
			attributes={attributes}
		/>
	));
	const styleTags = sheet.getStyleTags();
	// 正規表現で styled-components のクラス名を取得
	const classMatch = html.match(/class="([^"]+)"/);
	const className = classMatch ? classMatch[1] : "";

	return (
		<>
			{(is_menu && !is_submenu) &&
				<>
					<div className="itmar_hamberger_btn">
						<span></span>
						<span></span>
						<span></span>
					</div>
					<div className='itmar_back_ground'></div>
				</>
			}

			<div className={className}>
				<div {...blockProps} >
					<div
						className={`group_contents ${is_anime ? 'fadeTrigger' : ''}`}
						data-is_anime={is_anime}
						data-anime_prm={JSON.stringify(anime_prm)}
					>
						<InnerBlocks.Content />
					</div>
				</div>
				<div className='itmar_style_div' dangerouslySetInnerHTML={{ __html: styleTags }} />
			</div>

		</>
	)
}
