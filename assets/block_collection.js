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
jQuery(function ($) {

  //矢印かセレクトボックスを押したとき
  $(document).on('click', '.itmar_block_select > div', function (e) {
    $(this).parent().toggleClass('open');
  });

  //セレクトボックスからマウスが外れた時
  $(document).on('mouseleave', '.itmar_block_select', function (e) {
    $(this).removeClass('open');
  });

  //select要素のオプションクリック時(複数選択)
  $(document).on('click', '.itmar_block_select ul li', function (e) {

    let select = $(this).parent().parent();
    let li = $(this);
    let slug = li.data('value');
    let kind = li.attr('class');

    if (!select.hasClass('clicked')) {
      select.addClass('clicked');
      li.prev().addClass('beforeRemove');
      li.next().addClass('afterRemove');
      li.addClass('remove');
      let a = $('<a data-value="' + slug + '"/>').addClass('notShown').html('<em class="' + kind + '">' + li.text() + '</em><i></i>').hide().appendTo(select.children('div'));
      a.slideDown(400, function () {
        setTimeout(function () {
          a.addClass('shown');
          select.children('div').children('span').addClass('hide');
          let option_slug = select.find('option[value="' + slug + '"]');
          option_slug.each(function () {
            $(this).prop('selected', true).change();
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
  });

  //選択済みの要素を押したとき
  $(document).on('click', '.itmar_block_select > div a', function (event) {
    // イベント伝播を停止
    event.stopPropagation();

    let select = $(this).parent().parent();
    let self = $(this);
    let slug = self.data('value');
    let kind = self.find('em').attr('class');

    self.removeClass().addClass('remove');
    select.addClass('open');
    setTimeout(function () {
      self.addClass('disappear');
      setTimeout(function () {
        self.animate({
          width: 0,
          height: 0,
          padding: 0,
          margin: 0
        }, 300, function () {

          let li = $('<li data-value="' + slug + '"/>').text(self.children('em').text()).addClass('notShown').appendTo(select.find('ul'));

          li.slideDown(400, function () {
            li.addClass('show');
            setTimeout(function () {
              select.find('option[value="' + slug + '"]').prop('selected', false).change();

              if (!select.find('option:selected').length) {
                select.children('div').children('span').removeClass('hide');
              }
              li.removeClass();
              li.addClass(kind);
            }, 400);
          });
          self.remove();
        })
      }, 300);
    }, 400);
  });
});