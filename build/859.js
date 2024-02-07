"use strict";(self.webpackChunkblock_collections=self.webpackChunkblock_collections||[]).push([[859],{9859:function(e,t,l){l.r(t),l.d(t,{default:function(){return M}});var o=l(9307),n=l(5736),a=l(5609),c=l(3157),i=e=>{let{title:t,fontStyle:l,initialOpen:i,onChange:r}=e;const{fontSize:s,fontFamily:_,fontWeight:p,isItalic:m}=l,d=[{value:"Arial, sans-serif",label:"Arial",fontFamily:"Arial, sans-serif"},{value:"Courier New, monospace",label:"Courier New",fontFamily:"Courier New, monospace"},{value:"Georgia, serif",label:"Georgia",fontFamily:"Georgia, serif"},{label:"Noto Sans JP",value:"Noto Sans JP, sans-serif",fontFamily:"Noto Sans JP, sans-serif"},{label:"Texturina",value:"Texturina, serif",fontFamily:"Texturina, serif"}],u={option:(e,t)=>({...e,fontFamily:t.data.fontFamily})};return(0,o.createElement)(a.PanelBody,{title:t,initialOpen:i},(0,o.createElement)(a.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{e=""!=e?e:"0px";const t={...l,fontSize:e};r(t)},label:(0,n.__)("Size","block-collections"),value:s,units:[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}]}),(0,o.createElement)((e=>{let{label:t,value:l,onChange:n}=e;return(0,o.createElement)(o.Fragment,null,t&&(0,o.createElement)("label",{className:"components-base-control__label"},t),(0,o.createElement)(c.ZP,{options:d,value:d.find((e=>e.value===l)),onChange:e=>{n(e.value)},styles:u}))}),{label:(0,n.__)("font family","block-collections"),value:_,onChange:e=>{const t={...l,fontFamily:e};r(t)}}),(0,o.createElement)("label",{className:"components-base-control__label"},(0,n.__)("font weight","block-collections")),(0,o.createElement)(a.PanelRow,{className:"itmar_weight_row"},(0,o.createElement)(a.RadioControl,{selected:p,options:[{label:"LIGHT",value:"300"},{label:"REGULAR",value:"400"},{label:"MEDIUM",value:"500"},{label:"S-BOLD",value:"600"},{label:"BOLD",value:"700"},{label:"BLACK",value:"900"}],onChange:e=>{const t={...l,fontWeight:e};r(t)}})),(0,o.createElement)("label",{className:"components-base-control__label"},(0,n.__)("Italic display","block-collections")),(0,o.createElement)(a.ToggleControl,{checked:m,onChange:e=>{const t={...l,isItalic:e};r(t)}}))},r=l(2175);const s=(0,o.createElement)("a",{href:"https://fontawesome.com/search",target:"_blank"},"FontAwesome"),_=(0,o.createElement)("span",{},s,(0,n.__)("Select the icon from and enter Unicode (the upper right four digits of the selection dialog). ","block-collections")),p=(0,o.createElement)("span",{},s,(0,n.__)("Please select the first class name shown in the HTML code field of the selection dialog. ","block-collections")),m=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}],d=[{value:"Font Awesome 6 Free",label:"SOLID"},{value:"Font Awesome 6 Brands",label:"BRANDS"}];var u=e=>{let{iconStyle:t,onChange:l}=e;const{icon_name:c,icon_pos:i,icon_size:s,icon_color:u,icon_space:g,icon_family:b}=t;return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(a.TextControl,{label:(0,n.__)("icon name","block-collections"),help:_,labelPosition:"top",value:c,isPressEnterToChange:!0,onChange:e=>{const o={...t,icon_name:e};l(o)}}),(0,o.createElement)(a.ComboboxControl,{label:(0,n.__)("Icon Family","block-collections"),help:p,options:d,value:b||"Font Awesome 6 Free",onChange:e=>{const o={...t,icon_family:e};l(o)}}),(0,o.createElement)(a.PanelRow,{className:"sizing_row"},(0,o.createElement)(a.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{const o={...t,icon_size:e};l(o)},label:(0,n.__)("Size","block-collections"),value:s,units:m}),(0,o.createElement)(a.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{const o={...t,icon_space:e};l(o)},label:(0,n.__)("spacing to end","block-collections"),value:g,units:m})),(0,o.createElement)(r.PanelColorSettings,{title:(0,n.__)("Color settings","itmar_location"),initialOpen:!1,colorSettings:[{value:u,onChange:e=>{const o={...t,icon_color:e};l(o)},label:(0,n.__)("Icon color","itmar_location")}]}),(0,o.createElement)("label",{className:"components-base-control__label"},(0,n.__)("Arrangement","block-collections")),(0,o.createElement)(a.PanelRow,{className:"itmar_position_row"},(0,o.createElement)(a.RadioControl,{selected:i,options:[{label:(0,n.__)("left","block-collections"),value:"left"},{label:(0,n.__)("right","block-collections"),value:"right"}],onChange:e=>{const o={...t,icon_pos:e};l(o)}})))},g=l(4465),b=l(9818);const h=e=>{function t(e){const t=parseInt(e,10).toString(16);return 1===t.length?"0"+t:t}let l,o=[];return o=/^#[0-9a-fA-F]{6}$/.test(e)?[e.slice(1,3),e.slice(3,5),e.slice(5,7)]:(l=e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/))?[t(l[1]),t(l[2]),t(l[3])]:["ff","ff","ff"],o};function C(e,t,l){var o=!1;if((e||0===e)&&e<=360&&(t||0===t)&&t<=100&&(l||0===l)&&l<=100){var n,a=0,c=0,i=0,r=0,s=0;e=Number(e)/360,t=Number(t)/100,l=Number(l)/100,0===t?(a=l,c=l,i=l):(n=function(e,t,l){return l<0&&(l+=1),l>1&&(l-=1),l<1/6?e+=6*(t-e)*l:l<.5?e=t:l<2/3&&(e+=(t-e)*(2/3-l)*6),e},a=n(s=2*l-(r=l<.5?l*(1+t):l+t-l*t),r,e+1/3),c=n(s,r,e),i=n(s,r,e-1/3)),o=`#${Math.round(255*a).toString(16).padStart(2,"0")}${Math.round(255*c).toString(16).padStart(2,"0")}${Math.round(255*i).toString(16).padStart(2,"0")}`}return o}const y=(e,t)=>{let l,o,n,a;switch(e){case"top_left":l=t,o=t,n=-1*t,a=-1*t;break;case"top_right":l=-1*t,o=t,n=t,a=-1*t;break;case"bottom_left":case"right_bottom":l=t,o=-1*t,n=-1*t,a=t;break;case"bottom_right":l=-1*t,o=-1*t,n=t,a=t;break;case"top":l=0,o=0,n=-1*t,a=t}return{topLeft:l,topRight:o,bottomLeft:n,bottmRight:a}};function f(e){return e.includes("linear-gradient")||e.includes("radial-gradient")}const k=e=>{const{shadowType:t,spread:l,lateral:o,longitude:a,nomalBlur:c,shadowColor:i,blur:r,intensity:s,distance:_,newDirection:p,clayDirection:m,embos:d,opacity:u,depth:g,bdBlur:k,expand:x,glassblur:v,glassopa:E,hasOutline:w,baseColor:S}=e;if("nomal"===t)return"dent"===d?{style:{boxShadow:`${o}px ${a}px ${c}px ${l}px transparent, inset ${o}px ${a}px ${c}px ${l}px ${i}`}}:{style:{boxShadow:`${o}px ${a}px ${c}px ${l}px ${i}, inset ${o}px ${a}px ${c}px ${l}px transparent`}};if("newmor"===t){if(f(S))return(0,b.dispatch)("core/notices").createNotice("error",(0,n.__)("Neumorphism cannot be set when the background color is a gradient. ","itmar_guest_contact_block"),{type:"snackbar",isDismissible:!0}),null;const e=function(e){let t=h(e),l=t[0],o=t[1],n=t[2],a=!1;if((l||0===l)&&String(l).match(/^[0-9a-f]{2}$/i)&&(o||0===o)&&String(o).match(/^[0-9a-f]{2}$/i)&&(n||0===n)&&String(n).match(/^[0-9a-f]{2}$/i)){let e=0,t=0,c=0,i=0,r=0,s=0;l=parseInt(l,16)/255,o=parseInt(o,16)/255,n=parseInt(n,16)/255,i=Math.max(l,o,n),r=Math.min(l,o,n),c=(i+r)/2,i!==r&&(s=i-r,t=c>.5?s/(2-i-r):s/(i+r),e=i===l?(o-n)/s:i===o?2+(n-l)/s:4+(l-o)/s,e/=6),a={hue:Math.round(360*e),saturation:Math.round(100*t),lightness:Math.round(100*c)}}return a}(S),t=e.lightness+s<100?e.lightness+s:100,l=e.lightness-s>0?e.lightness-s:0,o=C(e.hue,e.saturation,t),a=C(e.hue,e.saturation,l),c=y(p,_),i={style:{border:"none",background:S}};return"swell"===d?{style:{...i.style,boxShadow:`${c.topLeft}px ${c.topRight}px ${r}px ${a}, ${c.bottomLeft}px ${c.bottmRight}px ${r}px ${o}, inset ${c.topLeft}px ${c.topRight}px ${r}px transparent, inset ${c.bottomLeft}px ${c.bottmRight}px ${r}px transparent`}}:{style:{...i.style,boxShadow:`${c.topLeft}px ${c.topRight}px ${r}px transparent, ${c.bottomLeft}px ${c.bottmRight}px ${r}px transparent, inset ${c.topLeft}px ${c.topRight}px ${r}px ${a}, inset ${c.bottomLeft}px ${c.bottmRight}px ${r}px ${o}`}}}if("claymor"===t){if(f(S))return(0,b.dispatch)("core/notices").createNotice("error",(0,n.__)("claymorphism cannot be set when the background color is a gradient. ","itmar_guest_contact_block"),{type:"snackbar",isDismissible:!0}),null;const e=function(e){let t=h(e),l=t[0],o=t[1],n=t[2],a=!1;return(l||0===l)&&String(l).match(/^[0-9a-f]{2}$/i)&&(o||0===o)&&String(o).match(/^[0-9a-f]{2}$/i)&&(n||0===n)&&String(n).match(/^[0-9a-f]{2}$/i)&&(l=parseInt(l,16),o=parseInt(o,16),n=parseInt(n,16),a={red:Math.round(l),green:Math.round(o),blue:Math.round(n)}),a}(S),t=y(m,x),l=y(m,g),o={style:{background:`rgba(255, 255, 255, ${u})`,backdropFilter:`blur(${k}px)`,border:"none"}};return{...o,style:{...o.style,boxShadow:`${t.topLeft}px ${t.bottmRight}px ${2*x}px 0px rgba(${e.red}, ${e.green}, ${e.blue}, 0.5), inset ${l.topRight}px ${l.bottomLeft}px 16px 0px rgba(${e.red}, ${e.green}, ${e.blue}, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)`}}}if("glassmor"===t){const e={style:{backgroundColor:`rgba(255, 255, 255, ${E})`,...w?{border:"1px solid rgba(255, 255, 255, 0.4)"}:{},borderRightColor:"rgba(255, 255, 255, 0.2)",borderBottomColor:"rgba(255, 255, 255, 0.2)",backdropFilter:`blur( ${v}px )`}};return"swell"===d?{...e,style:{...e.style,boxShadow:"0 8px 12px 0 rgba( 31, 38, 135, 0.37 ), inset 0 8px 12px 0 transparent"}}:{...e,style:{...e.style,boxShadow:"0 8px 12px 0 transparent, inset 0 8px 12px 0 rgba( 31, 38, 135, 0.37 )"}}}};var x=e=>{let{shadowStyle:t,onChange:l}=e;const[c,i]=(0,o.useState)(t),{shadowType:s,spread:_,lateral:p,longitude:m,nomalBlur:d,shadowColor:u,blur:g,intensity:b,distance:h,newDirection:C,clayDirection:y,embos:f,opacity:x,depth:v,bdBlur:E,expand:w,glassblur:S,glassopa:$,hasOutline:R}=c;return(0,o.useEffect)((()=>{const e=k(c);e&&l(e,c)}),[c]),(0,o.createElement)(o.Fragment,null,(0,o.createElement)(a.PanelBody,{title:(0,n.__)("Shadow Type","block-collections"),initialOpen:!0},(0,o.createElement)("div",{className:"itmar_shadow_type"},(0,o.createElement)(a.RadioControl,{selected:s,options:[{label:(0,n.__)("Nomal","block-collections"),value:"nomal"},{label:(0,n.__)("Neumorphism","block-collections"),value:"newmor"},{label:(0,n.__)("Claymorphism","block-collections"),value:"claymor"},{label:(0,n.__)("Grassmophism","block-collections"),value:"glassmor"}],onChange:e=>i({...c,shadowType:e})})),"claymor"!==s&&(0,o.createElement)("div",{className:"embos"},(0,o.createElement)(a.RadioControl,{label:(0,n.__)("unevenness","block-collections"),selected:f,options:[{value:"swell"},{value:"dent"}],onChange:e=>i({...c,embos:e})}))),"nomal"===s&&(0,o.createElement)(a.PanelBody,{title:(0,n.__)("Nomal settings","block-collections"),initialOpen:!1},(0,o.createElement)(a.RangeControl,{value:_,label:(0,n.__)("Spread","block-collections"),max:50,min:0,onChange:e=>i({...c,spread:e}),withInputField:!1}),(0,o.createElement)(a.RangeControl,{value:p,label:(0,n.__)("Lateral direction","block-collections"),max:50,min:0,onChange:e=>i({...c,lateral:e}),withInputField:!1}),(0,o.createElement)(a.RangeControl,{value:m,label:(0,n.__)("Longitudinal direction","block-collections"),max:50,min:0,onChange:e=>i({...c,longitude:e}),withInputField:!1}),(0,o.createElement)(a.RangeControl,{value:d,label:(0,n.__)("Blur","block-collections"),max:20,min:0,onChange:e=>i({...c,nomalBlur:e}),withInputField:!1}),(0,o.createElement)(r.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Shadow Color Setting","block-collections"),settings:[{colorValue:u,label:(0,n.__)("Choose Shadow color","block-collections"),onColorChange:e=>i({...c,shadowColor:e})}]})),"newmor"===s&&(0,o.createElement)(a.PanelBody,{title:(0,n.__)("Neumorphism settings","block-collections"),initialOpen:!1},(0,o.createElement)(a.RangeControl,{value:h,label:(0,n.__)("Distance","block-collections"),max:50,min:0,onChange:e=>i({...c,distance:e}),withInputField:!1}),(0,o.createElement)(a.RangeControl,{value:b,label:(0,n.__)("Intensity","block-collections"),max:100,min:0,onChange:e=>i({...c,intensity:e}),withInputField:!1}),(0,o.createElement)(a.RangeControl,{value:g,label:(0,n.__)("Blur","block-collections"),max:20,min:0,onChange:e=>i({...c,blur:e}),withInputField:!1}),(0,o.createElement)(a.PanelRow,null,(0,o.createElement)("div",{className:"light_direction"},(0,o.createElement)(a.RadioControl,{selected:C,options:[{value:"top_left"},{value:"top_right"},{value:"bottom_left"},{value:"bottom_right"}],onChange:e=>i({...c,newDirection:e})})))),"claymor"===s&&(0,o.createElement)(a.PanelBody,{title:(0,n.__)("Claymorphism settings","block-collections"),initialOpen:!1},(0,o.createElement)(a.RangeControl,{value:x,label:(0,n.__)("Opacity","block-collections"),max:1,min:0,step:.1,onChange:e=>i({...c,opacity:e}),withInputField:!1}),(0,o.createElement)(a.RangeControl,{value:v,label:"Depth",max:20,min:0,onChange:e=>i({...c,depth:e}),withInputField:!1}),(0,o.createElement)(a.RangeControl,{value:w,label:"Expand",max:50,min:0,onChange:e=>i({...c,expand:e}),withInputField:!1}),(0,o.createElement)(a.RangeControl,{value:E,label:"Background Blur",max:10,min:0,onChange:e=>i({...c,bdBlur:e}),withInputField:!1}),(0,o.createElement)("div",{className:"light_direction claymor"},(0,o.createElement)(a.RadioControl,{selected:y,options:[{value:"right_bottom"},{value:"top_right"},{value:"top"}],onChange:e=>i({...c,clayDirection:e})}))),"glassmor"===s&&(0,o.createElement)(a.PanelBody,{title:(0,n.__)("Grassmophism settings","block-collections"),initialOpen:!1},(0,o.createElement)(a.RangeControl,{value:S,label:(0,n.__)("Glass blur","block-collections"),max:20,min:0,onChange:e=>i({...c,glassblur:e}),withInputField:!1}),(0,o.createElement)(a.RangeControl,{value:$,label:(0,n.__)("Glass Opacity","block-collections"),max:1,min:0,step:.1,onChange:e=>i({...c,glassopa:e}),withInputField:!1}),(0,o.createElement)("fieldset",null,(0,o.createElement)(a.ToggleControl,{label:(0,n.__)("Show outline","block-collections"),checked:R,onChange:()=>i({...c,hasOutline:!R})}))))},v=l(7462),E=l(6989),w=l.n(E);const S=e=>{let{setAttributes:t,attributes:l,label:n,homeUrl:c,fetchOptions:i}=e;const{selectedPageId:r}=l,[s,_]=(0,o.useState)([]);return(0,o.useEffect)((()=>{(async()=>{try{const e=await i(c);_(e)}catch(e){console.error("Error fetching data:",e.message)}})()}),[i]),(0,o.createElement)(a.ComboboxControl,{label:n,options:s,value:r,onChange:e=>{const l=s.find((t=>t.value===e));t({selectedPageId:e,selectedPageUrl:l?l.link:c})}})},$=async e=>{const t=await w()({path:"/wp/v2/pages"});return t&&!t.some((e=>-1===e.id))&&t.unshift({id:-1,title:{rendered:"ホーム"},link:e}),t?t.map((e=>({value:e.id,label:e.title.rendered,link:e.link}))):[]},R=async e=>{const t=await w()({path:"/wp/v2/types"});let l=0;return Object.keys(t).reduce(((o,n)=>{const a=t[n];return!0===a.has_archive?o.push({value:l++,link:`${e}/${a.slug}`,label:a.name}):"string"==typeof a.has_archive&&o.push({value:l++,link:`${e}/${a.has_archive}`,label:a.name}),o}),[])},P=e=>(0,o.createElement)(S,(0,v.Z)({},e,{fetchOptions:$})),L=e=>(0,o.createElement)(S,(0,v.Z)({},e,{fetchOptions:R}));var I=l(8446),B=l.n(I),F=l(1893),N=l(7762);function T(e,t){!function(l,n){const a=(0,o.useRef)();B()(n,a.current)||(a.current=n),(0,o.useEffect)((()=>(()=>{const l=document.getElementsByName("editor-canvas")[0];if(l){const n=l.contentDocument||l.contentWindow.document,a=new F.qH;(0,N.Dq)(a.collectStyles((0,o.createElement)(e,{attributes:t})));const c=a.getStyleTags().replace(/<style[^>]*>|<\/style>/g,""),i=n.createElement("style");return i.innerHTML=c,n.head.appendChild(i),()=>{n.head.removeChild(i)}}})()),[a.current])}(0,[t])}const A={top:"10px",left:"10px",right:"10px",bottom:"10px"},O=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}],D=e=>(0,o.createElement)("svg",{width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg"},(0,o.createElement)("text",{x:"0",y:"15",fontSize:"15","font-weight":"bold"},`H${e}`)),V=(e,t,l)=>{const o=document.createElement("canvas").getContext("2d");return o.font=`${t} ${l} `,o.measureText(e).width};function M(e){let{attributes:t,setAttributes:l,clientId:c}=e;const{headingContent:s,headingType:_,defaultHeadingSize:p,mobileHeadingSize:m,titleType:d,align:h,isVertical:C,padding_heading:y,optionStyle:f,shadow_element:v,is_shadow:E,is_underLine:S,underLine_prop:$,bgColor_underLine:R,bgGradient_underLine:I,linkKind:B,menu_pos:F,is_title_menu:N,selectedPageUrl:M,className:U}=t,z="center"===h?{marginLeft:"auto",marginRight:"auto"}:"right"===h?{marginLeft:"auto"}:{},G=function(){const[e,t]=(0,o.useState)(!1);return(0,o.useEffect)((()=>{const e=()=>{const e=document.getElementsByName("editor-canvas")[0];e&&e.contentWindow&&t(e.contentWindow.innerWidth<=767)},l=document.getElementsByName("editor-canvas")[0];return l&&l.contentWindow&&l.contentWindow.addEventListener("resize",e),e(),()=>{l&&l.contentWindow&&l.contentWindow.removeEventListener("resize",e)}}),[]),e}(),W=(0,o.useRef)(null),H=(0,r.useBlockProps)({ref:W,style:{position:N?"relative":"static",...z}}),J=function(e,t){const[l,n]=(0,o.useState)("");return(0,o.useEffect)((()=>{if(e.current&&t)if(t.backgroundColor&&!t.backgroundColor.startsWith("var(--wp"))n(t.backgroundColor);else if(e.current){const t=getComputedStyle(e.current);n(t.backgroundColor)}}),[t,e]),l}(W,H.style);(0,o.useEffect)((()=>{if(J){l({shadow_element:{...v,baseColor:J}});const e=k({...v,baseColor:J});e&&l({shadow_result:e.style})}}),[J]);const q=(0,o.useRef)(!1),[K,Y]=(0,o.useState)(f);(0,o.useEffect)((()=>{let e;f?.copy_content&&(e=V(f.copy_content,f.font_style_copy?.fontSize,f.font_style_copy?.fontFamily));const t=f?.copy_content?{...K,copy_width:e}:K;l({optionStyle:t})}),[K]);const[Z,j]=(0,o.useState)("");(0,o.useEffect)((()=>{"plaine"!==d&&(async()=>{try{const e=await w()({path:"/"});j("site"===d?e.name:e.description)}catch(e){console.error("Error fetching data:",e.message)}})()}),[d]);const Q=()=>{let e;U?.split(" ").includes("is-style-circle_marker")?e={styleName:"is-style-circle_marker",colorVal_circle:"var(--wp--preset--color--accent-1)",colorVal_second:"var(--wp--preset--color--accent-2)",circleScale:"3em",secondScale:"1.5em",second_opacity:.7,first_long:10,first_lat:-5,second_long:-10,second_lat:10,isSecond:!0}:U?.split(" ").includes("is-style-sub_copy")?(e={styleName:"is-style-sub_copy",alignment_copy:"top left",color_text_copy:"var(--wp--preset--color--content)",color_background_copy:"var(--wp--preset--color--accent-1)",copy_content:"SAMPLE",copy_width:0,font_style_copy:{fontSize:"16px",fontFamily:"Arial, sans-serif",fontWeight:"500",isItalic:!1},radius_copy:{topLeft:"10px",topRight:"10px",bottomRight:"0px",bottomLeft:"0px",value:"0px"},padding_copy:{top:"10px",left:"10px",bottom:"10px",right:"10px"},isIcon:!1,icon_style:{icon_name:"f030",icon_pos:"left",icon_size:"24px",icon_color:"#000",icon_space:"5px",icon_family:"Font Awesome 6 Free"}},ae("SAMPLE")):e={},Y(e),q.current=U,te(!1)},X=()=>{oe(!0),l({className:q.current}),te(!1)},[ee,te]=(0,o.useState)(!1),[le,oe]=(0,o.useState)(!1);(0,o.useEffect)((()=>{if(0!=q.current){if(le)return void oe(!1);if(void 0===q.current||q.current?.split(" ").includes("is-style-default"))return void Q();te(!0)}else q.current=U}),[U]),T(g.J,t);const[ne,ae]=(0,o.useState)(f&&void 0!==f.copy_content?f.copy_content:"SAMPLE"),ce=(0,b.useSelect)((e=>e("core/block-editor").hasSelectedInnerBlock(c,!0)),[c]),[ie,re]=(0,o.useState)(!1);(0,b.useSelect)((e=>{const t=e("core/block-editor").getBlockParents(c);for(let l=0;l<t.length;l++){const o=e("core/block-editor").getBlock(t[l]);if(o.attributes?.is_menu){re(!0);break}if(o.attributes?.is_submenu){re(!0);break}}}),[c]),(0,o.useEffect)((()=>{l({isMenuItem:ie})}),[ie]);const se=(0,r.useInnerBlocksProps)({className:`submenu-block ${ce?"visible":""} ${F.replace(/ /g,"_")} ${N?"mobile_virtical":"mobile_horizen"}`},{allowedBlocks:["itmar/design-group"],template:[["itmar/design-group",{is_submenu:!0},[["itmar/design-title",{headingType:"H3"}]]]],templateLock:!1}),_e="plaine"===d?(0,o.createElement)(r.RichText,{tagName:_,onChange:e=>{l({headingContent:e})},value:s,placeholder:(0,n.__)("Write Title text...","block-collections")}):React.createElement(_.toLowerCase(),{},Z);return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(r.InspectorControls,{group:"settings"},(0,o.createElement)(a.PanelBody,{title:(0,n.__)("Title Source Setting","block-collections")},(0,o.createElement)("div",{className:"itmar_title_type"},(0,o.createElement)(a.RadioControl,{label:(0,n.__)("Title type","block-collections"),selected:d,options:[{label:(0,n.__)("Plaine","block-collections"),value:"plaine"},{label:(0,n.__)("Site Title","block-collections"),value:"site"},{label:(0,n.__)("Chatch Phrase","block-collections"),value:"catch"}],onChange:e=>l({titleType:e}),help:(0,n.__)("You can display the site title and catchphrase in addition to the blank title.","block-collections")})),(0,o.createElement)("div",{className:"itmar_link_type"},(0,o.createElement)(a.RadioControl,{label:(0,n.__)("Link type","block-collections"),selected:B,options:[{label:(0,n.__)("None","block-collections"),value:"none"},{label:(0,n.__)("Fixed Page","block-collections"),value:"fixed"},{label:(0,n.__)("Archive Page","block-collections"),value:"archive"},{label:(0,n.__)("Free URL","block-collections"),value:"free"},{label:(0,n.__)("Sub Menu","block-collections"),value:"submenu"}],onChange:e=>l({linkKind:e}),help:(0,n.__)("You can select the type of URL to link to the title.","block-collections")})),"fixed"===B&&(0,o.createElement)(P,{attributes:t,setAttributes:l,label:(0,n.__)("Select a fixed page to link to","block-collections"),homeUrl:itmar_block_option.home_url}),"archive"===B&&(0,o.createElement)(L,{attributes:t,setAttributes:l,label:(0,n.__)("Select archive page to link to","block-collections"),homeUrl:itmar_block_option.home_url}),"free"===B&&(0,o.createElement)(a.TextControl,{label:(0,n.__)("Link to URL","block-collections"),labelPosition:"top",value:M,onChange:e=>{l({selectedPageUrl:e})}}),"submenu"===B&&(0,o.createElement)(a.PanelBody,{title:(0,n.__)("Submenu position settings","block-collections")},(0,o.createElement)(a.PanelRow,{className:"imgPos_row"},(0,o.createElement)("label",null,(0,n.__)("Menu Alignment","block-collections")),(0,o.createElement)(a.__experimentalAlignmentMatrixControl,{value:F,onChange:e=>{l({menu_pos:e})}})),(0,o.createElement)(a.ToggleControl,{label:(0,n.__)("Based on title","block-collections"),checked:N,help:(0,n.__)("If unchecked, the parent menu will be used as the reference. If there is no parent menu, do not uncheck it.","block-collections"),onChange:e=>{l({is_title_menu:e})}})))),(0,o.createElement)(r.InspectorControls,{group:"styles"},(0,o.createElement)(a.PanelBody,{title:(0,n.__)("Title settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,o.createElement)(a.__experimentalUnitControl,{dragDirection:"e",onChange:e=>l(G?{mobileHeadingSize:e}:{defaultHeadingSize:e}),label:G?(0,n.__)("Font Size(mobile)","block-collections"):(0,n.__)("Font Size(desk top)","block-collections"),value:G?m:p}),(0,o.createElement)(a.__experimentalBoxControl,{label:(0,n.__)("Padding","block-collections"),values:y,onChange:e=>l({padding_heading:e}),units:O,allowReset:!0,resetValues:A}),(0,o.createElement)(a.ToggleControl,{label:(0,n.__)("Is Shadow","block-collections"),checked:E,onChange:e=>{l({is_shadow:e})}}),E&&(0,o.createElement)(x,{shadowStyle:{...v},onChange:(e,t)=>{l({shadow_result:e.style}),l({shadow_element:t})}}),(0,o.createElement)(a.ToggleControl,{label:(0,n.__)("Add an underline","block-collections"),checked:S,onChange:e=>{l({is_underLine:e})}}),S&&(0,o.createElement)(a.PanelBody,{title:(0,n.__)("UnderLine settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,o.createElement)(a.PanelRow,{className:"distance_row"},(0,o.createElement)(a.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{const t={...$,height:e};l({underLine_prop:t})},label:(0,n.__)("Height","block-collections"),value:$.height}),(0,o.createElement)(a.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{const t={...$,width:e};l({underLine_prop:t})},label:(0,n.__)("Width","block-collections"),value:$.width}),(0,o.createElement)(a.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{const t={...$,distance:e};l({underLine_prop:t})},label:(0,n.__)("Distance","block-collections"),value:$.distance})),(0,o.createElement)(r.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Under Line Color Setting","block-collections"),settings:[{colorValue:R,gradientValue:I,label:(0,n.__)("Choose Under Line color","block-collections"),onColorChange:e=>{l({bgColor_underLine:void 0===e?"":e})},onGradientChange:e=>{l({bgGradient_underLine:e})}}]}),(0,o.createElement)(a.ToggleControl,{label:(0,n.__)("Animation on hover","block-collections"),checked:$.is_anime,onChange:e=>{const t={...$,is_anime:e};l({underLine_prop:t})}})),(0,o.createElement)(a.ToggleControl,{label:(0,n.__)("Write vertically","block-collections"),checked:C,onChange:e=>{l({isVertical:e})}})),U?.split(" ").includes("is-style-circle_marker")&&(0,o.createElement)(a.PanelBody,{title:(0,n.__)("Circle Marker Settings","block-collections"),initialOpen:!1,className:"title_design_ctrl"},(0,o.createElement)(r.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Circle Color Setting","block-collections"),settings:[{colorValue:f&&f.colorVal_circle?f.colorVal_circle:"var(--wp--preset--color--accent-1)",gradientValue:f&&f.gradientVal_circle?f.gradientVal_circle:void 0,label:(0,n.__)("Choose Circle Background","block-collections"),onColorChange:e=>{Y((t=>({...t,colorVal_circle:e})))},onGradientChange:e=>{Y((t=>({...t,gradientVal_circle:e})))}}]}),(0,o.createElement)(a.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{Y((t=>({...t,circleScale:e})))},label:(0,n.__)("Circle Scale Setting","block-collections"),value:f&&f.circleScale?f.circleScale:"3em"}),(0,o.createElement)(a.PanelBody,{title:(0,n.__)("Position Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,o.createElement)(a.RangeControl,{value:f&&f.first_lat?f.first_lat:10,label:(0,n.__)("Lateral direction","block-collections"),max:50,min:-30,step:1,onChange:e=>{Y((t=>({...t,first_lat:e})))},withInputField:!1}),(0,o.createElement)(a.RangeControl,{value:f&&f.first_long?f.first_long:10,label:(0,n.__)("Longitudinal direction","block-collections"),max:50,min:-30,step:1,onChange:e=>{Y((t=>({...t,first_long:e})))},withInputField:!1})),(0,o.createElement)(a.PanelBody,{title:(0,n.__)("Second Circle Settings","block-collections"),initialOpen:!0},(0,o.createElement)(a.ToggleControl,{label:(0,n.__)("Second Circle","block-collections"),checked:!f||!f.isSecond||f.isSecond,onChange:e=>{Y((t=>({...t,isSecond:e})))}})),!(!f||!f.isSecond)&&f.isSecond&&(0,o.createElement)(o.Fragment,null,(0,o.createElement)(r.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Circle Color Setting","block-collections"),settings:[{colorValue:f&&f.colorVal_second?f.colorVal_second:"var(--wp--preset--color--accent-2)",gradientValue:f&&f.gradientVal_second?f.gradientVal_second:void 0,label:(0,n.__)("Choose Circle Background","block-collections"),onColorChange:e=>{Y((t=>({...t,colorVal_second:e})))},onGradientChange:e=>{Y((t=>({...t,gradientVal_second:e})))}}]}),(0,o.createElement)(a.RangeControl,{value:f&&f.second_opacity?f.second_opacity:.7,label:(0,n.__)("Opacity","block-collections"),max:1,min:.1,step:.1,onChange:e=>{Y((t=>({...t,second_opacity:e})))},withInputField:!1}),(0,o.createElement)(a.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{Y((t=>({...t,secondScale:e})))},label:(0,n.__)("Circle Scale Setting","block-collections"),value:f&&f.secondScale?f.secondScale:"1.5em"}),(0,o.createElement)(a.PanelBody,{title:(0,n.__)("Position Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,o.createElement)(a.RangeControl,{value:f&&f.second_lat?f.second_lat:20,label:(0,n.__)("Lateral direction","block-collections"),max:50,min:-30,step:1,onChange:e=>{Y((t=>({...t,second_lat:e})))},withInputField:!1}),(0,o.createElement)(a.RangeControl,{value:f&&f.second_long?f.second_long:-10,label:(0,n.__)("Longitudinal direction","block-collections"),max:50,min:-30,step:1,onChange:e=>{Y((t=>({...t,second_long:e})))},withInputField:!1})))),U?.split(" ").includes("is-style-sub_copy")&&(0,o.createElement)(a.PanelBody,{title:(0,n.__)("Sub Copy Settings","block-collections"),initialOpen:!1,className:"title_design_ctrl"},(0,o.createElement)(r.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Copy Color Setting","block-collections"),settings:[{colorValue:f&&f.color_text_copy?f.color_text_copy:"var(--wp--preset--color--content)",label:(0,n.__)("Choose Text color","block-collections"),onColorChange:e=>{Y((t=>({...t,color_text_copy:e})))}},{colorValue:f&&f.color_background_copy?f.color_background_copy:"var(--wp--preset--color--accent-2)",gradientValue:f&&f.gradient_background_copy?f.gradient_background_copy:void 0,label:(0,n.__)("Choose Background color","block-collections"),onColorChange:e=>{Y((t=>({...t,color_background_copy:e})))},onGradientChange:e=>{Y((t=>({...t,gradient_background_copy:e})))}}]}),(0,o.createElement)(a.PanelRow,{className:"copyInfo_row"},(0,o.createElement)(a.TextControl,{label:(0,n.__)("Copy Text","block-collections"),labelPosition:"top",value:ne,onChange:e=>{ae(e),Y((t=>({...t,copy_content:e})))}})),(0,o.createElement)(a.PanelRow,{className:"copyInfo_row"},(0,o.createElement)("label",null,(0,n.__)("Copy Alignment","block-collections")),(0,o.createElement)(a.__experimentalAlignmentMatrixControl,{value:f&&f.alignment_copy?f.alignment_copy:"top left",onChange:e=>{Y((t=>({...t,alignment_copy:e})))}})),(0,o.createElement)(i,{title:(0,n.__)("Typography","block-collections"),fontStyle:f&&f.font_style_copy?f.font_style_copy:{fontSize:"16px",fontFamily:"Arial, sans-serif",fontWeight:"500",isItalic:!1},initialOpen:!1,onChange:e=>{Y((t=>({...t,font_style_copy:e})))}}),(0,o.createElement)(a.PanelBody,{title:(0,n.__)("Border Settings","block-collections"),initialOpen:!0},(0,o.createElement)(r.__experimentalBorderRadiusControl,{values:f&&f.radius_copy?f.radius_copy:{topLeft:"10px",topRight:"10px",bottomRight:"0px",bottomLeft:"0px",value:"0px"},onChange:e=>{Y((t=>({...t,radius_copy:"string"==typeof e?{value:e}:e})))}}),(0,o.createElement)(a.__experimentalBoxControl,{label:(0,n.__)("Padding settings","block-collections"),values:f&&f.padding_copy?f.padding_copy:{top:"10px",left:"10px",bottom:"10px",right:"10px"},onChange:e=>{Y((t=>({...t,padding_copy:e})))},units:O,allowReset:!0,resetValues:A})),(0,o.createElement)(a.PanelBody,{title:(0,n.__)("Icon settings","block-collections"),initialOpen:!0},(0,o.createElement)(a.ToggleControl,{label:(0,n.__)("Append icon","block-collections"),checked:!(!f||!f.isIcon)&&f.isIcon,onChange:e=>{Y((t=>({...t,isIcon:e})))}}),!(!f||!f.isIcon)&&f.isIcon&&(0,o.createElement)(u,{iconStyle:f&&f.icon_style?f.icon_style:{icon_name:"f030",icon_pos:"left",icon_size:"24px",icon_color:"var(--wp--preset--color--content)",icon_space:"5px"},onChange:e=>{Y((t=>({...t,icon_style:e})))}})))),(0,o.createElement)(r.BlockControls,null,(0,o.createElement)(r.AlignmentToolbar,{value:h,onChange:e=>{l({align:e})}}),(0,o.createElement)(a.ToolbarDropdownMenu,{label:(0,n.__)("Change heading level","block-collections"),icon:D(parseInt(_.slice(1),10)),controls:[1,2,3,4,5,6].map((e=>({icon:D(e),title:`Heading ${e}`,isActive:_===`H${e}`,onClick:()=>l({headingType:`H${e}`})})))})),ee&&(0,o.createElement)(a.Modal,{title:(0,n.__)("Confirm Deletion","block-collections"),onRequestClose:X},(0,o.createElement)("p",null,(0,n.__)("Changing a style resets the style-specific settings. Are you sure?","block-collections")),(0,o.createElement)(a.Button,{variant:"primary",onClick:Q},(0,n.__)("Yes, Change","block-collections")),(0,o.createElement)(a.Button,{variant:"secondary",onClick:X},(0,n.__)("Cancel","block-collections"))),(0,o.createElement)("div",H,(0,o.createElement)(g.J,{attributes:t},_e),"submenu"===B&&(0,o.createElement)("div",se)))}}}]);