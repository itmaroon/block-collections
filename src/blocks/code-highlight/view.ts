import { __ } from "@wordpress/i18n";
/* ------------------------------
メッセージ表示関数
------------------------------ */
function ctrlMsg(dispMsg: string) {
	jQuery("body").append("<div id='result_msg' >" + dispMsg + "</div>");
	jQuery("#result_msg").slideDown(300, function () {
		setTimeout(function () {
			jQuery("#result_msg").slideUp(300, function () {
				jQuery(this).remove();
			});
		}, 2000);
	});
}

document.addEventListener("DOMContentLoaded", () => {
	// ページがロードされたときに"Copy"ボタンにイベントリスナーを追加
	document
		.querySelectorAll(".wp-block-itmar-code-highlight button")
		.forEach((button) => {
			button.addEventListener("click", (event) => {
				const target = event.currentTarget;
				if (!(target instanceof HTMLElement)) return;
				const codeBlock = target.previousElementSibling;
				if (!(codeBlock instanceof HTMLElement)) return;
				const code = codeBlock.innerText;

				navigator.clipboard.writeText(code).then(
					() => {
						ctrlMsg(__("copied", "block-collections"));
					},
					(err) => {
						console.error("Could not copy text: ", err);
					},
				);
			});
		});
});
