!function(){"use strict";var t,e={2174:function(t,e,n){n.d(e,{Z:function(){return i}});var o=n(9307);function i(t){const{position:e,isResizing:n}=t,[i,r]=(0,o.useState)(e),[c,l]=(0,o.useState)(!1),[a,s]=(0,o.useState)({x:0,y:0});return(0,o.useEffect)((()=>{r(e)}),[e]),(0,o.createElement)("div",{className:"draggablebox",style:{width:"fit-content",height:"fit-content"},onMouseDown:t=>{l(!0),s({x:t.clientX,y:t.clientY})},onMouseMove:e=>{if(!c||n)return;const o=e.clientX-a.x,l=e.clientY-a.y,u={x:i.x+o,y:i.y+l};r(u),s({x:e.clientX,y:e.clientY}),t.onPositionChange(u)},onMouseUp:()=>{l(!1)},onMouseLeave:()=>{l(!1)}},t.children)}},6113:function(t,e,n){n.d(e,{Z:function(){return a}});var o=n(9307),i=n(5736),r=n(2175),c=n(5609),l=n(2174);function a(t){const e=(0,r.useInnerBlocksProps)({},{templateLock:!1}),{attributes:n,setAttributes:a}=t,{position:s,unit_x:u,unit_y:f}=n,p={x:`${s.x}${u}`,y:`${s.y}${f}`},d={style:{width:"fit-content",height:"fit-content",transform:`translate(${s.x}${u}, ${s.y}${f})`}};return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(r.InspectorControls,null,(0,o.createElement)(c.PanelBody,{title:(0,i.__)("Moving distance","itmar_block_collections"),initialOpen:!0},(0,o.createElement)(c.PanelRow,{className:"distance_row"},(0,o.createElement)(c.__experimentalUnitControl,{dragDirection:"e",onChange:t=>(t=>{if(""===t){const t={...s,x:0};a({position:t})}else{const e=t.match(/(-*[0-9]+)([^0-9]+)/),n={...s,x:parseInt(e[1])};a({position:n}),a({unit_x:e[2]})}})(t),label:(0,i.__)("Lateral direction","itmar_block_collections"),value:p.x}),(0,o.createElement)(c.__experimentalUnitControl,{dragDirection:"e",onChange:t=>(t=>{if(""===t){const t={...s,y:0};a({position:t})}else{const e=t.match(/(-*[0-9]+)([^0-9]+)/),n={...s,y:parseInt(e[1])};a({position:n}),a({unit_y:e[2]})}})(t),label:(0,i.__)("Longitudinal direction","itmar_block_collections"),value:p.y})),(0,o.createElement)(c.PanelRow,{className:"reset_row"},(0,o.createElement)(c.Button,{variant:"secondary",onClick:()=>(a({position:{x:0,y:0}}),void a({unit_x:"px",unit_y:"px"}))},(0,i.__)("Reset","itmar_block_collections"))))),(0,o.createElement)("div",(0,r.useBlockProps)(d),(0,o.createElement)(l.Z,{position:s,onPositionChange:t=>a({position:t})},(0,o.createElement)("div",e))))}},3998:function(t,e,n){var o=n(5736),i=n(4981),r=n(6113),c=n(472),l=n(7969);(0,i.registerBlockType)(l.u2,{description:(0,o.__)("It is a block that has a function to adjust the placement by dragging.","itmar_block_collections"),edit:r.Z,save:c.Z})},472:function(t,e,n){n.d(e,{Z:function(){return r}});var o=n(9307),i=n(2175);function r(t){let{attributes:e}=t;const{position:n}=e,r={style:{width:"fit-content",height:"fit-content",transform:`translate(${n.x}px, ${n.y}px)`}},c=i.useBlockProps.save(r);return(0,o.createElement)(o.Fragment,null,(0,o.createElement)("div",c,(0,o.createElement)(i.InnerBlocks.Content,null)))}},2175:function(t){t.exports=window.wp.blockEditor},4981:function(t){t.exports=window.wp.blocks},5609:function(t){t.exports=window.wp.components},9307:function(t){t.exports=window.wp.element},5736:function(t){t.exports=window.wp.i18n},7969:function(t){t.exports=JSON.parse('{"u2":"itmar/draggable-box"}')}},n={};function o(t){var i=n[t];if(void 0!==i)return i.exports;var r=n[t]={exports:{}};return e[t](r,r.exports,o),r.exports}o.m=e,t=[],o.O=function(e,n,i,r){if(!n){var c=1/0;for(u=0;u<t.length;u++){n=t[u][0],i=t[u][1],r=t[u][2];for(var l=!0,a=0;a<n.length;a++)(!1&r||c>=r)&&Object.keys(o.O).every((function(t){return o.O[t](n[a])}))?n.splice(a--,1):(l=!1,r<c&&(c=r));if(l){t.splice(u--,1);var s=i();void 0!==s&&(e=s)}}return e}r=r||0;for(var u=t.length;u>0&&t[u-1][2]>r;u--)t[u]=t[u-1];t[u]=[n,i,r]},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,{a:e}),e},o.d=function(t,e){for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){var t={177:0,942:0};o.O.j=function(e){return 0===t[e]};var e=function(e,n){var i,r,c=n[0],l=n[1],a=n[2],s=0;if(c.some((function(e){return 0!==t[e]}))){for(i in l)o.o(l,i)&&(o.m[i]=l[i]);if(a)var u=a(o)}for(e&&e(n);s<c.length;s++)r=c[s],o.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return o.O(u)},n=self.webpackChunkblock_collections=self.webpackChunkblock_collections||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var i=o.O(void 0,[942],(function(){return o(3998)}));i=o.O(i)}();
//# sourceMappingURL=index.js.map