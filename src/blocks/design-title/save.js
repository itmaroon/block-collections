
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { StyleComp } from './StyleWapper';

export default function save({ attributes }) {

  const {
    bgColor,
    headingType,
    titleType,
    headingContent,
    linkKind,
    selectedPageUrl
  } = attributes;
  const blockProps = useBlockProps.save({ style: { backgroundColor: bgColor, overflow: 'hidden' } });

  const sheet = new ServerStyleSheet();

  //リッチテキストをコンテンツにする
  const renderRichText = () => (
    <RichText.Content
      tagName={headingType}
      className="has-text-color"
      value={headingContent}
    />
  );
  //ヘッダー要素をコンテンツにする
  const renderElement = () => (
    React.createElement(
      headingType.toLowerCase(),
      { className: `has-text-color itmar_${titleType}_title` }
    )
  );
  //コンテンツの選択
  const content = titleType === 'plaine' ? renderRichText() : renderElement();
  //フロントエンドに出力
  const html = renderToString(sheet.collectStyles(
    <div {...blockProps}>
      <StyleComp attributes={attributes} >
        {linkKind === 'none' ? (
          content
        ) : (
          <a href={selectedPageUrl}>
            {content}
          </a>
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