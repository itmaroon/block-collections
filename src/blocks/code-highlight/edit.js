
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
import { useEffect } from '@wordpress/element';

import './editor.scss';

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
		align,
		add_style
	} = attributes

	//拡張したスタイル
	const extraStyle = {
		margin: `${margin_value.top} ${margin_value.right} ${margin_value.bottom} ${margin_value.left}`,
		padding: `${padding_value.top} ${padding_value.right} ${padding_value.bottom} ${padding_value.left}`,
	}

	const blockProps = useBlockProps({ style: extraStyle });

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


	//モードが切り替わって再レンダリングが完了したら呼出し
	useEffect(() => {
		if (typeof PR !== "undefined") {
			PR.prettyPrint();
		}
	}, [isEditMode]);

	//テキストエリア（TextareaControl）の行数
	let codeAreaRows = codeArea.split(/\r|\r\n|\n/).length > 3 ? codeArea.split(/\r|\r\n|\n/).length : 3;


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
				style={add_style}
			>
				{fileName &&
					<p className="file_name">{fileName}</p>
				}
				<pre className={"prettyprint" + add_pre_class} style={{ overflow: "auto", whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
					{codeArea}
				</pre>
			</div>
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('SyntaxHighLight Settings', 'itmar_block_collections')}
					initialOpen={true}
				>
					<PanelRow>
						<ToggleControl
							label={linenums ? __('Line Number(display)', 'itmar_block_collections') : __('Line Number(hidden)', 'itmar_block_collections')}
							checked={linenums}
							onChange={(val) => setAttributes({ linenums: val })}
						/>
					</PanelRow>
					{linenums &&  //上記が true の場合に表示
						<PanelRow>
							<TextControl
								label={__('Starting Line Number', 'itmar_block_collections')}
								type="number"
								value={linenumsStart}
								onChange={(val) => setAttributes({ linenumsStart: parseInt(val) })}
							/>
						</PanelRow>
					}

					<PanelRow>
						<SelectControl
							label="lang"
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
							label="skin"
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
					title={__('Spacing Settings', 'itmar_block_collections')}
					initialOpen={true}
				>
					<BoxControl
						label={__("Margin settings", 'itmar_block_collections')}
						values={margin_value}
						onChange={value => setAttributes({ margin_value: value })}
						units={units}	// 許可する単位
						allowReset={true}	// リセットの可否
						resetValues={padding_resetValues}	// リセット時の値

					/>

					<BoxControl
						label={__("Padding settings", 'itmar_block_collections')}
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
						label={isEditMode ? __('Preview', 'itmar_block_collections') : __('Edit', 'itmar_block_collections')}
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
						label={__("File Name", 'itmar_block_collections')}
						type="string"
						className="filename"
						value={fileName}
						onChange={(val) => setAttributes({ fileName: val })}
					/>
					<TextareaControl
						label={__("Code:", 'itmar_block_collections')}
						value={codeArea}
						onChange={(code) => setAttributes({ codeArea: code })}
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
						>{__("edit mode", 'itmar_block_collections')}
						</Button>
						{getPreview()}
					</div>
				</div>
			}
		</>

	);
}
