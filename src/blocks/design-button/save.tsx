import { __ } from "@wordpress/i18n";
import { useBlockProps, RichText } from "@wordpress/block-editor";

import { align_prm } from "itmar-block-packages";
import { createStretchPseudoCss } from "../front-common";
import { defaultText } from "../design-title/langCore";
import type { DesignButtonSaveProps } from "./types";
import metadata from "./block.json";

/*
 * data-attributes のキーを、block.json の定義順にそろえる。
 * 編集で後から足した属性（ラベルや画像など）は、キーが末尾に足される。一方、読み直したときの再生成は
 * 定義順になるので、保存時の並びが定義順でないと、新設直後のリロードで無効になる。
 */
const SCHEMA_KEYS = Object.keys(metadata.attributes);
const inSchemaOrder = (
	attrs: Record<string, unknown>,
): Record<string, unknown> => {
	const ordered: Record<string, unknown> = {};
	SCHEMA_KEYS.forEach((key) => {
		if (key in attrs) ordered[key] = attrs[key];
	});
	Object.keys(attrs).forEach((key) => {
		if (!(key in ordered)) ordered[key] = attrs[key];
	});
	return ordered;
};

export default function save({ attributes }: DesignButtonSaveProps) {
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
	const alignStyleObject = typeof align_style === "string" ? {} : align_style;

	const blockProps = useBlockProps.save({
		style: { backgroundColor: bgColor, ...alignStyleObject },
		"data-attributes": JSON.stringify(inSchemaOrder(attributes as Record<string, unknown>)),
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
					linkKind !== "overlay" &&
					linkKind !== "scrolltop" &&
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
							{defaultText(
								stretchInfo.isOpen ? stretchInfo.openText : stretchInfo.closeText,
							)}
						</div>
					</>
				) : (
					<RichText.Content value={defaultText(labelContent)} />
				))}

			{displayType === "image" && media && (
				<figure>
					<img
						src={media.url}
						className="image"
						alt="アップロード画像"
						style={{ visibility: "hidden" }}
					/>
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
			data-tooltip={defaultText(tooltip_text)}
		>
			{buttonContent}
		</span>
	) : (
		buttonContent
	);

	return (
		<div {...blockProps}>
			<div className="itmar-wrap">{toolTipContent}</div>
		</div>
	);
}
