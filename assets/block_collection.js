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


jQuery(function ($) {
  /* ------------------------------
  design-text-ctrl
  ------------------------------ */
  let input_elm = $('.wp-block-itmar-design-text-ctrl.is-style-line').find('input, textarea');
  input_elm.change(function () {
    let content = $(this).val();
    if (content) {
      $(this).removeClass('empty');
    } else {
      $(this).addClass('empty');
    }
  })


  /* ------------------------------
  design-selectイベントハンドラ
  ------------------------------ */
  //矢印かセレクトボックスを押したとき
  $(document).on('click', '.itmar_block_select > div', function (e) {
    $(this).parent().toggleClass('open');
  });

  //セレクトボックスからマウスが外れた時
  $(document).on('mouseleave', '.itmar_block_select', function (e) {
    $(this).removeClass('open');
  });

  //select要素のオプションクリック時(複数選択)
  $(document).on('click', '.itmar_block_selectMultiple ul li', function (e) {
    let select = $(this).parent().parent();
    let li = $(this);
    let id = li.attr('id');
    let slug = li.data('value');
    let kind = li.attr('class');

    if (!select.hasClass('clicked')) {
      select.addClass('clicked');
      li.addClass('remove');
      //プレイスフォルダを非表示
      select.children('div').children('span').addClass('hide');
      //option要素の選択
      let option_slug = select.find('option[id="' + id + '"]');
      option_slug.each(function () {
        $(this).prop('selected', true).change();
      });
      //選択された要素の生成
      let a = $('<a id="' + id + '" data-value="' + slug + '"/>').addClass('notShown').html('<em class="' + kind + '">' + li.text() + '</em><i></i>').appendTo(select.children('div'));

      setTimeout(function () {
        a.addClass('shown');

      }, 500);
      setTimeout(function () {
        li.slideUp(400, function () {
          $(this).remove();
          select.removeClass('clicked');
        });

      }, 600);
    }
  });

  //select要素のクリック時(単数選択)
  $(document).on('click', '.itmar_block_selectSingle  ul li', function (e) {
    let select = $(this).parent().parent();
    let li = $(this);
    let slug = li.data('value');
    let kind = li.attr('class');
    let id = li.attr('id');
    //プレイスフォルダを非表示
    select.children('div').children('span').addClass('hide');
    //option要素の選択
    select.find('option[id="' + id + '"]').prop('selected', true).change();
    //選択された要素の生成
    let a = $('<a id="' + id + '" data-value="' + slug + '"/>').addClass('notShown').html('<em class="' + kind + '">' + li.text() + '</em><i></i>').hide();
    //選択済みのアイテム
    let selItem = $('.itmar_block_selectSingle > div a');
    if (selItem.length != 0) {
      selItem.removeClass().addClass('remove');
      setTimeout(function () {
        selItem.addClass('disappear');//選択済みがあればそれを消す
        selItem.animate({
          width: 0,
          height: 0,
          padding: 0,
          margin: 0
        }, 300, function () {
          a.appendTo(select.children('div'));//新しい要素をセット
          a.slideDown(400, function () {
            //選択肢を表示
            setTimeout(function () {
              a.addClass('shown');
            }, 500);
          });
        });
        selItem.remove();
      }, 400);
    } else {
      a.appendTo(select.children('div'));//新しい要素をセット
      a.slideDown(400, function () {
        //選択肢を表示
        setTimeout(function () {
          a.addClass('shown');
        }, 500);
      });
    }



    //プルダウンを消す
    select.removeClass('open');

    //ul要素内は一旦空にする
    select.find('ul').empty();

    //li要素の付け直し
    select.find('option:not(:selected)').each(function () {
      $('<li id="' + $(this).attr('id') + '" class="' + $(this).attr('class') + '" data-value="' + $(this).val() + '"/>').text($(this).text()).appendTo(select.find('ul'));
    })
  });

  //select要素の選択済み要素を押したとき
  $(document).on('click', '.itmar_block_selectMultiple > div a', function (event) {
    // イベント伝播を停止
    event.stopPropagation();

    let select = $(this).parent().parent();
    let self = $(this);
    let id = self.attr('id');
    let slug = self.data('value');
    let kind = self.find('em').attr('class');

    self.removeClass().addClass('remove');
    select.addClass('open');
    //ul要素内は一旦空にする
    select.find('ul').empty();
    //選択の解除
    select.find('option[id="' + id + '"]').prop('selected', false).change();

    //選択解除されたli要素
    let liInSelect;
    //li要素の付け直し
    select.find('option:not(:selected)').each(function () {
      if ($(this).attr('id') === id) {//選択解除されたオプションであるかどうか
        //アニメーションの対象として確保
        liInSelect = $('<li id="' + $(this).attr('id') + '" data-value="' + $(this).val() + '"/>').text($(this).text()).addClass('notShown').appendTo(select.find('ul'));

      } else {
        $('<li id="' + $(this).attr('id') + '" class="' + $(this).attr('class') + '" data-value="' + $(this).val() + '"/>').text($(this).text()).appendTo(select.find('ul'));
      }
    })
    setTimeout(function () {
      self.addClass('disappear');
      setTimeout(function () {
        self.animate({
          width: 0,
          height: 0,
          padding: 0,
          margin: 0
        }, 300, function () {

          //アニメーションのスタート
          liInSelect.slideDown(400, function () {
            liInSelect.addClass('show');
            setTimeout(function () {
              if (!select.find('option:selected').length) {
                select.children('div').children('span').removeClass('hide');
              }
              liInSelect.removeClass();
              liInSelect.addClass(kind);
            }, 400);
          });
          self.remove();
        })
      }, 300);
    }, 400);
  });
});