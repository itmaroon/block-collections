import { __ } from "@wordpress/i18n";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import type { CalendarSaveProps } from "./types";
import { buildMonthList } from "./months";

const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export default function save({ attributes }: CalendarSaveProps) {
	const {
		selectedMonth,
		inputName,
		isReleaseButton,
		isDateArea,
		isHoliday,
		tooltip_style,
		// 月の切り替えをダイアログにしたときだけ使う属性。
		// 「select」のままの保存内容を変えないため、ここで切り離しておく。
		monthNavStyle,
		yearLabelFormat,
		monthLabelFormat,
		dialogBgColor,
		dialogColor,
		radius_dialog,
		border_dialog,
		is_shadow_dialog,
		shadow_dialog,
		shadow_result_dialog,
		font_style_dialog,
		dialogBackdropColor,
		dialogSelectedColor,
		dialogSelectedBgColor,
		...styleAttr
	} = attributes;

	const isDialogNav = monthNavStyle === "dialog";
	const dialogAttr = isDialogNav
		? {
				monthNavStyle,
				yearLabelFormat,
				monthLabelFormat,
				dialogBgColor,
				dialogColor,
				radius_dialog,
				border_dialog,
				is_shadow_dialog,
				shadow_dialog,
				shadow_result_dialog,
				// 既定値を持たない属性は、未設定なら JSON に出ない（以前の保存内容と一致する）
				font_style_dialog,
				dialogBackdropColor,
				dialogSelectedColor,
				dialogSelectedBgColor,
		  }
		: {};

	//属性オブジェクトをキー順に並び変え
	const dataAttributeValues = {
		...styleAttr,
		tooltip_style,
		...dialogAttr,
	};

	const sortedDataAttributes = Object.fromEntries(
		Object.entries(dataAttributeValues).sort(([keyA], [keyB]) =>
			keyA.localeCompare(keyB),
		),
	);
	const dataAttributes = JSON.stringify(sortedDataAttributes);

	const blockProps = useBlockProps.save({
		"data-attributes": dataAttributes,
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

	/*
	 * ダイアログ方式では design-select を置かない。月の値を持つ <select> は
	 * 予約ブロックなど他のブロックも読むので、同じクラス構造の非表示の <select> を
	 * ここから出して、値の置き場にする。
	 */
	function renderMonthState() {
		const months = buildMonthList(styleAttr.dateSpan);
		return (
			<div className="itmar_select_month itmar_month_state" hidden>
				<div className="itmar_block_selectSingle">
					<select name={`${inputName}_month`}>
						{months.map((item) => (
							<option
								key={item.value}
								value={item.value}
								selected={item.value === selectedMonth}
							>
								{item.value}
							</option>
						))}
					</select>
				</div>
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
				{...(isDialogNav ? { "data-month_nav": "dialog" } : {})}
			>
				<div className="itmar-wrap">
					<InnerBlocks.Content />
					{isDialogNav && renderMonthState()}
					{isDateArea && renderContent()}
				</div>
			</div>
		</>
	);
}
