"use strict";(self.webpackChunkblock_collections=self.webpackChunkblock_collections||[]).push([[313],{2027:function(e,t,l){l.d(t,{AC:function(){return c},KW:function(){return r},Kj:function(){return i}});var n=l(9307),o=l(8446),a=l.n(o);function c(e,t){const[l,o]=(0,n.useState)("");return(0,n.useEffect)((()=>{if(e.current&&t)if(t.backgroundColor&&!t.backgroundColor.startsWith("var(--wp"))o(t.backgroundColor);else if(e.current){const t=getComputedStyle(e.current);o(t.backgroundColor)}}),[t,e]),l}function i(){const[e,t]=(0,n.useState)(!1);return(0,n.useEffect)((()=>{const e=()=>{const e=document.getElementsByName("editor-canvas")[0];e&&e.contentWindow&&t(e.contentWindow.innerWidth<=767)},l=document.getElementsByName("editor-canvas")[0];return l&&l.contentWindow&&l.contentWindow.addEventListener("resize",e),e(),()=>{l&&l.contentWindow&&l.contentWindow.removeEventListener("resize",e)}}),[]),e}function r(e,t){const l=(0,n.useRef)();a()(t,l.current)||(l.current=t),(0,n.useEffect)((()=>e()),[l.current])}},8566:function(e,t,l){var n=l(9307),o=l(5736),a=l(5609),c=l(2175);const i=(0,n.createElement)("a",{href:"https://fontawesome.com/search",target:"_blank"},"FontAwesome"),r=(0,n.createElement)("span",{},i,(0,o.__)("Select the icon from and enter Unicode (the upper right four digits of the selection dialog). ","block-collections")),s=(0,n.createElement)("span",{},i,(0,o.__)("Please select the first class name shown in the HTML code field of the selection dialog. ","block-collections")),_=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}],p=[{value:"Font Awesome 6 Free",label:"SOLID"},{value:"Font Awesome 6 Brands",label:"BRANDS"}];t.Z=e=>{let{iconStyle:t,onChange:l}=e;const{icon_name:i,icon_pos:m,icon_size:u,icon_color:d,icon_space:g,icon_family:b}=t;return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(a.TextControl,{label:(0,o.__)("icon name","block-collections"),help:r,labelPosition:"top",value:i,isPressEnterToChange:!0,onChange:e=>{const n={...t,icon_name:e};l(n)}}),(0,n.createElement)(a.ComboboxControl,{label:(0,o.__)("Icon Family","block-collections"),help:s,options:p,value:b||"Font Awesome 6 Free",onChange:e=>{const n={...t,icon_family:e};l(n)}}),(0,n.createElement)(a.PanelRow,{className:"sizing_row"},(0,n.createElement)(a.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{const n={...t,icon_size:e};l(n)},label:(0,o.__)("Size","block-collections"),value:u,units:_}),(0,n.createElement)(a.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{const n={...t,icon_space:e};l(n)},label:(0,o.__)("spacing to end","block-collections"),value:g,units:_})),(0,n.createElement)(c.PanelColorSettings,{title:(0,o.__)("Color settings","itmar_location"),initialOpen:!1,colorSettings:[{value:d,onChange:e=>{const n={...t,icon_color:e};l(n)},label:(0,o.__)("Icon color","itmar_location")}]}),(0,n.createElement)("label",{className:"components-base-control__label"},(0,o.__)("Arrangement","block-collections")),(0,n.createElement)(a.PanelRow,{className:"itmar_position_row"},(0,n.createElement)(a.RadioControl,{selected:m,options:[{label:(0,o.__)("left","block-collections"),value:"left"},{label:(0,o.__)("right","block-collections"),value:"right"}],onChange:e=>{const n={...t,icon_pos:e};l(n)}})))}},6812:function(e,t,l){l.d(t,{e:function(){return p}});var n=l(9307),o=l(5736),a=l(2175),c=l(5609),i=l(9818),r=l(9747);const s=(e,t)=>{let l,n,o,a;switch(e){case"top_left":l=t,n=t,o=-1*t,a=-1*t;break;case"top_right":l=-1*t,n=t,o=t,a=-1*t;break;case"bottom_left":case"right_bottom":l=t,n=-1*t,o=-1*t,a=t;break;case"bottom_right":l=-1*t,n=-1*t,o=t,a=t;break;case"top":l=0,n=0,o=-1*t,a=t}return{topLeft:l,topRight:n,bottomLeft:o,bottmRight:a}};function _(e){return e.includes("linear-gradient")||e.includes("radial-gradient")}const p=e=>{const{shadowType:t,spread:l,lateral:n,longitude:a,nomalBlur:c,shadowColor:p,blur:m,intensity:u,distance:d,newDirection:g,clayDirection:b,embos:h,opacity:f,depth:C,bdBlur:y,expand:k,glassblur:x,glassopa:v,hasOutline:E,baseColor:w}=e;if("nomal"===t)return"dent"===h?{style:{boxShadow:`${n}px ${a}px ${c}px ${l}px transparent, inset ${n}px ${a}px ${c}px ${l}px ${p}`}}:{style:{boxShadow:`${n}px ${a}px ${c}px ${l}px ${p}, inset ${n}px ${a}px ${c}px ${l}px transparent`}};if("newmor"===t){if(_(w))return(0,i.dispatch)("core/notices").createNotice("error",(0,o.__)("Neumorphism cannot be set when the background color is a gradient. ","itmar_guest_contact_block"),{type:"snackbar",isDismissible:!0}),null;const e=(0,r.vc)(w),t=e.lightness+u<100?e.lightness+u:100,l=e.lightness-u>0?e.lightness-u:0,n=(0,r.Pr)(e.hue,e.saturation,t),a=(0,r.Pr)(e.hue,e.saturation,l),c=s(g,d),p={style:{border:"none",background:w}};return"swell"===h?{style:{...p.style,boxShadow:`${c.topLeft}px ${c.topRight}px ${m}px ${a}, ${c.bottomLeft}px ${c.bottmRight}px ${m}px ${n}, inset ${c.topLeft}px ${c.topRight}px ${m}px transparent, inset ${c.bottomLeft}px ${c.bottmRight}px ${m}px transparent`}}:{style:{...p.style,boxShadow:`${c.topLeft}px ${c.topRight}px ${m}px transparent, ${c.bottomLeft}px ${c.bottmRight}px ${m}px transparent, inset ${c.topLeft}px ${c.topRight}px ${m}px ${a}, inset ${c.bottomLeft}px ${c.bottmRight}px ${m}px ${n}`}}}if("claymor"===t){if(_(w))return(0,i.dispatch)("core/notices").createNotice("error",(0,o.__)("claymorphism cannot be set when the background color is a gradient. ","itmar_guest_contact_block"),{type:"snackbar",isDismissible:!0}),null;const e=(0,r.MM)(w),t=s(b,k),l=s(b,C),n={style:{background:`rgba(255, 255, 255, ${f})`,backdropFilter:`blur(${y}px)`,border:"none"}};return{...n,style:{...n.style,boxShadow:`${t.topLeft}px ${t.bottmRight}px ${2*k}px 0px rgba(${e.red}, ${e.green}, ${e.blue}, 0.5), inset ${l.topRight}px ${l.bottomLeft}px 16px 0px rgba(${e.red}, ${e.green}, ${e.blue}, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)`}}}if("glassmor"===t){const e={style:{backgroundColor:`rgba(255, 255, 255, ${v})`,...E?{border:"1px solid rgba(255, 255, 255, 0.4)"}:{},borderRightColor:"rgba(255, 255, 255, 0.2)",borderBottomColor:"rgba(255, 255, 255, 0.2)",backdropFilter:`blur( ${x}px )`}};return"swell"===h?{...e,style:{...e.style,boxShadow:"0 8px 12px 0 rgba( 31, 38, 135, 0.37 ), inset 0 8px 12px 0 transparent"}}:{...e,style:{...e.style,boxShadow:"0 8px 12px 0 transparent, inset 0 8px 12px 0 rgba( 31, 38, 135, 0.37 )"}}}};t.Z=e=>{let{shadowStyle:t,onChange:l}=e;const[i,r]=(0,n.useState)(t),{shadowType:s,spread:_,lateral:m,longitude:u,nomalBlur:d,shadowColor:g,blur:b,intensity:h,distance:f,newDirection:C,clayDirection:y,embos:k,opacity:x,depth:v,bdBlur:E,expand:w,glassblur:S,glassopa:$,hasOutline:R}=i;return(0,n.useEffect)((()=>{const e=p(i);e&&l(e,i)}),[i]),(0,n.createElement)(n.Fragment,null,(0,n.createElement)(c.PanelBody,{title:(0,o.__)("Shadow Type","block-collections"),initialOpen:!0},(0,n.createElement)("div",{className:"itmar_shadow_type"},(0,n.createElement)(c.RadioControl,{selected:s,options:[{label:(0,o.__)("Nomal","block-collections"),value:"nomal"},{label:(0,o.__)("Neumorphism","block-collections"),value:"newmor"},{label:(0,o.__)("Claymorphism","block-collections"),value:"claymor"},{label:(0,o.__)("Grassmophism","block-collections"),value:"glassmor"}],onChange:e=>r({...i,shadowType:e})})),"claymor"!==s&&(0,n.createElement)("div",{className:"embos"},(0,n.createElement)(c.RadioControl,{label:(0,o.__)("unevenness","block-collections"),selected:k,options:[{value:"swell"},{value:"dent"}],onChange:e=>r({...i,embos:e})}))),"nomal"===s&&(0,n.createElement)(c.PanelBody,{title:(0,o.__)("Nomal settings","block-collections"),initialOpen:!1},(0,n.createElement)(c.RangeControl,{value:_,label:(0,o.__)("Spread","block-collections"),max:50,min:0,onChange:e=>r({...i,spread:e}),withInputField:!1}),(0,n.createElement)(c.RangeControl,{value:m,label:(0,o.__)("Lateral direction","block-collections"),max:50,min:0,onChange:e=>r({...i,lateral:e}),withInputField:!1}),(0,n.createElement)(c.RangeControl,{value:u,label:(0,o.__)("Longitudinal direction","block-collections"),max:50,min:0,onChange:e=>r({...i,longitude:e}),withInputField:!1}),(0,n.createElement)(c.RangeControl,{value:d,label:(0,o.__)("Blur","block-collections"),max:20,min:0,onChange:e=>r({...i,nomalBlur:e}),withInputField:!1}),(0,n.createElement)(a.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Shadow Color Setting","block-collections"),settings:[{colorValue:g,label:(0,o.__)("Choose Shadow color","block-collections"),onColorChange:e=>r({...i,shadowColor:e})}]})),"newmor"===s&&(0,n.createElement)(c.PanelBody,{title:(0,o.__)("Neumorphism settings","block-collections"),initialOpen:!1},(0,n.createElement)(c.RangeControl,{value:f,label:(0,o.__)("Distance","block-collections"),max:50,min:0,onChange:e=>r({...i,distance:e}),withInputField:!1}),(0,n.createElement)(c.RangeControl,{value:h,label:(0,o.__)("Intensity","block-collections"),max:100,min:0,onChange:e=>r({...i,intensity:e}),withInputField:!1}),(0,n.createElement)(c.RangeControl,{value:b,label:(0,o.__)("Blur","block-collections"),max:20,min:0,onChange:e=>r({...i,blur:e}),withInputField:!1}),(0,n.createElement)(c.PanelRow,null,(0,n.createElement)("div",{className:"light_direction"},(0,n.createElement)(c.RadioControl,{selected:C,options:[{value:"top_left"},{value:"top_right"},{value:"bottom_left"},{value:"bottom_right"}],onChange:e=>r({...i,newDirection:e})})))),"claymor"===s&&(0,n.createElement)(c.PanelBody,{title:(0,o.__)("Claymorphism settings","block-collections"),initialOpen:!1},(0,n.createElement)(c.RangeControl,{value:x,label:(0,o.__)("Opacity","block-collections"),max:1,min:0,step:.1,onChange:e=>r({...i,opacity:e}),withInputField:!1}),(0,n.createElement)(c.RangeControl,{value:v,label:"Depth",max:20,min:0,onChange:e=>r({...i,depth:e}),withInputField:!1}),(0,n.createElement)(c.RangeControl,{value:w,label:"Expand",max:50,min:0,onChange:e=>r({...i,expand:e}),withInputField:!1}),(0,n.createElement)(c.RangeControl,{value:E,label:"Background Blur",max:10,min:0,onChange:e=>r({...i,bdBlur:e}),withInputField:!1}),(0,n.createElement)("div",{className:"light_direction claymor"},(0,n.createElement)(c.RadioControl,{selected:y,options:[{value:"right_bottom"},{value:"top_right"},{value:"top"}],onChange:e=>r({...i,clayDirection:e})}))),"glassmor"===s&&(0,n.createElement)(c.PanelBody,{title:(0,o.__)("Grassmophism settings","block-collections"),initialOpen:!1},(0,n.createElement)(c.RangeControl,{value:S,label:(0,o.__)("Glass blur","block-collections"),max:20,min:0,onChange:e=>r({...i,glassblur:e}),withInputField:!1}),(0,n.createElement)(c.RangeControl,{value:$,label:(0,o.__)("Glass Opacity","block-collections"),max:1,min:0,step:.1,onChange:e=>r({...i,glassopa:e}),withInputField:!1}),(0,n.createElement)("fieldset",null,(0,n.createElement)(c.ToggleControl,{label:(0,o.__)("Show outline","block-collections"),checked:R,onChange:()=>r({...i,hasOutline:!R})}))))}},3812:function(e,t,l){var n=l(9307),o=l(5609),a=l(3157),c=l(5736);t.Z=e=>{let{title:t,fontStyle:l,initialOpen:i,isMobile:r,onChange:s}=e;const{default_fontSize:_,mobile_fontSize:p,fontSize:m,fontFamily:u,fontWeight:d,isItalic:g}=l,b=[{value:"Arial, sans-serif",label:"Arial",fontFamily:"Arial, sans-serif"},{value:"Courier New, monospace",label:"Courier New",fontFamily:"Courier New, monospace"},{value:"Georgia, serif",label:"Georgia",fontFamily:"Georgia, serif"},{label:"Noto Sans JP",value:"Noto Sans JP, sans-serif",fontFamily:"Noto Sans JP, sans-serif"},{label:"Texturina",value:"Texturina, serif",fontFamily:"Texturina, serif"}],h={option:(e,t)=>({...e,fontFamily:t.data.fontFamily})};return(0,n.createElement)(o.PanelBody,{title:t,initialOpen:i},(0,n.createElement)(o.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{e=""!=e?e:"0px";const t=r?{mobile_fontSize:e}:{default_fontSize:e},n={...l,...t};s(n)},label:r?(0,c.__)("Size(mobile)","block-collections"):(0,c.__)("Size(desk top)","block-collections"),value:r?p:_,units:[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}]}),(0,n.createElement)((e=>{let{label:t,value:l,onChange:o}=e;return(0,n.createElement)(n.Fragment,null,t&&(0,n.createElement)("label",{className:"components-base-control__label"},t),(0,n.createElement)(a.ZP,{options:b,value:b.find((e=>e.value===l)),onChange:e=>{o(e.value)},styles:h}))}),{label:(0,c.__)("font family","block-collections"),value:u,onChange:e=>{const t={...l,fontFamily:e};s(t)}}),(0,n.createElement)("label",{className:"components-base-control__label"},(0,c.__)("font weight","block-collections")),(0,n.createElement)(o.PanelRow,{className:"itmar_weight_row"},(0,n.createElement)(o.RadioControl,{selected:d,options:[{label:"LIGHT",value:"300"},{label:"REGULAR",value:"400"},{label:"MEDIUM",value:"500"},{label:"S-BOLD",value:"600"},{label:"BOLD",value:"700"},{label:"BLACK",value:"900"}],onChange:e=>{const t={...l,fontWeight:e};s(t)}})),(0,n.createElement)("label",{className:"components-base-control__label"},(0,c.__)("Italic display","block-collections")),(0,n.createElement)(o.ToggleControl,{checked:g,onChange:e=>{const t={...l,isItalic:e};s(t)}}))}},8313:function(e,t,l){l.r(t),l.d(t,{default:function(){return k}});var n=l(9307),o=l(5736),a=l(3812),c=l(8566),i=l(9539),r=l(6812),s=l(2387),_=l(6989),p=l.n(_),m=l(641),u=l(5609),d=l(2175),g=l(9818),b=l(2027);const h={top:"10px",left:"10px",right:"10px",bottom:"10px"},f=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}],C=e=>(0,n.createElement)("svg",{width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg"},(0,n.createElement)("text",{x:"0",y:"15",fontSize:"15","font-weight":"bold"},`H${e}`)),y=(e,t,l)=>{const n=document.createElement("canvas").getContext("2d");return n.font=`${t} ${l} `,n.measureText(e).width};function k(e){let{attributes:t,setAttributes:l,clientId:_}=e;const{headingContent:k,headingType:x,defaultHeadingSize:v,mobileHeadingSize:E,titleType:w,align:S,isVertical:$,padding_heading:R,optionStyle:P,shadow_element:L,is_shadow:I,is_underLine:B,underLine_prop:F,bgColor_underLine:N,bgGradient_underLine:T,linkKind:A,menu_pos:M,is_title_menu:O,selectedPageUrl:D,className:V}=t,z="center"===S?{marginLeft:"auto",marginRight:"auto"}:"right"===S?{marginLeft:"auto"}:{},U=(0,b.Kj)(),G=(0,n.useRef)(null),W=(0,d.useBlockProps)({ref:G,style:{position:O?"relative":"static",...z}}),H=(0,b.AC)(G,W.style);(0,n.useEffect)((()=>{if(H){l({shadow_element:{...L,baseColor:H}});const e=(0,r.e)({...L,baseColor:H});e&&l({shadow_result:e.style})}}),[H]);const Z=(0,n.useRef)(!1),[K,J]=(0,n.useState)(P);(0,n.useEffect)((()=>{let e;P?.copy_content&&(e=y(P.copy_content,P.font_style_copy?.fontSize,P.font_style_copy?.fontFamily));const t=P?.copy_content?{...K,copy_width:e}:K;l({optionStyle:t})}),[K]);const[j,q]=(0,n.useState)("");(0,n.useEffect)((()=>{"plaine"!==w&&(async()=>{try{const e=await p()({path:"/"});q("site"===w?e.name:e.description)}catch(e){console.error("Error fetching data:",e.message)}})()}),[w]);const Y=()=>{let e;V?.split(" ").includes("is-style-circle_marker")?e={styleName:"is-style-circle_marker",colorVal_circle:"var(--wp--preset--color--accent-1)",colorVal_second:"var(--wp--preset--color--accent-2)",circleScale:"3em",secondScale:"1.5em",second_opacity:.7,first_long:10,first_lat:-5,second_long:-10,second_lat:10,isSecond:!0}:V?.split(" ").includes("is-style-sub_copy")?(e={styleName:"is-style-sub_copy",alignment_copy:"top left",color_text_copy:"var(--wp--preset--color--content)",color_background_copy:"var(--wp--preset--color--accent-1)",copy_content:"SAMPLE",copy_width:0,font_style_copy:{fontSize:"16px",fontFamily:"Arial, sans-serif",fontWeight:"500",isItalic:!1},radius_copy:{topLeft:"10px",topRight:"10px",bottomRight:"0px",bottomLeft:"0px",value:"0px"},padding_copy:{top:"10px",left:"10px",bottom:"10px",right:"10px"},isIcon:!1,icon_style:{icon_name:"f030",icon_pos:"left",icon_size:"24px",icon_color:"#000",icon_space:"5px",icon_family:"Font Awesome 6 Free"}},oe("SAMPLE")):e={},J(e),Z.current=V,ee(!1)},Q=()=>{le(!0),l({className:Z.current}),ee(!1)},[X,ee]=(0,n.useState)(!1),[te,le]=(0,n.useState)(!1);(0,n.useEffect)((()=>{if(0!=Z.current){if(te)return void le(!1);if(void 0===Z.current||Z.current?.split(" ").includes("is-style-default"))return void Y();ee(!0)}else Z.current=V}),[V]),(0,m.P)(i.J,t);const[ne,oe]=(0,n.useState)(P&&void 0!==P.copy_content?P.copy_content:"SAMPLE"),ae=(0,g.useSelect)((e=>e("core/block-editor").hasSelectedInnerBlock(_,!0)),[_]),[ce,ie]=(0,n.useState)(!1);(0,g.useSelect)((e=>{const t=e("core/block-editor").getBlockParents(_);for(let l=0;l<t.length;l++){const n=e("core/block-editor").getBlock(t[l]);if(n.attributes?.is_menu){ie(!0);break}if(n.attributes?.is_submenu){ie(!0);break}}}),[_]),(0,n.useEffect)((()=>{l({isMenuItem:ce})}),[ce]);const re=(0,d.useInnerBlocksProps)({className:`submenu-block ${ae?"visible":""} ${M.replace(/ /g,"_")} ${O?"mobile_virtical":"mobile_horizen"}`},{allowedBlocks:["itmar/design-group"],template:[["itmar/design-group",{is_submenu:!0},[["itmar/design-title",{headingType:"H3"}]]]],templateLock:!1}),se="plaine"===w?(0,n.createElement)(d.RichText,{tagName:x,onChange:e=>{l({headingContent:e})},value:k,placeholder:(0,o.__)("Write Title text...","block-collections")}):React.createElement(x.toLowerCase(),{},j);return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(d.InspectorControls,{group:"settings"},(0,n.createElement)(u.PanelBody,{title:(0,o.__)("Title Source Setting","block-collections")},(0,n.createElement)("div",{className:"itmar_title_type"},(0,n.createElement)(u.RadioControl,{label:(0,o.__)("Title type","block-collections"),selected:w,options:[{label:(0,o.__)("Plaine","block-collections"),value:"plaine"},{label:(0,o.__)("Site Title","block-collections"),value:"site"},{label:(0,o.__)("Chatch Phrase","block-collections"),value:"catch"}],onChange:e=>l({titleType:e}),help:(0,o.__)("You can display the site title and catchphrase in addition to the blank title.","block-collections")})),(0,n.createElement)("div",{className:"itmar_link_type"},(0,n.createElement)(u.RadioControl,{label:(0,o.__)("Link type","block-collections"),selected:A,options:[{label:(0,o.__)("None","block-collections"),value:"none"},{label:(0,o.__)("Fixed Page","block-collections"),value:"fixed"},{label:(0,o.__)("Archive Page","block-collections"),value:"archive"},{label:(0,o.__)("Free URL","block-collections"),value:"free"},{label:(0,o.__)("Sub Menu","block-collections"),value:"submenu"}],onChange:e=>l({linkKind:e}),help:(0,o.__)("You can select the type of URL to link to the title.","block-collections")})),"fixed"===A&&(0,n.createElement)(s.gv,{attributes:t,setAttributes:l,label:(0,o.__)("Select a fixed page to link to","block-collections"),homeUrl:itmar_block_option.home_url}),"archive"===A&&(0,n.createElement)(s.g4,{attributes:t,setAttributes:l,label:(0,o.__)("Select archive page to link to","block-collections"),homeUrl:itmar_block_option.home_url}),"free"===A&&(0,n.createElement)(u.TextControl,{label:(0,o.__)("Link to URL","block-collections"),labelPosition:"top",value:D,onChange:e=>{l({selectedPageUrl:e})}}),"submenu"===A&&(0,n.createElement)(u.PanelBody,{title:(0,o.__)("Submenu position settings","block-collections")},(0,n.createElement)(u.PanelRow,{className:"imgPos_row"},(0,n.createElement)("label",null,(0,o.__)("Menu Alignment","block-collections")),(0,n.createElement)(u.__experimentalAlignmentMatrixControl,{value:M,onChange:e=>{l({menu_pos:e})}})),(0,n.createElement)(u.ToggleControl,{label:(0,o.__)("Based on title","block-collections"),checked:O,help:(0,o.__)("If unchecked, the parent menu will be used as the reference. If there is no parent menu, do not uncheck it.","block-collections"),onChange:e=>{l({is_title_menu:e})}})))),(0,n.createElement)(d.InspectorControls,{group:"styles"},(0,n.createElement)(u.PanelBody,{title:(0,o.__)("Title settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,n.createElement)(u.__experimentalUnitControl,{dragDirection:"e",onChange:e=>l(U?{mobileHeadingSize:e}:{defaultHeadingSize:e}),label:U?(0,o.__)("Font Size(mobile)","block-collections"):(0,o.__)("Font Size(desk top)","block-collections"),value:U?E:v}),(0,n.createElement)(u.__experimentalBoxControl,{label:(0,o.__)("Padding","block-collections"),values:R,onChange:e=>l({padding_heading:e}),units:f,allowReset:!0,resetValues:h}),(0,n.createElement)(u.ToggleControl,{label:(0,o.__)("Is Shadow","block-collections"),checked:I,onChange:e=>{l({is_shadow:e})}}),I&&(0,n.createElement)(r.Z,{shadowStyle:{...L},onChange:(e,t)=>{l({shadow_result:e.style}),l({shadow_element:t})}}),(0,n.createElement)(u.ToggleControl,{label:(0,o.__)("Add an underline","block-collections"),checked:B,onChange:e=>{l({is_underLine:e})}}),B&&(0,n.createElement)(u.PanelBody,{title:(0,o.__)("UnderLine settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,n.createElement)(u.PanelRow,{className:"distance_row"},(0,n.createElement)(u.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{const t={...F,height:e};l({underLine_prop:t})},label:(0,o.__)("Height","block-collections"),value:F.height}),(0,n.createElement)(u.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{const t={...F,width:e};l({underLine_prop:t})},label:(0,o.__)("Width","block-collections"),value:F.width}),(0,n.createElement)(u.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{const t={...F,distance:e};l({underLine_prop:t})},label:(0,o.__)("Distance","block-collections"),value:F.distance})),(0,n.createElement)(d.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Under Line Color Setting","block-collections"),settings:[{colorValue:N,gradientValue:T,label:(0,o.__)("Choose Under Line color","block-collections"),onColorChange:e=>{l({bgColor_underLine:void 0===e?"":e})},onGradientChange:e=>{l({bgGradient_underLine:e})}}]}),(0,n.createElement)(u.ToggleControl,{label:(0,o.__)("Animation on hover","block-collections"),checked:F.is_anime,onChange:e=>{const t={...F,is_anime:e};l({underLine_prop:t})}})),(0,n.createElement)(u.ToggleControl,{label:(0,o.__)("Write vertically","block-collections"),checked:$,onChange:e=>{l({isVertical:e})}})),V?.split(" ").includes("is-style-circle_marker")&&(0,n.createElement)(u.PanelBody,{title:(0,o.__)("Circle Marker Settings","block-collections"),initialOpen:!1,className:"title_design_ctrl"},(0,n.createElement)(d.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Circle Color Setting","block-collections"),settings:[{colorValue:P&&P.colorVal_circle?P.colorVal_circle:"var(--wp--preset--color--accent-1)",gradientValue:P&&P.gradientVal_circle?P.gradientVal_circle:void 0,label:(0,o.__)("Choose Circle Background","block-collections"),onColorChange:e=>{J((t=>({...t,colorVal_circle:e})))},onGradientChange:e=>{J((t=>({...t,gradientVal_circle:e})))}}]}),(0,n.createElement)(u.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{J((t=>({...t,circleScale:e})))},label:(0,o.__)("Circle Scale Setting","block-collections"),value:P&&P.circleScale?P.circleScale:"3em"}),(0,n.createElement)(u.PanelBody,{title:(0,o.__)("Position Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,n.createElement)(u.RangeControl,{value:P&&P.first_lat?P.first_lat:10,label:(0,o.__)("Lateral direction","block-collections"),max:50,min:-30,step:1,onChange:e=>{J((t=>({...t,first_lat:e})))},withInputField:!1}),(0,n.createElement)(u.RangeControl,{value:P&&P.first_long?P.first_long:10,label:(0,o.__)("Longitudinal direction","block-collections"),max:50,min:-30,step:1,onChange:e=>{J((t=>({...t,first_long:e})))},withInputField:!1})),(0,n.createElement)(u.PanelBody,{title:(0,o.__)("Second Circle Settings","block-collections"),initialOpen:!0},(0,n.createElement)(u.ToggleControl,{label:(0,o.__)("Second Circle","block-collections"),checked:!P||!P.isSecond||P.isSecond,onChange:e=>{J((t=>({...t,isSecond:e})))}})),!(!P||!P.isSecond)&&P.isSecond&&(0,n.createElement)(n.Fragment,null,(0,n.createElement)(d.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Circle Color Setting","block-collections"),settings:[{colorValue:P&&P.colorVal_second?P.colorVal_second:"var(--wp--preset--color--accent-2)",gradientValue:P&&P.gradientVal_second?P.gradientVal_second:void 0,label:(0,o.__)("Choose Circle Background","block-collections"),onColorChange:e=>{J((t=>({...t,colorVal_second:e})))},onGradientChange:e=>{J((t=>({...t,gradientVal_second:e})))}}]}),(0,n.createElement)(u.RangeControl,{value:P&&P.second_opacity?P.second_opacity:.7,label:(0,o.__)("Opacity","block-collections"),max:1,min:.1,step:.1,onChange:e=>{J((t=>({...t,second_opacity:e})))},withInputField:!1}),(0,n.createElement)(u.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{J((t=>({...t,secondScale:e})))},label:(0,o.__)("Circle Scale Setting","block-collections"),value:P&&P.secondScale?P.secondScale:"1.5em"}),(0,n.createElement)(u.PanelBody,{title:(0,o.__)("Position Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl"},(0,n.createElement)(u.RangeControl,{value:P&&P.second_lat?P.second_lat:20,label:(0,o.__)("Lateral direction","block-collections"),max:50,min:-30,step:1,onChange:e=>{J((t=>({...t,second_lat:e})))},withInputField:!1}),(0,n.createElement)(u.RangeControl,{value:P&&P.second_long?P.second_long:-10,label:(0,o.__)("Longitudinal direction","block-collections"),max:50,min:-30,step:1,onChange:e=>{J((t=>({...t,second_long:e})))},withInputField:!1})))),V?.split(" ").includes("is-style-sub_copy")&&(0,n.createElement)(u.PanelBody,{title:(0,o.__)("Sub Copy Settings","block-collections"),initialOpen:!1,className:"title_design_ctrl"},(0,n.createElement)(d.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Copy Color Setting","block-collections"),settings:[{colorValue:P&&P.color_text_copy?P.color_text_copy:"var(--wp--preset--color--content)",label:(0,o.__)("Choose Text color","block-collections"),onColorChange:e=>{J((t=>({...t,color_text_copy:e})))}},{colorValue:P&&P.color_background_copy?P.color_background_copy:"var(--wp--preset--color--accent-2)",gradientValue:P&&P.gradient_background_copy?P.gradient_background_copy:void 0,label:(0,o.__)("Choose Background color","block-collections"),onColorChange:e=>{J((t=>({...t,color_background_copy:e})))},onGradientChange:e=>{J((t=>({...t,gradient_background_copy:e})))}}]}),(0,n.createElement)(u.PanelRow,{className:"copyInfo_row"},(0,n.createElement)(u.TextControl,{label:(0,o.__)("Copy Text","block-collections"),labelPosition:"top",value:ne,onChange:e=>{oe(e),J((t=>({...t,copy_content:e})))}})),(0,n.createElement)(u.PanelRow,{className:"copyInfo_row"},(0,n.createElement)("label",null,(0,o.__)("Copy Alignment","block-collections")),(0,n.createElement)(u.__experimentalAlignmentMatrixControl,{value:P&&P.alignment_copy?P.alignment_copy:"top left",onChange:e=>{J((t=>({...t,alignment_copy:e})))}})),(0,n.createElement)(a.Z,{title:(0,o.__)("Typography","block-collections"),fontStyle:P&&P.font_style_copy?P.font_style_copy:{default_fontSize:"16px",mobile_fontSize:"12px",fontFamily:"Arial, sans-serif",fontWeight:"500",isItalic:!1},initialOpen:!1,isMobile:U,onChange:e=>{J((t=>({...t,font_style_copy:e})))}}),(0,n.createElement)(u.PanelBody,{title:(0,o.__)("Border Settings","block-collections"),initialOpen:!0},(0,n.createElement)(d.__experimentalBorderRadiusControl,{values:P&&P.radius_copy?P.radius_copy:{topLeft:"10px",topRight:"10px",bottomRight:"0px",bottomLeft:"0px",value:"0px"},onChange:e=>{J((t=>({...t,radius_copy:"string"==typeof e?{value:e}:e})))}}),(0,n.createElement)(u.__experimentalBoxControl,{label:(0,o.__)("Padding settings","block-collections"),values:P&&P.padding_copy?P.padding_copy:{top:"10px",left:"10px",bottom:"10px",right:"10px"},onChange:e=>{J((t=>({...t,padding_copy:e})))},units:f,allowReset:!0,resetValues:h})),(0,n.createElement)(u.PanelBody,{title:(0,o.__)("Icon settings","block-collections"),initialOpen:!0},(0,n.createElement)(u.ToggleControl,{label:(0,o.__)("Append icon","block-collections"),checked:!(!P||!P.isIcon)&&P.isIcon,onChange:e=>{J((t=>({...t,isIcon:e})))}}),!(!P||!P.isIcon)&&P.isIcon&&(0,n.createElement)(c.Z,{iconStyle:P&&P.icon_style?P.icon_style:{icon_name:"f030",icon_pos:"left",icon_size:"24px",icon_color:"var(--wp--preset--color--content)",icon_space:"5px"},onChange:e=>{J((t=>({...t,icon_style:e})))}})))),(0,n.createElement)(d.BlockControls,null,(0,n.createElement)(d.AlignmentToolbar,{value:S,onChange:e=>{l({align:e})}}),(0,n.createElement)(u.ToolbarDropdownMenu,{label:(0,o.__)("Change heading level","block-collections"),icon:C(parseInt(x.slice(1),10)),controls:[1,2,3,4,5,6].map((e=>({icon:C(e),title:`Heading ${e}`,isActive:x===`H${e}`,onClick:()=>l({headingType:`H${e}`})})))})),X&&(0,n.createElement)(u.Modal,{title:(0,o.__)("Confirm Deletion","block-collections"),onRequestClose:Q},(0,n.createElement)("p",null,(0,o.__)("Changing a style resets the style-specific settings. Are you sure?","block-collections")),(0,n.createElement)(u.Button,{variant:"primary",onClick:Y},(0,o.__)("Yes, Change","block-collections")),(0,n.createElement)(u.Button,{variant:"secondary",onClick:Q},(0,o.__)("Cancel","block-collections"))),(0,n.createElement)("div",W,(0,n.createElement)(i.J,{attributes:t},se),"submenu"===A&&(0,n.createElement)("div",re)))}},9747:function(e,t,l){l.d(t,{MM:function(){return c},Pr:function(){return o},vc:function(){return a}});const n=e=>{function t(e){const t=parseInt(e,10).toString(16);return 1===t.length?"0"+t:t}let l,n=[];return n=/^#[0-9a-fA-F]{6}$/.test(e)?[e.slice(1,3),e.slice(3,5),e.slice(5,7)]:(l=e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/))?[t(l[1]),t(l[2]),t(l[3])]:["ff","ff","ff"],n};function o(e,t,l){var n=!1;if((e||0===e)&&e<=360&&(t||0===t)&&t<=100&&(l||0===l)&&l<=100){var o,a=0,c=0,i=0,r=0,s=0;e=Number(e)/360,t=Number(t)/100,l=Number(l)/100,0===t?(a=l,c=l,i=l):(o=function(e,t,l){return l<0&&(l+=1),l>1&&(l-=1),l<1/6?e+=6*(t-e)*l:l<.5?e=t:l<2/3&&(e+=(t-e)*(2/3-l)*6),e},a=o(s=2*l-(r=l<.5?l*(1+t):l+t-l*t),r,e+1/3),c=o(s,r,e),i=o(s,r,e-1/3)),n=`#${Math.round(255*a).toString(16).padStart(2,"0")}${Math.round(255*c).toString(16).padStart(2,"0")}${Math.round(255*i).toString(16).padStart(2,"0")}`}return n}function a(e){let t=n(e),l=t[0],o=t[1],a=t[2],c=!1;if((l||0===l)&&String(l).match(/^[0-9a-f]{2}$/i)&&(o||0===o)&&String(o).match(/^[0-9a-f]{2}$/i)&&(a||0===a)&&String(a).match(/^[0-9a-f]{2}$/i)){let e=0,t=0,n=0,i=0,r=0,s=0;l=parseInt(l,16)/255,o=parseInt(o,16)/255,a=parseInt(a,16)/255,i=Math.max(l,o,a),r=Math.min(l,o,a),n=(i+r)/2,i!==r&&(s=i-r,t=n>.5?s/(2-i-r):s/(i+r),e=i===l?(o-a)/s:i===o?2+(a-l)/s:4+(l-o)/s,e/=6),c={hue:Math.round(360*e),saturation:Math.round(100*t),lightness:Math.round(100*n)}}return c}function c(e){let t=n(e),l=t[0],o=t[1],a=t[2],c=!1;return(l||0===l)&&String(l).match(/^[0-9a-f]{2}$/i)&&(o||0===o)&&String(o).match(/^[0-9a-f]{2}$/i)&&(a||0===a)&&String(a).match(/^[0-9a-f]{2}$/i)&&(l=parseInt(l,16),o=parseInt(o,16),a=parseInt(a,16),c={red:Math.round(l),green:Math.round(o),blue:Math.round(a)}),c}},641:function(e,t,l){l.d(t,{P:function(){return i}});var n=l(9307),o=l(2027),a=l(1893),c=l(7762);function i(e,t){(0,o.KW)((()=>{const l=document.getElementsByName("editor-canvas")[0];if(l){const o=l.contentDocument||l.contentWindow.document,i=new a.qH;(0,c.Dq)(i.collectStyles((0,n.createElement)(e,{attributes:t})));const r=i.getStyleTags().replace(/<style[^>]*>|<\/style>/g,""),s=o.createElement("style");return s.innerHTML=r,o.head.appendChild(s),()=>{o.head.removeChild(s)}}}),[t])}},2387:function(e,t,l){l.d(t,{g4:function(){return m},gv:function(){return p}});var n=l(7462),o=l(9307),a=l(5609),c=l(6989),i=l.n(c);const r=e=>{let{setAttributes:t,attributes:l,label:n,homeUrl:c,fetchOptions:i}=e;const{selectedPageId:r}=l,[s,_]=(0,o.useState)([]);return(0,o.useEffect)((()=>{(async()=>{try{const e=await i(c);_(e)}catch(e){console.error("Error fetching data:",e.message)}})()}),[i]),(0,o.createElement)(a.ComboboxControl,{label:n,options:s,value:r,onChange:e=>{const l=s.find((t=>t.value===e));t({selectedPageId:e,selectedPageUrl:l?l.link:c})}})},s=async e=>{const t=await i()({path:"/wp/v2/pages"});return t&&!t.some((e=>-1===e.id))&&t.unshift({id:-1,title:{rendered:"ホーム"},link:e}),t?t.map((e=>({value:e.id,label:e.title.rendered,link:e.link}))):[]},_=async e=>{const t=await i()({path:"/wp/v2/types"});let l=0;return Object.keys(t).reduce(((n,o)=>{const a=t[o];return!0===a.has_archive?n.push({value:l++,link:`${e}/${a.slug}`,label:a.name}):"string"==typeof a.has_archive&&n.push({value:l++,link:`${e}/${a.has_archive}`,label:a.name}),n}),[])},p=e=>(0,o.createElement)(r,(0,n.Z)({},e,{fetchOptions:s})),m=e=>(0,o.createElement)(r,(0,n.Z)({},e,{fetchOptions:_}))}}]);
//# sourceMappingURL=313.js.map