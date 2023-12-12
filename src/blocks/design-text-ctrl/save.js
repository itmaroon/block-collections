import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { StyleComp } from './StyleInput';
import StyleLabel from '../StyleLabel';

export default function save({ attributes }) {

	const {
		inputName,
		bgColor,
		placeFolder,
		inputType,
		required,
		labelContent,
		className
	} = attributes;
	const blockProps = useBlockProps.save({ style: { backgroundColor: bgColor, overflow: 'hidden' } });

	const dispLabel = required.flg ? `${labelContent}(${required.display})` : labelContent;


	const sheet = new ServerStyleSheet();
	const html = renderToString(sheet.collectStyles(
		<div {...blockProps} data-required={required.flg}>
			<StyleComp attributes={attributes} >

				{inputType === 'text' &&
					<input type="text" name={inputName} className="contact_text empty" placeholder={className === 'is-style-line' ? dispLabel : placeFolder} />
				}
				{inputType === 'email' &&
					<input type="email" name={inputName} className="contact_text empty" placeholder={className === 'is-style-line' ? dispLabel : placeFolder} />
				}
				{inputType === 'textarea' &&
					<textarea name={inputName} className="contact_text empty" placeholder={className === 'is-style-line' ? dispLabel : placeFolder} />
				}
				<StyleLabel attributes={attributes}>
					{required.flg ? <>{labelContent}<span>({required.display})</span></> : labelContent}
				</StyleLabel>
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
