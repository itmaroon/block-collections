import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import type { SelectOption, SelectSaveProps } from "./types";

/**
 * save() の出力は、サイトの言語で変えない（言語が違うサイトに移すと、保存された内容と食い違って、ブロックが無効になるため）。
 * ラベルは英語で保存し、表示のときに、サーバー側（block-collections.php の render_block フィルター）で、サイトの言語に訳す。
 * 翻訳ありで保存した昔の内容は、legacySave（deprecated）で読む。
 */
export function createSave(t: (text: string) => string) {
	return function save({ attributes }: SelectSaveProps) {
	const {
		inputName,
		bgColor,
		selPattern,
		selectValues,
		selectedValues = [],
		folder_val,
		required,
		labelContent,
		optionColor,
		hoverBgColor,
		font_style_option,
		default_pos,
		mobile_pos,
		bgSelectColor,
		bgSelectGradient,
		radius_value,
		border_value,
		labelWidth,
		font_style_label,
		bgColor_label,
		bgGradient_label,
		textColor_label,
		radius_label,
		border_label,
		padding_label,
		labelSpace,
		shadow_result,
		is_shadow,
		className,
	} = attributes;

	const selectedIds = Array.isArray(selectedValues) ? selectedValues : [];
	const isSelected = (id: SelectOption["id"]) => selectedIds.includes(id);
	const selectClassName =
		selPattern === "multi"
			? "itmar_block_select itmar_block_selectMultiple"
			: "itmar_block_select itmar_block_selectSingle";
	const selectAttributes = selPattern === "multi" ? { multiple: true } : {};
	const styleAttributes = {
		optionColor,
		hoverBgColor,
		font_style_option,
		default_pos,
		mobile_pos,
		bgSelectColor,
		bgSelectGradient,
		radius_value,
		border_value,
		labelWidth,
		font_style_label,
		bgColor_label,
		bgGradient_label,
		textColor_label,
		radius_label,
		border_label,
		padding_label,
		labelSpace,
		shadow_result,
		is_shadow,
		className,
	};

	const blockProps = useBlockProps.save({
		"data-attributes": JSON.stringify(styleAttributes),
		style: { backgroundColor: bgColor, overflow: "hidden" },
	});

	const selectedOptions = selectValues.filter((item: SelectOption) =>
		isSelected(item.id),
	);
	const selectedOptionValues = selectedOptions.map(
		(item: SelectOption) => item.value,
	);
	const listOptions = selectValues.filter(
		(item: SelectOption) => !isSelected(item.id),
	);
	const isPlaceholderHidden = selectedOptions.length > 0;

	return (
		<div {...blockProps} data-required={required.flg}>
			<div className="itmar-wrap">
				<div className={selectClassName}>
					<div>
						<span className={isPlaceholderHidden ? "hide" : undefined}>
							{folder_val}
							<select
								className="nomal"
								{...selectAttributes}
								name={inputName}
								data-placeholder={folder_val}
								defaultValue={
									selPattern === "multi"
										? selectedOptionValues
										: selectedOptionValues[0] || ""
								}
							>
								{selPattern === "single" && (
									<option value="">
										{t("Please Select.")}
									</option>
								)}
								{selectValues.map((optionItem: SelectOption) => {
									return (
										<option
											key={optionItem.id}
											id={String(optionItem.id)}
											className={optionItem.classname}
											value={optionItem.value}
										>
											{optionItem.label}
										</option>
									);
								})}
							</select>
						</span>
							{selectedOptions.map((optionItem: SelectOption) => (
								<a
									key={optionItem.id}
									id={String(optionItem.id)}
								data-value={optionItem.value}
							>
								<em className={optionItem.classname}>{optionItem.label}</em>
								<i></i>
							</a>
						))}
						<div className="itmar_block_opener"></div>
					</div>
					<ul>
						{selPattern === "single" && (
							<li data-value="">
								{t("Please Select.")}
							</li>
						)}
							{listOptions.map((optionItem: SelectOption) => (
								<li
									key={optionItem.id}
									id={String(optionItem.id)}
								className={optionItem.classname}
								data-value={optionItem.value}
							>
								{optionItem.label}
							</li>
						))}
					</ul>
				</div>
				<label>
					{required.flg ? (
						<>
							{labelContent}
							<span>({required.display})</span>
						</>
					) : (
						labelContent
					)}
				</label>
			</div>
		</div>
	);
	};
}

export default createSave((text) => text);

/** 昔の save()（サイトの言語で訳した文言を保存していたもの） */
export const legacySave = createSave((text) => __(text, "block-collections"));
