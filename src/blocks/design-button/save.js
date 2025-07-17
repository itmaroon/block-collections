import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { ServerStyleSheet } from "styled-components";
import { renderToString } from "react-dom/server";
import { StyleComp } from "./StyleButton";
import StyleTooltips from "../StyleTooltips";
import { align_prm } from "itmar-block-packages";

export default function save({ attributes }) {
	const {
		buttonType,
		linkKind,
		displayType,
		buttonKey,
		outer_align,
		bgColor,
		labelContent,
		selectedPageUrl,
		isBlank,
		media,
		is_tooltip,
		tooltip_style,
		tooltip_text,
	} = attributes;

	//ブロックの配置
	const align_style = align_prm(outer_align, true);

	const blockProps = useBlockProps.save({
		style: { ...align_style, backgroundColor: bgColor },
	});

	const sheet = new ServerStyleSheet();
	const buttonContent =
		buttonType === "button" ? (
			<button
				className="itmar_design_button"
				data-selected_page={linkKind != "none" ? selectedPageUrl : null}
				data-open_blank={isBlank}
			>
				{displayType === "string" && <RichText.Content value={labelContent} />}
				{displayType === "image" && (
					<figure>
						<img src={media.url} className="image" alt="アップロード画像" />
					</figure>
				)}
				{displayType === "pseudo" && <div className={displayType} />}
			</button>
		) : (
			<input type="submit" value={labelContent} data-key={buttonKey} />
		);
	const toolTipContent = is_tooltip ? (
		<StyleTooltips attributes={tooltip_style} tooltip={tooltip_text}>
			{buttonContent}
		</StyleTooltips>
	) : (
		buttonContent
	);
	const html = renderToString(
		sheet.collectStyles(
			<div {...blockProps}>
				<StyleComp attributes={attributes}>{toolTipContent}</StyleComp>
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
