"use strict";(self.webpackChunkblock_collections=self.webpackChunkblock_collections||[]).push([[313],{2027:function(e,t,l){l.d(t,{AC:function(){return i},KW:function(){return c}});var o=l(9307),n=l(8446),a=l.n(n);function i(e,t){const[l,n]=(0,o.useState)("");return(0,o.useEffect)((()=>{if(e.current&&t)if(t.backgroundColor&&!t.backgroundColor.startsWith("var(--wp"))n(t.backgroundColor);else if(e.current){const t=getComputedStyle(e.current);n(t.backgroundColor)}}),[t,e]),l}function c(e,t){const l=(0,o.useRef)();a()(t,l.current)||(l.current=t),(0,o.useEffect)((()=>e()),[l.current])}},8566:function(e,t,l){var o=l(9307),n=l(5736),a=l(5609),i=l(2175);const c=(0,o.createElement)("a",{href:"https://fontawesome.com/search",target:"_blank"},"FontAwesome"),r=(0,o.createElement)("span",{},c,(0,n.__)("Select the icon from and enter Unicode (the upper right four digits of the selection dialog). ","itmar_block_collections")),s=(0,o.createElement)("span",{},c,(0,n.__)("Please select the first class name shown in the HTML code field of the selection dialog. ","itmar_block_collections")),_=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}],m=[{value:"Font Awesome 6 Free",label:"SOLID"},{value:"Font Awesome 6 Brands",label:"BRANDS"}];t.Z=e=>{let{iconStyle:t,onChange:l}=e;const{icon_name:c,icon_pos:p,icon_size:u,icon_color:d,icon_space:g,icon_family:b}=t;return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(a.TextControl,{label:(0,n.__)("icon name","itmar_block_collections"),help:r,labelPosition:"top",value:c,isPressEnterToChange:!0,onChange:e=>{const o={...t,icon_name:e};l(o)}}),(0,o.createElement)(a.ComboboxControl,{label:(0,n.__)("Icon Family","itmar_block_collections"),help:s,options:m,value:b||"Font Awesome 6 Free",onChange:e=>{const o={...t,icon_family:e};l(o)}}),(0,o.createElement)(a.PanelRow,{className:"sizing_row"},(0,o.createElement)(a.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{const o={...t,icon_size:e};l(o)},label:(0,n.__)("Size","itmar_block_collections"),value:u,units:_}),(0,o.createElement)(a.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{const o={...t,icon_space:e};l(o)},label:(0,n.__)("spacing to end","itmar_block_collections"),value:g,units:_})),(0,o.createElement)(i.PanelColorSettings,{title:(0,n.__)("Color settings","itmar_location"),initialOpen:!1,colorSettings:[{value:d,onChange:e=>{const o={...t,icon_color:e};l(o)},label:(0,n.__)("Icon color","itmar_location")}]}),(0,o.createElement)("label",{className:"components-base-control__label"},(0,n.__)("Arrangement","itmar_block_collections")),(0,o.createElement)(a.PanelRow,{className:"itmar_position_row"},(0,o.createElement)(a.RadioControl,{selected:p,options:[{label:(0,n.__)("left","itmar_block_collections"),value:"left"},{label:(0,n.__)("right","itmar_block_collections"),value:"right"}],onChange:e=>{const o={...t,icon_pos:e};l(o)}})))}},6812:function(e,t,l){l.d(t,{e:function(){return m}});var o=l(9307),n=l(5736),a=l(2175),i=l(5609),c=l(9818),r=l(9747);const s=(e,t)=>{let l,o,n,a;switch(e){case"top_left":l=t,o=t,n=-1*t,a=-1*t;break;case"top_right":l=-1*t,o=t,n=t,a=-1*t;break;case"bottom_left":case"right_bottom":l=t,o=-1*t,n=-1*t,a=t;break;case"bottom_right":l=-1*t,o=-1*t,n=t,a=t;break;case"top":l=0,o=0,n=-1*t,a=t}return{topLeft:l,topRight:o,bottomLeft:n,bottmRight:a}};function _(e){return e.includes("linear-gradient")||e.includes("radial-gradient")}const m=e=>{const{shadowType:t,spread:l,lateral:o,longitude:a,nomalBlur:i,shadowColor:m,blur:p,intensity:u,distance:d,newDirection:g,clayDirection:b,embos:h,opacity:C,depth:f,bdBlur:y,expand:k,glassblur:x,glassopa:v,hasOutline:E,baseColor:w}=e;if("nomal"===t)return"dent"===h?{style:{boxShadow:`${o}px ${a}px ${i}px ${l}px transparent, inset ${o}px ${a}px ${i}px ${l}px ${m}`}}:{style:{boxShadow:`${o}px ${a}px ${i}px ${l}px ${m}, inset ${o}px ${a}px ${i}px ${l}px transparent`}};if("newmor"===t){if(_(w))return(0,c.dispatch)("core/notices").createNotice("error",(0,n.__)("Neumorphism cannot be set when the background color is a gradient. ","itmar_guest_contact_block"),{type:"snackbar",isDismissible:!0}),null;const e=(0,r.vc)(w),t=e.lightness+u<100?e.lightness+u:100,l=e.lightness-u>0?e.lightness-u:0,o=(0,r.Pr)(e.hue,e.saturation,t),a=(0,r.Pr)(e.hue,e.saturation,l),i=s(g,d),m={style:{border:"none",background:w}};return"swell"===h?{style:{...m.style,boxShadow:`${i.topLeft}px ${i.topRight}px ${p}px ${a}, ${i.bottomLeft}px ${i.bottmRight}px ${p}px ${o}, inset ${i.topLeft}px ${i.topRight}px ${p}px transparent, inset ${i.bottomLeft}px ${i.bottmRight}px ${p}px transparent`}}:{style:{...m.style,boxShadow:`${i.topLeft}px ${i.topRight}px ${p}px transparent, ${i.bottomLeft}px ${i.bottmRight}px ${p}px transparent, inset ${i.topLeft}px ${i.topRight}px ${p}px ${a}, inset ${i.bottomLeft}px ${i.bottmRight}px ${p}px ${o}`}}}if("claymor"===t){if(_(w))return(0,c.dispatch)("core/notices").createNotice("error",(0,n.__)("claymorphism cannot be set when the background color is a gradient. ","itmar_guest_contact_block"),{type:"snackbar",isDismissible:!0}),null;const e=(0,r.MM)(w),t=s(b,k),l=s(b,f),o={style:{background:`rgba(255, 255, 255, ${C})`,backdropFilter:`blur(${y}px)`,border:"none"}};return{...o,style:{...o.style,boxShadow:`${t.topLeft}px ${t.bottmRight}px ${2*k}px 0px rgba(${e.red}, ${e.green}, ${e.blue}, 0.5), inset ${l.topRight}px ${l.bottomLeft}px 16px 0px rgba(${e.red}, ${e.green}, ${e.blue}, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)`}}}if("glassmor"===t){const e={style:{backgroundColor:`rgba(255, 255, 255, ${v})`,...E?{border:"1px solid rgba(255, 255, 255, 0.4)"}:{},borderRightColor:"rgba(255, 255, 255, 0.2)",borderBottomColor:"rgba(255, 255, 255, 0.2)",backdropFilter:`blur( ${x}px )`}};return"swell"===h?{...e,style:{...e.style,boxShadow:"0 8px 12px 0 rgba( 31, 38, 135, 0.37 ), inset 0 8px 12px 0 transparent"}}:{...e,style:{...e.style,boxShadow:"0 8px 12px 0 transparent, inset 0 8px 12px 0 rgba( 31, 38, 135, 0.37 )"}}}};t.Z=e=>{let{shadowStyle:t,onChange:l}=e;const[c,r]=(0,o.useState)(t),{shadowType:s,spread:_,lateral:p,longitude:u,nomalBlur:d,shadowColor:g,blur:b,intensity:h,distance:C,newDirection:f,clayDirection:y,embos:k,opacity:x,depth:v,bdBlur:E,expand:w,glassblur:S,glassopa:$,hasOutline:R}=c;return(0,o.useEffect)((()=>{const e=m(c);e&&l(e,c)}),[c]),(0,o.createElement)(o.Fragment,null,(0,o.createElement)(i.PanelBody,{title:(0,n.__)("Shadow Type","itmar_block_collections"),initialOpen:!0},(0,o.createElement)("div",{className:"itmar_shadow_type"},(0,o.createElement)(i.RadioControl,{selected:s,options:[{label:(0,n.__)("Nomal","itmar_block_collections"),value:"nomal"},{label:(0,n.__)("Neumorphism","itmar_block_collections"),value:"newmor"},{label:(0,n.__)("Claymorphism","itmar_block_collections"),value:"claymor"},{label:(0,n.__)("Grassmophism","itmar_block_collections"),value:"glassmor"}],onChange:e=>r({...c,shadowType:e})})),"claymor"!==s&&(0,o.createElement)("div",{className:"embos"},(0,o.createElement)(i.RadioControl,{label:(0,n.__)("unevenness","itmar_block_collections"),selected:k,options:[{value:"swell"},{value:"dent"}],onChange:e=>r({...c,embos:e})}))),"nomal"===s&&(0,o.createElement)(i.PanelBody,{title:(0,n.__)("Nomal settings","itmar_block_collections"),initialOpen:!1},(0,o.createElement)(i.RangeControl,{value:_,label:(0,n.__)("Spread","itmar_block_collections"),max:50,min:0,onChange:e=>r({...c,spread:e}),withInputField:!1}),(0,o.createElement)(i.RangeControl,{value:p,label:(0,n.__)("Lateral direction","itmar_block_collections"),max:50,min:0,onChange:e=>r({...c,lateral:e}),withInputField:!1}),(0,o.createElement)(i.RangeControl,{value:u,label:(0,n.__)("Longitudinal direction","itmar_block_collections"),max:50,min:0,onChange:e=>r({...c,longitude:e}),withInputField:!1}),(0,o.createElement)(i.RangeControl,{value:d,label:(0,n.__)("Blur","itmar_block_collections"),max:20,min:0,onChange:e=>r({...c,nomalBlur:e}),withInputField:!1}),(0,o.createElement)(a.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Shadow Color Setting","itmar_block_collections"),settings:[{colorValue:g,label:(0,n.__)("Choose Shadow color","itmar_block_collections"),onColorChange:e=>r({...c,shadowColor:e})}]})),"newmor"===s&&(0,o.createElement)(i.PanelBody,{title:(0,n.__)("Neumorphism settings","itmar_block_collections"),initialOpen:!1},(0,o.createElement)(i.RangeControl,{value:C,label:(0,n.__)("Distance","itmar_block_collections"),max:50,min:0,onChange:e=>r({...c,distance:e}),withInputField:!1}),(0,o.createElement)(i.RangeControl,{value:h,label:(0,n.__)("Intensity","itmar_block_collections"),max:100,min:0,onChange:e=>r({...c,intensity:e}),withInputField:!1}),(0,o.createElement)(i.RangeControl,{value:b,label:(0,n.__)("Blur","itmar_block_collections"),max:20,min:0,onChange:e=>r({...c,blur:e}),withInputField:!1}),(0,o.createElement)(i.PanelRow,null,(0,o.createElement)("div",{className:"light_direction"},(0,o.createElement)(i.RadioControl,{selected:f,options:[{value:"top_left"},{value:"top_right"},{value:"bottom_left"},{value:"bottom_right"}],onChange:e=>r({...c,newDirection:e})})))),"claymor"===s&&(0,o.createElement)(i.PanelBody,{title:(0,n.__)("Claymorphism settings","itmar_block_collections"),initialOpen:!1},(0,o.createElement)(i.RangeControl,{value:x,label:(0,n.__)("Opacity","itmar_block_collections"),max:1,min:0,step:.1,onChange:e=>r({...c,opacity:e}),withInputField:!1}),(0,o.createElement)(i.RangeControl,{value:v,label:"Depth",max:20,min:0,onChange:e=>r({...c,depth:e}),withInputField:!1}),(0,o.createElement)(i.RangeControl,{value:w,label:"Expand",max:50,min:0,onChange:e=>r({...c,expand:e}),withInputField:!1}),(0,o.createElement)(i.RangeControl,{value:E,label:"Background Blur",max:10,min:0,onChange:e=>r({...c,bdBlur:e}),withInputField:!1}),(0,o.createElement)("div",{className:"light_direction claymor"},(0,o.createElement)(i.RadioControl,{selected:y,options:[{value:"right_bottom"},{value:"top_right"},{value:"top"}],onChange:e=>r({...c,clayDirection:e})}))),"glassmor"===s&&(0,o.createElement)(i.PanelBody,{title:(0,n.__)("Grassmophism settings","itmar_block_collections"),initialOpen:!1},(0,o.createElement)(i.RangeControl,{value:S,label:(0,n.__)("Glass blur","itmar_block_collections"),max:20,min:0,onChange:e=>r({...c,glassblur:e}),withInputField:!1}),(0,o.createElement)(i.RangeControl,{value:$,label:(0,n.__)("Glass Opacity","itmar_block_collections"),max:1,min:0,step:.1,onChange:e=>r({...c,glassopa:e}),withInputField:!1}),(0,o.createElement)("fieldset",null,(0,o.createElement)(i.ToggleControl,{label:(0,n.__)("Show outline","itmar_block_collections"),checked:R,onChange:()=>r({...c,hasOutline:!R})}))))}},3812:function(e,t,l){var o=l(9307),n=l(5609),a=l(3157),i=l(5736);t.Z=e=>{let{title:t,fontStyle:l,initialOpen:c,onChange:r}=e;const{fontSize:s,fontFamily:_,fontWeight:m,isItalic:p}=l,u=[{value:"Arial, sans-serif",label:"Arial",fontFamily:"Arial, sans-serif"},{value:"Courier New, monospace",label:"Courier New",fontFamily:"Courier New, monospace"},{value:"Georgia, serif",label:"Georgia",fontFamily:"Georgia, serif"},{label:"Noto Sans JP",value:"Noto Sans JP, sans-serif",fontFamily:"Noto Sans JP, sans-serif"},{label:"Texturina",value:"Texturina, serif",fontFamily:"Texturina, serif"}],d={option:(e,t)=>({...e,fontFamily:t.data.fontFamily})};return(0,o.createElement)(n.PanelBody,{title:t,initialOpen:c},(0,o.createElement)(n.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{e=""!=e?e:"0px";const t={...l,fontSize:e};r(t)},label:(0,i.__)("Size","itmar_block_collections"),value:s,units:[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}]}),(0,o.createElement)((e=>{let{label:t,value:l,onChange:n}=e;return(0,o.createElement)(o.Fragment,null,t&&(0,o.createElement)("label",{className:"components-base-control__label"},t),(0,o.createElement)(a.ZP,{options:u,value:u.find((e=>e.value===l)),onChange:e=>{n(e.value)},styles:d}))}),{label:(0,i.__)("font family","itmar_block_collections"),value:_,onChange:e=>{const t={...l,fontFamily:e};r(t)}}),(0,o.createElement)("label",{className:"components-base-control__label"},(0,i.__)("font weight","itmar_block_collections")),(0,o.createElement)(n.PanelRow,{className:"itmar_weight_row"},(0,o.createElement)(n.RadioControl,{selected:m,options:[{label:"LIGHT",value:"300"},{label:"REGULAR",value:"400"},{label:"MEDIUM",value:"500"},{label:"S-BOLD",value:"600"},{label:"BOLD",value:"700"},{label:"BLACK",value:"900"}],onChange:e=>{const t={...l,fontWeight:e};r(t)}})),(0,o.createElement)("label",{className:"components-base-control__label"},(0,i.__)("Italic display","itmar_block_collections")),(0,o.createElement)(n.ToggleControl,{checked:p,onChange:e=>{const t={...l,isItalic:e};r(t)}}))}},8313:function(e,t,l){l.r(t),l.d(t,{default:function(){return y}});var o=l(9307),n=l(5736),a=l(3812),i=l(8566),c=l(9539),r=l(6812),s=l(2387),_=l(6989),m=l.n(_),p=l(641),u=l(5609),d=l(2175),g=l(9818),b=l(2027);const h={top:"10px",left:"10px",right:"10px",bottom:"10px"},C=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}],f=e=>(0,o.createElement)("svg",{width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg"},(0,o.createElement)("text",{x:"0",y:"15",fontSize:"15","font-weight":"bold"},`H${e}`));function y(e){let{attributes:t,setAttributes:l,clientId:_}=e;const{headingContent:y,headingType:k,titleType:x,align:v,padding_heading:E,optionStyle:w,shadow_element:S,is_shadow:$,is_underLine:R,underLine_prop:P,bgColor_underLine:I,bgGradient_underLine:L,linkKind:B,menu_pos:N,is_title_menu:F,selectedPageUrl:T,className:A}=t,O="center"===v?{marginLeft:"auto",marginRight:"auto"}:"right"===v?{marginLeft:"auto"}:{},M=(0,o.useRef)(null),D=(0,d.useBlockProps)({ref:M,style:{position:F?"relative":"static",...O}}),V=(0,b.AC)(M,D.style);(0,o.useEffect)((()=>{if(V){l({shadow_element:{...S,baseColor:V}});const e=(0,r.e)({...S,baseColor:V});e&&l({shadow_result:e.style})}}),[V]);const U=(0,o.useRef)(!1),[G,z]=(0,o.useState)(w);(0,o.useEffect)((()=>{l({optionStyle:G})}),[G]);const[H,W]=(0,o.useState)("");(0,o.useEffect)((()=>{"plaine"!==x&&(async()=>{try{const e=await m()({path:"/"});W("site"===x?e.name:e.description)}catch(e){console.error("Error fetching data:",e.message)}})()}),[x]);const Z=()=>{let e;A?.split(" ").includes("is-style-circle_marker")?e={styleName:"is-style-circle_marker",colorVal_circle:"var(--wp--preset--color--accent-1)",colorVal_second:"var(--wp--preset--color--accent-2)",circleScale:"3em",secondScale:"1.5em",second_opacity:.7,first_long:10,first_lat:-5,second_long:-10,second_lat:10,isSecond:!0}:A?.split(" ").includes("is-style-sub_copy")&&(e={styleName:"is-style-sub_copy",alignment_copy:"top left",color_text_copy:"var(--wp--preset--color--text)",color_background_copy:"var(--wp--preset--color--accent-1)",copy_content:"SAMPLE",font_style_copy:{fontSize:"16px",fontFamily:"Arial, sans-serif",fontWeight:"500",isItalic:!1},radius_copy:{topLeft:"10px",topRight:"10px",bottomRight:"0px",bottomLeft:"0px",value:"0px"},padding_copy:{top:"10px",left:"10px",bottom:"10px",right:"10px"},isIcon:!1,icon_style:{icon_name:"f030",icon_pos:"left",icon_size:"24px",icon_color:"#000",icon_space:"5px",icon_family:"Font Awesome 6 Free"}}),z(e),U.current=A,q(!1)},J=()=>{j(!0),l({className:U.current}),q(!1)},[K,q]=(0,o.useState)(!1),[Y,j]=(0,o.useState)(!1);(0,o.useEffect)((()=>{if(0!=U.current){if(Y)return void j(!1);if(void 0===U.current||U.current?.split(" ").includes("is-style-default"))return void Z();q(!0)}else U.current=A}),[A]),(0,p.P)(c.J,t);const[Q,X]=(0,o.useState)(w&&void 0!==w.copy_content?w.copy_content:"SAMPLE"),ee=(0,g.useSelect)((e=>e("core/block-editor").hasSelectedInnerBlock(_,!0)),[_]),[te,le]=(0,o.useState)(!1);(0,g.useSelect)((e=>{const t=e("core/block-editor").getBlockParents(_);for(let l=0;l<t.length;l++){const o=e("core/block-editor").getBlock(t[l]);if(o.attributes?.is_menu){le(!0);break}if(o.attributes?.is_submenu){le(!0);break}}}),[_]),(0,o.useEffect)((()=>{l({isMenuItem:te})}),[te]);const oe=(0,d.useInnerBlocksProps)({className:`submenu-block ${ee?"visible":""} ${N.replace(/ /g,"_")} ${F?"mobile_virtical":"mobile_horizen"}`},{allowedBlocks:["itmar/design-group"],template:[["itmar/design-group",{is_submenu:!0},[["itmar/design-title",{headingType:"H3"}]]]],templateLock:!1}),ne="plaine"===x?(0,o.createElement)(d.RichText,{tagName:k,className:"has-text-color",onChange:e=>{l({headingContent:e})},value:y,placeholder:(0,n.__)("Write Title text...","itmar_block_collections")}):React.createElement(k.toLowerCase(),{className:"has-text-color"},H);return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(d.InspectorControls,{group:"settings"},(0,o.createElement)(u.PanelBody,{title:(0,n.__)("Title Source Setting","itmar_block_collections")},(0,o.createElement)("div",{className:"itmar_title_type"},(0,o.createElement)(u.RadioControl,{label:(0,n.__)("Title type","itmar_block_collections"),selected:x,options:[{label:(0,n.__)("Plaine","itmar_block_collections"),value:"plaine"},{label:(0,n.__)("Site Title","itmar_block_collections"),value:"site"},{label:(0,n.__)("Chatch Phrase","itmar_block_collections"),value:"catch"}],onChange:e=>l({titleType:e}),help:(0,n.__)("You can display the site title and catchphrase in addition to the blank title.","itmar_block_collections")})),(0,o.createElement)("div",{className:"itmar_link_type"},(0,o.createElement)(u.RadioControl,{label:(0,n.__)("Link type","itmar_block_collections"),selected:B,options:[{label:(0,n.__)("None","itmar_block_collections"),value:"none"},{label:(0,n.__)("Fixed Page","itmar_block_collections"),value:"fixed"},{label:(0,n.__)("Archive Page","itmar_block_collections"),value:"archive"},{label:(0,n.__)("Free URL","itmar_block_collections"),value:"free"},{label:(0,n.__)("Sub Menu","itmar_block_collections"),value:"submenu"}],onChange:e=>l({linkKind:e}),help:(0,n.__)("You can select the type of URL to link to the title.","itmar_block_collections")})),"fixed"===B&&(0,o.createElement)(s.gv,{attributes:t,setAttributes:l,label:(0,n.__)("Select a fixed page to link to","itmar_block_collections"),homeUrl:itmar_block_option.home_url}),"archive"===B&&(0,o.createElement)(s.g4,{attributes:t,setAttributes:l,label:(0,n.__)("Select archive page to link to","itmar_block_collections"),homeUrl:itmar_block_option.home_url}),"free"===B&&(0,o.createElement)(u.TextControl,{label:(0,n.__)("Link to URL","itmar_block_collections"),labelPosition:"top",value:T,onChange:e=>{l({selectedPageUrl:e})}}),"submenu"===B&&(0,o.createElement)(u.PanelBody,{title:(0,n.__)("Submenu position settings","itmar_block_collections")},(0,o.createElement)(u.PanelRow,{className:"imgPos_row"},(0,o.createElement)("label",null,(0,n.__)("Menu Alignment","itmar_block_collections")),(0,o.createElement)(u.__experimentalAlignmentMatrixControl,{value:N,onChange:e=>{l({menu_pos:e})}})),(0,o.createElement)(u.ToggleControl,{label:(0,n.__)("Based on title","itmar_block_collections"),checked:F,help:(0,n.__)("If unchecked, the parent menu will be used as the reference. If there is no parent menu, do not uncheck it.","itmar_block_collections"),onChange:e=>{l({is_title_menu:e})}})))),(0,o.createElement)(d.InspectorControls,{group:"styles"},(0,o.createElement)(u.PanelBody,{title:(0,n.__)("Title settings","itmar_block_collections"),initialOpen:!0,className:"title_design_ctrl"},(0,o.createElement)(u.__experimentalBoxControl,{label:(0,n.__)("Padding settings","itmar_block_collections"),values:E,onChange:e=>l({padding_heading:e}),units:C,allowReset:!0,resetValues:h}),(0,o.createElement)(u.ToggleControl,{label:(0,n.__)("Is Shadow","itmar_block_collections"),checked:$,onChange:e=>{l({is_shadow:e})}}),$&&(0,o.createElement)(r.Z,{shadowStyle:{...S},onChange:(e,t)=>{l({shadow_result:e.style}),l({shadow_element:t})}}),(0,o.createElement)(u.ToggleControl,{label:(0,n.__)("Add an underline","itmar_block_collections"),checked:R,onChange:e=>{l({is_underLine:e})}}),R&&(0,o.createElement)(u.PanelBody,{title:(0,n.__)("UnderLine settings","itmar_block_collections"),initialOpen:!0,className:"title_design_ctrl"},(0,o.createElement)(u.PanelRow,{className:"distance_row"},(0,o.createElement)(u.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{const t={...P,height:e};l({underLine_prop:t})},label:(0,n.__)("Height","itmar_block_collections"),value:P.height}),(0,o.createElement)(u.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{const t={...P,width:e};l({underLine_prop:t})},label:(0,n.__)("Width","itmar_block_collections"),value:P.width}),(0,o.createElement)(u.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{const t={...P,distance:e};l({underLine_prop:t})},label:(0,n.__)("Distance","itmar_block_collections"),value:P.distance})),(0,o.createElement)(d.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Under Line Color Setting","itmar_block_collections"),settings:[{colorValue:I,gradientValue:L,label:(0,n.__)("Choose Under Line color","itmar_block_collections"),onColorChange:e=>{l({bgColor_underLine:void 0===e?"":e})},onGradientChange:e=>{l({bgGradient_underLine:e})}}]}),(0,o.createElement)(u.ToggleControl,{label:(0,n.__)("Animation on hover","itmar_block_collections"),checked:P.is_anime,onChange:e=>{const t={...P,is_anime:e};l({underLine_prop:t})}}))),A?.split(" ").includes("is-style-circle_marker")&&(0,o.createElement)(u.PanelBody,{title:(0,n.__)("Circle Marker Settings","itmar_block_collections"),initialOpen:!1,className:"title_design_ctrl"},(0,o.createElement)(d.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Circle Color Setting","itmar_block_collections"),settings:[{colorValue:w&&w.colorVal_circle?w.colorVal_circle:"var(--wp--preset--color--accent-1)",gradientValue:w&&w.gradientVal_circle?w.gradientVal_circle:void 0,label:(0,n.__)("Choose Circle Background","itmar_block_collections"),onColorChange:e=>{z((t=>({...t,colorVal_circle:e})))},onGradientChange:e=>{z((t=>({...t,gradientVal_circle:e})))}}]}),(0,o.createElement)(u.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{z((t=>({...t,circleScale:e})))},label:(0,n.__)("Circle Scale Setting","itmar_block_collections"),value:w&&w.circleScale?w.circleScale:"3em"}),(0,o.createElement)(u.PanelBody,{title:(0,n.__)("Position Settings","itmar_block_collections"),initialOpen:!0,className:"title_design_ctrl"},(0,o.createElement)(u.RangeControl,{value:w&&w.first_lat?w.first_lat:10,label:(0,n.__)("Lateral direction","itmar_block_collections"),max:50,min:-30,step:1,onChange:e=>{z((t=>({...t,first_lat:e})))},withInputField:!1}),(0,o.createElement)(u.RangeControl,{value:w&&w.first_long?w.first_long:10,label:(0,n.__)("Longitudinal direction","itmar_block_collections"),max:50,min:-30,step:1,onChange:e=>{z((t=>({...t,first_long:e})))},withInputField:!1})),(0,o.createElement)(u.PanelBody,{title:(0,n.__)("Second Circle Settings","itmar_block_collections"),initialOpen:!0},(0,o.createElement)(u.ToggleControl,{label:(0,n.__)("Second Circle","itmar_block_collections"),checked:!w||!w.isSecond||w.isSecond,onChange:e=>{z((t=>({...t,isSecond:e})))}})),!(!w||!w.isSecond)&&w.isSecond&&(0,o.createElement)(o.Fragment,null,(0,o.createElement)(d.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Circle Color Setting","itmar_block_collections"),settings:[{colorValue:w&&w.colorVal_second?w.colorVal_second:"var(--wp--preset--color--accent-2)",gradientValue:w&&w.gradientVal_second?w.gradientVal_second:void 0,label:(0,n.__)("Choose Circle Background","itmar_block_collections"),onColorChange:e=>{z((t=>({...t,colorVal_second:e})))},onGradientChange:e=>{z((t=>({...t,gradientVal_second:e})))}}]}),(0,o.createElement)(u.RangeControl,{value:w&&w.second_opacity?w.second_opacity:.7,label:(0,n.__)("Opacity","itmar_block_collections"),max:1,min:.1,step:.1,onChange:e=>{z((t=>({...t,second_opacity:e})))},withInputField:!1}),(0,o.createElement)(u.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{z((t=>({...t,secondScale:e})))},label:(0,n.__)("Circle Scale Setting","itmar_block_collections"),value:w&&w.secondScale?w.secondScale:"1.5em"}),(0,o.createElement)(u.PanelBody,{title:(0,n.__)("Position Settings","itmar_block_collections"),initialOpen:!0,className:"title_design_ctrl"},(0,o.createElement)(u.RangeControl,{value:w&&w.second_lat?w.second_lat:20,label:(0,n.__)("Lateral direction","itmar_block_collections"),max:50,min:-30,step:1,onChange:e=>{z((t=>({...t,second_lat:e})))},withInputField:!1}),(0,o.createElement)(u.RangeControl,{value:w&&w.second_long?w.second_long:-10,label:(0,n.__)("Longitudinal direction","itmar_block_collections"),max:50,min:-30,step:1,onChange:e=>{z((t=>({...t,second_long:e})))},withInputField:!1})))),A?.split(" ").includes("is-style-sub_copy")&&(0,o.createElement)(u.PanelBody,{title:(0,n.__)("Sub Copy Settings","itmar_block_collections"),initialOpen:!1,className:"title_design_ctrl"},(0,o.createElement)(d.__experimentalPanelColorGradientSettings,{title:(0,n.__)("Copy Color Setting","itmar_block_collections"),settings:[{colorValue:w&&w.color_text_copy?w.color_text_copy:"var(--wp--preset--color--text)",label:(0,n.__)("Choose Text color","itmar_block_collections"),onColorChange:e=>{z((t=>({...t,color_text_copy:e})))}},{colorValue:w&&w.color_background_copy?w.color_background_copy:"var(--wp--preset--color--accent-2)",gradientValue:w&&w.gradient_background_copy?w.gradient_background_copy:void 0,label:(0,n.__)("Choose Background color","itmar_block_collections"),onColorChange:e=>{z((t=>({...t,color_background_copy:e})))},onGradientChange:e=>{z((t=>({...t,gradient_background_copy:e})))}}]}),(0,o.createElement)(u.PanelRow,{className:"copyInfo_row"},(0,o.createElement)(u.TextControl,{label:(0,n.__)("Copy Text","itmar_block_collections"),labelPosition:"top",value:Q,onChange:e=>{X(e),z((t=>({...t,copy_content:e})))}})),(0,o.createElement)(u.PanelRow,{className:"copyInfo_row"},(0,o.createElement)("label",null,(0,n.__)("Copy Alignment","itmar_block_collections")),(0,o.createElement)(u.__experimentalAlignmentMatrixControl,{value:w&&w.alignment_copy?w.alignment_copy:"top left",onChange:e=>{z((t=>({...t,alignment_copy:e})))}})),(0,o.createElement)(a.Z,{title:(0,n.__)("Typography","itmar_block_collections"),fontStyle:w&&w.font_style_copy?w.font_style_copy:{fontSize:"16px",fontFamily:"Arial, sans-serif",fontWeight:"500",isItalic:!1},initialOpen:!1,onChange:e=>{z((t=>({...t,font_style_copy:e})))}}),(0,o.createElement)(u.PanelBody,{title:(0,n.__)("Border Settings","itmar_block_collections"),initialOpen:!0},(0,o.createElement)(d.__experimentalBorderRadiusControl,{values:w&&w.radius_copy?w.radius_copy:{topLeft:"10px",topRight:"10px",bottomRight:"0px",bottomLeft:"0px",value:"0px"},onChange:e=>{z((t=>({...t,radius_copy:"string"==typeof e?{value:e}:e})))}}),(0,o.createElement)(u.__experimentalBoxControl,{label:(0,n.__)("Padding settings","itmar_block_collections"),values:w&&w.padding_copy?w.padding_copy:{top:"10px",left:"10px",bottom:"10px",right:"10px"},onChange:e=>{z((t=>({...t,padding_copy:e})))},units:C,allowReset:!0,resetValues:h})),(0,o.createElement)(u.PanelBody,{title:(0,n.__)("Icon settings","itmar_block_collections"),initialOpen:!0},(0,o.createElement)(u.ToggleControl,{label:(0,n.__)("Append icon","itmar_block_collections"),checked:!(!w||!w.isIcon)&&w.isIcon,onChange:e=>{z((t=>({...t,isIcon:e})))}}),!(!w||!w.isIcon)&&w.isIcon&&(0,o.createElement)(i.Z,{iconStyle:w&&w.icon_style?w.icon_style:{icon_name:"f030",icon_pos:"left",icon_size:"24px",icon_color:"var(--wp--preset--color--text)",icon_space:"5px"},onChange:e=>{z((t=>({...t,icon_style:e})))}})))),(0,o.createElement)(d.BlockControls,null,(0,o.createElement)(d.AlignmentToolbar,{value:v,onChange:e=>{l({align:e})}}),(0,o.createElement)(u.ToolbarDropdownMenu,{label:(0,n.__)("Change heading level","itmar_block_collections"),icon:f(parseInt(k.slice(1),10)),controls:[1,2,3,4,5,6].map((e=>({icon:f(e),title:`Heading ${e}`,isActive:k===`H${e}`,onClick:()=>l({headingType:`H${e}`})})))})),K&&(0,o.createElement)(u.Modal,{title:(0,n.__)("Confirm Deletion","itmar_block_collections"),onRequestClose:J},(0,o.createElement)("p",null,(0,n.__)("Changing a style resets the style-specific settings. Are you sure?","itmar_block_collections")),(0,o.createElement)(u.Button,{variant:"primary",onClick:Z},(0,n.__)("Yes, Change","itmar_block_collections")),(0,o.createElement)(u.Button,{variant:"secondary",onClick:J},(0,n.__)("Cancel","itmar_block_collections"))),(0,o.createElement)("div",D,(0,o.createElement)(c.J,{attributes:t},ne),"submenu"===B&&(0,o.createElement)("div",oe)))}},9747:function(e,t,l){l.d(t,{MM:function(){return i},Pr:function(){return n},vc:function(){return a}});const o=e=>{function t(e){const t=parseInt(e,10).toString(16);return 1===t.length?"0"+t:t}let l,o=[];return o=/^#[0-9a-fA-F]{6}$/.test(e)?[e.slice(1,3),e.slice(3,5),e.slice(5,7)]:(l=e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/))?[t(l[1]),t(l[2]),t(l[3])]:["ff","ff","ff"],o};function n(e,t,l){var o=!1;if((e||0===e)&&e<=360&&(t||0===t)&&t<=100&&(l||0===l)&&l<=100){var n,a=0,i=0,c=0,r=0,s=0;e=Number(e)/360,t=Number(t)/100,l=Number(l)/100,0===t?(a=l,i=l,c=l):(n=function(e,t,l){return l<0&&(l+=1),l>1&&(l-=1),l<1/6?e+=6*(t-e)*l:l<.5?e=t:l<2/3&&(e+=(t-e)*(2/3-l)*6),e},a=n(s=2*l-(r=l<.5?l*(1+t):l+t-l*t),r,e+1/3),i=n(s,r,e),c=n(s,r,e-1/3)),o=`#${Math.round(255*a).toString(16).padStart(2,"0")}${Math.round(255*i).toString(16).padStart(2,"0")}${Math.round(255*c).toString(16).padStart(2,"0")}`}return o}function a(e){let t=o(e),l=t[0],n=t[1],a=t[2],i=!1;if((l||0===l)&&String(l).match(/^[0-9a-f]{2}$/i)&&(n||0===n)&&String(n).match(/^[0-9a-f]{2}$/i)&&(a||0===a)&&String(a).match(/^[0-9a-f]{2}$/i)){let e=0,t=0,o=0,c=0,r=0,s=0;l=parseInt(l,16)/255,n=parseInt(n,16)/255,a=parseInt(a,16)/255,c=Math.max(l,n,a),r=Math.min(l,n,a),o=(c+r)/2,c!==r&&(s=c-r,t=o>.5?s/(2-c-r):s/(c+r),e=c===l?(n-a)/s:c===n?2+(a-l)/s:4+(l-n)/s,e/=6),i={hue:Math.round(360*e),saturation:Math.round(100*t),lightness:Math.round(100*o)}}return i}function i(e){let t=o(e),l=t[0],n=t[1],a=t[2],i=!1;return(l||0===l)&&String(l).match(/^[0-9a-f]{2}$/i)&&(n||0===n)&&String(n).match(/^[0-9a-f]{2}$/i)&&(a||0===a)&&String(a).match(/^[0-9a-f]{2}$/i)&&(l=parseInt(l,16),n=parseInt(n,16),a=parseInt(a,16),i={red:Math.round(l),green:Math.round(n),blue:Math.round(a)}),i}},641:function(e,t,l){l.d(t,{P:function(){return c}});var o=l(9307),n=l(2027),a=l(1893),i=l(7762);function c(e,t){(0,n.KW)((()=>{const l=document.getElementsByName("editor-canvas")[0];if(l){const n=l.contentDocument||l.contentWindow.document,c=new a.qH;(0,i.Dq)(c.collectStyles((0,o.createElement)(e,{attributes:t})));const r=c.getStyleTags().replace(/<style[^>]*>|<\/style>/g,""),s=n.createElement("style");return s.innerHTML=r,n.head.appendChild(s),()=>{n.head.removeChild(s)}}}),[t])}},2387:function(e,t,l){l.d(t,{g4:function(){return p},gv:function(){return m}});var o=l(7462),n=l(9307),a=l(5609),i=l(6989),c=l.n(i);const r=e=>{let{setAttributes:t,attributes:l,label:o,homeUrl:i,fetchOptions:c}=e;const{selectedPageId:r}=l,[s,_]=(0,n.useState)([]);return(0,n.useEffect)((()=>{(async()=>{try{const e=await c(i);_(e)}catch(e){console.error("Error fetching data:",e.message)}})()}),[c]),(0,n.createElement)(a.ComboboxControl,{label:o,options:s,value:r,onChange:e=>{const l=s.find((t=>t.value===e));t({selectedPageId:e,selectedPageUrl:l?l.link:i})}})},s=async e=>{const t=await c()({path:"/wp/v2/pages"});return t&&!t.some((e=>-1===e.id))&&t.unshift({id:-1,title:{rendered:"ホーム"},link:e}),t?t.map((e=>({value:e.id,label:e.title.rendered,link:e.link}))):[]},_=async e=>{const t=await c()({path:"/wp/v2/types"});let l=0;return Object.keys(t).reduce(((o,n)=>{const a=t[n];return!0===a.has_archive?o.push({value:l++,link:`${e}/${a.slug}`,label:a.name}):"string"==typeof a.has_archive&&o.push({value:l++,link:`${e}/${a.has_archive}`,label:a.name}),o}),[])},m=e=>(0,n.createElement)(r,(0,o.Z)({},e,{fetchOptions:s})),p=e=>(0,n.createElement)(r,(0,o.Z)({},e,{fetchOptions:_}))}}]);
//# sourceMappingURL=313.js.map