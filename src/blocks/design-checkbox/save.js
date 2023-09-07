import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { StyleComp } from './StyleCheckbox';

export default function save({ attributes }) {
	const {
		align,
		bgColor,
		labelContent,
		inputName,
		proceedCheck
	} = attributes;

	//テキストの配置
	const align_style = align === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } :
		align === 'right' ? { marginLeft: 'auto' } : null;
	const blockProps = useBlockProps.save({ style: { ...align_style, backgroundColor: bgColor, overflow: 'hidden' } });

	const sheet = new ServerStyleSheet();
	const html = renderToString(sheet.collectStyles(
		<div {...blockProps}>
			<StyleComp attributes={attributes}>
				<label>
					<input
						type="checkbox"
						name={inputName}
						data-is_proceed={proceedCheck}
					/>
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
