import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { StyleComp } from './StyleMenu';

export default function save({ attributes }) {
	const {
		bgColor_val,
		bgGradient_val,
	} = attributes;

	//単色かグラデーションかの選択
	const bgColor = bgColor_val || bgGradient_val;
	const blockProps = useBlockProps.save({ style: { background: bgColor } });
	const contents = (
		<InnerBlocks.Content />
	)
	const sheet = new ServerStyleSheet();
	const html = renderToString(sheet.collectStyles(
		<div {...blockProps}>
			<StyleComp attributes={attributes}>
				<InnerBlocks.Content />
			</StyleComp>
		</div>
	));
	const styleTags = sheet.getStyleTags();

	return (
		<>
			<div dangerouslySetInnerHTML={{ __html: html }} />
			<div className='itmar_style_div' dangerouslySetInnerHTML={{ __html: styleTags }} />
		</>
	);
}
