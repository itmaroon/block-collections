!function(){"use strict";var e,t={8:function(){var e=window.wp.blocks,t=window.wp.element,n=window.wp.i18n,o=window.wp.blockEditor,a=window.wp.components;function r(e,t,n){var o=!1;if((e||0===e)&&e<=360&&(t||0===t)&&t<=100&&(n||0===n)&&n<=100){var a,r=0,l=0,i=0,s=0,c=0;e=Number(e)/360,t=Number(t)/100,n=Number(n)/100,0===t?(r=n,l=n,i=n):(a=function(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+=6*(t-e)*n:n<.5?e=t:n<2/3&&(e+=(t-e)*(2/3-n)*6),e},r=a(c=2*n-(s=n<.5?n*(1+t):n+t-n*t),s,e+1/3),l=a(c,s,e),i=a(c,s,e-1/3)),o=`#${Math.round(255*r).toString(16).padStart(2,"0")}${Math.round(255*l).toString(16).padStart(2,"0")}${Math.round(255*i).toString(16).padStart(2,"0")}`}return o}function l(e){let t=e.match(/\#([a-fA-F0-9]{2})([a-fA-Z0-9]{2})([a-fA-F0-9]{2})/),n=t[1],o=t[2],a=t[3],r=!1;return(n||0===n)&&String(n).match(/^[0-9a-f]{2}$/i)&&(o||0===o)&&String(o).match(/^[0-9a-f]{2}$/i)&&(a||0===a)&&String(a).match(/^[0-9a-f]{2}$/i)&&(n=parseInt(n,16),o=parseInt(o,16),a=parseInt(a,16),r={red:Math.round(n),green:Math.round(o),blue:Math.round(a)}),r}const i=(e,t)=>{let n,o,a,r;switch(e){case"top_left":n=t,o=t,a=-1*t,r=-1*t;break;case"top_right":n=-1*t,o=t,a=-1*t,r=t;break;case"bottom_left":n=t,o=-1*t,a=t,r=-1*t;break;case"bottom_right":n=-1*t,o=-1*t,a=t,r=t;break;case"right_bottom":n=t,o=-1*t,a=-1*t,r=t;break;case"top":n=0,o=0,a=-1*t,r=t}return{topLeft:n,topRight:o,bottomLeft:a,bottmRight:r}};var s=JSON.parse('{"u2":"itmar/phism-button"}');(0,e.registerBlockType)(s.u2,{edit:function(e){const s=(0,t.useRef)(!1),{attributes:c,setAttributes:u}=e;let p=(0,o.useBlockProps)();const{btnContent:m,btnalign:b,blur:d,intensity:h,distance:g,newDirection:f,clayDirection:x,embos:v,opacity:w,depth:y,bdBlur:$,expand:C,boxShadowStyle:E,glassblur:k,glassopa:S,hasOutline:_,backgroundColor:R,className:I}=c;return(0,t.useEffect)((()=>{if(s.current)if("is-style-newmor"===I||"is-style-claymor"===I||"is-style-glassmor"===I){const e=void 0===p.style.backgroundColor?"#dddfe4":p.style.backgroundColor;if("is-style-newmor"===I){const t=function(e){let t=e.match(/\#([a-fA-F0-9]{2})([a-fA-Z0-9]{2})([a-fA-F0-9]{2})/),n=t[1],o=t[2],a=t[3],r=!1;if((n||0===n)&&String(n).match(/^[0-9a-f]{2}$/i)&&(o||0===o)&&String(o).match(/^[0-9a-f]{2}$/i)&&(a||0===a)&&String(a).match(/^[0-9a-f]{2}$/i)){let e=0,t=0,l=0,i=0,s=0,c=0;n=parseInt(n,16)/255,o=parseInt(o,16)/255,a=parseInt(a,16)/255,i=Math.max(n,o,a),s=Math.min(n,o,a),l=(i+s)/2,i!==s&&(c=i-s,t=l>.5?c/(2-i-s):c/(i+s),e=i===n?(o-a)/c:i===o?2+(a-n)/c:4+(n-o)/c,e/=6),r={hue:Math.round(360*e),saturation:Math.round(100*t),lightness:Math.round(100*l)}}return r}(e),n=t.lightness+h<100?t.lightness+h:100,o=t.lightness-h>0?t.lightness-h:0,a=r(t.hue,t.saturation,n),l=r(t.hue,t.saturation,o),s=i(f,g),c="swell"===v?{style:{boxShadow:`${s.topLeft}px ${s.topRight}px ${d}px ${l}, ${s.bottomLeft}px ${s.bottmRight}px ${d}px ${a}`}}:{style:{boxShadow:`inset ${s.topLeft}px ${s.topRight}px ${d}px ${l}, inset ${s.bottomLeft}px ${s.bottmRight}px ${d}px ${a}`}};u({boxShadowStyle:c})}else if("is-style-claymor"===I){const t=l(e),n=i(x,C),o=i(x,y),a={style:{boxShadow:`${n.topLeft}px ${n.bottmRight}px ${2*C}px 0px rgba(${t.red}, ${t.green}, ${t.blue}, 0.5), inset ${o.topRight}px ${o.bottomLeft}px 16px 0px rgba(${t.red}, ${t.green}, ${t.blue}, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)`,backgroundColor:`rgba(255, 255, 255, ${w})`,backdropFilter:`blur(${$}px)`}};u({boxShadowStyle:a})}else if("is-style-glassmor"===I){const t=l(e);let n={style:{backgroundColor:`rgba( ${t.red}, ${t.green}, ${t.blue}, ${S} )`,boxShadow:"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",backdropFilter:`blur( ${k}px )`,WebkitBackdropFilter:`blur( ${k}px )`}};_&&(n.style.border="1px solid rgba( 255, 255, 255, 0.18 )"),u({boxShadowStyle:n})}}else u({boxShadowStyle:void 0});else s.current=!0}),[I,R,d,h,g,w,y,C,$,f,x,_,v,k,S]),(0,t.createElement)(t.Fragment,null,"is-style-newmor"===I&&(0,t.createElement)(o.InspectorControls,{__experimentalGroup:"border"},(0,t.createElement)(a.PanelBody,{title:"ニューモフィズム設定",initialOpen:!1,className:"btn_design_ctrl"},(0,t.createElement)(a.RangeControl,{value:g,label:"Distanse",max:50,min:0,onChange:e=>u({distance:e}),withInputField:!1}),(0,t.createElement)(a.RangeControl,{value:h,label:"Intensity",max:100,min:0,onChange:e=>u({intensity:e}),withInputField:!1}),(0,t.createElement)(a.RangeControl,{value:d,label:"Blur",max:20,min:0,onChange:e=>u({blur:e}),withInputField:!1}),(0,t.createElement)(a.PanelRow,null,(0,t.createElement)("div",{className:"light_direction"},(0,t.createElement)(a.RadioControl,{selected:f,options:[{value:"top_left"},{value:"top_right"},{value:"bottom_left"},{value:"bottom_right"}],onChange:e=>{u({newDirection:e})}})),(0,t.createElement)("div",{className:"embos"},(0,t.createElement)(a.RadioControl,{selected:v,options:[{value:"swell"},{value:"dent"}],onChange:e=>{u({embos:e})}}))))),"is-style-claymor"===I&&(0,t.createElement)(o.InspectorControls,{__experimentalGroup:"border"},(0,t.createElement)(a.PanelBody,{title:"クレイモフィズム設定",initialOpen:!1,className:"btn_design_ctrl"},(0,t.createElement)(a.RangeControl,{value:w,label:"Opacity",max:1,min:0,step:.1,onChange:e=>u({opacity:e}),withInputField:!1}),(0,t.createElement)(a.RangeControl,{value:y,label:"Depth",max:20,min:0,onChange:e=>u({depth:e}),withInputField:!1}),(0,t.createElement)(a.RangeControl,{value:C,label:"Expand",max:50,min:0,onChange:e=>u({expand:e}),withInputField:!1}),(0,t.createElement)(a.RangeControl,{value:$,label:"Background Blur",max:10,min:0,onChange:e=>u({bdBlur:e}),withInputField:!1}),(0,t.createElement)("div",{className:"light_direction claymor"},(0,t.createElement)(a.RadioControl,{selected:x,options:[{value:"right_bottom"},{value:"top_right"},{value:"top"}],onChange:e=>{u({clayDirection:e})}})))),"is-style-glassmor"===I&&(0,t.createElement)(o.InspectorControls,{__experimentalGroup:"border"},(0,t.createElement)(a.PanelBody,{title:"グラスモフィズム設定",initialOpen:!1,className:"btn_design_ctrl"},(0,t.createElement)(a.RangeControl,{value:k,label:"Glass blur",max:20,min:0,onChange:e=>u({glassblur:e}),withInputField:!1}),(0,t.createElement)(a.RangeControl,{value:S,label:"Glass Opacity",max:1,min:0,step:.1,onChange:e=>u({glassopa:e}),withInputField:!1}),(0,t.createElement)("fieldset",null,(0,t.createElement)(a.ToggleControl,{label:"Show outline",checked:_,onChange:()=>{u({hasOutline:!_})}})))),(0,t.createElement)("div",(0,o.useBlockProps)(E),(0,t.createElement)(o.RichText,{tagName:"p",onChange:e=>u({btnContent:e}),allowedFormats:["core/bold","core/italic","core/text-color"],value:m,placeholder:(0,n.__)("Write your text..."),style:{textAlign:"center"}})))},save:function(e){let{attributes:n}=e;o.useBlockProps.save();const{btnContent:a,boxShadowStyle:r}=n;return(0,t.createElement)("div",o.useBlockProps.save(r),(0,t.createElement)(o.RichText.Content,{tagName:"p",value:a,style:{textAlign:"center"}}))}})}},n={};function o(e){var a=n[e];if(void 0!==a)return a.exports;var r=n[e]={exports:{}};return t[e](r,r.exports,o),r.exports}o.m=t,e=[],o.O=function(t,n,a,r){if(!n){var l=1/0;for(u=0;u<e.length;u++){n=e[u][0],a=e[u][1],r=e[u][2];for(var i=!0,s=0;s<n.length;s++)(!1&r||l>=r)&&Object.keys(o.O).every((function(e){return o.O[e](n[s])}))?n.splice(s--,1):(i=!1,r<l&&(l=r));if(i){e.splice(u--,1);var c=a();void 0!==c&&(t=c)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[n,a,r]},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={329:0,880:0};o.O.j=function(t){return 0===e[t]};var t=function(t,n){var a,r,l=n[0],i=n[1],s=n[2],c=0;if(l.some((function(t){return 0!==e[t]}))){for(a in i)o.o(i,a)&&(o.m[a]=i[a]);if(s)var u=s(o)}for(t&&t(n);c<l.length;c++)r=l[c],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(u)},n=self.webpackChunkblock_collections=self.webpackChunkblock_collections||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var a=o.O(void 0,[880],(function(){return o(8)}));a=o.O(a)}();