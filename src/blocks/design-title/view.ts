import { __ } from "@wordpress/i18n";

import apiFetch from "@wordpress/api-fetch";
import { styleDataApply } from "itmar-block-packages/front";
import { MOBILE_QUERY } from "../breakpoints";

import {
	createTitleInnerScope,
	createTitleStyleCss,
} from "./StyleWapper";
import type { CurrentUserResponse, SiteInfoResponse, TitleAttributes } from "./types";

declare const itmar_block_option: {
	logout_base_url: string;
	login_url: string;
	home_url: string;
};

const HOME_URL_TOKEN = "[home_url]";

const resolveHomeUrl = (storedUrl: string): string => {
	const value = String(storedUrl ?? "").trim();

	if (!value || !value.startsWith(HOME_URL_TOKEN)) {
		return value;
	}

	const homeUrl = String(itmar_option.home_url ?? "")
		.trim()
		.replace(/\/+$/, "");

	if (!homeUrl) {
		return "";
	}

	const suffix = value.slice(HOME_URL_TOKEN.length);

	if (!suffix || suffix === "/") {
		return homeUrl;
	}

	if (suffix.startsWith("?") || suffix.startsWith("#")) {
		return `${homeUrl}${suffix}`;
	}

	return `${homeUrl}/${suffix.replace(/^\/+/, "")}`;
};

const createTitleFrontendCss = (
	attributes: TitleAttributes,
	rootScope: string,
): string =>
	createTitleStyleCss(attributes, {
		root: rootScope,
		inner: createTitleInnerScope(rootScope),
	});

//保存済み属性から、React非依存のスコープ付きCSSを適用
styleDataApply(createTitleFrontendCss, ".wp-block-itmar-design-title", {
	target: "self",
	classPrefix: "itmar-title-style-",
	observe: true,
});


/* ------------------------------
  サブメニューのはみ出し防止
  ------------------------------
  .submenu-block は position:absolute で、menu_pos に応じて left:100% などで
  開く。メニュー自体が画面の端に寄っていると、開いた先が画面外になり
  横スクロールバーが出る。幅を測って、収まらない側に開こうとしていたら
  反対側へ反転させる（.is-flipped）。

  transform: scale(0) で畳まれていても offsetWidth はレイアウト上の幅を返すので、
  開く前に測れる。 */
const SUBMENU_VIEWPORT_MARGIN = 8;

const flipSubmenuIfOverflow = (submenu: HTMLElement): void => {
	//モバイルはアコーディオン／全幅スライドなので反転しない
	if (window.matchMedia(MOBILE_QUERY).matches) {
		submenu.classList.remove("is-flipped");
		return;
	}

	const anchor = submenu.offsetParent as HTMLElement | null;
	if (!anchor) return;

	const measure = () => {
		const anchorLeft = anchor.getBoundingClientRect().left;
		const left = anchorLeft + submenu.offsetLeft;
		return { left, right: left + submenu.offsetWidth };
	};

	//いったん素の状態で測る
	submenu.classList.remove("is-flipped");
	const normal = measure();
	const limit = document.documentElement.clientWidth - SUBMENU_VIEWPORT_MARGIN;

	if (normal.right <= limit && normal.left >= SUBMENU_VIEWPORT_MARGIN) return;

	//反転して収まるなら反転を採用、どちらもだめなら元に戻す
	submenu.classList.add("is-flipped");
	const flipped = measure();
	const fitsFlipped =
		flipped.right <= limit && flipped.left >= SUBMENU_VIEWPORT_MARGIN;
	if (!fitsFlipped) submenu.classList.remove("is-flipped");
};

const updateAllSubmenus = (): void => {
	document
		.querySelectorAll<HTMLElement>(".wp-block-itmar-design-title .submenu-block")
		.forEach(flipSubmenuIfOverflow);
};

/* ------------------------------
  モバイルでのサブメニュー展開
  ------------------------------

  サブメニューはデスクトップでは :hover で開くが、タッチ端末に hover は無い。
  モバイル幅では見出しを押して .visible を付け外しする。

  見出しがリンクを兼ねている場合、1回目のタップで展開し、2回目で遷移させる
  （閉じているサブメニューの親を押しただけでページが変わると操作できないため）。 */

const SUBMENU_OPEN_CLASS = "visible";

/** アコーディオンの高さ。CSSの max-height は固定値しか書けず、中身が
 *  それを超えると（overflow:hidden で）切れてしまう。実測値を入れて過不足をなくす。 */
const setAccordionHeight = (submenu: HTMLElement, open: boolean): void => {
	if (open) submenu.style.maxHeight = `${submenu.scrollHeight}px`;
	else submenu.style.removeProperty("max-height");
};

const closeOtherSubmenus = (keep: Element | null): void => {
	document
		.querySelectorAll<HTMLElement>(`.submenu-block.${SUBMENU_OPEN_CLASS}`)
		.forEach((el) => {
			if (el !== keep) {
				el.classList.remove(SUBMENU_OPEN_CLASS);
				setAccordionHeight(el, false);
			}
		});
};

