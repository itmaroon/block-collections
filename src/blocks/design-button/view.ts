import { __ } from "@wordpress/i18n";

import { styleDataApply } from "itmar-block-packages/front";

import { createButtonStyleCss } from "./StyleButton";
import { createTooltipStyleCss } from "../tooltipCss";
import { applyStretchAccordion } from "../front-common";
import { localizeInternalUrl } from "../langUrl";
import { currentViewLang, isLangMap, textForLang } from "../design-title/langCore";
import type { DesignButtonAttributes } from "./types";

const HOME_URL_TOKEN = "[home_url]";

const resolveRedirectUrl = (storedUrl: string): string => {
	const value = String(storedUrl ?? "").trim();

	if (!value) {
		return "";
	}

	if (!value.startsWith(HOME_URL_TOKEN)) {
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

/* ------------------------------
  表示する言語の文字へ差し替え
  ------------------------------
  保存された HTML には既定の言語の文字が入っている。言語ごとの文字は data-attributes に持っているので、
  表示している言語（URL → Cookie → 既定）の文字に差し替える。 */
const applyButtonLang = (): void => {
	const lang = currentViewLang();
	document
		.querySelectorAll<HTMLElement>(".wp-block-itmar-design-button")
		.forEach((block) => {
			let attrs: DesignButtonAttributes;
			try {
				attrs = JSON.parse(block.getAttribute("data-attributes") || "{}");
			} catch (e) {
				return;
			}
			const button = block.querySelector<HTMLElement>(".itmar_design_button");
			if (button && attrs.displayType === "string") {
				if (attrs.linkKind === "stretch") {
					const info = attrs.stretchInfo;
					const label = button.querySelector<HTMLElement>(":scope > div");
					if (label && info) {
						const text = info.isOpen ? info.openText : info.closeText;
						if (isLangMap(text)) label.textContent = textForLang(text, lang);
					}
				} else if (isLangMap(attrs.labelContent)) {
					button.innerHTML = textForLang(attrs.labelContent, lang);
				}
			}
			if (isLangMap(attrs.tooltip_text)) {
				block
					.querySelector<HTMLElement>(".itmar-toolTip-style")
					?.setAttribute("data-tooltip", textForLang(attrs.tooltip_text, lang));
			}
		});
};
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", applyButtonLang);
} else {
	applyButtonLang();
}

//ボタン本体とツールチップを、それぞれの保存属性から適用
styleDataApply(createButtonStyleCss, ".wp-block-itmar-design-button", {
	selector: ".itmar-wrap",
	target: "inner",
	classPrefix: "itmar-button-style-",
	observe: true,
	decorateTarget: (target: Element) => {
		requestAnimationFrame(() => {
			target
				.querySelectorAll<HTMLImageElement>("img.image")
				.forEach((image) => {
					image.style.visibility = "visible";
				});
		});
	},
});
styleDataApply(createTooltipStyleCss, ".itmar-toolTip-style", {
	target: "self",
	classPrefix: "itmar-button-tooltip-",
	observe: true,
});

/* ------------------------------
  オーバーレイメニュー（リンク種別 overlay）
  開閉の状態は、ボタンではなく、メニューのグループ側（.itmar-overlay-menu の is-overlay-open）が持つ。
  同じIDを指すボタンは何個あってもよく、押すたびにその状態を切り替える。
  ------------------------------ */
const OVERLAY_CLASS = "itmar-overlay-menu";
const OVERLAY_OPEN_CLASS = "is-overlay-open";
const OVERLAY_LOCK_CLASS = "itmar-overlay-lock";
const FOCUSABLE =
	'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

//メニューのグループ（CSSが当たる外側の .itmar-wrap）をIDから探す
const findOverlayRoot = (groupId: string): HTMLElement | null => {
	const target = groupId ? document.getElementById(groupId) : null;
	return target ? target.closest<HTMLElement>(".itmar-wrap") : null;
};

//メニューのIDごとに、それを開閉するボタンを集める
const overlayButtons = new Map<string, HTMLElement[]>();
//閉じたあとにフォーカスを戻す、開いたときのボタン
const overlayOpeners = new WeakMap<HTMLElement, HTMLElement | null>();

const openOverlayRoots = (): HTMLElement[] =>
	Array.from(document.querySelectorAll<HTMLElement>(`.${OVERLAY_CLASS}.${OVERLAY_OPEN_CLASS}`));

const setOverlay = (groupId: string, root: HTMLElement, open: boolean): void => {
	if (root.classList.contains(OVERLAY_OPEN_CLASS) === open) return;
	root.classList.toggle(OVERLAY_OPEN_CLASS, open);
	root.setAttribute("aria-hidden", open ? "false" : "true");

	(overlayButtons.get(groupId) ?? []).forEach((button) =>
		button.setAttribute("aria-expanded", open ? "true" : "false"),
	);
	//開いている間は、背面のスクロールを止める
	document.documentElement.classList.toggle(
		OVERLAY_LOCK_CLASS,
		openOverlayRoots().length > 0,
	);

	if (open) {
		overlayOpeners.set(root, document.activeElement as HTMLElement | null);
		requestAnimationFrame(() => {
			const first = root.querySelector<HTMLElement>(FOCUSABLE);
			(first ?? root).focus({ preventScroll: true });
		});
	} else {
		overlayOpeners.get(root)?.focus({ preventScroll: true });
		overlayOpeners.delete(root);
	}
};

const initOverlay = (groupId: string, button: HTMLElement): void => {
	const buttons = overlayButtons.get(groupId) ?? [];
	buttons.push(button);
	overlayButtons.set(groupId, buttons);
	button.setAttribute("aria-expanded", "false");
	button.setAttribute("aria-controls", groupId);

	const root = findOverlayRoot(groupId);
	if (!root || root.classList.contains(OVERLAY_CLASS)) return;
	root.classList.add(OVERLAY_CLASS);
	root.dataset.overlayId = groupId;
	root.setAttribute("role", "dialog");
	root.setAttribute("aria-modal", "true");
	root.setAttribute("aria-hidden", "true");
	root.setAttribute("tabindex", "-1");
	//祖先の backdrop-filter / transform が position:fixed の基準を奪うので、body の直下へ移す
	if (root.parentElement !== document.body) document.body.appendChild(root);
	//メニューの中のリンクを押したら閉じる
	root.addEventListener("click", (event) => {
		if ((event.target as HTMLElement).closest("a[href]")) {
			setOverlay(groupId, root, false);
		}
	});
};

document.addEventListener("keydown", (event) => {
	if (event.key !== "Escape") return;
	const roots = openOverlayRoots();
	const last = roots[roots.length - 1];
	if (last) setOverlay(last.dataset.overlayId ?? "", last, false);
});

/* ------------------------------
  ページの先頭へ戻るボタン（リンク種別 scrolltop）
  ページが先頭にあるときは、フェードで消え、上へスクロールできるようになると、フェードで現れる。
  消えている間は、クリックもキーボードの操作も受け付けない。
  ------------------------------ */
//先頭からこの距離（px）を超えて、下がったら、現れる
const SCROLLTOP_SHOW_AFTER = 10;
const SCROLLTOP_VISIBLE_CLASS = "is-scrolltop-visible";
const scrollTopBlocks: HTMLElement[] = [];

const prefersReducedMotion = (): boolean =>
	window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

const updateScrollTopVisibility = (): void => {
	const show = window.scrollY > SCROLLTOP_SHOW_AFTER;
	scrollTopBlocks.forEach((block) => {
		block.classList.toggle(SCROLLTOP_VISIBLE_CLASS, show);
		const button = block.querySelector<HTMLElement>(".itmar_design_button");
		if (button) {
			button.tabIndex = show ? 0 : -1;
			button.setAttribute("aria-hidden", show ? "false" : "true");
		}
	});
};

let scrollTopTicking = false;
const onScrollTop = (): void => {
	if (scrollTopTicking) return;
	scrollTopTicking = true;
	window.requestAnimationFrame(() => {
		scrollTopTicking = false;
		updateScrollTopVisibility();
	});
};

const initScrollTop = (block: HTMLElement): void => {
	if (scrollTopBlocks.includes(block)) return;
	scrollTopBlocks.push(block);
	if (scrollTopBlocks.length === 1) {
		window.addEventListener("scroll", onScrollTop, { passive: true });
		window.addEventListener("resize", onScrollTop, { passive: true });
	}
	updateScrollTopVisibility();
};

jQuery(function ($) {
	$(".wp-block-itmar-design-button").each(function () {
		const $button = $(this);
		const rawAttributes = $button.attr("data-attributes");
		const blockAttributes: DesignButtonAttributes | null = rawAttributes
			? JSON.parse(rawAttributes)
			: null;
		if (!blockAttributes) return;
		if (blockAttributes.linkKind === "scrolltop") {
			initScrollTop(this as HTMLElement);
			return;
		}
		if (blockAttributes.linkKind === "overlay") {
			const groupId = blockAttributes.stretchInfo?.groupId;
			const buttonEl = $button.find(".itmar_design_button").get(0);
			if (groupId && buttonEl) initOverlay(groupId, buttonEl);
			return;
		}
		//伸縮の対象は、リンク種別が stretch のボタンだけ
		if (blockAttributes.linkKind !== "stretch") return;
		const el = $(`#${blockAttributes.stretchInfo.groupId}`).get(0);
		if (!el) return;
		applyStretchAccordion(el, false);
	});

	/* ------------------------------
  design-buttonイベントハンドラ
  ------------------------------ */
	$(document).on("click", ".itmar_design_button", function () {
		//リダイレクトの処理
		const storedRedirectUrl = $(this).attr("data-selected_page") ?? "";
		const redirectUrl = localizeInternalUrl(
			resolveRedirectUrl(storedRedirectUrl),
			itmar_option.home_url,
		);
		if (redirectUrl) {
			const isBlank = $(this).data("open_blank");
			//リダイレクト
			if (isBlank) {
				window.open(redirectUrl, "_blank");
			} else {
				if (redirectUrl) window.location.href = redirectUrl;
			}
			//モーダルのクローズ処理
		} else if ($(this).data("open_blank") === "form_close") {
			//modal closeボタンの処理
			if ($(this).data("close_modal")) {
				//IDかクラス名が指定されているとき
				const target_modal = $(this).data("close_modal");
				//指定された要素（.wp-block-itmar-design-group）の親を非表示
				const $target = $(this).closest(`${target_modal}`);
				if ($target.length) {
					$target.parent().parent().hide();
				}
			} else {
				//IDかクラス名が指定されていないとき
				const $button_group = $(this)
					.closest(".wp-block-itmar-design-group")
					.parent();
				//ボタンをラップした要素（.wp-block-itmar-design-group）のさらに上の要素（.wp-block-itmar-design-group）を非表示
				const $target = $button_group
					.closest(".wp-block-itmar-design-group")
					.parent();
				$target.hide();
			}
			//ページの先頭へ戻る
		} else if ($(this).data("back") === "scrolltop") {
			window.scrollTo({
				top: 0,
				behavior: prefersReducedMotion() ? "auto" : "smooth",
			});
			//オーバーレイメニューの開閉
		} else if ($(this).data("back") === "overlay") {
			const rawAttributes = $(this)
				.closest(".wp-block-itmar-design-button")
				.attr("data-attributes");
			const blockAttributes: DesignButtonAttributes | null = rawAttributes
				? JSON.parse(rawAttributes)
				: null;
			const groupId = blockAttributes?.stretchInfo?.groupId;
			if (!groupId) return;
			const root = findOverlayRoot(groupId);
			if (!root) return;
			setOverlay(groupId, root, !root.classList.contains(OVERLAY_OPEN_CLASS));
			//ストレッチの処理
		} else if ($(this).data("back") === "stretch") {
			//ブロックの属性を取得
			const rawAttributes = $(this)
				.closest(".wp-block-itmar-design-button")
				.attr("data-attributes");

			const blockAttributes: DesignButtonAttributes | null = rawAttributes
				? JSON.parse(rawAttributes)
				: null;
			if (!blockAttributes) return;

			const el = $(`#${blockAttributes.stretchInfo.groupId}`).get(0);
			if (!el) return;
			const isOpen = !$(this).hasClass("is-open");

			$(this).toggleClass("is-open", isOpen);

			applyStretchAccordion(el, isOpen);
			//ボタンのレンダリング変更
			const $pseudo = $(this).find(".stretch_pseudo");
			$pseudo
				.css("--stretch-arrow-rotate", isOpen ? "-45deg" : "135deg")
				.text(
					textForLang(
						isOpen
							? blockAttributes.stretchInfo.openText
							: blockAttributes.stretchInfo.closeText,
						currentViewLang(),
					),
				);
		}
	});
});
