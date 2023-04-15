/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
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
	RangeControl, 
	CheckboxControl,
	Button, 
	Toolbar
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();

	//モードが切り替わって再レンダリングが完了したら呼出し
	useEffect(() => {
		if(typeof PR !== "undefined"){
			PR.prettyPrint();
		}
	}, [attributes.isEditMode]);

	//テキストエリア（TextareaControl）の行数
  let codeAreaRows = attributes.codeArea.split(/\r|\r\n|\n/).length > 3 ? attributes.codeArea.split(/\r|\r\n|\n/).length : 3;
	
	
	//プレビュー表示
	const getPreview = () => {
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
				<pre className={"prettyprint"  + add_pre_class} >
				 { attributes.codeArea }
				</pre>
			</div>  
		);
	}

	return (
		<>
			<InspectorControls>
				<PanelBody 
					title={ __( 'SyntaxHighLight Settings', 'block-location')}
					initialOpen={true}
				>
					<PanelRow>
						<ToggleControl 
							label={ attributes.linenums ? __( 'Line Number(display)', 'block-location') : __( 'Line Number(hidden)', 'block-location') }
							checked={attributes.linenums}
							onChange={(val) => setAttributes({ linenums: val })}
						/>
					</PanelRow>
					{ attributes.linenums &&  //上記が true の場合に表示
						<PanelRow>   
							<TextControl 
								label= {__( 'Starting Line Number', 'block-location') }
								type="number"
								value={ attributes.linenumsStart }
								onChange={ (val) => setAttributes({ linenumsStart: parseInt(val) }) }
							/>
						</PanelRow>
					}
					<PanelRow>
						<SelectControl
							label="ブロックの配置"
							value={attributes.align}
							options={[
								{label: "なし", value: ''},
								{label: "左寄せ", value: 'left'},
								{label: "中央揃え", value: 'center'},
								{label: "右寄せ", value: 'right'},
								{label: "幅広", value: 'wide'},
							]}
							onChange={(val) => setAttributes({ align: val })}
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							label="lang"
							value={attributes.lang}
							options={[
								{label: "Default", value: ''},
								{label: "CSS", value: 'css'},
							]}
							onChange={(val) => setAttributes({ lang: val })}
						/>
					</PanelRow>
					<PanelRow>
						<CheckboxControl
							label="max-width を指定"
							checked={attributes.maxWidthEnable}
							onChange={(val) => setAttributes({ maxWidthEnable: val })}
							help="※ インラインスタイルで設定します"
						/>
					</PanelRow>
					{ attributes.maxWidthEnable &&  //上記が true の場合に表示
						<PanelRow>   
							<RangeControl
								label='max-width'
								value={attributes.maxWidth}
								onChange={(val) => setAttributes({ maxWidth: parseInt(val) })}
								min={300}
								max={1800}
								step={10}
								help="max-width を px で指定"
							/>
						</PanelRow>
					}
					<PanelRow>
						<SelectControl
							label="skin"
							value={attributes.skin}
							options={[
								{label: "Basic", value: ''},
								{label: "Desert", value: 'desert'},
								{label: "Doxy", value: 'doxy'},
								{label: "Sons-of-obsidian", value: 'sons-of-obsidian'},
								{label: "Sunburst", value: 'sunburst'},
							]}
							onChange={(val) => setAttributes({ skin: val })}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<Toolbar>
					<Button
						//属性 isEditMode の値により表示するラベルを切り替え
						label={ attributes.isEditMode ? "Preview" : "Edit" }
						//属性 isEditMode の値により表示するアイコンを切り替え
						icon={ attributes.isEditMode ? "format-image" : "edit" }
						className="edit_mode"
						//setAttributes を使って属性の値を更新（真偽値を反転）
						onClick={() =>{
							setAttributes({ isEditMode: !attributes.isEditMode })
						}}
					/>
				</Toolbar>
			</BlockControls>

			{ attributes.isEditMode && // isEditMode が true の場合（編集モード）
				<div { ...blockProps }>
					<TextControl 
						label="File Name"
						type="string"
						className="filename"
						value={ attributes.fileName }
						onChange={ (val) => setAttributes({ fileName: val }) }
					/>
					<TextareaControl 
						label="Code:" 
						value={ attributes.codeArea }
						onChange={ (code) => setAttributes({ codeArea: code }) }
						rows={ codeAreaRows }
					/>
				</div>
			}
			{ !attributes.isEditMode && // isEditMode が false の場合（プレビューモード）
				<div className='preview_wrapper'>
					<Button 
						onClick={() => setAttributes({ isEditMode: true })}
						variant="link"
						icon="edit"
					>編集モード
					</Button>
					{	getPreview() }
				</div>
				
      }
		</>
		
	);
}
