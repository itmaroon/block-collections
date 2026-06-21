import { __ } from "@wordpress/i18n";

import { styleComponentApply } from "itmar-block-packages";

import { StyleComp } from "./StyleButton";
import StyleTooltips from "../StyleTooltips";
import {
	createStretchPseudoCss,
	applyStretchAccordion,
} from "../../front-common";

//styled_conponentの適用
styleComponentApply(StyleComp, ".wp-block-itmar-design-button");
styleComponentApply(StyleTooltips, ".itmar-toolTip-style");

jQuery(function ($) {
	$(".wp-block-itmar-design-button").each(function () {
		const $button = $(this);
		const rawAttributes = $button.attr("data-attributes");
		const blockAttributes = rawAttributes ? JSON.parse(rawAttributes) : null;
		const el = $(`#${blockAttributes.stretchInfo.groupId}`).get(0);
		if (!el) return;
		applyStretchAccordion(el, false);
	});

	/* ------------------------------
  design-buttonイベントハンドラ
  ------------------------------ */
	$(document).on("click", ".itmar_design_button", function (e) {
		//リダイレクトの処理
		if ($(this).attr("data-selected_page")) {
			let redirectUrl = $(this).attr("data-selected_page");
			let isBlank = $(this).data("open_blank");
			//リダイレクト
			if (isBlank) {
				window.open(redirectUrl, "_blank");
			} else {
				window.location.href = redirectUrl;
			}
			//モーダルのクローズ処理
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
			//ストレッチの処理
		} else if ($(this).data("back") === "stretch") {
			//ブロックの属性を取得
			const rawAttributes = $(this)
				.closest(".wp-block-itmar-design-button")
				.attr("data-attributes");

			const blockAttributes = rawAttributes ? JSON.parse(rawAttributes) : null;

			const el = $(`#${blockAttributes.stretchInfo.groupId}`).get(0);
			if (!el) return;
			const isOpen = !$(this).hasClass("is-open");

			$(this).toggleClass("is-open", isOpen);

			applyStretchAccordion(el, isOpen);
			//ボタンのレンダリング変更
			const $pseudo = $(this).find(".stretch_pseudo");
			$pseudo
				.css("--stretch-arrow-rotate", isOpen ? "-45deg" : "135deg")
				.text(
					isOpen
						? blockAttributes.stretchInfo.openText
						: blockAttributes.stretchInfo.closeText,
				);
		}
	});
});
