"use strict";(globalThis.webpackChunkblock_collections=globalThis.webpackChunkblock_collections||[]).push([[589],{7597:(e,l,t)=>{t.d(l,{A:()=>g});var o=t(1609),n=t(7723),a=t(9348),r=t(6014),i=t(4715),s=t(6427),c=t(5575);const _={top:"10px",left:"10px",right:"10px",bottom:"10px"},u={top:"0px",left:"0px",right:"0px",bottom:"0px"},b=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function g(e){const{attributes:l,setAttributes:t}=e,{required:g,labelContent:p,font_style_label:d,bgColor_label:m,bgGradient_label:C,textColor_label:h,radius_label:E,border_label:x,padding_label:y,labelSpace:k,isMobile:f}=l;return(0,r.N)(c.A,e.attributes),(0,o.createElement)(o.Fragment,null,(0,o.createElement)(i.InspectorControls,{group:"settings"},(0,o.createElement)(s.PanelBody,{title:(0,n.__)("Required Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,o.createElement)(s.PanelRow,{className:"labelRequierd_row"},(0,o.createElement)(s.ToggleControl,{label:(0,n.__)("Required input","block-collections"),checked:g.flg,onChange:e=>{const l={...g,flg:e};t({required:l})}})),g.flg&&(0,o.createElement)(s.PanelRow,null,(0,o.createElement)(s.TextControl,{label:(0,n.__)("Show 'required'","block-collections"),value:g.display,isPressEnterToChange:!0,onChange:e=>{const l={...g,display:e};t({required:l})}}))),(0,o.createElement)(s.PanelBody,{title:(0,n.__)("Label Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,o.createElement)(s.PanelRow,{className:"labelInfo_row"},(0,o.createElement)(s.TextControl,{label:(0,n.__)("Text of Label","block-collections"),labelPosition:"top",value:p,isPressEnterToChange:!0,onChange:e=>t({labelContent:e})})))),(0,o.createElement)(i.InspectorControls,{group:"styles"},(0,o.createElement)(s.PanelBody,{title:(0,n.__)("Label style settings","block-collections"),initialOpen:!1,className:"title_design_ctrl"},(0,o.createElement)(a.TypographyControls,{title:(0,n.__)("Typography","block-collections"),fontStyle:d,onChange:e=>{t({font_style_label:e})},isMobile:f,initialOpen:!1}),(0,o.createElement)(i.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Label Color Setting","block-collections"),settings:[{colorValue:h,label:(0,n.__)("Choose Text color","block-collections"),onColorChange:e=>t({textColor_label:e})},{colorValue:m,gradientValue:C,label:(0,n.__)("Choose Background color","block-collections"),onColorChange:e=>t({bgColor_label:e}),onGradientChange:e=>t({bgGradient_label:e})}]}),(0,o.createElement)(s.PanelBody,{title:(0,n.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl"},(0,o.createElement)(s.__experimentalBorderBoxControl,{onChange:e=>t({border_label:e}),value:x,allowReset:!0,resetValues:u}),(0,o.createElement)(i.__experimentalBorderRadiusControl,{values:E,onChange:e=>t({radius_label:"string"==typeof e?{value:e}:e})})),(0,o.createElement)(s.__experimentalBoxControl,{label:(0,n.__)("Padding settings","block-collections"),values:y,onChange:e=>t({padding_label:e}),units:b,allowReset:!0,resetValues:_}),(0,o.createElement)(s.__experimentalUnitControl,{dragDirection:"e",onChange:e=>t({labelSpace:e}),label:(0,n.__)("Spacing with textbox","block-collections"),value:k}))),(0,o.createElement)(c.A,{attributes:l},g.flg?(0,o.createElement)(o.Fragment,null,p,(0,o.createElement)("span",null,"(",g.display,")")):p))}},1589:(e,l,t)=>{t.r(l),t.d(l,{default:()=>d});var o=t(1609),n=t(7723),a=t(5810),r=t(6087),i=t(6014),s=t(7597),c=t(9348),_=t(6427),u=t(4715);const b={top:"10px",left:"10px",right:"10px",bottom:"10px"},g={top:"0px",left:"0px",right:"0px",bottom:"0px"},p=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function d(e){const{attributes:l,setAttributes:t}=e,{inputName:d,inputValue:m,placeFolder:C,inputType:h,required:E,focusColor:x,bgColor:y,font_style_input:k,bgColor_input:f,bgGradient_input:w,textColor_input:v,radius_input:B,border_input:S,default_pos:P,mobile_pos:T,labelContent:N,font_style_label:R,bgColor_label:V,bgGradient_label:G,textColor_label:A,radius_label:I,border_label:O,padding_label:q,labelSpace:M,labelWidth:F,labelVertAlign:L,shadow_element:H,shadow_result:W,is_shadow:$,className:D}=l,K=(0,c.useIsIframeMobile)(),U=(0,r.useRef)(null),X=(0,u.useBlockProps)({ref:U,style:{backgroundColor:y}}),j=(0,c.useElementBackgroundColor)(U,X.style);(0,r.useEffect)((()=>{if(j){t({shadow_element:{...H,baseColor:j}});const e=(0,c.ShadowElm)({...H,baseColor:j});e&&t({shadow_result:e.style})}}),[j]),(0,i.N)(a.B,l);const z=E.flg?`${N}(${E.display})`:N,J=e.context["itmar/label_width"]||"auto";(0,r.useEffect)((()=>{t({labelWidth:J})}),[J]);const[Q,Y]=(0,r.useState)(m),[Z,ee]=(0,r.useState)("auto"),le=(0,r.useRef)(null);return(0,r.useEffect)((()=>{le.current&&ee(`${le.current.scrollHeight}px`)}),[D]),(0,o.createElement)(o.Fragment,null,(0,o.createElement)(u.InspectorControls,{group:"settings"},(0,o.createElement)(_.PanelBody,{title:(0,n.__)("Input element information setting","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,o.createElement)(_.PanelRow,null,(0,o.createElement)(_.TextControl,{label:(0,n.__)("name attribute name","block-collections"),value:d,onChange:e=>t({inputName:e})})),(0,o.createElement)(_.PanelRow,null,(0,o.createElement)(_.TextControl,{label:(0,n.__)("PlaceHolder","block-collections"),value:C,isPressEnterToChange:!0,onChange:e=>t({placeFolder:e})})),(0,o.createElement)(_.PanelRow,{className:"itmar_weight_row"},(0,o.createElement)(_.RadioControl,{selected:h,label:(0,n.__)("Kind of Input Element","block-collections"),options:[{label:"TEXT",value:"text"},{label:"E-MAIL",value:"email"},{label:"AREA",value:"textarea"}],onChange:e=>{t({inputType:e})}})))),(0,o.createElement)(u.InspectorControls,{group:"styles"},(0,o.createElement)(_.PanelBody,{title:(0,n.__)("Global settings","block-collections"),initialOpen:!1,className:"title_design_ctrl"},(0,o.createElement)(u.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Background Color Setting","block-collections"),settings:[{colorValue:y,label:(0,n.__)("Choose Background color","block-collections"),onColorChange:e=>t({bgColor:e})}]}),(0,o.createElement)(u.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Focus Color Setting","block-collections"),settings:[{colorValue:x,label:(0,n.__)("Choose Focus color","block-collections"),onColorChange:e=>t({focusColor:e})}]}),(0,o.createElement)(_.__experimentalBoxControl,{label:K?(0,n.__)("Margin settings(mobile)","block-collections"):(0,n.__)("Margin settings(desk top)","block-collections"),values:K?T.margin_input:P.margin_input,onChange:e=>{t(K?{mobile_pos:{...T,margin_input:e}}:{default_pos:{...P,margin_input:e}})},units:p,allowReset:!0,resetValues:b}),(0,o.createElement)(_.__experimentalBoxControl,{label:K?(0,n.__)("Padding settings(mobile)","block-collections"):(0,n.__)("Padding settings(desk top)","block-collections"),values:K?T.padding_input:P.padding_input,onChange:e=>{t(K?{mobile_pos:{...T,padding_input:e}}:{default_pos:{...P,padding_input:e}})},units:p,allowReset:!0,resetValues:b}),(0,o.createElement)(_.ToggleControl,{label:(0,n.__)("Is Shadow","block-collections"),checked:$,onChange:e=>{t({is_shadow:e})}}),$&&(0,o.createElement)(c.ShadowStyle,{shadowStyle:{...H},onChange:(e,l)=>{t({shadow_result:e.style}),t({shadow_element:l})}})),(0,o.createElement)(_.PanelBody,{title:(0,n.__)("Input Box style settings","block-collections"),initialOpen:!1,className:"title_design_ctrl"},(0,o.createElement)(c.TypographyControls,{title:(0,n.__)("Typography","block-collections"),fontStyle:k,onChange:e=>{t({font_style_input:e})},isMobile:K,initialOpen:!1}),(0,o.createElement)(u.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Color Settings","block-collections"),settings:[{colorValue:v,label:(0,n.__)("Choose Text color","block-collections"),onColorChange:e=>t({textColor_input:e})},{colorValue:f,gradientValue:w,label:(0,n.__)("Choose Background color","block-collections"),onColorChange:e=>t({bgColor_input:e}),onGradientChange:e=>t({bgGradient_input:e})}]}),(0,o.createElement)(_.PanelBody,{title:(0,n.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl"},(0,o.createElement)(_.__experimentalBorderBoxControl,{onChange:e=>t({border_input:e}),value:S,allowReset:!0,resetValues:g}),(0,o.createElement)(u.__experimentalBorderRadiusControl,{values:B,onChange:e=>t({radius_input:"string"==typeof e?{value:e}:e})})))),(0,o.createElement)("div",{...X},(0,o.createElement)(a.B,{attributes:l},"text"===h&&(0,o.createElement)("input",{type:"text",name:d,placeholder:"is-style-line"===D?z:C,className:"contact_text "+(Q?"":"empty"),value:Q,onChange:e=>{const l=e.target.value;Y(l),t({inputValue:l})}}),"email"===h&&(0,o.createElement)("input",{type:"email",placeholder:"is-style-line"===D?z:C,className:"contact_text "+(Q?"":"empty"),value:Q,onChange:e=>{const l=e.target.value;Y(l),t({inputValue:l})}}),"textarea"===h&&(0,o.createElement)("textarea",{ref:le,style:{height:Z},name:d,placeholder:"is-style-line"===D?z:C,className:"contact_text "+(Q?"":"empty"),value:Q,onChange:e=>{const l=e.target.value,o=e.target.scrollHeight;Y(l),ee(`${o}px`),t({inputValue:l})}}),(0,o.createElement)(s.A,{attributes:{required:E,labelContent:N,font_style_label:R,bgColor_label:V,bgGradient_label:G,textColor_label:A,radius_label:I,border_label:O,padding_label:q,labelSpace:M,labelWidth:F,labelVertAlign:L,shadow_result:W,is_shadow:$,isMobile:K,className:D},setAttributes:t}))))}},6014:(e,l,t)=>{t.d(l,{N:()=>i});var o=t(1609),n=t(9348),a=t(8267),r=t(5848);function i(e,l){(0,n.useDeepCompareEffect)((()=>{const t=document.getElementsByName("editor-canvas")[0];if(t){const n=t.contentDocument||t.contentWindow.document,i=new a.E;(0,r.F0)(i.collectStyles((0,o.createElement)(e,{attributes:l})));const s=i.getStyleTags().replace(/<style[^>]*>|<\/style>/g,""),c=n.createElement("style");return c.innerHTML=s,n.head.appendChild(c),()=>{n.head.removeChild(c)}}}),[l])}}}]);
//# sourceMappingURL=589.js.map