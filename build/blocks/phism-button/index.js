/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/phism-button/edit.js":
/*!*****************************************!*\
  !*** ./src/blocks/phism-button/edit.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Edit; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/phism-button/editor.scss");
/* harmony import */ var _hslToRgb__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hslToRgb */ "./src/blocks/phism-button/hslToRgb.js");








function Edit(props) {
  const renderFlgRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const {
    attributes,
    setAttributes
  } = props;
  let blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)();
  const {
    btnContent,
    btnalign,
    blur,
    intensity,
    distance,
    direction,
    embos,
    boxShadowStyle,
    className
  } = attributes;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (renderFlgRef.current) {
      if (className === 'is-style-newmor') {
        //バックグランドカラーの設定がないときはデフォルトカラーで影をつける
        if (blockProps.style.backgroundColor === undefined) {
          blockProps.style.backgroundColor = '#dddfe4';
        }
        //ボタン背景色のHSL値
        const hslValue = (0,_hslToRgb__WEBPACK_IMPORTED_MODULE_5__.rgb16ToHsl)(blockProps.style.backgroundColor);
        //影の明るさを変更
        const lightVal = hslValue.lightness + intensity < 100 ? hslValue.lightness + intensity : 100;
        const darkVal = hslValue.lightness - intensity > 0 ? hslValue.lightness - intensity : 0;
        const lightValue = (0,_hslToRgb__WEBPACK_IMPORTED_MODULE_5__.hslToRgb16)(hslValue.hue, hslValue.saturation, lightVal);
        const darkValue = (0,_hslToRgb__WEBPACK_IMPORTED_MODULE_5__.hslToRgb16)(hslValue.hue, hslValue.saturation, darkVal);
        //boxshadowの生成
        let destTopLeft, destTopRight, destBottomLeft, destBottomRight;
        switch (direction) {
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
            destBottomLeft = distance;
            destBottomRight = distance * -1;
            break;
          case "bottom_right":
            destTopLeft = distance * -1;
            destTopRight = distance * -1;
            destBottomLeft = distance;
            destBottomRight = distance;
            break;
        }
        const ShadowStyle = embos === 'swell' ? {
          style: {
            boxShadow: `${destTopLeft}px ${destTopRight}px ${blur}px ${darkValue}, ${destBottomLeft}px ${destBottomRight}px ${blur}px ${lightValue}`
          }
        } : {
          style: {
            boxShadow: `inset ${destTopLeft}px ${destTopRight}px ${blur}px ${darkValue}, inset ${destBottomLeft}px ${destBottomRight}px ${blur}px ${lightValue}`
          }
        };

        //attributesに保存
        setAttributes({
          boxShadowStyle: ShadowStyle
        });
      } else {
        //スタイルを削除
        setAttributes({
          boxShadowStyle: {}
        });
      }
    } else {
      renderFlgRef.current = true;
    }
  }, [className, blur, intensity, distance, direction, embos]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, className === 'is-style-newmor' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
    __experimentalGroup: "border"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: "\u30CB\u30E5\u30FC\u30E2\u30D5\u30A3\u30BA\u30E0\u8A2D\u5B9A",
    initialOpen: false,
    className: "btn_design_ctrl"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    value: distance,
    label: "Distanse",
    max: 50,
    min: 0,
    onChange: val => setAttributes({
      distance: val
    }),
    withInputField: false
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    value: intensity,
    label: "Intensity",
    max: 100,
    min: 0,
    onChange: val => setAttributes({
      intensity: val
    }),
    withInputField: false
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RangeControl, {
    value: blur,
    label: "Blur",
    max: 20,
    min: 0,
    onChange: val => setAttributes({
      blur: val
    }),
    withInputField: false
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelRow, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "light_direction"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RadioControl, {
    selected: direction,
    options: [{
      value: 'top_left'
    }, {
      value: 'top_right'
    }, {
      value: 'bottom_left'
    }, {
      value: 'bottom_right'
    }],
    onChange: changeOption => {
      setAttributes({
        direction: changeOption
      });
    }
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "embos"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.RadioControl, {
    selected: embos,
    options: [{
      value: 'swell'
    }, {
      value: 'dent'
    }],
    onChange: changeOption => {
      setAttributes({
        embos: changeOption
      });
    }
  }))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)(boxShadowStyle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
    tagName: "p",
    onChange: newContent => setAttributes({
      btnContent: newContent
    }),
    allowedFormats: ['core/bold', 'core/italic', 'core/text-color'],
    value: btnContent,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Write your text...'),
    style: {
      textAlign: "center"
    }
  })));
}

/***/ }),

/***/ "./src/blocks/phism-button/hslToRgb.js":
/*!*********************************************!*\
  !*** ./src/blocks/phism-button/hslToRgb.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hslToRgb16": function() { return /* binding */ hslToRgb16; },
