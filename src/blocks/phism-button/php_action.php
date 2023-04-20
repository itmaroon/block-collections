<?php
add_action('rest_api_init', function () {
  register_rest_route('itmar/phism-button', '/my-function/', array(
    'methods' => 'GET',
    'callback' => 'my_function',
  ));
});

function my_function($request)
{
  // 関数の処理をここに記述する
  return 'Hello, world!';
}
