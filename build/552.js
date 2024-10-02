"use strict";(globalThis.webpackChunkblock_collections=globalThis.webpackChunkblock_collections||[]).push([[552],{7597:(e,l,t)=>{t.d(l,{A:()=>m});var o=t(1609),n=t(7723),a=t(9348),c=t(6014),s=t(4715),i=t(6427),r=t(5575);const _={top:"10px",left:"10px",right:"10px",bottom:"10px"},u={top:"0px",left:"0px",right:"0px",bottom:"0px"},b=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function m(e){const{attributes:l}=e,{required:t,labelContent:m,default_pos:d,mobile_pos:g,font_style_label:p,bgColor_label:C,bgGradient_label:h,textColor_label:E,radius_label:k,border_label:v,padding_label:y,labelSpace:f,isMobile:x}=l;return(0,c.N)(r.A,e.attributes),(0,o.createElement)(o.Fragment,null,(0,o.createElement)(s.InspectorControls,{group:"settings"},(0,o.createElement)(i.PanelBody,{title:(0,n.__)("Required Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,o.createElement)(i.PanelRow,{className:"labelRequierd_row"},(0,o.createElement)(i.ToggleControl,{label:(0,n.__)("Required input","block-collections"),checked:t.flg,onChange:l=>{const o={...t,flg:l};e.onChange("required",o)}})),t.flg&&(0,o.createElement)(i.PanelRow,null,(0,o.createElement)(i.TextControl,{label:(0,n.__)("Show 'required'","block-collections"),value:t.display,isPressEnterToChange:!0,onChange:l=>{const o={...t,display:l};e.onChange("required",o)}}))),(0,o.createElement)(i.PanelBody,{title:(0,n.__)("Label Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,o.createElement)(i.PanelRow,{className:"labelInfo_row"},(0,o.createElement)(i.TextControl,{label:(0,n.__)("Text of Label","block-collections"),labelPosition:"top",value:m,isPressEnterToChange:!0,onChange:l=>e.onChange("labelContent",l)})),(0,o.createElement)("label",null,x?(0,n.__)("Label Alignment(mobile)","block-collections"):(0,n.__)("Label Alignment(desk top)","block-collections")),(0,o.createElement)(i.__experimentalAlignmentMatrixControl,{label:x?(0,n.__)("Label Alignment(mobile)","block-collections"):(0,n.__)("Label Alignment(desk top)","block-collections"),value:x?g.labelPos:d.labelPos,onChange:l=>{x?e.onChange("mobile_pos",{...g,labelPos:l}):e.onChange("default_pos",{...d,labelPos:l})}}),(0,o.createElement)("label",null,(0,n.__)("Selecting the center vertically or horizontally will hide it.","block-collections")))),(0,o.createElement)(s.InspectorControls,{group:"styles"},(0,o.createElement)(i.PanelBody,{title:(0,n.__)("Label style settings","block-collections"),initialOpen:!1,className:"title_design_ctrl"},(0,o.createElement)(a.TypographyControls,{title:(0,n.__)("Typography","block-collections"),fontStyle:p,onChange:l=>{e.onChange("font_style_label",l)},isMobile:x,initialOpen:!1}),(0,o.createElement)(s.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Label Color Setting","block-collections"),settings:[{colorValue:E,label:(0,n.__)("Choose Text color","block-collections"),onColorChange:l=>e.onChange("textColor_label",l)},{colorValue:C,gradientValue:h,label:(0,n.__)("Choose Background color","block-collections"),onColorChange:l=>e.onChange("bgColor_label",l),onGradientChange:l=>e.onChange("bgGradient_label",l)}]}),(0,o.createElement)(i.PanelBody,{title:(0,n.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl"},(0,o.createElement)(i.__experimentalBorderBoxControl,{onChange:l=>e.onChange("border_label",l),value:v,allowReset:!0,resetValues:u}),(0,o.createElement)(s.__experimentalBorderRadiusControl,{values:k,onChange:l=>e.onChange("radius_label","string"==typeof l?{value:l}:l)})),(0,o.createElement)(i.__experimentalBoxControl,{label:(0,n.__)("Padding settings","block-collections"),values:y,onChange:l=>e.onChange("padding_label",l),units:b,allowReset:!0,resetValues:_}),(0,o.createElement)(i.__experimentalUnitControl,{dragDirection:"e",onChange:l=>e.onChange("labelSpace",l),label:(0,n.__)("Spacing with textbox","block-collections"),value:f}))),(0,o.createElement)(r.A,{attributes:l},t.flg?(0,o.createElement)(o.Fragment,null,m,(0,o.createElement)("span",null,"(",t.display,")")):m))}},8378:(e,l,t)=>{t.d(l,{A:()=>i});var o=t(1609),n=t(7723),a=t(6087),c=t(9742),s=t(6427);function i(e){const{optionValues:l}=e,[t,i]=(0,a.useState)(!1),[r,_]=(0,a.useState)(null),[u,b]=(0,a.useState)(!1),[m,d]=(0,a.useState)(null),g=()=>i(!0),p=()=>i(!1),C=()=>{b(!1),d(null)},h=(e,l)=>{_((t=>({...t,[e]:l})))};return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(s.Button,{label:(0,n.__)("add","block-collections"),icon:"insert",onClick:()=>{const e=(0,c.Ak)(5);_({id:e,value:"",label:"",classname:""}),g()}}),l.map((e=>(0,o.createElement)(s.Notice,{key:e.id,status:"info",onRemove:()=>(e=>{d(e),b(!0)})(e)},(0,o.createElement)("span",{onClick:()=>(e=>{_(e),g()})(e)},e.label)))),t&&(0,o.createElement)(s.Modal,{title:(0,n.__)("Option Info Edit","block-collections"),onRequestClose:p},(0,o.createElement)(s.TextControl,{label:(0,n.__)("Display Label","block-collections"),value:r.label,onChange:e=>h("label",e)}),(0,o.createElement)(s.TextControl,{label:(0,n.__)("Option Value","block-collections"),value:r.value,onChange:e=>h("value",e)}),(0,o.createElement)(s.TextControl,{label:(0,n.__)("Class Name","block-collections"),value:r.classname,onChange:e=>h("classname",e)}),(0,o.createElement)(s.Button,{variant:"primary",onClick:()=>{if(r&&l.some((e=>e.id===r.id))){const t=l.map((e=>e.id===r.id?r:e));e.onUpdateOption(t)}else e.onAddOption(r);p()}},(0,n.__)("Save Changes","block-collections"))),u&&(0,o.createElement)(s.Modal,{title:(0,n.__)("Confirm Deletion","block-collections"),onRequestClose:C},(0,o.createElement)("p",null,(0,n.__)("Are you sure you want to delete this item?","block-collections")),(0,o.createElement)(s.Button,{variant:"primary",onClick:()=>{m&&(t=>{const o=l.filter((e=>e.id!==t));e.onUpdateOption(o)})(m.id),C()}},(0,n.__)("Yes, Delete","block-collections")),(0,o.createElement)(s.Button,{variant:"secondary",onClick:C},(0,n.__)("Cancel","block-collections"))))}},7552:(e,l,t)=>{t.r(l),t.d(l,{default:()=>C});var o=t(1609),n=t(7723),a=t(7783),c=t(9610),s=t(6014),i=t(6087),r=t(7597),_=t(8378),u=t(9348),b=t(6427),m=t(4715);const d={top:"10px",left:"10px",right:"10px",bottom:"10px"},g={top:"0px",left:"0px",right:"0px",bottom:"0px"},p=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function C({attributes:e,setAttributes:l,context:t}){const{inputName:C,selPattern:h,selectValues:E,selectedValues:k,isSetSelect:v,folder_val:y,required:f,bgColor:x,optionColor:S,hoverBgColor:B,font_style_option:w,default_pos:P,mobile_pos:N,bgSelectColor:V,bgSelectGradient:O,radius_value:T,border_value:R,shadow_element:A,is_shadow:M,className:q}=e,G=(0,u.useIsIframeMobile)(),L=(0,i.useRef)(null),I=(0,m.useBlockProps)({ref:L,style:{backgroundColor:x}}),D=(0,u.useElementBackgroundColor)(L,I.style);(0,i.useEffect)((()=>{if(D){l({shadow_element:{...A,baseColor:D}});const e=(0,u.ShadowElm)({...A,baseColor:D});e&&l({shadow_result:e.style})}}),[D]),(0,s.N)(a.B,e);const F="multi"===h?{multiple:!0}:{};(0,s.N)(a.B,e);const U=t["itmar/label_width"]||"auto";return(0,i.useEffect)((()=>{l({labelWidth:U})}),[U]),(0,i.useEffect)((()=>{l({selectedValues:[]})}),[h]),(0,o.createElement)(o.Fragment,null,(0,o.createElement)(m.InspectorControls,{group:"settings"},(0,o.createElement)(b.PanelBody,{title:(0,n.__)("Select Element Settings","block-collections"),initialOpen:!0,className:"select_design_ctrl"},(0,o.createElement)(b.PanelRow,null,(0,o.createElement)(b.TextControl,{label:(0,n.__)("name attribute name","block-collections"),value:C,onChange:e=>l({inputName:e})})),(0,o.createElement)("label",{className:"components-base-control__label"},(0,n.__)("Select Pattern","block-collections")),(0,o.createElement)(b.PanelRow,{className:"itmar_select_row"},(0,o.createElement)(b.RadioControl,{selected:h,options:[{label:(0,n.__)("Single Select","block-collections"),value:"single"},{label:(0,n.__)("Nulti Select","block-collections"),value:"multi"}],onChange:e=>{l({selPattern:e})}})),(0,o.createElement)(b.TextControl,{label:(0,n.__)("Place Folder Display","block-collections"),value:y,onChange:e=>l({folder_val:e})}),v&&(0,o.createElement)(b.PanelBody,{className:"itmar_notice_select_panel",title:(0,n.__)("Option info Setting","block-collections")},(0,o.createElement)(_.A,{optionValues:E,onAddOption:e=>{l({selectValues:[...E,e]})},onUpdateOption:e=>{l({selectValues:e})}})))),(0,o.createElement)(m.InspectorControls,{group:"styles"},(0,o.createElement)(b.PanelBody,{title:(0,n.__)("Global settings","block-collections"),initialOpen:!1,className:"select_design_ctrl"},(0,o.createElement)(m.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Background Color Setting","block-collections"),settings:[{colorValue:x,label:(0,n.__)("Choose Block Background color","block-collections"),onColorChange:e=>l({bgColor:e})},{colorValue:V,gradientValue:O,label:(0,n.__)("Choose Select Background color","block-collections"),onColorChange:e=>{l({bgSelectColor:void 0===e?"":e})},onGradientChange:e=>l({bgSelectGradient:e})}]}),(0,o.createElement)(b.__experimentalBoxControl,{label:G?(0,n.__)("Margin settings(mobile)","block-collections"):(0,n.__)("Margin settings(desk top)","block-collections"),values:G?N.margin_value:P.margin_value,onChange:e=>{l(G?{mobile_pos:{...N,margin_value:e}}:{default_pos:{...P,margin_value:e}})},units:p,allowReset:!0,resetValues:d}),(0,o.createElement)(b.__experimentalBoxControl,{label:G?(0,n.__)("Padding settings(mobile)","block-collections"):(0,n.__)("Padding settings(desk top)","block-collections"),values:G?N.padding_value:P.padding_value,onChange:e=>{l(G?{mobile_pos:{...N,padding_value:e}}:{default_pos:{...P,padding_value:e}})},units:p,allowReset:!0,resetValues:d}),(0,o.createElement)(b.PanelBody,{title:(0,n.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl"},(0,o.createElement)(b.__experimentalBorderBoxControl,{colors:[{color:"#72aee6"},{color:"#000"},{color:"#fff"}],onChange:e=>l({border_value:e}),value:R,allowReset:!0,resetValues:g}),(0,o.createElement)(m.__experimentalBorderRadiusControl,{values:T,onChange:e=>l({radius_value:"string"==typeof e?{value:e}:e})})),(0,o.createElement)(b.ToggleControl,{label:(0,n.__)("Is Shadow","block-collections"),checked:M,onChange:e=>{l({is_shadow:e})}}),M&&(0,o.createElement)(u.ShadowStyle,{shadowStyle:{...A},onChange:(e,t)=>{l({shadow_result:e.style}),l({shadow_element:t})}})),(0,o.createElement)(b.PanelBody,{title:(0,n.__)("Option Style Settings","block-collections"),initialOpen:!1,className:"select_design_ctrl"},(0,o.createElement)(u.TypographyControls,{title:(0,n.__)("Typography","block-collections"),fontStyle:w,onChange:e=>{l({font_style_option:e})},isMobile:G,initialOpen:!1}),(0,o.createElement)(m.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Option Color Setting","block-collections"),settings:[{colorValue:S,label:(0,n.__)("Choose Text color","block-collections"),onColorChange:e=>l({optionColor:e})},{colorValue:B,label:(0,n.__)("Choose Background color on mouse hover","block-collections"),onColorChange:e=>l({hoverBgColor:e})}]}))),(0,o.createElement)("div",{...I},(0,o.createElement)(a.B,{attributes:e},(0,o.createElement)(o.Fragment,null,(0,o.createElement)(c.s,{onOptionSelect:e=>{if(null==e)return void l({selectedValues:[]});if(k.includes(e))return;const t="multi"===h?[...k,e]:[e];l({selectedValues:t})},onOptionDeselect:e=>{const t=k.filter((l=>l!==e));l({selectedValues:t})}},(0,o.createElement)("select",{class:"nomal",...F,name:C,"data-placeholder":y},"single"===h&&(0,o.createElement)("option",{value:""},(0,n.__)("Please Select.","block-collections")),E.map((e=>(0,o.createElement)("option",{id:e.id,className:e.classname,value:e.value,selected:k.includes(e.id)},e.label))))),(0,o.createElement)(r.A,{attributes:{...e,isMobile:G},onChange:(e,t)=>l({[e]:t})})))))}},6014:(e,l,t)=>{t.d(l,{N:()=>s});var o=t(1609),n=t(9348),a=t(8267),c=t(5848);function s(e,l){(0,n.useDeepCompareEffect)((()=>{const t=document.getElementsByName("editor-canvas")[0];if(t){const n=t.contentDocument||t.contentWindow.document,s=new a.E;(0,c.F0)(s.collectStyles((0,o.createElement)(e,{attributes:l})));const i=s.getStyleTags().replace(/<style[^>]*>|<\/style>/g,""),r=n.createElement("style");return r.innerHTML=i,n.head.appendChild(r),()=>{n.head.removeChild(r)}}}),[l])}},9742:(e,l,t)=>{t.d(l,{Ak:()=>o});let o=(e=21)=>crypto.getRandomValues(new Uint8Array(e)).reduce(((e,l)=>e+((l&=63)<36?l.toString(36):l<62?(l-26).toString(36).toUpperCase():l>62?"-":"_")),"")}}]);
//# sourceMappingURL=552.js.map