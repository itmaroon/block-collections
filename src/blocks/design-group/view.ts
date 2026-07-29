import { __ } from "@wordpress/i18n";
import { styleDataApply } from "itmar-block-packages";

import { createGroupStyleCss } from "./StyleGroup";
import type { GroupAttributes } from "./types";

const MORE_ANIMATION_DURATION = 400;
const MORE_HEIGHT_TRANSITION = `max-height ${MORE_ANIMATION_DURATION}ms ease`;

const getMoreButtonLabel = (isExpanded: boolean): string =>
	isExpanded
		? __("Collapse...", "block-collections")
		: __("See more...", "block-collections");

//保存済み属性から、React非依存のスコープ付きCSSを適用
styleDataApply(createGroupStyleCss, ".wp-block-itmar-design-group", {
	selector: ".itmar-wrap",
	target: "outer",
	classPrefix: "itmar-group-style-",
	observe: true,
	decorateTarget: (
		target: Element,
		attributes: GroupAttributes,
	) => {
		const parallax = attributes.parallax_obj;
		if (!parallax?.type) return;

		const suffix = parallax.unit === "%" ? "%" : "";
		target.setAttribute(
			`data-swiper-parallax-${parallax.type}`,
			`${parallax.scale}${suffix}`,
		);
	},
});

