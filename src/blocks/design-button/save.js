import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { ServerStyleSheet } from "styled-components";
import { renderToString } from "react-dom/server";
import { StyleComp } from "./StyleButton";
import { align_prm } from "itmar-block-packages";

export default function save({ attributes }) {
	const {
		buttonType,
		linkKind,
		displayType,
		buttonId,
		outer_align,
		bgColor,
		labelContent,
		selectedPageUrl,
		media,
	} = attributes;

	//ブロックの配置
	const align_style = align_prm(outer_align, true);

	const blockProps = useBlockProps.save({
		style: { ...align_style, backgroundColor: bgColor, overflow: "hidden" },
	});

	const sheet = new ServerStyleSheet();

	const html = renderToString(
		sheet.collectStyles(
			<div {...blockProps}>
				<StyleComp attributes={attributes}>
					<>
						{buttonType === "button" ? (
							<button
								className="itmar_design_button"
								data-selected_page={linkKind != "none" ? selectedPageUrl : null}
							>
								{displayType === "string" && (
									<RichText.Content value={labelContent} />
								)}
								{displayType === "image" && (
									<figure>
										<img
											src={media.url}
											className="image"
											alt="アップロード画像"
										/>
									</figure>
								)}
								{displayType === "pseudo" && <div className={displayType} />}
							</button>
						) : (
							<input type="submit" value={labelContent} id={buttonId} />
						)}
					</>
				</StyleComp>
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
