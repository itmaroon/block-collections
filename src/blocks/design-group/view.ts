import { __ } from "@wordpress/i18n";
import { styleDataApply } from "itmar-block-packages/front";
import { MOBILE_QUERY } from "../breakpoints";

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

});

/* ------------------------------
  design-group のハンバーガーメニュー
  ------------------------------

  開閉対象はボタンの aria-controls で名指しする。以前は
  `$(this).siblings("div")` で兄弟をたどっていたが、save() が
  ボタン・背景・メニュー本体をフラグメントで並べて出すため、同じ親に
  別のブロックがあるとそれも巻き込んで .open が付いていた。

  旧マークアップ（<div class="itmar_hamberger_btn"> で id 無し）は
  deprecated 経由でそのまま残るので、その場合だけ従来の兄弟探索に落とす。 */

const MENU_OPEN_CLASS = "open";

const findMenuBody = (btn: HTMLElement): HTMLElement | null => {
	const id = btn.getAttribute("aria-controls");
	if (id) {
		const el = document.getElementById(id);
		if (el) return el;
	}
	//旧マークアップ向けのフォールバック：直後の .itmar-wrap
	let sib = btn.nextElementSibling;
	while (sib) {
		if (sib.classList.contains("itmar-wrap")) return sib as HTMLElement;
		sib = sib.nextElementSibling;
	}
	return null;
};

const findBackdrop = (btn: HTMLElement, body: HTMLElement | null): HTMLElement | null => {
	const id = btn.getAttribute("aria-controls");
	if (id) {
		const el = document.querySelector<HTMLElement>(
			`.itmar_back_ground[data-menu-target="${CSS.escape(id)}"]`,
		);
		if (el) return el;
	}
	let sib = btn.nextElementSibling;
	while (sib && sib !== body) {
		if (sib.classList.contains("itmar_back_ground")) return sib as HTMLElement;
		sib = sib.nextElementSibling;
	}
	return null;
};

const FOCUSABLE =
	'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

class HamburgerMenu {
	private btn: HTMLElement;
	private body: HTMLElement | null;
	private backdrop: HTMLElement | null;
	private mql: MediaQueryList;
	private open = false;
	private lastFocused: HTMLElement | null = null;

	constructor(btn: HTMLElement) {
		this.btn = btn;
		this.body = findMenuBody(btn);
		this.backdrop = findBackdrop(btn, this.body);
		this.mql = window.matchMedia(MOBILE_QUERY);

		//save() には翻訳文字列を入れられない（言語を変えると検証エラーになる）ので実行時に付ける
		if (!btn.getAttribute("aria-label")) {
			btn.setAttribute("aria-label", __("Menu", "block-collections"));
		}
		if (btn.tagName !== "BUTTON") {
			//旧マークアップの <div> をキーボードで扱えるようにする
			btn.setAttribute("role", "button");
			btn.setAttribute("tabindex", "0");
			if (!btn.hasAttribute("aria-expanded"))
				btn.setAttribute("aria-expanded", "false");
		}

		btn.addEventListener("click", this.toggle);
		btn.addEventListener("keydown", this.onButtonKey);
		this.backdrop?.addEventListener("click", this.close);
		document.addEventListener("keydown", this.onDocumentKey);
		this.mql.addEventListener("change", this.syncToViewport);

		this.syncToViewport();
	}

	private setBodyScrollLock(lock: boolean) {
		document.body.style.overflow = lock ? "hidden" : "";
	}

	/** モバイル幅でだけ「閉じている＝画面外」になる。デスクトップでは常に見えているので
	 *  タブ順から外してはいけない。 */
	private syncToViewport = () => {
		if (!this.body) return;
		if (this.mql.matches) {
			this.applyHiddenState(!this.open);
		} else {
			this.body.removeAttribute("aria-hidden");
			(this.body as HTMLElement & { inert?: boolean }).inert = false;
			this.backdrop?.setAttribute("hidden", "");
			this.setBodyScrollLock(false);
		}
	};

	private applyHiddenState(hidden: boolean) {
		if (!this.body) return;
		//画面外にあるだけの要素は読み上げとタブ順に残るので、閉じている間は外す
		(this.body as HTMLElement & { inert?: boolean }).inert = hidden;
		if (hidden) this.body.setAttribute("aria-hidden", "true");
		else this.body.removeAttribute("aria-hidden");
	}

	private toggle = (e: Event) => {
		e.preventDefault();
		this.open ? this.close() : this.openMenu();
	};

	private onButtonKey = (e: KeyboardEvent) => {
		//旧マークアップの <div> はEnter/Spaceが効かないので補う
		if (this.btn.tagName === "BUTTON") return;
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			this.toggle(e);
		}
	};

	private onDocumentKey = (e: KeyboardEvent) => {
		if (!this.open) return;
		if (e.key === "Escape") {
			e.preventDefault();
			this.close();
			return;
		}
		if (e.key === "Tab") this.trapFocus(e);
	};

	private trapFocus(e: KeyboardEvent) {
		if (!this.body) return;
		const items = [
			this.btn,
			...Array.from(this.body.querySelectorAll<HTMLElement>(FOCUSABLE)),
		].filter((el) => el.offsetParent !== null || el === this.btn);
		if (!items.length) return;
		const first = items[0];
		const last = items[items.length - 1];
		if (e.shiftKey && document.activeElement === first) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && document.activeElement === last) {
			e.preventDefault();
			first.focus();
		}
	}

	private openMenu = () => {
		if (!this.body || this.open) return;
		this.open = true;
		this.lastFocused = document.activeElement as HTMLElement | null;
		this.btn.classList.add(MENU_OPEN_CLASS);
		this.btn.setAttribute("aria-expanded", "true");
		this.body.classList.add(MENU_OPEN_CLASS);
		if (this.backdrop) {
			this.backdrop.removeAttribute("hidden");
			this.backdrop.classList.add(MENU_OPEN_CLASS);
		}
		this.applyHiddenState(false);
		this.setBodyScrollLock(true);
		const firstItem = this.body.querySelector<HTMLElement>(FOCUSABLE);
		(firstItem ?? this.btn).focus();
	};

	private close = () => {
		if (!this.body || !this.open) return;
		this.open = false;
		this.btn.classList.remove(MENU_OPEN_CLASS);
		this.btn.setAttribute("aria-expanded", "false");
		this.body.classList.remove(MENU_OPEN_CLASS);
		if (this.backdrop) {
			this.backdrop.classList.remove(MENU_OPEN_CLASS);
			this.backdrop.setAttribute("hidden", "");
		}
		this.setBodyScrollLock(false);
		if (this.mql.matches) this.applyHiddenState(true);
		//閉じたあとの行き先。開く前の位置が無ければボタンへ戻す（フォーカスを失わせない）
		const back =
			this.lastFocused && this.lastFocused !== document.body
				? this.lastFocused
				: this.btn;
		back.focus?.();
	};
}

const initHamburgers = () => {
	document
		.querySelectorAll<HTMLElement>(".itmar_hamberger_btn")
		.forEach((btn) => {
			if (btn.dataset.itmarHamburgerBound) return;
			btn.dataset.itmarHamburgerBound = "1";
			new HamburgerMenu(btn);
		});
};

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initHamburgers);
} else {
	initHamburgers();
}
