
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import {StyleComp} from './StyleWapper'

export default function save({ attributes }) {
	const blockProps = useBlockProps.save();
	const sheet = new ServerStyleSheet();
  const html = renderToString(sheet.collectStyles(
    <StyleComp attributes = { attributes }>
      <div { ...blockProps }>
        <InnerBlocks.Content />
      </div>
    </StyleComp>   
  ));
  const styleTags = sheet.getStyleTags();
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <div dangerouslySetInnerHTML={{ __html: styleTags }} />
    </>
  )
}