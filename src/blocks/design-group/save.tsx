import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import type { GroupSaveProps } from "./types";

export default function save({ attributes }: GroupSaveProps) {
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
		menuId,
		hamburger_style,
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

	//メニュー本体はハンバーガーから aria-controls で名指しできるようにIDを持つ
	const isMenuBody = is_menu && !is_submenu && !!menuId;
	const wrapId = isMenuBody ? menuId : undefined;

	const innerContent = is_swiper ? (
		<div className="swiper-slide">
			<div className="itmar-wrap" id={wrapId}>
				<div {...blockProps}>{contentDom}</div>
			</div>
		</div>
	) : (
		<div className="itmar-wrap" id={wrapId}>
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

	/*
	 * ハンバーガーの色はスコープCSSが届かない位置（.itmar-wrap の外）にあるので、
	 * 要素へCSS変数として載せ、style.scss 側が var() で受ける。
	 * 値が空のときは変数を出さず、style.scss のフォールバックに任せる。
	 */
	const hamburgerVars: Record<string, string> = {};
	if (hamburger_style?.barColor)
		hamburgerVars["--itmar-hamburger-bar"] = hamburger_style.barColor;
	if (hamburger_style?.barOpenColor)
		hamburgerVars["--itmar-hamburger-bar-open"] = hamburger_style.barOpenColor;
	/*
	 * 表示位置。style.scss の既定は top/right の 2em。
	 * 値が入っているときだけ出力する。既定値まで書き出すと、位置を触っていない
	 * 既存ブロックの save 出力まで変わり、ブロック検証エラーになるため。
	 */
	if (hamburger_style?.vertBase || hamburger_style?.vertValue) {
		const base = hamburger_style.vertBase ?? "top";
		const val = hamburger_style.vertValue ?? "2em";
		hamburgerVars.top = base === "top" ? val : "auto";
		hamburgerVars.bottom = base === "bottom" ? val : "auto";
	}
	if (hamburger_style?.horBase || hamburger_style?.horValue) {
		const base = hamburger_style.horBase ?? "right";
		const val = hamburger_style.horValue ?? "2em";
		hamburgerVars.left = base === "left" ? val : "auto";
		hamburgerVars.right = base === "right" ? val : "auto";
	}

	const backdropVars: Record<string, string> = {};
	if (hamburger_style?.backdropColor)
		backdropVars["--itmar-hamburger-backdrop"] = hamburger_style.backdropColor;
	if (typeof hamburger_style?.backdropOpacity === "number")
		backdropVars["--itmar-hamburger-backdrop-opacity"] = String(
			hamburger_style.backdropOpacity,
		);

	return (
		<>
			{is_menu && !is_submenu && (
				<>
					{/*
					 * aria-label は view.ts が実行時に付ける。save() に翻訳文字列を
					 * 埋めると、サイトの言語を変えた瞬間に保存済みHTMLと一致しなくなり
					 * ブロック検証エラーになるため。
					 */}
					<button
						type="button"
						className="itmar_hamberger_btn"
						style={hamburgerVars}
						aria-expanded="false"
						aria-controls={wrapId}
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
					<div
						className="itmar_back_ground"
						data-menu-target={wrapId}
						style={backdropVars}
						hidden
					></div>
				</>
			)}
			{is_link ? linkRender : innerContent}
		</>
	);
}
