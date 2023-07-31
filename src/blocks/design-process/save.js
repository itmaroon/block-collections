
import { useBlockProps } from '@wordpress/block-editor';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { StyleComp } from './StyleProcess';

export default function save({ attributes }) {
	const blockProps = useBlockProps.save();
	const {
		figure_blocks
	} = attributes;

	const sheet = new ServerStyleSheet();
	const html = renderToString(sheet.collectStyles(
		<div {...blockProps}>
			<StyleComp attributes={attributes}>
				{figure_blocks.map((block, index) =>
					<li key={index} className={`${block.block_name.replace(/\//g, "-")} ${index === 0 ? "ready" : ""}`}>
						{block.stage_info}
					</li>
				)}
			</StyleComp>
		</div>
	));
	const styleTags = sheet.getStyleTags();
	return (
		<>
			<div dangerouslySetInnerHTML={{ __html: html }} />
			<div dangerouslySetInnerHTML={{ __html: styleTags }} />
		</>
	)
}
