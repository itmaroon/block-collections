import { styleDataApply } from "itmar-block-packages/front";
import { createSelectStyleCss } from "./StyleSelect";
import { setSelectValue } from "../front-common";
import { currentViewLang, textForLang } from "../design-title/langCore";

/* ------------------------------
  表示する言語の文字へ差し替え
  ------------------------------
  保存された HTML には既定の言語の文字が入っている。言語ごとの文字は data-lang-texts に持っているので、
  表示している言語（URL → Cookie → 既定）の文字に差し替える。 */
const applySelectLang = (): void => {
	const lang = currentViewLang();
	document
		.querySelectorAll<HTMLElement>(".wp-block-itmar-design-select[data-lang-texts]")
		.forEach((block) => {
			let texts: Record<string, any>;
			try {
				texts = JSON.parse(block.getAttribute("data-lang-texts") || "{}");
			} catch (e) {
				return;
			}
			//選択肢の表示名（option・選択済みの表示・リスト）。id で対応づける
			const options = (texts as { options?: Record<string, Record<string, string>> }).options;
			if (options) {
				Object.entries(options).forEach(([id, map]) => {
					const text = textForLang(map, lang);
					const esc = id.replace(/"/g, '\\"');
					block
						.querySelectorAll<HTMLElement>(`option[id="${esc}"], li[id="${esc}"]`)
						.forEach((el) => (el.textContent = text));
					block
						.querySelectorAll<HTMLElement>(`a[id="${esc}"] em`)
						.forEach((el) => (el.textContent = text));
				});
			}
			const labelElm = block.querySelector<HTMLElement>("label");
			if (!labelElm) return;
			if (texts.labelContent) {
				const first = labelElm.firstChild;
				const text = textForLang(texts.labelContent, lang);
				if (first && first.nodeType === Node.TEXT_NODE) first.textContent = text;
				else if (!labelElm.querySelector("span")) labelElm.textContent = text;
			}
			const span = labelElm.querySelector<HTMLElement>("span");
			if (span && texts.requiredDisplay) {
				span.textContent = `(${textForLang(texts.requiredDisplay, lang)})`;
			}
		});
};
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", applySelectLang);
} else {
	applySelectLang();
}

styleDataApply(createSelectStyleCss, ".wp-block-itmar-design-select", {
	target: "auto",
	classPrefix: "itmar-select-",
	observe: true,
});

jQuery(function ($) {
	/* ------------------------------
  design-selectイベントハンドラ
  ------------------------------ */
	//矢印かセレクトボックスを押したとき
	$(document).on("click", ".itmar_block_select > div", function (this: HTMLElement) {
		$(this).parent().toggleClass("open");
	});

	//セレクトボックスからマウスが外れた時
	$(document).on("mouseleave", ".itmar_block_select", function (this: HTMLElement) {
		$(this).removeClass("open");
	});

	//select要素のオプションクリック時(複数選択)
	$(document).on("click", ".itmar_block_selectMultiple ul li", function (this: HTMLElement) {
		const select = $(this).parent().parent();
		const li = $(this);
		const id = li.attr("id");
		const slug = String(li.data("value") ?? "");
		const kind = li.attr("class") ?? "";

		if (!select.hasClass("clicked")) {
			select.addClass("clicked");
			li.addClass("remove");
			//プレイスフォルダを非表示
			select.children("div").children("span").addClass("hide");
			//option要素の選択
			const option_slug = select.find('option[id="' + id + '"]');
			option_slug.each(function (this: HTMLOptionElement) {
				$(this).prop("selected", true).change();
			});
			//選択された要素の生成
			const a = $('<a id="' + id + '" data-value="' + slug + '"/>')
				.addClass("notShown")
				.html('<em class="' + kind + '">' + li.text() + "</em><i></i>")
				.appendTo(select.children("div"));

			setTimeout(function () {
				a.addClass("shown");
			}, 500);
			setTimeout(function () {
				li.slideUp(400, function () {
					$(this).remove();
					select.removeClass("clicked");
				});
			}, 600);
		}
	});

	//select要素のクリック時(単数選択)
	$(document).on("click", ".itmar_block_selectSingle  ul li", function (this: HTMLElement) {
		const select = $(this).parent().parent();
		const li = $(this);
		const slug = String(li.data("value") ?? "");
		const kind = li.attr("class") ?? "";
		const id = li.attr("id");
		const text = li.text();

		//選択されたli要素の属性を関数に渡す
		setSelectValue($, select, id, text, slug, kind);
	});

	//select要素の選択済み要素を押したとき
	$(document).on(
		"click",
		".itmar_block_selectMultiple > div a",
		function (this: HTMLElement, event: JQuery.ClickEvent) {
			// イベント伝播を停止
			event.stopPropagation();

			const select = $(this).parent().parent();
			const self = $(this);
			const id = self.attr("id");
			const kind = self.find("em").attr("class") ?? "";

			self.removeClass().addClass("remove");
			select.addClass("open");
			//ul要素内は一旦空にする
			select.find("ul").empty();
			//選択の解除
			select
				.find('option[id="' + id + '"]')
				.prop("selected", false)
				.change();

			//選択解除されたli要素
			let liInSelect: JQuery<HTMLElement> | null = null;
			//li要素の付け直し
			select.find("option:not(:selected)").each(function (this: HTMLOptionElement) {
				if ($(this).attr("id") === id) {
					//選択解除されたオプションであるかどうか
					//アニメーションの対象として確保
					liInSelect = $(
						'<li id="' +
							$(this).attr("id") +
							'" data-value="' +
							$(this).val() +
							'"/>',
					)
						.text($(this).text())
						.addClass("notShown")
						.appendTo(select.find("ul"));
				} else {
					$(
						'<li id="' +
							$(this).attr("id") +
							'" class="' +
							$(this).attr("class") +
							'" data-value="' +
							$(this).val() +
							'"/>',
					)
						.text($(this).text())
						.appendTo(select.find("ul"));
				}
			});
			setTimeout(function () {
				self.addClass("disappear");
				setTimeout(function () {
					self.animate(
						{
							width: 0,
							height: 0,
							padding: 0,
							margin: 0,
						},
						300,
						function () {
							//アニメーションのスタート
							if (!liInSelect) return;
							const restoredLi = liInSelect;
							restoredLi.slideDown(400, function () {
								restoredLi.addClass("show");
								setTimeout(function () {
									if (!select.find("option:selected").length) {
										select.children("div").children("span").removeClass("hide");
									}
									restoredLi.removeClass();
									restoredLi.addClass(kind);
								}, 400);
							});
							self.remove();
						},
					);
				}, 300);
			}, 400);
		},
	);
});
