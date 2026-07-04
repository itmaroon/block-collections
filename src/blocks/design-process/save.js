import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const {
		bgColor,
		figure_blocks,
		bgColor_form,
		bgGradient_form,
		radius_form,
		border_form,
		default_pos,
		mobile_pos,
		font_style_num,
		textColor_num,
		bgColor_num,
		font_style_process,
		textColor_process,
		shadow_result,
		is_shadow,
		className,
	} = attributes;
	const styleAttributes = {
		figure_blocks,
		bgColor_form,
		bgGradient_form,
		radius_form,
		border_form,
		default_pos,
		mobile_pos,
		font_style_num,
		textColor_num,
		bgColor_num,
		font_style_process,
		textColor_process,
		shadow_result,
		is_shadow,
		className,
	};
	const blockProps = useBlockProps.save({
		"data-attributes": JSON.stringify(styleAttributes),
		style: { backgroundColor: bgColor, overflow: "hidden" },
	});

	return (
		<div {...blockProps}>
			<ul className="itmar-wrap">
				{figure_blocks.map((block, index) => {
					return (
						<li
							key={index}
							className={`${block.block_name.replace(/\//g, "-")} ${
								block.block_type
							} ${index === 0 ? "ready" : ""}`}
						>
							{block.stage_info}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
