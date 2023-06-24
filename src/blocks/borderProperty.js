import styled, { css } from 'styled-components';

const BorderProperty = (borderObj) => {
  if (borderObj) {
    let keys = ['top', 'bottom', 'left', 'right'];
    let ret_prop;
    let doesKeyExist = keys.some(key => key in borderObj);
    if (doesKeyExist) {

    } else {
      ret_prop = css`
        border: ${borderObj.width} ${borderObj.style} ${borderObj.color}
      `
    }
  } else {
    return null;
  }


}
export default BorderProperty