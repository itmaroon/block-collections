import { __ } from "@wordpress/i18n";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { ServerStyleSheet } from "styled-components";
import { renderToString } from "react-dom/server";
import { StyleComp } from "./StyleCalender";

const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export default function save({ attributes }) {
	const { bgColor, selectedMonth, inputName, weekTop, isReleaseButton } =
		attributes;

	const blockProps = useBlockProps.save({
		style: {
			backgroundColor: bgColor,
			width: "fit-content",
			overflow: "hidden",
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

	//styled-componentsのHTML化
	const sheet = new ServerStyleSheet();
	const html = renderToString(
		sheet.collectStyles(<StyleComp attributes={attributes} />),
	);
	const styleTags = sheet.getStyleTags();

	// 正規表現で styled-components のクラス名を取得
	const classMatch = html.match(/class="([^"]+)"/);
	const className = classMatch ? classMatch[1] : "";

	return (
		<>
			<div
				{...blockProps}
				data-selected_month={selectedMonth}
				data-week_top={weekTop}
				data-input_name={inputName}
				data-is_release={isReleaseButton ? "true" : "false"}
			>
				<div className={className}>
					<InnerBlocks.Content />
					{renderContent()}
				</div>
			</div>

			<div dangerouslySetInnerHTML={{ __html: styleTags }} />
		</>
	);
}
