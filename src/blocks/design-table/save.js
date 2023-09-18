import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { StyleComp } from './StyleTable';

export default function save({ attributes }) {
	const {
		dataSource,
		tableSource,
		is_heading,
		tableHeading,
		bgColor,
	} = attributes;

	const blockProps = useBlockProps.save({ style: { backgroundColor: bgColor, overflow: 'hidden' } });
	const sheet = new ServerStyleSheet();
	const html = renderToString(sheet.collectStyles(
		<div
			{...blockProps}
			data-source={dataSource}
		>
			<StyleComp attributes={attributes}>
				{tableSource &&
					<table>
						{is_heading &&
							<thead>
								<tr>
									{tableSource[0].cells.map((cell, index) => (
										<th key={index}>
											<RichText.Content
												value={tableHeading[index]}
											/>
										</th>
									))}
								</tr>

							</thead>
						}
						<tbody>
							{tableSource.map((row) => (
								<tr>
									{row.cells.map((cell) => {
										const CellTag = cell.tag;
										return (
											<CellTag>
												{cell.content}
											</CellTag>
										);
									})}
								</tr>
							))}
						</tbody>
					</table>
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
	);
}
