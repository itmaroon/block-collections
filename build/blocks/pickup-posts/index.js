!function(){"use strict";var e,t={7864:function(){var e=window.wp.blocks,t=window.wp.element,n=window.wp.data,o=window.wp.i18n,r=(window.wp.date,window.wp.blockEditor),l=window.wp.components;const{serverSideRender:a}=wp;var i=JSON.parse('{"u2":"itmar/pickup-posts"}');(0,e.registerBlockType)(i.u2,{example:{attributes:{message:"Pickup Posts"}},edit:function(e){let{attributes:i,setAttributes:c}=e;const s=(0,r.useBlockProps)(),{numberOfItems:u,displayDate:p,displayThumbnail:m}=i;return(0,n.useSelect)((e=>e("core").getEntityRecords("postType","post",{per_page:u,_embed:!0})),[u]),(0,t.createElement)(t.Fragment,null,(0,t.createElement)(r.InspectorControls,null,(0,t.createElement)(l.PanelBody,{title:(0,o.__)("Content Settings","block-location")},(0,t.createElement)(l.PanelRow,null,(0,t.createElement)(l.QueryControls,{numberOfItems:u,onNumberOfItemsChange:e=>c({numberOfItems:e}),minItems:1,maxItems:10})),(0,t.createElement)(l.PanelRow,null,(0,t.createElement)(l.ToggleControl,{label:(0,o.__)("Show Featured Image","block-location"),checked:m,onChange:()=>c({displayThumbnail:!m})})),(0,t.createElement)(l.PanelRow,null,(0,t.createElement)(l.ToggleControl,{label:(0,o.__)("Show Date","block-location"),checked:p,onChange:()=>c({displayDate:!p})})))),(0,t.createElement)("div",s,(0,t.createElement)(l.Disabled,null,(0,t.createElement)(a,{block:"itmar/pickup-posts",attributes:i}))))}})}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var l=n[e]={exports:{}};return t[e](l,l.exports,o),l.exports}o.m=t,e=[],o.O=function(t,n,r,l){if(!n){var a=1/0;for(u=0;u<e.length;u++){n=e[u][0],r=e[u][1],l=e[u][2];for(var i=!0,c=0;c<n.length;c++)(!1&l||a>=l)&&Object.keys(o.O).every((function(e){return o.O[e](n[c])}))?n.splice(c--,1):(i=!1,l<a&&(a=l));if(i){e.splice(u--,1);var s=r();void 0!==s&&(t=s)}}return t}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[n,r,l]},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={499:0,739:0};o.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,l,a=n[0],i=n[1],c=n[2],s=0;if(a.some((function(t){return 0!==e[t]}))){for(r in i)o.o(i,r)&&(o.m[r]=i[r]);if(c)var u=c(o)}for(t&&t(n);s<a.length;s++)l=a[s],o.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return o.O(u)},n=self.webpackChunkblock_collections=self.webpackChunkblock_collections||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var r=o.O(void 0,[739],(function(){return o(7864)}));r=o.O(r)}();