/* harmony export */   "rgb16ToHsl": function() { return /* binding */ rgb16ToHsl; }
/* harmony export */ });
function hslToRgb16(hue, saturation, lightness) {
  var result = false;
  if ((hue || hue === 0) && hue <= 360 && (saturation || saturation === 0) && saturation <= 100 && (lightness || lightness === 0) && lightness <= 100) {
    var red = 0,
      green = 0,
      blue = 0,
      q = 0,
      p = 0,
      hueToRgb;
    hue = Number(hue) / 360;
    saturation = Number(saturation) / 100;
    lightness = Number(lightness) / 100;
    if (saturation === 0) {
      red = lightness;
      green = lightness;
      blue = lightness;
    } else {
      hueToRgb = function (p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) {
          p += (q - p) * 6 * t;
        } else if (t < 1 / 2) {
          p = q;
        } else if (t < 2 / 3) {
          p += (q - p) * (2 / 3 - t) * 6;
        }
        return p;
      };
      if (lightness < 0.5) {
        q = lightness * (1 + saturation);
      } else {
        q = lightness + saturation - lightness * saturation;
      }
      p = 2 * lightness - q;
      red = hueToRgb(p, q, hue + 1 / 3);
      green = hueToRgb(p, q, hue);
      blue = hueToRgb(p, q, hue - 1 / 3);
    }
    result = `#${Math.round(red * 255).toString(16)}${Math.round(green * 255).toString(16)}${Math.round(blue * 255).toString(16)}`;
  }
  return result;
}
;
function rgb16ToHsl(strRgb16) {
  let rgb = strRgb16.match(/\#([a-fA-F0-9]{2})([a-fA-Z0-9]{2})([a-fA-F0-9]{2})/);
  let red = rgb[1];
  let green = rgb[2];
  let blue = rgb[3];
  let result = false;
  if ((red || red === 0) && String(red).match(/^[0-9a-f]{2}$/i) && (green || green === 0) && String(green).match(/^[0-9a-f]{2}$/i) && (blue || blue === 0) && String(blue).match(/^[0-9a-f]{2}$/i)) {
    let hue = 0,
      saturation = 0,
      lightness = 0,
      max = 0,
      min = 0,
      diff = 0;
    red = parseInt(red, 16) / 255;
    green = parseInt(green, 16) / 255;
    blue = parseInt(blue, 16) / 255;
    max = Math.max(red, green, blue);
    min = Math.min(red, green, blue);
    lightness = (max + min) / 2;
    if (max !== min) {
      diff = max - min;
      if (lightness > 0.5) {
        saturation = diff / (2 - max - min);
      } else {
        saturation = diff / (max + min);
      }
      if (max === red) {
        hue = (green - blue) / diff;
      } else if (max === green) {
        hue = 2 + (blue - red) / diff;
      } else {
        hue = 4 + (red - green) / diff;
      }
      hue /= 6;
    }
    result = {
      hue: Math.round(hue * 360),
      saturation: Math.round(saturation * 100),
      lightness: Math.round(lightness * 100)
    };
  }
  return result;
}
;

/***/ }),

/***/ "./src/blocks/phism-button/index.js":
/*!******************************************!*\
  !*** ./src/blocks/phism-button/index.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/phism-button/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/phism-button/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/blocks/phism-button/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/blocks/phism-button/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ }),

/***/ "./src/blocks/phism-button/save.js":
/*!*****************************************!*\
  !*** ./src/blocks/phism-button/save.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ save; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);


function save(_ref) {
  let {
    attributes
  } = _ref;
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save();
  const {
    btnContent,
    boxShadowStyle
  } = attributes;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save(boxShadowStyle), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText.Content, {
    tagName: "p",
    value: btnContent,
    style: {
      textAlign: "center"
    }
  }));
}

/***/ }),

/***/ "./src/blocks/phism-button/editor.scss":
/*!*********************************************!*\
  !*** ./src/blocks/phism-button/editor.scss ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/phism-button/style.scss":
/*!********************************************!*\
  !*** ./src/blocks/phism-button/style.scss ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/blocks/phism-button/block.json":
/*!********************************************!*\
  !*** ./src/blocks/phism-button/block.json ***!
  \********************************************/
/***/ (function(module) {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"itmar/phism-button","version":"0.1.0","title":"Phism Button","category":"widgets","icon":"editor-removeformatting","description":"〇〇フィズムのデザインを作出できるボタンのブロックです","attributes":{"btnalign":{"type":"string","default":"none"},"btnContent":{"type":"string","source":"html","selector":"p"},"distance":{"type":"number","default":5},"intensity":{"type":"number","default":5},"blur":{"type":"number","default":5},"direction":{"type":"string","default":"top_left"},"embos":{"type":"string","default":"swell"},"boxShadowStyle":{"type":"object"}},"styles":[{"name":"default","label":"Default","isDefault":true},{"name":"newmor","label":"Neumorphism"}],"example":{},"supports":{"color":{"gradients":true,"__experimentalDefaultControls":{"background":true,"text":true}},"spacing":{"blockGap":false,"padding":true,"margin":true},"__experimentalBorder":{"color":true,"radius":true,"style":true,"width":true,"__experimentalDefaultControls":{"color":true,"radius":true,"style":true,"width":true}},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true,"__experimentalLetterSpacing":true,"__experimentalDefaultControls":{"fontSize":true}},"html":false},"textdomain":"phism-button","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"blocks/phism-button/index": 0,
/******/ 			"blocks/phism-button/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkblock_collections"] = self["webpackChunkblock_collections"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["blocks/phism-button/style-index"], function() { return __webpack_require__("./src/blocks/phism-button/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map