import { __ } from "@wordpress/i18n";

import { styleDataApply } from "itmar-block-packages";

import { createButtonStyleCss } from "./StyleButton";
import { createTooltipStyleCss } from "../StyleTooltips";
import { applyStretchAccordion } from "../front-common";
import type { DesignButtonAttributes } from "./types";

//ボタン本体とツールチップを、それぞれの保存属性から適用
styleDataApply(createButtonStyleCss, ".wp-block-itmar-design-button", {
	selector: ".itmar-wrap",
	target: "inner",
	classPrefix: "itmar-button-style-",
	observe: true,
	decorateTarget: (target: Element) => {
		requestAnimationFrame(() => {
			target
				.querySelectorAll<HTMLImageElement>("img.image")
				.forEach((image) => {
					image.style.visibility = "visible";
				});
		});
	},
});
styleDataApply(createTooltipStyleCss, ".itmar-toolTip-style", {
	target: "self",
	classPrefix: "itmar-button-tooltip-",
	observe: true,
});

jQuery(function ($) {
	$(".wp-block-itmar-design-button").each(function () {
		const $button = $(this);
		const rawAttributes = $button.attr("data-attributes");
		const blockAttributes: DesignButtonAttributes | null = rawAttributes
			? JSON.parse(rawAttributes)
			: null;
		if (!blockAttributes) return;
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
			const redirectUrl = $(this).attr("data-selected_page");
			const isBlank = $(this).data("open_blank");
			//リダイレクト
			if (isBlank) {
				window.open(redirectUrl, "_blank");
			} else {
				if (redirectUrl) window.location.href = redirectUrl;
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

			const blockAttributes: DesignButtonAttributes | null = rawAttributes
				? JSON.parse(rawAttributes)
				: null;
			if (!blockAttributes) return;

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
