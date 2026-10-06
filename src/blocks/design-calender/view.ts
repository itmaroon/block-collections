import { __ } from "@wordpress/i18n";
import { setSelectValue } from "../front-common";

import {
	generateMonthCalendar,
	generateGridAreas,
	styleDataApply,
} from "itmar-block-packages";

import { createCalendarStyleCss } from "./StyleCalender";
import { createTooltipStyleCss } from "../tooltipCss";
import type { CalendarAttributes, CalendarDate } from "./types";
import { fetchJapaneseHolidays } from "./holiday-api";
import { buildMonthDialogHtml, formatMonthPart } from "./months";
import type { MonthItem } from "./months";

const createCalendarFrontendCss = (
	attributes: CalendarAttributes,
	scopeSelector: string,
): string =>
	`${createCalendarStyleCss(attributes, scopeSelector)}
	${createTooltipStyleCss(
		attributes.tooltip_style,
		`${scopeSelector} [data-tooltip]`,
	)}`;

//カレンダー本体とツールチップを同一スコープへ適用
styleDataApply(createCalendarFrontendCss, ".wp-block-itmar-design-calender", {
	selector: ".itmar-wrap",
	target: "inner",
	classPrefix: "itmar-calendar-style-",
	observe: true,
});

jQuery(function ($) {
	/* ------------------------------
	design-calenderイベントハンドラ
  ------------------------------ */
	//旧コンテンツで子ブロックの識別クラスが欠落していても操作対象を復元する
	const ensureCalendarControlClasses = (rootBlock: JQuery): void => {
		if (rootBlock.find(".itmar_select_month").length === 0) {
			rootBlock
				.find(".wp-block-itmar-design-select")
				.first()
				.addClass("itmar_select_month");
		}

		const buttons = rootBlock.find(".wp-block-itmar-design-button");
		if (
			buttons.length > 0 &&
			rootBlock.find(".itmar_prev_month").length === 0
		) {
			buttons.eq(0).addClass("itmar_prev_month");
		}
		if (
			buttons.length > 1 &&
			rootBlock.find(".itmar_next_month").length === 0
		) {
			buttons.eq(buttons.length - 1).addClass("itmar_next_month");
		}
	};

	//先月・次月ボタンが押されたとき
	$(document).on(
		"click",
		".wp-block-itmar-design-calender .itmar_prev_month, .wp-block-itmar-design-calender .itmar_next_month",
		function () {
			const rootBlock = $(this).closest(".wp-block-itmar-design-calender");
			let select = rootBlock.find(
				".itmar_select_month .itmar_block_selectSingle",
			);
			let selectedOption = select.find("select").find("option:selected");

			//ダイアログ方式は design-select を持たない。値の置き場の <select> を直接動かす
			if (rootBlock.attr("data-month_nav") === "dialog") {
				const target = $(this).hasClass("itmar_prev_month")
					? selectedOption.prev("option")
					: selectedOption.next("option");
				if (target.length !== 0) {
					select.find("select").val(target.attr("value") ?? "").trigger("change");
				}
				return;
			}

			//前後の月の取得
			let changeOption = null;
			if ($(this).hasClass("itmar_prev_month")) {
				changeOption = selectedOption.prev("option");
			} else if ($(this).hasClass("itmar_next_month")) {
				changeOption = selectedOption.next("option");
			}

			if (changeOption && changeOption.length !== 0) {
				//前後の月がある場合
				const slug = changeOption.attr("value") ?? "";
				const kind = changeOption.attr("class") ?? "";
				const id = changeOption.attr("id");
				const text = changeOption.text();
				//選択されたli要素の属性を関数に渡す
				setSelectValue($, select, id, text, slug, kind);
			}
		},
	);

	//カレンダーのレンダリング関数
	const calenderRender = (
		dateArea: JQuery,
		monthData: CalendarDate[],
		name: string,
		weekTop: string,
		isClear: boolean,
	): void => {
		if (!Array.isArray(monthData) || monthData.length === 0) {
			dateArea.find(".itmar_radio").remove();
			dateArea.css("grid-template-areas", "none");
			return;
		}

		//データエリアがレンダリングされていないときはdata属性に祝日情報を記録
		if (dateArea.hasClass("wp-block-itmar-design-calender")) {
			//選択月の取得
			const select = dateArea.find(
				".itmar_select_month .itmar_block_selectSingle",
			);
			const selectedOption = select.find("select").find("option:selected");
			const selMonth = selectedOption.attr("value");
			if (!selMonth) return;
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

	/* ------------------------------
	年月の表示とダイアログ（月の切り替えを「dialog」にしたとき）
  ------------------------------ */
	const HEADING_SELECTOR = "h1, h2, h3, h4, h5, h6";

	//保存されたスタイル属性（年月ラベルの書式）を取り出す
	const getLabelFormats = (rootBlock: JQuery) => {
		const attrs = (rootBlock.data("attributes") ?? {}) as Partial<CalendarAttributes>;
		return {
			yearFormat: attrs.yearLabelFormat || "Y",
			monthFormat: attrs.monthLabelFormat || "F",
		};
	};

	//クラス名で見つけた design-title に年・月の文字を入れる
	const syncMonthLabels = (rootBlock: JQuery, ym: string): void => {
		const yearLabel = rootBlock.find(".itmar_year_label");
		const monthLabel = rootBlock.find(".itmar_month_label");
		if (yearLabel.length === 0 && monthLabel.length === 0) return;
		const { yearFormat, monthFormat } = getLabelFormats(rootBlock);
		yearLabel.find(HEADING_SELECTOR).text(formatMonthPart(ym, yearFormat));
		monthLabel.find(HEADING_SELECTOR).text(formatMonthPart(ym, monthFormat));
	};

	//置き場の <select> から、選べる月の一覧を作る
	const getMonthItems = (rootBlock: JQuery): MonthItem[] =>
		rootBlock
			.find(".itmar_month_state select option")
			.map(function () {
				const value = $(this).attr("value") ?? "";
				const [year, month] = value.split("/").map(Number);
				return { value, year, month };
			})
			.get();

	const getCurrentMonth = (rootBlock: JQuery): string =>
		(rootBlock.find(".itmar_month_state select").val() as string) || "";

	//ダイアログの中身を、指定した年で描き直す
	const renderMonthDialog = (
		rootBlock: JQuery,
		dialog: JQuery,
		year: number,
	): void => {
		const { yearFormat, monthFormat } = getLabelFormats(rootBlock);
		dialog.html(
			buildMonthDialogHtml({
				months: getMonthItems(rootBlock),
				selected: getCurrentMonth(rootBlock),
				year,
				monthFormat,
				yearFormat,
			}),
		);
	};

	const openMonthDialog = (rootBlock: JQuery): void => {
		const wrap = rootBlock.children(".itmar-wrap").first();
		if (wrap.length === 0) return;
		let dialog = wrap.children("dialog.itmar_month_dialog");
		if (dialog.length === 0) {
			dialog = $('<dialog class="itmar_month_dialog"></dialog>');
			wrap.append(dialog);
		}
		const current = getCurrentMonth(rootBlock);
		const year = Number(current.split("/")[0]) || new Date().getFullYear();
		renderMonthDialog(rootBlock, dialog, year);
		const element = dialog[0] as HTMLDialogElement;
		if (typeof element.showModal === "function" && !element.open) {
			element.showModal();
		}
	};

	//年・月の表示をクリック（キーボードの Enter / Space も）でダイアログを開く
	$(document).on(
		"click",
		".wp-block-itmar-design-calender .itmar_month_picker",
		function (this: HTMLElement) {
			const rootBlock = $(this).closest(".wp-block-itmar-design-calender");
			if (rootBlock.attr("data-month_nav") !== "dialog") return;
			openMonthDialog(rootBlock);
		},
	);
	$(document).on(
		"keydown",
		".wp-block-itmar-design-calender .itmar_month_picker",
		function (this: HTMLElement, event: JQuery.KeyDownEvent) {
			if (event.key !== "Enter" && event.key !== " ") return;
			event.preventDefault();
			$(this).trigger("click");
		},
	);

	//ダイアログ内の操作
	const MONTH_DIALOG = ".wp-block-itmar-design-calender dialog.itmar_month_dialog";
	const closeMonthDialog = (dialog: JQuery): void => {
		const element = dialog[0] as HTMLDialogElement | undefined;
		if (element?.open) element.close();
	};

	//背景（::backdrop）のクリックは dialog 自身へのクリックになる
	$(document).on("click", MONTH_DIALOG, function (this: HTMLElement, event: JQuery.ClickEvent) {
		if (event.target === this) closeMonthDialog($(this));
	});

	$(document).on("click", `${MONTH_DIALOG} .itmar_dialog_close`, function () {
		closeMonthDialog($(this).closest("dialog"));
	});

	//年の前後
	$(document).on(
		"click",
		`${MONTH_DIALOG} .itmar_dialog_year_prev, ${MONTH_DIALOG} .itmar_dialog_year_next`,
		function () {
			const dialog = $(this).closest("dialog");
			const rootBlock = dialog.closest(".wp-block-itmar-design-calender");
			const shown = Number(dialog.find(".itmar_dialog_year").attr("data-year"));
			const next = $(this).hasClass("itmar_dialog_year_prev")
				? shown - 1
				: shown + 1;
			renderMonthDialog(rootBlock, dialog, next);
		},
	);

	//月の選択
	const chooseMonth = (cell: JQuery): void => {
		if (cell.hasClass("is-disabled")) return;
		const dialog = cell.closest("dialog");
		const rootBlock = dialog.closest(".wp-block-itmar-design-calender");
		const month = cell.attr("data-month") ?? "";
		const select = rootBlock.find(".itmar_month_state select");
		if (month && select.val() !== month) {
			select.val(month).trigger("change");
		}
		closeMonthDialog(dialog);
	};
	$(document).on("click", `${MONTH_DIALOG} .itmar_month_grid .itmar_radio`, function () {
		chooseMonth($(this));
	});
	$(document).on(
		"keydown",
		`${MONTH_DIALOG} .itmar_month_grid .itmar_radio`,
		function (this: HTMLElement, event: JQuery.KeyDownEvent) {
			if (event.key !== "Enter" && event.key !== " ") return;
			event.preventDefault();
			chooseMonth($(this));
		},
	);

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
			//表示月の日付オブジェクトを生成
			let selectedOption = $(this).find("option:selected");
			const selectedMonth = selectedOption.attr("value");
			if (!selectedMonth) return;
			//年月の表示ブロックがあれば書き換える
			syncMonthLabels(rootBlock, selectedMonth);

			//祝日表示の有無
			const isHoliday = rootBlock.data("is_holiday");
			if (isHoliday) {
				try {
					//祝日の表示処理
					const holidayList = await fetchJapaneseHolidays(selectedMonth);

					// ここで祝日データを使用する処理を行う
					const dateValues = generateMonthCalendar(selectedMonth, holidayList);
					calenderRender(
						dateArea.length > 0 ? dateArea : rootBlock,
						dateValues,
						name,
						weekTop,
						isClear,
					);
					// カスタムイベントを発生させる
					const calenderRenderedEvent = new CustomEvent("calender_rendered");
					const parentElement = $(this).closest(
						".wp-block-itmar-design-calender",
					)[0];
					parentElement?.dispatchEvent(calenderRenderedEvent);
				} catch (error) {
					//祝日APIに問題があっても、カレンダー本体は通常表示する
					const dateValues = generateMonthCalendar(selectedMonth);
					calenderRender(dateArea, dateValues, name, weekTop, isClear);
					const calenderRenderedEvent = new CustomEvent("calender_rendered");
					rootBlock[0]?.dispatchEvent(calenderRenderedEvent);
					console.warn("祝日情報を取得できなかったため通常表示にしました。", error);
				}
			} else {
				const dateValues = generateMonthCalendar(selectedMonth);
				calenderRender(dateArea, dateValues, name, weekTop, isClear);
				// カスタムイベントを発生させる
				const calenderRenderedEvent = new CustomEvent("calender_rendered");
				const parentElement = $(this).closest(
					".wp-block-itmar-design-calender",
				)[0];
				parentElement?.dispatchEvent(calenderRenderedEvent);
			}
		},
	);

	//各カレンダーの初期月をセットし、日付エリアをレンダリング
	const params = new URLSearchParams(window.location.search);
	const periodString = params.get("period");
	const match = periodString?.match(/^(\d{4})\/(\d{2})/);
	const urlMonth = match ? `${match[1]}/${match[2]}` : null;

	$(".wp-block-itmar-design-calender").each(function () {
		const rootBlock = $(this);
		ensureCalendarControlClasses(rootBlock);
		//年月の表示をボタンとして扱えるようにする（保存内容には持たせられない）
		if (rootBlock.attr("data-month_nav") === "dialog") {
			//年・月のタイトルをまとめるグループから itmar_month_picker のクラスが外れていても、
			//年と月のタイトルの共通の親グループを、ダイアログを開く部分として扱う
			if (rootBlock.find(".itmar_month_picker").length === 0) {
				const yearEl = rootBlock.find(".itmar_year_label").first();
				const monthEl = rootBlock.find(".itmar_month_label").first();
				if (yearEl.length && monthEl.length) {
					yearEl
						.parents()
						.filter((_i, el) => $.contains(el, monthEl[0]))
						.first()
						.addClass("itmar_month_picker");
				}
			}
			rootBlock.find(".itmar_month_picker").attr({
				role: "button",
				tabindex: "0",
				"aria-haspopup": "dialog",
			});
		}
		const select = rootBlock.find(
			".itmar_select_month .itmar_block_selectSingle",
		);
		if (select.length === 0) return;

		const setMonth = urlMonth || rootBlock.data("selected_month");
		const monthSelect = select.find("select");
		const targetOption = monthSelect.find("option").filter(function () {
			return $(this).attr("value") === setMonth;
		});

		if (targetOption.length !== 0) {
			monthSelect.val(setMonth);
		}

		if (monthSelect.val()) {
			monthSelect.trigger("change");
		}
	});
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
