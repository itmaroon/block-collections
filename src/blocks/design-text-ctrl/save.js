
import { useBlockProps } from '@wordpress/block-editor';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { StyleComp } from './StyleInput';

export default function save({ attributes }) {
	const blockProps = useBlockProps.save();
	const {
		inputName,
		inputType,
		rowNum,
		required,
		labelContent,
		className
	} = attributes;

	const dispLabel = required.flg ? <>{labelContent}<span>({required.display})</span></> : labelContent;

	const sheet = new ServerStyleSheet();
	const html = renderToString(sheet.collectStyles(
		<div {...blockProps}>
			<StyleComp attributes={attributes}>
				<label class="fit-label" data-required={required.flg}>
					{dispLabel}
				</label>
				{inputType === 'text' &&
					<input type="text" name={inputName} className="contact_text" />
				}
				{inputType === 'email' &&
					<input type="email" name={inputName} className="contact_text" />
				}
				{inputType === 'textarea' &&
					<textarea name={inputName} rows={rowNum} className="contact_text" />
				}

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
