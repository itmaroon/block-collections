import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";

import { align_prm } from "itmar-block-packages";
import { createStretchPseudoCss } from "../../front-common";

export default function save({ attributes }) {
	const {
		buttonType,
		linkKind,
		modalClassName,
		displayType,
		buttonKey,
		outer_align,
		bgColor,
		labelContent,
		selectedPageUrl,
		isBlank,
		media,
		is_tooltip,
		stretchInfo,
		tooltip_style,
		tooltip_text,
	} = attributes;

	//ブロックの配置
	const align_style = align_prm(outer_align, true);

	const blockProps = useBlockProps.save({
		style: { backgroundColor: bgColor, ...align_style },
		"data-attributes": JSON.stringify(attributes),
	});

	const isCloseButton = buttonType === "button" && linkKind === "close";

	const buttonContent = (
		<button
			type={buttonType}
			className="itmar_design_button"
			data-key={buttonKey || ""}
			data-back={linkKind}
			data-selected_page={
				linkKind != "none" &&
				linkKind !== "stretch" &&
				linkKind != "close" &&
				linkKind !== "back" &&
				linkKind !== "forward"
					? selectedPageUrl
					: null
			}
			data-close_modal={linkKind === "close" ? modalClassName : null}
			data-open_blank={isCloseButton ? "form_close" : isBlank}
		>
			{displayType === "string" &&
				(linkKind === "stretch" ? (
					<>
						{stretchInfo.isArrow && (
							<style>{createStretchPseudoCss(stretchInfo)}</style>
						)}
						<div className={stretchInfo.isArrow ? "stretch_pseudo" : ""}>
							{stretchInfo.isOpen
								? stretchInfo.openText
								: stretchInfo.closeText}
						</div>
					</>
				) : (
					<RichText.Content value={labelContent} />
				))}

			{displayType === "image" && (
				<figure>
					<img src={media.url} className="image" alt="アップロード画像" />
				</figure>
			)}
			{displayType === "pseudo" && <div className={displayType} />}
		</button>
	);

	const toolTipContent = is_tooltip ? (
		<span
			className="itmar-toolTip-style"
			data-attributes={JSON.stringify({
				...tooltip_style,
				tooltip_text: tooltip_text,
			})}
			data-tooltip={tooltip_text}
		>
			{buttonContent}
		</span>
	) : (
		buttonContent
	);

	return (
		<div {...blockProps}>
			<div>{toolTipContent}</div>
		</div>
	);
}
