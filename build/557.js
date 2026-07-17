"use strict";(globalThis.webpackChunkblock_collections=globalThis.webpackChunkblock_collections||[]).push([[557],{1557(e,l,t){t.r(l),t.d(l,{default:()=>I});var o=t(7723),n=t(9716);const a=e=>e.charAt(0).toUpperCase()+e.slice(1),i=e=>e?(1===Object.keys(e).length&&e.value?e.value:`${e.topLeft||""} ${e.topRight||""} ${e.bottomRight||""} ${e.bottomLeft||""}`).trim():"",s=e=>{if(!e)return"";const{top:l="0",right:t="0",bottom:o="0",left:n="0"}=e;return`${l} ${t} ${o} ${n}`},r=e=>{let l="";for(const t in e)e.hasOwnProperty(t)&&(l+=`${t.replace(/([A-Z])/g,"-$1").toLowerCase()}: ${e[t]};\n`);return l},c=e=>{if(!e)return null;if(["top","bottom","left","right"].some(l=>l in e)){const l={};for(const t in e){const o=e[t];if(String(o?.width||"").startsWith("0"))continue;const n=o?.style||"solid";l[`border${a(t)}`]=`${o.width} ${n} ${o.color}`}return Object.keys(l).length>0?l:null}{if(String(e.width||"").startsWith("0"))return null;const l=e.style||"solid";return{border:`${e.width} ${l} ${e.color}`}}};var d=t(790);const p=({attributes:e,children:l})=>(0,d.jsx)(b,{$attr:e,children:l}),b=n.Ay.div`
	${({$attr:e})=>{const{optionColor:l,hoverBgColor:t,font_style_option:o,default_pos:a,mobile_pos:d,bgSelectColor:p,bgSelectGradient:b,radius_value:u,border_value:g,shadow_result:m,is_shadow:h,className:x}=e,_=p||b,f=o.isItalic?"italic":"normal",C=i(u),v=s(a.margin_value),y=s(a.padding_value),k=s(d.margin_value),$=s(d.padding_value),j=h&&m?r(m):"",w={"top left":"display: flex;flex-direction: column-reverse;align-items: flex-start;","top center":"display: flex;flex-direction: column-reverse;align-items: center;","top right":"display: flex;flex-direction: column-reverse;align-items: flex-end;","center left":"display: flex;flex-direction: row-reverse;align-items: center;","center center":"label{display: none;}","center right":"display: flex;align-items: center;","bottom left":"display: flex;flex-direction: column;align-items: flex-start;","bottom center":"display: flex;flex-direction: column;align-items: center;","bottom right":"display: flex;flex-direction: column;align-items: flex-end;"},S=n.AH`
			margin: ${v};
			padding: ${y};
			position: relative;
			${w[a.labelPos]}
			@media (max-width: 767px) {
				margin: ${k};
				padding: ${$};
				${w[d.labelPos]}
			}
			.itmar_block_select {
				position: relative;
				font-size: ${o.default_fontSize};
				font-family: ${o.fontFamily};
				font-weight: ${o.fontWeight};
				font-style: ${f};
				color: ${l};
				@media (max-width: 767px) {
					font-size: ${o.mobile_fontSize};
				}

				& > div {
					position: relative;
					background: ${_};
					border-radius: ${C};
					${c(g)};
					${j};
					z-index: 2;
					padding: 0.8em 3em 0.8em 1.2em;
					border-radius: 8px;
					font-size: ${o.default_fontSize};
					min-height: 2.2em;
					@media (max-width: 767px) {
						font-size: ${o.mobile_fontSize};
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
							font-style: ${f};
						}

						&:before {
							content: "";
							left: 0;
							top: 0;
							bottom: 6px;
							width: 100%;
							position: absolute;
							display: block;
							background: ${t};
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
						font-size: ${o.default_fontSize};
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
							font-size: ${o.mobile_fontSize};
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
							background: ${t};
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
		`;return n.AH`
			${S}
		`}}
`;var u=t(1609),g=t(6087);function m({onOptionSelect:e,onOptionDeselect:l,children:t}){const o=t.props.multiple,n=o?"itmar_block_selectMultiple":"itmar_block_selectSingle",a=t.props["data-placeholder"],[i,s]=(0,g.useState)(!1),r=(0,g.useRef)(null),c=(0,g.useCallback)(l=>{e(l)},[t,e]),p=(0,g.useCallback)((e,t)=>{t.stopPropagation(),l(e)},[t,l]),b=u.Children.toArray(t.props.children).map((e,l)=>{if(!u.isValidElement(e)||"option"!==e.type)return null;const t=e;return t.props.selected?(0,d.jsxs)("a",{id:String(t.props.id??""),"data-value":t.props.value,onClick:o?e=>p(t.props.id,e):void 0,children:[(0,d.jsx)("em",{className:t.props.className,children:t.props.children}),(0,d.jsx)("i",{})]},l):(0,d.jsx)("li",{id:String(t.props.id??""),"data-value":t.props.value,className:t.props.className,onClick:()=>c(t.props.id),children:t.props.children},l)}),m=b.filter(e=>u.isValidElement(e)&&"li"===e.type),h=b.filter(e=>u.isValidElement(e)&&"a"===e.type);return(0,d.jsxs)("div",{className:`itmar_block_select ${n} ${i?"open":""}`,tabIndex:0,onBlur:e=>{r.current&&!r.current.contains(e.relatedTarget)&&s(!1)},ref:r,children:[(0,d.jsxs)("div",{onClick:()=>{s(!i)},children:[(0,d.jsxs)("span",{className:h.length>0?"hide":"",children:[a,t]}),h,(0,d.jsx)("div",{className:"itmar_block_opener"})]}),(0,d.jsx)("ul",{children:m})]})}var h=t(9491),x=t(6427),_=t(5456);const f=({title:e,fontStyle:l,initialOpen:t=!0,isMobile:n,onChange:a})=>{const{default_fontSize:i,mobile_fontSize:s,fontFamily:r,fontWeight:c,isItalic:p}=l,b=[{value:"Arial, sans-serif",label:"Arial",fontFamily:"Arial, sans-serif"},{value:"Courier New, monospace",label:"Courier New",fontFamily:"Courier New, monospace"},{value:"Georgia, serif",label:"Georgia",fontFamily:"Georgia, serif"},{label:"Noto Sans JP",value:"Noto Sans JP, sans-serif",fontFamily:"Noto Sans JP, sans-serif"},{label:"Texturina",value:"Texturina, serif",fontFamily:"Texturina, serif"}],u={option:(e,l)=>({...e,fontFamily:l.data.fontFamily})};return(0,d.jsxs)(x.PanelBody,{title:e,initialOpen:t,children:[(0,d.jsx)(x.__experimentalUnitControl,{label:n?(0,o.__)("Size(mobile)","block-collections"):(0,o.__)("Size(desktop)","block-collections"),value:n?s:i,units:[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}],onChange:e=>{const t=void 0!==e&&""!==e?e:"0px",o=n?{mobile_fontSize:t}:{default_fontSize:t};a({...l,...o})}}),(0,d.jsx)(({label:e,value:l,onSelectChange:t})=>(0,d.jsxs)(d.Fragment,{children:[e&&(0,d.jsx)("label",{className:"components-base-control__label",children:e}),(0,d.jsx)(_.A,{options:b,value:b.find(e=>e.value===l),onChange:e=>{t(e.value)},styles:u})]}),{label:(0,o.__)("font family","block-collections"),value:r,onSelectChange:e=>{a({...l,fontFamily:e})}}),(0,d.jsx)("label",{className:"components-base-control__label",children:(0,o.__)("font weight","block-collections")}),(0,d.jsx)(x.PanelRow,{className:"itmar_weight_row",children:(0,d.jsx)(x.RadioControl,{selected:c,options:[{label:"LIGHT",value:"300"},{label:"REGULAR",value:"400"},{label:"MEDIUM",value:"500"},{label:"S-BOLD",value:"600"},{label:"BOLD",value:"700"},{label:"BLACK",value:"900"}],onChange:e=>{const t={...l,fontWeight:e};a(t)}})}),(0,d.jsx)(x.ToggleControl,{label:(0,o.__)("Italic display","block-collections"),checked:p,onChange:e=>{a({...l,isItalic:e})}})]})};var C=t(4715);function v({attributes:e,children:l}){const{htmlFor:t,...o}=e;return(0,d.jsx)(y,{htmlFor:t,$attrs:o,children:l})}const y=n.Ay.label`
	${({$attrs:e})=>{const{font_style_label:l,bgColor_label:t,bgGradient_label:o,textColor_label:a,radius_label:d,border_label:p,padding_label:b,labelSpace:u,labelWidth:g,default_pos:m,mobile_pos:h,shadow_result:x,is_shadow:_,isMobile:f,className:C}=e,v=t||o,y=l.isItalic?"italic":"normal",k=i(d),$=s(b),j={"top left":"margin-bottom","top center":"margin-bottom","top right":"margin-bottom","center left":"margin-right","center right":"margin-left","bottom left":"margin-top","bottom center":"margin-top","bottom right":"margin-top"},w=`${j[m.labelPos]}: ${u};`,S=`${j[h.labelPos]}: ${u};`,R=_&&x?r(x):"",B=n.AH`
			white-space: nowrap;
			background: ${v};
			border-radius: ${k};
			color: ${a};
			font-size: ${l.default_fontSize};
			font-family: ${l.fontFamily};
			font-weight: ${l.fontWeight};
			font-style: ${y};
			padding: ${$};
			${c(p)};
			${R};
			@media (max-width: 767px) {
				font-size: ${l.mobile_fontSize};
			}
			span {
				color: var(--wp--preset--color--accent-1);
			}
		`;let N=null;const P=C?.split(" ").find(e=>e.startsWith("is-style"));return N="is-style-line"===P?n.AH`
					position: absolute;
					width: fit-content;
					opacity: 0;
					left: calc(2em + 10px);
					pointer-events: none;
					bottom: 15px;
					z-index: 1;
					transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s;
				`:n.AH`
					width: ${g};
					${w}
					@media (max-width: 767px) {
						${S}
					}
				`,n.AH`
			${B}
			${N}
		`}}
`,k={top:"10px",left:"10px",right:"10px",bottom:"10px"},$={top:"0px",left:"0px",right:"0px",bottom:"0px"},j=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function w(e){const{attributes:l}=e,{required:t,labelContent:n,default_pos:a,mobile_pos:i,font_style_label:s,bgColor_label:r,bgGradient_label:c,textColor_label:p,radius_label:b,border_label:u,padding_label:g,labelSpace:m,isMobile:h}=l;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(C.InspectorControls,{group:"settings",children:[(0,d.jsxs)(x.PanelBody,{title:(0,o.__)("Required Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl",children:[(0,d.jsx)(x.PanelRow,{className:"labelRequierd_row",children:(0,d.jsx)(x.ToggleControl,{label:(0,o.__)("Required input","block-collections"),checked:t.flg,onChange:l=>{const o={...t,flg:l};e.onChange("required",o)}})}),t.flg&&(0,d.jsx)(x.PanelRow,{children:(0,d.jsx)(x.TextControl,{label:(0,o.__)("Show 'required'","block-collections"),value:t.display,isPressEnterToChange:!0,onChange:l=>{const o={...t,display:l};e.onChange("required",o)}})})]}),(0,d.jsxs)(x.PanelBody,{title:(0,o.__)("Label Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl",children:[(0,d.jsx)(x.PanelRow,{className:"labelInfo_row",children:(0,d.jsx)(x.TextControl,{label:(0,o.__)("Text of Label","block-collections"),labelPosition:"top",value:n,isPressEnterToChange:!0,onChange:l=>e.onChange("labelContent",l)})}),(0,d.jsx)("label",{children:h?(0,o.__)("Label Alignment(mobile)","block-collections"):(0,o.__)("Label Alignment(desk top)","block-collections")}),(0,d.jsx)(x.AlignmentMatrixControl,{label:h?(0,o.__)("Label Alignment(mobile)","block-collections"):(0,o.__)("Label Alignment(desk top)","block-collections"),value:h?i.labelPos:a.labelPos,onChange:l=>{h?e.onChange("mobile_pos",{...i,labelPos:l}):e.onChange("default_pos",{...a,labelPos:l})}}),(0,d.jsx)("label",{children:(0,o.__)("Selecting the center vertically or horizontally will hide it.","block-collections")})]})]}),(0,d.jsx)(C.InspectorControls,{group:"styles",children:(0,d.jsxs)(x.PanelBody,{title:(0,o.__)("Label style settings","block-collections"),initialOpen:!1,className:"title_design_ctrl",children:[(0,d.jsx)(f,{title:(0,o.__)("Typography","block-collections"),fontStyle:s,onChange:l=>{e.onChange("font_style_label",l)},isMobile:h,initialOpen:!1}),(0,d.jsx)(C.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Label Color Setting","block-collections"),settings:[{colorValue:p,label:(0,o.__)("Choose Text color","block-collections"),onColorChange:l=>e.onChange("textColor_label",l)},{colorValue:r,gradientValue:c,label:(0,o.__)("Choose Background color","block-collections"),onColorChange:l=>e.onChange("bgColor_label",l),onGradientChange:l=>e.onChange("bgGradient_label",l)}]}),(0,d.jsxs)(x.PanelBody,{title:(0,o.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl",children:[(0,d.jsx)(x.BorderBoxControl,{onChange:l=>e.onChange("border_label",l),value:u,allowReset:!0,resetValues:$}),(0,d.jsx)(C.__experimentalBorderRadiusControl,{values:b,onChange:l=>{void 0!==l&&e.onChange("radius_label","string"==typeof l?{value:l}:l)}})]}),(0,d.jsx)(x.BoxControl,{label:(0,o.__)("Padding settings","block-collections"),values:g,onChange:l=>e.onChange("padding_label",l),units:j,allowReset:!0,resetValues:k}),(0,d.jsx)(x.__experimentalUnitControl,{dragDirection:"e",onChange:l=>e.onChange("labelSpace",l),label:(0,o.__)("Spacing with textbox","block-collections"),value:m})]})}),(0,d.jsx)(v,{attributes:l,children:t.flg?(0,d.jsxs)(d.Fragment,{children:[n,(0,d.jsxs)("span",{children:["(",t.display,")"]})]}):n})]})}function S({optionValues:e,onAddOption:l,onUpdateOption:t}){const[n,a]=(0,g.useState)(!1),[i,s]=(0,g.useState)(null),[r,c]=(0,g.useState)(!1),[p,b]=(0,g.useState)(null),u=()=>a(!0),m=()=>a(!1),h=()=>{c(!1),b(null)},_=(e,l)=>{s(t=>t?{...t,[e]:l}:t)};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(x.Button,{label:(0,o.__)("add","block-collections"),icon:"insert",onClick:()=>{const e=((e=21)=>{let l="",t=crypto.getRandomValues(new Uint8Array(e|=0));for(;e--;)l+="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[63&t[e]];return l})(5);s({id:e,value:"",label:"",classname:""}),u()}}),e.map(e=>(0,d.jsx)(x.Notice,{status:"info",onRemove:()=>(e=>{b(e),c(!0)})(e),children:(0,d.jsx)("span",{onClick:()=>(e=>{s(e),u()})(e),children:e.label})},e.id)),n&&i&&(0,d.jsxs)(x.Modal,{title:(0,o.__)("Option Info Edit","block-collections"),onRequestClose:m,children:[(0,d.jsx)(x.TextControl,{label:(0,o.__)("Display Label","block-collections"),value:i.label,onChange:e=>_("label",e)}),(0,d.jsx)(x.TextControl,{label:(0,o.__)("Option Value","block-collections"),value:i.value,onChange:e=>_("value",e)}),(0,d.jsx)(x.TextControl,{label:(0,o.__)("Class Name","block-collections"),value:i.classname??"",onChange:e=>_("classname",e)}),(0,d.jsx)(x.Button,{variant:"primary",onClick:()=>{if(i){if(e.some(e=>e.id===i.id)){const l=e.map(e=>e.id===i.id?i:e);t(l)}else l(i);m()}},children:(0,o.__)("Save Changes","block-collections")})]}),r&&(0,d.jsxs)(x.Modal,{title:(0,o.__)("Confirm Deletion","block-collections"),onRequestClose:h,children:[(0,d.jsx)("p",{children:(0,o.__)("Are you sure you want to delete this item?","block-collections")}),(0,d.jsx)(x.Button,{variant:"primary",onClick:()=>{p&&(l=>{const o=e.filter(e=>e.id!==l);t(o)})(p.id),h()},children:(0,o.__)("Yes, Delete","block-collections")}),(0,d.jsx)(x.Button,{variant:"secondary",onClick:h,children:(0,o.__)("Cancel","block-collections")})]})]})}var R=t(7143);t(689),t(5795);const B=e=>{const l=e=>{const l=parseInt(String(e),10).toString(16);return 1===l.length?"0"+l:l};if(!e)return["ff","ff","ff"];let t;if(/^#[0-9a-fA-F]{6}$/.test(e))t=[e.slice(1,3),e.slice(3,5),e.slice(5,7)];else{const o=e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);t=o?[l(o[1]),l(o[2]),l(o[3])]:["ff","ff","ff"]}return t};function N(e,l,t){const o=Number(e),n=Number(l),a=Number(t);if(o>=0&&o<=360&&n>=0&&n<=100&&a>=0&&a<=100){let e=0,l=0,t=0;const i=o/360,s=n/100,r=a/100;if(0===s)e=l=t=r;else{const o=(e,l,t)=>(t<0&&(t+=1),t>1&&(t-=1),t<1/6?e+6*(l-e)*t:t<.5?l:t<2/3?e+(l-e)*(2/3-t)*6:e),n=r<.5?r*(1+s):r+s-r*s,a=2*r-n;e=o(a,n,i+1/3),l=o(a,n,i),t=o(a,n,i-1/3)}const c=e=>Math.round(255*e).toString(16).padStart(2,"0");return`#${c(e)}${c(l)}${c(t)}`}return!1}const P=(e,l)=>{let t=0,o=0,n=0,a=0;switch(e){case"top_left":t=l,o=l,n=-1*l,a=-1*l;break;case"top_right":t=-1*l,o=l,n=l,a=-1*l;break;case"bottom_left":case"right_bottom":t=l,o=-1*l,n=-1*l,a=l;break;case"bottom_right":t=-1*l,o=-1*l,n=l,a=l;break;case"top":t=0,o=0,n=-1*l,a=l}return{topLeft:t,topRight:o,bottomLeft:n,bottomRight:a}};function O(e){return"string"==typeof e&&(e.includes("linear-gradient")||e.includes("radial-gradient"))}const L=e=>{const{shadowType:l,spread:t,lateral:n,longitude:a,nomalBlur:i,shadowColor:s,blur:r,intensity:c,distance:d,newDirection:p,clayDirection:b,embos:u,opacity:g,depth:m,bdBlur:h,expand:x,glassblur:_,glassopa:f,hasOutline:C,baseColor:v}=e;if("nomal"===l)return"dent"===u?{style:{boxShadow:`${n}px ${a}px ${i}px ${t}px transparent, inset ${n}px ${a}px ${i}px ${t}px ${s}`}}:{style:{boxShadow:`${n}px ${a}px ${i}px ${t}px ${s}, inset ${n}px ${a}px ${i}px ${t}px transparent`}};if("newmor"===l){if(O(v))return(0,R.dispatch)("core/notices").createNotice("error",(0,o.__)("Neumorphism cannot be set when the background color is a gradient.","itmar_guest_contact_block"),{type:"snackbar",isDismissible:!0}),null;const e=function(e){const l=B(e),[t,o,n]=l,a=/^[0-9a-f]{2}$/i;if(a.test(t)&&a.test(o)&&a.test(n)){let e=0,l=0;const a=parseInt(t,16)/255,i=parseInt(o,16)/255,s=parseInt(n,16)/255,r=Math.max(a,i,s),c=Math.min(a,i,s),d=(r+c)/2;if(r!==c){const t=r-c;l=d>.5?t/(2-r-c):t/(r+c),e=r===a?(i-s)/t+(i<s?6:0):r===i?(s-a)/t+2:(a-i)/t+4,e/=6}return{hue:Math.round(360*e),saturation:Math.round(100*l),lightness:Math.round(100*d)}}return!1}(v);if(!e)return null;const l=Math.min(e.lightness+c,100),t=Math.max(e.lightness-c,0),n=N(e.hue,e.saturation,l),a=N(e.hue,e.saturation,t),i=P(p,d);return{style:{border:"none",background:v,boxShadow:"swell"===u?`${i.topLeft}px ${i.topRight}px ${r}px ${a}, ${i.bottomLeft}px ${i.bottomRight}px ${r}px ${n}, inset ${i.topLeft}px ${i.topRight}px ${r}px transparent, inset ${i.bottomLeft}px ${i.bottomRight}px ${r}px transparent`:`${i.topLeft}px ${i.topRight}px ${r}px transparent, ${i.bottomLeft}px ${i.bottomRight}px ${r}px transparent, inset ${i.topLeft}px ${i.topRight}px ${r}px ${a}, inset ${i.bottomLeft}px ${i.bottomRight}px ${r}px ${n}`}}}if("claymor"===l){if(O(v))return(0,R.dispatch)("core/notices").createNotice("error",(0,o.__)("claymorphism cannot be set when the background color is a gradient.","itmar_guest_contact_block"),{type:"snackbar",isDismissible:!0}),null;const e=function(e){const[l,t,o]=B(e),n=/^[0-9a-f]{2}$/i;return!!(n.test(l)&&n.test(t)&&n.test(o))&&{red:parseInt(l,16),green:parseInt(t,16),blue:parseInt(o,16)}}(v);if(!e)return null;const l=P(b,x),t=P(b,m);return{style:{background:`rgba(255, 255, 255, ${g})`,backdropFilter:`blur(${h}px)`,border:"none",boxShadow:`${l.topLeft}px ${l.bottomRight}px ${2*x}px 0px rgba(${e.red}, ${e.green}, ${e.blue}, 0.5), inset ${t.topRight}px ${t.bottomLeft}px 16px 0px rgba(${e.red}, ${e.green}, ${e.blue}, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)`}}}return"glassmor"===l?{style:{backgroundColor:`rgba(255, 255, 255, ${f})`,...C?{border:"1px solid rgba(255, 255, 255, 0.4)"}:{},borderRightColor:"rgba(255, 255, 255, 0.2)",borderBottomColor:"rgba(255, 255, 255, 0.2)",backdropFilter:`blur(${_}px)`,boxShadow:"swell"===u?"0 8px 12px 0 rgba( 31, 38, 135, 0.37 ), inset 0 8px 12px 0 transparent":"0 8px 12px 0 transparent, inset 0 8px 12px 0 rgba( 31, 38, 135, 0.37 )"}}:null},z=({shadowStyle:e,onChange:l})=>{const[t,n]=(0,g.useState)(e),{shadowType:a,spread:i,lateral:s,longitude:r,nomalBlur:c,shadowColor:p,blur:b,intensity:u,distance:m,newDirection:h,clayDirection:_,embos:f,opacity:v,depth:y,bdBlur:k,expand:$,glassblur:j,glassopa:w,hasOutline:S}=t;(0,g.useEffect)(()=>{const e=L(t);e&&l(e,t)},[t]);const R=e=>{n(l=>({...l,...e}))};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(x.PanelBody,{title:(0,o.__)("Shadow Type","block-collections"),initialOpen:!0,children:[(0,d.jsx)("div",{className:"itmar_shadow_type",children:(0,d.jsx)(x.RadioControl,{selected:a,options:[{label:(0,o.__)("Normal","block-collections"),value:"nomal"},{label:(0,o.__)("Neumorphism","block-collections"),value:"newmor"},{label:(0,o.__)("Claymorphism","block-collections"),value:"claymor"},{label:(0,o.__)("Glassmorphism","block-collections"),value:"glassmor"}],onChange:e=>R({shadowType:e})})}),"claymor"!==a&&(0,d.jsx)("div",{className:"embos",children:(0,d.jsx)(x.RadioControl,{label:(0,o.__)("unevenness","block-collections"),selected:f,options:[{label:"Swell",value:"swell"},{label:"Dent",value:"dent"}],onChange:e=>R({embos:e})})})]}),"nomal"===a&&(0,d.jsxs)(x.PanelBody,{title:(0,o.__)("Normal settings","block-collections"),initialOpen:!1,children:[(0,d.jsx)(x.RangeControl,{value:i,label:(0,o.__)("Spread","block-collections"),max:50,min:0,onChange:e=>R({spread:e??0})}),(0,d.jsx)(x.RangeControl,{value:s,label:(0,o.__)("Lateral direction","block-collections"),max:50,min:0,onChange:e=>R({lateral:e??0})}),(0,d.jsx)(x.RangeControl,{value:r,label:(0,o.__)("Longitudinal direction","block-collections"),max:50,min:0,onChange:e=>R({longitude:e??0})}),(0,d.jsx)(x.RangeControl,{value:c,label:(0,o.__)("Blur","block-collections"),max:20,min:0,onChange:e=>R({nomalBlur:e??0})}),(0,d.jsx)(C.PanelColorSettings,{title:(0,o.__)("Shadow Color Setting","block-collections"),colorSettings:[{value:p,label:(0,o.__)("Choose Shadow color","block-collections"),onChange:e=>R({shadowColor:e||""})}]})]}),"newmor"===a&&(0,d.jsxs)(x.PanelBody,{title:(0,o.__)("Neumorphism settings","block-collections"),initialOpen:!1,children:[(0,d.jsx)(x.RangeControl,{value:m,label:(0,o.__)("Distance","block-collections"),max:50,min:0,onChange:e=>R({distance:e??0})}),(0,d.jsx)(x.RangeControl,{value:u,label:(0,o.__)("Intensity","block-collections"),max:100,min:0,onChange:e=>R({intensity:e??0})}),(0,d.jsx)(x.RangeControl,{value:b,label:(0,o.__)("Blur","block-collections"),max:20,min:0,onChange:e=>R({blur:e??0})}),(0,d.jsx)(x.PanelRow,{children:(0,d.jsx)("div",{className:"light_direction",children:(0,d.jsx)(x.RadioControl,{selected:h,options:[{label:"Top Left",value:"top_left"},{label:"Top Right",value:"top_right"},{label:"Bottom Left",value:"bottom_left"},{label:"Bottom Right",value:"bottom_right"}],onChange:e=>R({newDirection:e})})})})]}),"claymor"===a&&(0,d.jsxs)(x.PanelBody,{title:(0,o.__)("Claymorphism settings","block-collections"),initialOpen:!1,children:[(0,d.jsx)(x.RangeControl,{value:v,label:(0,o.__)("Opacity","block-collections"),max:1,min:0,step:.1,onChange:e=>R({opacity:e??1})}),(0,d.jsx)(x.RangeControl,{value:y,label:"Depth",max:20,min:0,onChange:e=>R({depth:e??0})}),(0,d.jsx)(x.RangeControl,{value:$,label:"Expand",max:50,min:0,onChange:e=>R({expand:e??0})}),(0,d.jsx)(x.RangeControl,{value:k,label:"Background Blur",max:10,min:0,onChange:e=>R({bdBlur:e??0})}),(0,d.jsx)("div",{className:"light_direction claymor",children:(0,d.jsx)(x.RadioControl,{selected:_,options:[{label:"Right Bottom",value:"right_bottom"},{label:"Top Right",value:"top_right"},{label:"Top",value:"top"}],onChange:e=>R({clayDirection:e})})})]}),"glassmor"===a&&(0,d.jsxs)(x.PanelBody,{title:(0,o.__)("Grassmophism settings","block-collections"),initialOpen:!1,children:[(0,d.jsx)(x.RangeControl,{value:j,label:(0,o.__)("Glass blur","block-collections"),max:20,min:0,onChange:e=>R({glassblur:e??0})}),(0,d.jsx)(x.RangeControl,{value:w,label:(0,o.__)("Glass Opacity","block-collections"),max:1,min:0,step:.1,onChange:e=>R({glassopa:e??.5})}),(0,d.jsx)(x.ToggleControl,{label:(0,o.__)("Show outline","block-collections"),checked:S,onChange:e=>R({hasOutline:e})})]})]})};new WeakMap;const T=e=>{const l={};for(const[t,o]of Object.entries(e))"string"!=typeof o&&"number"!=typeof o||(l[t]=o);return l},A={top:"10px",left:"10px",right:"10px",bottom:"10px"},V={top:"0px",left:"0px",right:"0px",bottom:"0px"},F=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function I({attributes:e,setAttributes:l,context:t}){const{inputName:a,selPattern:i,selectValues:s,selectedValues:r,isSetSelect:c,folder_val:b,required:u,bgColor:_,optionColor:v,hoverBgColor:y,font_style_option:k,default_pos:$,mobile_pos:j,bgSelectColor:R,bgSelectGradient:B,radius_value:N,border_value:P,shadow_element:O,is_shadow:I,className:M}=e,D=function(){const[e,l]=(0,g.useState)(!1);return(0,g.useEffect)(()=>{const e=()=>{const e=document.getElementsByName("editor-canvas")[0];e&&e.contentWindow&&l(e.contentWindow.innerWidth<=767)},t=document.getElementsByName("editor-canvas")[0];return t&&t.contentWindow&&t.contentWindow.addEventListener("resize",e),e(),()=>{t&&t.contentWindow&&t.contentWindow.removeEventListener("resize",e)}},[]),e}(),E=(0,g.useRef)(null),[G,W]=(0,g.useState)(null),q=(0,g.useCallback)(e=>{W(e?.ownerDocument.head??null)},[]),U=(0,h.useMergeRefs)([E,q]),H=(0,C.useBlockProps)({ref:U,style:{backgroundColor:_}}),J=function(e,l){const[t,o]=(0,g.useState)("");return(0,g.useEffect)(()=>{if(e.current&&l)if(l.backgroundColor&&!l.backgroundColor.startsWith("var(--wp"))o(l.backgroundColor);else if(e.current){const l=getComputedStyle(e.current);o(l.backgroundColor)}},[l,e]),t}(E,H.style);(0,g.useEffect)(()=>{if(J){l({shadow_element:{...O,baseColor:J}});const e=L({...O,baseColor:J});e&&l({shadow_result:T(e.style)})}},[J]);const Y="multi"===i?{multiple:!0}:{},K=(e,l)=>({...e,...Object.fromEntries(Object.entries(l).filter(e=>{const[,l]=e;return"string"==typeof l}))}),Z="string"==typeof t["itmar/label_width"]?t["itmar/label_width"]:"auto";return(0,g.useEffect)(()=>{l({labelWidth:Z})},[Z]),(0,g.useEffect)(()=>{l({selectedValues:[]})},[i]),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(C.InspectorControls,{group:"settings",children:(0,d.jsxs)(x.PanelBody,{title:(0,o.__)("Select Element Settings","block-collections"),initialOpen:!0,className:"select_design_ctrl",children:[(0,d.jsx)(x.PanelRow,{children:(0,d.jsx)(x.TextControl,{label:(0,o.__)("name attribute name","block-collections"),value:a,onChange:e=>l({inputName:e})})}),(0,d.jsx)("label",{className:"components-base-control__label",children:(0,o.__)("Select Pattern","block-collections")}),(0,d.jsx)(x.PanelRow,{className:"itmar_select_row",children:(0,d.jsx)(x.RadioControl,{selected:i,options:[{label:(0,o.__)("Single Select","block-collections"),value:"single"},{label:(0,o.__)("Nulti Select","block-collections"),value:"multi"}],onChange:e=>{"single"!==e&&"multi"!==e||l({selPattern:e})}})}),(0,d.jsx)(x.TextControl,{label:(0,o.__)("Place Folder Display","block-collections"),value:b,onChange:e=>l({folder_val:e})}),c&&(0,d.jsx)(x.PanelBody,{className:"itmar_notice_select_panel",title:(0,o.__)("Option info Setting","block-collections"),children:(0,d.jsx)(S,{optionValues:s,onAddOption:e=>{l({selectValues:[...s,e]})},onUpdateOption:e=>{l({selectValues:e})}})})]})}),(0,d.jsxs)(C.InspectorControls,{group:"styles",children:[(0,d.jsxs)(x.PanelBody,{title:(0,o.__)("Global settings","block-collections"),initialOpen:!1,className:"select_design_ctrl",children:[(0,d.jsx)(C.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Background Color Setting","block-collections"),settings:[{colorValue:_,label:(0,o.__)("Choose Block Background color","block-collections"),onColorChange:e=>l({bgColor:e??""})},{colorValue:R,gradientValue:B,label:(0,o.__)("Choose Select Background color","block-collections"),onColorChange:e=>{l({bgSelectColor:void 0===e?"":e})},onGradientChange:e=>l({bgSelectGradient:e})}]}),(0,d.jsx)(x.BoxControl,{label:D?(0,o.__)("Margin settings(mobile)","block-collections"):(0,o.__)("Margin settings(desk top)","block-collections"),values:D?j.margin_value:$.margin_value,onChange:e=>{l(D?{mobile_pos:{...j,margin_value:K(j.margin_value,e)}}:{default_pos:{...$,margin_value:K($.margin_value,e)}})},units:F,allowReset:!0,resetValues:A}),(0,d.jsx)(x.BoxControl,{label:D?(0,o.__)("Padding settings(mobile)","block-collections"):(0,o.__)("Padding settings(desk top)","block-collections"),values:D?j.padding_value:$.padding_value,onChange:e=>{l(D?{mobile_pos:{...j,padding_value:K(j.padding_value,e)}}:{default_pos:{...$,padding_value:K($.padding_value,e)}})},units:F,allowReset:!0,resetValues:A}),(0,d.jsxs)(x.PanelBody,{title:(0,o.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl",children:[(0,d.jsx)(x.BorderBoxControl,{colors:[{name:"Blue",color:"#72aee6"},{name:"Black",color:"#000"},{name:"White",color:"#fff"}],onChange:e=>l({border_value:e}),value:P,allowReset:!0,resetValues:V}),(0,d.jsx)(C.__experimentalBorderRadiusControl,{values:N,onChange:e=>{void 0!==e&&l({radius_value:"string"==typeof e?{value:e}:e})}})]}),(0,d.jsx)(x.ToggleControl,{label:(0,o.__)("Is Shadow","block-collections"),checked:I,onChange:e=>{l({is_shadow:e})}}),I&&(0,d.jsx)(z,{shadowStyle:O,onChange:(e,t)=>{l({shadow_result:T(e.style)}),l({shadow_element:t})}})]}),(0,d.jsxs)(x.PanelBody,{title:(0,o.__)("Option Style Settings","block-collections"),initialOpen:!1,className:"select_design_ctrl",children:[(0,d.jsx)(f,{title:(0,o.__)("Typography","block-collections"),fontStyle:k,onChange:e=>{l({font_style_option:e})},isMobile:D,initialOpen:!1}),(0,d.jsx)(C.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Option Color Setting","block-collections"),settings:[{colorValue:v,label:(0,o.__)("Choose Text color","block-collections"),onColorChange:e=>l({optionColor:e??""})},{colorValue:y,label:(0,o.__)("Choose Background color on mouse hover","block-collections"),onColorChange:e=>l({hoverBgColor:e??""})}]})]})]}),(0,d.jsx)("div",{...H,children:(0,d.jsx)(n.ID,{target:G??void 0,children:(0,d.jsx)(p,{attributes:e,children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(m,{onOptionSelect:e=>{if(null==e)return void l({selectedValues:[]});if(r.includes(e))return;const t="multi"===i?[...r,e]:[e];l({selectedValues:t})},onOptionDeselect:e=>{const t=r.filter(l=>l!==e);l({selectedValues:t})},children:(0,d.jsxs)("select",{className:"nomal",...Y,name:a,"data-placeholder":b,children:["single"===i&&(0,d.jsx)("option",{value:"",children:(0,o.__)("Please Select.","block-collections")}),s.map(e=>(0,d.jsx)("option",{id:String(e.id),className:e.classname,value:e.value,selected:r.includes(e.id),children:e.label}))]})}),(0,d.jsx)(w,{attributes:{...e,isMobile:D},onChange:(e,t)=>l({[e]:t})})]})})})})]})}}}]);