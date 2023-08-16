
import { useBlockProps } from '@wordpress/block-editor';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { NomalSelect } from './initSelect';
import { StyleComp } from './StyleSelect';

export default function save({ attributes }) {
	const {
		selectedValues,
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
						<option class="catg_item" value="cat_1" selected={selectedValues.includes(0)}>カテゴリー１</option>
						<option class="catg_item" value="cat_2" selected={selectedValues.includes(1)}>カテゴリー２</option>
						<option class="term_item" value="term_1" selected={selectedValues.includes(2)}>ターム１</option>
						<option class="term_item" value="term_2" selected={selectedValues.includes(3)}>ターム２</option>
						<option class="tag_item" value="tag_1" selected={selectedValues.includes(4)}>タグ１</option>
						<option class="tag_item" value="tag_2" selected={selectedValues.includes(5)}>タグ２</option>

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
