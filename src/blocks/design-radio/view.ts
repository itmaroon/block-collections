import { styleDataApply } from "itmar-block-packages/front";
import { createRadioStyleCss } from "./StyleRadio";
import { currentViewLang, textForLang } from "../design-title/langCore";

/* 選択肢の表示名を、表示する言語の文字へ差し替え（保存された HTML には既定の言語の文字が入っている） */
const applyRadioLang = (): void => {
	const lang = currentViewLang();
	document
		.querySelectorAll<HTMLElement>(".wp-block-itmar-design-radio[data-lang-texts]")
		.forEach((block) => {
			try {
				const texts = JSON.parse(block.getAttribute("data-lang-texts") || "{}");
				Object.entries(texts.options ?? {}).forEach(([value, map]) => {
					block
						.querySelectorAll<HTMLInputElement>("input[type=radio]")
						.forEach((input) => {
							if (input.value !== value) return;
							const span = input.parentElement?.querySelector("span");
							if (span) span.textContent = textForLang(map, lang);
						});
				});
			} catch (e) {
				/* 壊れた値は無視 */
			}
		});
};
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", applyRadioLang);
} else {
	applyRadioLang();
}

styleDataApply(createRadioStyleCss, ".wp-block-itmar-design-radio", {
	target: "auto",
	classPrefix: "itmar-radio-",
	observe: true,
});

jQuery(function ($) {
	/* ------------------------------
  design-radioイベントハンドラ
  ------------------------------ */
	$(document).on(
		"change",
		".wp-block-itmar-design-radio .itmar_radio input",
		function (this: HTMLInputElement) {
			const radio_list = $(this).parent().parent().find("label");
			radio_list.removeClass("checked check_prev check_next");
			radio_list.each(function (this: HTMLElement) {
				if ($(this).find("input").is(":checked")) {
					$(this).addClass("checked ready");
					$(this).prevAll("label").addClass("check_prev");
					$(this).nextAll("label").addClass("check_next");
				}
			});
		},
	);
	//クリアボタンをクリックしたとき
	$(document).on(
		"click",
		".wp-block-itmar-design-radio .itmar_radio button",
		function (this: HTMLButtonElement) {
			//ラベルのクラス名を削除
			const radio_list = $(this).parent().parent().find("label");
			radio_list.removeClass("checked check_prev check_next ready");
			//input要素の選択を解除
			const checkElm = $(this).closest(".wp-block-itmar-design-radio");
			const inputName = String(checkElm.data("input_name") ?? "");
			checkElm
				.find(`input[name="${inputName}"]:checked`)
				.prop("checked", false)
				.each(function (this: HTMLInputElement) {
					//changeイベントをJavaScriptでも捕捉できるようにする
					this.dispatchEvent(new Event("change", { bubbles: true }));
				});
		},
	);
});
