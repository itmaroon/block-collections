import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { StyleComp } from './StyleGroup';

export default function save({ attributes }) {
	const {
		is_moveable,
		position
	} = attributes;


	//ブロックのスタイル適用とサブメニューの場合はクラスを付加
	const blockProps = useBlockProps.save();

	//styled-componentsのHTML化
	const sheet = new ServerStyleSheet();
	const html = renderToString(sheet.collectStyles(
		<StyleComp attributes={attributes}>
			<div {...blockProps} >
				<InnerBlocks.Content />
			</div>
		</StyleComp>
	));
	const styleTags = sheet.getStyleTags();


	return (
		<>
			<div dangerouslySetInnerHTML={{ __html: html }} />
			<div dangerouslySetInnerHTML={{ __html: styleTags }} />
		</>
	)
}
