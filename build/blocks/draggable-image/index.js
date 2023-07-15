!function(){"use strict";var e,t={545:function(){var e=window.wp.blocks,t=window.wp.element,n=window.wp.i18n,o=window.wp.blockEditor,i=window.wp.components;function r(e){const{position:n,isResizing:o}=e,[i,r]=(0,t.useState)(n),[l,a]=(0,t.useState)(!1),[c,s]=(0,t.useState)({x:0,y:0});return(0,t.createElement)("div",{className:"draggablebox",style:{width:"fit-content",height:"fit-content"},onMouseDown:e=>{a(!0),s({x:e.clientX,y:e.clientY})},onMouseMove:t=>{if(!l||o)return;const n=t.clientX-c.x,a=t.clientY-c.y;r((e=>({x:e.x+n,y:e.y+a}))),s({x:t.clientX,y:t.clientY}),e.onPositionChange(i)},onMouseUp:()=>{a(!1)},onMouseLeave:()=>{a(!1)}},e.children)}var l=JSON.parse('{"u2":"itmar/draggable-image"}');(0,e.registerBlockType)(l.u2,{edit:function(e){const{attributes:l,setAttributes:a}=e,{position:c,unit_x:s,unit_y:u}=l,p={x:`${c.x}${s}`,y:`${c.y}${u}`},f={style:{width:"fit-content",height:"fit-content",transform:`translate(${c.x}${s}, ${c.y}${u})`}};return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(o.InspectorControls,null,(0,t.createElement)(i.PanelBody,{title:(0,n.__)("移動距離","cb_location"),initialOpen:!0},(0,t.createElement)(i.PanelRow,{className:"distance_row"},(0,t.createElement)(i.__experimentalUnitControl,{dragDirection:"e",onChange:e=>(e=>{if(""===e){const e={...c,x:0};a({position:e})}else{const t=e.match(/(-*[0-9]+)([^0-9]+)/),n={...c,x:parseInt(t[1])};a({position:n}),a({unit_x:t[2]})}})(e),label:"横方向",value:p.x}),(0,t.createElement)(i.__experimentalUnitControl,{dragDirection:"e",onChange:e=>(e=>{if(""===e){const e={...c,y:0};a({position:e})}else{const t=e.match(/(-*[0-9]+)([^0-9]+)/),n={...c,y:parseInt(t[1])};a({position:n}),a({unit_y:t[2]})}})(e),label:"縦方向",value:p.y})),(0,t.createElement)(i.PanelRow,{className:"reset_row"},(0,t.createElement)(i.Button,{variant:"secondary",onClick:()=>(a({position:{x:0,y:0}}),void a({unit_x:"px",unit_y:"px"}))},"リセット")))),(0,t.createElement)("div",(0,o.useBlockProps)(f),(0,t.createElement)(r,{position:c,onPositionChange:e=>a({position:e})},(0,t.createElement)(o.InnerBlocks,{template:[["core/image",{}]],templateLock:"all"}))))},save:function(e){let{attributes:n}=e;const{position:i}=n,r={style:{width:"fit-content",height:"fit-content",transform:`translate(${i.x}px, ${i.y}px)`}},l=o.useBlockProps.save(r);return(0,t.createElement)(t.Fragment,null,(0,t.createElement)("div",l,(0,t.createElement)(o.InnerBlocks.Content,null)))}})}},n={};function o(e){var i=n[e];if(void 0!==i)return i.exports;var r=n[e]={exports:{}};return t[e](r,r.exports,o),r.exports}o.m=t,e=[],o.O=function(t,n,i,r){if(!n){var l=1/0;for(u=0;u<e.length;u++){n=e[u][0],i=e[u][1],r=e[u][2];for(var a=!0,c=0;c<n.length;c++)(!1&r||l>=r)&&Object.keys(o.O).every((function(e){return o.O[e](n[c])}))?n.splice(c--,1):(a=!1,r<l&&(l=r));if(a){e.splice(u--,1);var s=i();void 0!==s&&(t=s)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[n,i,r]},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={468:0,885:0};o.O.j=function(t){return 0===e[t]};var t=function(t,n){var i,r,l=n[0],a=n[1],c=n[2],s=0;if(l.some((function(t){return 0!==e[t]}))){for(i in a)o.o(a,i)&&(o.m[i]=a[i]);if(c)var u=c(o)}for(t&&t(n);s<l.length;s++)r=l[s],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(u)},n=self.webpackChunkblock_collections=self.webpackChunkblock_collections||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var i=o.O(void 0,[885],(function(){return o(545)}));i=o.O(i)}();