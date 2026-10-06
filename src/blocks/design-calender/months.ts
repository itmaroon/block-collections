import { __ } from "@wordpress/i18n";
import { format } from "@wordpress/date";
import type { DateSpan } from "./types";

/**
 * 月の切り替えを「年月の表示をクリックして開くダイアログ」にしたときの共通処理。
 * エディターとフロントの両方から使うため、どちらにも副作用を持たせない。
 */

export interface MonthItem {
	/** "YYYY/MM"（design-select の選択肢の value と同じ形式） */
	value: string;
	year: number;
	month: number;
}

/** 期間設定（dateSpan）から選択可能な月の一覧を作る。保存内容に入るので乱数を使わない */
export const buildMonthList = (span: DateSpan | undefined): MonthItem[] => {
	if (!span) return [];
	const { startYear, startMonth, endYear, endMonth } = span;
	const list: MonthItem[] = [];
	for (let year = startYear; year <= endYear; year++) {
		const from = year === startYear ? startMonth : 1;
		const to = year === endYear ? endMonth : 12;
		for (let month = from; month <= to; month++) {
			list.push({
				year,
				month,
				value: `${year}/${String(month).padStart(2, "0")}`,
			});
		}
	}
	return list;
};

/**
 * "YYYY/MM" を年月ラベルの書式で文字列にする。
 * 月の途中の日時で整形し、サイトのタイムゾーンで前後の月へずれるのを避ける。
 */
export const formatMonthPart = (ym: string, dateFormat: string): string => {
	const match = /^(\d{4})\/(\d{2})$/.exec(ym);
	if (!match) return "";

	// サイトの言語に関わらず英語で出す書式（"en:F" = September、"en:M" = Sep）
	if (dateFormat === "en:F" || dateFormat === "en:M") {
		const name = ENGLISH_MONTHS[Number(match[2]) - 1] ?? "";
		return dateFormat === "en:M" ? name.slice(0, 3) : name;
	}

	return format(dateFormat, `${match[1]}-${match[2]}-15T12:00:00`);
};

const ENGLISH_MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

/** 年ラベルの書式の選択肢 */
export const YEAR_LABEL_FORMATS = [
	{ label: "2026", value: "Y" },
	{ label: "2026年", value: "Y年" },
];

/**
 * 月ラベルの書式の選択肢。
 * "F" "M" は、サイトの言語で表示される（日本語のサイトでは、どちらも「9月」になる）。
 * 英語で出したいときは "en:F" "en:M" を使う。
 */
export const MONTH_LABEL_FORMATS = [
	{ label: __("September (English)", "block-collections"), value: "en:F" },
	{ label: __("Sep (English)", "block-collections"), value: "en:M" },
	{
		label: __("Month name in the site language", "block-collections"),
		value: "F",
	},
	{
		label: __("Short month name in the site language", "block-collections"),
		value: "M",
	},
	{ label: "09", value: "m" },
	{ label: "9", value: "n" },
	{ label: "9月", value: "n月" },
];

const escapeHtml = (text: string): string =>
	text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

export interface MonthDialogOptions {
	months: MonthItem[];
	/** 選択中の月 "YYYY/MM" */
	selected: string;
	/** ダイアログに表示する年 */
	year: number;
	monthFormat: string;
	yearFormat: string;
}

/**
 * ダイアログの中身のHTML。フロントでは <dialog> の中へ、エディターのプレビューでは
 * 静的な枠の中へ同じものを入れる。月のボタンは日付ボタンと同じ .itmar_radio を使い、
 * 日付ボタンの色・形の設定がそのまま効くようにする。
 */
export const buildMonthDialogHtml = ({
	months,
	selected,
	year,
	monthFormat,
	yearFormat,
}: MonthDialogOptions): string => {
	const years = months.map((item) => item.year);
	const minYear = years.length ? Math.min(...years) : year;
	const maxYear = years.length ? Math.max(...years) : year;
	const available = new Set(months.map((item) => item.value));

	const cells = Array.from({ length: 12 }, (_unused, index) => {
		const value = `${year}/${String(index + 1).padStart(2, "0")}`;
		const classes = ["itmar_radio"];
		if (value === selected) classes.push("checked");
		const isDisabled = !available.has(value);
		if (isDisabled) classes.push("is-disabled");
		return (
			`<label class="${classes.join(" ")}" data-month="${value}" role="button"` +
			` tabindex="${isDisabled ? -1 : 0}" aria-disabled="${isDisabled}"` +
			` aria-pressed="${value === selected}">` +
			`<span>${escapeHtml(formatMonthPart(value, monthFormat))}</span></label>`
		);
	}).join("");

	const prevLabel = escapeHtml(__("Previous year", "block-collections"));
	const nextLabel = escapeHtml(__("Next year", "block-collections"));
	const closeLabel = escapeHtml(__("Close", "block-collections"));

	return (
		`<div class="itmar_month_dialog_head">` +
		`<button type="button" class="itmar_dialog_year_prev" aria-label="${prevLabel}"${
			year <= minYear ? " disabled" : ""
		}></button>` +
		`<span class="itmar_dialog_year" data-year="${year}">${escapeHtml(
			formatMonthPart(`${year}/01`, yearFormat),
		)}</span>` +
		`<button type="button" class="itmar_dialog_year_next" aria-label="${nextLabel}"${
			year >= maxYear ? " disabled" : ""
		}></button>` +
		`</div>` +
		`<div class="itmar_month_grid">${cells}</div>` +
		`<button type="button" class="itmar_dialog_close" aria-label="${closeLabel}"></button>`
	);
};
