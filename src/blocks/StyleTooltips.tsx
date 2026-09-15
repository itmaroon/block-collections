/**
 * ツールチップのエディタ用ラッパ。
 *
 * CSS生成の実体は ./tooltipCss にある。ビュースクリプトからは
 * このファイルではなく `./tooltipCss` を直接 import すること
 * （このファイルは @wordpress/element と JSX を含むため）。
 */
import type { ReactNode } from "react";
import { useRef } from "@wordpress/element";
import type { TooltipAttributes } from "../shared/types";
import { createTooltipStyleCss } from "./tooltipCss";

//後方互換のための再エクスポート
export { createTooltipStyleCss };

let tooltipStyleSequence = 0;

interface StyleTooltipsProps {
	attributes: TooltipAttributes;
	children: ReactNode;
}

export default function StyleTooltips({
	attributes,
	children,
}: StyleTooltipsProps) {
	const styleClassRef = useRef("");
	if (!styleClassRef.current) {
		tooltipStyleSequence += 1;
		styleClassRef.current = `itmar-tooltip-editor-${tooltipStyleSequence}`;
	}
	const styleClass = styleClassRef.current;
	const styleCss = createTooltipStyleCss(attributes, `.${styleClass}`);

	return (
		<>
			<style>{styleCss}</style>
			<span className={styleClass} data-tooltip={attributes.tooltip_text ?? ""}>
				{children}
			</span>
		</>
	);
}
