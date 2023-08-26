import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { StyleComp } from './StyleCheckbox';

export default function save({ attributes }) {
	const {
		labelContent,
		inputName
	} = attributes;
	const sheet = new ServerStyleSheet();
	const html = renderToString(sheet.collectStyles(
		<div {...useBlockProps.save()}>
			<StyleComp attributes={attributes}>
				<label>
					<input type="checkbox" name={inputName} />
					<span></span>
					<RichText.Content
						value={labelContent}
					/>
				</label>

			</StyleComp>
		</div>
	));
	const styleTags = sheet.getStyleTags();
	return (
		<>
			<div dangerouslySetInnerHTML={{ __html: html }} />
			<div dangerouslySetInnerHTML={{ __html: styleTags }} />
		</>
	);
}
