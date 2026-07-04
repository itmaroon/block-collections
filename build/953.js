"use strict";(globalThis.webpackChunkblock_collections=globalThis.webpackChunkblock_collections||[]).push([[953],{8953(e,l,t){t.r(l),t.d(l,{default:()=>A});var o=t(7723);t(1609);var n=t(314),i=t(9716),a=t(6435),s=t(790);function r({attributes:e,children:l}){const{htmlFor:t,...o}=e;return(0,s.jsx)(c,{htmlFor:t,$attrs:o,children:l})}const c=i.Ay.label`
	${({$attrs:e})=>{const{font_style_label:l,bgColor_label:t,bgGradient_label:o,textColor_label:n,radius_label:s,border_label:r,padding_label:c,labelSpace:u,labelWidth:g,default_pos:d,mobile_pos:p,shadow_result:b,is_shadow:x,isMobile:m,className:_}=e,h=t||o,N=l.isItalic?"italic":"normal",j=(0,a.tk)(s),M=(0,a.fS)(c),C={"top left":"margin-bottom","top center":"margin-bottom","top right":"margin-bottom","center left":"margin-right","center right":"margin-left","bottom left":"margin-top","bottom center":"margin-top","bottom right":"margin-top"},y=`${C[d.labelPos]}: ${u};`,I=`${C[p.labelPos]}: ${u};`,f=x&&b?(0,a.xm)(b):"",D=i.AH`
			white-space: nowrap;
			background: ${h};
			border-radius: ${j};
			color: ${n};
			font-size: ${l.default_fontSize};
			font-family: ${l.fontFamily};
			font-weight: ${l.fontWeight};
			font-style: ${N};
			padding: ${M};
			${(0,a.gA)(r)};
			${f};
			@media (max-width: 767px) {
				font-size: ${l.mobile_fontSize};
			}
			span {
				color: var(--wp--preset--color--accent-1);
			}
		`;let k=null;const z=_?.split(" ").find(e=>e.startsWith("is-style"));return k="is-style-line"===z?i.AH`
					position: absolute;
					width: fit-content;
					opacity: 0;
					left: calc(2em + 10px);
					pointer-events: none;
					bottom: 15px;
					z-index: 1;
					transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s;
				`:i.AH`
					width: ${g};
					${y}
					@media (max-width: 767px) {
						${I}
					}
				`,i.AH`
			${D}
			${k}
		`}}
`,u={"top left":"display: flex;flex-direction: column-reverse;align-items: flex-start;","top center":"display: flex;flex-direction: column-reverse;align-items: center;","top right":"display: flex;flex-direction: column-reverse;align-items: flex-end;","center left":"display: flex;flex-direction: row-reverse;justify-content: flex-end;align-items: center;","center center":"label{display: none;}","center right":"display: flex;align-items: center;","bottom left":"display: flex;flex-direction: column;align-items: flex-start;","bottom center":"display: flex;flex-direction: column;align-items: center;","bottom right":"display: flex;flex-direction: column;align-items: flex-end;"},g=({attributes:e,children:l})=>(0,s.jsx)(d,{$attr:e,children:l}),d=i.Ay.div`
	${({$attr:e})=>{const{focusColor:l,bgColor:t,font_style_input:o,bgColor_input:n,bgGradient_input:s,textColor_input:r,radius_input:c,border_input:g,default_pos:d,mobile_pos:p,shadow_result:b,is_shadow:x,className:m}=e,_=n||s,h=o.isItalic?"italic":"normal",N=(0,a.tk)(c),j=(0,a.fS)(d.margin_input),M=(0,a.fS)(d.padding_input),C=(0,a.fS)(p.margin_input),y=(0,a.fS)(p.padding_input),I=d.free_width?d.free_width:"100%",f=p.free_width?p.free_width:"100%",D=x&&b?(0,a.xm)(b):"",k=i.AH`
			padding: ${M};
			margin: ${j};
			background: ${t};
			position: relative;
			@media (max-width: 767px) {
				margin: ${C};
				padding: ${y};
			}

			input,
			textarea {
				flex-grow: 1;
				background: ${_};
				border-radius: ${N};
				color: ${r};
				font-size: ${o.default_fontSize};
				font-family: ${o.fontFamily};
				font-weight: ${o.fontWeight};
				font-style: ${h};
				@media (max-width: 767px) {
					font-size: ${o.mobile_fontSize};
				}
				&::placeholder {
					color: var(--wp--preset--color--placeholder);
				}
			}
			input {
				width: ${I};
				line-height: ${d.inputLineHeight};
				@media (max-width: 767px) {
					width: ${f};
					line-height: ${p.inputLineHeight};
				}
			}
			textarea {
				min-height: 60px;
				box-sizing: border-box;
				padding: 6px 10px;
			}
		`;let z=null;const w=m?.split(" ").find(e=>e.startsWith("is-style"));return z="is-style-line"===w?i.AH`
					display: flex;
					height: auto;
					${D};
					input,
					textarea {
						background-color: transparent;
						outline: none;
						padding: 0 8px;
						border-style: solid;
						border-color: ${n};
						border-width: 0px 0px 2px 0px;
						box-shadow: none;
						transition: border-color 0.45s ease 0s;
						transform: translateY(1em);

						&:focus {
							box-shadow: none;
							border-color: ${l};
							~ label {
								opacity: 1;
								z-index: 1;
								top: -0.3em;
								font-size: 0.8em;
							}
							~ label {
								color: ${l};
							}
						}
						&:not(.empty) ~ label {
							opacity: 1;
							z-index: 1;
							top: -0.3em;
							font-size: 0.8em;
						}
					}
					textarea {
						padding: 8px 10px;
					}
				`:i.AH`
					${u[d.labelPos]}
					@media (max-width: 767px) {
						${u[p.labelPos]}
					}
					input,
					textarea {
						${(0,a.gA)(g)};
						${D};
						transition: box-shadow 0.45s ease 0s;
						&:focus {
							outline: none;
							box-shadow: 0 0 5px ${l};
						}
					}
				`,i.AH`
			${k}
			${z}
		`}}
`;var p=t(6087),b=t(9491),x=t(7143),m=t(4715),_=t(6367),h=t(6427);const N={top:"10px",left:"10px",right:"10px",bottom:"10px"},j={top:"0px",left:"0px",right:"0px",bottom:"0px"},M=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function C(e){const{attributes:l}=e,{required:t,labelContent:n,default_pos:i,mobile_pos:a,font_style_label:c,bgColor_label:u,bgGradient_label:g,textColor_label:d,radius_label:p,border_label:b,padding_label:x,labelSpace:C,isMobile:y}=l;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(m.InspectorControls,{group:"settings",children:[(0,s.jsxs)(h.PanelBody,{title:(0,o.__)("Required Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl",children:[(0,s.jsx)(h.PanelRow,{className:"labelRequierd_row",children:(0,s.jsx)(h.ToggleControl,{label:(0,o.__)("Required input","block-collections"),checked:t.flg,onChange:l=>{const o={...t,flg:l};e.onChange("required",o)}})}),t.flg&&(0,s.jsx)(h.PanelRow,{children:(0,s.jsx)(h.TextControl,{label:(0,o.__)("Show 'required'","block-collections"),value:t.display,isPressEnterToChange:!0,onChange:l=>{const o={...t,display:l};e.onChange("required",o)}})})]}),(0,s.jsxs)(h.PanelBody,{title:(0,o.__)("Label Settings","block-collections"),initialOpen:!0,className:"title_design_ctrl",children:[(0,s.jsx)(h.PanelRow,{className:"labelInfo_row",children:(0,s.jsx)(h.TextControl,{label:(0,o.__)("Text of Label","block-collections"),labelPosition:"top",value:n,isPressEnterToChange:!0,onChange:l=>e.onChange("labelContent",l)})}),(0,s.jsx)("label",{children:y?(0,o.__)("Label Alignment(mobile)","block-collections"):(0,o.__)("Label Alignment(desk top)","block-collections")}),(0,s.jsx)(h.AlignmentMatrixControl,{label:y?(0,o.__)("Label Alignment(mobile)","block-collections"):(0,o.__)("Label Alignment(desk top)","block-collections"),value:y?a.labelPos:i.labelPos,onChange:l=>{y?e.onChange("mobile_pos",{...a,labelPos:l}):e.onChange("default_pos",{...i,labelPos:l})}}),(0,s.jsx)("label",{children:(0,o.__)("Selecting the center vertically or horizontally will hide it.","block-collections")})]})]}),(0,s.jsx)(m.InspectorControls,{group:"styles",children:(0,s.jsxs)(h.PanelBody,{title:(0,o.__)("Label style settings","block-collections"),initialOpen:!1,className:"title_design_ctrl",children:[(0,s.jsx)(_.A,{title:(0,o.__)("Typography","block-collections"),fontStyle:c,onChange:l=>{e.onChange("font_style_label",l)},isMobile:y,initialOpen:!1}),(0,s.jsx)(m.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Label Color Setting","block-collections"),settings:[{colorValue:d,label:(0,o.__)("Choose Text color","block-collections"),onColorChange:l=>e.onChange("textColor_label",l)},{colorValue:u,gradientValue:g,label:(0,o.__)("Choose Background color","block-collections"),onColorChange:l=>e.onChange("bgColor_label",l),onGradientChange:l=>e.onChange("bgGradient_label",l)}]}),(0,s.jsxs)(h.PanelBody,{title:(0,o.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl",children:[(0,s.jsx)(h.BorderBoxControl,{onChange:l=>e.onChange("border_label",l),value:b,allowReset:!0,resetValues:j}),(0,s.jsx)(m.__experimentalBorderRadiusControl,{values:p,onChange:l=>e.onChange("radius_label","string"==typeof l?{value:l}:l)})]}),(0,s.jsx)(h.BoxControl,{label:(0,o.__)("Padding settings","block-collections"),values:x,onChange:l=>e.onChange("padding_label",l),units:M,allowReset:!0,resetValues:N}),(0,s.jsx)(h.__experimentalUnitControl,{dragDirection:"e",onChange:l=>e.onChange("labelSpace",l),label:(0,o.__)("Spacing with textbox","block-collections"),value:C})]})}),(0,s.jsx)(r,{attributes:l,children:t.flg?(0,s.jsxs)(s.Fragment,{children:[n,(0,s.jsxs)("span",{children:["(",t.display,")"]})]}):n})]})}var y=t(1451),I=t(9435);t(4997);const f=(e,l,t=null,o=!1)=>(0,x.useSelect)(n=>{const{getBlockRootClientId:i,getBlock:a}=n(m.store),s=i(e);if(!s)return t?null:[];const r=a(s);if(!r)return t?null:[];const c=(o?D(r.innerBlocks||[]):r.innerBlocks||[]).filter(t=>t.name===l&&t.clientId!==e);return t?c.find(e=>Object.entries(t).every(([l,t])=>e.attributes[l]===t))||null:c},[e,l,JSON.stringify(t),o]),D=e=>e.reduce((e,l)=>(e.push(l),l.innerBlocks&&l.innerBlocks.length>0&&e.push(...D(l.innerBlocks)),e),[]),k={top:"10px",left:"10px",right:"10px",bottom:"10px"},z={top:"0px",left:"0px",right:"0px",bottom:"0px"},w=[{value:"px",label:"px"},{value:"em",label:"em"},{value:"rem",label:"rem"}];function A(e){const{attributes:l,setAttributes:t,clientId:a}=e,{inputName:r,inputValue:c,placeFolder:u,inputType:d,numberOption:N,addressInput:j,required:M,focusColor:D,bgColor:A,font_style_input:S,bgColor_input:T,bgGradient_input:v,textColor_input:O,radius_input:L,border_input:$,default_pos:B,mobile_pos:E,labelContent:P,shadow_element:Y,is_shadow:U,className:Q}=l,R=(0,y.yJ)(),G=(0,p.useRef)(null),[V,W]=(0,p.useState)(null),H=(0,p.useCallback)(e=>{W(e?.ownerDocument.head??null)},[]),F=(0,b.useMergeRefs)([G,H]),Z=(0,m.useBlockProps)({ref:F,style:{backgroundColor:A}}),X=(0,y.pL)(G,Z.style);(0,p.useEffect)(()=>{if(X){t({shadow_element:{...Y,baseColor:X}});const e=(0,I.b)({...Y,baseColor:X});e&&t({shadow_result:e.style})}},[X]);const q=M.flg?`${P}(${M.display})`:P,J=e.context["itmar/label_width"]||"auto";(0,p.useEffect)(()=>{t({labelWidth:J})},[J]);const[K,ee]=(0,p.useState)(c);(0,p.useEffect)(()=>{ee(c)},[c]);const[le,te]=(0,p.useState)("auto"),oe=(0,p.useRef)(null);(0,p.useEffect)(()=>{oe.current&&te(`${oe.current.scrollHeight}px`)},[Q]);const[ne,ie]=(0,p.useState)(!1),ae=f(a,"itmar/design-text-ctrl").map(e=>({label:e.attributes.labelContent,value:e.attributes.inputName})),se=f(a,"itmar/design-text-ctrl",{inputName:j});return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(m.InspectorControls,{group:"settings",children:(0,s.jsxs)(h.PanelBody,{title:(0,o.__)("Input element information setting","block-collections"),initialOpen:!0,className:"title_design_ctrl",children:[(0,s.jsx)(h.PanelRow,{children:(0,s.jsx)(h.TextControl,{label:(0,o.__)("ID and Name attribute name","block-collections"),value:r,onChange:e=>t({inputName:e})})}),(0,s.jsx)(h.PanelRow,{children:(0,s.jsx)(h.TextControl,{label:(0,o.__)("PlaceHolder","block-collections"),value:u,isPressEnterToChange:!0,onChange:e=>t({placeFolder:e})})}),(0,s.jsx)(h.PanelRow,{className:"itmar_weight_row",children:(0,s.jsx)(h.RadioControl,{selected:d,label:(0,o.__)("Kind of Input Element","block-collections"),options:[{label:"TEXT",value:"text"},{label:"NUMBER",value:"number"},{label:"E-MAIL",value:"email"},{label:"PASSWORD",value:"pass"},{label:"ZIP",value:"zip"},{label:"AREA",value:"textarea"}],onChange:e=>{t({inputType:e})}})}),"number"===d&&(0,s.jsxs)(h.PanelBody,{title:(0,o.__)("Number Options","block-collections"),initialOpen:!0,children:[(0,s.jsx)(h.RangeControl,{label:(0,o.__)("Minimum value (min)","block-collections"),value:N.min,onChange:e=>t({numberOption:{...N,min:e}}),min:-100,max:N.max,help:(0,o.__)("Set the minimum allowed value.","block-collections")}),(0,s.jsx)(h.RangeControl,{label:(0,o.__)("Maximum value (max)","block-collections"),value:N.max,onChange:e=>t({numberOption:{...N,max:e}}),min:N.min,max:100,help:(0,o.__)("Set the maximum allowed value.","block-collections")}),(0,s.jsx)(h.__experimentalNumberControl,{label:(0,o.__)("Step","block-collections"),value:N.step,min:1,max:Math.max(N.max-N.min,1),onChange:e=>t({numberOption:{...N,step:Number(e)}}),help:(0,o.__)("Change the increment/decrement step for the value.","block-collections")}),N.min>N.max&&(0,s.jsx)(h.Notice,{status:"error",isDismissible:!1,children:(0,o.__)("The minimum value (min) should not be greater than the maximum value (max).","block-collections")})]}),"zip"===d&&(0,s.jsx)(h.PanelRow,{children:(0,s.jsx)(h.SelectControl,{label:(0,o.__)("Address text box","block-collections"),value:j,options:ae,onChange:e=>{t({addressInput:e})}})})]})}),(0,s.jsxs)(m.InspectorControls,{group:"styles",children:[(0,s.jsxs)(h.PanelBody,{title:(0,o.__)("Global settings","block-collections"),initialOpen:!1,className:"title_design_ctrl",children:[(0,s.jsx)(m.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Background Color Setting","block-collections"),settings:[{colorValue:A,label:(0,o.__)("Choose Background color","block-collections"),onColorChange:e=>t({bgColor:e})}]}),(0,s.jsx)(m.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Focus Color Setting","block-collections"),settings:[{colorValue:D,label:(0,o.__)("Choose Focus color","block-collections"),onColorChange:e=>t({focusColor:e})}]}),(0,s.jsx)(h.__experimentalBoxControl,{label:R?(0,o.__)("Margin settings(mobile)","block-collections"):(0,o.__)("Margin settings(desk top)","block-collections"),values:R?E.margin_input:B.margin_input,onChange:e=>{t(R?{mobile_pos:{...E,margin_input:e}}:{default_pos:{...B,margin_input:e}})},units:w,allowReset:!0,resetValues:k}),(0,s.jsx)(h.__experimentalBoxControl,{label:R?(0,o.__)("Padding settings(mobile)","block-collections"):(0,o.__)("Padding settings(desk top)","block-collections"),values:R?E.padding_input:B.padding_input,onChange:e=>{t(R?{mobile_pos:{...E,padding_input:e}}:{default_pos:{...B,padding_input:e}})},units:w,allowReset:!0,resetValues:k}),(0,s.jsx)(h.ToggleControl,{label:(0,o.__)("Is Shadow","block-collections"),checked:U,onChange:e=>{t({is_shadow:e})}}),U&&(0,s.jsx)(I.A,{shadowStyle:{...Y},onChange:(e,l)=>{t({shadow_result:e.style}),t({shadow_element:l})}})]}),(0,s.jsxs)(h.PanelBody,{title:(0,o.__)("Input Box style settings","block-collections"),initialOpen:!1,className:"title_design_ctrl",children:[(0,s.jsx)(_.A,{title:(0,o.__)("Typography","block-collections"),fontStyle:S,onChange:e=>{t({font_style_input:e})},isMobile:R,initialOpen:!1}),(0,s.jsx)(h.__experimentalUnitControl,{label:R?(0,o.__)("Free Width(mobile)","block-collections"):(0,o.__)("Free Width(desk top)","block-collections"),dragDirection:"e",onChange:e=>{t(R?{mobile_pos:{...E,free_width:e}}:{default_pos:{...B,free_width:e}})},value:R?E.free_width:B.free_width}),(0,s.jsx)(h.RangeControl,{value:R?E.inputLineHeight:B.inputLineHeight,label:R?(0,o.__)("Line Height(mobile)","block-collections"):(0,o.__)("Line Height(desk top)","block-collections"),max:3,min:1,step:.1,onChange:e=>{t(R?{mobile_pos:{...E,inputLineHeight:e}}:{default_pos:{...B,inputLineHeight:e}})},withInputField:!0}),(0,s.jsx)(m.__experimentalPanelColorGradientSettings,{title:(0,o.__)("Color Settings","block-collections"),settings:[{colorValue:O,label:(0,o.__)("Choose Text color","block-collections"),onColorChange:e=>t({textColor_input:e})},{colorValue:T,gradientValue:v,label:(0,o.__)("Choose Background color","block-collections"),onColorChange:e=>t({bgColor_input:e}),onGradientChange:e=>t({bgGradient_input:e})}]}),(0,s.jsxs)(h.PanelBody,{title:(0,o.__)("Border Settings","block-collections"),initialOpen:!1,className:"border_design_ctrl",children:[(0,s.jsx)(h.__experimentalBorderBoxControl,{onChange:e=>t({border_input:e}),value:$,allowReset:!0,resetValues:z}),(0,s.jsx)(m.__experimentalBorderRadiusControl,{values:L,onChange:e=>t({radius_input:"string"==typeof e?{value:e}:e})})]})]})]}),(0,s.jsx)("div",{...Z,children:(0,s.jsx)(i.ID,{target:V??void 0,children:(0,s.jsxs)(g,{attributes:l,children:["text"===d&&(0,s.jsx)("input",{type:"text",name:r,placeholder:Q?.includes("is-style-line")?q:u,className:"contact_text "+(K?"":"empty"),value:K,onChange:e=>{const l=e.target.value;ee(l),t({inputValue:l})}}),"email"===d&&(0,s.jsx)("input",{type:"email",placeholder:Q?.includes("is-style-line")?q:u,className:"contact_text "+(K?"":"empty"),value:K,onChange:e=>{const l=e.target.value;ee(l),t({inputValue:l})}}),"pass"===d&&(0,s.jsxs)("div",{className:"password-wrapper",children:[(0,s.jsx)("input",{type:ne?"text":"password",placeholder:Q?.includes("is-style-line")?q:u,className:"contact_text "+(K?"":"empty"),value:K,onChange:e=>{const l=e.target.value;ee(l),t({inputValue:l})}}),(0,s.jsx)("button",{type:"button",className:"toggle-password-button",onClick:()=>ie(!ne),"aria-label":ne?"パスワードを非表示":"パスワードを表示",children:(0,s.jsx)("img",{src:ne?"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTAwIiB6b29tQW5kUGFuPSJtYWduaWZ5IiB2aWV3Qm94PSIwIDAgNzUgNzQuOTk5OTk3IiBoZWlnaHQ9IjEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmVyc2lvbj0iMS4wIj48ZGVmcz48Y2xpcFBhdGggaWQ9IjgyMmM0YzQ0ODIiPjxwYXRoIGQ9Ik0gMCAxMy4wNzgxMjUgTCA3NSAxMy4wNzgxMjUgTCA3NSA2MS44MjgxMjUgTCAwIDYxLjgyODEyNSBaIE0gMCAxMy4wNzgxMjUgIiBjbGlwLXJ1bGU9Im5vbnplcm8iLz48L2NsaXBQYXRoPjwvZGVmcz48cmVjdCB4PSItNy41IiB3aWR0aD0iOTAiIGZpbGw9IiNmZmZmZmYiIHk9Ii03LjUiIGhlaWdodD0iODkuOTk5OTk2IiBmaWxsLW9wYWNpdHk9IjEiLz48cmVjdCB4PSItNy41IiB3aWR0aD0iOTAiIGZpbGw9IiNmZmZmZmYiIHk9Ii03LjUiIGhlaWdodD0iODkuOTk5OTk2IiBmaWxsLW9wYWNpdHk9IjEiLz48ZyBjbGlwLXBhdGg9InVybCgjODIyYzRjNDQ4MikiPjxwYXRoIGZpbGw9IiMwMDAwMDAiIGQ9Ik0gNzMuODc4OTA2IDM0LjYyODkwNiBDIDY5Ljg1OTM3NSAyOC4yMTA5MzggNTguMTkxNDA2IDEzLjA3ODEyNSAzNy41IDEzLjA3ODEyNSBDIDE2LjgxMjUgMTMuMDc4MTI1IDUuMTQ0NTMxIDI4LjIxMDkzOCAxLjEyNSAzNC42Mjg5MDYgQyAwLjA0Mjk2ODggMzYuMzU1NDY5IDAuMDQyOTY4OCAzOC41NTA3ODEgMS4xMjUgNDAuMjc3MzQ0IEMgNS4xNDQ1MzEgNDYuNjk1MzEyIDE2LjgxMjUgNjEuODI4MTI1IDM3LjUgNjEuODI4MTI1IEMgNTguMTkxNDA2IDYxLjgyODEyNSA2OS44NTkzNzUgNDYuNjk1MzEyIDczLjg3ODkwNiA0MC4yNzczNDQgQyA3NC45NjA5MzggMzguNTUwNzgxIDc0Ljk2MDkzOCAzNi4zNTU0NjkgNzMuODc4OTA2IDM0LjYyODkwNiBaIE0gMzcuNSA1My4zNTkzNzUgQyAyOC42OTkyMTkgNTMuMzU5Mzc1IDIxLjU2MjUgNDYuMjM4MjgxIDIxLjU2MjUgMzcuNDUzMTI1IEMgMjEuNTYyNSAyOC42Njc5NjkgMjguNjk5MjE5IDIxLjU0Njg3NSAzNy41IDIxLjU0Njg3NSBDIDQ2LjMwNDY4OCAyMS41NDY4NzUgNTMuNDQxNDA2IDI4LjY2Nzk2OSA1My40NDE0MDYgMzcuNDUzMTI1IEMgNTMuNDQxNDA2IDQ2LjIzODI4MSA0Ni4zMDQ2ODggNTMuMzU5Mzc1IDM3LjUgNTMuMzU5Mzc1IFogTSA0Mi44MTY0MDYgMzQuODAwNzgxIEMgNDEuMzQ3NjU2IDM0LjgwMDc4MSA0MC4xNjAxNTYgMzMuNjEzMjgxIDQwLjE2MDE1NiAzMi4xNTIzNDQgQyA0MC4xNjAxNTYgMzEuNDI1NzgxIDQwLjQ1MzEyNSAzMC43NzczNDQgNDAuOTIxODc1IDMwLjI5Njg3NSBDIDM5Ljg4MjgxMiAyOS44MDA3ODEgMzguNzMwNDY5IDI5LjUgMzcuNSAyOS41IEMgMzMuMTAxNTYyIDI5LjUgMjkuNTMxMjUgMzMuMDU4NTk0IDI5LjUzMTI1IDM3LjQ1MzEyNSBDIDI5LjUzMTI1IDQxLjg0NzY1NiAzMy4xMDE1NjIgNDUuNDA2MjUgMzcuNSA0NS40MDYyNSBDIDQxLjkwMjM0NCA0NS40MDYyNSA0NS40NzI2NTYgNDEuODQ3NjU2IDQ1LjQ3MjY1NiAzNy40NTMxMjUgQyA0NS40NzI2NTYgMzYuMjI2NTYyIDQ1LjE2Nzk2OSAzNS4wNzgxMjUgNDQuNjcxODc1IDM0LjAzOTA2MiBDIDQ0LjE5MTQwNiAzNC41MDc4MTIgNDMuNTM5MDYyIDM0LjgwMDc4MSA0Mi44MTY0MDYgMzQuODAwNzgxIFogTSA0Mi44MTY0MDYgMzQuODAwNzgxICIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L2c+PC9zdmc+":n.A,alt:"","aria-hidden":"true"})})]}),"zip"===d&&(0,s.jsxs)("div",{className:"zip-search-wrapper",children:[(0,s.jsx)("input",{type:"text",value:K,placeholder:`${(0,o.__)("example","block-collections")}) 1234567`,className:"contact_text "+(K?"":"empty"),onChange:e=>{const l=e.target.value;ee(l),t({inputValue:l})}}),(0,s.jsx)("button",{type:"button",onClick:async()=>{const e=await(async e=>{const l=e.replace("-","");if(!/^\d{7}$/.test(l))return alert((0,o.__)("Please enter your postal code as 7 digits without hyphens.","block-collections")),null;try{const e=await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${l}`),t=await e.json();return 200!==t.status?(alert(t.message||(0,o.__)("Error fetching address","block-collections")),null):t.results&&t.results.length>0?t.results[0]:(alert((0,o.__)("No matching address found","block-collections")),null)}catch(e){return console.error("ZipCloud API Error:",e),alert((0,o.__)("Communication failed","block-collections")),null}})(K);if(!e)return;const l=`${e.address1}${e.address2}${e.address3}`;se?(0,x.dispatch)(m.store).updateBlockAttributes(se.clientId,{inputValue:l}):alert((0,o.__)("The block to enter the address cannot be found.","block-collections"))},className:"zip-search-button",children:(0,o.__)("Address Search","block-collections")})]}),"number"===d&&(0,s.jsxs)("div",{className:"number-input-wrapper",children:[(0,s.jsx)("button",{type:"button",onClick:()=>{const e=Number(N.min),l=Number(N.max);let o=(parseInt(K,10)||0)-Number(N.step||1);o<e&&(o=e),o>l&&(o=l),ee(o),t({inputValue:o})},children:"-"}),(0,s.jsx)("input",{type:"number",name:r,min:N.min,max:N.max,step:N.step,placeholder:Q?.includes("is-style-line")?q:"",className:"contact_text "+(K?"":"empty"),value:K,onChange:e=>{const l=Number(N.min),o=Number(N.max);let n=e.target.value;if(""===n)return ee(""),void t({inputValue:""});n=Number(n),isNaN(n)||(n<l&&(n=l),n>o&&(n=o),ee(n),t({inputValue:n}))}}),(0,s.jsx)("button",{type:"button",onClick:()=>{const e=Number(N.min),l=Number(N.max);let o=(parseInt(K,10)||0)+Number(N.step||1);o>l&&(o=l),o<e&&(o=e),ee(o),t({inputValue:o})},children:"+"})]}),"textarea"===d&&(0,s.jsx)("textarea",{ref:oe,style:{height:le},name:r,placeholder:Q?.includes("is-style-line")?q:u,className:"contact_text "+(K?"":"empty"),value:K,onChange:e=>{const l=e.target.value,o=e.target.scrollHeight;ee(l),te(`${o}px`),t({inputValue:l})}}),(0,s.jsx)(C,{attributes:{...l,isMobile:R},onChange:(e,l)=>t({[e]:l})})]})})})]})}}}]);