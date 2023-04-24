
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
import { hslToRgb16, HexToRGB } from './hslToRgb';
import { rgb16ToHsl } from './hslToRgb';
//方向と距離
const dirctionDigit=(direction, distance)=>{
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
		case "right_bottom":
			destTopLeft = distance;
			destTopRight = distance * -1;
			destBottomLeft = distance * -1;
			destBottomRight = distance;
			break;
		case "top":
			destTopLeft = 0;
			destTopRight = 0;
			destBottomLeft = distance * -1;
			destBottomRight = distance;
			break;
	}
	return(
		{
			topLeft: destTopLeft,
			topRight: destTopRight,
			bottomLeft: destBottomLeft,
			bottmRight: destBottomRight
		}
	)
}

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
		newDirection,
		clayDirection,
		embos,
		opacity,
		depth,
		bdBlur,
		expand,
		boxShadowStyle,
		glassblur,
		glassopa,
		hasOutline,
		backgroundColor,
		className,
	} = attributes;

	useEffect( () => {
		if(renderFlgRef.current){
			if(className==='is-style-newmor' || className==='is-style-claymor' || className==='is-style-glassmor'){
				//バックグランドカラーの設定がないときはデフォルトカラーで影をつける
				const baseColor=blockProps.style.backgroundColor===undefined ? '#dddfe4' : blockProps.style.backgroundColor;
				
				//ニューモフィズム
				if(className==='is-style-newmor'){
					//ボタン背景色のHSL値
					const hslValue = rgb16ToHsl(baseColor);
					//影の明るさを変更
					const lightVal = (hslValue.lightness + intensity) < 100 ? hslValue.lightness + intensity :100;
					const darkVal = (hslValue.lightness - intensity) > 0 ? hslValue.lightness - intensity : 0;
					const lightValue = hslToRgb16(hslValue.hue, hslValue.saturation, lightVal);
					const darkValue = hslToRgb16(hslValue.hue, hslValue.saturation, darkVal);
					//boxshadowの生成
					//立体の方向
					const dircObj = dirctionDigit(newDirection, distance)
					const ShadowStyle = embos === 'swell' ? { style: {
						boxShadow: `${dircObj.topLeft}px ${dircObj.topRight}px ${blur}px ${darkValue}, ${dircObj.bottomLeft}px ${dircObj.bottmRight}px ${blur}px ${lightValue}`
					}} : { style: {
						boxShadow: `inset ${dircObj.topLeft}px ${dircObj.topRight}px ${blur}px ${darkValue}, inset ${dircObj.bottomLeft}px ${dircObj.bottmRight}px ${blur}px ${lightValue}`
					}}
					
					//attributesに保存
					setAttributes({boxShadowStyle: ShadowStyle})
				}

				//クレイモーフィズム
				else if(className==='is-style-claymor'){
					const rgbValue=HexToRGB(baseColor)
					const outsetObj = dirctionDigit(clayDirection, expand)
					const insetObj = dirctionDigit(clayDirection, depth)
					const claymorStyle={style:
						{ 
							boxShadow: `${outsetObj.topLeft}px ${outsetObj.bottmRight}px ${expand*2}px 0px rgba(${rgbValue.red}, ${rgbValue.green}, ${rgbValue.blue}, 0.5), inset ${insetObj.topRight}px ${insetObj.bottomLeft}px 16px 0px rgba(${rgbValue.red}, ${rgbValue.green}, ${rgbValue.blue}, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)`,
							backgroundColor: `rgba(255, 255, 255, ${opacity})`,
							backdropFilter: `blur(${bdBlur}px)`
						}
					}
					//attributesに保存
					setAttributes({boxShadowStyle:claymorStyle})
				}

				//グラスモーフィズム
				else if(className==='is-style-glassmor'){
					const rgbValue=HexToRGB(baseColor)
					let glassmorStyle={style:
						{ 
							backgroundColor: `rgba( ${rgbValue.red}, ${rgbValue.green}, ${rgbValue.blue}, ${glassopa} )`,
							boxShadow: `0 8px 32px 0 rgba( 31, 38, 135, 0.37 )`,
							backdropFilter: `blur( ${glassblur}px )`,
							WebkitBackdropFilter: `blur( ${glassblur}px )`,
						}
					}
					if( hasOutline ){
						glassmorStyle.style.border = '1px solid rgba( 255, 255, 255, 0.18 )'
					}
					//attributesに保存
					setAttributes({boxShadowStyle:glassmorStyle})
				}
			}
			else{
				//スタイルを削除
				setAttributes({boxShadowStyle:undefined})
			}
		}else{
			renderFlgRef.current = true
		}
	}, [className,backgroundColor,blur,intensity,distance,opacity,depth,expand, bdBlur,newDirection,clayDirection,hasOutline,embos,glassblur,glassopa] );

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
									selected={ newDirection }
									options={ [
										{ value: 'top_left' },
										{ value: 'top_right' },
										{ value: 'bottom_left' },
										{ value: 'bottom_right' },
									] }
									onChange={ ( changeOption ) => {setAttributes({newDirection: changeOption});}
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
			{ className==='is-style-claymor' &&
				<InspectorControls __experimentalGroup="border">
					<PanelBody title="クレイモフィズム設定" initialOpen={ false } className="btn_design_ctrl">
					<RangeControl
							value={ opacity }
							label="Opacity"
							max={1}
							min={0}
							step={.1}
							onChange={(val) => setAttributes({opacity:val})}
							withInputField={ false }
						/>
						<RangeControl
							value={ depth }
							label="Depth"
							max={20}
							min={0}
							onChange={(val) => setAttributes({depth:val})}
							withInputField={ false }
						/>
						<RangeControl
							value={ expand }
							label="Expand"
							max={50}
							min={0}
							onChange={(val) => setAttributes({expand:val})}
							withInputField={ false }
						/>
						<RangeControl
							value={ bdBlur }
							label="Background Blur"
							max={10}
							min={0}
							onChange={(val) => setAttributes({bdBlur:val})}
							withInputField={ false }
						/>
						<div className="light_direction claymor">
							<RadioControl
								selected={ clayDirection }
								options={ [
									{ value: 'right_bottom' },
									{ value: 'top_right' },
									{ value: 'top' },
								] }
								onChange={ ( changeOption ) => {setAttributes({clayDirection: changeOption});}
								}	
							/>
						</div>
					</PanelBody>
				</InspectorControls>
			}

			{ className==='is-style-glassmor' &&
				<InspectorControls __experimentalGroup="border">
					<PanelBody title="グラスモフィズム設定" initialOpen={ false } className="btn_design_ctrl">
					<RangeControl
							value={ glassblur }
							label="Glass blur"
							max={20}
							min={0}
							onChange={(val) => setAttributes({glassblur:val})}
							withInputField={ false }
						/>
						<RangeControl
							value={ glassopa }
							label="Glass Opacity"
							max={1}
							min={0}
							step={.1}
							onChange={(val) => setAttributes({glassopa:val})}
							withInputField={ false }
						/>
						<fieldset>
							<ToggleControl
								label="Show outline"
								checked={ hasOutline }
								onChange={ () => {
									setAttributes( { hasOutline: !hasOutline } )
								}}
							/>
						</fieldset>
						
						
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
