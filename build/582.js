"use strict";(self.webpackChunkblock_collections=self.webpackChunkblock_collections||[]).push([[582],{2027:function(e,t,l){l.d(t,{KW:function(){return r}});var a=l(9307),n=l(8446),o=l.n(n);function r(e,t){const l=(0,a.useRef)(t);o()(t,l.current)||(l.current=t),(0,a.useEffect)((()=>e()),[l.current])}},6812:function(e,t,l){var a=l(9307),n=l(5736),o=l(2175),r=l(5609),i=l(9747);const c=(e,t)=>{let l,a,n,o;switch(e){case"top_left":l=t,a=t,n=-1*t,o=-1*t;break;case"top_right":l=-1*t,a=t,n=t,o=-1*t;break;case"bottom_left":case"right_bottom":l=t,a=-1*t,n=-1*t,o=t;break;case"bottom_right":l=-1*t,a=-1*t,n=t,o=t;break;case"top":l=0,a=0,n=-1*t,o=t}return{topLeft:l,topRight:a,bottomLeft:n,bottmRight:o}};t.Z=e=>{let{shadowStyle:t,onChange:l,children:s}=e;const[m,_]=(0,a.useState)(t),{shadowType:u,spread:p,lateral:b,longitude:g,nomalBlur:d,shadowColor:h,blur:x,intensity:C,distance:f,newDirection:E,clayDirection:y,embos:v,opacity:k,depth:w,bdBlur:$,expand:S,glassblur:R,glassopa:B,hasOutline:N,backgroundColor:P}=m;return(0,a.useEffect)((()=>{t.backgroundColor!==P&&_(t)}),[t]),(0,a.useEffect)((()=>{const e=(e=>{const{shadowType:t,spread:l,lateral:a,longitude:n,nomalBlur:o,shadowColor:r,blur:s,intensity:m,distance:_,newDirection:u,clayDirection:p,embos:b,opacity:g,depth:d,bdBlur:h,expand:x,glassblur:C,glassopa:f,hasOutline:E,backgroundColor:y}=e;if("nomal"===t)return"dent"===b?{style:{boxShadow:`${a}px ${n}px ${o}px ${l}px transparent, inset ${a}px ${n}px ${o}px ${l}px ${r}`}}:{style:{boxShadow:`${a}px ${n}px ${o}px ${l}px ${r}, inset ${a}px ${n}px ${o}px ${l}px transparent`}};if("newmor"===t){const e=y||"#ffffff",t=(0,i.vc)(e),l=t.lightness+m<100?t.lightness+m:100,a=t.lightness-m>0?t.lightness-m:0,n=(0,i.Pr)(t.hue,t.saturation,l),o=(0,i.Pr)(t.hue,t.saturation,a),r=c(u,_),p={style:{border:"none",background:e}};return"swell"===b?{...p,style:{...p.style,boxShadow:`${r.topLeft}px ${r.topRight}px ${s}px ${o}, ${r.bottomLeft}px ${r.bottmRight}px ${s}px ${n}, inset ${r.topLeft}px ${r.topRight}px ${s}px transparent, inset ${r.bottomLeft}px ${r.bottmRight}px ${s}px transparent`}}:{...p,style:{...p.style,boxShadow:`${r.topLeft}px ${r.topRight}px ${s}px transparent, ${r.bottomLeft}px ${r.bottmRight}px ${s}px transparent, inset ${r.topLeft}px ${r.topRight}px ${s}px ${o}, inset ${r.bottomLeft}px ${r.bottmRight}px ${s}px ${n}`}}}if("claymor"===t){const e=y||"#C0C0C0",t=(0,i.MM)(e),l=c(p,x),a=c(p,d),n={style:{background:`rgba(255, 255, 255, ${g})`,backdropFilter:`blur(${h}px)`,border:"none"}};return"swell"===b?{...n,style:{...n.style,boxShadow:`${l.topLeft}px ${l.bottmRight}px ${2*x}px 0px rgba(${t.red}, ${t.green}, ${t.blue}, 0.5), inset ${a.topRight}px ${a.bottomLeft}px 16px 0px rgba(${t.red}, ${t.green}, ${t.blue}, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)`}}:{...n,style:{...n.style,boxShadow:`${l.topLeft}px ${l.bottmRight}px ${2*x}px 0px rgba(${t.red}, ${t.green}, ${t.blue}, 0.5), inset ${a.topRight}px ${a.bottomLeft}px 16px 0px rgba(${t.red}, ${t.green}, ${t.blue}, 0.6), 0px 11px 28px 0px rgb(255, 255, 255)`}}}if("glassmor"===t){const e={style:{backgroundColor:`rgba(255, 255, 255, ${f})`,border:"1px solid rgba(255, 255, 255, 0.4)",borderRightColor:"rgba(255, 255, 255, 0.2)",borderBottomColor:"rgba(255, 255, 255, 0.2)",backdropFilter:`blur( ${C}px )`}};return"swell"===b?{...e,style:{...e.style,boxShadow:"0 8px 12px 0 rgba( 31, 38, 135, 0.37 ), inset 0 8px 12px 0 transparent"}}:{...e,style:{...e.style,boxShadow:"0 8px 12px 0 transparent, inset 0 8px 12px 0 rgba( 31, 38, 135, 0.37 )"}}}})(m);l(e,m)}),[m]),(0,a.createElement)(a.Fragment,null,(0,a.createElement)(o.InspectorControls,{group:"styles"},(0,a.createElement)(r.PanelBody,{title:(0,n.__)("Shadow Type","itmar_block_collections"),initialOpen:!0},(0,a.createElement)("div",{className:"itmar_shadow_type"},(0,a.createElement)(r.RadioControl,{selected:u,options:[{label:(0,n.__)("Nomal","itmar_block_collections"),value:"nomal"},{label:(0,n.__)("Neumorphism","itmar_block_collections"),value:"newmor"},{label:(0,n.__)("Claymorphism","itmar_block_collections"),value:"claymor"},{label:(0,n.__)("Grassmophism","itmar_block_collections"),value:"glassmor"}],onChange:e=>_({...m,shadowType:e})}))),"nomal"===u&&(0,a.createElement)(r.PanelBody,{title:(0,n.__)("Nomal settings","itmar_block_collections"),initialOpen:!1},(0,a.createElement)(r.RangeControl,{value:p,label:(0,n.__)("Spread","itmar_block_collections"),max:50,min:0,onChange:e=>_({...m,spread:e}),withInputField:!1}),(0,a.createElement)(r.RangeControl,{value:b,label:(0,n.__)("Lateral direction","itmar_block_collections"),max:50,min:0,onChange:e=>_({...m,lateral:e}),withInputField:!1}),(0,a.createElement)(r.RangeControl,{value:g,label:(0,n.__)("Longitudinal direction","itmar_block_collections"),max:50,min:0,onChange:e=>_({...m,longitude:e}),withInputField:!1}),(0,a.createElement)(r.RangeControl,{value:d,label:(0,n.__)("Blur","itmar_block_collections"),max:20,min:0,onChange:e=>_({...m,nomalBlur:e}),withInputField:!1}),(0,a.createElement)(o.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Shadow Color Setting","itmar_block_collections"),settings:[{colorValue:h,label:(0,n.__)("Choose Shadow color","itmar_block_collections"),onColorChange:e=>_({...m,shadowColor:e})}]})),"newmor"===u&&(0,a.createElement)(r.PanelBody,{title:(0,n.__)("Neumorphism settings","itmar_block_collections"),initialOpen:!1},(0,a.createElement)(r.RangeControl,{value:f,label:(0,n.__)("Distance","itmar_block_collections"),max:50,min:0,onChange:e=>_({...m,distance:e}),withInputField:!1}),(0,a.createElement)(r.RangeControl,{value:C,label:(0,n.__)("Intensity","itmar_block_collections"),max:100,min:0,onChange:e=>_({...m,intensity:e}),withInputField:!1}),(0,a.createElement)(r.RangeControl,{value:x,label:(0,n.__)("Blur","itmar_block_collections"),max:20,min:0,onChange:e=>_({...m,blur:e}),withInputField:!1}),(0,a.createElement)(r.PanelRow,null,(0,a.createElement)("div",{className:"light_direction"},(0,a.createElement)(r.RadioControl,{selected:E,options:[{value:"top_left"},{value:"top_right"},{value:"bottom_left"},{value:"bottom_right"}],onChange:e=>_({...m,newDirection:e})})),(0,a.createElement)("div",{className:"embos"},(0,a.createElement)(r.RadioControl,{selected:v,options:[{value:"swell"},{value:"dent"}],onChange:e=>_({...m,embos:e})})))),"claymor"===u&&(0,a.createElement)(r.PanelBody,{title:(0,n.__)("Claymorphism settings","itmar_block_collections"),initialOpen:!1},(0,a.createElement)(r.RangeControl,{value:k,label:(0,n.__)("Opacity","itmar_block_collections"),max:1,min:0,step:.1,onChange:e=>_({...m,opacity:e}),withInputField:!1}),(0,a.createElement)(r.RangeControl,{value:w,label:"Depth",max:20,min:0,onChange:e=>_({...m,depth:e}),withInputField:!1}),(0,a.createElement)(r.RangeControl,{value:S,label:"Expand",max:50,min:0,onChange:e=>_({...m,expand:e}),withInputField:!1}),(0,a.createElement)(r.RangeControl,{value:$,label:"Background Blur",max:10,min:0,onChange:e=>_({...m,bdBlur:e}),withInputField:!1}),(0,a.createElement)("div",{className:"light_direction claymor"},(0,a.createElement)(r.RadioControl,{selected:y,options:[{value:"right_bottom"},{value:"top_right"},{value:"top"}],onChange:e=>_({...m,clayDirection:e})}))),"glassmor"===u&&(0,a.createElement)(r.PanelBody,{title:(0,n.__)("Grassmophism settings","itmar_block_collections"),initialOpen:!1},(0,a.createElement)(r.RangeControl,{value:R,label:(0,n.__)("Glass blur","itmar_block_collections"),max:20,min:0,onChange:e=>_({...m,glassblur:e}),withInputField:!1}),(0,a.createElement)(r.RangeControl,{value:B,label:(0,n.__)("Glass Opacity","itmar_block_collections"),max:1,min:0,step:.1,onChange:e=>_({...m,glassopa:e}),withInputField:!1}),(0,a.createElement)("fieldset",null,(0,a.createElement)(r.ToggleControl,{label:(0,n.__)("Show outline","itmar_block_collections"),checked:N,onChange:()=>_({...m,hasOutline:!N})})))),s)}},3812:function(e,t,l){var a=l(9307),n=l(5609),o=l(3157),r=l(5736);t.Z=e=>{let{title:t,fontStyle:l,initialOpen:i,onChange:c}=e;const{fontSize:s,fontFamily:m,fontWeight:_,isItalic:u}=l,p=[{value:"Arial, sans-serif",label:"Arial",fontFamily:"Arial, sans-serif"},{value:"Courier New, monospace",label:"Courier New",fontFamily:"Courier New, monospace"},{value:"Georgia, serif",label:"Georgia",fontFamily:"Georgia, serif"},{label:"Noto Sans JP",value:"Noto Sans JP, sans-serif",fontFamily:"Noto Sans JP, sans-serif"},{label:"Texturina",value:"Texturina, serif",fontFamily:"Texturina, serif"}],b={option:(e,t)=>({...e,fontFamily:t.data.fontFamily})};return(0,a.createElement)(n.PanelBody,{title:t,initialOpen:i},(0,a.createElement)(n.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{e=""!=e?e:"0px";const t={...l,fontSize:e};c(t)},label:(0,r.__)("Size","itmar_block_collections"),value:s,units:[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}]}),(0,a.createElement)((e=>{let{label:t,value:l,onChange:n}=e;return(0,a.createElement)(a.Fragment,null,t&&(0,a.createElement)("label",{className:"components-base-control__label"},t),(0,a.createElement)(o.ZP,{options:p,value:p.find((e=>e.value===l)),onChange:e=>{n(e.value)},styles:b}))}),{label:(0,r.__)("font family","itmar_block_collections"),value:m,onChange:e=>{const t={...l,fontFamily:e};c(t)}}),(0,a.createElement)("label",{className:"components-base-control__label"},(0,r.__)("font weight","itmar_block_collections")),(0,a.createElement)(n.PanelRow,{className:"itmar_weight_row"},(0,a.createElement)(n.RadioControl,{selected:_,options:[{label:"LIGHT",value:"300"},{label:"REGULAR",value:"400"},{label:"MEDIUM",value:"500"},{label:"S-BOLD",value:"600"},{label:"BOLD",value:"700"},{label:"BLACK",value:"900"}],onChange:e=>{const t={...l,fontWeight:e};c(t)}})),(0,a.createElement)("label",{className:"components-base-control__label"},(0,r.__)("Italic display","itmar_block_collections")),(0,a.createElement)(n.ToggleControl,{checked:u,onChange:e=>{const t={...l,isItalic:e};c(t)}}))}},5582:function(e,t,l){l.r(t),l.d(t,{default:function(){return b}});var a=l(9307),n=l(5736),o=l(3812),r=l(3467),i=l(641),c=l(6812),s=l(5609),m=l(2175);const _={top:"10px",left:"10px",right:"10px",bottom:"10px"},u={top:"0px",left:"0px",right:"0px",bottom:"0px"},p=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function b(e){const{attributes:t,setAttributes:l}=e,{inputName:b,inputValue:g,placeFolder:d,inputType:h,rowNum:x,required:C,focusColor:f,bgColor:E,font_style_input:y,bgColor_input:v,bgGradient_input:k,textColor_input:w,radius_input:$,border_input:S,margin_input:R,padding_input:B,labelContent:N,font_style_label:P,bgColor_label:F,bgGradient_label:I,textColor_label:T,radius_label:L,border_label:O,padding_label:G,labelSpace:M,shadow_element:V,is_shadow:A,className:D}=t,q=(0,m.useBlockProps)({style:{backgroundColor:E}});(0,i.P)(r.J,t);const Z=C.flg?`${N}(${C.display})`:N,W=e.context["itmar/label_width"]||"auto";(0,a.useEffect)((()=>{l({labelWidth:W})}),[W]);const[J,H]=(0,a.useState)(g);function K(){return(0,a.createElement)(a.Fragment,null,"text"===h&&(0,a.createElement)("input",{type:"text",name:b,placeholder:"is-style-line"===D?Z:d,className:"contact_text "+(J?"":"empty"),value:J,onChange:e=>{const t=e.target.value;H(t),l({inputValue:t})}}),"email"===h&&(0,a.createElement)("input",{type:"email",placeholder:"is-style-line"===D?Z:d,className:"contact_text "+(J?"":"empty"),value:J,onChange:e=>{const t=e.target.value;H(t),l({inputValue:t})}}),"textarea"===h&&(0,a.createElement)("textarea",{name:b,rows:x,placeholder:"is-style-line"===D?Z:d,className:"contact_text "+(J?"":"empty"),value:J,onChange:e=>{const t=e.target.value;H(t),l({inputValue:t})}}),(0,a.createElement)("label",{className:"fit-label"},C.flg?(0,a.createElement)(a.Fragment,null,N,(0,a.createElement)("span",null,"(",C.display,")")):N))}return(0,a.createElement)(a.Fragment,null,(0,a.createElement)(m.InspectorControls,{group:"settings"},(0,a.createElement)(s.PanelBody,{title:(0,n.__)("Input element information setting","itmar_block_collections"),initialOpen:!0,className:"title_design_ctrl"},(0,a.createElement)(s.PanelRow,null,(0,a.createElement)(s.TextControl,{label:(0,n.__)("name attribute name","itmar_block_collections"),value:b,onChange:e=>l({inputName:e})})),(0,a.createElement)(s.PanelRow,null,(0,a.createElement)(s.TextControl,{label:(0,n.__)("PlaceHolder","itmar_block_collections"),value:d,isPressEnterToChange:!0,onChange:e=>l({placeFolder:e})})),(0,a.createElement)(s.PanelRow,{className:"itmar_weight_row"},(0,a.createElement)(s.RadioControl,{selected:h,label:(0,n.__)("Kind of Input Element","itmar_block_collections"),options:[{label:"TEXT",value:"text"},{label:"E-MAIL",value:"email"},{label:"AREA",value:"textarea"}],onChange:e=>{l({inputType:e})}})),"textarea"===h&&(0,a.createElement)(s.PanelRow,{className:"areaNum_row"},(0,a.createElement)(s.RangeControl,{value:x,label:(0,n.__)("Number of lines in Text Area","itmar_block_collections"),max:20,min:3,step:1,onChange:e=>l({rowNum:e}),withInputField:!0})),(0,a.createElement)(s.PanelRow,{className:"labelRequierd_row"},(0,a.createElement)(s.ToggleControl,{label:(0,n.__)("Required input","itmar_block_collections"),checked:C.flg,onChange:e=>{const t={...C,flg:e};l({required:t})}}),C.flg&&(0,a.createElement)(s.TextControl,{label:(0,n.__)("Show 'required'","itmar_block_collections"),value:C.display,isPressEnterToChange:!0,onChange:e=>{const t={...C,display:e};l({required:t})}}))),(0,a.createElement)(s.PanelBody,{title:(0,n.__)("Label Settings","itmar_block_collections"),initialOpen:!0,className:"title_design_ctrl"},(0,a.createElement)(s.PanelRow,{className:"labelInfo_row"},(0,a.createElement)(s.TextControl,{label:(0,n.__)("Text of Label","itmar_block_collections"),labelPosition:"top",value:N,isPressEnterToChange:!0,onChange:e=>l({labelContent:e})})))),(0,a.createElement)(m.InspectorControls,{group:"styles"},(0,a.createElement)(s.PanelBody,{title:(0,n.__)("Global settings","itmar_block_collections"),initialOpen:!1,className:"title_design_ctrl"},(0,a.createElement)(m.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Background Color Setting","itmar_block_collections"),settings:[{colorValue:E,label:(0,n.__)("Choose Background color","itmar_block_collections"),onColorChange:e=>l({bgColor:e})}]}),(0,a.createElement)(m.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Focus Color Setting","itmar_block_collections"),settings:[{colorValue:f,label:(0,n.__)("Choose Focus color","itmar_block_collections"),onColorChange:e=>l({focusColor:e})}]}),(0,a.createElement)(s.__experimentalBoxControl,{label:(0,n.__)("Margin settings","itmar_block_collections"),values:R,onChange:e=>l({margin_input:e}),units:p,allowReset:!0,resetValues:_}),(0,a.createElement)(s.__experimentalBoxControl,{label:(0,n.__)("Padding settings","itmar_block_collections"),values:B,onChange:e=>l({padding_input:e}),units:p,allowReset:!0,resetValues:_}),(0,a.createElement)(s.ToggleControl,{label:(0,n.__)("Is Shadow","itmar_block_collections"),checked:A,onChange:e=>{l({is_shadow:e})}})),(0,a.createElement)(s.PanelBody,{title:(0,n.__)("Input Box style settings","itmar_block_collections"),initialOpen:!1,className:"title_design_ctrl"},(0,a.createElement)(o.Z,{title:(0,n.__)("Typography","itmar_block_collections"),fontStyle:y,onChange:e=>{l({font_style_input:e})},initialOpen:!1}),(0,a.createElement)(m.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Color Settings","itmar_block_collections"),settings:[{colorValue:w,label:(0,n.__)("Choose Text color","itmar_block_collections"),onColorChange:e=>l({textColor_input:e})},{colorValue:v,gradientValue:k,label:(0,n.__)("Choose Background color","itmar_block_collections"),onColorChange:e=>l({bgColor_input:e}),onGradientChange:e=>l({bgGradient_input:e})}]}),(0,a.createElement)(s.PanelBody,{title:(0,n.__)("Border Settings","itmar_block_collections"),initialOpen:!1,className:"border_design_ctrl"},(0,a.createElement)(s.__experimentalBorderBoxControl,{onChange:e=>l({border_input:e}),value:S,allowReset:!0,resetValues:u}),(0,a.createElement)(m.__experimentalBorderRadiusControl,{values:$,onChange:e=>l({radius_input:"string"==typeof e?{value:e}:e})}))),(0,a.createElement)(s.PanelBody,{title:(0,n.__)("Label style settings","itmar_block_collections"),initialOpen:!1,className:"title_design_ctrl"},(0,a.createElement)(o.Z,{title:(0,n.__)("Typography","itmar_block_collections"),fontStyle:P,onChange:e=>{l({font_style_label:e})},initialOpen:!1}),(0,a.createElement)(m.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Label Color Setting","itmar_block_collections"),settings:[{colorValue:T,label:(0,n.__)("Choose Text color","itmar_block_collections"),onColorChange:e=>l({textColor_label:e})},{colorValue:F,gradientValue:I,label:(0,n.__)("Choose Background color","itmar_block_collections"),onColorChange:e=>l({bgColor_label:e}),onGradientChange:e=>l({bgGradient_label:e})}]}),(0,a.createElement)(s.PanelBody,{title:(0,n.__)("Border Settings","itmar_block_collections"),initialOpen:!1,className:"border_design_ctrl"},(0,a.createElement)(s.__experimentalBorderBoxControl,{onChange:e=>l({border_label:e}),value:O,allowReset:!0,resetValues:u}),(0,a.createElement)(m.__experimentalBorderRadiusControl,{values:L,onChange:e=>l({radius_label:"string"==typeof e?{value:e}:e})})),(0,a.createElement)(s.__experimentalBoxControl,{label:(0,n.__)("Padding settings","itmar_block_collections"),values:G,onChange:e=>l({padding_label:e}),units:p,allowReset:!0,resetValues:_}),(0,a.createElement)(s.__experimentalUnitControl,{dragDirection:"e",onChange:e=>l({labelSpace:e}),label:(0,n.__)("Spacing with textbox","itmar_block_collections"),value:M}))),(0,a.createElement)("div",q,(0,a.createElement)(r.J,{attributes:t},A?(0,a.createElement)(c.Z,{shadowStyle:{...V,backgroundColor:E},onChange:(e,t)=>{l({shadow_result:e.style}),l({shadow_element:t})}},K()):K())))}},9747:function(e,t,l){function a(e,t,l){var a=!1;if((e||0===e)&&e<=360&&(t||0===t)&&t<=100&&(l||0===l)&&l<=100){var n,o=0,r=0,i=0,c=0,s=0;e=Number(e)/360,t=Number(t)/100,l=Number(l)/100,0===t?(o=l,r=l,i=l):(n=function(e,t,l){return l<0&&(l+=1),l>1&&(l-=1),l<1/6?e+=6*(t-e)*l:l<.5?e=t:l<2/3&&(e+=(t-e)*(2/3-l)*6),e},o=n(s=2*l-(c=l<.5?l*(1+t):l+t-l*t),c,e+1/3),r=n(s,c,e),i=n(s,c,e-1/3)),a=`#${Math.round(255*o).toString(16).padStart(2,"0")}${Math.round(255*r).toString(16).padStart(2,"0")}${Math.round(255*i).toString(16).padStart(2,"0")}`}return a}function n(e){let t=e.match(/\#([a-fA-F0-9]{2})([a-fA-Z0-9]{2})([a-fA-F0-9]{2})/),l=t[1],a=t[2],n=t[3],o=!1;if((l||0===l)&&String(l).match(/^[0-9a-f]{2}$/i)&&(a||0===a)&&String(a).match(/^[0-9a-f]{2}$/i)&&(n||0===n)&&String(n).match(/^[0-9a-f]{2}$/i)){let e=0,t=0,r=0,i=0,c=0,s=0;l=parseInt(l,16)/255,a=parseInt(a,16)/255,n=parseInt(n,16)/255,i=Math.max(l,a,n),c=Math.min(l,a,n),r=(i+c)/2,i!==c&&(s=i-c,t=r>.5?s/(2-i-c):s/(i+c),e=i===l?(a-n)/s:i===a?2+(n-l)/s:4+(l-a)/s,e/=6),o={hue:Math.round(360*e),saturation:Math.round(100*t),lightness:Math.round(100*r)}}return o}function o(e){let t=e.match(/\#([a-fA-F0-9]{2})([a-fA-Z0-9]{2})([a-fA-F0-9]{2})/),l=t[1],a=t[2],n=t[3],o=!1;return(l||0===l)&&String(l).match(/^[0-9a-f]{2}$/i)&&(a||0===a)&&String(a).match(/^[0-9a-f]{2}$/i)&&(n||0===n)&&String(n).match(/^[0-9a-f]{2}$/i)&&(l=parseInt(l,16),a=parseInt(a,16),n=parseInt(n,16),o={red:Math.round(l),green:Math.round(a),blue:Math.round(n)}),o}l.d(t,{MM:function(){return o},Pr:function(){return a},vc:function(){return n}})},641:function(e,t,l){l.d(t,{P:function(){return i}});var a=l(9307),n=l(2027),o=l(1893),r=l(7762);function i(e,t){(0,n.KW)((()=>{const l=document.getElementsByName("editor-canvas")[0];if(l){const n=l.contentDocument||l.contentWindow.document,i=new o.qH;(0,r.Dq)(i.collectStyles((0,a.createElement)(e,{attributes:t})));const c=i.getStyleTags().replace(/<style[^>]*>|<\/style>/g,""),s=n.createElement("style");return s.innerHTML=c,n.head.appendChild(s),()=>{n.head.removeChild(s)}}}),[t])}}}]);
//# sourceMappingURL=582.js.map