/**
 * ラベルのエディタ用ラッパ。
 *
 * CSS生成の実体は ./labelCss にある。ビュースクリプトと Style*.tsx からは
 * このファイルではなく `./labelCss` を直接 import すること
 * （このファイルは @wordpress/element と JSX を含むため）。
 */
import type { ReactNode } from "react";
import { useRef } from "@wordpress/element";
import type { LabelStyleAttributes } from "../shared/types";
import { createLabelStyleCss } from "./labelCss";

//後方互換のための再エクスポート
export { createLabelStyleCss };

let labelStyleSequence = 0;

interface StyleLabelProps {
	attributes: LabelStyleAttributes;
	children: ReactNode;
}

export default function StyleLabel({ attributes, children }: StyleLabelProps) {
	const { htmlFor, ...styleConfig } = attributes;
	const styleClassRef = useRef("");
	if (!styleClassRef.current) {
		labelStyleSequence += 1;
		styleClassRef.current = `itmar-label-editor-${labelStyleSequence}`;
	}
	const styleClass = styleClassRef.current;
	const styleCss = createLabelStyleCss(styleConfig, `.${styleClass}`, "self");

	return (
		<>
			<style>{styleCss}</style>
			<label htmlFor={htmlFor} className={styleClass}>
				{children}
			</label>
		</>
	);
}
