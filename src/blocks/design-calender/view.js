import { __ } from "@wordpress/i18n";
import { setSelectValue } from "../../front-common";

import { generateMonthCalendar, generateGridAreas } from "itmar-block-packages";

jQuery(function ($) {
	/* ------------------------------
  design-calenderイベントハンドラ
  ------------------------------ */
	//デフォルトの月をセレクトボックスにセット
	$(function () {
		//URLからパラメータを取得して期間のクエリーパラメータを取得
		const params = new URLSearchParams(window.location.search);
		const periodString = params.get("period");
		var match = decodeURIComponent(periodString).match(/^(\d{4})\/(\d{2})/);
		const urlMonth = match
			? match[1] + "/" + match[2] // 年/月形式に組み立て
			: null;

		let select = $(".itmar_select_month .itmar_block_selectSingle");
		//期間のクエリーパラメータが設定されているときはそちらを優先（設定がなければdata属性値）
		let setMonth = periodString
			? urlMonth
			: select
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
			setSelectValue($, select, id, text, slug, kind);
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
				setSelectValue($, select, id, text, slug, kind);
			}
		},
	);

	//カレンダーのレンダリング関数
	const calenderRender = (
		dateArea,
		monthData,
		name,
		weekTop,
		tipsClass,
		isClear,
	) => {
		//データエリアがレンダリングされていないときはdata属性に祝日情報を記録
		if (dateArea.hasClass("wp-block-itmar-design-calender")) {
			//選択月の取得
			const select = dateArea.find(
				".itmar_select_month .itmar_block_selectSingle",
			);
			const selectedOption = select.find("select").find("option:selected");
			const selMonth = selectedOption.attr("value");
			//祝日リストを収集
			const holidayList = monthData
				.filter((item) => item && item.holiday) // holiday オブジェクトが存在する要素のみ抽出
				.map((item) => ({
					date: `${selMonth.replace(/\//g, "")}${String(item.date).padStart(
						2,
						"0",
					)}`, // 元の date オブジェクト（または文字列/数値）
					name: item.holiday, // holiday オブジェクト
				}));
			dateArea.attr("data-holiday_array", JSON.stringify(holidayList));
			return;
		}
		//日付ボタンをいったん削除
		dateArea.find(".itmar_radio").remove();
		//日付のDOM要素の挿入
		monthData.forEach((item) => {
			const weekClass =
				item.weekday === 0
					? "holiday"
					: item.holiday
					? "holiday"
					: item.weekday === 6
					? "saturday"
					: "";
			const label = $("<label>")
				.addClass(`itmar_radio ${weekClass}`)
				.css("grid-area", `day${item.date}`);
			const input = $("<input>")
				.attr("type", "radio")
				.attr("name", name)
				.attr("value", item.date);

			let span = $("<span>").text(item.date);
			if (item.holiday) {
				span.addClass(tipsClass); //styled-componentのスタイル適用クラス
				span.attr("data-tooltip", item.holiday); //祝日の名称をdata-tooltipで保持
			}

			label.append(input).append(span);
			dateArea.append(label);
		});
		//クリアボタン
		if (isClear) {
			const clearLabel = $("<label>")
				.addClass("itmar_radio")
				.css("grid-area", "day_clear");
			const clearButton = $("<button>").text(__("Clear", "block-collections"));
			clearLabel.append(clearButton);
			dateArea.append(clearLabel);
		}
		//その月のgridAreasの適用

		let areas = generateGridAreas(
			monthData[0].weekday,
			monthData.length,
			weekTop === "mon",
		);
		dateArea.css("grid-template-areas", areas);
	};

	//セレクトブロックのセレクト要素に変更があったとき
	$(document).on(
		"change",
		".itmar_select_month .itmar_block_selectSingle select",
		async function () {
			const rootBlock = $(this).closest(".wp-block-itmar-design-calender");
			//クリアボタンの有無
			const isClear = rootBlock.data("is_release");
			//日付エリアを取得
			const dateArea = rootBlock.find(".itmar_date_area");
			//Name属性の取得
			const name = rootBlock.data("input_name");
			//カレンダーの曜日のトップを取得
			const weekTop = rootBlock.data("week_top");
			//ツールチップのスタイルを適用するクラス名を取得
			const tipsClass = rootBlock.data("tips_class");
			//表示月の日付オブジェクトを生成
			let selectedOption = $(this).find("option:selected");
			//祝日表示の有無
			const isHoliday = rootBlock.data("is_holiday");
			if (isHoliday) {
				try {
					//祝日の表示処理
					const formattedMonth = selectedOption
						.attr("value")
						.replace(/\//g, "-");
					const res = await fetch(
						`/wp-json/itmar/v1/get-holidays?month=${formattedMonth}`,
					);
					const holidayList = await res.json();

					// ここで祝日データを使用する処理を行う
					const dateValues = generateMonthCalendar(
						selectedOption.attr("value"),
						holidayList,
					);
					calenderRender(
						dateArea.length > 0 ? dateArea : rootBlock,
						dateValues,
						name,
						weekTop,
						tipsClass,
						isClear,
					);
					// カスタムイベントを発生させる
					const calenderRenderedEvent = new CustomEvent("calender_rendered");
					const parentElement = $(this).closest(
						".wp-block-itmar-design-calender",
					)[0];
					parentElement.dispatchEvent(calenderRenderedEvent);
				} catch (error) {
					console.error("祝日取得中にエラーが発生しました:", error);
				}
			} else {
				const dateValues = generateMonthCalendar(selectedOption.attr("value"));
				calenderRender(dateArea, dateValues, name, weekTop, tipsClass, isClear);
				// カスタムイベントを発生させる
				const calenderRenderedEvent = new CustomEvent("calender_rendered");
				const parentElement = $(this).closest(
					".wp-block-itmar-design-calender",
				)[0];
				parentElement.dispatchEvent(calenderRenderedEvent);
			}
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
