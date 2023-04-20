
import { __ } from '@wordpress/i18n';
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
	Panel,
	PanelBody, 
	PanelRow, 
	ToggleControl,
	RangeControl,
	RadioControl
} from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';

import './editor.scss';
import { hslToRgb16 } from './hslToRgb';
import { rgb16ToHsl } from './hslToRgb';

export default function Edit(props) {
	const renderFlgRef = useRef(false);
	const { attributes, setAttributes } = props;
	let blockProps=useBlockProps()
	const { 
		btnContent, 
		btnalign, 
		blur,
		intensity,
		distance,
		direction,
		embos,
		boxShadowStyle,
		className,
	} = attributes;

	useEffect( () => {
		if(renderFlgRef.current){
			if(className==='is-style-newmor'){
				//バックグランドカラーの設定がないときはデフォルトカラーで影をつける
				if(blockProps.style.backgroundColor===undefined){
					blockProps.style.backgroundColor='#dddfe4';
				}
				//ボタン背景色のHSL値
				const hslValue = rgb16ToHsl(blockProps.style.backgroundColor);
				//影の明るさを変更
				const lightVal = (hslValue.lightness + intensity) < 100 ? hslValue.lightness + intensity :100;
				const darkVal = (hslValue.lightness - intensity) > 0 ? hslValue.lightness - intensity : 0;
				const lightValue = hslToRgb16(hslValue.hue, hslValue.saturation, lightVal);
				const darkValue = hslToRgb16(hslValue.hue, hslValue.saturation, darkVal);
				//boxshadowの生成
				let destTopLeft,destTopRight,destBottomLeft,destBottomRight;
				switch (direction){
					case "top_left":
						destTopLeft = distance;
						destTopRight = distance;
						destBottomLeft = distance * -1;
						destBottomRight = distance * -1;
						break;
					case "top_right":
						destTopLeft = distance * -1;
						destTopRight = distance;
						destBottomLeft = distance * -1;
						destBottomRight = distance;
						break;
					case "bottom_left":
						destTopLeft = distance;
						destTopRight = distance * -1;
						destBottomLeft = distance ;
						destBottomRight = distance * -1;
						break;
					case "bottom_right":
						destTopLeft = distance * -1;
						destTopRight = distance * -1;
						destBottomLeft = distance;
						destBottomRight = distance;
						break;
				}
				const ShadowStyle = embos === 'swell' ? { style: {
					boxShadow: `${destTopLeft}px ${destTopRight}px ${blur}px ${darkValue}, ${destBottomLeft}px ${destBottomRight}px ${blur}px ${lightValue}`
				}} : { style: {
					boxShadow: `inset ${destTopLeft}px ${destTopRight}px ${blur}px ${darkValue}, inset ${destBottomLeft}px ${destBottomRight}px ${blur}px ${lightValue}`
				}}
				
				//attributesに保存
				setAttributes({boxShadowStyle: ShadowStyle})
			}else{
				//スタイルを削除
				setAttributes({boxShadowStyle:{}})
			}
		}else{
			renderFlgRef.current = true
		}
	}, [className,blur,intensity,distance,direction,embos] );

	return (
		<>
			{ className==='is-style-newmor' &&
				<InspectorControls __experimentalGroup="border">
					<PanelBody title="ニューモフィズム設定" initialOpen={ false } className="btn_design_ctrl">
						<RangeControl
							value={ distance }
							label="Distanse"
							max={50}
							min={0}
							onChange={(val) => setAttributes({distance:val})}
							withInputField={ false }
						/>
						<RangeControl
							value={ intensity }
							label="Intensity"
							max={100}
							min={0}
							onChange={(val) => setAttributes({intensity:val})}
							withInputField={ false }
						/>
						<RangeControl
							value={ blur }
							label="Blur"
							max={20}
							min={0}
							onChange={(val) => setAttributes({blur:val})}
							withInputField={ false }
						/>
						<PanelRow>
							<div className="light_direction">
								<RadioControl
									selected={ direction }
									options={ [
										{ value: 'top_left' },
										{ value: 'top_right' },
										{ value: 'bottom_left' },
										{ value: 'bottom_right' },
									] }
									onChange={ ( changeOption ) => {setAttributes({direction: changeOption});}
									}	
								/>
							</div>
							<div className="embos">
								<RadioControl
									selected={ embos }
									options={ [
										{ value: 'swell' },
										{ value: 'dent' },
										
									] }
									onChange={ ( changeOption ) => {setAttributes({embos: changeOption});}
									}	
								/>
							</div>
							
						</PanelRow>
						
					</PanelBody>
				</InspectorControls>
			}
			
			<div { ...useBlockProps( boxShadowStyle ) }>
				<RichText
					tagName="p"
					onChange={ (newContent) => setAttributes( {btnContent:newContent} ) }
					allowedFormats={ [ 'core/bold', 'core/italic', 'core/text-color' ] }
					value={ btnContent }
					placeholder={ __( 'Write your text...' ) }
					style={ { textAlign: "center" } }
				/>
			</div>
		</>
		
	);
}
