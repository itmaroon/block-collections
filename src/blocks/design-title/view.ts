import { __ } from "@wordpress/i18n";

import apiFetch from "@wordpress/api-fetch";
import { styleDataApply } from "itmar-block-packages";

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
