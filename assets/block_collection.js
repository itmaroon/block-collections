const { __, _x, _n, _nx } = wp.i18n;
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
        ctrlMsg(__("copied", 'itmar_block_collections'));
      }, (err) => {
        console.error('Could not copy text: ', err);
      });
    });
  });
});

/* ------------------------------
design-selectイベントハンドラ
------------------------------ */
//select要素のオプションクリック時(複数選択)
window.multi_select_option_click = (click_elm) => {
  let target_elm = jQuery(click_elm);
  let select = target_elm.parent().parent();
  let li = target_elm;
  let slug = li.data('value');
  let kind = li.attr('class');

  if (!select.hasClass('clicked')) {
    select.addClass('clicked');
    li.prev().addClass('beforeRemove');
    li.next().addClass('afterRemove');
    li.addClass('remove');
    let a = jQuery('<a data-value="' + slug + '"/>').addClass('notShown').html('<em class="' + kind + '">' + li.text() + '</em><i></i>').hide().appendTo(select.children('div'));
    a.slideDown(400, function () {
      setTimeout(function () {
        a.addClass('shown');
        select.children('div').children('span').addClass('hide');
        let option_slug = select.find('option[value="' + slug + '"]');
        option_slug.each(function () {
          if (jQuery(this).hasClass(kind))
            jQuery(this).prop('selected', true).change();
        });
      }, 500);
    });
    setTimeout(function () {
      if (li.prev().is(':last-child')) {
        li.prev().removeClass('beforeRemove');
      }
      if (li.next().is(':first-child')) {
        li.next().removeClass('afterRemove');
      }
      setTimeout(function () {
        li.prev().removeClass('beforeRemove');
        li.next().removeClass('afterRemove');
      }, 200);
      li.slideUp(400, function () {
        li.remove();
        select.removeClass('clicked');
      });
    }, 600);
  }
}