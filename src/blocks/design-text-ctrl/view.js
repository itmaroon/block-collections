import { __ } from "@wordpress/i18n";
import visibleIcon from "../../../assets/img/visible.svg";
import hideIcon from "../../../assets/img/hide.svg";

import { fetchZipToAddress } from "itmar-block-packages";

jQuery(function ($) {
	/* ------------------------------
      design-text-ctrl
      ------------------------------ */
	let input_elm = $(".wp-block-itmar-design-text-ctrl.is-style-line").find(
		"input, textarea",
	);
	input_elm.change(function () {
		let content = $(this).val();
		if (content) {
			$(this).removeClass("empty");
		} else {
			$(this).addClass("empty");
		}
	});

	$(".wp-block-itmar-design-text-ctrl textarea").on("input", function () {
		$(this).css("height", "auto");
		//テキストエリアの高さ更新
		let scrollHeight = $(this).get(0).scrollHeight;
		//textareaの高さに入力内容の高さを設定
		$(this).css("height", scrollHeight + "px");
	});
	//パスワードの表示切替
	$(".toggle-password-button").on("click", function () {
		const $button = $(this);
		const $input = $button.siblings(
			"input[type='password'], input[type='text']",
		);
		const $img = $button.find("img");

		if ($input.length === 0) return;

		const isPasswordVisible = $input.attr("type") === "text";

		// type属性を切り替え
		$input.attr("type", isPasswordVisible ? "password" : "text");

		// アイコンを切り替え
		$img.attr("src", isPasswordVisible ? hideIcon : visibleIcon);
	});
	//ナンバーの操作

	$(document).on(
		"click",
		".number-input-wrapper .number-stepper-minus",
		function () {
			const $wrapper = $(this).closest(".number-input-wrapper");
			const $input = $wrapper.find('input[type="number"]').first();
			if (!$input.length) return;

			const min = Number($input.attr("min"));
			const step = Number($input.attr("step")) || 1;

			let current = Number($input.val());
			if (isNaN(current)) current = 0;

			let next = current - step;
			if (!isNaN(min)) next = Math.max(next, min);

			$input.val(next).trigger("input").trigger("change");
		},
	);

	$(document).on(
		"click",
		".number-input-wrapper .number-stepper-plus",
		function () {
			const $wrapper = $(this).closest(".number-input-wrapper");
			const $input = $wrapper.find('input[type="number"]').first();
			if (!$input.length) return;

			const max = Number($input.attr("max"));
			const step = Number($input.attr("step")) || 1;

			let current = Number($input.val());
			if (isNaN(current)) current = 0;

			let next = current + step;
			if (!isNaN(max)) next = Math.min(next, max);

			$input.val(next).trigger("input").trigger("change");
		},
	);
	//住所の郵便番号検索
	$(".zip-search-button").on("click", async function () {
		const $button = $(this);
		const $container = $button.closest(".zip-search-wrapper");
		const $zipInput = $container.find("input[type='text']");
		const zip = $zipInput.val().replace("-", "").trim();
		const targetName = $zipInput.data("address-target"); // 👈 入力対象名
		if (!/^\d{7}$/.test(zip)) {
			alert(
				__(
					"Please enter your postal code as 7 digits without hyphens.",
					"block-collections",
				),
			);
			return;
		}

		const address_obj = await fetchZipToAddress(zip);
		if (!address_obj) return;

		const fullAddress = `${address_obj.address1}${address_obj.address2}${address_obj.address3}`;

		// name属性でターゲットのinputを特定して値をセット
		const $targetInput = $(`input[name='${targetName}']`);
		if ($targetInput.length > 0) {
			$targetInput.val(fullAddress);
		} else {
			alert(
				__(
					"The block to enter the address cannot be found.",
					"block-collections",
				),
			);
		}
	});
});
