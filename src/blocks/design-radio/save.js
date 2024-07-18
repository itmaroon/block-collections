import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { ServerStyleSheet } from "styled-components";
import { renderToString } from "react-dom/server";
import { StyleComp } from "./StyleRadio";

export default function save({ attributes }) {
	const { bgColor, inputName, optionValues, selectedValues } = attributes;

	const blockProps = useBlockProps.save({
		style: { backgroundColor: bgColor, overflow: "hidden" },
	});

	function renderContent() {
		return (
			<>
				{optionValues.map((item, index) => {
					const isChecked = selectedValues === item.value;
					let labelClass = "";
					// 選択されたラジオボタンのインデックスを見つける
					const selectedIndex = optionValues.findIndex(
						(option) => option.value === selectedValues,
					);

					if (isChecked) {
						labelClass = "checked"; //チェックされているボタンのラベルにはcheckedクラスを付加
					} else if (selectedIndex !== -1) {
						// 選択された項目が存在する場合
						if (index < selectedIndex) {
							labelClass = "check_prev"; //チェックされている前のボタンのラベルにはcheck_prevクラスを付加
						} else if (index > selectedIndex) {
							labelClass = "check_next"; //チェックされている後のボタンのラベルにはcheck_nextクラスを付加
						}
					}

					return (
						<label key={item.id} className={`itmar_radio ready ${labelClass}`}>
							<input
								type="radio"
								name={inputName}
								value={item.value}
								checked={selectedValues === item.value}
							/>
							<span>{item.label}</span>
						</label>
					);
				})}
			</>
		);
	}

	const sheet = new ServerStyleSheet();
	const html = renderToString(
		sheet.collectStyles(
			<div {...blockProps}>
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
