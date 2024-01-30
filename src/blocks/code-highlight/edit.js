
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls
} from '@wordpress/block-editor';
import {
	TextareaControl,
	PanelBody,
	PanelRow,
	ToggleControl,
	SelectControl,
	TextControl,
	Button,
	Toolbar,
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';
import { useEffect, useState, useRef } from '@wordpress/element';


import './editor.scss';

//スペースのリセットバリュー
const padding_resetValues = {
	top: '10px',
	left: '10px',
	right: '10px',
	bottom: '10px',
}

const units = [
	{ value: 'px', label: 'px' },
	{ value: 'em', label: 'em' },
	{ value: 'rem', label: 'rem' },
];

export default function Edit({ attributes, setAttributes }) {
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
		align
	} = attributes

	//pre要素の参照用
	const preRef = useRef(null);

	//プレビュー表示
	const getPreview = () => {
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
			<div
				className={"wp-block-itmar-code-highlight" + add_block_class}
			>
				{fileName &&
					<p className="file_name">{fileName}</p>
				}
				<pre ref={preRef} className={"prettyprint" + add_pre_class} style={{ overflow: "auto", whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
					{codeArea}
				</pre>
			</div>
		);
	}

	// プレビューのセット
	const [codePreview, setCodePreview] = useState(getPreview());

	//拡張したスタイル
	const extraStyle = {
		margin: `${margin_value.top} ${margin_value.right} ${margin_value.bottom} ${margin_value.left}`,
		padding: `${padding_value.top} ${padding_value.right} ${padding_value.bottom} ${padding_value.left}`,
	}

	const blockProps = useBlockProps({ style: extraStyle });

	//モードが切り替わって再レンダリングが完了したら呼出し
	useEffect(() => {
		//編集モードではリターン
		if (preRef.current === null) return;

		if (typeof PR !== "undefined") {
			//prettyprintedクラスが付いていなければpre要素のinnerTextを書き換える
			if (!preRef.current.classList.contains('prettyprinted')) {
				preRef.current.innerText = codeArea;
			}
			//サイトエディタの場合はiframeDocumentにPRを適用
			const iframeInstance = document.getElementsByName('editor-canvas')[0];

			if (iframeInstance) {
				const iframeDocument = iframeInstance.contentDocument || iframeInstance.contentWindow.document;
				if (iframeDocument.readyState === 'complete') {
					if (iframeDocument.defaultView.PR) {
						iframeDocument.defaultView.PR.prettyPrint();
					}
				} else {//iframeDocumentの読込をまつ
					iframeInstance.addEventListener('load', () => {
						if (iframeDocument.defaultView.PR) {
							iframeDocument.defaultView.PR.prettyPrint();
						}
					});
				}
			} else {
				//通常のブロックエディタの処理
				PR.prettyPrint();
			}
		}
	}, [isEditMode, codePreview]);

	//コード部分の要素のクラスに変更があった場合
	useEffect(() => {
		const newPreview = getPreview();
		setCodePreview(newPreview);
	}, [skin, linenums, linenumsStart, lang, fileName, codeArea]);


	//テキストエリア（TextareaControl）の行数
	let codeAreaRows = codeArea.split(/\r|\r\n|\n/).length > 3 ? codeArea.split(/\r|\r\n|\n/).length : 3;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('SyntaxHighLight Settings', 'block-collections')}
					initialOpen={true}
				>
					<PanelRow>
						<ToggleControl
							label={linenums ? __('Line Number(display)', 'block-collections') : __('Line Number(hidden)', 'block-collections')}
							checked={linenums}
							onChange={(val) => setAttributes({ linenums: val })}
						/>
					</PanelRow>
					{linenums &&  //上記が true の場合に表示
						<PanelRow>
							<TextControl
								label={__('Starting Line Number', 'block-collections')}
								type="number"
								value={linenumsStart}
								onChange={(val) => setAttributes({ linenumsStart: parseInt(val) })}
							/>
						</PanelRow>
					}

					<PanelRow>
						<SelectControl
							label={__('languege', 'block-collections')}
							value={lang}
							options={[
								{ label: "Default", value: '' },
								{ label: "CSS", value: 'css' },
							]}
							onChange={(val) => setAttributes({ lang: val })}
						/>
					</PanelRow>

					<PanelRow>
						<SelectControl
							label={__('Skin', 'block-collections')}
							value={skin}
							options={[
								{ label: "Basic", value: '' },
								{ label: "Desert", value: 'desert' },
								{ label: "Doxy", value: 'doxy' },
								{ label: "Sons-of-obsidian", value: 'sons-of-obsidian' },
								{ label: "Sunburst", value: 'sunburst' },
							]}
							onChange={(val) => setAttributes({ skin: val })}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody
					title={__('Spacing Settings', 'block-collections')}
					initialOpen={true}
				>
					<BoxControl
						label={__("Margin settings", 'block-collections')}
						values={margin_value}
						onChange={value => setAttributes({ margin_value: value })}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>

					<BoxControl
						label={__("Padding settings", 'block-collections')}
						values={padding_value}
						onChange={value => setAttributes({ padding_value: value })}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>

				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<Toolbar>
					<Button
						//属性 isEditMode の値により表示するラベルを切り替え
						label={isEditMode ? __('Preview', 'block-collections') : __('Edit', 'block-collections')}
						//属性 isEditMode の値により表示するアイコンを切り替え
						icon={isEditMode ? "format-image" : "edit"}
						className="edit_mode"
						//setAttributes を使って属性の値を更新（真偽値を反転）
						onClick={() => {
							setAttributes({ isEditMode: !isEditMode })
						}}
					/>
				</Toolbar>
			</BlockControls>

			{isEditMode && // isEditMode が true の場合（編集モード）
				<div {...blockProps}>
					<TextControl
						label={__("File Name", 'block-collections')}
						type="string"
						className="filename"
						value={fileName}
						onChange={(val) => setAttributes({ fileName: val })}
					/>
					<TextareaControl
						label={__("Code:", 'block-collections')}
						value={codeArea}
						onChange={(code) => {
							setAttributes({ codeArea: code });
							console.log(code)
						}}
						rows={codeAreaRows}
					/>
				</div>
			}
			{!isEditMode && // isEditMode が false の場合（プレビューモード）
				<div {...blockProps}>
					<div className='preview_wrapper'>
						<Button
							onClick={() => setAttributes({ isEditMode: true })}
							variant="link"
							icon="edit"
						>{__("edit mode", 'block-collections')}
						</Button>
						{codePreview}
					</div>
				</div>
			}
		</>

	);
}
