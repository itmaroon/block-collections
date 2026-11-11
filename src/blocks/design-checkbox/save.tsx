import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import type { CheckboxSaveProps } from "./types";
import { defaultText } from "../design-title/langCore";
import { buildLangTexts } from "../useLangFields";

export default function save({ attributes }: CheckboxSaveProps) {
	const {
		align,
		bgColor,
		labelContent: rawLabelContent,
		inputName,
		inputValue,
		proceedCheck,
		className,
		langManual: _langManual,
		...styleAttr
	} = attributes;

	/*
	 * 言語ごとの文字（{JP, EN}）のときは、保存する HTML には既定の言語の文字を入れ、
	 * 全言語の文字は data-lang-texts に持つ（表示のとき view.ts で差し替える）。
	 * 文字列のままなら data-lang-texts は出さない（昔のブロックの保存内容は変わらない）。
	 */
	const labelContent = defaultText(rawLabelContent);
	const langTexts = buildLangTexts({ labelContent: rawLabelContent });

	//テキストの配置
	const align_style =
		align === "center"
			? { marginLeft: "auto", marginRight: "auto" }
			: align === "right"
			? { marginLeft: "auto" }
			: {};
	const blockProps = useBlockProps.save({
		"data-attributes": JSON.stringify(styleAttr),
		"data-lang-texts": langTexts,
		style: { ...align_style, backgroundColor: bgColor, overflow: "hidden" },
	});

	return (
		<div {...blockProps}>
			<div className="itmar-wrap">
				<label>
					<input
						type="checkbox"
						name={inputName}
						checked={
							className?.includes("itmar_filter_checkbox") ? false : inputValue
						}
						data-is_proceed={proceedCheck}
					/>
					<span className="frontSpan"></span>
				</label>
				<RichText.Content tagName="div" value={labelContent ?? ""} />
			</div>
		</div>
	);
}
