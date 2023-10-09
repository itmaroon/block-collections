
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
    menu_pos,
    is_title_menu,
    selectedPageUrl
  } = attributes;
  const blockProps = useBlockProps.save({ style: { backgroundColor: bgColor, position: `${is_title_menu ? 'relative' : 'static'}` } });

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
        {(linkKind === 'none' || linkKind === 'submenu') ? (
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
    <div {...blockProps}>
      <div dangerouslySetInnerHTML={{ __html: html }} />

      {linkKind === 'submenu' &&
        <div className={`submenu-block ${menu_pos.replace(/ /g, "_")}`}>
          <InnerBlocks.Content />
        </div>
      }
      <div className='itmar_style_div' dangerouslySetInnerHTML={{ __html: styleTags }} />
    </div>
  )
}