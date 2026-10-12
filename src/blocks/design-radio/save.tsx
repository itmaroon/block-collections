import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import type { RadioOption, RadioSaveProps } from "./types";

/**
 * save() の出力は、サイトの言語で変えない（言語が違うサイトに移すと、保存された内容と食い違って、ブロックが無効になるため）。
 * ラベルは英語で保存し、表示のときに、サーバー側（block-collections.php の render_block フィルター）で、サイトの言語に訳す。
 * 翻訳ありで保存した昔の内容は、legacySave（deprecated）で読む。
 */
export function createSave(t: (text: string) => string) {
	return function save({ attributes }: RadioSaveProps) {
	const {
		bgColor,
		inputName,
		optionValues,
		selectedValues,
		isReleaseButton,
		font_style_input,
		default_pos,
		mobile_pos,
		inputColor,
		radius_box,
		border_box,
		radius_input,
		border_input,
		shadow_result_box,
		is_shadow_box,
		shadow_result_input,
		is_shadow_input,
		buttonColor,
		buttonBgColor,
		shadow_result_select,
		is_shadow_select,
		color_select,
		bgColor_select,
		bgGradient_select,
		className,
	} = attributes;
	const styleAttributes = {
		font_style_input,
		default_pos,
		mobile_pos,
		inputColor,
		radius_box,
		border_box,
		radius_input,
		border_input,
		shadow_result_box,
		is_shadow_box,
		shadow_result_input,
		is_shadow_input,
		buttonColor,
		buttonBgColor,
		shadow_result_select,
		is_shadow_select,
		color_select,
		bgColor_select,
		bgGradient_select,
		className,
	};

	const blockProps = useBlockProps.save({
		"data-attributes": JSON.stringify(styleAttributes),
		style: { backgroundColor: bgColor, overflow: "hidden" },
	});

	function renderContent() {
		const selectedIndex = optionValues.findIndex(
			(option: RadioOption) => option.value === selectedValues,
		);

		return (
			<>
				{optionValues.map((item: RadioOption, index: number) => {
					const isChecked = selectedValues === item.value;
					let labelClass = "";

					if (isChecked) {
						labelClass = "checked ready";
					} else if (selectedIndex !== -1) {
						if (index < selectedIndex) {
							labelClass = "check_prev";
						} else if (index > selectedIndex) {
							labelClass = "check_next";
						}
					}

					return (
						<label key={item.id} className={`itmar_radio ${labelClass}`.trim()}>
							<input
								type="radio"
								name={inputName}
								value={item.value}
								defaultChecked={isChecked}
							/>
							<span>{item.label}</span>
						</label>
					);
				})}
				{isReleaseButton && (
					<label className="itmar_radio">
						<button>{t("Clear")}</button>
					</label>
				)}
			</>
		);
	}

	return (
		<div {...blockProps} data-input_name={inputName}>
			<div className="itmar-wrap">{renderContent()}</div>
		</div>
	);
	};
}

export default createSave((text) => text);

/** 昔の save()（サイトの言語で訳した文言を保存していたもの） */
export const legacySave = createSave((text) => __(text, "block-collections"));
