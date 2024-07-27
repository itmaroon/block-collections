"use strict";(globalThis.webpackChunkblock_collections=globalThis.webpackChunkblock_collections||[]).push([[552],{7597:(e,l,t)=>{t.d(l,{A:()=>d});var o=t(1609),n=t(7723),a=t(9348),c=t(6014),s=t(4715),r=t(6427),i=t(5575);const _={top:"10px",left:"10px",right:"10px",bottom:"10px"},b={top:"0px",left:"0px",right:"0px",bottom:"0px"},u=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function d(e){const{attributes:l,setAttributes:t}=e,{required:d,labelContent:m,font_style_label:g,bgColor_label:p,bgGradient_label:C,textColor_label:h,radius_label:E,border_label:k,padding_label:v,labelSpace:y,isMobile:f}=l;return(0,c.N)(i.A,e.attributes),(0,o.createElement)(o.Fragment,null,(0,o.createElement)(s.InspectorControls,{group:"settings"},(0,o.createElement)(r.PanelBody,{title:(0,n.__)("Required Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,o.createElement)(r.PanelRow,{className:"labelRequierd_row"},(0,o.createElement)(r.ToggleControl,{label:(0,n.__)("Required input","block-collections"),checked:d.flg,onChange:e=>{const l={...d,flg:e};t({required:l})}})),d.flg&&(0,o.createElement)(r.PanelRow,null,(0,o.createElement)(r.TextControl,{label:(0,n.__)("Show 'required'","block-collections"),value:d.display,isPressEnterToChange:!0,onChange:e=>{const l={...d,display:e};t({required:l})}}))),(0,o.createElement)(r.PanelBody,{title:(0,n.__)("Label Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,o.createElement)(r.PanelRow,{className:"labelInfo_row"},(0,o.createElement)(r.TextControl,{label:(0,n.__)("Text of Label","block-collections"),labelPosition:"top",value:m,isPressEnterToChange:!0,onChange:e=>t({labelContent:e})})))),(0,o.createElement)(s.InspectorControls,{group:"styles"},(0,o.createElement)(r.PanelBody,{title:(0,n.__)("Label style settings","block-collections"),initialOpen:!1,className:"title_design_ctrl"},(0,o.createElement)(a.TypographyControls,{title:(0,n.__)("Typography","block-collections"),fontStyle:g,onChange:e=>{t({font_style_label:e})},isMobile:f,initialOpen:!1}),(0,o.createElement)(s.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Label Color Setting","block-collections"),settings:[{colorValue:h,label:(0,n.__)("Choose Text color","block-collections"),onColorChange:e=>t({textColor_label:e})},{colorValue:p,gradientValue:C,label:(0,n.__)("Choose Background color","block-collections"),onColorChange:e=>t({bgColor_label:e}),onGradientChange:e=>t({bgGradient_label:e})}]}),(0,o.createElement)(r.PanelBody,{title:(0,n.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl"},(0,o.createElement)(r.__experimentalBorderBoxControl,{onChange:e=>t({border_label:e}),value:k,allowReset:!0,resetValues:b}),(0,o.createElement)(s.__experimentalBorderRadiusControl,{values:E,onChange:e=>t({radius_label:"string"==typeof e?{value:e}:e})})),(0,o.createElement)(r.__experimentalBoxControl,{label:(0,n.__)("Padding settings","block-collections"),values:v,onChange:e=>t({padding_label:e}),units:u,allowReset:!0,resetValues:_}),(0,o.createElement)(r.__experimentalUnitControl,{dragDirection:"e",onChange:e=>t({labelSpace:e}),label:(0,n.__)("Spacing with textbox","block-collections"),value:y}))),(0,o.createElement)(i.A,{attributes:l},d.flg?(0,o.createElement)(o.Fragment,null,m,(0,o.createElement)("span",null,"(",d.display,")")):m))}},8378:(e,l,t)=>{t.d(l,{A:()=>r});var o=t(1609),n=t(7723),a=t(6087),c=t(9742),s=t(6427);function r(e){const{optionValues:l}=e,[t,r]=(0,a.useState)(!1),[i,_]=(0,a.useState)(null),[b,u]=(0,a.useState)(!1),[d,m]=(0,a.useState)(null),g=()=>r(!0),p=()=>r(!1),C=()=>{u(!1),m(null)},h=(e,l)=>{_((t=>({...t,[e]:l})))};return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(s.Button,{label:(0,n.__)("add","block-collections"),icon:"insert",onClick:()=>{const e=(0,c.Ak)(5);_({id:e,value:"",label:"",classname:""}),g()}}),l.map((e=>(0,o.createElement)(s.Notice,{key:e.id,status:"info",onRemove:()=>(e=>{m(e),u(!0)})(e)},(0,o.createElement)("span",{onClick:()=>(e=>{_(e),g()})(e)},e.label)))),t&&(0,o.createElement)(s.Modal,{title:(0,n.__)("Option Info Edit","block-collections"),onRequestClose:p},(0,o.createElement)(s.TextControl,{label:(0,n.__)("Display Label","block-collections"),value:i.label,onChange:e=>h("label",e)}),(0,o.createElement)(s.TextControl,{label:(0,n.__)("Option Value","block-collections"),value:i.value,onChange:e=>h("value",e)}),(0,o.createElement)(s.TextControl,{label:(0,n.__)("Class Name","block-collections"),value:i.classname,onChange:e=>h("classname",e)}),(0,o.createElement)(s.Button,{variant:"primary",onClick:()=>{if(i&&l.some((e=>e.id===i.id))){const t=l.map((e=>e.id===i.id?i:e));e.onUpdateOption(t)}else e.onAddOption(i);p()}},(0,n.__)("Save Changes","block-collections"))),b&&(0,o.createElement)(s.Modal,{title:(0,n.__)("Confirm Deletion","block-collections"),onRequestClose:C},(0,o.createElement)("p",null,(0,n.__)("Are you sure you want to delete this item?","block-collections")),(0,o.createElement)(s.Button,{variant:"primary",onClick:()=>{d&&(t=>{const o=l.filter((e=>e.id!==t));e.onUpdateOption(o)})(d.id),C()}},(0,n.__)("Yes, Delete","block-collections")),(0,o.createElement)(s.Button,{variant:"secondary",onClick:C},(0,n.__)("Cancel","block-collections"))))}},7552:(e,l,t)=>{t.r(l),t.d(l,{default:()=>C});var o=t(1609),n=t(7723),a=t(7783),c=t(9610),s=t(6014),r=t(6087),i=t(7597),_=t(8378),b=t(9348),u=t(6427),d=t(4715);const m={top:"10px",left:"10px",right:"10px",bottom:"10px"},g={top:"0px",left:"0px",right:"0px",bottom:"0px"},p=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function C({attributes:e,setAttributes:l,context:t}){const{inputName:C,selPattern:h,selectValues:E,selectedValues:k,folder_val:v,required:y,bgColor:f,optionColor:x,hoverBgColor:S,font_style_option:B,default_pos:w,mobile_pos:P,bgSelectColor:V,bgSelectGradient:N,radius_value:O,border_value:T,labelContent:R,labelWidth:A,labelVertAlign:G,font_style_label:q,bgColor_label:M,bgGradient_label:I,textColor_label:D,radius_label:F,border_label:L,padding_label:U,labelSpace:W,shadow_element:H,shadow_result:Y,is_shadow:j,className:z}=e,J=(0,b.useIsIframeMobile)(),K=(0,r.useRef)(null),Q=(0,d.useBlockProps)({ref:K,style:{backgroundColor:f}}),X=(0,b.useElementBackgroundColor)(K,Q.style);(0,r.useEffect)((()=>{if(X){l({shadow_element:{...H,baseColor:X}});const e=(0,b.ShadowElm)({...H,baseColor:X});e&&l({shadow_result:e.style})}}),[X]),(0,s.N)(a.B,e);const Z="multi"===h?{multiple:!0}:{};(0,s.N)(a.B,e);const $=t["itmar/label_width"]||"auto";return(0,r.useEffect)((()=>{l({labelWidth:$})}),[$]),(0,r.useEffect)((()=>{l({selectedValues:[]})}),[h]),(0,o.createElement)(o.Fragment,null,(0,o.createElement)(d.InspectorControls,{group:"settings"},(0,o.createElement)(u.PanelBody,{title:(0,n.__)("Select Element Settings","block-collections"),initialOpen:!0,className:"select_design_ctrl"},(0,o.createElement)(u.PanelRow,null,(0,o.createElement)(u.TextControl,{label:(0,n.__)("name attribute name","block-collections"),value:C,onChange:e=>l({inputName:e})})),(0,o.createElement)("label",{className:"components-base-control__label"},(0,n.__)("Select Pattern","block-collections")),(0,o.createElement)(u.PanelRow,{className:"itmar_select_row"},(0,o.createElement)(u.RadioControl,{selected:h,options:[{label:(0,n.__)("Single Select","block-collections"),value:"single"},{label:(0,n.__)("Nulti Select","block-collections"),value:"multi"}],onChange:e=>{l({selPattern:e})}})),(0,o.createElement)(u.TextControl,{label:(0,n.__)("Place Folder Display","block-collections"),value:v,onChange:e=>l({folder_val:e})}),(0,o.createElement)(u.PanelBody,{className:"itmar_notice_select_panel",title:(0,n.__)("Option info Setting","block-collections")},(0,o.createElement)(_.A,{optionValues:E,onAddOption:e=>{l({selectValues:[...E,e]})},onUpdateOption:e=>{l({selectValues:e})}})))),(0,o.createElement)(d.InspectorControls,{group:"styles"},(0,o.createElement)(u.PanelBody,{title:(0,n.__)("Global settings","block-collections"),initialOpen:!1,className:"select_design_ctrl"},(0,o.createElement)(d.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Background Color Setting","block-collections"),settings:[{colorValue:f,label:(0,n.__)("Choose Block Background color","block-collections"),onColorChange:e=>l({bgColor:e})},{colorValue:V,gradientValue:N,label:(0,n.__)("Choose Select Background color","block-collections"),onColorChange:e=>{l({bgSelectColor:void 0===e?"":e})},onGradientChange:e=>l({bgSelectGradient:e})}]}),(0,o.createElement)(u.__experimentalBoxControl,{label:J?(0,n.__)("Margin settings(mobile)","block-collections"):(0,n.__)("Margin settings(desk top)","block-collections"),values:J?P.margin_value:w.margin_value,onChange:e=>{l(J?{mobile_pos:{...P,margin_value:e}}:{default_pos:{...w,margin_value:e}})},units:p,allowReset:!0,resetValues:m}),(0,o.createElement)(u.__experimentalBoxControl,{label:J?(0,n.__)("Padding settings(mobile)","block-collections"):(0,n.__)("Padding settings(desk top)","block-collections"),values:J?P.padding_value:w.padding_value,onChange:e=>{l(J?{mobile_pos:{...P,padding_value:e}}:{default_pos:{...w,padding_value:e}})},units:p,allowReset:!0,resetValues:m}),(0,o.createElement)(u.PanelBody,{title:(0,n.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl"},(0,o.createElement)(u.__experimentalBorderBoxControl,{colors:[{color:"#72aee6"},{color:"#000"},{color:"#fff"}],onChange:e=>l({border_value:e}),value:T,allowReset:!0,resetValues:g}),(0,o.createElement)(d.__experimentalBorderRadiusControl,{values:O,onChange:e=>l({radius_value:"string"==typeof e?{value:e}:e})})),(0,o.createElement)(u.ToggleControl,{label:(0,n.__)("Is Shadow","block-collections"),checked:j,onChange:e=>{l({is_shadow:e})}}),j&&(0,o.createElement)(b.ShadowStyle,{shadowStyle:{...H},onChange:(e,t)=>{l({shadow_result:e.style}),l({shadow_element:t})}})),(0,o.createElement)(u.PanelBody,{title:(0,n.__)("Option Style Settings","block-collections"),initialOpen:!1,className:"select_design_ctrl"},(0,o.createElement)(b.TypographyControls,{title:(0,n.__)("Typography","block-collections"),fontStyle:B,onChange:e=>{l({font_style_option:e})},isMobile:J,initialOpen:!1}),(0,o.createElement)(d.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Option Color Setting","block-collections"),settings:[{colorValue:x,label:(0,n.__)("Choose Text color","block-collections"),onColorChange:e=>l({optionColor:e})},{colorValue:S,label:(0,n.__)("Choose Background color on mouse hover","block-collections"),onColorChange:e=>l({hoverBgColor:e})}]}))),(0,o.createElement)("div",{...Q},(0,o.createElement)(a.B,{attributes:e},(0,o.createElement)(o.Fragment,null,(0,o.createElement)(c.s,{onOptionSelect:e=>{if(null==e)return void l({selectedValues:[]});if(k.includes(e))return;const t="multi"===h?[...k,e]:[e];l({selectedValues:t})},onOptionDeselect:e=>{const t=k.filter((l=>l!==e));l({selectedValues:t})}},(0,o.createElement)("select",{class:"nomal",...Z,name:C,"data-placeholder":v},"single"===h&&(0,o.createElement)("option",{value:""},(0,n.__)("Please Select.","block-collections")),E.map((e=>(0,o.createElement)("option",{id:e.id,className:e.classname,value:e.value,selected:k.includes(e.id)},e.label))))),(0,o.createElement)(i.A,{attributes:{required:y,labelContent:R,font_style_label:q,bgColor_label:M,bgGradient_label:I,textColor_label:D,radius_label:F,border_label:L,padding_label:U,labelSpace:W,labelWidth:A,labelVertAlign:G,shadow_result:Y,is_shadow:j,isMobile:J,className:z},setAttributes:l})))))}},6014:(e,l,t)=>{t.d(l,{N:()=>s});var o=t(1609),n=t(9348),a=t(8267),c=t(5848);function s(e,l){(0,n.useDeepCompareEffect)((()=>{const t=document.getElementsByName("editor-canvas")[0];if(t){const n=t.contentDocument||t.contentWindow.document,s=new a.E;(0,c.F0)(s.collectStyles((0,o.createElement)(e,{attributes:l})));const r=s.getStyleTags().replace(/<style[^>]*>|<\/style>/g,""),i=n.createElement("style");return i.innerHTML=r,n.head.appendChild(i),()=>{n.head.removeChild(i)}}}),[l])}},9742:(e,l,t)=>{t.d(l,{Ak:()=>o});let o=(e=21)=>crypto.getRandomValues(new Uint8Array(e)).reduce(((e,l)=>e+((l&=63)<36?l.toString(36):l<62?(l-26).toString(36).toUpperCase():l>62?"-":"_")),"")}}]);
//# sourceMappingURL=552.js.map