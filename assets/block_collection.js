import { __ } from "@wordpress/i18n";
import visibleIcon from "./img/visible.svg";
import hideIcon from "./img/hide.svg";

import {
	generateMonthCalendar,
	generateGridAreas,
	JapaneseHolidays,
	fetchZipToAddress,
} from "itmar-block-packages";

import apiFetch from "@wordpress/api-fetch";

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
						//const { __ } = wp.i18n;
						const msg = __("copied", "block-collections");
						ctrlMsg(__("copied", "block-collections"));
					},
					(err) => {
						console.error("Could not copy text: ", err);
					},
				);
			});
		});
});

jQuery(function ($) {
	/* ------------------------------
  core/paragraphのもっと見るボタンの処理
  ------------------------------ */
	//DOM要素（監視対象）ごとに作った ResizeObserver を紐づけて覚えておくための入れ物
	const roMap = new WeakMap();
	//DOM要素が追加されたされたときに呼び出されるコールバック関数
	function attachResizeObserverFromNode(node) {
		const $scope = $(node);

		// node自身が対象なら自身も、子孫にもいるなら子孫も拾う
		const $targets = $scope.is("p.itmar_ex_block[data-more_style]")
			? $scope
			: $scope.find("p.itmar_ex_block[data-more_style]");

		$targets.each(function () {
			const el = this;
			if (roMap.has(el)) return; // もう監視済み
			//moreが適用されたときのcssオブジェクト
			let moreStyle = $(this).data("more_style");
			//もっと見るボタン
			let $button = $(this).closest(".group_contents").find("button");

			let expand_flg = false; // 初期状態は非展開

			let $wrapper, $gradientOverlay;

			// グラデーションオーバーレイ要素を作成する関数
			function createGradientOverlay($target) {
				let effectiveBackgroundColor = $target.css("background-color");
				if (
					effectiveBackgroundColor === "rgba(0, 0, 0, 0)" ||
					effectiveBackgroundColor === "transparent"
				) {
					effectiveBackgroundColor = "white";
				} //レンダリングされた色が透明なら白にする

				let perGradient =
					window.innerWidth >= 768
						? moreStyle.defaultGradient
						: moreStyle.mobileGradient || 50; // デフォルト値を50%とする

				return $("<div>").css({
					position: "absolute",
					width: "100%",
					height: perGradient + "%",
					bottom: "0",
					left: "0",
					backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, ${effectiveBackgroundColor} 70%)`,
					zIndex: "3",
				});
			}

			// スタイルを設定し、必要に応じてグラデーションオーバーレイを追加/削除する関数
			function setStyles($target) {
				let maxHeight =
					window.innerWidth >= 768
						? moreStyle.defaultMaxHeight
						: moreStyle.mobileMaxHeight;

				if (expand_flg) {
					$target.css({ "max-height": "", overflow: "visible" });
					// ラップとグラデーションオーバーレイを解除
					if ($wrapper) {
						$target.unwrap();
						$wrapper = null;
					}
					if ($gradientOverlay) {
						$gradientOverlay.remove();
						$gradientOverlay = null;
					}
				} else {
					//「もっと見る」のスタイルをセット
					$target.css({ "max-height": maxHeight, overflow: "hidden" });
					//ボタンを取得
					const moreBtnDiv = $button.closest(".more_btn");

					// scrollHeight と clientHeight を比較
					if ($target[0].scrollHeight > $target[0].clientHeight) {
						// pをラップ
						if (!$wrapper) {
							$wrapper = $(
								'<div class="itmar_ex_block_wrapper" style="position: relative;"></div>',
							);
							$target.wrap($wrapper);
						}
						// グラデーションオーバーレイを追加
						if (!$gradientOverlay) {
							$gradientOverlay = createGradientOverlay($target);
							$target.after($gradientOverlay);
						}
						//ボタンを表示
						moreBtnDiv.removeClass("more_hide");
					} else {
						// コンテンツが切り詰められていない場合、グラデーションオーバーレイを削除
						if ($gradientOverlay) {
							$gradientOverlay.remove();
							$gradientOverlay = null;
						}
						//ボタンを非表示
						moreBtnDiv.addClass("more_hide");
					}
				}
			}

			// ボタンにクリックイベントリスナーを追加
			$button.on("click", function () {
				expand_flg = !expand_flg; // フラグを反転
				const $target_p = $(this).closest(".group_contents").find("p");
				setStyles($target_p); // スタイルを設定
				// ボタンのテキストを変更（オプション）
				$(this).text(
					!expand_flg
						? __("See more...", "block-collections")
						: __("Collapse...", "block-collections"),
				);
			});

			const ro = new ResizeObserver(() => setStyles($(this)));
			ro.observe(el);
			roMap.set(el, ro);

			setStyles($(el));
		});
	}

	//pickup-postsがあればクローンの挿入を検出して初期化
	const container = document.querySelector(".wp-block-itmar-pickup-posts");
	if (container) {
		const mo = new MutationObserver((mutations) => {
			for (const m of mutations) {
				for (const node of m.addedNodes) {
					if (!(node instanceof Element)) continue;
					attachResizeObserverFromNode(node);
				}
			}
		});

		mo.observe(container, { childList: true, subtree: true });
	}
	//pickup-postsの外の要素を初期化
	attachResizeObserverFromNode(document);

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
					block_collections.home_url,
				);
				// href属性を更新
				$(this).attr("href", updatedHref);
			});

		//ログアウト・ログインの処理
		$("#itmar_logon_btn").on("click", function () {
			if (isLogin) {
				//ShopIDを持ったec-relate-bloksがある場合のログアウト処理
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
				return $(this).data("anime_prm")?.trigger === "visible";
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
	//パスワードの表示切替
	$(".toggle-password-button").on("click", function () {
		const $button = $(this);
		const $input = $button.siblings(
			"input[type='password'], input[type='text']",
		);
		const $img = $button.find("img");

		if ($input.length === 0) return;

		const isPasswordVisible = $input.attr("type") === "text";

		// type属性を切り替え
		$input.attr("type", isPasswordVisible ? "password" : "text");

		// アイコンを切り替え
		$img.attr("src", isPasswordVisible ? hideIcon : visibleIcon);
	});
	//ナンバーの操作

	$(document).on(
		"click",
		".number-input-wrapper .number-stepper-minus",
		function () {
			const $wrapper = $(this).closest(".number-input-wrapper");
			const $input = $wrapper.find('input[type="number"]').first();
			if (!$input.length) return;

			const min = Number($input.attr("min"));
			const step = Number($input.attr("step")) || 1;

			let current = Number($input.val());
			if (isNaN(current)) current = 0;

			let next = current - step;
			if (!isNaN(min)) next = Math.max(next, min);

			$input.val(next).trigger("input").trigger("change");
		},
	);

	$(document).on(
		"click",
		".number-input-wrapper .number-stepper-plus",
		function () {
			const $wrapper = $(this).closest(".number-input-wrapper");
			const $input = $wrapper.find('input[type="number"]').first();
			if (!$input.length) return;

			const max = Number($input.attr("max"));
			const step = Number($input.attr("step")) || 1;

			let current = Number($input.val());
			if (isNaN(current)) current = 0;

			let next = current + step;
			if (!isNaN(max)) next = Math.min(next, max);

			$input.val(next).trigger("input").trigger("change");
		},
	);
	//住所の郵便番号検索
	$(".zip-search-button").on("click", async function () {
		const $button = $(this);
		const $container = $button.closest(".zip-search-wrapper");
		const $zipInput = $container.find("input[type='text']");
		const zip = $zipInput.val().replace("-", "").trim();
		const targetName = $zipInput.data("address-target"); // 👈 入力対象名
		if (!/^\d{7}$/.test(zip)) {
			alert(
				__(
					"Please enter your postal code as 7 digits without hyphens.",
					"block-collections",
				),
			);
			return;
		}

		const address_obj = await fetchZipToAddress(zip);
		if (!address_obj) return;

		const fullAddress = `${address_obj.address1}${address_obj.address2}${address_obj.address3}`;

		// name属性でターゲットのinputを特定して値をセット
		const $targetInput = $(`input[name='${targetName}']`);
		if ($targetInput.length > 0) {
			$targetInput.val(fullAddress);
		} else {
			alert(
				__(
					"The block to enter the address cannot be found.",
					"block-collections",
				),
			);
		}
	});

	/* ------------------------------
  design-buttonイベントハンドラ
  ------------------------------ */
	$(document).on("click", ".itmar_design_button", function (e) {
		if ($(this).attr("data-selected_page")) {
			let redirectUrl = $(this).attr("data-selected_page");
			let isBlank = $(this).data("open_blank");
			//リダイレクト
			if (isBlank) {
				window.open(redirectUrl, "_blank");
			} else {
				window.location.href = redirectUrl;
			}
		} else if ($(this).data("open_blank") === "form_close") {
			//modal closeボタンの処理
			if ($(this).data("close_modal")) {
				const target_modal = $(this).data("close_modal");
				$(`.${target_modal}`).children().hide();
			} else {
				$(this).parent().parent().hide();
			}
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
	//クリアボタンをクリックしたとき
	$(document).on(
		"click",
		".wp-block-itmar-design-radio .itmar_radio button",
		function () {
			//ラベルのクラス名を削除
			let radio_list = $(this).parent().parent().find("label");
			radio_list.removeClass("checked check_prev check_next ready");
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

	//カレンダーのレンダリング関数
	const calenderRender = (
		dateArea,
		monthData,
		name,
		weekTop,
		tipsClass,
		isClear,
	) => {
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
		function () {
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
			//カレンダーの曜日のトップを取得
			const weekTop = $(this)
				.closest(".wp-block-itmar-design-calender")
				.data("week_top");
			//ツールチップのスタイルを適用するクラス名を取得
			const tipsClass = $(this)
				.closest(".wp-block-itmar-design-calender")
				.data("tips_class");
			//表示月の日付オブジェクトを生成
			let selectedOption = $(this).find("option:selected");
			//祝日表示の有無
			const isHoliday = $(this)
				.closest(".wp-block-itmar-design-calender")
				.data("is_holiday");
			if (isHoliday) {
				const calenderApiKey = $(this)
					.closest(".wp-block-itmar-design-calender")
					.data("api_key");
				//祝日の表示処理
				JapaneseHolidays(calenderApiKey, selectedOption.attr("value"))
					.then((data) => {
						// ここで祝日データを使用する処理を行う
						const dateValues = generateMonthCalendar(
							selectedOption.attr("value"),
							data,
						);
						calenderRender(
							dateArea,
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
					})
					.catch((error) => {
						console.error("エラーが発生しました:", error);
					});
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

	/* ------------------------------
  core/imageのimage要素をラップする処理
  ------------------------------ */
	$("figure.fit-scale-image img").each(function () {
		$(this).wrap('<div class="wrapper"></div>');
	});
});
