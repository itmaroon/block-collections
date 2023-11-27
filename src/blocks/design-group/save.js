import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { StyleComp } from './StyleGroup';

export default function save({ attributes }) {

	//ブロックのスタイル適用とサブメニューの場合はクラスを付加
	const blockProps = useBlockProps.save();

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
			<div className={className}>
				<div {...blockProps} >
					<div className="group_contents">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
			<div className='itmar_style_div' dangerouslySetInnerHTML={{ __html: styleTags }} />
		</>
	)
}
