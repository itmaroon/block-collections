<?php

/**
 * Plugin Name:       Block Collections
 * Description:       A plug-in collects multiple blocks of small-scale user interface functionality.
 * Requires at least: 6.3
 * Requires PHP:      8.2.10
 * Version:           1.4.5
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

//composerによるリモートリポジトリからの読み込みを要求
require_once __DIR__ . '/vendor/autoload.php';

$block_entry = new \Itmar\BlockClassPakage\ItmarEntryClass();

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

	//コアブロックカスタマイズスクリプトのエンキュー
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
		filemtime("$dir/build/gutenberg-ex.js")
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
		//独自jsのエンキュー
		$script_path = plugin_dir_path(__FILE__) . 'build/block_collection.js';
		wp_enqueue_script(
			'itmar_block_collection_js',
			plugins_url('build/block_collection.js', __FILE__),
			array('jquery', 'wp-i18n'),
			filemtime($script_path),
			true
		);
		//jsで使えるようにhome_urlをローカライズ
		wp_localize_script('itmar_block_collection_js', 'itmar_block_option', array(
			'home_url' => home_url()
		));


		// スクリプトの翻訳をセット
		wp_set_script_translations('itmar_block_collection_js', 'block-collections', plugin_dir_path(__FILE__) . 'languages');
	}
}
add_action('enqueue_block_assets', 'itmar_highlight_scripts_and_styles');

//Googleフォント,FontAwesomeの読み込み
function itmar_block_collections_font_init()
{
	wp_enqueue_style('itmar_google_fonts', 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&family=Texturina:wght@300;400;500;600&display=swap', array(), null);

	wp_enqueue_style('font-awesome', plugins_url('/assets/css/fontawesome.css', __FILE__), array(), null);
	wp_enqueue_style('awesome-brands', plugins_url('/assets/css/brands.css', __FILE__), array(), null);
	wp_enqueue_style('awesome-solid', plugins_url('/assets/css/solid.css', __FILE__), array(), null);
}
add_action('enqueue_block_assets', 'itmar_block_collections_font_init');
