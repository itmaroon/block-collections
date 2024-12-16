import { __ } from "@wordpress/i18n";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { ServerStyleSheet } from "styled-components";
import { renderToString } from "react-dom/server";
import { StyleComp } from "./StyleCalender";
import StyleTooltips from "../StyleTooltips";

const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const styleCompToDom = (styleComp) => {
	const sheet = new ServerStyleSheet();
	const html = renderToString(sheet.collectStyles(styleComp));
	const styleTags = sheet.getStyleTags();

	// 正規表現で styled-components のクラス名を取得
	const classMatch = html.match(/class="([^"]+)"/);
	const className = classMatch ? classMatch[1] : "";

	const retVal = { className: className, styleTags: styleTags };

	return retVal;
};

export default function save({ attributes }) {
	const {
		bgColor,
		selectedMonth,
		inputName,
		weekTop,
		isReleaseButton,
		isHoliday,
		calenderApiKey,
		tooltip_style,
	} = attributes;

	const blockProps = useBlockProps.save({
		style: {
			backgroundColor: bgColor,
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

	//styled-componentsのHTML化
	const mainDom = styleCompToDom(<StyleComp attributes={attributes} />);
	const tipsDom = styleCompToDom(<StyleTooltips attributes={tooltip_style} />);

	return (
		<>
			<div
				{...blockProps}
				data-selected_month={selectedMonth}
				data-week_top={weekTop}
				data-input_name={inputName}
				data-is_release={isReleaseButton ? "true" : "false"}
				data-is_holiday={isHoliday ? "true" : "false"}
				data-api_key={calenderApiKey}
				data-tips_class={tipsDom.className}
			>
				<div className={mainDom.className}>
					<InnerBlocks.Content />
					{renderContent()}
				</div>
			</div>

			<div dangerouslySetInnerHTML={{ __html: mainDom.styleTags }} />
			<div dangerouslySetInnerHTML={{ __html: tipsDom.styleTags }} />
		</>
	);
}
