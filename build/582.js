"use strict";(self.webpackChunkblock_collections=self.webpackChunkblock_collections||[]).push([[582],{2027:function(e,t,l){l.d(t,{AC:function(){return r},KW:function(){return s},Kj:function(){return i}});var n=l(9307),o=l(8446),a=l.n(o);function r(e,t){const[l,o]=(0,n.useState)("");return(0,n.useEffect)((()=>{if(e.current&&t)if(t.backgroundColor&&!t.backgroundColor.startsWith("var(--wp"))o(t.backgroundColor);else if(e.current){const t=getComputedStyle(e.current);o(t.backgroundColor)}}),[t,e]),l}function i(){const[e,t]=(0,n.useState)(!1);return(0,n.useEffect)((()=>{const e=()=>{const e=document.getElementsByName("editor-canvas")[0];e&&e.contentWindow&&t(e.contentWindow.innerWidth<=767)},l=document.getElementsByName("editor-canvas")[0];return l&&l.contentWindow&&l.contentWindow.addEventListener("resize",e),e(),()=>{l&&l.contentWindow&&l.contentWindow.removeEventListener("resize",e)}}),[]),e}function s(e,t){const l=(0,n.useRef)();a()(t,l.current)||(l.current=t),(0,n.useEffect)((()=>e()),[l.current])}},3704:function(e,t,l){l.d(t,{Z:function(){return m}});var n=l(9307),o=l(5736),a=l(3812),r=l(641),i=l(2175),s=l(5609),c=l(5849);const u={top:"10px",left:"10px",right:"10px",bottom:"10px"},b={top:"0px",left:"0px",right:"0px",bottom:"0px"},p=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function m(e){const{attributes:t,setAttributes:l}=e,{required:m,labelContent:d,font_style_label:g,bgColor_label:_,bgGradient_label:h,textColor_label:C,radius_label:x,border_label:f,padding_label:y,labelSpace:E,isMobile:k}=t;return(0,r.P)(c.Z,e.attributes),(0,n.createElement)(n.Fragment,null,(0,n.createElement)(i.InspectorControls,{group:"settings"},(0,n.createElement)(s.PanelBody,{title:(0,o.__)("Required Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,n.createElement)(s.PanelRow,{className:"labelRequierd_row"},(0,n.createElement)(s.ToggleControl,{label:(0,o.__)("Required input","block-collections"),checked:m.flg,onChange:e=>{const t={...m,flg:e};l({required:t})}})),m.flg&&(0,n.createElement)(s.PanelRow,null,(0,n.createElement)(s.TextControl,{label:(0,o.__)("Show 'required'","block-collections"),value:m.display,isPressEnterToChange:!0,onChange:e=>{const t={...m,display:e};l({required:t})}}))),(0,n.createElement)(s.PanelBody,{title:(0,o.__)("Label Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,n.createElement)(s.PanelRow,{className:"labelInfo_row"},(0,n.createElement)(s.TextControl,{label:(0,o.__)("Text of Label","block-collections"),labelPosition:"top",value:d,isPressEnterToChange:!0,onChange:e=>l({labelContent:e})})))),(0,n.createElement)(i.InspectorControls,{group:"styles"},(0,n.createElement)(s.PanelBody,{title:(0,o.__)("Label style settings","block-collections"),initialOpen:!1,className:"title_design_ctrl"},(0,n.createElement)(a.Z,{title:(0,o.__)("Typography","block-collections"),fontStyle:g,onChange:e=>{l({font_style_label:e})},isMobile:k,initialOpen:!1}),(0,n.createElement)(i.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Label Color Setting","block-collections"),settings:[{colorValue:C,label:(0,o.__)("Choose Text color","block-collections"),onColorChange:e=>l({textColor_label:e})},{colorValue:_,gradientValue:h,label:(0,o.__)("Choose Background color","block-collections"),onColorChange:e=>l({bgColor_label:e}),onGradientChange:e=>l({bgGradient_label:e})}]}),(0,n.createElement)(s.PanelBody,{title:(0,o.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl"},(0,n.createElement)(s.__experimentalBorderBoxControl,{onChange:e=>l({border_label:e}),value:f,allowReset:!0,resetValues:b}),(0,n.createElement)(i.__experimentalBorderRadiusControl,{values:x,onChange:e=>l({radius_label:"string"==typeof e?{value:e}:e})})),(0,n.createElement)(s.__experimentalBoxControl,{label:(0,o.__)("Padding settings","block-collections"),values:y,onChange:e=>l({padding_label:e}),units:p,allowReset:!0,resetValues:u}),(0,n.createElement)(s.__experimentalUnitControl,{dragDirection:"e",onChange:e=>l({labelSpace:e}),label:(0,o.__)("Spacing with textbox","block-collections"),value:E}))),(0,n.createElement)(c.Z,{attributes:t},m.flg?(0,n.createElement)(n.Fragment,null,d,(0,n.createElement)("span",null,"(",m.display,")")):d))}},6812:function(e,t,l){l.d(t,{e:function(){return b}});var n=l(9307),o=l(5736),a=l(2175),r=l(5609),i=l(9818),s=l(9747);const c=(e,t)=>{let l,n,o,a;switch(e){case"top_left":l=t,n=t,o=-1*t,a=-1*t;break;case"top_right":l=-1*t,n=t,o=t,a=-1*t;break;case"bottom_left":case"right_bottom":l=t,n=-1*t,o=-1*t,a=t;break;case"bottom_right":l=-1*t,n=-1*t,o=t,a=t;break;case"top":l=0,n=0,o=-1*t,a=t}return{topLeft:l,topRight:n,bottomLeft:o,bottmRight:a}};function u(e){return e.includes("linear-gradient")||e.includes("radial-gradient")}const b=e=>{const{shadowType:t,spread:l,lateral:n,longitude:a,nomalBlur:r,shadowColor:b,blur:p,intensity:m,distance:d,newDirection:g,clayDirection:_,embos:h,opacity:C,depth:x,bdBlur:f,expand:y,glassblur:E,glassopa:k,hasOutline:v,baseColor:w}=e;if("nomal"===t)return"dent"===h?{style:{boxShadow:`${n}px ${a}px ${r}px ${l}px transparent, inset ${n}px ${a}px ${r}px ${l}px ${b}`}}:{style:{boxShadow:`${n}px ${a}px ${r}px ${l}px ${b}, inset ${n}px ${a}px ${r}px ${l}px transparent`}};if("newmor"===t){if(u(w))return(0,i.dispatch)("core/notices").createNotice("error",(0,o.__)("Neumorphism cannot be set when the background color is a gradient. ","itmar_guest_contact_block"),{type:"snackbar",isDismissible:!0}),null;const e=(0,s.vc)(w),t=e.lightness+m<100?e.lightness+m:100,l=e.lightness-m>0?e.lightness-m:0,n=(0,s.Pr)(e.hue,e.saturation,t),a=(0,s.Pr)(e.hue,e.saturation,l),r=c(g,d),b={style:{border:"none",background:w}};return"swell"===h?{style:{...b.style,boxShadow:`${r.topLeft}px ${r.topRight}px ${p}px ${a}, ${r.bottomLeft}px ${r.bottmRight}px ${p}px ${n}, inset ${r.topLeft}px ${r.topRight}px ${p}px transparent, inset ${r.bottomLeft}px ${r.bottmRight}px ${p}px transparent`}}:{style:{...b.style,boxShadow:`${r.topLeft}px ${r.topRight}px ${p}px transparent, ${r.bottomLeft}px ${r.bottmRight}px ${p}px transparent, inset ${r.topLeft}px ${r.topRight}px ${p}px ${a}, inset ${r.bottomLeft}px ${r.bottmRight}px ${p}px ${n}`}}}if("claymor"===t){if(u(w))return(0,i.dispatch)("core/notices").createNotice("error",(0,o.__)("claymorphism cannot be set when the background color is a gradient. ","itmar_guest_contact_block"),{type:"snackbar",isDismissible:!0}),null;const e=(0,s.MM)(w),t=c(_,y),l=c(_,x),n={style:{background:`rgba(255, 255, 255, ${C})`,backdropFilter:`blur(${f}px)`,border:"none"}};return{...n,style:{...n.style,boxShadow:`${t.topLeft}px ${t.bottmRight}px ${2*y}px 0px rgba(${e.red}, ${e.green}, ${e.blue}, 0.5), inset ${l.topRight}px ${l.bottomLeft}px 16px 0px rgba(${e.red}, ${e.green}, ${e.blue}, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)`}}}if("glassmor"===t){const e={style:{backgroundColor:`rgba(255, 255, 255, ${k})`,...v?{border:"1px solid rgba(255, 255, 255, 0.4)"}:{},borderRightColor:"rgba(255, 255, 255, 0.2)",borderBottomColor:"rgba(255, 255, 255, 0.2)",backdropFilter:`blur( ${E}px )`}};return"swell"===h?{...e,style:{...e.style,boxShadow:"0 8px 12px 0 rgba( 31, 38, 135, 0.37 ), inset 0 8px 12px 0 transparent"}}:{...e,style:{...e.style,boxShadow:"0 8px 12px 0 transparent, inset 0 8px 12px 0 rgba( 31, 38, 135, 0.37 )"}}}};t.Z=e=>{let{shadowStyle:t,onChange:l}=e;const[i,s]=(0,n.useState)(t),{shadowType:c,spread:u,lateral:p,longitude:m,nomalBlur:d,shadowColor:g,blur:_,intensity:h,distance:C,newDirection:x,clayDirection:f,embos:y,opacity:E,depth:k,bdBlur:v,expand:w,glassblur:$,glassopa:S,hasOutline:R}=i;return(0,n.useEffect)((()=>{const e=b(i);e&&l(e,i)}),[i]),(0,n.createElement)(n.Fragment,null,(0,n.createElement)(r.PanelBody,{title:(0,o.__)("Shadow Type","block-collections"),initialOpen:!0},(0,n.createElement)("div",{className:"itmar_shadow_type"},(0,n.createElement)(r.RadioControl,{selected:c,options:[{label:(0,o.__)("Nomal","block-collections"),value:"nomal"},{label:(0,o.__)("Neumorphism","block-collections"),value:"newmor"},{label:(0,o.__)("Claymorphism","block-collections"),value:"claymor"},{label:(0,o.__)("Grassmophism","block-collections"),value:"glassmor"}],onChange:e=>s({...i,shadowType:e})})),"claymor"!==c&&(0,n.createElement)("div",{className:"embos"},(0,n.createElement)(r.RadioControl,{label:(0,o.__)("unevenness","block-collections"),selected:y,options:[{value:"swell"},{value:"dent"}],onChange:e=>s({...i,embos:e})}))),"nomal"===c&&(0,n.createElement)(r.PanelBody,{title:(0,o.__)("Nomal settings","block-collections"),initialOpen:!1},(0,n.createElement)(r.RangeControl,{value:u,label:(0,o.__)("Spread","block-collections"),max:50,min:0,onChange:e=>s({...i,spread:e}),withInputField:!1}),(0,n.createElement)(r.RangeControl,{value:p,label:(0,o.__)("Lateral direction","block-collections"),max:50,min:0,onChange:e=>s({...i,lateral:e}),withInputField:!1}),(0,n.createElement)(r.RangeControl,{value:m,label:(0,o.__)("Longitudinal direction","block-collections"),max:50,min:0,onChange:e=>s({...i,longitude:e}),withInputField:!1}),(0,n.createElement)(r.RangeControl,{value:d,label:(0,o.__)("Blur","block-collections"),max:20,min:0,onChange:e=>s({...i,nomalBlur:e}),withInputField:!1}),(0,n.createElement)(a.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Shadow Color Setting","block-collections"),settings:[{colorValue:g,label:(0,o.__)("Choose Shadow color","block-collections"),onColorChange:e=>s({...i,shadowColor:e})}]})),"newmor"===c&&(0,n.createElement)(r.PanelBody,{title:(0,o.__)("Neumorphism settings","block-collections"),initialOpen:!1},(0,n.createElement)(r.RangeControl,{value:C,label:(0,o.__)("Distance","block-collections"),max:50,min:0,onChange:e=>s({...i,distance:e}),withInputField:!1}),(0,n.createElement)(r.RangeControl,{value:h,label:(0,o.__)("Intensity","block-collections"),max:100,min:0,onChange:e=>s({...i,intensity:e}),withInputField:!1}),(0,n.createElement)(r.RangeControl,{value:_,label:(0,o.__)("Blur","block-collections"),max:20,min:0,onChange:e=>s({...i,blur:e}),withInputField:!1}),(0,n.createElement)(r.PanelRow,null,(0,n.createElement)("div",{className:"light_direction"},(0,n.createElement)(r.RadioControl,{selected:x,options:[{value:"top_left"},{value:"top_right"},{value:"bottom_left"},{value:"bottom_right"}],onChange:e=>s({...i,newDirection:e})})))),"claymor"===c&&(0,n.createElement)(r.PanelBody,{title:(0,o.__)("Claymorphism settings","block-collections"),initialOpen:!1},(0,n.createElement)(r.RangeControl,{value:E,label:(0,o.__)("Opacity","block-collections"),max:1,min:0,step:.1,onChange:e=>s({...i,opacity:e}),withInputField:!1}),(0,n.createElement)(r.RangeControl,{value:k,label:"Depth",max:20,min:0,onChange:e=>s({...i,depth:e}),withInputField:!1}),(0,n.createElement)(r.RangeControl,{value:w,label:"Expand",max:50,min:0,onChange:e=>s({...i,expand:e}),withInputField:!1}),(0,n.createElement)(r.RangeControl,{value:v,label:"Background Blur",max:10,min:0,onChange:e=>s({...i,bdBlur:e}),withInputField:!1}),(0,n.createElement)("div",{className:"light_direction claymor"},(0,n.createElement)(r.RadioControl,{selected:f,options:[{value:"right_bottom"},{value:"top_right"},{value:"top"}],onChange:e=>s({...i,clayDirection:e})}))),"glassmor"===c&&(0,n.createElement)(r.PanelBody,{title:(0,o.__)("Grassmophism settings","block-collections"),initialOpen:!1},(0,n.createElement)(r.RangeControl,{value:$,label:(0,o.__)("Glass blur","block-collections"),max:20,min:0,onChange:e=>s({...i,glassblur:e}),withInputField:!1}),(0,n.createElement)(r.RangeControl,{value:S,label:(0,o.__)("Glass Opacity","block-collections"),max:1,min:0,step:.1,onChange:e=>s({...i,glassopa:e}),withInputField:!1}),(0,n.createElement)("fieldset",null,(0,n.createElement)(r.ToggleControl,{label:(0,o.__)("Show outline","block-collections"),checked:R,onChange:()=>s({...i,hasOutline:!R})}))))}},3812:function(e,t,l){var n=l(9307),o=l(5609),a=l(3157),r=l(5736);t.Z=e=>{let{title:t,fontStyle:l,initialOpen:i,isMobile:s,onChange:c}=e;const{default_fontSize:u,mobile_fontSize:b,fontSize:p,fontFamily:m,fontWeight:d,isItalic:g}=l,_=[{value:"Arial, sans-serif",label:"Arial",fontFamily:"Arial, sans-serif"},{value:"Courier New, monospace",label:"Courier New",fontFamily:"Courier New, monospace"},{value:"Georgia, serif",label:"Georgia",fontFamily:"Georgia, serif"},{label:"Noto Sans JP",value:"Noto Sans JP, sans-serif",fontFamily:"Noto Sans JP, sans-serif"},{label:"Texturina",value:"Texturina, serif",fontFamily:"Texturina, serif"}],h={option:(e,t)=>({...e,fontFamily:t.data.fontFamily})};return(0,n.createElement)(o.PanelBody,{title:t,initialOpen:i},(0,n.createElement)(o.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{e=""!=e?e:"0px";const t=s?{mobile_fontSize:e}:{default_fontSize:e},n={...l,...t};c(n)},label:s?(0,r.__)("Size(mobile)","block-collections"):(0,r.__)("Size(desk top)","block-collections"),value:s?b:u,units:[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}]}),(0,n.createElement)((e=>{let{label:t,value:l,onChange:o}=e;return(0,n.createElement)(n.Fragment,null,t&&(0,n.createElement)("label",{className:"components-base-control__label"},t),(0,n.createElement)(a.ZP,{options:_,value:_.find((e=>e.value===l)),onChange:e=>{o(e.value)},styles:h}))}),{label:(0,r.__)("font family","block-collections"),value:m,onChange:e=>{const t={...l,fontFamily:e};c(t)}}),(0,n.createElement)("label",{className:"components-base-control__label"},(0,r.__)("font weight","block-collections")),(0,n.createElement)(o.PanelRow,{className:"itmar_weight_row"},(0,n.createElement)(o.RadioControl,{selected:d,options:[{label:"LIGHT",value:"300"},{label:"REGULAR",value:"400"},{label:"MEDIUM",value:"500"},{label:"S-BOLD",value:"600"},{label:"BOLD",value:"700"},{label:"BLACK",value:"900"}],onChange:e=>{const t={...l,fontWeight:e};c(t)}})),(0,n.createElement)("label",{className:"components-base-control__label"},(0,r.__)("Italic display","block-collections")),(0,n.createElement)(o.ToggleControl,{checked:g,onChange:e=>{const t={...l,isItalic:e};c(t)}}))}},5582:function(e,t,l){l.r(t),l.d(t,{default:function(){return _}});var n=l(9307),o=l(5736),a=l(3812),r=l(3467),i=l(641),s=l(6812),c=l(2027),u=l(3704),b=l(5609),p=l(2175);const m={top:"10px",left:"10px",right:"10px",bottom:"10px"},d={top:"0px",left:"0px",right:"0px",bottom:"0px"},g=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function _(e){const{attributes:t,setAttributes:l}=e,{inputName:_,inputValue:h,placeFolder:C,inputType:x,required:f,focusColor:y,bgColor:E,font_style_input:k,bgColor_input:v,bgGradient_input:w,textColor_input:$,radius_input:S,border_input:R,default_pos:B,mobile_pos:P,labelContent:N,font_style_label:I,bgColor_label:F,bgGradient_label:T,textColor_label:L,radius_label:M,border_label:O,padding_label:G,labelSpace:V,labelWidth:D,labelVertAlign:A,shadow_element:W,shadow_result:q,is_shadow:Z,className:z}=t,H=(0,c.Kj)(),K=(0,n.useRef)(null),J=(0,p.useBlockProps)({ref:K,style:{backgroundColor:E}}),U=(0,c.AC)(K,J.style);(0,n.useEffect)((()=>{if(U){l({shadow_element:{...W,baseColor:U}});const e=(0,s.e)({...W,baseColor:U});e&&l({shadow_result:e.style})}}),[U]),(0,i.P)(r.J,t);const j=f.flg?`${N}(${f.display})`:N,X=e.context["itmar/label_width"]||"auto";(0,n.useEffect)((()=>{l({labelWidth:X})}),[X]);const[Q,Y]=(0,n.useState)(h),[ee,te]=(0,n.useState)("auto"),le=(0,n.useRef)(null);return(0,n.useEffect)((()=>{le.current&&te(`${le.current.scrollHeight}px`)}),[z]),(0,n.createElement)(n.Fragment,null,(0,n.createElement)(p.InspectorControls,{group:"settings"},(0,n.createElement)(b.PanelBody,{title:(0,o.__)("Input element information setting","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,n.createElement)(b.PanelRow,null,(0,n.createElement)(b.TextControl,{label:(0,o.__)("name attribute name","block-collections"),value:_,onChange:e=>l({inputName:e})})),(0,n.createElement)(b.PanelRow,null,(0,n.createElement)(b.TextControl,{label:(0,o.__)("PlaceHolder","block-collections"),value:C,isPressEnterToChange:!0,onChange:e=>l({placeFolder:e})})),(0,n.createElement)(b.PanelRow,{className:"itmar_weight_row"},(0,n.createElement)(b.RadioControl,{selected:x,label:(0,o.__)("Kind of Input Element","block-collections"),options:[{label:"TEXT",value:"text"},{label:"E-MAIL",value:"email"},{label:"AREA",value:"textarea"}],onChange:e=>{l({inputType:e})}})))),(0,n.createElement)(p.InspectorControls,{group:"styles"},(0,n.createElement)(b.PanelBody,{title:(0,o.__)("Global settings","block-collections"),initialOpen:!1,className:"title_design_ctrl"},(0,n.createElement)(p.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Background Color Setting","block-collections"),settings:[{colorValue:E,label:(0,o.__)("Choose Background color","block-collections"),onColorChange:e=>l({bgColor:e})}]}),(0,n.createElement)(p.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Focus Color Setting","block-collections"),settings:[{colorValue:y,label:(0,o.__)("Choose Focus color","block-collections"),onColorChange:e=>l({focusColor:e})}]}),(0,n.createElement)(b.__experimentalBoxControl,{label:H?(0,o.__)("Margin settings(mobile)","block-collections"):(0,o.__)("Margin settings(desk top)","block-collections"),values:H?P.margin_input:B.margin_input,onChange:e=>{l(H?{mobile_pos:{...P,margin_input:e}}:{default_pos:{...B,margin_input:e}})},units:g,allowReset:!0,resetValues:m}),(0,n.createElement)(b.__experimentalBoxControl,{label:H?(0,o.__)("Padding settings(mobile)","block-collections"):(0,o.__)("Padding settings(desk top)","block-collections"),values:H?P.padding_input:B.padding_input,onChange:e=>{l(H?{mobile_pos:{...P,padding_input:e}}:{default_pos:{...B,padding_input:e}})},units:g,allowReset:!0,resetValues:m}),(0,n.createElement)(b.ToggleControl,{label:(0,o.__)("Is Shadow","block-collections"),checked:Z,onChange:e=>{l({is_shadow:e})}}),Z&&(0,n.createElement)(s.Z,{shadowStyle:{...W},onChange:(e,t)=>{l({shadow_result:e.style}),l({shadow_element:t})}})),(0,n.createElement)(b.PanelBody,{title:(0,o.__)("Input Box style settings","block-collections"),initialOpen:!1,className:"title_design_ctrl"},(0,n.createElement)(a.Z,{title:(0,o.__)("Typography","block-collections"),fontStyle:k,onChange:e=>{l({font_style_input:e})},isMobile:H,initialOpen:!1}),(0,n.createElement)(p.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Color Settings","block-collections"),settings:[{colorValue:$,label:(0,o.__)("Choose Text color","block-collections"),onColorChange:e=>l({textColor_input:e})},{colorValue:v,gradientValue:w,label:(0,o.__)("Choose Background color","block-collections"),onColorChange:e=>l({bgColor_input:e}),onGradientChange:e=>l({bgGradient_input:e})}]}),(0,n.createElement)(b.PanelBody,{title:(0,o.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl"},(0,n.createElement)(b.__experimentalBorderBoxControl,{onChange:e=>l({border_input:e}),value:R,allowReset:!0,resetValues:d}),(0,n.createElement)(p.__experimentalBorderRadiusControl,{values:S,onChange:e=>l({radius_input:"string"==typeof e?{value:e}:e})})))),(0,n.createElement)("div",J,(0,n.createElement)(r.J,{attributes:t},"text"===x&&(0,n.createElement)("input",{type:"text",name:_,placeholder:"is-style-line"===z?j:C,className:"contact_text "+(Q?"":"empty"),value:Q,onChange:e=>{const t=e.target.value;Y(t),l({inputValue:t})}}),"email"===x&&(0,n.createElement)("input",{type:"email",placeholder:"is-style-line"===z?j:C,className:"contact_text "+(Q?"":"empty"),value:Q,onChange:e=>{const t=e.target.value;Y(t),l({inputValue:t})}}),"textarea"===x&&(0,n.createElement)("textarea",{ref:le,style:{height:ee},name:_,placeholder:"is-style-line"===z?j:C,className:"contact_text "+(Q?"":"empty"),value:Q,onChange:e=>{const t=e.target.value,n=e.target.scrollHeight;Y(t),te(`${n}px`),l({inputValue:t})}}),(0,n.createElement)(u.Z,{attributes:{required:f,labelContent:N,font_style_label:I,bgColor_label:F,bgGradient_label:T,textColor_label:L,radius_label:M,border_label:O,padding_label:G,labelSpace:V,labelWidth:D,labelVertAlign:A,shadow_result:q,is_shadow:Z,isMobile:H,className:z},setAttributes:l}))))}},9747:function(e,t,l){l.d(t,{MM:function(){return r},Pr:function(){return o},vc:function(){return a}});const n=e=>{function t(e){const t=parseInt(e,10).toString(16);return 1===t.length?"0"+t:t}let l,n=[];return n=/^#[0-9a-fA-F]{6}$/.test(e)?[e.slice(1,3),e.slice(3,5),e.slice(5,7)]:(l=e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/))?[t(l[1]),t(l[2]),t(l[3])]:["ff","ff","ff"],n};function o(e,t,l){var n=!1;if((e||0===e)&&e<=360&&(t||0===t)&&t<=100&&(l||0===l)&&l<=100){var o,a=0,r=0,i=0,s=0,c=0;e=Number(e)/360,t=Number(t)/100,l=Number(l)/100,0===t?(a=l,r=l,i=l):(o=function(e,t,l){return l<0&&(l+=1),l>1&&(l-=1),l<1/6?e+=6*(t-e)*l:l<.5?e=t:l<2/3&&(e+=(t-e)*(2/3-l)*6),e},a=o(c=2*l-(s=l<.5?l*(1+t):l+t-l*t),s,e+1/3),r=o(c,s,e),i=o(c,s,e-1/3)),n=`#${Math.round(255*a).toString(16).padStart(2,"0")}${Math.round(255*r).toString(16).padStart(2,"0")}${Math.round(255*i).toString(16).padStart(2,"0")}`}return n}function a(e){let t=n(e),l=t[0],o=t[1],a=t[2],r=!1;if((l||0===l)&&String(l).match(/^[0-9a-f]{2}$/i)&&(o||0===o)&&String(o).match(/^[0-9a-f]{2}$/i)&&(a||0===a)&&String(a).match(/^[0-9a-f]{2}$/i)){let e=0,t=0,n=0,i=0,s=0,c=0;l=parseInt(l,16)/255,o=parseInt(o,16)/255,a=parseInt(a,16)/255,i=Math.max(l,o,a),s=Math.min(l,o,a),n=(i+s)/2,i!==s&&(c=i-s,t=n>.5?c/(2-i-s):c/(i+s),e=i===l?(o-a)/c:i===o?2+(a-l)/c:4+(l-o)/c,e/=6),r={hue:Math.round(360*e),saturation:Math.round(100*t),lightness:Math.round(100*n)}}return r}function r(e){let t=n(e),l=t[0],o=t[1],a=t[2],r=!1;return(l||0===l)&&String(l).match(/^[0-9a-f]{2}$/i)&&(o||0===o)&&String(o).match(/^[0-9a-f]{2}$/i)&&(a||0===a)&&String(a).match(/^[0-9a-f]{2}$/i)&&(l=parseInt(l,16),o=parseInt(o,16),a=parseInt(a,16),r={red:Math.round(l),green:Math.round(o),blue:Math.round(a)}),r}},641:function(e,t,l){l.d(t,{P:function(){return i}});var n=l(9307),o=l(2027),a=l(1893),r=l(7762);function i(e,t){(0,o.KW)((()=>{const l=document.getElementsByName("editor-canvas")[0];if(l){const o=l.contentDocument||l.contentWindow.document,i=new a.qH;(0,r.Dq)(i.collectStyles((0,n.createElement)(e,{attributes:t})));const s=i.getStyleTags().replace(/<style[^>]*>|<\/style>/g,""),c=o.createElement("style");return c.innerHTML=s,o.head.appendChild(c),()=>{o.head.removeChild(c)}}}),[t])}}}]);
//# sourceMappingURL=582.js.map