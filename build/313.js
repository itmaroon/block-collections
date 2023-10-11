"use strict";(self.webpackChunkblock_collections=self.webpackChunkblock_collections||[]).push([[313],{2027:function(e,t,l){l.d(t,{KW:function(){return i}});var n=l(9307),o=l(8446),a=l.n(o);function i(e,t){const l=(0,n.useRef)(t);a()(t,l.current)||(l.current=t),(0,n.useEffect)((()=>e()),[l.current])}},8566:function(e,t,l){var n=l(9307),o=l(5736),a=l(5609),i=l(2175);const c=(0,n.createElement)("a",{href:"https://fontawesome.com/search",target:"_blank"},"FontAwesome"),r=(0,n.createElement)("span",{},c,(0,o.__)("Select the icon from and enter Unicode (the upper right four digits of the selection dialog). ","itmar_block_collections")),s=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];t.Z=e=>{let{iconStyle:t,onChange:l}=e;const{icon_name:c,icon_pos:_,icon_size:m,icon_color:p,icon_space:g}=t;return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(a.TextControl,{label:(0,o.__)("icon name","itmar_block_collections"),help:r,labelPosition:"top",value:c,isPressEnterToChange:!0,onChange:e=>{const n={...t,icon_name:e};l(n)}}),(0,n.createElement)(a.PanelRow,{className:"sizing_row"},(0,n.createElement)(a.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{const n={...t,icon_size:e};l(n)},label:(0,o.__)("Size","itmar_block_collections"),value:m,units:s}),(0,n.createElement)(a.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{const n={...t,icon_space:e};l(n)},label:(0,o.__)("spacing to end","itmar_block_collections"),value:g,units:s})),(0,n.createElement)(i.PanelColorSettings,{title:(0,o.__)("Color settings","itmar_location"),initialOpen:!1,colorSettings:[{value:p,onChange:e=>{const n={...t,icon_color:e};l(n)},label:(0,o.__)("Icon color","itmar_location")}]}),(0,n.createElement)("label",{className:"components-base-control__label"},(0,o.__)("Arrangement","itmar_block_collections")),(0,n.createElement)(a.PanelRow,{className:"itmar_position_row"},(0,n.createElement)(a.RadioControl,{selected:_,options:[{label:(0,o.__)("left","itmar_block_collections"),value:"left"},{label:(0,o.__)("right","itmar_block_collections"),value:"right"}],onChange:e=>{const n={...t,icon_pos:e};l(n)}})))}},6812:function(e,t,l){var n=l(9307),o=l(5736),a=l(2175),i=l(5609),c=l(9818),r=l(9747);const s=(e,t)=>{let l,n,o,a;switch(e){case"top_left":l=t,n=t,o=-1*t,a=-1*t;break;case"top_right":l=-1*t,n=t,o=t,a=-1*t;break;case"bottom_left":case"right_bottom":l=t,n=-1*t,o=-1*t,a=t;break;case"bottom_right":l=-1*t,n=-1*t,o=t,a=t;break;case"top":l=0,n=0,o=-1*t,a=t}return{topLeft:l,topRight:n,bottomLeft:o,bottmRight:a}};function _(e){return e.includes("linear-gradient")||e.includes("radial-gradient")}t.Z=e=>{let{shadowStyle:t,onChange:l,children:m}=e;const[p,g]=(0,n.useState)(t),{shadowType:d,spread:u,lateral:b,longitude:h,nomalBlur:C,shadowColor:x,blur:f,intensity:y,distance:k,newDirection:E,clayDirection:v,embos:S,opacity:w,depth:$,bdBlur:R,expand:P,glassblur:B,glassopa:I,hasOutline:L,backgroundColor:N}=p;return(0,n.useEffect)((()=>{t.backgroundColor!==N&&g(t)}),[t]),(0,n.useEffect)((()=>{const e=(e=>{const{shadowType:t,spread:l,lateral:n,longitude:a,nomalBlur:i,shadowColor:m,blur:p,intensity:g,distance:d,newDirection:u,clayDirection:b,embos:h,opacity:C,depth:x,bdBlur:f,expand:y,glassblur:k,glassopa:E,hasOutline:v,backgroundColor:S}=e;if("nomal"===t)return"dent"===h?{style:{boxShadow:`${n}px ${a}px ${i}px ${l}px transparent, inset ${n}px ${a}px ${i}px ${l}px ${m}`}}:{style:{boxShadow:`${n}px ${a}px ${i}px ${l}px ${m}, inset ${n}px ${a}px ${i}px ${l}px transparent`}};if("newmor"===t){const e=S||"#ffffff";if(_(e))return(0,c.dispatch)("core/notices").createNotice("error",(0,o.__)("Neumorphism cannot be set when the background color is a gradient. ","itmar_guest_contact_block"),{type:"snackbar",isDismissible:!0}),null;const t=(0,r.vc)(e),l=t.lightness+g<100?t.lightness+g:100,n=t.lightness-g>0?t.lightness-g:0,a=(0,r.Pr)(t.hue,t.saturation,l),i=(0,r.Pr)(t.hue,t.saturation,n),m=s(u,d),b={style:{border:"none",background:e}};return"swell"===h?{...b,style:{...b.style,boxShadow:`${m.topLeft}px ${m.topRight}px ${p}px ${i}, ${m.bottomLeft}px ${m.bottmRight}px ${p}px ${a}, inset ${m.topLeft}px ${m.topRight}px ${p}px transparent, inset ${m.bottomLeft}px ${m.bottmRight}px ${p}px transparent`}}:{...b,style:{...b.style,boxShadow:`${m.topLeft}px ${m.topRight}px ${p}px transparent, ${m.bottomLeft}px ${m.bottmRight}px ${p}px transparent, inset ${m.topLeft}px ${m.topRight}px ${p}px ${i}, inset ${m.bottomLeft}px ${m.bottmRight}px ${p}px ${a}`}}}if("claymor"===t){const e=S||"#C0C0C0";if(_(e))return(0,c.dispatch)("core/notices").createNotice("error",(0,o.__)("claymorphism cannot be set when the background color is a gradient. ","itmar_guest_contact_block"),{type:"snackbar",isDismissible:!0}),null;const t=(0,r.MM)(e),l=s(b,y),n=s(b,x),a={style:{background:`rgba(255, 255, 255, ${C})`,backdropFilter:`blur(${f}px)`,border:"none"}};return"swell"===h?{...a,style:{...a.style,boxShadow:`${l.topLeft}px ${l.bottmRight}px ${2*y}px 0px rgba(${t.red}, ${t.green}, ${t.blue}, 0.5), inset ${n.topRight}px ${n.bottomLeft}px 16px 0px rgba(${t.red}, ${t.green}, ${t.blue}, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)`}}:{...a,style:{...a.style,boxShadow:`${l.topLeft}px ${l.bottmRight}px ${2*y}px 0px rgba(${t.red}, ${t.green}, ${t.blue}, 0.5), inset ${n.topRight}px ${n.bottomLeft}px 16px 0px rgba(${t.red}, ${t.green}, ${t.blue}, 0.6), 0px 11px 28px 0px rgb(255, 255, 255)`}}}if("glassmor"===t){const e={style:{backgroundColor:`rgba(255, 255, 255, ${E})`,border:"1px solid rgba(255, 255, 255, 0.4)",borderRightColor:"rgba(255, 255, 255, 0.2)",borderBottomColor:"rgba(255, 255, 255, 0.2)",backdropFilter:`blur( ${k}px )`}};return"swell"===h?{...e,style:{...e.style,boxShadow:"0 8px 12px 0 rgba( 31, 38, 135, 0.37 ), inset 0 8px 12px 0 transparent"}}:{...e,style:{...e.style,boxShadow:"0 8px 12px 0 transparent, inset 0 8px 12px 0 rgba( 31, 38, 135, 0.37 )"}}}})(p);e&&l(e,p)}),[p]),(0,n.createElement)(n.Fragment,null,(0,n.createElement)(a.InspectorControls,{group:"styles"},(0,n.createElement)(i.PanelBody,{title:(0,o.__)("Shadow Type","itmar_block_collections"),initialOpen:!0},(0,n.createElement)("div",{className:"itmar_shadow_type"},(0,n.createElement)(i.RadioControl,{selected:d,options:[{label:(0,o.__)("Nomal","itmar_block_collections"),value:"nomal"},{label:(0,o.__)("Neumorphism","itmar_block_collections"),value:"newmor"},{label:(0,o.__)("Claymorphism","itmar_block_collections"),value:"claymor"},{label:(0,o.__)("Grassmophism","itmar_block_collections"),value:"glassmor"}],onChange:e=>g({...p,shadowType:e})}))),"nomal"===d&&(0,n.createElement)(i.PanelBody,{title:(0,o.__)("Nomal settings","itmar_block_collections"),initialOpen:!1},(0,n.createElement)(i.RangeControl,{value:u,label:(0,o.__)("Spread","itmar_block_collections"),max:50,min:0,onChange:e=>g({...p,spread:e}),withInputField:!1}),(0,n.createElement)(i.RangeControl,{value:b,label:(0,o.__)("Lateral direction","itmar_block_collections"),max:50,min:0,onChange:e=>g({...p,lateral:e}),withInputField:!1}),(0,n.createElement)(i.RangeControl,{value:h,label:(0,o.__)("Longitudinal direction","itmar_block_collections"),max:50,min:0,onChange:e=>g({...p,longitude:e}),withInputField:!1}),(0,n.createElement)(i.RangeControl,{value:C,label:(0,o.__)("Blur","itmar_block_collections"),max:20,min:0,onChange:e=>g({...p,nomalBlur:e}),withInputField:!1}),(0,n.createElement)(a.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Shadow Color Setting","itmar_block_collections"),settings:[{colorValue:x,label:(0,o.__)("Choose Shadow color","itmar_block_collections"),onColorChange:e=>g({...p,shadowColor:e})}]})),"newmor"===d&&(0,n.createElement)(i.PanelBody,{title:(0,o.__)("Neumorphism settings","itmar_block_collections"),initialOpen:!1},(0,n.createElement)(i.RangeControl,{value:k,label:(0,o.__)("Distance","itmar_block_collections"),max:50,min:0,onChange:e=>g({...p,distance:e}),withInputField:!1}),(0,n.createElement)(i.RangeControl,{value:y,label:(0,o.__)("Intensity","itmar_block_collections"),max:100,min:0,onChange:e=>g({...p,intensity:e}),withInputField:!1}),(0,n.createElement)(i.RangeControl,{value:f,label:(0,o.__)("Blur","itmar_block_collections"),max:20,min:0,onChange:e=>g({...p,blur:e}),withInputField:!1}),(0,n.createElement)(i.PanelRow,null,(0,n.createElement)("div",{className:"light_direction"},(0,n.createElement)(i.RadioControl,{selected:E,options:[{value:"top_left"},{value:"top_right"},{value:"bottom_left"},{value:"bottom_right"}],onChange:e=>g({...p,newDirection:e})})),(0,n.createElement)("div",{className:"embos"},(0,n.createElement)(i.RadioControl,{selected:S,options:[{value:"swell"},{value:"dent"}],onChange:e=>g({...p,embos:e})})))),"claymor"===d&&(0,n.createElement)(i.PanelBody,{title:(0,o.__)("Claymorphism settings","itmar_block_collections"),initialOpen:!1},(0,n.createElement)(i.RangeControl,{value:w,label:(0,o.__)("Opacity","itmar_block_collections"),max:1,min:0,step:.1,onChange:e=>g({...p,opacity:e}),withInputField:!1}),(0,n.createElement)(i.RangeControl,{value:$,label:"Depth",max:20,min:0,onChange:e=>g({...p,depth:e}),withInputField:!1}),(0,n.createElement)(i.RangeControl,{value:P,label:"Expand",max:50,min:0,onChange:e=>g({...p,expand:e}),withInputField:!1}),(0,n.createElement)(i.RangeControl,{value:R,label:"Background Blur",max:10,min:0,onChange:e=>g({...p,bdBlur:e}),withInputField:!1}),(0,n.createElement)("div",{className:"light_direction claymor"},(0,n.createElement)(i.RadioControl,{selected:v,options:[{value:"right_bottom"},{value:"top_right"},{value:"top"}],onChange:e=>g({...p,clayDirection:e})}))),"glassmor"===d&&(0,n.createElement)(i.PanelBody,{title:(0,o.__)("Grassmophism settings","itmar_block_collections"),initialOpen:!1},(0,n.createElement)(i.RangeControl,{value:B,label:(0,o.__)("Glass blur","itmar_block_collections"),max:20,min:0,onChange:e=>g({...p,glassblur:e}),withInputField:!1}),(0,n.createElement)(i.RangeControl,{value:I,label:(0,o.__)("Glass Opacity","itmar_block_collections"),max:1,min:0,step:.1,onChange:e=>g({...p,glassopa:e}),withInputField:!1}),(0,n.createElement)("fieldset",null,(0,n.createElement)(i.ToggleControl,{label:(0,o.__)("Show outline","itmar_block_collections"),checked:L,onChange:()=>g({...p,hasOutline:!L})})))),m)}},3812:function(e,t,l){var n=l(9307),o=l(5609),a=l(3157),i=l(5736);t.Z=e=>{let{title:t,fontStyle:l,initialOpen:c,onChange:r}=e;const{fontSize:s,fontFamily:_,fontWeight:m,isItalic:p}=l,g=[{value:"Arial, sans-serif",label:"Arial",fontFamily:"Arial, sans-serif"},{value:"Courier New, monospace",label:"Courier New",fontFamily:"Courier New, monospace"},{value:"Georgia, serif",label:"Georgia",fontFamily:"Georgia, serif"},{label:"Noto Sans JP",value:"Noto Sans JP, sans-serif",fontFamily:"Noto Sans JP, sans-serif"},{label:"Texturina",value:"Texturina, serif",fontFamily:"Texturina, serif"}],d={option:(e,t)=>({...e,fontFamily:t.data.fontFamily})};return(0,n.createElement)(o.PanelBody,{title:t,initialOpen:c},(0,n.createElement)(o.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{e=""!=e?e:"0px";const t={...l,fontSize:e};r(t)},label:(0,i.__)("Size","itmar_block_collections"),value:s,units:[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}]}),(0,n.createElement)((e=>{let{label:t,value:l,onChange:o}=e;return(0,n.createElement)(n.Fragment,null,t&&(0,n.createElement)("label",{className:"components-base-control__label"},t),(0,n.createElement)(a.ZP,{options:g,value:g.find((e=>e.value===l)),onChange:e=>{o(e.value)},styles:d}))}),{label:(0,i.__)("font family","itmar_block_collections"),value:_,onChange:e=>{const t={...l,fontFamily:e};r(t)}}),(0,n.createElement)("label",{className:"components-base-control__label"},(0,i.__)("font weight","itmar_block_collections")),(0,n.createElement)(o.PanelRow,{className:"itmar_weight_row"},(0,n.createElement)(o.RadioControl,{selected:m,options:[{label:"LIGHT",value:"300"},{label:"REGULAR",value:"400"},{label:"MEDIUM",value:"500"},{label:"S-BOLD",value:"600"},{label:"BOLD",value:"700"},{label:"BLACK",value:"900"}],onChange:e=>{const t={...l,fontWeight:e};r(t)}})),(0,n.createElement)("label",{className:"components-base-control__label"},(0,i.__)("Italic display","itmar_block_collections")),(0,n.createElement)(o.ToggleControl,{checked:p,onChange:e=>{const t={...l,isItalic:e};r(t)}}))}},8313:function(e,t,l){l.r(t),l.d(t,{default:function(){return f}});var n=l(9307),o=l(5736),a=l(3812),i=l(8566),c=l(9539),r=l(6812),s=l(2387),_=l(6989),m=l.n(_),p=l(641),g=l(5609),d=l(2175),u=l(9818);const b={top:"10px",left:"10px",right:"10px",bottom:"10px"},h={top:"0px",left:"0px",right:"0px",bottom:"0px"},C=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}],x=e=>(0,n.createElement)("svg",{width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg"},(0,n.createElement)("text",{x:"0",y:"15",fontSize:"15","font-weight":"bold"},`H${e}`));function f(e){let{attributes:t,setAttributes:l,clientId:_}=e;const{bgColor:f,headingContent:y,headingType:k,titleType:E,font_style_heading:v,margin_heading:S,padding_heading:w,align:$,bg_heading:R,gr_heading:P,textColor:B,radius_heading:I,border_heading:L,optionStyle:N,shadow_element:F,is_shadow:T,is_underLine:A,underLine_prop:O,bgColor_underLine:V,bgGradient_underLine:D,linkKind:M,menu_pos:G,is_title_menu:U,selectedPageUrl:z,className:Z}=t,H=(0,d.useBlockProps)({style:{backgroundColor:f,position:U?"relative":"static"}}),W=(0,n.useRef)(!1),[J,K]=(0,n.useState)(N);(0,n.useEffect)((()=>{l({optionStyle:J})}),[J]);const[q,Y]=(0,n.useState)("");(0,n.useEffect)((()=>{"plaine"!==E&&(async()=>{try{const e=await m()({path:"/"});Y("site"===E?e.name:e.description)}catch(e){console.error("Error fetching data:",e.message)}})()}),[E]);const j=()=>{let e;switch(Z){case"is-style-circle_marker":e={styleName:"is-style-circle_marker",colorVal_circle:"#D1D7F2",colorVal_second:"#9FAEF2",circleScale:"3em",secondScale:"1.5em",second_opacity:.7,first_long:10,first_lat:-5,second_long:-10,second_lat:10,isSecond:!0};break;case"is-style-sub_copy":e={styleName:"is-style-sub_copy",alignment_copy:"top left",color_text_copy:"#000",color_background_copy:"#d1cece",copy_content:"SAMPLE",font_style_copy:{fontSize:"16px",fontFamily:"Arial, sans-serif",fontWeight:"500",isItalic:!1},radius_copy:{topLeft:"10px",topRight:"10px",bottomRight:"0px",bottomLeft:"0px",value:"0px"},padding_copy:{top:"10px",left:"10px",bottom:"10px",right:"10px"},isIcon:!1,icon_style:{icon_name:"f030",icon_pos:"left",icon_size:"24px",icon_color:"#000",icon_space:"5px"}}}K(e),W.current=Z,ee(!1)},Q=()=>{le(!0),l({className:W.current}),ee(!1)},[X,ee]=(0,n.useState)(!1),[te,le]=(0,n.useState)(!1);(0,n.useEffect)((()=>{if(0!=W.current){if(te)return void le(!1);if(void 0===W.current||"is-style-default"===W.current)return void j();ee(!0)}else W.current=Z}),[Z]),(0,p.P)(c.J,t),(0,p.C)();const[ne,oe]=(0,n.useState)(N&&void 0!==N.copy_content?N.copy_content:"SAMPLE"),ae=(0,u.useSelect)((e=>e("core/block-editor").hasSelectedInnerBlock(_,!0)),[_]),ie=(0,d.useInnerBlocksProps)({className:`submenu-block ${ae?"visible":""} ${G.replace(/ /g,"_")}`},{allowedBlocks:["itmar/draggable-box","itmar/design-menu"],template:[["itmar/design-menu",{is_submenu:!0}]],templateLock:!1}),ce="plaine"===E?(0,n.createElement)(d.RichText,{tagName:k,className:"has-text-color",onChange:e=>{l({headingContent:e})},value:y,placeholder:(0,o.__)("Write Title text...","itmar_block_collections")}):React.createElement(k.toLowerCase(),{className:"has-text-color"},q);function re(){return ce}return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(d.InspectorControls,{group:"settings"},(0,n.createElement)(g.PanelBody,{title:(0,o.__)("Title Source Setting","itmar_form_send_blocks")},(0,n.createElement)("div",{className:"itmar_title_type"},(0,n.createElement)(g.RadioControl,{label:(0,o.__)("Title type","itmar_block_collections"),selected:E,options:[{label:(0,o.__)("Plaine","itmar_block_collections"),value:"plaine"},{label:(0,o.__)("Site Title","itmar_block_collections"),value:"site"},{label:(0,o.__)("Chatch Phrase","itmar_block_collections"),value:"catch"}],onChange:e=>l({titleType:e}),help:(0,o.__)("You can display the site title and catchphrase in addition to the blank title.","itmar_block_collections")})),(0,n.createElement)("div",{className:"itmar_link_type"},(0,n.createElement)(g.RadioControl,{label:(0,o.__)("Link type","itmar_block_collections"),selected:M,options:[{label:(0,o.__)("None","itmar_block_collections"),value:"none"},{label:(0,o.__)("Fixed Page","itmar_block_collections"),value:"fixed"},{label:(0,o.__)("Archive Page","itmar_block_collections"),value:"archive"},{label:(0,o.__)("Free URL","itmar_block_collections"),value:"free"},{label:(0,o.__)("Sub Menu","itmar_block_collections"),value:"submenu"}],onChange:e=>l({linkKind:e}),help:(0,o.__)("You can select the type of URL to link to the title.","itmar_block_collections")})),"fixed"===M&&(0,n.createElement)(s.gv,{attributes:t,setAttributes:l,label:(0,o.__)("Select a fixed page to link to","itmar_block_collections")}),"archive"===M&&(0,n.createElement)(s.g4,{attributes:t,setAttributes:l,label:(0,o.__)("Select archive page to link to","itmar_block_collections")}),"free"===M&&(0,n.createElement)(g.TextControl,{label:(0,o.__)("Link to URL","itmar_block_collections"),labelPosition:"top",value:z,onChange:e=>{l({selectedPageUrl:e})}}),"submenu"===M&&(0,n.createElement)(g.PanelBody,{title:(0,o.__)("Submenu position settings","itmar_form_send_blocks")},(0,n.createElement)(g.PanelRow,{className:"imgPos_row"},(0,n.createElement)("label",null,(0,o.__)("Menu Alignment","itmar_block_collections")),(0,n.createElement)(g.__experimentalAlignmentMatrixControl,{value:G,onChange:e=>{l({menu_pos:e})}})),(0,n.createElement)(g.ToggleControl,{label:(0,o.__)("Based on title","itmar_block_collections"),checked:U,help:(0,o.__)("If unchecked, the parent menu will be used as the reference. If there is no parent menu, do not uncheck it.","itmar_block_collections"),onChange:e=>{l({is_title_menu:e})}})))),(0,n.createElement)(d.InspectorControls,{group:"styles"},(0,n.createElement)(g.PanelBody,{title:(0,o.__)("Global settings","itmar_block_collections"),initialOpen:!1,className:"title_design_ctrl"},(0,n.createElement)(d.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Background Color Setting","itmar_block_collections"),settings:[{colorValue:f,label:(0,o.__)("Choose Block Background color","itmar_block_collections"),onColorChange:e=>l({bgColor:e})}]}),(0,n.createElement)(g.ToggleControl,{label:(0,o.__)("Is Shadow","itmar_block_collections"),checked:T,onChange:e=>{l({is_shadow:e})}}),(0,n.createElement)(g.ToggleControl,{label:(0,o.__)("Add an underline","itmar_block_collections"),checked:A,onChange:e=>{l({is_underLine:e})}}),A&&(0,n.createElement)(g.PanelBody,{title:(0,o.__)("UnderLine settings","itmar_block_collections"),initialOpen:!0,className:"title_design_ctrl"},(0,n.createElement)(g.PanelRow,{className:"distance_row"},(0,n.createElement)(g.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{const t={...O,height:e};l({underLine_prop:t})},label:(0,o.__)("Height","itmar_block_collections"),value:O.height}),(0,n.createElement)(g.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{const t={...O,width:e};l({underLine_prop:t})},label:(0,o.__)("Width","itmar_block_collections"),value:O.width}),(0,n.createElement)(g.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{const t={...O,distance:e};l({underLine_prop:t})},label:(0,o.__)("Distance","itmar_block_collections"),value:O.distance})),(0,n.createElement)(d.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Under Line Color Setting","itmar_block_collections"),settings:[{colorValue:V,gradientValue:D,label:(0,o.__)("Choose Under Line color","itmar_block_collections"),onColorChange:e=>{l({bgColor_underLine:void 0===e?"":e})},onGradientChange:e=>{l({bgGradient_underLine:e})}}]}),(0,n.createElement)(g.ToggleControl,{label:(0,o.__)("Animation on hover","itmar_block_collections"),checked:O.is_anime,onChange:e=>{const t={...O,is_anime:e};l({underLine_prop:t})}}))),(0,n.createElement)(g.PanelBody,{title:(0,o.__)("Heading settings","itmar_block_collections"),initialOpen:!1,className:"title_design_ctrl"},(0,n.createElement)(a.Z,{title:(0,o.__)("Typography","itmar_block_collections"),fontStyle:v,onChange:e=>{l({font_style_heading:e})},initialOpen:!1}),(0,n.createElement)(d.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Heading Color Setting","itmar_block_collections"),settings:[{colorValue:B,label:(0,o.__)("Choose Text color","itmar_block_collections"),onColorChange:e=>l({textColor:e})},{colorValue:R,gradientValue:P,label:(0,o.__)("Choose Background color","itmar_block_collections"),onColorChange:e=>l({bg_heading:e}),onGradientChange:e=>l({gr_heading:e})}]}),(0,n.createElement)(g.__experimentalBoxControl,{label:(0,o.__)("Margin settings","itmar_block_collections"),values:S,onChange:e=>l({margin_heading:e}),units:C,allowReset:!0,resetValues:b}),(0,n.createElement)(g.__experimentalBoxControl,{label:(0,o.__)("Padding settings","itmar_block_collections"),values:w,onChange:e=>l({padding_heading:e}),units:C,allowReset:!0,resetValues:b}),(0,n.createElement)(g.PanelBody,{title:(0,o.__)("Border Settings","itmar_block_collections"),initialOpen:!1,className:"border_design_ctrl"},(0,n.createElement)(g.__experimentalBorderBoxControl,{colors:[{color:"#72aee6"},{color:"#000"},{color:"#fff"}],onChange:e=>l({border_heading:e}),value:L,allowReset:!0,resetValues:h}),(0,n.createElement)(d.__experimentalBorderRadiusControl,{values:I,onChange:e=>l({radius_heading:"string"==typeof e?{value:e}:e})}))),"is-style-circle_marker"===Z&&(0,n.createElement)(g.PanelBody,{title:(0,o.__)("Circle Marker Settings","itmar_block_collections"),initialOpen:!1,className:"title_design_ctrl"},(0,n.createElement)(d.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Circle Color Setting","itmar_block_collections"),settings:[{colorValue:N&&N.colorVal_circle?N.colorVal_circle:"#D1D7F2",gradientValue:N&&N.gradientVal_circle?N.gradientVal_circle:void 0,label:(0,o.__)("Choose Circle Background","itmar_block_collections"),onColorChange:e=>{K((t=>({...t,colorVal_circle:e})))},onGradientChange:e=>{K((t=>({...t,gradientVal_circle:e})))}}]}),(0,n.createElement)(g.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{K((t=>({...t,circleScale:e})))},label:(0,o.__)("Circle Scale Setting","itmar_block_collections"),value:N&&N.circleScale?N.circleScale:"3em"}),(0,n.createElement)(g.PanelBody,{title:(0,o.__)("Position Settings","itmar_block_collections"),initialOpen:!0,className:"title_design_ctrl"},(0,n.createElement)(g.RangeControl,{value:N&&N.first_lat?N.first_lat:10,label:(0,o.__)("Lateral direction","itmar_block_collections"),max:50,min:-30,step:1,onChange:e=>{K((t=>({...t,first_lat:e})))},withInputField:!1}),(0,n.createElement)(g.RangeControl,{value:N&&N.first_long?N.first_long:10,label:(0,o.__)("Longitudinal direction","itmar_block_collections"),max:50,min:-30,step:1,onChange:e=>{K((t=>({...t,first_long:e})))},withInputField:!1})),(0,n.createElement)(g.PanelBody,{title:(0,o.__)("Second Circle Settings","itmar_block_collections"),initialOpen:!0},(0,n.createElement)(g.ToggleControl,{label:(0,o.__)("Second Circle","itmar_block_collections"),checked:!N||!N.isSecond||N.isSecond,onChange:e=>{K((t=>({...t,isSecond:e})))}})),!(!N||!N.isSecond)&&N.isSecond&&(0,n.createElement)(n.Fragment,null,(0,n.createElement)(d.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Circle Color Setting","itmar_block_collections"),settings:[{colorValue:N&&N.colorVal_second?N.colorVal_second:"#9FAEF2",gradientValue:N&&N.gradientVal_second?N.gradientVal_second:void 0,label:(0,o.__)("Choose Circle Background","itmar_block_collections"),onColorChange:e=>{K((t=>({...t,colorVal_second:e})))},onGradientChange:e=>{K((t=>({...t,gradientVal_second:e})))}}]}),(0,n.createElement)(g.RangeControl,{value:N&&N.second_opacity?N.second_opacity:.7,label:(0,o.__)("Opacity","itmar_block_collections"),max:1,min:.1,step:.1,onChange:e=>{K((t=>({...t,second_opacity:e})))},withInputField:!1}),(0,n.createElement)(g.__experimentalUnitControl,{dragDirection:"e",onChange:e=>{K((t=>({...t,secondScale:e})))},label:(0,o.__)("Circle Scale Setting","itmar_block_collections"),value:N&&N.secondScale?N.secondScale:"1.5em"}),(0,n.createElement)(g.PanelBody,{title:(0,o.__)("Position Settings","itmar_block_collections"),initialOpen:!0,className:"title_design_ctrl"},(0,n.createElement)(g.RangeControl,{value:N&&N.second_lat?N.second_lat:20,label:(0,o.__)("Lateral direction","itmar_block_collections"),max:50,min:-30,step:1,onChange:e=>{K((t=>({...t,second_lat:e})))},withInputField:!1}),(0,n.createElement)(g.RangeControl,{value:N&&N.second_long?N.second_long:-10,label:(0,o.__)("Longitudinal direction","itmar_block_collections"),max:50,min:-30,step:1,onChange:e=>{K((t=>({...t,second_long:e})))},withInputField:!1})))),"is-style-sub_copy"===Z&&(0,n.createElement)(g.PanelBody,{title:(0,o.__)("Sub Copy Settings","itmar_block_collections"),initialOpen:!1,className:"title_design_ctrl"},(0,n.createElement)(d.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Copy Color Setting","itmar_block_collections"),settings:[{colorValue:N&&N.color_text_copy?N.color_text_copy:"#000",label:(0,o.__)("Choose Text color","itmar_block_collections"),onColorChange:e=>{K((t=>({...t,color_text_copy:e})))}},{colorValue:N&&N.color_background_copy?N.color_background_copy:"#d1cece",gradientValue:N&&N.gradient_background_copy?N.gradient_background_copy:void 0,label:(0,o.__)("Choose Background color","itmar_block_collections"),onColorChange:e=>{K((t=>({...t,color_background_copy:e})))},onGradientChange:e=>{K((t=>({...t,gradient_background_copy:e})))}}]}),(0,n.createElement)(g.PanelRow,{className:"copyInfo_row"},(0,n.createElement)(g.TextControl,{label:(0,o.__)("Copy Text","itmar_block_collections"),labelPosition:"top",value:ne,onChange:e=>{oe(e),K((t=>({...t,copy_content:e})))}})),(0,n.createElement)(g.PanelRow,{className:"copyInfo_row"},(0,n.createElement)("label",null,(0,o.__)("Copy Alignment","itmar_block_collections")),(0,n.createElement)(g.__experimentalAlignmentMatrixControl,{value:N&&N.alignment_copy?N.alignment_copy:"top left",onChange:e=>{K((t=>({...t,alignment_copy:e})))}})),(0,n.createElement)(a.Z,{title:(0,o.__)("Typography","itmar_block_collections"),fontStyle:N&&N.font_style_copy?N.font_style_copy:{fontSize:"16px",fontFamily:"Arial, sans-serif",fontWeight:"500",isItalic:!1},initialOpen:!1,onChange:e=>{K((t=>({...t,font_style_copy:e})))}}),(0,n.createElement)(g.PanelBody,{title:(0,o.__)("Border Settings","itmar_block_collections"),initialOpen:!0},(0,n.createElement)(d.__experimentalBorderRadiusControl,{values:N&&N.radius_copy?N.radius_copy:{topLeft:"10px",topRight:"10px",bottomRight:"0px",bottomLeft:"0px",value:"0px"},onChange:e=>{K((t=>({...t,radius_copy:"string"==typeof e?{value:e}:e})))}}),(0,n.createElement)(g.__experimentalBoxControl,{label:(0,o.__)("Padding settings","itmar_block_collections"),values:N&&N.padding_copy?N.padding_copy:{top:"10px",left:"10px",bottom:"10px",right:"10px"},onChange:e=>{K((t=>({...t,padding_copy:e})))},units:C,allowReset:!0,resetValues:b})),(0,n.createElement)(g.PanelBody,{title:(0,o.__)("Icon settings","itmar_block_collections"),initialOpen:!0},(0,n.createElement)(g.ToggleControl,{label:(0,o.__)("Append icon","itmar_block_collections"),checked:!(!N||!N.isIcon)&&N.isIcon,onChange:e=>{K((t=>({...t,isIcon:e})))}}),!(!N||!N.isIcon)&&N.isIcon&&(0,n.createElement)(i.Z,{iconStyle:N&&N.icon_style?N.icon_style:{icon_name:"f030",icon_pos:"left",icon_size:"24px",icon_color:"#000",icon_space:"5px"},onChange:e=>{K((t=>({...t,icon_style:e})))}})))),(0,n.createElement)(d.BlockControls,null,(0,n.createElement)(d.AlignmentToolbar,{value:$,onChange:e=>{l({align:e})}}),(0,n.createElement)(g.ToolbarDropdownMenu,{label:(0,o.__)("Change heading level"),icon:x(parseInt(k.slice(1),10)),controls:[1,2,3,4,5,6].map((e=>({icon:x(e),title:`Heading ${e}`,isActive:k===`H${e}`,onClick:()=>l({headingType:`H${e}`})})))})),X&&(0,n.createElement)(g.Modal,{title:(0,o.__)("Confirm Deletion","itmar_block_collections"),onRequestClose:Q},(0,n.createElement)("p",null,(0,o.__)("Changing a style resets the style-specific settings. Are you sure?","itmar_block_collections")),(0,n.createElement)(g.Button,{variant:"primary",onClick:j},(0,o.__)("Yes, Change","itmar_block_collections")),(0,n.createElement)(g.Button,{variant:"secondary",onClick:Q},(0,o.__)("Cancel","itmar_block_collections"))),(0,n.createElement)("div",H,(0,n.createElement)(c.J,{attributes:t},T?(0,n.createElement)(r.Z,{shadowStyle:{...F,backgroundColor:f},onChange:(e,t)=>{l({shadow_result:e.style}),l({shadow_element:t})}},re()):re()),"submenu"===M&&(0,n.createElement)("div",ie)))}},9747:function(e,t,l){function n(e,t,l){var n=!1;if((e||0===e)&&e<=360&&(t||0===t)&&t<=100&&(l||0===l)&&l<=100){var o,a=0,i=0,c=0,r=0,s=0;e=Number(e)/360,t=Number(t)/100,l=Number(l)/100,0===t?(a=l,i=l,c=l):(o=function(e,t,l){return l<0&&(l+=1),l>1&&(l-=1),l<1/6?e+=6*(t-e)*l:l<.5?e=t:l<2/3&&(e+=(t-e)*(2/3-l)*6),e},a=o(s=2*l-(r=l<.5?l*(1+t):l+t-l*t),r,e+1/3),i=o(s,r,e),c=o(s,r,e-1/3)),n=`#${Math.round(255*a).toString(16).padStart(2,"0")}${Math.round(255*i).toString(16).padStart(2,"0")}${Math.round(255*c).toString(16).padStart(2,"0")}`}return n}function o(e){let t=e.match(/\#([a-fA-F0-9]{2})([a-fA-Z0-9]{2})([a-fA-F0-9]{2})/),l=t[1],n=t[2],o=t[3],a=!1;if((l||0===l)&&String(l).match(/^[0-9a-f]{2}$/i)&&(n||0===n)&&String(n).match(/^[0-9a-f]{2}$/i)&&(o||0===o)&&String(o).match(/^[0-9a-f]{2}$/i)){let e=0,t=0,i=0,c=0,r=0,s=0;l=parseInt(l,16)/255,n=parseInt(n,16)/255,o=parseInt(o,16)/255,c=Math.max(l,n,o),r=Math.min(l,n,o),i=(c+r)/2,c!==r&&(s=c-r,t=i>.5?s/(2-c-r):s/(c+r),e=c===l?(n-o)/s:c===n?2+(o-l)/s:4+(l-n)/s,e/=6),a={hue:Math.round(360*e),saturation:Math.round(100*t),lightness:Math.round(100*i)}}return a}function a(e){let t=e.match(/\#([a-fA-F0-9]{2})([a-fA-Z0-9]{2})([a-fA-F0-9]{2})/),l=t[1],n=t[2],o=t[3],a=!1;return(l||0===l)&&String(l).match(/^[0-9a-f]{2}$/i)&&(n||0===n)&&String(n).match(/^[0-9a-f]{2}$/i)&&(o||0===o)&&String(o).match(/^[0-9a-f]{2}$/i)&&(l=parseInt(l,16),n=parseInt(n,16),o=parseInt(o,16),a={red:Math.round(l),green:Math.round(n),blue:Math.round(o)}),a}l.d(t,{MM:function(){return a},Pr:function(){return n},vc:function(){return o}})},641:function(e,t,l){l.d(t,{C:function(){return r},P:function(){return c}});var n=l(9307),o=l(2027),a=l(1893),i=l(7762);function c(e,t){(0,o.KW)((()=>{const l=document.getElementsByName("editor-canvas")[0];if(l){const o=l.contentDocument||l.contentWindow.document,c=new a.qH;(0,i.Dq)(c.collectStyles((0,n.createElement)(e,{attributes:t})));const r=c.getStyleTags().replace(/<style[^>]*>|<\/style>/g,""),s=o.createElement("style");return s.innerHTML=r,o.head.appendChild(s),()=>{o.head.removeChild(s)}}}),[t])}function r(){(0,n.useEffect)((()=>{const e=document.getElementsByName("editor-canvas")[0];if(e){const t=e.contentDocument||e.contentWindow.document,l=t.createElement("script");return l.setAttribute("src","https://kit.fontawesome.com/3e425ac06b.js"),l.setAttribute("crossorigin","anonymous"),t.body.appendChild(l),()=>{t.body?.removeChild(l)}}}),[])}},2387:function(e,t,l){l.d(t,{g4:function(){return p},gv:function(){return m}});var n=l(7462),o=l(9307),a=l(5609),i=l(6989),c=l.n(i);const r=e=>{let{setAttributes:t,attributes:l,label:n,fetchOptions:i}=e;const{selectedPageId:c}=l,[r,s]=(0,o.useState)([]);return(0,o.useEffect)((()=>{(async()=>{try{const e=await i();s(e)}catch(e){console.error("Error fetching data:",e.message)}})()}),[i]),(0,o.createElement)(a.ComboboxControl,{label:n,options:r,value:c,onChange:e=>{const l=r.find((t=>t.value===e));t({selectedPageId:e,selectedPageUrl:l?l.link:"/"})}})},s=async()=>{const e=await c()({path:"/wp/v2/pages"});return e&&!e.some((e=>-1===e.id))&&e.unshift({id:-1,title:{rendered:"ホーム"},link:"/"}),e?e.map((e=>({value:e.id,label:e.title.rendered,link:e.link}))):[]},_=async()=>{const e=await c()({path:"/wp/v2/types"});let t=0;return Object.keys(e).reduce(((l,n)=>{const o=e[n];return!0===o.has_archive?l.push({value:t++,link:`/${o.slug}`,label:o.name}):"string"==typeof o.has_archive&&l.push({value:t++,link:`/${o.has_archive}`,label:o.name}),l}),[])},m=e=>(0,o.createElement)(r,(0,n.Z)({},e,{fetchOptions:s})),p=e=>(0,o.createElement)(r,(0,n.Z)({},e,{fetchOptions:_}))}}]);
//# sourceMappingURL=313.js.map