jQuery(function ($) {
	/* ------------------------------
	core/paragraphのもっと見るボタンの処理
  ------------------------------ */
	//DOM要素（監視対象）ごとに作った ResizeObserver を紐づけて覚えておくための入れ物
	const roMap = new WeakMap<Element, ResizeObserver>();
	//DOM要素が追加されたされたときに呼び出されるコールバック関数
	function attachResizeObserverFromNode(node: Node): void {
		const $scope = $(node);

		// node自身が対象なら自身も、子孫にもいるなら子孫も拾う
		const $targets = $scope.is("p.itmar_ex_block[data-more_style]")
			? $scope
			: $scope.find("p.itmar_ex_block[data-more_style]");

		$targets.each(function () {
			const el = this;
			if (!(el instanceof HTMLElement)) return;
			const $element = $(el);
			if (roMap.has(el)) return; // もう監視済み
			//moreが適用されたときのcssオブジェクト
			let moreStyle = $(this).data("more_style");
			//もっと見るボタン
			let $button = $(this)
				.closest(".group_contents")
				.find(".more_btn button");

			let expand_flg = false; // 初期状態は非展開
			let isAnimating = false;
			let animationTimer: number | undefined;

			let $wrapper: JQuery<HTMLElement> | null = null;
			let $gradientOverlay: JQuery<HTMLElement> | null = null;

			// グラデーションオーバーレイ要素を作成する関数
			function createGradientOverlay(
				$target: JQuery<HTMLElement>,
			): JQuery<HTMLElement> {
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

			// 折りたたみ時のグラデーションとボタン表示を更新する関数
			function updateCollapsedDecoration(
				$target: JQuery<HTMLElement>,
				isTruncated: boolean,
			): void {
				const moreBtnDiv = $button.closest(".more_btn");

				if (isTruncated) {
					if (!$wrapper) {
						$wrapper = $(
							'<div class="itmar_ex_block_wrapper" style="position: relative;"></div>',
						);
						$target.wrap($wrapper);
					}
					if (!$gradientOverlay) {
						$gradientOverlay = createGradientOverlay($target);
						$target.after($gradientOverlay);
					}
					moreBtnDiv.removeClass("more_hide");
				} else {
					if ($gradientOverlay) {
						$gradientOverlay.remove();
						$gradientOverlay = null;
					}
					moreBtnDiv.addClass("more_hide");
				}
			}

			// スタイルを設定し、必要に応じてグラデーションオーバーレイを追加/削除する関数
			function setStyles(
				$target: JQuery<HTMLElement>,
				animate = false,
			): void {
				const target = $target[0];
				if (!target) return;

				let maxHeight =
					window.innerWidth >= 768
						? moreStyle.defaultMaxHeight
						: moreStyle.mobileMaxHeight;
				const fullHeight = target.scrollHeight;

				$target.off("transitionend.itmarMore");
				if (animationTimer !== undefined) {
					window.clearTimeout(animationTimer);
					animationTimer = undefined;
				}

				if (expand_flg) {
					if ($gradientOverlay) {
						$gradientOverlay.remove();
						$gradientOverlay = null;
					}

					if (!animate) {
						$target.css({
							"max-height": "none",
							overflow: "visible",
							transition: MORE_HEIGHT_TRANSITION,
						});
						if ($wrapper) {
							$target.unwrap();
							$wrapper = null;
						}
						return;
					}

					isAnimating = true;
					$target.css({
						"max-height": `${target.clientHeight}px`,
						overflow: "hidden",
						transition: "none",
						"will-change": "max-height",
					});
					void target.offsetHeight;
					$target.css({
						"max-height": `${fullHeight}px`,
						transition: MORE_HEIGHT_TRANSITION,
					});
				} else {
					// 一度アニメーションなしで折りたたみ後の高さを測る。
					$target.css({
						"max-height": maxHeight,
						overflow: "hidden",
						transition: "none",
						"will-change": "max-height",
					});
					const isTruncated = target.scrollHeight > target.clientHeight;
					updateCollapsedDecoration($target, isTruncated);

					if (!animate) {
						$target.css({ transition: MORE_HEIGHT_TRANSITION });
						return;
					}

					isAnimating = true;
					$target.css({ "max-height": `${fullHeight}px` });
					void target.offsetHeight;
					$target.css({
						"max-height": maxHeight,
						transition: MORE_HEIGHT_TRANSITION,
					});
				}

				const finishAnimation = (): void => {
					if (!isAnimating) return;
					isAnimating = false;
					if (animationTimer !== undefined) {
						window.clearTimeout(animationTimer);
						animationTimer = undefined;
					}
					$target.off("transitionend.itmarMore");

					if (expand_flg) {
						$target.css({ "max-height": "none", overflow: "visible" });
						if ($wrapper) {
							$target.unwrap();
							$wrapper = null;
						}
					}
				};

				$target.on("transitionend.itmarMore", (event) => {
					const transitionEvent = event.originalEvent as
						| TransitionEvent
						| undefined;
					if (
						event.target === target &&
						transitionEvent?.propertyName === "max-height"
					) {
						finishAnimation();
					}
				});
				animationTimer = window.setTimeout(
					finishAnimation,
					MORE_ANIMATION_DURATION + 100,
				);
			}

			// ボタンにクリックイベントリスナーを追加
			$button.on("click", function () {
				expand_flg = !expand_flg; // フラグを反転
				const $target_p = $(this).closest(".group_contents").find("p");
				setStyles($target_p, true); // スタイルを設定
				const translatedLabel = getMoreButtonLabel(expand_flg);
				$(this).text(translatedLabel);
			});

			const ro = new ResizeObserver(() => {
				if (!isAnimating) setStyles($element);
			});
			ro.observe(el);
			roMap.set(el, ro);

			setStyles($element);
			$button.text(getMoreButtonLabel(expand_flg));
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
	const anime_parm_trigger = (
		flg: boolean,
		trigger: string,
	): void => {
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
	$(window).on("scroll", function () {
		$(".wp-block-itmar-design-group .group_contents")
			.filter(function () {
				// data-anime_prm属性が'visible'である要素を選択
				return $(this).data("anime_prm")?.trigger === "visible";
			})
			.each(function () {
				const $element = $(this);
				const elementOffset = $element.offset();
				if (!elementOffset) return;
				const elementTop = elementOffset.top;

				const viewportHeight =
					$(window).height() ?? window.innerHeight;
				const scrollPosition =
					$(window).scrollTop() ?? window.scrollY;
				const animePattern = $element.data("anime_prm")
					?.pattern as string | undefined;
				if (!animePattern) return;
				// 要素がビューポート内に入ったかどうかを判定
				if (
					elementTop < viewportHeight + scrollPosition &&
					elementTop > scrollPosition
				) {
					// ここに要素がビューポートに入った時の処理
					$element.addClass(animePattern);
				} else {
					// ここに要素がビューポートから出た時の処理
					$element.removeClass(animePattern);
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
