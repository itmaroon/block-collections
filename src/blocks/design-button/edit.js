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
	RichText,
	BlockAlignmentControl,
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalBorderRadiusControl as BorderRadiusControl
} from '@wordpress/block-editor';
import { 
	Button,
	PanelBody, 
	PanelRow, 
	ToggleControl
} from '@wordpress/components';

import  BoxControl from '../boxControl';
import { getBorderRadius } from "../getStyle";
import { getSpaceStyle } from "../getStyle";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const { attributes, setAttributes }=props
	//属性値を取得
	const { 
		btnContent, 
		btnalign, 
		btnbackgroundColor,
		backgroundColor, 
		btnTextColor,
		backgroundgradient,
		btngradient,
		borderRadiusValues,
		marginValues,
		paddingValues,
	} = attributes;
	//solidかgradientかの選択
	let btnStyle = btnbackgroundColor===undefined ? { background: btngradient } : { background: btnbackgroundColor };
	const blockBackground = backgroundColor===undefined ? backgroundgradient : backgroundColor;
	//ボタンのスタイル決め
	//配置
	switch (btnalign){
		case "center":
			btnStyle.margin = '0 auto';
			break
		case "left":
			btnStyle.marginRight = 'auto';
			break
		case "right":
			btnStyle.marginLeft = 'auto';
			break
		case "wide":
			btnStyle.width = '100%';
			break
		case "full":
			btnStyle.width = '100vw';
			break
	}
	//余白
	const spacingValue=getSpaceStyle(marginValues, paddingValues);
	btnStyle = { ...btnStyle, ...spacingValue};
	//角丸
	const borderStyle=getBorderRadius(borderRadiusValues);
	btnStyle = { ...btnStyle, ...borderStyle};
	return (
		<>
			<InspectorControls>
				<PanelColorSettings 
					title={ __( 'Text Color settings', 'itmar_location' ) }
					initialOpen={ false }
					colorSettings={ [
						{
						  value: btnTextColor,
						  onChange: (newValue) => setAttributes({btnTextColor: newValue }),
						  label: __( 'Button Text color', 'itmar_location' ),
							enableAlpha: true
						}
						
					] }
				/>
				<PanelColorGradientSettings
					title={ __("Backbround Color settings") }
					settings={ [ 
						{
							colorValue: btnbackgroundColor,
							gradientValue: btngradient,
							
							label:__("Button Background Color"),
							onColorChange:(newValue) => setAttributes({btnbackgroundColor: newValue }),
							onGradientChange:(newValue) => setAttributes({btngradient: newValue }),
					
						},
						{
							colorValue: backgroundColor,
							gradientValue: backgroundgradient,
							
							label:__("Block Background Color"),
							onColorChange:(newValue) => setAttributes({backgroundColor: newValue }),
							onGradientChange:(newValue) => setAttributes({backgroundgradient: newValue }),
						},
					]}
				/>
				<BorderRadiusControl
						values={ borderRadiusValues }
						onChange={ (newBrVal)=>
						setAttributes( { borderRadiusValues: typeof newBrVal==='string' ? {"value": newBrVal} : newBrVal } ) }	
				/>
				<PanelRow>
						<BoxControl
							label='Margin Size'
							sizeName='marginValues'
							attributes={marginValues}
							setAttributes={setAttributes}
						/>
					</PanelRow>
					<PanelRow>
						<BoxControl
							label='Padding Size'
							sizeName='paddingValues'
							attributes={paddingValues}
							setAttributes={setAttributes}
						/>
					</PanelRow>
				
			</InspectorControls>
			
			<BlockControls>
				<BlockAlignmentControl
					value={ btnalign }
					onChange={ (newAlign) => setAttributes( {btnalign: newAlign === undefined ? 'none' : newAlign}) }
				/>
			</BlockControls>

			<div { ...useBlockProps( {style: {background: blockBackground} } ) }>
				<button 
					//style={{ background: btnBackground , margin: '0 auto' } }
					style={ btnStyle }				
				>
					<RichText
						tagName="p"
						onChange={ (newContent) => setAttributes( {btnContent:newContent} ) }
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
						value={ btnContent }
						placeholder={ __( 'Write your text...' ) }
						style={ { color: btnTextColor ,textAlign: "center"} }
					/>
				</button>
			
			</div>
		</>
		
	);
}
