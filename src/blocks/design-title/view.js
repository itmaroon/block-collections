import { __ } from "@wordpress/i18n";

import apiFetch from "@wordpress/api-fetch";

jQuery(function ($) {
	/* ------------------------------
     design-titleの処理
     ------------------------------ */
	$(document).ready(function () {
		//サイトタイトル・キャッチフレーズの読込
		if ($(".itmar_site_title").length || $(".itmar_catch_title").length) {
			// '.itmar_site_title' クラスを持つ要素が読み込まれたときの処理
			const fetchSiteInfo = async () => {
				try {
					const response = await apiFetch({ path: "/" });
					$(".itmar_site_title").text(response.name);
					$(".itmar_catch_title").text(response.description);
				} catch (error) {
					console.error("Error fetching data:", error.message);
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
					const res = await apiFetch({ path: "/itmar/v1/current-user" });

					isLogin = res.is_logged_in; //ログイン状態の捕捉
					//ボタンの表示切替
					const $btn_div = $("#itmar_logon_btn"); // 該当のdivを取得
					const html = $btn_div.html(); // 現在のHTMLを取得
					const parts = html.split(/<br\s*\/?>/i); // <br> で分割（正規表現で <br> や <br /> に対応）
					if (!isLogin) {
						$btn_div.html(parts[0]); // ログイン時は前半だけ
					} else {
						$btn_div.html(parts[1]); // 未ログイン時は後半だけ
					}

					const name = res.is_logged_in
						? res.display_name
						: __("Guest", "block-collections");
					const userFormat = $(".itmar_user_title")
						.closest(".wp-block-itmar-design-title")
						.data("free_format");
					$(".itmar_user_title").text(userFormat.replace("%s", name));
					$(".itmar_avatar_url").attr("src", res.avatar_url);
				} catch (error) {
					console.error("Error fetching data:", error.message);
				}
			};
			fetchUserName();
		}
		//アーカイブ・固定ページのホームURL設定
		// wp-block-itmar-design-titleクラスを持つ要素内の条件に合う<a>要素を抽出
		$(".wp-block-itmar-design-title a")
			.filter(function () {
				return (
					$(this).attr("href") && $(this).attr("href").includes("[home_url]")
				);
			})
			.each(function () {
				// href属性を取得
				var currentHref = $(this).attr("href");
				// href属性の[home_url]をhomeUrlに置き換え
				var updatedHref = currentHref.replace(
					"[home_url]",
					itmar_option.home_url,
				);
				// href属性を更新
				$(this).attr("href", updatedHref);
			});

		//ログアウト・ログインの処理
		$("#itmar_logon_btn").on("click", function () {
			if (isLogin) {
				//ShopIDを持ったitmaroon-ec-relate-bloksがある場合のログアウト処理
				const headlessShopId = $(".wp-block-itmar-product-block").data(
					"shop_id",
				);
				const redirectUri = localStorage.getItem("shopify_redirect_uri");
				const idToken = localStorage.getItem("shopify_client_id_token");

				if (headlessShopId && redirectUri && idToken) {
					//戻り先をlocalstrageに保存
					localStorage.setItem(
						"shopify_logout_redirect_to",
						window.location.href,
					);
					//URLの生成
					const url = new URL(
						`https://shopify.com/authentication/${headlessShopId}/logout`,
					);

					url.searchParams.append("id_token_hint", idToken); // ← 取得済みのid_tokenをここに
					url.searchParams.append(
						"post_logout_redirect_uri",
						`${redirectUri}?shopify_logout_completed=1`,
					);

					window.location.href = url.toString();
				} else {
					//それ以外のログアウト処理
					window.location.href = itmar_block_option.logout_base_url;
				}
			} else {
				const loginUrl = $("#itmar_logon_btn").data("logon_url");
				const pattern = new RegExp(
					`^${"[home_url]".replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/?$`,
				);

				if (pattern.test(loginUrl)) {
					//ビルトインのログイン画面
					window.location.href = itmar_block_option.login_url;
				} else {
					//カスタムログイン画面
					const loginPageUrl = loginUrl.replace(
						"[home_url]",
						itmar_block_option.home_url,
					);
					//リダイレクト情報
					const redirectUrl = window.location.href;
					//その他付加情報
					const ec_block = $(".wp-block-itmar-product-block");
					let shop_id = "";
					let headless_id = "";
					if (ec_block.length > 0) {
						shop_id = ec_block.data("shop_id") || "";
						headless_id = ec_block.data("headless_id") || "";
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
				const modalId = openElm.data("modal_id");
				const $modal = $("#" + modalId);
				if ($modal.length > 0) {
					$modal.parent().parent().show(); // display:none → block など
				}
			});
		}
	});
});
