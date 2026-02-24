import { __ } from "@wordpress/i18n";
import { setSelectValue } from "../../front-common";

jQuery(function ($) {
	/* ------------------------------
  design-selectイベントハンドラ
  ------------------------------ */
	//矢印かセレクトボックスを押したとき
	$(document).on("click", ".itmar_block_select > div", function (e) {
		$(this).parent().toggleClass("open");
	});

	//セレクトボックスからマウスが外れた時
	$(document).on("mouseleave", ".itmar_block_select", function (e) {
		$(this).removeClass("open");
	});

	//select要素のオプションクリック時(複数選択)
	$(document).on("click", ".itmar_block_selectMultiple ul li", function (e) {
		let select = $(this).parent().parent();
		let li = $(this);
		let id = li.attr("id");
		let slug = li.data("value");
		let kind = li.attr("class");

		if (!select.hasClass("clicked")) {
			select.addClass("clicked");
			li.addClass("remove");
			//プレイスフォルダを非表示
			select.children("div").children("span").addClass("hide");
			//option要素の選択
			let option_slug = select.find('option[id="' + id + '"]');
			option_slug.each(function () {
				$(this).prop("selected", true).change();
			});
			//選択された要素の生成
			let a = $('<a id="' + id + '" data-value="' + slug + '"/>')
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
	$(document).on("click", ".itmar_block_selectSingle  ul li", function (e) {
		let select = $(this).parent().parent();
		let li = $(this);
		let slug = li.data("value");
		let kind = li.attr("class");
		let id = li.attr("id");
		let text = li.text();

		//選択されたli要素の属性を関数に渡す
		setSelectValue($, select, id, text, slug, kind);
	});

	//select要素の選択済み要素を押したとき
	$(document).on(
		"click",
		".itmar_block_selectMultiple > div a",
		function (event) {
			// イベント伝播を停止
			event.stopPropagation();

			let select = $(this).parent().parent();
			let self = $(this);
			let id = self.attr("id");
			let slug = self.data("value");
			let kind = self.find("em").attr("class");

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
			let liInSelect;
			//li要素の付け直し
			select.find("option:not(:selected)").each(function () {
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
							liInSelect.slideDown(400, function () {
								liInSelect.addClass("show");
								setTimeout(function () {
									if (!select.find("option:selected").length) {
										select.children("div").children("span").removeClass("hide");
									}
									liInSelect.removeClass();
									liInSelect.addClass(kind);
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
