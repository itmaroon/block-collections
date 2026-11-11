import { __ } from "@wordpress/i18n";
import { styleDataApply } from "itmar-block-packages/front";

import { createCheckboxStyleCss } from "./StyleCheckbox";
import { currentViewLang, textForLang } from "../design-title/langCore";

/* 表示する言語の文字へ差し替え（保存された HTML には既定の言語の文字が入っている） */
const applyCheckboxLang = (): void => {
	const lang = currentViewLang();
	document
		.querySelectorAll<HTMLElement>(".wp-block-itmar-design-checkbox[data-lang-texts]")
		.forEach((block) => {
			try {
				const texts = JSON.parse(block.getAttribute("data-lang-texts") || "{}");
				const target = block.querySelector<HTMLElement>(".itmar-wrap > div");
				if (target && texts.labelContent) {
					target.innerHTML = textForLang(texts.labelContent, lang);
				}
			} catch (e) {
				/* 壊れた値は無視 */
			}
		});
};
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", applyCheckboxLang);
} else {
	applyCheckboxLang();
}

//保存済み属性から、React非依存のスコープ付きCSSを適用
styleDataApply(createCheckboxStyleCss, ".wp-block-itmar-design-checkbox", {
	target: "auto",
	classPrefix: "itmar-checkbox-style-",
	observe: true,
});
