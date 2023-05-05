
import { __ } from '@wordpress/i18n';
import {StyleComp} from './StyleWapper'
import TypographyControls from '../TypographyControls'

import { 
	Button,
	Panel,
	PanelBody, 
	PanelRow, 
	ToggleControl,
	RangeControl,
	RadioControl,
	TextControl,
	__experimentalBoxControl as BoxControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { 
	useBlockProps, 
	RichText,
	BlockAlignmentControl,
	BlockControls,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalBorderRadiusControl as BorderRadiusControl
} from '@wordpress/block-editor';

import './editor.scss';


export default function Edit({ attributes, setAttributes }) {
	const { 
		barWidth, 
		colorVal_border, 
		barSpace, 
		gradientVal_border,
		color_text_copy,
		color_background_copy,
		gradient_background_copy,
		copy_content,
		font_style_copy,
		radius_copy,
		padding_copy,
		className,
	} = attributes;

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

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody title="スタイル別設定" initialOpen={ true } className="title_design_ctrl">
					
					{ className==='is-style-virtical_line' &&
					<>
						<PanelColorGradientSettings
							title={__("Bar Color Setting") }
							settings={ [ {
								colorValue: colorVal_border,
								gradientValue: gradientVal_border,
								
								label:__("Choose Line Background"),
								onColorChange:(newValue) => setAttributes({colorVal_border: newValue }),
								onGradientChange:(newValue) => setAttributes({gradientVal_border: newValue }),
							},
						] }
						/>

						<PanelRow
							className='sizing_row'
						>
							<UnitControl
								dragDirection="e"
								onChange={(newValue)=>setAttributes({barWidth: newValue})}
								label='ラインの幅' 
								value={ barWidth } 
							/>
							<UnitControl
								dragDirection="e"
								onChange={(newValue)=>setAttributes({barSpace: newValue})} 
								label='文字との間隔' 
								value={ barSpace } 
							/>
						</PanelRow>
					</>
					}

					{ className==='is-style-sub_copy' &&
					<>
						<PanelColorGradientSettings
							title={__("Copy Color Setting") }
							settings={ [ {
								colorValue: color_text_copy,
								label:__("Choose Text color"),
								onColorChange:(newValue) => setAttributes({color_text_copy: newValue }),		
							},
							{
								colorValue: color_background_copy,
								gradientValue: gradient_background_copy,
								
								label:__("Choose Background color"),
								onColorChange:(newValue) => setAttributes({color_background_copy: newValue }),
								onGradientChange:(newValue) => setAttributes({gradient_background_copy: newValue }),
							},
						] }
						/>

						<PanelRow
							className='copyInfo_row'
						>
							<TextControl
								label="コピーテキスト"
								labelPosition="top"
								value={copy_content}
								isPressEnterToChange
								onChange={ ( newValue ) => setAttributes({copy_content: newValue }) }
							/>
						</PanelRow>

						<TypographyControls title='コーピーのタイポグラフィー' fontStyle={ font_style_copy } setAttributes={ setAttributes }/>

						<BorderRadiusControl
							values={ radius_copy }
							onChange={ (newBrVal)=>
							setAttributes( { radius_copy: typeof newBrVal==='string' ? {"value": newBrVal} : newBrVal } ) }	
						/>

						<BoxControl
							label="パティング設定"
							values={ padding_copy }
							onChange={ value => setAttributes( { padding_copy: value } ) }	
							units={ units }	// 許可する単位
							allowReset={ true }	// リセットの可否
							resetValues={ padding_resetValues }	// リセット時の値
							
						/>
					</>
					}
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps() }>
				<StyleComp attributes = { attributes }>
					<InnerBlocks
						template={[
							['core/heading',{ placeholder: '小見出しを入れてください。' , level: 2}],
						]}
						templateLock="all"
					/>
				</StyleComp>
			</div>		
		</>
	);
}