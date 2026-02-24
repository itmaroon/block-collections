import { __ } from "@wordpress/i18n";

jQuery(function ($) {
	/* ------------------------------
  design-radioイベントハンドラ
  ------------------------------ */
	$(document).on(
		"change",
		".wp-block-itmar-design-radio .itmar_radio input",
		function () {
			let radio_list = $(this).parent().parent().find("label");
			radio_list.removeClass("checked check_prev check_next");
			radio_list.each(function () {
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
		function () {
			//ラベルのクラス名を削除
			let radio_list = $(this).parent().parent().find("label");
			radio_list.removeClass("checked check_prev check_next ready");
			//input要素の選択を解除
			let checkElm = $(this).closest(".wp-block-itmar-design-radio");
			let inputName = checkElm.data("input_name");
			checkElm
				.find(`input[name="${inputName}"]:checked`)
				.prop("checked", false)
				.each(function () {
					//changeイベントをJavaScriptでも捕捉できるようにする
					this.dispatchEvent(new Event("change", { bubbles: true }));
				});
		},
	);
});
