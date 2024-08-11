"use strict";(globalThis.webpackChunkblock_collections=globalThis.webpackChunkblock_collections||[]).push([[903],{903:(e,l,t)=>{t.r(l),t.d(l,{default:()=>k});var o=t(609),n=t(723),a=t(442),i=t(87),r=t(412),s=t(267),c=t(848);function _(e,l){(0,r.useDeepCompareEffect)((()=>{const t=document.getElementsByName("editor-canvas")[0];if(t){const n=t.contentDocument||t.contentWindow.document,a=new s.E;(0,c.F0)(a.collectStyles((0,o.createElement)(e,{attributes:l})));const i=a.getStyleTags().replace(/<style[^>]*>|<\/style>/g,""),r=n.createElement("style");return r.innerHTML=i,n.head.appendChild(r),()=>{n.head.removeChild(r)}}}),[l])}var u=t(715),g=t(427),b=t(223);const p={top:"10px",left:"10px",right:"10px",bottom:"10px"},m={top:"0px",left:"0px",right:"0px",bottom:"0px"},d=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function C(e){const{attributes:l}=e,{required:t,labelContent:a,default_pos:i,mobile_pos:s,font_style_label:c,bgColor_label:C,bgGradient_label:h,textColor_label:E,radius_label:x,border_label:k,padding_label:y,labelSpace:f,isMobile:v}=l;return _(b.A,e.attributes),(0,o.createElement)(o.Fragment,null,(0,o.createElement)(u.InspectorControls,{group:"settings"},(0,o.createElement)(g.PanelBody,{title:(0,n.__)("Required Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,o.createElement)(g.PanelRow,{className:"labelRequierd_row"},(0,o.createElement)(g.ToggleControl,{label:(0,n.__)("Required input","block-collections"),checked:t.flg,onChange:l=>{const o={...t,flg:l};e.onChange("required",o)}})),t.flg&&(0,o.createElement)(g.PanelRow,null,(0,o.createElement)(g.TextControl,{label:(0,n.__)("Show 'required'","block-collections"),value:t.display,isPressEnterToChange:!0,onChange:l=>{const o={...t,display:l};e.onChange("required",o)}}))),(0,o.createElement)(g.PanelBody,{title:(0,n.__)("Label Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,o.createElement)(g.PanelRow,{className:"labelInfo_row"},(0,o.createElement)(g.TextControl,{label:(0,n.__)("Text of Label","block-collections"),labelPosition:"top",value:a,isPressEnterToChange:!0,onChange:l=>e.onChange("labelContent",l)})),(0,o.createElement)("label",null,v?(0,n.__)("Label Alignment(mobile)","block-collections"):(0,n.__)("Label Alignment(desk top)","block-collections")),(0,o.createElement)(g.__experimentalAlignmentMatrixControl,{label:v?(0,n.__)("Label Alignment(mobile)","block-collections"):(0,n.__)("Label Alignment(desk top)","block-collections"),value:v?s.labelPos:i.labelPos,onChange:l=>{v?e.onChange("mobile_pos",{...s,labelPos:l}):e.onChange("default_pos",{...i,labelPos:l})}}),(0,o.createElement)("label",null,(0,n.__)("Selecting the center vertically or horizontally will hide it.","block-collections")))),(0,o.createElement)(u.InspectorControls,{group:"styles"},(0,o.createElement)(g.PanelBody,{title:(0,n.__)("Label style settings","block-collections"),initialOpen:!1,className:"title_design_ctrl"},(0,o.createElement)(r.TypographyControls,{title:(0,n.__)("Typography","block-collections"),fontStyle:c,onChange:l=>{e.onChange("font_style_label",l)},isMobile:v,initialOpen:!1}),(0,o.createElement)(u.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Label Color Setting","block-collections"),settings:[{colorValue:E,label:(0,n.__)("Choose Text color","block-collections"),onColorChange:l=>e.onChange("textColor_label",l)},{colorValue:C,gradientValue:h,label:(0,n.__)("Choose Background color","block-collections"),onColorChange:l=>e.onChange("bgColor_label",l),onGradientChange:l=>e.onChange("bgGradient_label",l)}]}),(0,o.createElement)(g.PanelBody,{title:(0,n.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl"},(0,o.createElement)(g.__experimentalBorderBoxControl,{onChange:l=>e.onChange("border_label",l),value:k,allowReset:!0,resetValues:m}),(0,o.createElement)(u.__experimentalBorderRadiusControl,{values:x,onChange:l=>e.onChange("radius_label","string"==typeof l?{value:l}:l)})),(0,o.createElement)(g.__experimentalBoxControl,{label:(0,n.__)("Padding settings","block-collections"),values:y,onChange:l=>e.onChange("padding_label",l),units:d,allowReset:!0,resetValues:p}),(0,o.createElement)(g.__experimentalUnitControl,{dragDirection:"e",onChange:l=>e.onChange("labelSpace",l),label:(0,n.__)("Spacing with textbox","block-collections"),value:f}))),(0,o.createElement)(b.A,{attributes:l},t.flg?(0,o.createElement)(o.Fragment,null,a,(0,o.createElement)("span",null,"(",t.display,")")):a))}const h={top:"10px",left:"10px",right:"10px",bottom:"10px"},E={top:"0px",left:"0px",right:"0px",bottom:"0px"},x=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function k(e){const{attributes:l,setAttributes:t}=e,{inputName:s,inputValue:c,placeFolder:b,inputType:p,required:m,focusColor:d,bgColor:k,font_style_input:y,bgColor_input:f,bgGradient_input:v,textColor_input:w,radius_input:P,border_input:B,default_pos:S,mobile_pos:T,labelContent:R,shadow_element:N,is_shadow:V,className:I}=l,A=(0,r.useIsIframeMobile)(),G=(0,i.useRef)(null),L=(0,u.useBlockProps)({ref:G,style:{backgroundColor:k}}),M=(0,r.useElementBackgroundColor)(G,L.style);(0,i.useEffect)((()=>{if(M){t({shadow_element:{...N,baseColor:M}});const e=(0,r.ShadowElm)({...N,baseColor:M});e&&t({shadow_result:e.style})}}),[M]),_(a.B,l);const O=m.flg?`${R}(${m.display})`:R,q=e.context["itmar/label_width"]||"auto";(0,i.useEffect)((()=>{t({labelWidth:q})}),[q]);const[F,H]=(0,i.useState)(c),[$,D]=(0,i.useState)("auto"),W=(0,i.useRef)(null);return(0,i.useEffect)((()=>{W.current&&D(`${W.current.scrollHeight}px`)}),[I]),(0,o.createElement)(o.Fragment,null,(0,o.createElement)(u.InspectorControls,{group:"settings"},(0,o.createElement)(g.PanelBody,{title:(0,n.__)("Input element information setting","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,o.createElement)(g.PanelRow,null,(0,o.createElement)(g.TextControl,{label:(0,n.__)("name attribute name","block-collections"),value:s,onChange:e=>t({inputName:e})})),(0,o.createElement)(g.PanelRow,null,(0,o.createElement)(g.TextControl,{label:(0,n.__)("PlaceHolder","block-collections"),value:b,isPressEnterToChange:!0,onChange:e=>t({placeFolder:e})})),(0,o.createElement)(g.PanelRow,{className:"itmar_weight_row"},(0,o.createElement)(g.RadioControl,{selected:p,label:(0,n.__)("Kind of Input Element","block-collections"),options:[{label:"TEXT",value:"text"},{label:"E-MAIL",value:"email"},{label:"AREA",value:"textarea"}],onChange:e=>{t({inputType:e})}})))),(0,o.createElement)(u.InspectorControls,{group:"styles"},(0,o.createElement)(g.PanelBody,{title:(0,n.__)("Global settings","block-collections"),initialOpen:!1,className:"title_design_ctrl"},(0,o.createElement)(u.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Background Color Setting","block-collections"),settings:[{colorValue:k,label:(0,n.__)("Choose Background color","block-collections"),onColorChange:e=>t({bgColor:e})}]}),(0,o.createElement)(u.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Focus Color Setting","block-collections"),settings:[{colorValue:d,label:(0,n.__)("Choose Focus color","block-collections"),onColorChange:e=>t({focusColor:e})}]}),(0,o.createElement)(g.__experimentalBoxControl,{label:A?(0,n.__)("Margin settings(mobile)","block-collections"):(0,n.__)("Margin settings(desk top)","block-collections"),values:A?T.margin_input:S.margin_input,onChange:e=>{t(A?{mobile_pos:{...T,margin_input:e}}:{default_pos:{...S,margin_input:e}})},units:x,allowReset:!0,resetValues:h}),(0,o.createElement)(g.__experimentalBoxControl,{label:A?(0,n.__)("Padding settings(mobile)","block-collections"):(0,n.__)("Padding settings(desk top)","block-collections"),values:A?T.padding_input:S.padding_input,onChange:e=>{t(A?{mobile_pos:{...T,padding_input:e}}:{default_pos:{...S,padding_input:e}})},units:x,allowReset:!0,resetValues:h}),(0,o.createElement)(g.ToggleControl,{label:(0,n.__)("Is Shadow","block-collections"),checked:V,onChange:e=>{t({is_shadow:e})}}),V&&(0,o.createElement)(r.ShadowStyle,{shadowStyle:{...N},onChange:(e,l)=>{t({shadow_result:e.style}),t({shadow_element:l})}})),(0,o.createElement)(g.PanelBody,{title:(0,n.__)("Input Box style settings","block-collections"),initialOpen:!1,className:"title_design_ctrl"},(0,o.createElement)(r.TypographyControls,{title:(0,n.__)("Typography","block-collections"),fontStyle:y,onChange:e=>{t({font_style_input:e})},isMobile:A,initialOpen:!1}),(0,o.createElement)(u.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Color Settings","block-collections"),settings:[{colorValue:w,label:(0,n.__)("Choose Text color","block-collections"),onColorChange:e=>t({textColor_input:e})},{colorValue:f,gradientValue:v,label:(0,n.__)("Choose Background color","block-collections"),onColorChange:e=>t({bgColor_input:e}),onGradientChange:e=>t({bgGradient_input:e})}]}),(0,o.createElement)(g.PanelBody,{title:(0,n.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl"},(0,o.createElement)(g.__experimentalBorderBoxControl,{onChange:e=>t({border_input:e}),value:B,allowReset:!0,resetValues:E}),(0,o.createElement)(u.__experimentalBorderRadiusControl,{values:P,onChange:e=>t({radius_input:"string"==typeof e?{value:e}:e})})))),(0,o.createElement)("div",{...L},(0,o.createElement)(a.B,{attributes:l},"text"===p&&(0,o.createElement)("input",{type:"text",name:s,placeholder:"is-style-line"===I?O:b,className:"contact_text "+(F?"":"empty"),value:F,onChange:e=>{const l=e.target.value;H(l),t({inputValue:l})}}),"email"===p&&(0,o.createElement)("input",{type:"email",placeholder:"is-style-line"===I?O:b,className:"contact_text "+(F?"":"empty"),value:F,onChange:e=>{const l=e.target.value;H(l),t({inputValue:l})}}),"textarea"===p&&(0,o.createElement)("textarea",{ref:W,style:{height:$},name:s,placeholder:"is-style-line"===I?O:b,className:"contact_text "+(F?"":"empty"),value:F,onChange:e=>{const l=e.target.value,o=e.target.scrollHeight;H(l),D(`${o}px`),t({inputValue:l})}}),(0,o.createElement)(C,{attributes:{...l,isMobile:A},onChange:(e,l)=>t({[e]:l})}))))}}}]);