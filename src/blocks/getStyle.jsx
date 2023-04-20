
export const getBorderRadius = (BRval) =>{
  //BorderRadiusのスタイル取得
  let borderRadiusStyleObj={};
  
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
  return borderRadiusStyleObj 
}

export const getSpaceStyle = (marginval, paddingval) =>{
  //marginのスタイル取得
  let boxStyleObj={};
  if(marginval){
    Object.entries( marginval )
    .map( margin => {
        let property=`margin${ margin[0].charAt(0).toUpperCase() + margin[0].slice(1) }`
        boxStyleObj[property]= margin[1]
    } );
  }
  
  if(paddingval){
    Object.entries( paddingval )
    .map( padding => {
        let property=`padding${ padding[0].charAt(0).toUpperCase() + padding[0].slice(1) }`
        boxStyleObj[property]= padding[1]
    } )
  }
  
  return boxStyleObj;
}

export default ({attributes}) =>{
  const {
		imageUrl,
		showCaption,
		imageCaption,
		borderRadiusValues,
		marginValues,
		paddingValues 
	}=attributes

  return(
    <figure style={ getSpaceStyle(marginValues, paddingValues) } >
      <img
        src={ imageUrl }
        className='image'
        alt="アップロード画像"
        style={ getBorderRadius(borderRadiusValues) } 
      />
      { showCaption && 
        <figcaption className='block-image-caption'>
          { imageCaption }
        </figcaption>	
      }				
    </figure>
  )
} 
