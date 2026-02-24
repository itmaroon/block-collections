import { __ } from "@wordpress/i18n";

jQuery(function ($) {
	/* ------------------------------
  design-buttonイベントハンドラ
  ------------------------------ */
	$(document).on("click", ".itmar_design_button", function (e) {
		if ($(this).attr("data-selected_page")) {
			let redirectUrl = $(this).attr("data-selected_page");
			let isBlank = $(this).data("open_blank");
			//リダイレクト
			if (isBlank) {
				window.open(redirectUrl, "_blank");
			} else {
				window.location.href = redirectUrl;
			}
		} else if ($(this).data("open_blank") === "form_close") {
			//modal closeボタンの処理
			if ($(this).data("close_modal")) {
				//IDかクラス名が指定されているとき
				const target_modal = $(this).data("close_modal");
				//指定された要素（.wp-block-itmar-design-group）の親を非表示
				const $target = $(this).closest(`${target_modal}`);
				if ($target.length) {
					$target.parent().parent().hide();
				}
			} else {
				//IDかクラス名が指定されていないとき
				const $button_group = $(this)
					.closest(".wp-block-itmar-design-group")
					.parent();
				//ボタンをラップした要素（.wp-block-itmar-design-group）のさらに上の要素（.wp-block-itmar-design-group）を非表示
				const $target = $button_group
					.closest(".wp-block-itmar-design-group")
					.parent();
				$target.hide();
			}
		}
	});
});
