import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { StyleComp } from './StyleMenu';

export default function save({ attributes }) {
	const {
		bgColor_val,
		bgGradient_val,
		is_submenu
	} = attributes;

	//単色かグラデーションかの選択
	const bgColor = bgColor_val || bgGradient_val;
	const blockProps = useBlockProps.save({ style: { background: bgColor } });

	//styled-componentsのHTML化
	const sheet = new ServerStyleSheet();
	const html = renderToString(sheet.collectStyles(
		<StyleComp attributes={attributes} />
	));
	const styleTags = sheet.getStyleTags();
	// 正規表現で styled-components のクラス名を取得
	const classMatch = html.match(/class="([^"]+)"/);
	const className = classMatch ? classMatch[1] : "";

	return (
		<>
			{!is_submenu &&
				<>
					<div className="itmar_hamberger_btn">
						<span></span>
						<span></span>
						<span></span>
					</div>
					<div className='itmar_back_ground'></div>
				</>
			}
			<div {...blockProps}>

				<div className={className}>

					<div className='menu_contents'>
						<InnerBlocks.Content />
					</div>
				</div>
				<div className='itmar_style_div' dangerouslySetInnerHTML={{ __html: styleTags }} />
			</div>
		</>
	);
}
