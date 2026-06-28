import { __ } from "@wordpress/i18n";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export default function save({ attributes }) {
	const {
		selectedMonth,
		inputName,
		isReleaseButton,
		isDateArea,
		isHoliday,
		tooltip_style,
		...styleAttr
	} = attributes;

	const blockProps = useBlockProps.save({
		"data-attributes": JSON.stringify(styleAttr),
		style: {
			backgroundColor: styleAttr.bgColor,
			width: "100%",
			// overflow: "hidden",
		},
	});

	function renderContent() {
		return (
			<div className="itmar_date_area">
				{week.map((item, index) => (
					<label
						key={index}
						className="itmar_week_label"
						style={{ gridArea: item }}
					>
						<span>{item}</span>
					</label>
				))}
			</div>
		);
	}

	return (
		<>
			<div
				{...blockProps}
				data-selected_month={selectedMonth}
				data-week_top={styleAttr.weekTop}
				data-input_name={inputName}
				data-is_release={isReleaseButton ? "true" : "false"}
				data-is_holiday={isHoliday ? "true" : "false"}
			>
				<div className="itmar-wrap">
					<InnerBlocks.Content />
					{isDateArea && renderContent()}
				</div>
			</div>
		</>
	);
}
