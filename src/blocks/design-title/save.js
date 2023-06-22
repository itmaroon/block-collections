
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { StyleComp } from './StyleWapper';

export default function save({ attributes }) {
  const blockProps = useBlockProps.save();
  const { headingContent, align,
    backgroundColor,
    backgroundGradient,
    textColor, } = attributes;
  const sheet = new ServerStyleSheet();
  const html = renderToString(sheet.collectStyles(
    <div {...blockProps}>
      <StyleComp attributes={attributes}>
        <RichText.Content
          value={headingContent}
        />
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