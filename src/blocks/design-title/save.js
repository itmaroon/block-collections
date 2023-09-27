
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { StyleComp } from './StyleWapper';

export default function save({ attributes }) {

  const {
    bgColor,
    headingType,
    titleType,
    headingContent
  } = attributes;
  const blockProps = useBlockProps.save({ style: { backgroundColor: bgColor, overflow: 'hidden' } });

  const sheet = new ServerStyleSheet();
  const html = renderToString(sheet.collectStyles(
    <div {...blockProps}>
      <StyleComp attributes={attributes} >
        {titleType === 'plaine' ? (
          <RichText.Content
            tagName={headingType}
            className="has-text-color"
            value={headingContent}
          />
        ) : (
          React.createElement(
            headingType.toLowerCase(),
            { className: `has-text-color itmar_${titleType}_title` }
          )
        )}
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