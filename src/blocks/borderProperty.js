import { css } from 'styled-components';

const BorderProperty = (borderObj) => {
  if (borderObj) {//borderObjがundefinedでない
    let keys = ['top', 'bottom', 'left', 'right'];
    let ret_prop = null;
    let doesKeyExist = keys.some(key => key in borderObj);
    if (doesKeyExist) {//'top', 'bottom', 'left', 'right'が別設定
      let cssString = '';
      for (let side in borderObj) {
        const sideData = borderObj[side];
        const startsWithZero = String(sideData.width || '').match(/^0/);
        if (startsWithZero) {//widthが０ならCSS設定しない
          continue;
        }
        const border_style = sideData.style || 'solid';
        cssString += `border-${side}: ${sideData.width} ${border_style} ${sideData.color};\n`;
      }
      ret_prop = css`${cssString}`;
      return ret_prop;
    } else {//同一のボーダー
      const startsWithZero = String(borderObj.width || '').match(/^0/);
      if (startsWithZero) {//widthが０ならnullを返す
        return null;
      }
      const border_style = borderObj.style || 'solid';
      ret_prop = css`
      border: ${borderObj.width} ${border_style} ${borderObj.color}
      `
      return ret_prop;
    }
  } else {
    return null;
  }

}
export default BorderProperty