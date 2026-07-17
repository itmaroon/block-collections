import { styleDataApply } from "itmar-block-packages";
import { createSelectStyleCss } from "./StyleSelect";
import { setSelectValue } from "../front-common";

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
