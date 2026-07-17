import { styleDataApply } from "itmar-block-packages";
import { createRadioStyleCss } from "./StyleRadio";

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
