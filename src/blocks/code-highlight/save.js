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
	const {
		codeArea,
		linenums,
		linenumsStart,
		lang,
		skin,
		fileName,
		isEditMode,
		margin_value,
		padding_value,
		align,
		add_style
	} = attributes

	//拡張したスタイル
	const extraStyle = {
		margin: `${margin_value.top} ${margin_value.right} ${margin_value.bottom} ${margin_value.left}`,
		padding: `${padding_value.top} ${padding_value.right} ${padding_value.bottom} ${padding_value.left}`,
	}

	const blockProps = useBlockProps.save({ style: extraStyle });

	//テキストエリアに入力がなければ何も表示しない
	if (codeArea === '') {
		return null;
	}
	//ブロックに追加するクラス
	let add_block_class = '';
	//配置                  
	if (align) {
		add_block_class += ' align' + align;
	}
	//スキン
	if (skin) {
		add_block_class += ' ' + skin;
	}
	//ファイル名が指定されていれば filename_wrapper クラスを追加
	if (fileName) {
		add_block_class += ' filename_wrapper';
	}

	//pre 要素に追加するクラス
	let add_pre_class = '';
	if (linenums) {
		add_pre_class = ' linenums';
		//行の開始番号が指定されていればその値を設定
		if (linenumsStart !== 1) {
			add_pre_class += ':' + linenumsStart;
		}
	}
	// 言語が指定されていればそのクラス（lang-xxxx）を設定
	if (lang) {
		add_pre_class += ' lang-' + (lang);
	}
	return (
		<div {...blockProps}>
			<div
				className={add_block_class}
				style={add_style}
			>
				{fileName &&
					<p className="file_name">{fileName}</p>
				}

				<pre className={"prettyprint" + add_pre_class}>
					{codeArea}
				</pre>
				<button className='code_copy'>Copy</button>

			</div>
		</div>
	);
}
