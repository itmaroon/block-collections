
/* ------------------------------
メッセージ表示関数
------------------------------ */
function ctrlMsg(dispMsg) {
  jQuery("body").append("<div id='result_msg' >" + dispMsg + "</div>");
  jQuery("#result_msg").slideDown(300, function () {
    setTimeout(function () {
      jQuery("#result_msg").slideUp(300, function () {
        jQuery(this).remove();
      })
    }, 2000);
  })
}

document.addEventListener('DOMContentLoaded', (event) => {
  // ページがロードされたときに"Copy"ボタンにイベントリスナーを追加
  document.querySelectorAll('.wp-block-itmar-code-highlight button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const codeBlock = event.target.previousElementSibling;
      const code = codeBlock.innerText;

      navigator.clipboard.writeText(code).then(() => {
        ctrlMsg("コピーしました");
      }, (err) => {
        console.error('Could not copy text: ', err);
      });
    });
  });
});