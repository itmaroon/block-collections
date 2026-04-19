<?php

/**
 * Plugin Name:       Block Collections
 * Description:       A plug-in collects multiple blocks of small-scale user interface functionality.
 * Requires at least: 6.4
 * Requires PHP:      8.2.10
 * Version:           1.7.3
 * Author:            Web Creator ITmaroon
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       block-collections
 * Domain Path:       /languages
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

//PHPファイルに対する直接アクセスを禁止
if (!defined('ABSPATH')) exit;

// プラグイン情報取得に必要なファイルを読み込む
if (!function_exists('get_plugin_data')) {
	require_once(ABSPATH . 'wp-admin/includes/plugin.php');
}

require_once __DIR__ . '/vendor/itmar/loader-package/src/register_autoloader.php';

$block_entry = new \Itmar\BlockClassPackage\ItmarEntryClass();


//ブロックの初期登録
add_action('init', function () use ($block_entry) {
	$plugin_data = get_plugin_data(__FILE__);
	$block_entry->block_init($plugin_data['TextDomain'], __FILE__);
}, 1); //このプラグインは優先実行

//独自プラグイン等のエンキュー
function itmar_highlight_scripts_and_styles()
{
	$dir = dirname(__FILE__);

	//Code-Prettify の JavaScript ファイルの読み込み（エンキュー）
	wp_enqueue_script(
		'code-prettify',
		plugins_url('/code-prettify/prettify.js', __FILE__),
		array(),
		filemtime("$dir/code-prettify/prettify.js"),
		true
	);

	//CSS 用言語ハンドラーの JavaScript ファイルの読み込み（エンキュー）
	wp_enqueue_script(
		'code-prettify-css-lang',
		plugins_url('/code-prettify/lang-css.js', __FILE__),
		array('code-prettify'),
		filemtime("$dir/code-prettify/lang-css.js"),
		true
	);

	//Code-Prettify の基本スタイルの読み込み（エンキュー）
	wp_enqueue_style(
		'code-prettify-style',
		plugins_url('/code-prettify/prettify.css', __FILE__),
		array(),
		filemtime("$dir/code-prettify/prettify.css")
	);


	// コアブロックカスタマイズスクリプトの翻訳をセット
	wp_set_script_translations('itmar-gutenberg-extensions-script', 'block-collections', plugin_dir_path(__FILE__) . 'languages');

	//管理画面以外（フロントエンド側でのみ読み込む）
	if (!is_admin()) {
		//PR.prettyPrint() を実行する JavaScript ファイルの読み込み（エンキュー）
		wp_enqueue_script(
			'code-prettify-init',
			plugins_url('/code-prettify/init-prettify.js', __FILE__),
			array('code-prettify'),
			filemtime("$dir/code-prettify/init-prettify.js"),
			true
		);

		//jsで使えるようにhome_urlをローカライズ
		$current_url = (is_ssl() ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
		wp_localize_script('code-prettify-init', 'itmar_block_option', array(
			'home_url' => home_url(),
			'login_url' => wp_login_url($current_url),
			'logout_url' => wp_logout_url(home_url()),
			'logout_base_url' => wp_logout_url($current_url),
			'logout_custom_url' => wp_logout_url(),
		));
	}
}
add_action('enqueue_block_assets', 'itmar_highlight_scripts_and_styles');

//コアブロックの高階コンポーネントのエンキューはこのフックで行う
add_action('enqueue_block_editor_assets', function () {
	$dir = plugin_dir_path(__FILE__);

	wp_enqueue_script(
		'itmar-gutenberg-extensions-script',
		plugins_url('build/gutenberg-ex.js', __FILE__),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-editor',
			'wp-plugins',
			'wp-edit-post',
			'wp-compose'
		),
		filemtime("$dir/build/gutenberg-ex.js"),
		true
	);
});


//Googleフォント,FontAwesomeの読み込み
function itmar_block_collections_font_init()
{
	wp_enqueue_style('itmar_google_fonts', 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&family=Texturina:wght@300;400;500;600&display=swap', array(), null);

	wp_enqueue_style('font-awesome', plugins_url('/assets/css/fontawesome.css', __FILE__), array(), '6.5.0');
	wp_enqueue_style('awesome-brands', plugins_url('/assets/css/brands.css', __FILE__), array(), '6.5.0');
	wp_enqueue_style('awesome-solid', plugins_url('/assets/css/solid.css', __FILE__), array(), '6.5.0');
}
add_action('enqueue_block_assets', 'itmar_block_collections_font_init');

//ユーザー情報取得のためのカスタムエンドポイント
add_action('rest_api_init', function () {
	register_rest_route('itmar/v1', '/current-user', [
		'methods'  => 'GET',
		'callback' => 'itmar_get_current_user_info',
		'permission_callback' => '__return_true', // ログイン不要
	]);

	register_rest_route('itmar/v1', '/save-calendar-key', [
		'methods'  => 'POST',
		'callback' => 'itmar_save_calendar_key',
		'permission_callback' => function () {
			// 'manage_options' 権限（通常は管理者）を持っているかチェック
			return current_user_can('manage_options');
		},
	]);

	register_rest_route('itmar/v1', '/get-holidays', [
		'methods'  => 'GET',
		'callback' => 'itmar_get_holidays',
		'permission_callback' => '__return_true', // ログイン不要
	]);
});

//カレントユーザーの情報取得
function itmar_get_current_user_info()
{
	$user = wp_get_current_user();

	if ($user && $user->exists()) {
		return [
			'is_logged_in'  => true,
			'user_login'    => $user->user_login,
			'display_name'  => $user->display_name,
			'user_email'    => $user->user_email,
			'avatar_url'    => get_avatar_url($user->ID),
		];
	} else {
		return [
			'is_logged_in'  => false,
			'avatar_url'    => get_avatar_url(0), // デフォルトの匿名アバター
		];
	}
}
//カレンダーAPIの保存
function itmar_save_calendar_key(WP_REST_Request $request)
{
	// JSONパラメータを取得
	$params = $request->get_json_params();

	// 1. パラメータが空、またはキーが含まれていない場合のバリデーション
	if (empty($params) || !isset($params['calendar_api_key'])) {
		return new WP_Error(
			'rest_invalid_param',
			'カレンダーAPIキーが指定されていません。',
			array('status' => 400) // Bad Request
		);
	}

	$api_key = sanitize_text_field($params['calendar_api_key']);

	// 2. キーが空文字の場合のチェック（必要に応じて）
	if ($api_key === '') {
		return new WP_Error(
			'rest_empty_key',
			'APIキーを空にすることはできません。',
			array('status' => 400)
		);
	}

	// 3. 保存処理
	$updated = update_option('itmar_calendar_api_key', $api_key);

	// update_option は「値が以前と同じ」だと false を返しますが、
	// ここでは「リクエストが正しく処理されたこと」を成功として返します
	return new WP_REST_Response(
		array(
			'success' => true,
			'message' => 'APIキーを保存しました。',
			'key'     => $api_key // 確認用に返す（任意）
		),
		200 // OK
	);
}

//祝日情報の取得
function itmar_get_holidays(WP_REST_Request $request)
{
	$month = $request->get_param('month'); // YYYY-MM
	$api_key = get_option('itmar_calendar_api_key');

	// 1. 開始日時 (月の1日 00:00:00)
	$timeMin = $month . "-01T00:00:00Z";

	// 2. 終了日時 (その月の末日 23:59:59)
	// date("t") はその月の日数を返します
	$last_day = date("t", strtotime($month . "-01"));
	$timeMax = $month . "-" . $last_day . "T23:59:59Z";

	$calendar_id = 'ja.japanese#holiday@group.v.calendar.google.com';

	// 正しいエンドポイントの形: /calendars/{ID}/events
	$url = "https://www.googleapis.com/calendar/v3/calendars/" . urlencode($calendar_id) . "/events";
	$url = add_query_arg([
		'key'          => $api_key,
		'timeMin'      => $timeMin,
		'timeMax'      => $timeMax,
		'singleEvents' => 'true',
		'orderBy'      => 'startTime',
	], $url);

	$args = [
		'timeout' => 15,
		'headers' => [
			'Referer' => get_site_url(), // JS版と同じドメインからのリクエストに見せかける
			'Accept'  => 'application/json',
		],
	];

	$response = wp_remote_get($url, $args);

	if (is_wp_error($response)) return [];

	$status_code = wp_remote_retrieve_response_code($response);
	$body = wp_remote_retrieve_body($response);

	if ($status_code !== 200) {
		// ここでエラー内容をログに出せば、404の本当の理由（JSONメッセージ）が分かります
		error_log("Google API Error: " . $body);
		return [];
	}

	$data = json_decode($body, true);

	// 4. JS版の map 処理を再現
	$holidays = [];
	if (!empty($data['items'])) {
		foreach ($data['items'] as $event) {
			$holidays[] = [
				'date' => $event['start']['date'] ?? '',
				'name' => $event['summary'] ?? '',
			];
		}
	}

	return $holidays;
}