const initSubmenuTouchToggle = (): void => {
	document.addEventListener(
		"click",
		(e) => {
			if (!window.matchMedia(MOBILE_QUERY).matches) return;
			const target = e.target;
			if (!(target instanceof Element)) return;

			//サブメニューの中身を押したときは何もしない（そのまま遷移させる）
			if (target.closest(".submenu-block")) return;

			const block = target.closest(".wp-block-itmar-design-title");
			if (!block) return;
			const submenu = block.querySelector<HTMLElement>(":scope > .submenu-block");
			if (!submenu) return;

			const isOpen = submenu.classList.contains(SUBMENU_OPEN_CLASS);
			if (!isOpen) {
				//1回目：展開だけして遷移は止める
				e.preventDefault();
				closeOtherSubmenus(submenu);
				submenu.classList.add(SUBMENU_OPEN_CLASS);
				setAccordionHeight(submenu, true);
				block.setAttribute("aria-expanded", "true");
				return;
			}
			//2回目でリンクを踏んでいなければ畳む
			if (!target.closest("a")) {
				e.preventDefault();
				submenu.classList.remove(SUBMENU_OPEN_CLASS);
				setAccordionHeight(submenu, false);
				block.setAttribute("aria-expanded", "false");
			}
		},
		true,
	);

	//デスクトップへ戻ったら開きっぱなしを解除する
	window
		.matchMedia(MOBILE_QUERY)
		.addEventListener("change", (ev) => {
			if (!ev.matches) {
				closeOtherSubmenus(null);
				//デスクトップでは絶対配置に戻るので、実測で入れた高さを外す
				document
					.querySelectorAll<HTMLElement>(".submenu-block")
					.forEach((el) => el.style.removeProperty("max-height"));
			}
		});
};

const initSubmenuOverflowGuard = (): void => {
	updateAllSubmenus();

	//サブメニュー内の画像は DOMContentLoaded の時点では寸法が確定していない。
	//読み込み完了後と、以後の寸法変化でも測り直す。
	window.addEventListener("load", updateAllSubmenus);

	//寸法の変化を追う（画像の読み込み、フォントの差し替えなど）
	const resizeObserver =
		typeof ResizeObserver !== "undefined"
			? new ResizeObserver((entries) =>
					entries.forEach((entry) =>
						flipSubmenuIfOverflow(entry.target as HTMLElement),
					),
			  )
			: null;

	const observed = new WeakSet<Element>();
	const observeAll = () => {
		document
			.querySelectorAll<HTMLElement>(
				".wp-block-itmar-design-title .submenu-block",
			)
			.forEach((el) => {
				if (!observed.has(el)) {
					observed.add(el);
					resizeObserver?.observe(el);
				}
				//既知の要素も測り直す（表示状態やレイアウトが後から変わるため）
				flipSubmenuIfOverflow(el);
			});
	};
	observeAll();

	//ログオンバーなど、RESTの応答後に差し込まれるメニューを拾う
	let mutationTimer = 0;
	new MutationObserver(() => {
		window.clearTimeout(mutationTimer);
		mutationTimer = window.setTimeout(observeAll, 200);
	}).observe(document.body, { childList: true, subtree: true });

	//開く直前にも測り直す（中身が遅れて入る場合があるため）
	document.addEventListener(
		"pointerenter",
		(e) => {
			const target = e.target;
			if (!(target instanceof Element)) return;
			const block = target.closest(".wp-block-itmar-design-title");
			if (!block) return;
			block
				.querySelectorAll<HTMLElement>(".submenu-block")
				.forEach(flipSubmenuIfOverflow);
		},
		true,
	);

	let resizeTimer = 0;
	window.addEventListener("resize", () => {
		window.clearTimeout(resizeTimer);
		resizeTimer = window.setTimeout(updateAllSubmenus, 150);
	});
};

const initSubmenus = (): void => {
	initSubmenuOverflowGuard();
	initSubmenuTouchToggle();
};

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initSubmenus);
} else {
	initSubmenus();
}

