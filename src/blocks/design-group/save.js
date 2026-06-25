import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const {
		className,
		domType,
		formID,
		is_menu,
		is_submenu,
		is_anime,
		anime_prm,
		is_link,
		selectedPageUrl,
		isBlank,
		is_swiper,
	} = attributes;

	const blockProps = useBlockProps.save({
		//className: className,
		"data-attributes": JSON.stringify(attributes),
	});

	const contentDom =
		domType === "div" && formID ? (
			<div
				id={formID}
				className={`group_contents${is_anime ? " fadeTrigger" : ""}`}
				data-is_anime={is_anime}
				data-anime_prm={JSON.stringify(anime_prm)}
			>
				<InnerBlocks.Content />
			</div>
		) : domType === "div" ? (
			<div
				className={`group_contents${is_anime ? " fadeTrigger" : ""}`}
				data-is_anime={is_anime}
				data-anime_prm={JSON.stringify(anime_prm)}
			>
				<InnerBlocks.Content />
			</div>
		) : domType === "form" && formID ? (
			<form
				id={formID}
				method="POST"
				className={`group_contents${is_anime ? " fadeTrigger" : ""}`}
				data-is_anime={is_anime}
				data-anime_prm={JSON.stringify(anime_prm)}
			>
				<InnerBlocks.Content />
			</form>
		) : (
			<form
				method="POST"
				className={`group_contents${is_anime ? " fadeTrigger" : ""}`}
				data-is_anime={is_anime}
				data-anime_prm={JSON.stringify(anime_prm)}
			>
				<InnerBlocks.Content />
			</form>
		);

	const innerContent = is_swiper ? (
		<div className="swiper-slide">
			<div className="itmar-wrap">
				<div {...blockProps}>{contentDom}</div>
			</div>
		</div>
	) : (
		<div className="itmar-wrap">
			<div {...blockProps}>{contentDom}</div>
		</div>
	);

	const linkRender = (
		<a
			href={selectedPageUrl}
			style={{ textDecoration: "none" }}
			target={isBlank ? "_blank" : "_self"}
			rel={isBlank ? "noopener noreferrer" : undefined}
		>
			{innerContent}
		</a>
	);

	return (
		<>
			{is_menu && !is_submenu && (
				<>
					<div className="itmar_hamberger_btn">
						<span></span>
						<span></span>
						<span></span>
					</div>
					<div className="itmar_back_ground"></div>
				</>
			)}
			{is_link ? linkRender : innerContent}
		</>
	);
}
