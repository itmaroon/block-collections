
import { useBlockProps } from '@wordpress/block-editor';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { NomalSelect } from './initSelect';
import { StyleComp } from './StyleSelect';

export default function save({ attributes }) {
	const {
		selectValues,
		folder_val,

		className,
	} = attributes;
	const blockProps = useBlockProps.save();

	const sheet = new ServerStyleSheet();
	const html = renderToString(sheet.collectStyles(
		<div {...blockProps}>
			<StyleComp attributes={attributes}>
				<NomalSelect>
					<select name="category" class="nomal" multiple data-placeholder={folder_val}>
						{
							selectValues.map((option_item, index) => {
								return (<option className={option_item.classname} value={option_item.value}>{option_item.label}</option>)
							})
						}
					</select>
				</NomalSelect>
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
