export const setSelectValue = ($, select, id, text, slug, kind) => {
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
};

//アコーデオンストレッチのアニメーション関数
const stretchAccordionStateMap = new WeakMap();

export function applyStretchAccordion(el, isOpen) {
	if (!el) return () => {};

	let state = stretchAccordionStateMap.get(el);

	if (!state) {
		state = {
			prevIsOpen: null,
			naturalHeight: 0,
			naturalPadding: {
				top: "",
				bottom: "",
			},
			isAnimating: false,
			currentTransitionEnd: null,
		};

		stretchAccordionStateMap.set(el, state);
	}

	const isFirstTime = state.prevIsOpen === null;
	state.prevIsOpen = isOpen;

	if (state.currentTransitionEnd) {
		el.removeEventListener("transitionend", state.currentTransitionEnd);
		state.currentTransitionEnd = null;
	}

	const saveNaturalState = () => {
		const computedStyle = window.getComputedStyle(el);

		state.naturalHeight = el.offsetHeight || el.scrollHeight;
		state.naturalPadding = {
			top: el.style.paddingTop || computedStyle.paddingTop,
			bottom: el.style.paddingBottom || computedStyle.paddingBottom,
		};
	};

	const closeImmediately = () => {
		el.style.overflow = "hidden";
		el.style.transition = "none";
		el.style.height = "0px";
		el.style.paddingTop = "0px";
		el.style.paddingBottom = "0px";
		state.isAnimating = false;
	};

	const closeWithAnimation = () => {
		state.isAnimating = true;

		el.style.overflow = "hidden";
		el.style.transition = "none";
		el.style.height = `${state.naturalHeight}px`;

		void el.offsetHeight;

		el.style.transition = "height 0.8s ease, padding 0.8s ease";
		el.style.height = "0px";
		el.style.paddingTop = "0px";
		el.style.paddingBottom = "0px";

		const onEnd = (event) => {
			if (event.target !== el || event.propertyName !== "height") return;

			el.removeEventListener("transitionend", onEnd);
			state.currentTransitionEnd = null;
			state.isAnimating = false;
		};

		state.currentTransitionEnd = onEnd;
		el.addEventListener("transitionend", onEnd);
	};

	const openWithAnimation = () => {
		state.isAnimating = true;

		const openHeight = state.naturalHeight || el.scrollHeight;

		el.style.overflow = "hidden";
		el.style.transition = "none";
		el.style.height = "0px";
		el.style.paddingTop = "0px";
		el.style.paddingBottom = "0px";

		void el.offsetHeight;

		el.style.transition = "height 0.8s ease, padding 0.8s ease";
		el.style.height = `${openHeight}px`;
		el.style.paddingTop = state.naturalPadding.top;
		el.style.paddingBottom = state.naturalPadding.bottom;

		const onEnd = (event) => {
			if (event.target !== el || event.propertyName !== "height") return;

			el.style.height = "";
			el.style.overflow = "";
			el.style.transition = "";
			el.style.paddingTop = state.naturalPadding.top;
			el.style.paddingBottom = state.naturalPadding.bottom;

			el.removeEventListener("transitionend", onEnd);
			state.currentTransitionEnd = null;
			state.isAnimating = false;
		};

		state.currentTransitionEnd = onEnd;
		el.addEventListener("transitionend", onEnd);
	};

	if (isOpen) {
		if (!isFirstTime) {
			openWithAnimation();
		}

		return () => {};
	}

	if (state.isAnimating) return () => {};

	const applyClose = () => {
		saveNaturalState();
		isFirstTime ? closeImmediately() : closeWithAnimation();
	};

	const applyCloseWhenStyleReady = () => {
		if (
			el.style.paddingTop ||
			window.getComputedStyle(el).paddingTop !== "0px"
		) {
			applyClose();
			return;
		}

		let applied = false;

		const mutObserver = new MutationObserver(() => {
			if (applied) return;

			applied = true;
			mutObserver.disconnect();
			applyClose();
		});

		mutObserver.observe(el, {
			attributes: true,
			attributeFilter: ["style"],
		});

		requestAnimationFrame(() =>
			requestAnimationFrame(() => {
				if (!applied) {
					applied = true;
					mutObserver.disconnect();
					applyClose();
				}
			}),
		);
	};

	let resizeObserver;

	if (el.offsetHeight > 0) {
		applyCloseWhenStyleReady();
	} else {
		let hasTriggered = false;

		resizeObserver = new ResizeObserver(() => {
			if (el.offsetHeight > 0 && !hasTriggered) {
				hasTriggered = true;
				resizeObserver.disconnect();
				applyCloseWhenStyleReady();
			}
		});

		resizeObserver.observe(el);
	}

	return () => {
		resizeObserver?.disconnect();

		if (state.currentTransitionEnd) {
			el.removeEventListener("transitionend", state.currentTransitionEnd);
			state.currentTransitionEnd = null;
		}
	};
}

//ストレッチ型のボタンに付記する矢印
export const createStretchPseudoCss = (stretchInfo) => {
	const rotate = stretchInfo.isOpen ? "-45deg" : "135deg";
	const arrowSize = stretchInfo.arrowSize || "20px"; // "20px"

	const match = arrowSize.match(/^([\d.]+)([a-z%]+)$/i);

	const scaledArrowSize = match
		? `${parseFloat(match[1]) * 3.5}${match[2]}`
		: arrowSize;

	return `
    .stretch_pseudo {
      position: relative;
	  padding-right:${scaledArrowSize};
    }

    .stretch_pseudo::after {
      content: "";
      position: absolute;
      display: block;
      width: ${stretchInfo.arrowSize};
      height: ${stretchInfo.arrowSize};
      border-top: 2px solid var(--wp--preset--color--accent-2);
      border-right: 2px solid var(--wp--preset--color--accent-2);
      top: 50%;
      left: 90%;
      transform: translate(-50%, -50%) rotate(var(--stretch-arrow-rotate,${rotate}));
      transition: transform 0.25s ease;
    }
  `;
};
