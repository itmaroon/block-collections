
import { useBlockProps } from '@wordpress/block-editor';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { StyleComp } from './StyleInput';

export default function save({ attributes }) {
	const blockProps = useBlockProps.save();
	const {
		inputName,
		placeFolder,
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

				{inputType === 'text' &&
					<input type="text" name={inputName} className="contact_text empty" placeholder={className === 'is-style-line' ? dispLabel : placeFolder} />
				}
				{inputType === 'email' &&
					<input type="email" name={inputName} className="contact_text empty" placeholder={className === 'is-style-line' ? dispLabel : placeFolder} />
				}
				{inputType === 'textarea' &&
					<textarea name={inputName} rows={rowNum} className="contact_text empty" placeholder={className === 'is-style-line' ? dispLabel : placeFolder} />
				}
				<label class="fit-label" data-required={required.flg}>
					{dispLabel}
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
	)
}
