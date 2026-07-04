"use strict";(globalThis.webpackChunkblock_collections=globalThis.webpackChunkblock_collections||[]).push([[664],{4664(e,l,o){o.r(l),o.d(l,{default:()=>V});var t=o(7723),n=o(9716);const a=e=>e.charAt(0).toUpperCase()+e.slice(1),i=e=>e?(1===Object.keys(e).length&&e.value?e.value:`${e.topLeft||""} ${e.topRight||""} ${e.bottomRight||""} ${e.bottomLeft||""}`).trim():"",s=e=>{if(!e)return"";const{top:l="0",right:o="0",bottom:t="0",left:n="0"}=e;return`${l} ${o} ${t} ${n}`},r=e=>{let l="";for(const o in e)e.hasOwnProperty(o)&&(l+=`${o.replace(/([A-Z])/g,"-$1").toLowerCase()}: ${e[o]};\n`);return l},c=e=>{if(!e)return null;if(["top","bottom","left","right"].some(l=>l in e)){const l={};for(const o in e){const t=e[o];if(String(t?.width||"").startsWith("0"))continue;const n=t?.style||"solid";l[`border${a(o)}`]=`${t.width} ${n} ${t.color}`}return Object.keys(l).length>0?l:null}{if(String(e.width||"").startsWith("0"))return null;const l=e.style||"solid";return{border:`${e.width} ${l} ${e.color}`}}};var d=o(790);const p=({attributes:e,children:l})=>(0,d.jsx)(b,{attributes:e,children:l}),b=n.Ay.div`
	${({attributes:e})=>{const{optionColor:l,hoverBgColor:o,font_style_option:t,default_pos:a,mobile_pos:d,bgSelectColor:p,bgSelectGradient:b,radius_value:u,border_value:g,shadow_result:h,is_shadow:m,className:x}=e,_=p||b,f=t.isItalic?"italic":"normal",C=i(u),v=s(a.margin_value),y=s(a.padding_value),k=s(d.margin_value),$=s(d.padding_value),j=m&&h?r(h):"",w={"top left":"display: flex;flex-direction: column-reverse;align-items: flex-start;","top center":"display: flex;flex-direction: column-reverse;align-items: center;","top right":"display: flex;flex-direction: column-reverse;align-items: flex-end;","center left":"display: flex;flex-direction: row-reverse;align-items: center;","center center":"label{display: none;}","center right":"display: flex;align-items: center;","bottom left":"display: flex;flex-direction: column;align-items: flex-start;","bottom center":"display: flex;flex-direction: column;align-items: center;","bottom right":"display: flex;flex-direction: column;align-items: flex-end;"},S=n.AH`
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
				font-size: ${t.default_fontSize};
				font-family: ${t.fontFamily};
				font-weight: ${t.fontWeight};
				font-style: ${f};
				color: ${l};
				@media (max-width: 767px) {
					font-size: ${t.mobile_fontSize};
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
		`;return n.AH`
			${S}
		`}}
`;var u=o(6087);function g({onOptionSelect:e,onOptionDeselect:l,...o}){const t=o.children.props.multiple,n=t?"itmar_block_selectMultiple":"itmar_block_selectSingle",a=o.children.props["data-placeholder"],[i,s]=(0,u.useState)(!1),r=(0,u.useRef)(null),c=(0,u.useCallback)(l=>{e(l)},[o.children,e]),p=(0,u.useCallback)((e,o)=>{o.stopPropagation(),l(e)},[o.children,e]),b=React.Children.toArray(o.children.props.children).map((e,l)=>React.isValidElement(e)&&"option"===e.type?e.props.selected?(0,d.jsxs)("a",{id:e.props.id,"data-value":e.props.value,onClick:t?l=>p(e.props.id,l):void 0,children:[(0,d.jsx)("em",{className:e.props.className,children:e.props.children}),(0,d.jsx)("i",{})]},l):(0,d.jsx)("li",{id:e.props.id,"data-value":e.props.value,className:e.props.className,onClick:()=>c(e.props.id),children:e.props.children},l):null);let g=b.filter(e=>React.isValidElement(e)&&"li"===e.type),h=b.filter(e=>React.isValidElement(e)&&"a"===e.type);return(0,d.jsxs)("div",{className:`itmar_block_select ${n} ${i?"open":""}`,tabIndex:"0",onBlur:e=>{r.current.contains(e.relatedTarget)||s(!1)},ref:r,children:[(0,d.jsxs)("div",{onClick:()=>{s(!i)},children:[(0,d.jsxs)("span",{className:h.length>0?"hide":"",children:[a,o.children]}),h,(0,d.jsx)("div",{className:"itmar_block_opener"})]}),(0,d.jsx)("ul",{children:g})]})}var h=o(9491),m=o(6427),x=o(5456);const _=({title:e,fontStyle:l,initialOpen:o=!0,isMobile:n,onChange:a})=>{const{default_fontSize:i,mobile_fontSize:s,fontFamily:r,fontWeight:c,isItalic:p}=l,b=[{value:"Arial, sans-serif",label:"Arial",fontFamily:"Arial, sans-serif"},{value:"Courier New, monospace",label:"Courier New",fontFamily:"Courier New, monospace"},{value:"Georgia, serif",label:"Georgia",fontFamily:"Georgia, serif"},{label:"Noto Sans JP",value:"Noto Sans JP, sans-serif",fontFamily:"Noto Sans JP, sans-serif"},{label:"Texturina",value:"Texturina, serif",fontFamily:"Texturina, serif"}],u={option:(e,l)=>({...e,fontFamily:l.data.fontFamily})};return(0,d.jsxs)(m.PanelBody,{title:e,initialOpen:o,children:[(0,d.jsx)(m.__experimentalUnitControl,{label:n?(0,t.__)("Size(mobile)","block-collections"):(0,t.__)("Size(desktop)","block-collections"),value:n?s:i,units:[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}],onChange:e=>{const o=void 0!==e&&""!==e?e:"0px",t=n?{mobile_fontSize:o}:{default_fontSize:o};a({...l,...t})}}),(0,d.jsx)(({label:e,value:l,onSelectChange:o})=>(0,d.jsxs)(d.Fragment,{children:[e&&(0,d.jsx)("label",{className:"components-base-control__label",children:e}),(0,d.jsx)(x.Ay,{options:b,value:b.find(e=>e.value===l),onChange:e=>{o(e.value)},styles:u})]}),{label:(0,t.__)("font family","block-collections"),value:r,onSelectChange:e=>{a({...l,fontFamily:e})}}),(0,d.jsx)("label",{className:"components-base-control__label",children:(0,t.__)("font weight","block-collections")}),(0,d.jsx)(m.PanelRow,{className:"itmar_weight_row",children:(0,d.jsx)(m.RadioControl,{selected:c,options:[{label:"LIGHT",value:"300"},{label:"REGULAR",value:"400"},{label:"MEDIUM",value:"500"},{label:"S-BOLD",value:"600"},{label:"BOLD",value:"700"},{label:"BLACK",value:"900"}],onChange:e=>{const o={...l,fontWeight:e};a(o)}})}),(0,d.jsx)(m.ToggleControl,{label:(0,t.__)("Italic display","block-collections"),checked:p,onChange:e=>{a({...l,isItalic:e})}})]})};var f=o(4715);function C({attributes:e,children:l}){const{htmlFor:o,...t}=e;return(0,d.jsx)(v,{htmlFor:o,$attrs:t,children:l})}const v=n.Ay.label`
	${({$attrs:e})=>{const{font_style_label:l,bgColor_label:o,bgGradient_label:t,textColor_label:a,radius_label:d,border_label:p,padding_label:b,labelSpace:u,labelWidth:g,default_pos:h,mobile_pos:m,shadow_result:x,is_shadow:_,isMobile:f,className:C}=e,v=o||t,y=l.isItalic?"italic":"normal",k=i(d),$=s(b),j={"top left":"margin-bottom","top center":"margin-bottom","top right":"margin-bottom","center left":"margin-right","center right":"margin-left","bottom left":"margin-top","bottom center":"margin-top","bottom right":"margin-top"},w=`${j[h.labelPos]}: ${u};`,S=`${j[m.labelPos]}: ${u};`,R=_&&x?r(x):"",B=n.AH`
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
`,y={top:"10px",left:"10px",right:"10px",bottom:"10px"},k={top:"0px",left:"0px",right:"0px",bottom:"0px"},$=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function j(e){const{attributes:l}=e,{required:o,labelContent:n,default_pos:a,mobile_pos:i,font_style_label:s,bgColor_label:r,bgGradient_label:c,textColor_label:p,radius_label:b,border_label:u,padding_label:g,labelSpace:h,isMobile:x}=l;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(f.InspectorControls,{group:"settings",children:[(0,d.jsxs)(m.PanelBody,{title:(0,t.__)("Required Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl",children:[(0,d.jsx)(m.PanelRow,{className:"labelRequierd_row",children:(0,d.jsx)(m.ToggleControl,{label:(0,t.__)("Required input","block-collections"),checked:o.flg,onChange:l=>{const t={...o,flg:l};e.onChange("required",t)}})}),o.flg&&(0,d.jsx)(m.PanelRow,{children:(0,d.jsx)(m.TextControl,{label:(0,t.__)("Show 'required'","block-collections"),value:o.display,isPressEnterToChange:!0,onChange:l=>{const t={...o,display:l};e.onChange("required",t)}})})]}),(0,d.jsxs)(m.PanelBody,{title:(0,t.__)("Label Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl",children:[(0,d.jsx)(m.PanelRow,{className:"labelInfo_row",children:(0,d.jsx)(m.TextControl,{label:(0,t.__)("Text of Label","block-collections"),labelPosition:"top",value:n,isPressEnterToChange:!0,onChange:l=>e.onChange("labelContent",l)})}),(0,d.jsx)("label",{children:x?(0,t.__)("Label Alignment(mobile)","block-collections"):(0,t.__)("Label Alignment(desk top)","block-collections")}),(0,d.jsx)(m.AlignmentMatrixControl,{label:x?(0,t.__)("Label Alignment(mobile)","block-collections"):(0,t.__)("Label Alignment(desk top)","block-collections"),value:x?i.labelPos:a.labelPos,onChange:l=>{x?e.onChange("mobile_pos",{...i,labelPos:l}):e.onChange("default_pos",{...a,labelPos:l})}}),(0,d.jsx)("label",{children:(0,t.__)("Selecting the center vertically or horizontally will hide it.","block-collections")})]})]}),(0,d.jsx)(f.InspectorControls,{group:"styles",children:(0,d.jsxs)(m.PanelBody,{title:(0,t.__)("Label style settings","block-collections"),initialOpen:!1,className:"title_design_ctrl",children:[(0,d.jsx)(_,{title:(0,t.__)("Typography","block-collections"),fontStyle:s,onChange:l=>{e.onChange("font_style_label",l)},isMobile:x,initialOpen:!1}),(0,d.jsx)(f.__experimentalPanelColorGradientSettings,{title:(0,t.__)("Label Color Setting","block-collections"),settings:[{colorValue:p,label:(0,t.__)("Choose Text color","block-collections"),onColorChange:l=>e.onChange("textColor_label",l)},{colorValue:r,gradientValue:c,label:(0,t.__)("Choose Background color","block-collections"),onColorChange:l=>e.onChange("bgColor_label",l),onGradientChange:l=>e.onChange("bgGradient_label",l)}]}),(0,d.jsxs)(m.PanelBody,{title:(0,t.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl",children:[(0,d.jsx)(m.BorderBoxControl,{onChange:l=>e.onChange("border_label",l),value:u,allowReset:!0,resetValues:k}),(0,d.jsx)(f.__experimentalBorderRadiusControl,{values:b,onChange:l=>e.onChange("radius_label","string"==typeof l?{value:l}:l)})]}),(0,d.jsx)(m.BoxControl,{label:(0,t.__)("Padding settings","block-collections"),values:g,onChange:l=>e.onChange("padding_label",l),units:$,allowReset:!0,resetValues:y}),(0,d.jsx)(m.__experimentalUnitControl,{dragDirection:"e",onChange:l=>e.onChange("labelSpace",l),label:(0,t.__)("Spacing with textbox","block-collections"),value:h})]})}),(0,d.jsx)(C,{attributes:l,children:o.flg?(0,d.jsxs)(d.Fragment,{children:[n,(0,d.jsxs)("span",{children:["(",o.display,")"]})]}):n})]})}function w(e){const{optionValues:l}=e,[o,n]=(0,u.useState)(!1),[a,i]=(0,u.useState)(null),[s,r]=(0,u.useState)(!1),[c,p]=(0,u.useState)(null),b=()=>n(!0),g=()=>n(!1),h=()=>{r(!1),p(null)},x=(e,l)=>{i(o=>({...o,[e]:l}))};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(m.Button,{label:(0,t.__)("add","block-collections"),icon:"insert",onClick:()=>{const e=((e=21)=>{let l="",o=crypto.getRandomValues(new Uint8Array(e|=0));for(;e--;)l+="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[63&o[e]];return l})(5);i({id:e,value:"",label:"",classname:""}),b()}}),l.map(e=>(0,d.jsx)(m.Notice,{status:"info",onRemove:()=>(e=>{p(e),r(!0)})(e),children:(0,d.jsx)("span",{onClick:()=>(e=>{i(e),b()})(e),children:e.label})},e.id)),o&&(0,d.jsxs)(m.Modal,{title:(0,t.__)("Option Info Edit","block-collections"),onRequestClose:g,children:[(0,d.jsx)(m.TextControl,{label:(0,t.__)("Display Label","block-collections"),value:a.label,onChange:e=>x("label",e)}),(0,d.jsx)(m.TextControl,{label:(0,t.__)("Option Value","block-collections"),value:a.value,onChange:e=>x("value",e)}),(0,d.jsx)(m.TextControl,{label:(0,t.__)("Class Name","block-collections"),value:a.classname,onChange:e=>x("classname",e)}),(0,d.jsx)(m.Button,{variant:"primary",onClick:()=>{if(a&&l.some(e=>e.id===a.id)){const o=l.map(e=>e.id===a.id?a:e);e.onUpdateOption(o)}else e.onAddOption(a);g()},children:(0,t.__)("Save Changes","block-collections")})]}),s&&(0,d.jsxs)(m.Modal,{title:(0,t.__)("Confirm Deletion","block-collections"),onRequestClose:h,children:[(0,d.jsx)("p",{children:(0,t.__)("Are you sure you want to delete this item?","block-collections")}),(0,d.jsx)(m.Button,{variant:"primary",onClick:()=>{c&&(o=>{const t=l.filter(e=>e.id!==o);e.onUpdateOption(t)})(c.id),h()},children:(0,t.__)("Yes, Delete","block-collections")}),(0,d.jsx)(m.Button,{variant:"secondary",onClick:h,children:(0,t.__)("Cancel","block-collections")})]})]})}var S=o(7143);o(689),o(5795);const R=e=>{const l=e=>{const l=parseInt(String(e),10).toString(16);return 1===l.length?"0"+l:l};if(!e)return["ff","ff","ff"];let o;if(/^#[0-9a-fA-F]{6}$/.test(e))o=[e.slice(1,3),e.slice(3,5),e.slice(5,7)];else{const t=e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);o=t?[l(t[1]),l(t[2]),l(t[3])]:["ff","ff","ff"]}return o};function B(e,l,o){const t=Number(e),n=Number(l),a=Number(o);if(t>=0&&t<=360&&n>=0&&n<=100&&a>=0&&a<=100){let e=0,l=0,o=0;const i=t/360,s=n/100,r=a/100;if(0===s)e=l=o=r;else{const t=(e,l,o)=>(o<0&&(o+=1),o>1&&(o-=1),o<1/6?e+6*(l-e)*o:o<.5?l:o<2/3?e+(l-e)*(2/3-o)*6:e),n=r<.5?r*(1+s):r+s-r*s,a=2*r-n;e=t(a,n,i+1/3),l=t(a,n,i),o=t(a,n,i-1/3)}const c=e=>Math.round(255*e).toString(16).padStart(2,"0");return`#${c(e)}${c(l)}${c(o)}`}return!1}const N=(e,l)=>{let o=0,t=0,n=0,a=0;switch(e){case"top_left":o=l,t=l,n=-1*l,a=-1*l;break;case"top_right":o=-1*l,t=l,n=l,a=-1*l;break;case"bottom_left":case"right_bottom":o=l,t=-1*l,n=-1*l,a=l;break;case"bottom_right":o=-1*l,t=-1*l,n=l,a=l;break;case"top":o=0,t=0,n=-1*l,a=l}return{topLeft:o,topRight:t,bottomLeft:n,bottomRight:a}};function P(e){return"string"==typeof e&&(e.includes("linear-gradient")||e.includes("radial-gradient"))}const O=e=>{const{shadowType:l,spread:o,lateral:n,longitude:a,nomalBlur:i,shadowColor:s,blur:r,intensity:c,distance:d,newDirection:p,clayDirection:b,embos:u,opacity:g,depth:h,bdBlur:m,expand:x,glassblur:_,glassopa:f,hasOutline:C,baseColor:v}=e;if("nomal"===l)return"dent"===u?{style:{boxShadow:`${n}px ${a}px ${i}px ${o}px transparent, inset ${n}px ${a}px ${i}px ${o}px ${s}`}}:{style:{boxShadow:`${n}px ${a}px ${i}px ${o}px ${s}, inset ${n}px ${a}px ${i}px ${o}px transparent`}};if("newmor"===l){if(P(v))return(0,S.dispatch)("core/notices").createNotice("error",(0,t.__)("Neumorphism cannot be set when the background color is a gradient.","itmar_guest_contact_block"),{type:"snackbar",isDismissible:!0}),null;const e=function(e){const l=R(e),[o,t,n]=l,a=/^[0-9a-f]{2}$/i;if(a.test(o)&&a.test(t)&&a.test(n)){let e=0,l=0;const a=parseInt(o,16)/255,i=parseInt(t,16)/255,s=parseInt(n,16)/255,r=Math.max(a,i,s),c=Math.min(a,i,s),d=(r+c)/2;if(r!==c){const o=r-c;l=d>.5?o/(2-r-c):o/(r+c),e=r===a?(i-s)/o+(i<s?6:0):r===i?(s-a)/o+2:(a-i)/o+4,e/=6}return{hue:Math.round(360*e),saturation:Math.round(100*l),lightness:Math.round(100*d)}}return!1}(v);if(!e)return null;const l=Math.min(e.lightness+c,100),o=Math.max(e.lightness-c,0),n=B(e.hue,e.saturation,l),a=B(e.hue,e.saturation,o),i=N(p,d);return{style:{border:"none",background:v,boxShadow:"swell"===u?`${i.topLeft}px ${i.topRight}px ${r}px ${a}, ${i.bottomLeft}px ${i.bottomRight}px ${r}px ${n}, inset ${i.topLeft}px ${i.topRight}px ${r}px transparent, inset ${i.bottomLeft}px ${i.bottomRight}px ${r}px transparent`:`${i.topLeft}px ${i.topRight}px ${r}px transparent, ${i.bottomLeft}px ${i.bottomRight}px ${r}px transparent, inset ${i.topLeft}px ${i.topRight}px ${r}px ${a}, inset ${i.bottomLeft}px ${i.bottomRight}px ${r}px ${n}`}}}if("claymor"===l){if(P(v))return(0,S.dispatch)("core/notices").createNotice("error",(0,t.__)("claymorphism cannot be set when the background color is a gradient.","itmar_guest_contact_block"),{type:"snackbar",isDismissible:!0}),null;const e=function(e){const[l,o,t]=R(e),n=/^[0-9a-f]{2}$/i;return!!(n.test(l)&&n.test(o)&&n.test(t))&&{red:parseInt(l,16),green:parseInt(o,16),blue:parseInt(t,16)}}(v);if(!e)return null;const l=N(b,x),o=N(b,h);return{style:{background:`rgba(255, 255, 255, ${g})`,backdropFilter:`blur(${m}px)`,border:"none",boxShadow:`${l.topLeft}px ${l.bottomRight}px ${2*x}px 0px rgba(${e.red}, ${e.green}, ${e.blue}, 0.5), inset ${o.topRight}px ${o.bottomLeft}px 16px 0px rgba(${e.red}, ${e.green}, ${e.blue}, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255)`}}}return"glassmor"===l?{style:{backgroundColor:`rgba(255, 255, 255, ${f})`,...C?{border:"1px solid rgba(255, 255, 255, 0.4)"}:{},borderRightColor:"rgba(255, 255, 255, 0.2)",borderBottomColor:"rgba(255, 255, 255, 0.2)",backdropFilter:`blur(${_}px)`,boxShadow:"swell"===u?"0 8px 12px 0 rgba( 31, 38, 135, 0.37 ), inset 0 8px 12px 0 transparent":"0 8px 12px 0 transparent, inset 0 8px 12px 0 rgba( 31, 38, 135, 0.37 )"}}:null},L=({shadowStyle:e,onChange:l})=>{const[o,n]=(0,u.useState)(e),{shadowType:a,spread:i,lateral:s,longitude:r,nomalBlur:c,shadowColor:p,blur:b,intensity:g,distance:h,newDirection:x,clayDirection:_,embos:C,opacity:v,depth:y,bdBlur:k,expand:$,glassblur:j,glassopa:w,hasOutline:S}=o;(0,u.useEffect)(()=>{const e=O(o);e&&l(e,o)},[o]);const R=e=>{n(l=>({...l,...e}))};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(m.PanelBody,{title:(0,t.__)("Shadow Type","block-collections"),initialOpen:!0,children:[(0,d.jsx)("div",{className:"itmar_shadow_type",children:(0,d.jsx)(m.RadioControl,{selected:a,options:[{label:(0,t.__)("Normal","block-collections"),value:"nomal"},{label:(0,t.__)("Neumorphism","block-collections"),value:"newmor"},{label:(0,t.__)("Claymorphism","block-collections"),value:"claymor"},{label:(0,t.__)("Glassmorphism","block-collections"),value:"glassmor"}],onChange:e=>R({shadowType:e})})}),"claymor"!==a&&(0,d.jsx)("div",{className:"embos",children:(0,d.jsx)(m.RadioControl,{label:(0,t.__)("unevenness","block-collections"),selected:C,options:[{label:"Swell",value:"swell"},{label:"Dent",value:"dent"}],onChange:e=>R({embos:e})})})]}),"nomal"===a&&(0,d.jsxs)(m.PanelBody,{title:(0,t.__)("Normal settings","block-collections"),initialOpen:!1,children:[(0,d.jsx)(m.RangeControl,{value:i,label:(0,t.__)("Spread","block-collections"),max:50,min:0,onChange:e=>R({spread:e??0})}),(0,d.jsx)(m.RangeControl,{value:s,label:(0,t.__)("Lateral direction","block-collections"),max:50,min:0,onChange:e=>R({lateral:e??0})}),(0,d.jsx)(m.RangeControl,{value:r,label:(0,t.__)("Longitudinal direction","block-collections"),max:50,min:0,onChange:e=>R({longitude:e??0})}),(0,d.jsx)(m.RangeControl,{value:c,label:(0,t.__)("Blur","block-collections"),max:20,min:0,onChange:e=>R({nomalBlur:e??0})}),(0,d.jsx)(f.PanelColorSettings,{title:(0,t.__)("Shadow Color Setting","block-collections"),colorSettings:[{value:p,label:(0,t.__)("Choose Shadow color","block-collections"),onChange:e=>R({shadowColor:e||""})}]})]}),"newmor"===a&&(0,d.jsxs)(m.PanelBody,{title:(0,t.__)("Neumorphism settings","block-collections"),initialOpen:!1,children:[(0,d.jsx)(m.RangeControl,{value:h,label:(0,t.__)("Distance","block-collections"),max:50,min:0,onChange:e=>R({distance:e??0})}),(0,d.jsx)(m.RangeControl,{value:g,label:(0,t.__)("Intensity","block-collections"),max:100,min:0,onChange:e=>R({intensity:e??0})}),(0,d.jsx)(m.RangeControl,{value:b,label:(0,t.__)("Blur","block-collections"),max:20,min:0,onChange:e=>R({blur:e??0})}),(0,d.jsx)(m.PanelRow,{children:(0,d.jsx)("div",{className:"light_direction",children:(0,d.jsx)(m.RadioControl,{selected:x,options:[{label:"Top Left",value:"top_left"},{label:"Top Right",value:"top_right"},{label:"Bottom Left",value:"bottom_left"},{label:"Bottom Right",value:"bottom_right"}],onChange:e=>R({newDirection:e})})})})]}),"claymor"===a&&(0,d.jsxs)(m.PanelBody,{title:(0,t.__)("Claymorphism settings","block-collections"),initialOpen:!1,children:[(0,d.jsx)(m.RangeControl,{value:v,label:(0,t.__)("Opacity","block-collections"),max:1,min:0,step:.1,onChange:e=>R({opacity:e??1})}),(0,d.jsx)(m.RangeControl,{value:y,label:"Depth",max:20,min:0,onChange:e=>R({depth:e??0})}),(0,d.jsx)(m.RangeControl,{value:$,label:"Expand",max:50,min:0,onChange:e=>R({expand:e??0})}),(0,d.jsx)(m.RangeControl,{value:k,label:"Background Blur",max:10,min:0,onChange:e=>R({bdBlur:e??0})}),(0,d.jsx)("div",{className:"light_direction claymor",children:(0,d.jsx)(m.RadioControl,{selected:_,options:[{label:"Right Bottom",value:"right_bottom"},{label:"Top Right",value:"top_right"},{label:"Top",value:"top"}],onChange:e=>R({clayDirection:e})})})]}),"glassmor"===a&&(0,d.jsxs)(m.PanelBody,{title:(0,t.__)("Grassmophism settings","block-collections"),initialOpen:!1,children:[(0,d.jsx)(m.RangeControl,{value:j,label:(0,t.__)("Glass blur","block-collections"),max:20,min:0,onChange:e=>R({glassblur:e??0})}),(0,d.jsx)(m.RangeControl,{value:w,label:(0,t.__)("Glass Opacity","block-collections"),max:1,min:0,step:.1,onChange:e=>R({glassopa:e??.5})}),(0,d.jsx)(m.ToggleControl,{label:(0,t.__)("Show outline","block-collections"),checked:S,onChange:e=>R({hasOutline:e})})]})]})},z={top:"10px",left:"10px",right:"10px",bottom:"10px"},T={top:"0px",left:"0px",right:"0px",bottom:"0px"},A=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function V({attributes:e,setAttributes:l,context:o}){const{inputName:a,selPattern:i,selectValues:s,selectedValues:r,isSetSelect:c,folder_val:b,required:x,bgColor:C,optionColor:v,hoverBgColor:y,font_style_option:k,default_pos:$,mobile_pos:S,bgSelectColor:R,bgSelectGradient:B,radius_value:N,border_value:P,shadow_element:V,is_shadow:F,className:I}=e,D=function(){const[e,l]=(0,u.useState)(!1);return(0,u.useEffect)(()=>{const e=()=>{const e=document.getElementsByName("editor-canvas")[0];e&&e.contentWindow&&l(e.contentWindow.innerWidth<=767)},o=document.getElementsByName("editor-canvas")[0];return o&&o.contentWindow&&o.contentWindow.addEventListener("resize",e),e(),()=>{o&&o.contentWindow&&o.contentWindow.removeEventListener("resize",e)}},[]),e}(),M=(0,u.useRef)(null),[G,E]=(0,u.useState)(null),W=(0,u.useCallback)(e=>{E(e?.ownerDocument.head??null)},[]),q=(0,h.useMergeRefs)([M,W]),U=(0,f.useBlockProps)({ref:q,style:{backgroundColor:C}}),H=function(e,l){const[o,t]=(0,u.useState)("");return(0,u.useEffect)(()=>{if(e.current&&l)if(l.backgroundColor&&!l.backgroundColor.startsWith("var(--wp"))t(l.backgroundColor);else if(e.current){const l=getComputedStyle(e.current);t(l.backgroundColor)}},[l,e]),o}(M,U.style);(0,u.useEffect)(()=>{if(H){l({shadow_element:{...V,baseColor:H}});const e=O({...V,baseColor:H});e&&l({shadow_result:e.style})}},[H]);const J="multi"===i?{multiple:!0}:{},Y=o["itmar/label_width"]||"auto";return(0,u.useEffect)(()=>{l({labelWidth:Y})},[Y]),(0,u.useEffect)(()=>{l({selectedValues:[]})},[i]),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(f.InspectorControls,{group:"settings",children:(0,d.jsxs)(m.PanelBody,{title:(0,t.__)("Select Element Settings","block-collections"),initialOpen:!0,className:"select_design_ctrl",children:[(0,d.jsx)(m.PanelRow,{children:(0,d.jsx)(m.TextControl,{label:(0,t.__)("name attribute name","block-collections"),value:a,onChange:e=>l({inputName:e})})}),(0,d.jsx)("label",{className:"components-base-control__label",children:(0,t.__)("Select Pattern","block-collections")}),(0,d.jsx)(m.PanelRow,{className:"itmar_select_row",children:(0,d.jsx)(m.RadioControl,{selected:i,options:[{label:(0,t.__)("Single Select","block-collections"),value:"single"},{label:(0,t.__)("Nulti Select","block-collections"),value:"multi"}],onChange:e=>{l({selPattern:e})}})}),(0,d.jsx)(m.TextControl,{label:(0,t.__)("Place Folder Display","block-collections"),value:b,onChange:e=>l({folder_val:e})}),c&&(0,d.jsx)(m.PanelBody,{className:"itmar_notice_select_panel",title:(0,t.__)("Option info Setting","block-collections"),children:(0,d.jsx)(w,{optionValues:s,onAddOption:e=>{l({selectValues:[...s,e]})},onUpdateOption:e=>{l({selectValues:e})}})})]})}),(0,d.jsxs)(f.InspectorControls,{group:"styles",children:[(0,d.jsxs)(m.PanelBody,{title:(0,t.__)("Global settings","block-collections"),initialOpen:!1,className:"select_design_ctrl",children:[(0,d.jsx)(f.__experimentalPanelColorGradientSettings,{title:(0,t.__)("Background Color Setting","block-collections"),settings:[{colorValue:C,label:(0,t.__)("Choose Block Background color","block-collections"),onColorChange:e=>l({bgColor:e})},{colorValue:R,gradientValue:B,label:(0,t.__)("Choose Select Background color","block-collections"),onColorChange:e=>{l({bgSelectColor:void 0===e?"":e})},onGradientChange:e=>l({bgSelectGradient:e})}]}),(0,d.jsx)(m.BoxControl,{label:D?(0,t.__)("Margin settings(mobile)","block-collections"):(0,t.__)("Margin settings(desk top)","block-collections"),values:D?S.margin_value:$.margin_value,onChange:e=>{l(D?{mobile_pos:{...S,margin_value:e}}:{default_pos:{...$,margin_value:e}})},units:A,allowReset:!0,resetValues:z}),(0,d.jsx)(m.BoxControl,{label:D?(0,t.__)("Padding settings(mobile)","block-collections"):(0,t.__)("Padding settings(desk top)","block-collections"),values:D?S.padding_value:$.padding_value,onChange:e=>{l(D?{mobile_pos:{...S,padding_value:e}}:{default_pos:{...$,padding_value:e}})},units:A,allowReset:!0,resetValues:z}),(0,d.jsxs)(m.PanelBody,{title:(0,t.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl",children:[(0,d.jsx)(m.BorderBoxControl,{colors:[{color:"#72aee6"},{color:"#000"},{color:"#fff"}],onChange:e=>l({border_value:e}),value:P,allowReset:!0,resetValues:T}),(0,d.jsx)(f.__experimentalBorderRadiusControl,{values:N,onChange:e=>l({radius_value:"string"==typeof e?{value:e}:e})})]}),(0,d.jsx)(m.ToggleControl,{label:(0,t.__)("Is Shadow","block-collections"),checked:F,onChange:e=>{l({is_shadow:e})}}),F&&(0,d.jsx)(L,{shadowStyle:{...V},onChange:(e,o)=>{l({shadow_result:e.style}),l({shadow_element:o})}})]}),(0,d.jsxs)(m.PanelBody,{title:(0,t.__)("Option Style Settings","block-collections"),initialOpen:!1,className:"select_design_ctrl",children:[(0,d.jsx)(_,{title:(0,t.__)("Typography","block-collections"),fontStyle:k,onChange:e=>{l({font_style_option:e})},isMobile:D,initialOpen:!1}),(0,d.jsx)(f.__experimentalPanelColorGradientSettings,{title:(0,t.__)("Option Color Setting","block-collections"),settings:[{colorValue:v,label:(0,t.__)("Choose Text color","block-collections"),onColorChange:e=>l({optionColor:e})},{colorValue:y,label:(0,t.__)("Choose Background color on mouse hover","block-collections"),onColorChange:e=>l({hoverBgColor:e})}]})]})]}),(0,d.jsx)("div",{...U,children:(0,d.jsx)(n.ID,{target:G??void 0,children:(0,d.jsx)(p,{attributes:e,children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(g,{onOptionSelect:e=>{if(null==e)return void l({selectedValues:[]});if(r.includes(e))return;const o="multi"===i?[...r,e]:[e];l({selectedValues:o})},onOptionDeselect:e=>{const o=r.filter(l=>l!==e);l({selectedValues:o})},children:(0,d.jsxs)("select",{className:"nomal",...J,name:a,"data-placeholder":b,children:["single"===i&&(0,d.jsx)("option",{value:"",children:(0,t.__)("Please Select.","block-collections")}),s.map(e=>(0,d.jsx)("option",{id:e.id,className:e.classname,value:e.value,selected:r.includes(e.id),children:e.label}))]})}),(0,d.jsx)(j,{attributes:{...e,isMobile:D},onChange:(e,o)=>l({[e]:o})})]})})})})]})}}}]);