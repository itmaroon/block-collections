import { __experimentalBoxControl as BoxControl } from '@wordpress/components'

const edit = props => {
  const{
    setAttributes,attributes,label,sizeName
  }=props

  const resetValues =  {
		top: '0px',
		left: '0px',
		right: '0px',
		bottom: '0px',
	}
  
  return(
    <BoxControl
      label={label}	// ラベル
      values={ attributes }
      onChange={ value => setAttributes( { [sizeName]: value } ) }	// 保存処理
      allowReset={ true }	// リセットの可否
			resetValues={ resetValues }	// リセット時の値
    />
  );
}

export default edit