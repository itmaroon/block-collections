/* ------------------------------
Loading イメージ表示関数
引数： msg 画面に表示する文言
------------------------------ */
function dispLoading(msg, target) {
	// 引数なし（メッセージなし）を許容
	if (msg == undefined) {
		msg = "";
	}
	// 画面表示メッセージ
	let dispMsg =
		"<div class='loadingMsg'><div class='loading_icon'></div><p>" +
		msg +
		"</p></div>";
	// ローディング画像が表示されていない場合のみ出力
	if (target == undefined) {
		//ターゲット指定がないときはbodyにつける
		target = jQuery("body");
		if (target.find(".loading").length == 0) {
			target.append("<div class='loading body'>" + dispMsg + "</div>");
		}
	} else {
		if (target.find(".loading").length == 0) {
			target.append("<div class='loading'>" + dispMsg + "</div>");
		}
	}
}

/* ------------------------------
Loading イメージ削除関数
------------------------------ */
function removeLoading(dispMsg, target) {
	if (target == undefined) {
		//ターゲット指定がないときはbodyにつける
		target = jQuery("body");
	}
	target.find(".loading").fadeOut(300, function () {
		jQuery(this).remove();
		if (dispMsg != undefined && dispMsg.length > 0) {
			// 引数ありのとき
			jQuery("body").append("<div id='result_msg' >" + dispMsg + "</div>");
			jQuery("#result_msg").slideDown(300, function () {
				setTimeout(function () {
					jQuery("#result_msg").slideUp(300, function () {
						jQuery(this).remove();
					});
				}, 2000);
			});
		}
	});
}

/* ------------------------------
メッセージ表示関数
------------------------------ */
function ctrlMsg(dispMsg) {
	jQuery("body").append("<div id='result_msg' >" + dispMsg + "</div>");
	jQuery("#result_msg").slideDown(300, function () {
		setTimeout(function () {
			jQuery("#result_msg").slideUp(300, function () {
				jQuery(this).remove();
			});
		}, 2000);
	});
}

document.addEventListener("DOMContentLoaded", (event) => {
	// ページがロードされたときに"Copy"ボタンにイベントリスナーを追加
	document
		.querySelectorAll(".wp-block-itmar-code-highlight button")
		.forEach((button) => {
			button.addEventListener("click", (event) => {
				const codeBlock = event.target.previousElementSibling;
				const code = codeBlock.innerText;

				navigator.clipboard.writeText(code).then(
					() => {
						const { __ } = wp.i18n;
						const msg = __("copied", "block-collections");
						console.log(msg);
						ctrlMsg(__("copied", "block-collections"));
					},
					(err) => {
						console.error("Could not copy text: ", err);
					},
				);
			});
		});
});

/* ------------------------------
カレンダー表示関数
------------------------------ */
const generateMonthCalendar = (dateString) => {
	const [year, month] = dateString.split("/").map(Number);
	const date = new Date(year, month - 1, 1);
	const lastDay = new Date(year, month, 0).getDate();

	const calendar = [];

	for (let day = 1; day <= lastDay; day++) {
		date.setDate(day);
		calendar.push({
			date: day,
			weekday: date.getDay(),
		});
	}

	return calendar;
};
/* ------------------------------
カレンダー用グリッドAreasの生成関数
------------------------------ */
const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const generateGridAreas = (firstDayOfMonth, totalDays, isMonday) => {
	let areas = [];
	let currentDay = 1;
	//月曜日を先頭に持ってくる場合の係数
	const mondayFirstDay = firstDayOfMonth - 1 < 0 ? 6 : firstDayOfMonth - 1;
	//先頭曜日の選択
	const modifyFirstDay = isMonday ? mondayFirstDay : firstDayOfMonth;

	//曜日ラベル
	let weekLabels = [];
	let week_index;
	for (let i = 0; i < 7; i++) {
		week_index = isMonday ? i + 1 : i; //月曜日を先頭に持ってくる場合の補正
		if (week_index > 6) week_index = 0;
		weekLabels.push(week[week_index]);
	}
	areas.push(weekLabels.join(" "));

	for (let i = 0; i < 6; i++) {
		// 6週分のループ
		let week = [];
		for (let j = 0; j < 7; j++) {
			// 1週間の7日分のループ
			if ((i === 0 && j < modifyFirstDay) || currentDay > totalDays) {
				week.push(`empty${i}`);
			} else {
				week.push(`day${currentDay}`);
				currentDay++;
			}
			if (i == 5) {
				//最後の週
				week[5] = "day_clear";
				week[6] = "day_clear";
			}
		}
		areas.push(week.join(" "));
	}
	return areas.map((week) => `"${week}"`).join("\n");
};

