"use strict";(globalThis.webpackChunkblock_collections=globalThis.webpackChunkblock_collections||[]).push([[866],{866:(e,l,t)=>{t.r(l),t.d(l,{default:()=>x});var o=t(609),n=t(723),a=t(279),c=t(650),s=t(412),r=t(267),i=t(848);function _(e,l){(0,s.useDeepCompareEffect)((()=>{const t=document.getElementsByName("editor-canvas")[0];if(t){const n=t.contentDocument||t.contentWindow.document,a=new r.E;(0,i.F0)(a.collectStyles((0,o.createElement)(e,{attributes:l})));const c=a.getStyleTags().replace(/<style[^>]*>|<\/style>/g,""),s=n.createElement("style");return s.innerHTML=c,n.head.appendChild(s),()=>{n.head.removeChild(s)}}}),[l])}var b=t(87),u=t(715),d=t(427),m=t(223);const g={top:"10px",left:"10px",right:"10px",bottom:"10px"},p={top:"0px",left:"0px",right:"0px",bottom:"0px"},C=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function h(e){const{attributes:l,setAttributes:t}=e,{required:a,labelContent:c,font_style_label:r,bgColor_label:i,bgGradient_label:b,textColor_label:h,radius_label:E,border_label:k,padding_label:v,labelSpace:y,isMobile:f}=l;return _(m.A,e.attributes),(0,o.createElement)(o.Fragment,null,(0,o.createElement)(u.InspectorControls,{group:"settings"},(0,o.createElement)(d.PanelBody,{title:(0,n.__)("Required Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,o.createElement)(d.PanelRow,{className:"labelRequierd_row"},(0,o.createElement)(d.ToggleControl,{label:(0,n.__)("Required input","block-collections"),checked:a.flg,onChange:e=>{const l={...a,flg:e};t({required:l})}})),a.flg&&(0,o.createElement)(d.PanelRow,null,(0,o.createElement)(d.TextControl,{label:(0,n.__)("Show 'required'","block-collections"),value:a.display,isPressEnterToChange:!0,onChange:e=>{const l={...a,display:e};t({required:l})}}))),(0,o.createElement)(d.PanelBody,{title:(0,n.__)("Label Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,o.createElement)(d.PanelRow,{className:"labelInfo_row"},(0,o.createElement)(d.TextControl,{label:(0,n.__)("Text of Label","block-collections"),labelPosition:"top",value:c,isPressEnterToChange:!0,onChange:e=>t({labelContent:e})})))),(0,o.createElement)(u.InspectorControls,{group:"styles"},(0,o.createElement)(d.PanelBody,{title:(0,n.__)("Label style settings","block-collections"),initialOpen:!1,className:"title_design_ctrl"},(0,o.createElement)(s.TypographyControls,{title:(0,n.__)("Typography","block-collections"),fontStyle:r,onChange:e=>{t({font_style_label:e})},isMobile:f,initialOpen:!1}),(0,o.createElement)(u.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Label Color Setting","block-collections"),settings:[{colorValue:h,label:(0,n.__)("Choose Text color","block-collections"),onColorChange:e=>t({textColor_label:e})},{colorValue:i,gradientValue:b,label:(0,n.__)("Choose Background color","block-collections"),onColorChange:e=>t({bgColor_label:e}),onGradientChange:e=>t({bgGradient_label:e})}]}),(0,o.createElement)(d.PanelBody,{title:(0,n.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl"},(0,o.createElement)(d.__experimentalBorderBoxControl,{onChange:e=>t({border_label:e}),value:k,allowReset:!0,resetValues:p}),(0,o.createElement)(u.__experimentalBorderRadiusControl,{values:E,onChange:e=>t({radius_label:"string"==typeof e?{value:e}:e})})),(0,o.createElement)(d.__experimentalBoxControl,{label:(0,n.__)("Padding settings","block-collections"),values:v,onChange:e=>t({padding_label:e}),units:C,allowReset:!0,resetValues:g}),(0,o.createElement)(d.__experimentalUnitControl,{dragDirection:"e",onChange:e=>t({labelSpace:e}),label:(0,n.__)("Spacing with textbox","block-collections"),value:y}))),(0,o.createElement)(m.A,{attributes:l},a.flg?(0,o.createElement)(o.Fragment,null,c,(0,o.createElement)("span",null,"(",a.display,")")):c))}let E=(e=21)=>crypto.getRandomValues(new Uint8Array(e)).reduce(((e,l)=>e+((l&=63)<36?l.toString(36):l<62?(l-26).toString(36).toUpperCase():l>62?"-":"_")),"");function k(e){const{optionValues:l}=e,[t,a]=(0,b.useState)(!1),[c,s]=(0,b.useState)(null),[r,i]=(0,b.useState)(!1),[_,u]=(0,b.useState)(null),m=()=>a(!0),g=()=>a(!1),p=()=>{i(!1),u(null)},C=(e,l)=>{s((t=>({...t,[e]:l})))};return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(d.Button,{label:(0,n.__)("add","block-collections"),icon:"insert",onClick:()=>{const e=E(5);s({id:e,value:"",label:"",classname:""}),m()}}),l.map((e=>(0,o.createElement)(d.Notice,{key:e.id,status:"info",onRemove:()=>(e=>{u(e),i(!0)})(e)},(0,o.createElement)("span",{onClick:()=>(e=>{s(e),m()})(e)},e.label)))),t&&(0,o.createElement)(d.Modal,{title:(0,n.__)("Option Info Edit","block-collections"),onRequestClose:g},(0,o.createElement)(d.TextControl,{label:(0,n.__)("Display Label","block-collections"),value:c.label,onChange:e=>C("label",e)}),(0,o.createElement)(d.TextControl,{label:(0,n.__)("Option Value","block-collections"),value:c.value,onChange:e=>C("value",e)}),(0,o.createElement)(d.TextControl,{label:(0,n.__)("Class Name","block-collections"),value:c.classname,onChange:e=>C("classname",e)}),(0,o.createElement)(d.Button,{variant:"primary",onClick:()=>{if(c&&l.some((e=>e.id===c.id))){const t=l.map((e=>e.id===c.id?c:e));e.onUpdateOption(t)}else e.onAddOption(c);g()}},(0,n.__)("Save Changes","block-collections"))),r&&(0,o.createElement)(d.Modal,{title:(0,n.__)("Confirm Deletion","block-collections"),onRequestClose:p},(0,o.createElement)("p",null,(0,n.__)("Are you sure you want to delete this item?","block-collections")),(0,o.createElement)(d.Button,{variant:"primary",onClick:()=>{_&&(t=>{const o=l.filter((e=>e.id!==t));e.onUpdateOption(o)})(_.id),p()}},(0,n.__)("Yes, Delete","block-collections")),(0,o.createElement)(d.Button,{variant:"secondary",onClick:p},(0,n.__)("Cancel","block-collections"))))}const v={top:"10px",left:"10px",right:"10px",bottom:"10px"},y={top:"0px",left:"0px",right:"0px",bottom:"0px"},f=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function x({attributes:e,setAttributes:l,context:t}){const{inputName:r,selPattern:i,selectValues:m,selectedValues:g,folder_val:p,required:C,bgColor:E,optionColor:x,hoverBgColor:S,font_style_option:B,default_pos:w,mobile_pos:P,bgSelectColor:V,bgSelectGradient:N,radius_value:O,border_value:T,labelContent:R,labelWidth:G,labelVertAlign:q,font_style_label:A,bgColor_label:M,bgGradient_label:I,textColor_label:D,radius_label:F,border_label:L,padding_label:U,labelSpace:W,shadow_element:H,shadow_result:Y,is_shadow:j,className:z}=e,J=(0,s.useIsIframeMobile)(),K=(0,b.useRef)(null),Q=(0,u.useBlockProps)({ref:K,style:{backgroundColor:E}}),X=(0,s.useElementBackgroundColor)(K,Q.style);(0,b.useEffect)((()=>{if(X){l({shadow_element:{...H,baseColor:X}});const e=(0,s.ShadowElm)({...H,baseColor:X});e&&l({shadow_result:e.style})}}),[X]),_(a.B,e);const Z="multi"===i?{multiple:!0}:{};_(a.B,e);const $=t["itmar/label_width"]||"auto";return(0,b.useEffect)((()=>{l({labelWidth:$})}),[$]),(0,b.useEffect)((()=>{l({selectedValues:[]})}),[i]),(0,o.createElement)(o.Fragment,null,(0,o.createElement)(u.InspectorControls,{group:"settings"},(0,o.createElement)(d.PanelBody,{title:(0,n.__)("Select Element Settings","block-collections"),initialOpen:!0,className:"select_design_ctrl"},(0,o.createElement)(d.PanelRow,null,(0,o.createElement)(d.TextControl,{label:(0,n.__)("name attribute name","block-collections"),value:r,onChange:e=>l({inputName:e})})),(0,o.createElement)("label",{className:"components-base-control__label"},(0,n.__)("Select Pattern","block-collections")),(0,o.createElement)(d.PanelRow,{className:"itmar_select_row"},(0,o.createElement)(d.RadioControl,{selected:i,options:[{label:(0,n.__)("Single Select","block-collections"),value:"single"},{label:(0,n.__)("Nulti Select","block-collections"),value:"multi"}],onChange:e=>{l({selPattern:e})}})),(0,o.createElement)(d.TextControl,{label:(0,n.__)("Place Folder Display","block-collections"),value:p,onChange:e=>l({folder_val:e})}),(0,o.createElement)(d.PanelBody,{className:"itmar_notice_select_panel",title:(0,n.__)("Option info Setting","block-collections")},(0,o.createElement)(k,{optionValues:m,onAddOption:e=>{l({selectValues:[...m,e]})},onUpdateOption:e=>{l({selectValues:e})}})))),(0,o.createElement)(u.InspectorControls,{group:"styles"},(0,o.createElement)(d.PanelBody,{title:(0,n.__)("Global settings","block-collections"),initialOpen:!1,className:"select_design_ctrl"},(0,o.createElement)(u.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Background Color Setting","block-collections"),settings:[{colorValue:E,label:(0,n.__)("Choose Block Background color","block-collections"),onColorChange:e=>l({bgColor:e})},{colorValue:V,gradientValue:N,label:(0,n.__)("Choose Select Background color","block-collections"),onColorChange:e=>{l({bgSelectColor:void 0===e?"":e})},onGradientChange:e=>l({bgSelectGradient:e})}]}),(0,o.createElement)(d.__experimentalBoxControl,{label:J?(0,n.__)("Margin settings(mobile)","block-collections"):(0,n.__)("Margin settings(desk top)","block-collections"),values:J?P.margin_value:w.margin_value,onChange:e=>{l(J?{mobile_pos:{...P,margin_value:e}}:{default_pos:{...w,margin_value:e}})},units:f,allowReset:!0,resetValues:v}),(0,o.createElement)(d.__experimentalBoxControl,{label:J?(0,n.__)("Padding settings(mobile)","block-collections"):(0,n.__)("Padding settings(desk top)","block-collections"),values:J?P.padding_value:w.padding_value,onChange:e=>{l(J?{mobile_pos:{...P,padding_value:e}}:{default_pos:{...w,padding_value:e}})},units:f,allowReset:!0,resetValues:v}),(0,o.createElement)(d.PanelBody,{title:(0,n.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl"},(0,o.createElement)(d.__experimentalBorderBoxControl,{colors:[{color:"#72aee6"},{color:"#000"},{color:"#fff"}],onChange:e=>l({border_value:e}),value:T,allowReset:!0,resetValues:y}),(0,o.createElement)(u.__experimentalBorderRadiusControl,{values:O,onChange:e=>l({radius_value:"string"==typeof e?{value:e}:e})})),(0,o.createElement)(d.ToggleControl,{label:(0,n.__)("Is Shadow","block-collections"),checked:j,onChange:e=>{l({is_shadow:e})}}),j&&(0,o.createElement)(s.ShadowStyle,{shadowStyle:{...H},onChange:(e,t)=>{l({shadow_result:e.style}),l({shadow_element:t})}})),(0,o.createElement)(d.PanelBody,{title:(0,n.__)("Option Style Settings","block-collections"),initialOpen:!1,className:"select_design_ctrl"},(0,o.createElement)(s.TypographyControls,{title:(0,n.__)("Typography","block-collections"),fontStyle:B,onChange:e=>{l({font_style_option:e})},isMobile:J,initialOpen:!1}),(0,o.createElement)(u.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Option Color Setting","block-collections"),settings:[{colorValue:x,label:(0,n.__)("Choose Text color","block-collections"),onColorChange:e=>l({optionColor:e})},{colorValue:S,label:(0,n.__)("Choose Background color on mouse hover","block-collections"),onColorChange:e=>l({hoverBgColor:e})}]}))),(0,o.createElement)("div",{...Q},(0,o.createElement)(a.B,{attributes:e},(0,o.createElement)(o.Fragment,null,(0,o.createElement)(c.s,{onOptionSelect:e=>{if(null==e)return void l({selectedValues:[]});if(g.includes(e))return;const t="multi"===i?[...g,e]:[e];l({selectedValues:t})},onOptionDeselect:e=>{const t=g.filter((l=>l!==e));l({selectedValues:t})}},(0,o.createElement)("select",{class:"nomal",...Z,name:r,"data-placeholder":p},"single"===i&&(0,o.createElement)("option",{value:""},(0,n.__)("Please Select.","block-collections")),m.map((e=>(0,o.createElement)("option",{id:e.id,className:e.classname,value:e.value,selected:g.includes(e.id)},e.label))))),(0,o.createElement)(h,{attributes:{required:C,labelContent:R,font_style_label:A,bgColor_label:M,bgGradient_label:I,textColor_label:D,radius_label:F,border_label:L,padding_label:U,labelSpace:W,labelWidth:G,labelVertAlign:q,shadow_result:Y,is_shadow:j,isMobile:J,className:z},setAttributes:l})))))}}}]);