jQuery(function ($) {
	/* ------------------------------
    .spinner と .particles が出力
     ------------------------------ */
	$(".wp-block-itmar-design-title").each(function () {
		const $title = $(this);
		const attributes = JSON.parse(
			$title.attr("data-attributes") || "{}",
		) as Partial<TitleAttributes>;

		if (!attributes.is_waiting) return;

		const $wrap = $title.children(".itmar-wrap").first();
		const state = attributes.waiting_state || "hold";

		if (!$wrap.children(".spinner").length) {
			$wrap.append(`<div class="spinner ${state}" aria-hidden="true"></div>`);
		}

		if (!$wrap.children(".particles").length) {
			$wrap.append(`
			<div class="particles ${state}" aria-hidden="true">
				${"<i></i>".repeat(8)}
			</div>
		`);
		}
	});
	/* ------------------------------
    design-titleの処理
     ------------------------------ */
	{
		//サイトタイトル・キャッチフレーズの読込
		if ($(".itmar_site_title").length || $(".itmar_catch_title").length) {
			// '.itmar_site_title' クラスを持つ要素が読み込まれたときの処理
			const fetchSiteInfo = async () => {
				try {
					const response = (await apiFetch({ path: "/" })) as SiteInfoResponse;
					$(".itmar_site_title").text(response.name ?? "");
					$(".itmar_catch_title").text(response.description ?? "");
				} catch (error) {
					console.error("Error fetching data:", error);
				}
			};
			fetchSiteInfo();
		}
		//ログインユーザーの読込
		let isLogin = false;
		if ($(".itmar_user_title").length) {
			// '.itmar_site_title' クラスを持つ要素が読み込まれたときの処理
			const fetchUserName = async () => {
				try {
					const res = (await apiFetch({
						path: "/itmar/v1/current-user",
					})) as CurrentUserResponse;

					isLogin = Boolean(res.is_logged_in); //ログイン状態の捕捉
					//ボタンの表示切替
					const $btn_div = $("#itmar_logon_btn"); // 該当のdivを取得
					const html = $btn_div.html() ?? ""; // 現在のHTMLを取得
					const parts = html.split(/<br\s*\/?>/i); // <br> で分割（正規表現で <br> や <br /> に対応）
					if (!isLogin) {
						$btn_div.html(parts[0]); // ログイン時は前半だけ
					} else {
						$btn_div.html(parts[1]); // 未ログイン時は後半だけ
					}

					const name = res.is_logged_in
						? res.display_name ?? ""
						: __("Guest", "block-collections");
					const userFormat = $(".itmar_user_title")
						.closest(".wp-block-itmar-design-title")
						.data("free_format");
					$(".itmar_user_title").text(String(userFormat ?? "%s").replace("%s", name));
					$(".itmar_avatar_url").attr("src", res.avatar_url ?? "");
				} catch (error) {
					console.error("Error fetching data:", error);
				}
			};
			fetchUserName();
		}
		//保存された[home_url]を現在サイトのURLへ置き換える
		$(".wp-block-itmar-design-title a").each(function () {
			const storedHref = $(this).attr("href") ?? "";
			const resolvedHref = resolveHomeUrl(storedHref);

			if (resolvedHref && resolvedHref !== storedHref) {
				$(this).attr("href", resolvedHref);
			}
		});

		//ログアウト・ログインの処理
		$("#itmar_logon_btn").on("click", async function () {
			if (isLogin) {
				// EC連携時はサーバー側に保存したIDトークンでShopifyログアウトURLを生成する。
				const headlessShopId = $(".wp-block-itmar-product-block").data(
					"shop_id",
				);

				if (headlessShopId) {
					try {
						const response = (await apiFetch({
							path: "/itmar-ec-relate/v1/customer/logout-url",
							method: "POST",
							data: { redirect_url: window.location.href },
						})) as { success?: boolean; logout_url?: string };
						if (response.success && response.logout_url) {
							window.location.href = response.logout_url;
							return;
						}
					} catch (error) {
						console.warn("Shopify logout could not be started.", error);
					}
					window.location.href = itmar_block_option.logout_base_url;
				} else {
					//それ以外のログアウト処理
					window.location.href = itmar_block_option.logout_base_url;
				}
			} else {
				const loginUrl = String($("#itmar_logon_btn").data("logon_url") ?? "");
				const pattern = new RegExp(
					`^${"[home_url]".replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/?$`,
				);

				if (pattern.test(loginUrl)) {
					//ビルトインのログイン画面
					window.location.href = itmar_block_option.login_url;
				} else {
					//カスタムログイン画面
					const loginPageUrl = resolveHomeUrl(loginUrl);
					//リダイレクト情報
					const redirectUrl = window.location.href;
					//その他付加情報
					const ec_block = $(".wp-block-itmar-product-block");
					let shop_id = "";
				let headless_id = "";
				if (ec_block.length > 0) {
					shop_id = String(ec_block.data("shop_id") || "");
					headless_id = String(ec_block.data("headless_id") || "");
				}

					// クエリパラメータを構築
					const params = new URLSearchParams();
					params.append("redirect_to", redirectUrl);
					if (shop_id) params.append("shop_id", shop_id);
					if (headless_id) params.append("headless_id", headless_id);

					// リダイレクト
					window.location.href = loginPageUrl + "?" + params.toString();
				}
			}
		});
		//モーダルオープンの処理
		const openElm = $(".modal_open_btn");
		if (openElm.length > 0) {
			// 親にカーソル:pointerを付与
			openElm.parent().css("cursor", "pointer");
			// クリックイベント
			openElm.parent().on("click", function () {
				const modalId = String(openElm.data("modal_id") ?? "");
				const $modal = $("#" + modalId);
				if ($modal.length > 0) {
					$modal.parent().parent().show(); // display:none → block など
				}
			});
		}
	}
});
