import { __ } from "@wordpress/i18n";

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
 design-groupアニメーションイベント処理
 ------------------------------ */
	const anime_parm_trigger = (flg, trigger) => {
		$(".wp-block-itmar-design-group .group_contents")
			.filter(function () {
				// data-anime_prm属性が'visible'である要素を選択
				const prm = $(this).data("anime_prm");
				return prm && prm.trigger === trigger;
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

	//オープニングブロックがある場合とない場合で処理を分ける
	const $fixbg = $(".fixbg");
	const handler = () => anime_parm_trigger(true, "opend");

	//オープニングの処理がない場合のアニメーション
	$(document).ready(function () {
		if ($fixbg.length == 0) {
			handler();
		}
	});

	//オープニングの処理完了後のアニメーション
	// 先に受信できるよう登録
	$fixbg.on("openAnimationEnd", handler);
	// もし既に発火済みなら追いつき実行
	if ($fixbg.data("openAnimationEnded")) {
		handler();
	}

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
});
