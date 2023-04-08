/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	const blockProps = useBlockProps.save();
	//テキストエリアに入力がなければ何も表示しない
	if (attributes.codeArea ==='') {
		return null;
	}
	//ブロックに追加するクラス
	let add_block_class = '';  
	//配置                  
	if(attributes.align) {
		add_block_class += ' align' + attributes.align;
	}
	//スキン
	if(attributes.skin) {
		add_block_class += ' ' + attributes.skin;
	}
	//ファイル名が指定されていれば filename_wrapper クラスを追加
	if(attributes.fileName) {
		add_block_class += ' filename_wrapper';
	}
	//ブロックに指定するインラインスタイル
	let add_style = {};
	if(attributes.maxWidthEnable) {
		add_style = {maxWidth: attributes.maxWidth};
	}
	//pre 要素に追加するクラス
	let add_pre_class = '';                    
	if(attributes.linenums) {
		add_pre_class = ' linenums';
		//行の開始番号が指定されていればその値を設定
		if(attributes.linenumsStart !== 1) {
			add_pre_class += ':' + attributes.linenumsStart;
		}
	}                   
	// 言語が指定されていればそのクラス（lang-xxxx）を設定
	if(attributes.lang) {
		add_pre_class += ' lang-' + (attributes.lang);
	}
	return (
		<div
			className={"wp-block-itmar-code-highlight" + add_block_class} 
			style={ add_style }
		>
			{ attributes.fileName &&
				<p className="file_name">{ attributes.fileName }</p>
			}
			<pre className={"prettyprint" +add_pre_class }>
				{attributes.codeArea}
			</pre>
		</div>
	);
}
