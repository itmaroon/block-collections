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
	MediaUpload, 
	MediaUploadCheck 
} from '@wordpress/block-editor';
import { __experimentalBorderRadiusControl as BorderRadiusControl } from '@wordpress/block-editor';
import  BorderControl from './borderControl';
import  BoxControl from './boxControl';
import { 
	Button,
	PanelBody, 
	PanelRow, 
	ToggleControl
} from '@wordpress/components';

import './editor.scss';


export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();

	//選択された画像の情報（alt 属性、URL、ID）を更新する関数
	const onSelectImage = ( media ) => {
		const media_ID = media.id;
		const imageUrl = media.url;
		const imageAlt = media.alt;
		const imageCaption = media.caption;
		setAttributes( {
			imageAlt: imageAlt, 
			imageUrl: imageUrl, 
			mediaID: media_ID ,
			imageCaption: imageCaption
		} );
	};

	//URLの配列から画像を生成
	const getImages = (url, caption) =>{
		
		//BorderRadiusのスタイル取得
		let borderRadiusStyleObj={};
		const BRval=attributes.borderRadiusValues;
		if(Object.keys( BRval ).length==1){
			Object.entries( BRval ).map( radius => {
				if ( radius[0] == 'value' ) {
					borderRadiusStyleObj = {borderRadius:radius[1]}
				}
			} )
		}else{
			Object.entries( BRval )
			.filter(radius => radius[0]!='value')
			.map( radius => {
					let property=`border${ radius[0].charAt(0).toUpperCase() + radius[0].slice(1) }Radius`
					borderRadiusStyleObj[property]= radius[1]
			} )
		}

		//marginのスタイル取得
		let boxStyleObj={};
		const marginval=attributes.marginValues;
		Object.entries( marginval )
		.map( margin => {
				let property=`margin${ margin[0].charAt(0).toUpperCase() + margin[0].slice(1) }`
				boxStyleObj[property]= margin[1]
		} );
		const paddingval=attributes.paddingValues;
		Object.entries( paddingval )
		.map( padding => {
				let property=`padding${ padding[0].charAt(0).toUpperCase() + padding[0].slice(1) }`
				boxStyleObj[property]= padding[1]
		} )

		return(
			<figure style={ boxStyleObj } >
				<img
					src={ url }
					className='image'
					alt="アップロード画像"
					style={ borderRadiusStyleObj } 
				/>
				{ attributes.showCaption && 
					<figcaption className='block-image-caption'>
						{caption}
					</figcaption>	
				}				
			</figure>
		);
	}
	//メディアライブラリを開くボタンをレンダリングする関数
	const getImageButton = ( open ) => {
		if(attributes.imageUrl) {
			return (
				<div
					onClick={ open }
					className="image-card"
				>
					{
						getImages(attributes.imageUrl, attributes.imageCaption)
					}
				</div>
				
			);
		}
		else {
			return (
				<div className="button-container">
					<Button 
						onClick={ open }
						className="button button-large"
					>
						画像をアップロード
					</Button>
				</div>
			);
		}
	};

	//画像を削除する（メディアをリセットする）関数
	const removeMedia = () => {
		setAttributes({
			mediaID: 0,
			imageUrl: "",
			imageAlt: "",
			imageCaption:"",
		});
	};

	
	const onCahngeBorderRadiusVal = (newBrVal)=>{
		setAttributes( { borderRadiusValues: typeof newBrVal==='string' ? {"value": newBrVal} : newBrVal } );
	}

	return (
		<>
			<InspectorControls>
				
				<PanelBody 
					title={ __( 'Image Settings', 'sw_location')}
					initialOpen={true}
				>
					<PanelRow>
						<ToggleControl
								label={ __( 'Show Caption', 'sw_location')}
								checked={ attributes.showCaption }
								onChange={ (val) => setAttributes({ showCaption: val }) }
							/>
					</PanelRow>
					<PanelRow>
						<BorderControl
							label='Border Size & Color'
							attributes={ attributes.borderBoxValues }
							setAttributes={setAttributes}
						/>
					</PanelRow>
					<PanelRow>
						<BorderRadiusControl
							 values={ attributes.borderRadiusValues }
							 onChange={ onCahngeBorderRadiusVal }	
						/>
					</PanelRow>
					<PanelRow>
						<BoxControl
							label='Margin Size'
							sizeName='marginValues'
							attributes={attributes.marginValues}
							setAttributes={setAttributes}
						/>
					</PanelRow>
					<PanelRow>
						<BoxControl
							label='Padding Size'
							sizeName='paddingValues'
							attributes={attributes.paddingValues}
							setAttributes={setAttributes}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<InspectorControls __experimentalGroup="border,dimensions">
			</InspectorControls>
			
			<div className { ...blockProps }>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ onSelectImage }
						allowedTypes={ ['image'] }
						value={ attributes.mediaID }
						render={ ({ open }) => getImageButton( open ) }
					/>
				</MediaUploadCheck>
				{ attributes.imageUrl!==""  && 
					<MediaUploadCheck>
						<Button 
							onClick={removeMedia} 
							variant="link"
							isDestructive 
							className="removeImage">画像を削除
						</Button>
					</MediaUploadCheck>
				}
			</div>
		</>
			
	);
}