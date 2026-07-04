import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
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
			(option) => option.value === selectedValues,
		);

		return (
			<>
				{optionValues.map((item, index) => {
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
						<button>{__("Clear", "block-collections")}</button>
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
}
