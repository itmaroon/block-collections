!function(){"use strict";var n,t={7723:function(n,t,e){e.d(t,{Z:function(){return c}});var r=e(9307),o=e(5736),i=e(2175);function c(n){const{attributes:t,setAttributes:e}=n,c=(0,i.useBlockProps)(),{content:u}=t;return(0,r.createElement)("div",c,(0,r.createElement)(i.RichText,{tagName:"p",onChange:n=>{e({content:n})},allowedFormats:["core/bold","core/italic","core/link"],value:u,placeholder:(0,o.__)("Write your text...")}))}},8979:function(n,t,e){var r=e(4981),o=e(7723),i=e(3064),c=e(9932);(0,r.registerBlockType)(c.u2,{edit:o.Z,save:i.Z})},3064:function(n,t,e){e.d(t,{Z:function(){return i}});var r=e(9307),o=e(2175);function i(n){let{attributes:t}=n;const{content:e}=t,i=o.useBlockProps.save();return(0,r.createElement)("div",i,(0,r.createElement)(o.RichText.Content,{tagName:"p",value:e}))}},2175:function(n){n.exports=window.wp.blockEditor},4981:function(n){n.exports=window.wp.blocks},9307:function(n){n.exports=window.wp.element},5736:function(n){n.exports=window.wp.i18n},9932:function(n){n.exports=JSON.parse('{"u2":"itmar/swiper-masonry"}')}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}r.m=t,n=[],r.O=function(t,e,o,i){if(!e){var c=1/0;for(f=0;f<n.length;f++){e=n[f][0],o=n[f][1],i=n[f][2];for(var u=!0,a=0;a<e.length;a++)(!1&i||c>=i)&&Object.keys(r.O).every((function(n){return r.O[n](e[a])}))?e.splice(a--,1):(u=!1,i<c&&(c=i));if(u){n.splice(f--,1);var l=o();void 0!==l&&(t=l)}}return t}i=i||0;for(var f=n.length;f>0&&n[f-1][2]>i;f--)n[f]=n[f-1];n[f]=[e,o,i]},r.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(t,{a:t}),t},r.d=function(n,t){for(var e in t)r.o(t,e)&&!r.o(n,e)&&Object.defineProperty(n,e,{enumerable:!0,get:t[e]})},r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},function(){var n={273:0,911:0};r.O.j=function(t){return 0===n[t]};var t=function(t,e){var o,i,c=e[0],u=e[1],a=e[2],l=0;if(c.some((function(t){return 0!==n[t]}))){for(o in u)r.o(u,o)&&(r.m[o]=u[o]);if(a)var f=a(r)}for(t&&t(e);l<c.length;l++)i=c[l],r.o(n,i)&&n[i]&&n[i][0](),n[i]=0;return r.O(f)},e=self.webpackChunkblock_collections=self.webpackChunkblock_collections||[];e.forEach(t.bind(null,0)),e.push=t.bind(null,e.push.bind(e))}();var o=r.O(void 0,[911],(function(){return r(8979)}));o=r.O(o)}();
//# sourceMappingURL=index.js.map