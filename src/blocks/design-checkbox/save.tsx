import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import type { CheckboxSaveProps } from "./types";

export default function save({ attributes }: CheckboxSaveProps) {
	const {
		align,
		bgColor,
		labelContent,
		inputName,
		inputValue,
		proceedCheck,
		className,
		...styleAttr
	} = attributes;

	//テキストの配置
	const align_style =
		align === "center"
			? { marginLeft: "auto", marginRight: "auto" }
			: align === "right"
			? { marginLeft: "auto" }
			: {};
	const blockProps = useBlockProps.save({
		"data-attributes": JSON.stringify(styleAttr),
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
