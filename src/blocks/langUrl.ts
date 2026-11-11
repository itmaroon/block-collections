/**
 * 表示言語に合わせて、サイト内リンクの URL を言語のURLへ付け替える。
 *
 * 多言語プラグイン（slug-translater など）は、<html data-itmar-lang-home="https://example.com/en/">
 * のように、いまの言語のトップ URL を知らせる。日本語（既定の言語）のときは付けない。
 * 保存されるリンク先は日本語のままで、表示のときだけ付け替える（保存内容は言語に依存しない）。
 */

//言語に関係のない場所（管理画面、ファイル、REST など）
const NON_LANG_PATHS = [
	"wp-admin",
	"wp-login.php",
	"wp-content",
	"wp-includes",
	"wp-json",
	"wp-cron.php",
	"xmlrpc.php",
];

const trimEnd = (value: string): string => value.replace(/\/+$/, "");

/**
 * @param url      解決済みの URL（[home_url] は置き換えた後のもの）
 * @param homeUrl  サイトのトップ URL（言語の頭を含まない）
 * @returns        言語の頭を付けた URL。付ける必要がないときは、そのまま返す
 */
export const localizeInternalUrl = (url: string, homeUrl: string): string => {
	const value = String(url ?? "").trim();
	const langHome = trimEnd(
		document.documentElement.getAttribute("data-itmar-lang-home") ?? "",
	);
	const home = trimEnd(String(homeUrl ?? "").trim());

	if (!value || !langHome || !home || langHome === home) {
		return value;
	}
	//すでに言語の URL
	if (
		value === langHome ||
		value.startsWith(`${langHome}/`) ||
		value.startsWith(`${langHome}?`) ||
		value.startsWith(`${langHome}#`)
	) {
		return value;
	}
	//サイト内のリンクだけ
	let suffix: string;
	if (value === home) {
		suffix = "";
	} else if (
		value.startsWith(`${home}/`) ||
		value.startsWith(`${home}?`) ||
		value.startsWith(`${home}#`)
	) {
		suffix = value.slice(home.length);
	} else {
		return value;
	}

	const firstSegment = suffix.replace(/^\/+/, "").split(/[/?#]/)[0];
	if (NON_LANG_PATHS.includes(firstSegment)) {
		return value;
	}
	//トップ（/en/）は末尾のスラッシュを残す
	return `${langHome}${suffix === "" || /^[?#]/.test(suffix) ? "/" : ""}${suffix}`;
};
