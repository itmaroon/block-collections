import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { ServerStyleSheet } from "styled-components";
import { renderToString } from "react-dom/server";
import { StyleComp } from "./StyleCalender";

const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export default function save({ attributes }) {
	const { bgColor, inputName, dateValues, selectedValue } = attributes;

	const blockProps = useBlockProps.save({
		style: {
			backgroundColor: bgColor,
			width: "fit-content",
			overflow: "hidden",
		},
	});

	function renderContent() {
		return (
			<>
				{week.map((item, index) => (
					<label
						key={index}
						className="itmar_week_label"
						style={{ gridArea: item }}
					>
						<span>{item}</span>
					</label>
				))}
				{dateValues.map((item, index) => {
					const checkClass =
						selectedValue === item.date ? "ready checked" : "ready";
					const weekClass =
						item.weekday === 0
							? "holiday"
							: item.weekday === 6
							? "saturday"
							: "";

					return (
						<label
							key={item.id}
							className={`itmar_radio ${checkClass} ${weekClass}`}
							style={{ gridArea: `day${item.date}` }}
						>
							<input
								type="radio"
								name={inputName}
								value={item.date}
								checked={selectedValue === item.date}
							/>
							<span>{String(item.date)}</span>
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
