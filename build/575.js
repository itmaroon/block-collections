"use strict";(globalThis.webpackChunkblock_collections=globalThis.webpackChunkblock_collections||[]).push([[575],{4575(e,l,o){o.r(l),o.d(l,{default:()=>$});var t=o(7723),i=o(9716),a=o(6435),n=o(790);const s=({attributes:e,children:l})=>(0,n.jsx)(r,{attributes:e,children:l}),r=i.Ay.div`
	${({attributes:e})=>{const{optionColor:l,hoverBgColor:o,font_style_option:t,default_pos:n,mobile_pos:s,bgSelectColor:r,bgSelectGradient:c,radius_value:d,border_value:p,shadow_result:b,is_shadow:u,className:g}=e,h=r||c,_=t.isItalic?"italic":"normal",m=(0,a.tk)(d),x=(0,a.fS)(n.margin_value),f=(0,a.fS)(n.padding_value),C=(0,a.fS)(s.margin_value),v=(0,a.fS)(s.padding_value),k=u&&b?(0,a.xm)(b):"",y={"top left":"display: flex;flex-direction: column-reverse;align-items: flex-start;","top center":"display: flex;flex-direction: column-reverse;align-items: center;","top right":"display: flex;flex-direction: column-reverse;align-items: flex-end;","center left":"display: flex;flex-direction: row-reverse;align-items: center;","center center":"label{display: none;}","center right":"display: flex;align-items: center;","bottom left":"display: flex;flex-direction: column;align-items: flex-start;","bottom center":"display: flex;flex-direction: column;align-items: center;","bottom right":"display: flex;flex-direction: column;align-items: flex-end;"},j=i.AH`
			margin: ${x};
			padding: ${f};
			position: relative;
			${y[n.labelPos]}
			@media (max-width: 767px) {
				margin: ${C};
				padding: ${v};
				${y[s.labelPos]}
			}
			.itmar_block_select {
				position: relative;
				font-size: ${t.default_fontSize};
				font-family: ${t.fontFamily};
				font-weight: ${t.fontWeight};
				font-style: ${_};
				color: ${l};
				@media (max-width: 767px) {
					font-size: ${t.mobile_fontSize};
				}

				& > div {
					position: relative;
					background: ${h};
					border-radius: ${m};
					${(0,a.gA)(p)};
					${k};
					z-index: 2;
					padding: 0.8em 3em 0.8em 1.2em;
					border-radius: 8px;
					font-size: ${t.default_fontSize};
					min-height: 2.2em;
					@media (max-width: 767px) {
						font-size: ${t.mobile_fontSize};
					}

					.itmar_block_opener {
						right: 1px;
						top: 0;
						bottom: 0;
						cursor: pointer;
						width: 1.4em;
						position: absolute;

						&:after {
							content: "";
							position: absolute;
							display: block;
							width: 0.75em;
							height: 0.75em;
							border-bottom: 2px solid #99a3ba;
							border-left: 2px solid #99a3ba;
							transform: rotate(315deg);
							top: 30%;
							transition: all 0.3s ease;
						}
					}

					span {
						color: var(--wp--preset--color--placeholder);
						display: block;
						position: absolute;
						left: 12px;
						cursor: pointer;
						top: 50%;
						transform: translateY(-50%);
						line-height: 1em;
						transition: all 0.3s ease;

						&.hide {
							opacity: 0;
							visibility: hidden;
							transform: translate(-4px, 0);
						}
					}

					a {
						position: relative;
						padding: 0 0 6px 0;
						line-height: 1.4em;
						text-decoration-line: none;
						color: ${l};
						display: inline-block;
						vertical-align: top;
						margin: 6px 6px 0 0;
						cursor: pointer;

						em {
							display: block;
							white-space: nowrap;
							padding: 0.1em 0.5em 0.1em 0.5em;
							position: relative;
							font-style: ${_};
						}

						&:before {
							content: "";
							left: 0;
							top: 0;
							bottom: 6px;
							width: 100%;
							position: absolute;
							display: block;
							background: ${o};
							z-index: -1;
							border-radius: 4px;
						}

						i {
							cursor: pointer;
							position: absolute;
							top: 0;
							right: 0.3em;
							width: 1.2em;
							height: 1.4em;
							display: block;

							&:before,
							&:after {
								content: "";
								display: block;
								width: 2px;
								height: 1.25em;
								position: absolute;
								left: 50%;
								top: 50%;
								background: rgb(153, 163, 186);
								border-radius: 1px;
							}

							&:before {
								transform: translate(-50%, -50%) rotate(45deg);
							}

							&:after {
								transform: translate(-50%, -50%) rotate(-45deg);
							}
						}

						&.notShown {
							opacity: 0;
							transition: opacity 0.3s ease;

							&:before {
								width: 28px;
								transition: width 0.45s cubic-bezier(0.87, -0.41, 0.19, 1.44)
									0.2s;
							}

							i {
								opacity: 0;
								transition: all 0.3s ease 0.3s;
							}

							em {
								opacity: 0;
								transform: translate(-6px, 0);
								transition: all 0.4s ease 0.3s;
							}

							&.shown {
								opacity: 1;
								margin-top: 6px;

								&:before {
									width: 100%;
								}

								i {
									opacity: 1;
								}

								em {
									opacity: 1;
									transform: translate(0, 0);
								}
							}
						}

						&.remove {
							&:before {
								width: 28px;
								transition: width 0.4s cubic-bezier(0.87, -0.41, 0.19, 1.44) 0s;
							}

							i {
								opacity: 0;
								transition: all 0.3s ease 0s;
							}

							em {
								opacity: 0;
								transform: translate(-12px, 0);
								transition: all 0.4s ease 0s;
							}

							&.disappear {
								opacity: 0;
								transition: opacity 0.5s ease 0s;
							}
						}
					}
				}

				& > ul {
					margin: 0;
					padding: 0;

					list-style: none;
					font-size: 0.8em;
					max-height: 40vh;
					overflow: scroll;
					z-index: 1;
					position: relative;
					top: auto;
					left: 0;
					right: 0;
					visibility: hidden;
					opacity: 0;
					max-height: 0;
					border-radius: 8px;
					transform: translate(0, 20px) scale(0.8);
					transform-origin: 0 0;
					filter: drop-shadow(0 12px 20px rgba(22, 42, 90, 0.08));
					transition:
						all 0.4s ease,
						transform 0.4s cubic-bezier(0.87, -0.41, 0.19, 1.44),
						filter 0.3s ease 0.2s;

					li {
						color: ${l};
						background: #fff;
						padding: 0.5em 0.7em 0.5em 1.7em;
						font-size: ${t.default_fontSize};
						cursor: pointer;
						overflow: hidden;
						position: relative;
						transition:
							background 0.3s ease,
							color 0.3s ease,
							transform 0.3s ease 0.3s,
							opacity 0.5s ease 0.3s,
							border-radius 0.3s ease 0.3s;
						@media (max-width: 767px) {
							font-size: ${t.mobile_fontSize};
						}
						&:first-child {
							border-radius: 8px 8px 0 0;

							&:last-child {
								border-radius: 8px;
							}
						}

						&:last-child {
							border-radius: 0 0 8px 8px;

							&:first-child {
								border-radius: 8px;
							}
						}

						&:hover {
							background: ${o};
							color: #fff;
						}

						&.beforeRemove {
							border-radius: 0 0 8px 8px;

							&:first-child {
								border-radius: 8px;
							}
						}

						&.afterRemove {
							border-radius: 8px 8px 0 0;

							&:last-child {
								border-radius: 8px;
							}
						}

						&.remove {
							transform: scale(0);
							opacity: 0;

							&:after {
								animation: ripple 0.4s ease-out;
							}
						}

						&.notShown {
							transform: scale(0);
							opacity: 0;
							transition:
								transform 0.35s ease,
								opacity 0.4s ease;

							&.show {
								transform: scale(1);
								opacity: 1;
							}
						}
					}
				}

				&.open {
					& > div {
						box-shadow: 0 4px 20px -1px rgba(22, 42, 90, 0.12);

						.itmar_block_opener {
							&:after {
								top: 40%;
								transform: rotate(135deg);
							}
						}
					}

					& > ul {
						transform: translate(0, 12px) scale(1);
						opacity: 1;
						visibility: visible;
						//height: auto;
						max-height: 30vh;
						overflow: hidden visible;
						filter: drop-shadow(0 16px 24px rgba(22, 42, 90, 0.16));
					}
				}
			}

			.itmar_block_selectSingle {
				& > div {
					a {
						&:hover {
							cursor: auto;
						}

						i {
							display: none;
						}
					}
				}
			}
		`;return i.AH`
			${j}
		`}}
`;var c=o(6087);function d({onOptionSelect:e,onOptionDeselect:l,...o}){const t=o.children.props.multiple,i=t?"itmar_block_selectMultiple":"itmar_block_selectSingle",a=o.children.props["data-placeholder"],[s,r]=(0,c.useState)(!1),d=(0,c.useRef)(null),p=(0,c.useCallback)(l=>{e(l)},[o.children,e]),b=(0,c.useCallback)((e,o)=>{o.stopPropagation(),l(e)},[o.children,e]),u=React.Children.toArray(o.children.props.children).map((e,l)=>React.isValidElement(e)&&"option"===e.type?e.props.selected?(0,n.jsxs)("a",{id:e.props.id,"data-value":e.props.value,onClick:t?l=>b(e.props.id,l):void 0,children:[(0,n.jsx)("em",{className:e.props.className,children:e.props.children}),(0,n.jsx)("i",{})]},l):(0,n.jsx)("li",{id:e.props.id,"data-value":e.props.value,className:e.props.className,onClick:()=>p(e.props.id),children:e.props.children},l):null);let g=u.filter(e=>React.isValidElement(e)&&"li"===e.type),h=u.filter(e=>React.isValidElement(e)&&"a"===e.type);return(0,n.jsxs)("div",{className:`itmar_block_select ${i} ${s?"open":""}`,tabIndex:"0",onBlur:e=>{d.current.contains(e.relatedTarget)||r(!1)},ref:d,children:[(0,n.jsxs)("div",{onClick:()=>{r(!s)},children:[(0,n.jsxs)("span",{className:h.length>0?"hide":"",children:[a,o.children]}),h,(0,n.jsx)("div",{className:"itmar_block_opener"})]}),(0,n.jsx)("ul",{children:g})]})}var p=o(9491),b=o(6367),u=o(4715),g=o(6427);function h({attributes:e,children:l}){const{htmlFor:o,...t}=e;return(0,n.jsx)(_,{htmlFor:o,$attrs:t,children:l})}const _=i.Ay.label`
	${({$attrs:e})=>{const{font_style_label:l,bgColor_label:o,bgGradient_label:t,textColor_label:n,radius_label:s,border_label:r,padding_label:c,labelSpace:d,labelWidth:p,default_pos:b,mobile_pos:u,shadow_result:g,is_shadow:h,isMobile:_,className:m}=e,x=o||t,f=l.isItalic?"italic":"normal",C=(0,a.tk)(s),v=(0,a.fS)(c),k={"top left":"margin-bottom","top center":"margin-bottom","top right":"margin-bottom","center left":"margin-right","center right":"margin-left","bottom left":"margin-top","bottom center":"margin-top","bottom right":"margin-top"},y=`${k[b.labelPos]}: ${d};`,j=`${k[u.labelPos]}: ${d};`,w=h&&g?(0,a.xm)(g):"",S=i.AH`
			white-space: nowrap;
			background: ${x};
			border-radius: ${C};
			color: ${n};
			font-size: ${l.default_fontSize};
			font-family: ${l.fontFamily};
			font-weight: ${l.fontWeight};
			font-style: ${f};
			padding: ${v};
			${(0,a.gA)(r)};
			${w};
			@media (max-width: 767px) {
				font-size: ${l.mobile_fontSize};
			}
			span {
				color: var(--wp--preset--color--accent-1);
			}
		`;let $=null;const P=m?.split(" ").find(e=>e.startsWith("is-style"));return $="is-style-line"===P?i.AH`
					position: absolute;
					width: fit-content;
					opacity: 0;
					left: calc(2em + 10px);
					pointer-events: none;
					bottom: 15px;
					z-index: 1;
					transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s;
				`:i.AH`
					width: ${p};
					${y}
					@media (max-width: 767px) {
						${j}
					}
				`,i.AH`
			${S}
			${$}
		`}}
`,m={top:"10px",left:"10px",right:"10px",bottom:"10px"},x={top:"0px",left:"0px",right:"0px",bottom:"0px"},f=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function C(e){const{attributes:l}=e,{required:o,labelContent:i,default_pos:a,mobile_pos:s,font_style_label:r,bgColor_label:c,bgGradient_label:d,textColor_label:p,radius_label:_,border_label:C,padding_label:v,labelSpace:k,isMobile:y}=l;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(u.InspectorControls,{group:"settings",children:[(0,n.jsxs)(g.PanelBody,{title:(0,t.__)("Required Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl",children:[(0,n.jsx)(g.PanelRow,{className:"labelRequierd_row",children:(0,n.jsx)(g.ToggleControl,{label:(0,t.__)("Required input","block-collections"),checked:o.flg,onChange:l=>{const t={...o,flg:l};e.onChange("required",t)}})}),o.flg&&(0,n.jsx)(g.PanelRow,{children:(0,n.jsx)(g.TextControl,{label:(0,t.__)("Show 'required'","block-collections"),value:o.display,isPressEnterToChange:!0,onChange:l=>{const t={...o,display:l};e.onChange("required",t)}})})]}),(0,n.jsxs)(g.PanelBody,{title:(0,t.__)("Label Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl",children:[(0,n.jsx)(g.PanelRow,{className:"labelInfo_row",children:(0,n.jsx)(g.TextControl,{label:(0,t.__)("Text of Label","block-collections"),labelPosition:"top",value:i,isPressEnterToChange:!0,onChange:l=>e.onChange("labelContent",l)})}),(0,n.jsx)("label",{children:y?(0,t.__)("Label Alignment(mobile)","block-collections"):(0,t.__)("Label Alignment(desk top)","block-collections")}),(0,n.jsx)(g.AlignmentMatrixControl,{label:y?(0,t.__)("Label Alignment(mobile)","block-collections"):(0,t.__)("Label Alignment(desk top)","block-collections"),value:y?s.labelPos:a.labelPos,onChange:l=>{y?e.onChange("mobile_pos",{...s,labelPos:l}):e.onChange("default_pos",{...a,labelPos:l})}}),(0,n.jsx)("label",{children:(0,t.__)("Selecting the center vertically or horizontally will hide it.","block-collections")})]})]}),(0,n.jsx)(u.InspectorControls,{group:"styles",children:(0,n.jsxs)(g.PanelBody,{title:(0,t.__)("Label style settings","block-collections"),initialOpen:!1,className:"title_design_ctrl",children:[(0,n.jsx)(b.A,{title:(0,t.__)("Typography","block-collections"),fontStyle:r,onChange:l=>{e.onChange("font_style_label",l)},isMobile:y,initialOpen:!1}),(0,n.jsx)(u.__experimentalPanelColorGradientSettings,{title:(0,t.__)("Label Color Setting","block-collections"),settings:[{colorValue:p,label:(0,t.__)("Choose Text color","block-collections"),onColorChange:l=>e.onChange("textColor_label",l)},{colorValue:c,gradientValue:d,label:(0,t.__)("Choose Background color","block-collections"),onColorChange:l=>e.onChange("bgColor_label",l),onGradientChange:l=>e.onChange("bgGradient_label",l)}]}),(0,n.jsxs)(g.PanelBody,{title:(0,t.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl",children:[(0,n.jsx)(g.BorderBoxControl,{onChange:l=>e.onChange("border_label",l),value:C,allowReset:!0,resetValues:x}),(0,n.jsx)(u.__experimentalBorderRadiusControl,{values:_,onChange:l=>e.onChange("radius_label","string"==typeof l?{value:l}:l)})]}),(0,n.jsx)(g.BoxControl,{label:(0,t.__)("Padding settings","block-collections"),values:v,onChange:l=>e.onChange("padding_label",l),units:f,allowReset:!0,resetValues:m}),(0,n.jsx)(g.__experimentalUnitControl,{dragDirection:"e",onChange:l=>e.onChange("labelSpace",l),label:(0,t.__)("Spacing with textbox","block-collections"),value:k})]})}),(0,n.jsx)(h,{attributes:l,children:o.flg?(0,n.jsxs)(n.Fragment,{children:[i,(0,n.jsxs)("span",{children:["(",o.display,")"]})]}):i})]})}function v(e){const{optionValues:l}=e,[o,i]=(0,c.useState)(!1),[a,s]=(0,c.useState)(null),[r,d]=(0,c.useState)(!1),[p,b]=(0,c.useState)(null),u=()=>i(!0),h=()=>i(!1),_=()=>{d(!1),b(null)},m=(e,l)=>{s(o=>({...o,[e]:l}))};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(g.Button,{label:(0,t.__)("add","block-collections"),icon:"insert",onClick:()=>{const e=((e=21)=>{let l="",o=crypto.getRandomValues(new Uint8Array(e|=0));for(;e--;)l+="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[63&o[e]];return l})(5);s({id:e,value:"",label:"",classname:""}),u()}}),l.map(e=>(0,n.jsx)(g.Notice,{status:"info",onRemove:()=>(e=>{b(e),d(!0)})(e),children:(0,n.jsx)("span",{onClick:()=>(e=>{s(e),u()})(e),children:e.label})},e.id)),o&&(0,n.jsxs)(g.Modal,{title:(0,t.__)("Option Info Edit","block-collections"),onRequestClose:h,children:[(0,n.jsx)(g.TextControl,{label:(0,t.__)("Display Label","block-collections"),value:a.label,onChange:e=>m("label",e)}),(0,n.jsx)(g.TextControl,{label:(0,t.__)("Option Value","block-collections"),value:a.value,onChange:e=>m("value",e)}),(0,n.jsx)(g.TextControl,{label:(0,t.__)("Class Name","block-collections"),value:a.classname,onChange:e=>m("classname",e)}),(0,n.jsx)(g.Button,{variant:"primary",onClick:()=>{if(a&&l.some(e=>e.id===a.id)){const o=l.map(e=>e.id===a.id?a:e);e.onUpdateOption(o)}else e.onAddOption(a);h()},children:(0,t.__)("Save Changes","block-collections")})]}),r&&(0,n.jsxs)(g.Modal,{title:(0,t.__)("Confirm Deletion","block-collections"),onRequestClose:_,children:[(0,n.jsx)("p",{children:(0,t.__)("Are you sure you want to delete this item?","block-collections")}),(0,n.jsx)(g.Button,{variant:"primary",onClick:()=>{p&&(o=>{const t=l.filter(e=>e.id!==o);e.onUpdateOption(t)})(p.id),_()},children:(0,t.__)("Yes, Delete","block-collections")}),(0,n.jsx)(g.Button,{variant:"secondary",onClick:_,children:(0,t.__)("Cancel","block-collections")})]})]})}var k=o(1451),y=o(9435);const j={top:"10px",left:"10px",right:"10px",bottom:"10px"},w={top:"0px",left:"0px",right:"0px",bottom:"0px"},S=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function $({attributes:e,setAttributes:l,context:o}){const{inputName:a,selPattern:r,selectValues:h,selectedValues:_,isSetSelect:m,folder_val:x,required:f,bgColor:$,optionColor:P,hoverBgColor:B,font_style_option:N,default_pos:R,mobile_pos:V,bgSelectColor:z,bgSelectGradient:A,radius_value:O,border_value:T,shadow_element:G,is_shadow:M,className:I}=e,q=(0,k.yJ)(),E=(0,c.useRef)(null),[F,L]=(0,c.useState)(null),D=(0,c.useCallback)(e=>{L(e?.ownerDocument.head??null)},[]),H=(0,p.useMergeRefs)([E,D]),U=(0,u.useBlockProps)({ref:H,style:{backgroundColor:$}}),W=(0,k.pL)(E,U.style);(0,c.useEffect)(()=>{if(W){l({shadow_element:{...G,baseColor:W}});const e=(0,y.b)({...G,baseColor:W});e&&l({shadow_result:e.style})}},[W]);const Y="multi"===r?{multiple:!0}:{},J=o["itmar/label_width"]||"auto";return(0,c.useEffect)(()=>{l({labelWidth:J})},[J]),(0,c.useEffect)(()=>{l({selectedValues:[]})},[r]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u.InspectorControls,{group:"settings",children:(0,n.jsxs)(g.PanelBody,{title:(0,t.__)("Select Element Settings","block-collections"),initialOpen:!0,className:"select_design_ctrl",children:[(0,n.jsx)(g.PanelRow,{children:(0,n.jsx)(g.TextControl,{label:(0,t.__)("name attribute name","block-collections"),value:a,onChange:e=>l({inputName:e})})}),(0,n.jsx)("label",{className:"components-base-control__label",children:(0,t.__)("Select Pattern","block-collections")}),(0,n.jsx)(g.PanelRow,{className:"itmar_select_row",children:(0,n.jsx)(g.RadioControl,{selected:r,options:[{label:(0,t.__)("Single Select","block-collections"),value:"single"},{label:(0,t.__)("Nulti Select","block-collections"),value:"multi"}],onChange:e=>{l({selPattern:e})}})}),(0,n.jsx)(g.TextControl,{label:(0,t.__)("Place Folder Display","block-collections"),value:x,onChange:e=>l({folder_val:e})}),m&&(0,n.jsx)(g.PanelBody,{className:"itmar_notice_select_panel",title:(0,t.__)("Option info Setting","block-collections"),children:(0,n.jsx)(v,{optionValues:h,onAddOption:e=>{l({selectValues:[...h,e]})},onUpdateOption:e=>{l({selectValues:e})}})})]})}),(0,n.jsxs)(u.InspectorControls,{group:"styles",children:[(0,n.jsxs)(g.PanelBody,{title:(0,t.__)("Global settings","block-collections"),initialOpen:!1,className:"select_design_ctrl",children:[(0,n.jsx)(u.__experimentalPanelColorGradientSettings,{title:(0,t.__)("Background Color Setting","block-collections"),settings:[{colorValue:$,label:(0,t.__)("Choose Block Background color","block-collections"),onColorChange:e=>l({bgColor:e})},{colorValue:z,gradientValue:A,label:(0,t.__)("Choose Select Background color","block-collections"),onColorChange:e=>{l({bgSelectColor:void 0===e?"":e})},onGradientChange:e=>l({bgSelectGradient:e})}]}),(0,n.jsx)(g.BoxControl,{label:q?(0,t.__)("Margin settings(mobile)","block-collections"):(0,t.__)("Margin settings(desk top)","block-collections"),values:q?V.margin_value:R.margin_value,onChange:e=>{l(q?{mobile_pos:{...V,margin_value:e}}:{default_pos:{...R,margin_value:e}})},units:S,allowReset:!0,resetValues:j}),(0,n.jsx)(g.BoxControl,{label:q?(0,t.__)("Padding settings(mobile)","block-collections"):(0,t.__)("Padding settings(desk top)","block-collections"),values:q?V.padding_value:R.padding_value,onChange:e=>{l(q?{mobile_pos:{...V,padding_value:e}}:{default_pos:{...R,padding_value:e}})},units:S,allowReset:!0,resetValues:j}),(0,n.jsxs)(g.PanelBody,{title:(0,t.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl",children:[(0,n.jsx)(g.BorderBoxControl,{colors:[{color:"#72aee6"},{color:"#000"},{color:"#fff"}],onChange:e=>l({border_value:e}),value:T,allowReset:!0,resetValues:w}),(0,n.jsx)(u.__experimentalBorderRadiusControl,{values:O,onChange:e=>l({radius_value:"string"==typeof e?{value:e}:e})})]}),(0,n.jsx)(g.ToggleControl,{label:(0,t.__)("Is Shadow","block-collections"),checked:M,onChange:e=>{l({is_shadow:e})}}),M&&(0,n.jsx)(y.A,{shadowStyle:{...G},onChange:(e,o)=>{l({shadow_result:e.style}),l({shadow_element:o})}})]}),(0,n.jsxs)(g.PanelBody,{title:(0,t.__)("Option Style Settings","block-collections"),initialOpen:!1,className:"select_design_ctrl",children:[(0,n.jsx)(b.A,{title:(0,t.__)("Typography","block-collections"),fontStyle:N,onChange:e=>{l({font_style_option:e})},isMobile:q,initialOpen:!1}),(0,n.jsx)(u.__experimentalPanelColorGradientSettings,{title:(0,t.__)("Option Color Setting","block-collections"),settings:[{colorValue:P,label:(0,t.__)("Choose Text color","block-collections"),onColorChange:e=>l({optionColor:e})},{colorValue:B,label:(0,t.__)("Choose Background color on mouse hover","block-collections"),onColorChange:e=>l({hoverBgColor:e})}]})]})]}),(0,n.jsx)("div",{...U,children:(0,n.jsx)(i.ID,{target:F??void 0,children:(0,n.jsx)(s,{attributes:e,children:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(d,{onOptionSelect:e=>{if(null==e)return void l({selectedValues:[]});if(_.includes(e))return;const o="multi"===r?[..._,e]:[e];l({selectedValues:o})},onOptionDeselect:e=>{const o=_.filter(l=>l!==e);l({selectedValues:o})},children:(0,n.jsxs)("select",{className:"nomal",...Y,name:a,"data-placeholder":x,children:["single"===r&&(0,n.jsx)("option",{value:"",children:(0,t.__)("Please Select.","block-collections")}),h.map(e=>(0,n.jsx)("option",{id:e.id,className:e.classname,value:e.value,selected:_.includes(e.id),children:e.label}))]})}),(0,n.jsx)(C,{attributes:{...e,isMobile:q},onChange:(e,o)=>l({[e]:o})})]})})})})]})}}}]);