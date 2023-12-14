
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { NomalSelect } from './initSelect';
import { StyleComp } from './StyleSelect';
import StyleLabel from '../StyleLabel';

export default function save({ attributes }) {
	const {
		inputName,
		bgColor,
		selPattern,
		selectValues,
		folder_val,
		required,
		labelContent,
		className,
	} = attributes;

	const blockProps = useBlockProps.save({ style: { backgroundColor: bgColor, overflow: 'hidden' } });

	// selPatternがtrueの場合、multiple属性を持つオブジェクトを返す
	const selectAttributes = selPattern === 'multi' ? { multiple: true } : {};

	const sheet = new ServerStyleSheet();
	const html = renderToString(sheet.collectStyles(
		<div {...blockProps} data-required={required.flg}>
			<StyleComp attributes={attributes}>
				<NomalSelect>
					<select
						value=""
						class="nomal"
						{...selectAttributes}
						name={inputName}
						data-placeholder={folder_val}
					>
						{selPattern === 'single' &&
							<option value="">{__("Please Select.", 'itmar_block_collections')}</option>
						}
						{
							selectValues.map((option_item) => {
								return (<option id={option_item.id} className={option_item.classname} value={option_item.value}>{option_item.label}</option>)
							})
						}
					</select>
				</NomalSelect>
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
	);
}