jQuery(function ($) {
	/* ------------------------------
 design-titleのためのサイトタイトル・キャッチフレーズの読込
 ------------------------------ */
	$(document).ready(function () {
		if ($(".itmar_site_title").length || $(".itmar_catch_title").length) {
			// '.itmar_site_title' クラスを持つ要素が読み込まれたときの処理
			fetch(`${itmar_block_option.home_url}/wp-json`)
				.then((response) => response.json())
				.then((data) => {
					$(".itmar_site_title").text(data.name);
					$(".itmar_catch_title").text(data.description);
				});
		}
	});

	/* ------------------------------
 design-groupアニメーションイベント処理
 ------------------------------ */
	const anime_parm_trigger = (flg, trigger) => {
		$(".wp-block-itmar-design-group .group_contents")
			.filter(function () {
				// data-anime_prm属性が'visible'である要素を選択
				return $(this).data("anime_prm").trigger === trigger;
			})
			.each(function () {
				if ($(this).data("is_anime")) {
					const anime_pattern = $(this).data("anime_prm").pattern;
					if (flg) {
						$(this).addClass(anime_pattern);
					} else {
						$(this).removeClass(anime_pattern);
					}
				}
			});
	};

	//オープニングの処理がない場合のアニメーション
	$(document).ready(function () {
		if ($(".fixbg").length == 0) {
			anime_parm_trigger(true, "opend");
		}
	});

	//オープニングの処理完了後のアニメーション
	$(".fixbg").on("openAnimationEnd", function () {
		anime_parm_trigger(true, "opend");
	});

	//可視領域に入った時のアニメーション
	$(window).scroll(function () {
		$(".wp-block-itmar-design-group .group_contents")
			.filter(function () {
				// data-anime_prm属性が'visible'である要素を選択
				return $(this).data("anime_prm").trigger === "visible";
			})
			.each(function () {
				const $element = $(this);
				const elementTop = $element.offset().top; // 要素の上端の位置
				const viewportHeight = $(window).height(); // ビューポートの高さ
				const scrollPosition = $(window).scrollTop(); // 現在のスクロール位置
				const anime_pattern = $(this).data("anime_prm").pattern;
				// 要素がビューポート内に入ったかどうかを判定
				if (
					elementTop < viewportHeight + scrollPosition &&
					elementTop > scrollPosition
				) {
					// ここに要素がビューポートに入った時の処理
					$(this).addClass(anime_pattern);
				} else {
					// ここに要素がビューポートから出た時の処理
					$(this).removeClass(anime_pattern);
				}
			});
	});

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

	/* ------------------------------
  design-buttonイベントハンドラ
  ------------------------------ */
	$(document).on("click", ".itmar_design_button", function (e) {
		if ($(this).data("selected_page")) {
			let redirectUrl = $(this).data("selected_page");
			//リダイレクト
			window.location.href = redirectUrl;
		}
	});
	/* ------------------------------
  design-groupのハンバーガー
  ------------------------------ */
	$(document).on(
		"click",
		".itmar_hamberger_btn, .itmar_back_ground ",
		function (e) {
			$(this).toggleClass("open");
			$(this).siblings("div").toggleClass("open");
		},
	);

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
		setSelectValue(select, id, text, slug, kind);
	});

	function setSelectValue(select, id, text, slug, kind) {
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
	}

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
	$(document).on(
		"click",
		".wp-block-itmar-design-radio .itmar_radio button",
		function () {
			//ラベルのクラス名を削除
			let radio_list = $(this).parent().parent().find("label");
			console.log(radio_list);
			radio_list.removeClass("checked check_prev check_next");
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

	/* ------------------------------
  design-calenderイベントハンドラ
  ------------------------------ */
	//デフォルトの月をセレクトボックスにセット
	$(function () {
		let select = $(".itmar_select_month .itmar_block_selectSingle");
		let setMonth = select
			.closest(".wp-block-itmar-design-calender")
			.data("selected_month");
		let li_arr = select.find("ul li");
		let li = li_arr.filter(function () {
			return $(this).attr("data-value") === setMonth;
		});
		//設定された月が選択肢に含まれる場合
		if (li.length != 0) {
			let slug = li.data("value");
			let kind = li.attr("class");
			let id = li.attr("id");
			let text = li.text();
			//選択されたli要素の属性を関数に渡す
			setSelectValue(select, id, text, slug, kind);
		}
	});
	//先月・次月ボタンが押されたとき
	$(document).on(
		"click",
		".wp-block-itmar-design-calender .itmar_prev_month, .wp-block-itmar-design-calender .itmar_next_month",
		function () {
			let select = $(".itmar_select_month .itmar_block_selectSingle");
			let selectedOption = select.find("select").find("option:selected");
			//前後の月の取得
			let changeOption = null;
			if ($(this).hasClass("itmar_prev_month")) {
				changeOption = selectedOption.prev("option");
			} else if ($(this).hasClass("itmar_next_month")) {
				changeOption = selectedOption.next("option");
			}
			if (changeOption.length != 0) {
				//前後の月がある場合
				let slug = changeOption.attr("value");
				let kind = changeOption.attr("class");
				let id = changeOption.attr("id");
				let text = changeOption.text();
				//選択されたli要素の属性を関数に渡す
				setSelectValue(select, id, text, slug, kind);
			}
		},
	);

	//セレクトブロックのセレクト要素に変更があったとき
	$(document).on(
		"change",
		".itmar_select_month .itmar_block_selectSingle select",
		function () {
			//表示月の日付オブジェクトを生成
			let selectedOption = $(this).find("option:selected");
			let monthData = generateMonthCalendar(selectedOption.attr("value"));
			//クリアボタンの有無
			const isClear = $(this)
				.closest(".wp-block-itmar-design-calender")
				.data("is_release");
			//日付エリアを取得
			const dateArea = $(this)
				.closest(".wp-block-itmar-design-calender")
				.find(".itmar_date_area");
			//Name属性の取得
			const name = $(this)
				.closest(".wp-block-itmar-design-calender")
				.data("input_name");
			//日付ボタンをいったん削除
			dateArea.find(".itmar_radio").remove();
			//日付のDOM要素の挿入
			monthData.forEach((item) => {
				const weekClass =
					item.weekday === 0 ? "holiday" : item.weekday === 6 ? "saturday" : "";
				const label = $("<label>")
					.addClass(`itmar_radio ${weekClass}`)
					.css("grid-area", `day${item.date}`);
				const input = $("<input>")
					.attr("type", "radio")
					.attr("name", name)
					.attr("value", item.date);

				const span = $("<span>").text(item.date);

				label.append(input).append(span);
				dateArea.append(label);
			});
			//クリアボタン
			if (isClear) {
				const { __ } = wp.i18n;
				const clearLabel = $("<label>")
					.addClass("itmar_radio")
					.css("grid-area", "day_clear");
				const clearButton = $("<button>").text(
					__("Clear", "block-collections"),
				);
				clearLabel.append(clearButton);
				dateArea.append(clearLabel);
			}
			//その月のgridAreasの適用
			const weekTop = $(this)
				.closest(".wp-block-itmar-design-calender")
				.data("week_top");
			let areas = generateGridAreas(
				monthData[0].weekday,
				monthData.length,
				weekTop === "mon",
			);
			dateArea.css("grid-template-areas", areas);
		},
	);
	//日付ボタンをクリックしたとき
	$(document).on("change", ".itmar_date_area input", function () {
		//日付エリアを取得
		const dateArea = $(this)
			.closest(".wp-block-itmar-design-calender")
			.find(".itmar_date_area");
		// 全てのラベルから'checked'クラスを削除
		dateArea.find("label").removeClass("checked");
		// クリックされたラベルにcheckedを付加(input要素がcheckされているとき)
		if ($(this).is(":checked")) {
			$(this).parent("label").addClass("checked");
		}
	});
	//クリアボタンをクリックしたとき
	$(document).on("click", ".itmar_date_area button", function () {
		//日付エリアを取得
		const dateArea = $(this)
			.closest(".wp-block-itmar-design-calender")
			.find(".itmar_date_area");
		// 全てのラベルから'checked'クラスを削除
		dateArea.find("label").removeClass("checked");
		//input要素の選択を解除
		let checkElm = $(this).closest(".wp-block-itmar-design-calender");
		let inputName = checkElm.data("input_name");
		checkElm
			.find(`input[name="${inputName}"]:checked`)
			.prop("checked", false)
			.each(function () {
				//changeイベントをJavaScriptでも捕捉できるようにする
				this.dispatchEvent(new Event("change", { bubbles: true }));
			});
	});
});
