!function(){"use strict";var e={3635:function(e,t,r){r.d(t,{mA:function(){return n}});const o=e=>e.charAt(0).toUpperCase()+e.slice(1);function n(e){if(e){let t=null;if(["top","bottom","left","right"].some((t=>t in e))){let r={};for(let t in e){const n=e[t];if(String(n.width||"").match(/^0/))continue;const l=n.style||"solid";r[`border${o(t)}`]=`${n.width} ${l} ${n.color}`}return t=r,t}{if(String(e.width||"").match(/^0/))return null;const r=e.style||"solid";return t={border:`${e.width} ${r} ${e.color}`},t}}return null}},2175:function(e){e.exports=window.wp.blockEditor},5609:function(e){e.exports=window.wp.components},4333:function(e){e.exports=window.wp.compose},9307:function(e){e.exports=window.wp.element},2694:function(e){e.exports=window.wp.hooks},5736:function(e){e.exports=window.wp.i18n},7462:function(e,t,r){function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},o.apply(this,arguments)}r.d(t,{Z:function(){return o}})}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var l=t[o]={exports:{}};return e[o](l,l.exports,r),l.exports}r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,{a:t}),t},r.d=function(e,t){for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e=r(7462),t=r(9307),o=r(5736),n=r(2694),l=r(4333),i=r(2175),a=r(5609),s=r(3635);const c=["core/paragraph","core/list","core/image","core/quote","core/table"];(0,n.addFilter)("blocks.registerBlockType","itmar-ex-block/add-setting",(function(e,t){if(c.includes(t)){let r={},n=[];return r={margin_val:{type:"object",default:{top:"1em",left:"1em",bottom:"1em",right:"1em"}},padding_val:{type:"object",default:{top:"1em",left:"1em",bottom:"1em",right:"1em"}}},"core/paragraph"!==t&&"core/list"!==t&&"core/quote"!==t||(r={...r,lineHeight:{type:"number",default:1.6}}),"core/list"!==t&&"core/quote"!==t&&"core/table"!==t||(r={...r,radius_list:{type:"object",default:{topLeft:"0px",topRight:"0px",bottomRight:"0px",bottomLeft:"0px",value:"0px"}},border_list:{type:"object"}}),"core/list"===t&&(r={...r,list_type:{type:"string",default:"UL"}}),"core/table"===t&&(n=[...e.styles||[],{name:"gradient",label:(0,o.__)("Gradient","block-collections"),isDefault:!1}]),{...e,attributes:{...e.attributes,...r},styles:n.length?n:e.styles}}return e}));const u=(0,l.createHigherOrderComponent)((e=>{const r={top:"1em",left:"1em",right:"1em",bottom:"1em"},o=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"},{value:"%",label:"%"}];return n=>{if((n.attributes.className?n.attributes.className.split(" "):[]).includes("itmar_ex_block")&&c.includes(n.name)){const{lineHeight:l,margin_val:s,padding_val:c,border_list:u,radius_list:m,width:p,height:d}=n.attributes,b=n.setAttributes;return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(e,n),(0,t.createElement)(i.InspectorControls,{group:"styles"},(0,t.createElement)(a.PanelBody,{title:"間隔設定",initialOpen:!1},(0,t.createElement)(a.__experimentalBoxControl,{label:"マージン設定",values:s,onChange:e=>b({margin_val:e}),units:o,allowReset:!0,resetValues:r}),(0,t.createElement)(a.__experimentalBoxControl,{label:"パティング設定",values:c,onChange:e=>b({padding_val:e}),units:o,allowReset:!0,resetValues:r})),("core/paragraph"===n.name||"core/list"===n.name||"core/quote"===n.name)&&(0,t.createElement)(t.Fragment,null,(0,t.createElement)(a.PanelBody,{title:"行間設定"},(0,t.createElement)(a.RangeControl,{value:l,label:"lineHeight",max:3,min:1,step:.1,onChange:e=>b({lineHeight:e}),withInputField:!0}))),("core/list"===n.name||"core/quote"===n.name||"core/table"===n.name)&&(0,t.createElement)(a.PanelBody,{title:"ボーダー設定",initialOpen:!1,className:"border_design_ctrl"},(0,t.createElement)(a.__experimentalBorderBoxControl,{colors:[{color:"#72aee6"},{color:"#000"},{color:"#fff"}],onChange:e=>b({border_list:e}),value:u}),(0,t.createElement)(i.__experimentalBorderRadiusControl,{values:m,onChange:e=>b({radius_list:"string"==typeof e?{value:e}:e})}))))}return(0,t.createElement)(e,n)}}),"withInspectorControl");(0,n.addFilter)("editor.BlockEdit","itmar-ex-block/with-inspector-control",u);const m=(0,l.createHigherOrderComponent)((r=>o=>{const{attributes:n,name:l,isValid:i,wrapperProps:a}=o;if((o.attributes.className?o.attributes.className.split(" "):[]).includes("itmar_ex_block")&&c.includes(l)&&i){const{lineHeight:i,margin_val:c,padding_val:u,radius_list:m,border_list:p}=n;let d={};if(d={margin:`${c.top} ${c.right} ${c.bottom} ${c.left}`,padding:`${u.top} ${u.right} ${u.bottom} ${u.left}`},"core/paragraph"!==l&&"core/list"!==l&&"core/quote"!==l||(d={...d,lineHeight:i}),"core/list"===l||"core/quote"===l){const e=m&&1===Object.keys(m).length?m.value:`${m&&m.topLeft||""} ${m&&m.topRight||""} ${m&&m.bottomRight||""} ${m&&m.bottomLeft||""}`,t=(0,s.mA)(p);d={...d,borderRadius:e,...t}}if("core/image"===l&&"center"===n.align&&(d={...d,margin:`${c.top} auto ${c.bottom}`}),"core/table"===l){const e=(0,s.mA)(p);d={...d,borderCollapse:"collapse",...e}}let b=a;return b={...b,style:{...b&&{...b.style},...d}},(0,t.createElement)(r,(0,e.Z)({},o,{wrapperProps:b}))}return(0,t.createElement)(r,o)}),"applyExtraAttributesInEditor");(0,n.addFilter)("editor.BlockListBlock","block-collections/extra-attributes-in-editor",m),(0,n.addFilter)("blocks.getSaveContent.extraProps","block-collections/-extra-attributes-in-front-end",((e,t,r)=>{if(e.className?.match(/itmar_ex_block/)&&c.includes(t.name)){const{lineHeight:o,margin_val:n,padding_val:l,radius_list:i,border_list:a}=r;let c={};if(c={margin:`${n.top} ${n.right} ${n.bottom} ${n.left}`,padding:`${l.top} ${l.right} ${l.bottom} ${l.left}`},"core/paragraph"!==t.name&&"core/list"!==t.name&&"core/quote"!==t.name||(c={...c,lineHeight:o}),"core/list"===t.name||"core/quote"===t.name){const e=i&&1===Object.keys(i).length?i.value:`${i&&i.topLeft||""} ${i&&i.topRight||""} ${i&&i.bottomRight||""} ${i&&i.bottomLeft||""}`,t=(0,s.mA)(a);c={...c,borderRadius:e,...t}}return"core/image"===t.name&&"center"===r.align&&(c={...c,margin:`${n.top} auto ${n.bottom}`}),Object.assign(e,{style:{...e.style,...c}})}return e}))}()}();
//# sourceMappingURL=gutenberg-ex.js.map