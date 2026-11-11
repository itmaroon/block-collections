import { styleDataApply } from "itmar-block-packages/front";
import { createProcessStyleCss } from "./StyleProcess";
import { currentViewLang, textForLang } from "../design-title/langCore";

/* ------------------------------
  表示する言語の文字へ差し替え
  ------------------------------
  保存された HTML には既定の言語の文字が入っている。言語ごとの文字は data-attributes の
  figure_blocks（stage_info）に持っているので、表示している言語（URL → Cookie → 既定）の文字に差し替える。 */
const applyProcessLang = (): void => {
	const lang = currentViewLang();
	document
		.querySelectorAll<HTMLElement>(".wp-block-itmar-design-process")
		.forEach((block) => {
			try {
				const attrs = JSON.parse(block.getAttribute("data-attributes") || "{}");
				const items = block.querySelectorAll<HTMLElement>("ul > li");
				(attrs.figure_blocks ?? []).forEach(
					(info: { stage_info?: unknown }, i: number) => {
						const stage = info?.stage_info;
						if (stage && typeof stage === "object" && items[i]) {
							items[i].textContent = textForLang(stage, lang);
						}
					},
				);
			} catch (e) {
				/* 壊れた値は無視 */
			}
		});
};
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", applyProcessLang);
} else {
	applyProcessLang();
}

styleDataApply(createProcessStyleCss, ".wp-block-itmar-design-process", {
	getTarget: (el: Element) =>
		el.querySelector("ul.itmar-wrap") ||
		el.querySelector("ul") ||
		el,
	classPrefix: "itmar-process-",
	observe: true,
});
