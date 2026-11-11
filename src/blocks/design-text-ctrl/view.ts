import { __ } from "@wordpress/i18n";
import visibleIcon from "../../../assets/img/visible.svg?url";
import hideIcon from "../../../assets/img/hide.svg?url";

import { fetchZipToAddress, styleDataApply } from "itmar-block-packages/front";
import { createInputStyleCss } from "./StyleInput";
import type { ZipAddress } from "./types";
import { currentViewLang, defaultText, textForLang } from "../design-title/langCore";

/* ------------------------------
  表示する言語の文字へ差し替え
  ------------------------------
  保存された HTML には既定の言語の文字が入っている。言語ごとの文字は data-lang-texts に持っているので、
  表示している言語（URL → Cookie → 既定）の文字に差し替える。 */
const applyTextCtrlLang = (): void => {
	const lang = currentViewLang();
	document
		.querySelectorAll<HTMLElement>(".wp-block-itmar-design-text-ctrl[data-lang-texts]")
		.forEach((block) => {
			let texts: Record<string, Record<string, string> | undefined>;
			try {
				texts = JSON.parse(block.getAttribute("data-lang-texts") || "{}");
			} catch (e) {
				return;
			}
			const pick = (key: string): { base: string; text: string } | null => {
				const map = texts[key];
				if (!map) return null;
				return { base: defaultText(map), text: textForLang(map, lang) };
			};
			const label = pick("labelContent");
			const required = pick("requiredDisplay");
			const place = pick("placeFolder");
			const isRequired = block.getAttribute("data-required") === "true";
			const isLine = block.classList.contains("is-style-line");

			//ラベル（必須のときは、文字のあとに (必須) の span が続く）
			const labelElm = block.querySelector<HTMLElement>("label");
			if (labelElm) {
				if (label) {
					const first = labelElm.firstChild;
					if (first && first.nodeType === Node.TEXT_NODE) {
						first.textContent = label.text;
					} else if (!isRequired) {
						labelElm.textContent = label.text;
					}
				}
				const span = labelElm.querySelector<HTMLElement>("span");
				if (span && required) span.textContent = `(${required.text})`;
			}

			//プレースホルダー（ライン表示のときはラベルと同じ文字。住所検索などの固定の文言は触らない）
			const baseLabel = label?.base ?? "";
			const baseRequired = required?.base ?? "";
			const lineBase = isRequired ? `${baseLabel}(${baseRequired})` : baseLabel;
			const lineText = isRequired
				? `${label?.text ?? baseLabel}(${required?.text ?? baseRequired})`
				: (label?.text ?? baseLabel);
			block
				.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea")
				.forEach((field) => {
					const current = field.getAttribute("placeholder");
					if (isLine && current === lineBase) {
						field.setAttribute("placeholder", lineText);
					} else if (!isLine && place && current === place.base) {
						field.setAttribute("placeholder", place.text);
					}
				});
		});
};
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", applyTextCtrlLang);
} else {
	applyTextCtrlLang();
}

styleDataApply(createInputStyleCss, ".wp-block-itmar-design-text-ctrl", {
	target: "auto",
	classPrefix: "itmar-text-ctrl-",
	observe: true,
});

jQuery(($) => {
	/* ------------------------------
    design-text-ctrl
      ------------------------------ */
	const input_elm = $(".wp-block-itmar-design-text-ctrl.is-style-line").find(
		"input, textarea",
	);
	input_elm.on("change", function () {
		const content = $(this).val();
		if (content) {
			$(this).removeClass("empty");
		} else {
			$(this).addClass("empty");
		}
	});

	$(".wp-block-itmar-design-text-ctrl textarea").on("input", function () {
		$(this).css("height", "auto");
		//テキストエリアの高さ更新
		const textArea = $(this).get(0) as HTMLTextAreaElement | undefined;
		if (!textArea) return;
		const scrollHeight = textArea.scrollHeight;
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
		const zip = String($zipInput.val() ?? "")
			.replace("-", "")
			.trim();
		const targetName = String($zipInput.data("address-target") ?? ""); // 👈 入力対象名
		if (!/^\d{7}$/.test(zip)) {
			alert(
				__(
					"Please enter your postal code as 7 digits without hyphens.",
					"block-collections",
				),
			);
			return;
		}

		const address_obj = (await fetchZipToAddress(zip)) as ZipAddress | null;
		if (!address_obj) return;

		const fullAddress = `${address_obj.address1 ?? ""}${
			address_obj.address2 ?? ""
		}${address_obj.address3 ?? ""}`;

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
