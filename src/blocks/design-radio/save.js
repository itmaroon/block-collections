import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { ServerStyleSheet } from "styled-components";
import { renderToString } from "react-dom/server";
import { StyleComp } from "./StyleRadio";

export default function save({ attributes }) {
	const { bgColor, inputName, optionValues, selectedValues, isReleaseButton } =
		attributes;

	const blockProps = useBlockProps.save({
		style: { backgroundColor: bgColor, overflow: "hidden" },
	});

	function renderContent() {
		return (
			<>
				{optionValues.map((item, index) => {
					// const isChecked = selectedValues === item.value;
					// let labelClass = "";
					// // 選択されたラジオボタンのインデックスを見つける
					// const selectedIndex = optionValues.findIndex(
					// 	(option) => option.value === selectedValues,
					// );

					// if (isChecked) {
					// 	labelClass = "checked"; //チェックされているボタンのラベルにはcheckedクラスを付加
					// } else if (selectedIndex !== -1) {
					// 	// 選択された項目が存在する場合
					// 	if (index < selectedIndex) {
					// 		labelClass = "check_prev"; //チェックされている前のボタンのラベルにはcheck_prevクラスを付加
					// 	} else if (index > selectedIndex) {
					// 		labelClass = "check_next"; //チェックされている後のボタンのラベルにはcheck_nextクラスを付加
					// 	}
					// }
					return (
						<label key={item.id} className={`itmar_radio`}>
							<input type="radio" name={inputName} value={item.value} />
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

	const sheet = new ServerStyleSheet();
	const html = renderToString(
		sheet.collectStyles(
			<div {...blockProps} data-input_name={inputName}>
				<StyleComp attributes={attributes}>{renderContent()}</StyleComp>
			</div>,
		),
	);
	const styleTags = sheet.getStyleTags();

	return (
		<>
			<div dangerouslySetInnerHTML={{ __html: html }} />
			<div dangerouslySetInnerHTML={{ __html: styleTags }} />
		</>
	);
}
