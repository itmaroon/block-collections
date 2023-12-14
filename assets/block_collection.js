/* ------------------------------
Loading イメージ表示関数
引数： msg 画面に表示する文言
------------------------------ */
function dispLoading(msg, target) {
  // 引数なし（メッセージなし）を許容
  if (msg == undefined) {
    msg = "";
  }
  // 画面表示メッセージ
  let dispMsg = "<div class='loadingMsg'><div class='loading_icon'></div><p>" + msg + "</p></div>";
  // ローディング画像が表示されていない場合のみ出力
  if (target == undefined) {//ターゲット指定がないときはbodyにつける
    target = jQuery("body");
    if (target.find(".loading").length == 0) {
      target.append("<div class='loading body'>" + dispMsg + "</div>");
    }
  } else {
    if (target.find(".loading").length == 0) {
      target.append("<div class='loading'>" + dispMsg + "</div>");
    }
  }
}

/* ------------------------------
Loading イメージ削除関数
------------------------------ */
function removeLoading(dispMsg, target) {
  if (target == undefined) {//ターゲット指定がないときはbodyにつける
    target = jQuery("body");
  }
  target.find(".loading").fadeOut(300, function () {
    jQuery(this).remove();
    if (dispMsg != undefined && dispMsg.length > 0) {
      // 引数ありのとき
      jQuery("body").append("<div id='result_msg' >" + dispMsg + "</div>");
      jQuery("#result_msg").slideDown(300, function () {
        setTimeout(function () {
          jQuery("#result_msg").slideUp(300, function () {
            jQuery(this).remove();
          })
        }, 2000);
      })
    }
  });
}

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
        const { __ } = wp.i18n;
        ctrlMsg(__("copied", 'itmar_block_collections'));
      }, (err) => {
        console.error('Could not copy text: ', err);
      });
    });
  });
});


jQuery(function ($) {
  /* ------------------------------
 design-titleのためのサイトタイトル・キャッチフレーズの読込
 ------------------------------ */
  $(document).ready(function () {
    if ($('.itmar_site_title').length || $('.itmar_catch_title').length) {
      // '.itmar_site_title' クラスを持つ要素が読み込まれたときの処理
      fetch('/wp-json')
        .then(response => response.json())
        .then(data => {
          $('.itmar_site_title').text(data.name);
          $('.itmar_catch_title').text(data.description);
        });
    }
  });


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

  $('.wp-block-itmar-design-text-ctrl textarea').on('input', function () {
    $(this).css('height', 'auto');
    //テキストエリアの高さ更新
    let scrollHeight = $(this).get(0).scrollHeight;
    //textareaの高さに入力内容の高さを設定
    $(this).css('height', scrollHeight + 'px');
  });

  /* ------------------------------
  design-buttonイベントハンドラ
  ------------------------------ */
  $(document).on('click', '.itmar_design_button', function (e) {
    let redirectUrl = $(this).data('selected_page');
    //リダイレクト
    window.location.href = redirectUrl;
  });
  /* ------------------------------
  design-groupのハンバーガー
  ------------------------------ */
  $(document).on('click', '.itmar_hamberger_btn, .itmar_back_ground ', function (e) {
    $(this).toggleClass("open");
    $(this).siblings("div").toggleClass("open");
  });

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

    //選択済みのアイテム
    let selItem = $('.itmar_block_selectSingle > div a');
    let a = null;
    //option要素の選択
    if (typeof id === 'undefined' || id === 'undefined') {
      // idがundefinedまたはnullの場合、全てのoptionを選択解除
      select.find('option').prop('selected', false).change();
      select.children('div').children('span').removeClass('hide');
    } else {
      //プレイスフォルダを非表示
      select.children('div').children('span').addClass('hide');
      // idが定義されている場合、特定のoptionを選択
      select.find('option[id="' + id + '"]').prop('selected', true).change();
      //選択された要素の生成
      a = $('<a id="' + id + '" data-value="' + slug + '"/>').addClass('notShown').html('<em class="' + kind + '">' + li.text() + '</em><i></i>').hide();
    }



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
          if (a !== null) {
            a.appendTo(select.children('div'));//新しい要素をセット
            a.slideDown(400, function () {
              //選択肢を表示
              setTimeout(function () {
                a.addClass('shown');
              }, 200);
            });
          }
        });
        selItem.remove();
      }, 400);
    } else {
      if (a !== null) {
        a.appendTo(select.children('div'));//新しい要素をセット
        a.slideDown(400, function () {
          //選択肢を表示
          setTimeout(function () {
            a.addClass('shown');
          }, 200);
        });
      }

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