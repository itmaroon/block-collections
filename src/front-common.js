export const setSelectValue = ($, select, id, text, slug, kind) => {
	//選択済みのアイテム
	let selItem = $(".itmar_block_selectSingle > div a");
	let a = null;
	//option要素の選択
	if (typeof id === "undefined" || id === "undefined") {
		// idがundefinedまたはnullの場合、全てのoptionを選択解除
		select.find("option").prop("selected", false).change();
		select.children("div").children("span").removeClass("hide");
	} else {
		//プレイスフォルダを非表示
		select.children("div").children("span").addClass("hide");
		// idが定義されている場合、特定のoptionを選択
		select
			.find('option[id="' + id + '"]')
			.prop("selected", true)
			.change();
		//選択された要素の生成
		a = $('<a id="' + id + '" data-value="' + slug + '"/>')
			.addClass("notShown")
			.html('<em class="' + kind + '">' + text + "</em><i></i>")
			.hide();
	}

	if (selItem.length != 0) {
		selItem.removeClass().addClass("remove");
		setTimeout(function () {
			selItem.addClass("disappear"); //選択済みがあればそれを消す
			selItem.animate(
				{
					width: 0,
					height: 0,
					padding: 0,
					margin: 0,
				},
				300,
				function () {
					if (a !== null) {
						a.appendTo(select.children("div")); //新しい要素をセット
						a.slideDown(400, function () {
							//選択肢を表示
							setTimeout(function () {
								a.addClass("shown");
							}, 200);
						});
					}
				},
			);
			selItem.remove();
		}, 400);
	} else {
		if (a !== null) {
			a.appendTo(select.children("div")); //新しい要素をセット
			a.slideDown(400, function () {
				//選択肢を表示
				setTimeout(function () {
					a.addClass("shown");
				}, 200);
			});
		}
	}

	//プルダウンを消す
	select.removeClass("open");

	//ul要素内は一旦空にする
	select.find("ul").empty();

	//li要素の付け直し
	select.find("option:not(:selected)").each(function () {
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
	});
};
