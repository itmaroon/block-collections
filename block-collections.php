<?php

/**
 * Plugin Name:       Block Collections
 * Description:       複数のブロックを集めたプラグインです。
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            WebクリエイターITmaroon
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       block-location
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function itmar_block_collections_block_init()
{
	foreach (glob(plugin_dir_path(__FILE__) . 'build/blocks/*') as $block) {
		if (file_exists($block . '/index.php')) {
			// Dynamic block
			require_once($block . '/index.php');

			register_block_type(
				$block,
				array(
					'render_callback' => 'itmar_render_callback_' . str_replace('-', '_', basename($block)),
				)
			);
		} else {
			// Static block
			register_block_type($block);
		}
	}
}
add_action('init', 'itmar_block_collections_block_init');

function add_itmar_highlight_scripts_and_styles()
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
	}
	//Code-Prettify の基本スタイルの読み込み（エンキュー）
	wp_enqueue_style(
		'code-prettify-style',
		plugins_url('/code-prettify/prettify.css', __FILE__),
		array(),
		filemtime("$dir/code-prettify/prettify.css")
	);
}
add_action('enqueue_block_assets', 'add_itmar_highlight_scripts_and_styles');

//カラーパレットの設定
function itmar_block_collections_colorsuport_init()
{
	add_theme_support(
		'editor-color-palette',
		array(
			array(
				'name' => __('Custom Color 1', 'text-domain'),
				'slug' => 'custom-color-1',
				'color' => '#00ff00',
			),
			array(
				'name' => __('Custom Color 2', 'text-domain'),
				'slug' => 'custom-color-2',
				'color' => '#0000ff',
			),
		)
	);
}

add_action('plugins_loaded', 'itmar_block_collections_colorsuport_init');

//Googleフォントの読み込み
function itmar_block_collections_font_init()
{
	wp_enqueue_style('itmar_google_fonts', 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&family=Texturina:wght@300;400;500;600&display=swap', array(), null);
}
add_action('enqueue_block_assets', 'itmar_block_collections_font_init');
