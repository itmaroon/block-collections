"use strict";(self.webpackChunkblock_collections=self.webpackChunkblock_collections||[]).push([[827],{3827:function(e,t,l){l.r(t),l.d(t,{default:function(){return F}});var o=l(7462),n=l(9307),a=l(5736),r=l(5609),i=l(3157),c=e=>{let{title:t,fontStyle:l,initialOpen:o,onChange:c}=e;const{fontSize:s,fontFamily:u,fontWeight:b,isItalic:m}=l,d=[{value:"Arial, sans-serif",label:"Arial",fontFamily:"Arial, sans-serif"},{value:"Courier New, monospace",label:"Courier New",fontFamily:"Courier New, monospace"},{value:"Georgia, serif",label:"Georgia",fontFamily:"Georgia, serif"},{label:"Noto Sans JP",value:"Noto Sans JP, sans-serif",fontFamily:"Noto Sans JP, sans-serif"},{label:"Texturina",value:"Texturina, serif",fontFamily:"Texturina, serif"}],p={option:(e,t)=>({...e,fontFamily:t.data.fontFamily})};return(0,n.createElement)(r.PanelBody,{title:t,initialOpen:o},(0,n.createElement)(r.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{e=""!=e?e:"0px";const t={...l,fontSize:e};c(t)},label:(0,a.__)("Size","block-collections"),value:s,units:[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}]}),(0,n.createElement)((e=>{let{label:t,value:l,onChange:o}=e;return(0,n.createElement)(n.Fragment,null,t&&(0,n.createElement)("label",{className:"components-base-control__label"},t),(0,n.createElement)(i.ZP,{options:d,value:d.find((e=>e.value===l)),onChange:e=>{o(e.value)},styles:p}))}),{label:(0,a.__)("font family","block-collections"),value:u,onChange:e=>{const t={...l,fontFamily:e};c(t)}}),(0,n.createElement)("label",{className:"components-base-control__label"},(0,a.__)("font weight","block-collections")),(0,n.createElement)(r.PanelRow,{className:"itmar_weight_row"},(0,n.createElement)(r.RadioControl,{selected:b,options:[{label:"LIGHT",value:"300"},{label:"REGULAR",value:"400"},{label:"MEDIUM",value:"500"},{label:"S-BOLD",value:"600"},{label:"BOLD",value:"700"},{label:"BLACK",value:"900"}],onChange:e=>{const t={...l,fontWeight:e};c(t)}})),(0,n.createElement)("label",{className:"components-base-control__label"},(0,a.__)("Italic display","block-collections")),(0,n.createElement)(r.ToggleControl,{checked:m,onChange:e=>{const t={...l,isItalic:e};c(t)}}))},s=l(625),u=l(9146),b=l(8446),m=l.n(b),d=l(1893),p=l(7762);function _(e,t){!function(l,o){const a=(0,n.useRef)();m()(o,a.current)||(a.current=o),(0,n.useEffect)((()=>(()=>{const l=document.getElementsByName("editor-canvas")[0];if(l){const o=l.contentDocument||l.contentWindow.document,a=new d.qH;(0,p.Dq)(a.collectStyles((0,n.createElement)(e,{attributes:t})));const r=a.getStyleTags().replace(/<style[^>]*>|<\/style>/g,""),i=o.createElement("style");return i.innerHTML=r,o.head.appendChild(i),()=>{o.head.removeChild(i)}}})()),[a.current])}(0,[t])}var g=l(2175),h=l(9818);const C=e=>{function t(e){const t=parseInt(e,10).toString(16);return 1===t.length?"0"+t:t}let l,o=[];return o=/^#[0-9a-fA-F]{6}$/.test(e)?[e.slice(1,3),e.slice(3,5),e.slice(5,7)]:(l=e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/))?[t(l[1]),t(l[2]),t(l[3])]:["ff","ff","ff"],o};function x(e,t,l){var o=!1;if((e||0===e)&&e<=360&&(t||0===t)&&t<=100&&(l||0===l)&&l<=100){var n,a=0,r=0,i=0,c=0,s=0;e=Number(e)/360,t=Number(t)/100,l=Number(l)/100,0===t?(a=l,r=l,i=l):(n=function(e,t,l){return l<0&&(l+=1),l>1&&(l-=1),l<1/6?e+=6*(t-e)*l:l<.5?e=t:l<2/3&&(e+=(t-e)*(2/3-l)*6),e},a=n(s=2*l-(c=l<.5?l*(1+t):l+t-l*t),c,e+1/3),r=n(s,c,e),i=n(s,c,e-1/3)),o=`#${Math.round(255*a).toString(16).padStart(2,"0")}${Math.round(255*r).toString(16).padStart(2,"0")}${Math.round(255*i).toString(16).padStart(2,"0")}`}return o}const f=(e,t)=>{let l,o,n,a;switch(e){case"top_left":l=t,o=t,n=-1*t,a=-1*t;break;case"top_right":l=-1*t,o=t,n=t,a=-1*t;break;case"bottom_left":case"right_bottom":l=t,o=-1*t,n=-1*t,a=t;break;case"bottom_right":l=-1*t,o=-1*t,n=t,a=t;break;case"top":l=0,o=0,n=-1*t,a=t}return{topLeft:l,topRight:o,bottomLeft:n,bottmRight:a}};function E(e){return e.includes("linear-gradient")||e.includes("radial-gradient")}const v=e=>{const{shadowType:t,spread:l,lateral:o,longitude:n,nomalBlur:r,shadowColor:i,blur:c,intensity:s,distance:u,newDirection:b,clayDirection:m,embos:d,opacity:p,depth:_,bdBlur:g,expand:v,glassblur:k,glassopa:y,hasOutline:w,baseColor:S}=e;if("nomal"===t)return"dent"===d?{style:{boxShadow:`${o}px ${n}px ${r}px ${l}px transparent, inset ${o}px ${n}px ${r}px ${l}px ${i}`}}:{style:{boxShadow:`${o}px ${n}px ${r}px ${l}px ${i}, inset ${o}px ${n}px ${r}px ${l}px transparent`}};if("newmor"===t){if(E(S))return(0,h.dispatch)("core/notices").createNotice("error",(0,a.__)("Neumorphism cannot be set when the background color is a gradient. ","itmar_guest_contact_block"),{type:"snackbar",isDismissible:!0}),null;const e=function(e){let t=C(e),l=t[0],o=t[1],n=t[2],a=!1;if((l||0===l)&&String(l).match(/^[0-9a-f]{2}$/i)&&(o||0===o)&&String(o).match(/^[0-9a-f]{2}$/i)&&(n||0===n)&&String(n).match(/^[0-9a-f]{2}$/i)){let e=0,t=0,r=0,i=0,c=0,s=0;l=parseInt(l,16)/255,o=parseInt(o,16)/255,n=parseInt(n,16)/255,i=Math.max(l,o,n),c=Math.min(l,o,n),r=(i+c)/2,i!==c&&(s=i-c,t=r>.5?s/(2-i-c):s/(i+c),e=i===l?(o-n)/s:i===o?2+(n-l)/s:4+(l-o)/s,e/=6),a={hue:Math.round(360*e),saturation:Math.round(100*t),lightness:Math.round(100*r)}}return a}(S),t=e.lightness+s<100?e.lightness+s:100,l=e.lightness-s>0?e.lightness-s:0,o=x(e.hue,e.saturation,t),n=x(e.hue,e.saturation,l),r=f(b,u),i={style:{border:"none",background:S}};return"swell"===d?{style:{...i.style,boxShadow:`${r.topLeft}px ${r.topRight}px ${c}px ${n}, ${r.bottomLeft}px ${r.bottmRight}px ${c}px ${o}, inset ${r.topLeft}px ${r.topRight}px ${c}px transparent, inset ${r.bottomLeft}px ${r.bottmRight}px ${c}px transparent`}}:{style:{...i.style,boxShadow:`${r.topLeft}px ${r.topRight}px ${c}px transparent, ${r.bottomLeft}px ${r.bottmRight}px ${c}px transparent, inset ${r.topLeft}px ${r.topRight}px ${c}px ${n}, inset ${r.bottomLeft}px ${r.bottmRight}px ${c}px ${o}`}}}if("claymor"===t){if(E(S))return(0,h.dispatch)("core/notices").createNotice("error",(0,a.__)("claymorphism cannot be set when the background color is a gradient. ","itmar_guest_contact_block"),{type:"snackbar",isDismissible:!0}),null;const e=function(e){let t=C(e),l=t[0],o=t[1],n=t[2],a=!1;return(l||0===l)&&String(l).match(/^[0-9a-f]{2}$/i)&&(o||0===o)&&String(o).match(/^[0-9a-f]{2}$/i)&&(n||0===n)&&String(n).match(/^[0-9a-f]{2}$/i)&&(l=parseInt(l,16),o=parseInt(o,16),n=parseInt(n,16),a={red:Math.round(l),green:Math.round(o),blue:Math.round(n)}),a}(S),t=f(m,v),l=f(m,_),o={style:{background:`rgba(255, 255, 255, ${p})`,backdropFilter:`blur(${g}px)`,border:"none"}};return{...o,style:{...o.style,boxShadow:`${t.topLeft}px ${t.bottmRight}px ${2*v}px 0px rgba(${e.red}, ${e.green}, ${e.blue}, 0.5), inset ${l.topRight}px ${l.bottomLeft}px 16px 0px rgba(${e.red}, ${e.green}, ${e.blue}, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)`}}}if("glassmor"===t){const e={style:{backgroundColor:`rgba(255, 255, 255, ${y})`,...w?{border:"1px solid rgba(255, 255, 255, 0.4)"}:{},borderRightColor:"rgba(255, 255, 255, 0.2)",borderBottomColor:"rgba(255, 255, 255, 0.2)",backdropFilter:`blur( ${k}px )`}};return"swell"===d?{...e,style:{...e.style,boxShadow:"0 8px 12px 0 rgba( 31, 38, 135, 0.37 ), inset 0 8px 12px 0 transparent"}}:{...e,style:{...e.style,boxShadow:"0 8px 12px 0 transparent, inset 0 8px 12px 0 rgba( 31, 38, 135, 0.37 )"}}}};var k=e=>{let{shadowStyle:t,onChange:l}=e;const[o,i]=(0,n.useState)(t),{shadowType:c,spread:s,lateral:u,longitude:b,nomalBlur:m,shadowColor:d,blur:p,intensity:_,distance:h,newDirection:C,clayDirection:x,embos:f,opacity:E,depth:k,bdBlur:y,expand:w,glassblur:S,glassopa:$,hasOutline:R}=o;return(0,n.useEffect)((()=>{const e=v(o);e&&l(e,o)}),[o]),(0,n.createElement)(n.Fragment,null,(0,n.createElement)(r.PanelBody,{title:(0,a.__)("Shadow Type","block-collections"),initialOpen:!0},(0,n.createElement)("div",{className:"itmar_shadow_type"},(0,n.createElement)(r.RadioControl,{selected:c,options:[{label:(0,a.__)("Nomal","block-collections"),value:"nomal"},{label:(0,a.__)("Neumorphism","block-collections"),value:"newmor"},{label:(0,a.__)("Claymorphism","block-collections"),value:"claymor"},{label:(0,a.__)("Grassmophism","block-collections"),value:"glassmor"}],onChange:e=>i({...o,shadowType:e})})),"claymor"!==c&&(0,n.createElement)("div",{className:"embos"},(0,n.createElement)(r.RadioControl,{label:(0,a.__)("unevenness","block-collections"),selected:f,options:[{value:"swell"},{value:"dent"}],onChange:e=>i({...o,embos:e})}))),"nomal"===c&&(0,n.createElement)(r.PanelBody,{title:(0,a.__)("Nomal settings","block-collections"),initialOpen:!1},(0,n.createElement)(r.RangeControl,{value:s,label:(0,a.__)("Spread","block-collections"),max:50,min:0,onChange:e=>i({...o,spread:e}),withInputField:!1}),(0,n.createElement)(r.RangeControl,{value:u,label:(0,a.__)("Lateral direction","block-collections"),max:50,min:0,onChange:e=>i({...o,lateral:e}),withInputField:!1}),(0,n.createElement)(r.RangeControl,{value:b,label:(0,a.__)("Longitudinal direction","block-collections"),max:50,min:0,onChange:e=>i({...o,longitude:e}),withInputField:!1}),(0,n.createElement)(r.RangeControl,{value:m,label:(0,a.__)("Blur","block-collections"),max:20,min:0,onChange:e=>i({...o,nomalBlur:e}),withInputField:!1}),(0,n.createElement)(g.__experimentalPanelColorGradientSettings,{title:(0,a.__)("Shadow Color Setting","block-collections"),settings:[{colorValue:d,label:(0,a.__)("Choose Shadow color","block-collections"),onColorChange:e=>i({...o,shadowColor:e})}]})),"newmor"===c&&(0,n.createElement)(r.PanelBody,{title:(0,a.__)("Neumorphism settings","block-collections"),initialOpen:!1},(0,n.createElement)(r.RangeControl,{value:h,label:(0,a.__)("Distance","block-collections"),max:50,min:0,onChange:e=>i({...o,distance:e}),withInputField:!1}),(0,n.createElement)(r.RangeControl,{value:_,label:(0,a.__)("Intensity","block-collections"),max:100,min:0,onChange:e=>i({...o,intensity:e}),withInputField:!1}),(0,n.createElement)(r.RangeControl,{value:p,label:(0,a.__)("Blur","block-collections"),max:20,min:0,onChange:e=>i({...o,blur:e}),withInputField:!1}),(0,n.createElement)(r.PanelRow,null,(0,n.createElement)("div",{className:"light_direction"},(0,n.createElement)(r.RadioControl,{selected:C,options:[{value:"top_left"},{value:"top_right"},{value:"bottom_left"},{value:"bottom_right"}],onChange:e=>i({...o,newDirection:e})})))),"claymor"===c&&(0,n.createElement)(r.PanelBody,{title:(0,a.__)("Claymorphism settings","block-collections"),initialOpen:!1},(0,n.createElement)(r.RangeControl,{value:E,label:(0,a.__)("Opacity","block-collections"),max:1,min:0,step:.1,onChange:e=>i({...o,opacity:e}),withInputField:!1}),(0,n.createElement)(r.RangeControl,{value:k,label:"Depth",max:20,min:0,onChange:e=>i({...o,depth:e}),withInputField:!1}),(0,n.createElement)(r.RangeControl,{value:w,label:"Expand",max:50,min:0,onChange:e=>i({...o,expand:e}),withInputField:!1}),(0,n.createElement)(r.RangeControl,{value:y,label:"Background Blur",max:10,min:0,onChange:e=>i({...o,bdBlur:e}),withInputField:!1}),(0,n.createElement)("div",{className:"light_direction claymor"},(0,n.createElement)(r.RadioControl,{selected:x,options:[{value:"right_bottom"},{value:"top_right"},{value:"top"}],onChange:e=>i({...o,clayDirection:e})}))),"glassmor"===c&&(0,n.createElement)(r.PanelBody,{title:(0,a.__)("Grassmophism settings","block-collections"),initialOpen:!1},(0,n.createElement)(r.RangeControl,{value:S,label:(0,a.__)("Glass blur","block-collections"),max:20,min:0,onChange:e=>i({...o,glassblur:e}),withInputField:!1}),(0,n.createElement)(r.RangeControl,{value:$,label:(0,a.__)("Glass Opacity","block-collections"),max:1,min:0,step:.1,onChange:e=>i({...o,glassopa:e}),withInputField:!1}),(0,n.createElement)("fieldset",null,(0,n.createElement)(r.ToggleControl,{label:(0,a.__)("Show outline","block-collections"),checked:R,onChange:()=>i({...o,hasOutline:!R})}))))},y=l(2501);const w={top:"10px",left:"10px",right:"10px",bottom:"10px"},S={top:"0px",left:"0px",right:"0px",bottom:"0px"},$=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function R(e){const{attributes:t,setAttributes:l}=e,{required:o,labelContent:i,font_style_label:s,bgColor_label:u,bgGradient_label:b,textColor_label:m,radius_label:d,border_label:p,padding_label:h,labelSpace:C}=t;return _(y.Z,e.attributes),(0,n.createElement)(n.Fragment,null,(0,n.createElement)(g.InspectorControls,{group:"settings"},(0,n.createElement)(r.PanelBody,{title:(0,a.__)("Required Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,n.createElement)(r.PanelRow,{className:"labelRequierd_row"},(0,n.createElement)(r.ToggleControl,{label:(0,a.__)("Required input","block-collections"),checked:o.flg,onChange:e=>{const t={...o,flg:e};l({required:t})}})),o.flg&&(0,n.createElement)(r.PanelRow,null,(0,n.createElement)(r.TextControl,{label:(0,a.__)("Show 'required'","block-collections"),value:o.display,isPressEnterToChange:!0,onChange:e=>{const t={...o,display:e};l({required:t})}}))),(0,n.createElement)(r.PanelBody,{title:(0,a.__)("Label Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,n.createElement)(r.PanelRow,{className:"labelInfo_row"},(0,n.createElement)(r.TextControl,{label:(0,a.__)("Text of Label","block-collections"),labelPosition:"top",value:i,isPressEnterToChange:!0,onChange:e=>l({labelContent:e})})))),(0,n.createElement)(g.InspectorControls,{group:"styles"},(0,n.createElement)(r.PanelBody,{title:(0,a.__)("Label style settings","block-collections"),initialOpen:!1,className:"title_design_ctrl"},(0,n.createElement)(c,{title:(0,a.__)("Typography","block-collections"),fontStyle:s,onChange:e=>{l({font_style_label:e})},initialOpen:!1}),(0,n.createElement)(g.__experimentalPanelColorGradientSettings,{title:(0,a.__)("Label Color Setting","block-collections"),settings:[{colorValue:m,label:(0,a.__)("Choose Text color","block-collections"),onColorChange:e=>l({textColor_label:e})},{colorValue:u,gradientValue:b,label:(0,a.__)("Choose Background color","block-collections"),onColorChange:e=>l({bgColor_label:e}),onGradientChange:e=>l({bgGradient_label:e})}]}),(0,n.createElement)(r.PanelBody,{title:(0,a.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl"},(0,n.createElement)(r.__experimentalBorderBoxControl,{onChange:e=>l({border_label:e}),value:p,allowReset:!0,resetValues:S}),(0,n.createElement)(g.__experimentalBorderRadiusControl,{values:d,onChange:e=>l({radius_label:"string"==typeof e?{value:e}:e})})),(0,n.createElement)(r.__experimentalBoxControl,{label:(0,a.__)("Padding settings","block-collections"),values:h,onChange:e=>l({padding_label:e}),units:$,allowReset:!0,resetValues:w}),(0,n.createElement)(r.__experimentalUnitControl,{dragDirection:"e",onChange:e=>l({labelSpace:e}),label:(0,a.__)("Spacing with textbox","block-collections"),value:C}))),(0,n.createElement)(y.Z,{attributes:t},o.flg?(0,n.createElement)(n.Fragment,null,i,(0,n.createElement)("span",null,"(",o.display,")")):i))}let B=(e=21)=>crypto.getRandomValues(new Uint8Array(e)).reduce(((e,t)=>e+((t&=63)<36?t.toString(36):t<62?(t-26).toString(36).toUpperCase():t>62?"-":"_")),"");const N={top:"10px",left:"10px",right:"10px",bottom:"10px"},P={top:"0px",left:"0px",right:"0px",bottom:"0px"},I=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function F(e){let{attributes:t,setAttributes:l,context:i}=e;const{inputName:b,selPattern:m,selectValues:d,selectedValues:p,folder_val:h,required:C,bgColor:x,optionColor:f,hoverBgColor:E,font_style_option:y,default_pos:w,mobile_pos:S,bgSelectColor:$,bgSelectGradient:F,radius_value:O,border_value:T,labelContent:L,labelWidth:V,labelVertAlign:D,font_style_label:G,bgColor_label:M,bgGradient_label:W,textColor_label:q,radius_label:A,border_label:J,padding_label:U,labelSpace:z,shadow_element:Z,shadow_result:H,is_shadow:K,className:Y}=t,j=function(){const[e,t]=(0,n.useState)(!1);return(0,n.useEffect)((()=>{const e=()=>{const e=document.getElementsByName("editor-canvas")[0];e&&e.contentWindow&&t(e.contentWindow.innerWidth<=767)},l=document.getElementsByName("editor-canvas")[0];return l&&l.contentWindow&&l.contentWindow.addEventListener("resize",e),e(),()=>{l&&l.contentWindow&&l.contentWindow.removeEventListener("resize",e)}}),[]),e}(),Q=(0,n.useRef)(null),X=(0,g.useBlockProps)({ref:Q,style:{backgroundColor:x}}),ee=function(e,t){const[l,o]=(0,n.useState)("");return(0,n.useEffect)((()=>{if(e.current&&t)if(t.backgroundColor&&!t.backgroundColor.startsWith("var(--wp"))o(t.backgroundColor);else if(e.current){const t=getComputedStyle(e.current);o(t.backgroundColor)}}),[t,e]),l}(Q,X.style);(0,n.useEffect)((()=>{if(ee){l({shadow_element:{...Z,baseColor:ee}});const e=v({...Z,baseColor:ee});e&&l({shadow_result:e.style})}}),[ee]),_(s.J,t);const te="multi"===m?{multiple:!0}:{};_(s.J,t);const le=i["itmar/label_width"]||"auto";(0,n.useEffect)((()=>{l({labelWidth:le})}),[le]),(0,n.useEffect)((()=>{l({selectedValues:[]})}),[m]);const[oe,ne]=(0,n.useState)(!1),[ae,re]=(0,n.useState)(null),[ie,ce]=(0,n.useState)(!1),[se,ue]=(0,n.useState)(null),be=()=>ne(!0),me=()=>ne(!1),de=()=>{ce(!1),ue(null)},pe=(e,t)=>{re((l=>({...l,[e]:t})))};return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(g.InspectorControls,{group:"settings"},(0,n.createElement)(r.PanelBody,{title:(0,a.__)("Select Element Settings","block-collections"),initialOpen:!0,className:"select_design_ctrl"},(0,n.createElement)(r.PanelRow,null,(0,n.createElement)(r.TextControl,{label:(0,a.__)("name attribute name","block-collections"),value:b,onChange:e=>l({inputName:e})})),(0,n.createElement)("label",{className:"components-base-control__label"},(0,a.__)("Select Pattern","block-collections")),(0,n.createElement)(r.PanelRow,{className:"itmar_select_row"},(0,n.createElement)(r.RadioControl,{selected:m,options:[{label:(0,a.__)("Single Select","block-collections"),value:"single"},{label:(0,a.__)("Nulti Select","block-collections"),value:"multi"}],onChange:e=>{l({selPattern:e})}})),(0,n.createElement)(r.TextControl,{label:(0,a.__)("Place Folder Display","block-collections"),value:h,onChange:e=>l({folder_val:e})}),(0,n.createElement)(r.PanelBody,{className:"itmar_notice_select_panel",title:(0,a.__)("Option info Setting","block-collections")},(0,n.createElement)(r.Button,{label:(0,a.__)("add","block-collections"),icon:"insert",onClick:()=>{const e=B(5);re({id:e,value:"",label:"",classname:""}),be()}}),d.map((e=>(0,n.createElement)(r.Notice,{key:e.id,status:"info",onRemove:()=>(e=>{ue(e),ce(!0)})(e)},(0,n.createElement)("span",{onClick:()=>(e=>{re(e),be()})(e)},e.label))))))),(0,n.createElement)(g.InspectorControls,{group:"styles"},(0,n.createElement)(r.PanelBody,{title:(0,a.__)("Global settings","block-collections"),initialOpen:!1,className:"select_design_ctrl"},(0,n.createElement)(g.__experimentalPanelColorGradientSettings,{title:(0,a.__)("Background Color Setting","block-collections"),settings:[{colorValue:x,label:(0,a.__)("Choose Block Background color","block-collections"),onColorChange:e=>l({bgColor:e})},{colorValue:$,gradientValue:F,label:(0,a.__)("Choose Select Background color","block-collections"),onColorChange:e=>{l({bgSelectColor:void 0===e?"":e})},onGradientChange:e=>l({bgSelectGradient:e})}]}),(0,n.createElement)(r.__experimentalBoxControl,{label:j?(0,a.__)("Margin settings(mobile)","block-collections"):(0,a.__)("Margin settings(desk top)","block-collections"),values:j?S.margin_value:w.margin_value,onChange:e=>{l(j?{mobile_pos:{...S,margin_value:e}}:{default_pos:{...w,margin_value:e}})},units:I,allowReset:!0,resetValues:N}),(0,n.createElement)(r.__experimentalBoxControl,{label:j?(0,a.__)("Padding settings(mobile)","block-collections"):(0,a.__)("Padding settings(desk top)","block-collections"),values:j?S.padding_value:w.padding_value,onChange:e=>{l(j?{mobile_pos:{...S,padding_value:e}}:{default_pos:{...w,padding_value:e}})},units:I,allowReset:!0,resetValues:N}),(0,n.createElement)(r.PanelBody,{title:(0,a.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl"},(0,n.createElement)(r.__experimentalBorderBoxControl,{colors:[{color:"#72aee6"},{color:"#000"},{color:"#fff"}],onChange:e=>l({border_value:e}),value:T,allowReset:!0,resetValues:P}),(0,n.createElement)(g.__experimentalBorderRadiusControl,{values:O,onChange:e=>l({radius_value:"string"==typeof e?{value:e}:e})})),(0,n.createElement)(r.ToggleControl,{label:(0,a.__)("Is Shadow","block-collections"),checked:K,onChange:e=>{l({is_shadow:e})}}),K&&(0,n.createElement)(k,{shadowStyle:{...Z},onChange:(e,t)=>{l({shadow_result:e.style}),l({shadow_element:t})}})),(0,n.createElement)(r.PanelBody,{title:(0,a.__)("Option Style Settings","block-collections"),initialOpen:!1,className:"select_design_ctrl"},(0,n.createElement)(c,{title:(0,a.__)("Typography","block-collections"),fontStyle:y,onChange:e=>{l({font_style_option:e})},initialOpen:!1}),(0,n.createElement)(g.__experimentalPanelColorGradientSettings,{title:(0,a.__)("Option Color Setting","block-collections"),settings:[{colorValue:f,label:(0,a.__)("Choose Text color","block-collections"),onColorChange:e=>l({optionColor:e})},{colorValue:E,label:(0,a.__)("Choose Background color on mouse hover","block-collections"),onColorChange:e=>l({hoverBgColor:e})}]}))),oe&&(0,n.createElement)(r.Modal,{title:(0,a.__)("Option Info Edit","block-collections"),onRequestClose:me},(0,n.createElement)(r.TextControl,{label:(0,a.__)("Display Label","block-collections"),value:ae.label,onChange:e=>pe("label",e)}),(0,n.createElement)(r.TextControl,{label:(0,a.__)("Option Value","block-collections"),value:ae.value,onChange:e=>pe("value",e)}),(0,n.createElement)(r.TextControl,{label:(0,a.__)("Class Name","block-collections"),value:ae.classname,onChange:e=>pe("classname",e)}),(0,n.createElement)(r.Button,{variant:"primary",onClick:()=>{if(ae&&d.some((e=>e.id===ae.id))){const e=d.map((e=>e.id===ae.id?ae:e));l({selectValues:e})}else l({selectValues:[...d,ae]});me()}},(0,a.__)("Save Changes","block-collections"))),ie&&(0,n.createElement)(r.Modal,{title:(0,a.__)("Confirm Deletion","block-collections"),onRequestClose:de},(0,n.createElement)("p",null,(0,a.__)("Are you sure you want to delete this item?","block-collections")),(0,n.createElement)(r.Button,{variant:"primary",onClick:()=>{se&&(e=>{const t=d.filter((t=>t.id!==e));l({selectValues:t})})(se.id),de()}},(0,a.__)("Yes, Delete","block-collections")),(0,n.createElement)(r.Button,{variant:"secondary",onClick:de},(0,a.__)("Cancel","block-collections"))),(0,n.createElement)("div",X,(0,n.createElement)(s.J,{attributes:t},(0,n.createElement)(n.Fragment,null,(0,n.createElement)(u.M,{onOptionSelect:e=>{if(null==e)return void l({selectedValues:[]});if(p.includes(e))return;const t="multi"===m?[...p,e]:[e];l({selectedValues:t})},onOptionDeselect:e=>{const t=p.filter((t=>t!==e));l({selectedValues:t})}},(0,n.createElement)("select",(0,o.Z)({class:"nomal"},te,{name:b,"data-placeholder":h}),"single"===m&&(0,n.createElement)("option",{value:""},(0,a.__)("Please Select.","block-collections")),d.map((e=>(0,n.createElement)("option",{id:e.id,className:e.classname,value:e.value,selected:p.includes(e.id)},e.label))))),(0,n.createElement)(R,{attributes:{required:C,labelContent:L,font_style_label:G,bgColor_label:M,bgGradient_label:W,textColor_label:q,radius_label:A,border_label:J,padding_label:U,labelSpace:z,labelWidth:V,labelVertAlign:D,shadow_result:H,is_shadow:K,className:Y},setAttributes:l})))))}}}]);