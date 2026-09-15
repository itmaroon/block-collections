/**
 * design-group の旧バージョン定義。
 *
 * ハンバーガーを <div> から <button> へ変えたことで save() の出力が変わった。
 * WordPress は保存済みHTMLと save() の出力を突き合わせて検証するため、これが
 * 無いと既存のメニューブロックが「予期しないエラー」になる。ここに旧実装を
 * 残しておくと、古いマークアップはそのまま有効と判定され、次に保存された
 * ときに新しい形へ移行する。
 *
 * 【決まり】save() の出力を変えるときは、変更前の実装を必ずここへ積むこと。
 * 配布物である以上、利用者のコンテンツが更新で壊れてはいけない。
 */
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import type { BlockDeprecation } from "@wordpress/blocks";
import metadata from "./block.json";
import type { GroupAttributes, GroupSaveProps } from "./types";

function saveV1({ attributes }: GroupSaveProps) {
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

//v1: ハンバーガーが <div class="itmar_hamberger_btn"> だった頃
const v1: BlockDeprecation<GroupAttributes> = {
	attributes: metadata.attributes as never,
	supports: metadata.supports as never,
	save: saveV1 as never,
};

export default [v1];
