import { __experimentalBorderBoxControl as BorderBoxControl } from '@wordpress/components';

const edit = props => {
  const{
    setAttributes,attributes,label
  }=props

  const resetValues =  {
		top: '0px',
		left: '0px',
		right: '0px',
		bottom: '0px',
	}
  
  return(
    <BorderBoxControl
      colors={[
        {
          color: '#72aee6',
          name: 'Blue 20'
        },
        {
          color: '#3582c4',
          name: 'Blue 40'
        },
        {
          color: '#e65054',
          name: 'Red 40'
        },
        {
          color: '#8a2424',
          name: 'Red 70'
        },
        {
          color: '#f2d675',
          name: 'Yellow 10'
        },
        {
          color: '#bd8600',
          name: 'Yellow 40'
        }
      ]}
      value={ attributes }
      onChange={ value => setAttributes( { borderBoxValues: value } ) }	// 保存処理
      popoverPlacement="left-end"
      size="__unstable-large"
      style={{width:"100%"}}
    />
  );
}

export default edit