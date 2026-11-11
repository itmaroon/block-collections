import { styleDataApply } from "itmar-block-packages/front";

import { createTableStyleCss } from "./StyleTable";
import { currentViewLang, textForLang } from "../design-title/langCore";

//保存済み属性から、React非依存のスコープ付きCSSを適用
styleDataApply(createTableStyleCss, ".wp-block-itmar-design-table", {
	target: "self",
	classPrefix: "itmar-table-style-",
	observe: true,
});

/* ------------------------------
  表示する言語の文字へ差し替え
  ------------------------------
  保存された HTML には既定の言語の文字が入っている。言語を分けた見出し・セルは data-lang-texts に
  { col: {列: {JP, EN}}, row: {行: …}, cell: {"行,列": …} } で持っているので、表示している言語
  （URL → Cookie → 既定）の文字に差し替える。 */
const applyTableLang = (): void => {
	const lang = currentViewLang();
	document
		.querySelectorAll<HTMLElement>(".wp-block-itmar-design-table[data-lang-texts]")
		.forEach((block) => {
			let texts: {
				col?: Record<string, Record<string, string>>;
				row?: Record<string, Record<string, string>>;
				cell?: Record<string, Record<string, string>>;
			};
			try {
				texts = JSON.parse(block.getAttribute("data-lang-texts") || "{}");
			} catch (e) {
				return;
			}
			//列見出し（thead の th の並び順が列番号）
			block.querySelectorAll<HTMLElement>("thead tr:last-child > th").forEach((th, i) => {
				const map = texts.col?.[String(i)];
				if (map) th.innerHTML = textForLang(map, lang);
			});
			//行見出しと本体のセル（tbody の tr の並び順が行番号、行の中の並び順が列番号）
			block.querySelectorAll<HTMLElement>("tbody > tr").forEach((tr, r) => {
				Array.from(tr.children).forEach((cell, c) => {
					const isRowHeading = cell.tagName === "TH" && cell.getAttribute("scope") === "row";
					const map = isRowHeading ? texts.row?.[String(r)] : texts.cell?.[`${r},${c}`];
					if (map) cell.innerHTML = textForLang(map, lang);
				});
			});
		});
};
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", applyTableLang);
} else {
	applyTableLang();
}
