<?php

/**
 * Plugin Name:       Block Collections
 * Description:       A plug-in collects multiple blocks of small-scale user interface functionality.
 * Requires at least: 5.8
 * Requires PHP:      7.4
 * Version:           1.0.0
 * Author:            Web Creator ITmaroon
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       itmar_block_collections
 * Domain Path:  			/languages
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
	//ブロックの登録
	foreach (glob(plugin_dir_path(__FILE__) . 'build/blocks/*') as $block) {
		$block_name = basename($block);
		$script_handle = 'itmar-handle-' . $block_name;
		// スクリプトの登録
		wp_register_script(
			$script_handle,
			plugins_url( 'build/blocks/'.$block_name.'/index.js', __FILE__ ),
			array( 'wp-blocks', 'wp-element', 'wp-i18n', 'wp-block-editor' )
		);
		
		// ブロックの登録
		register_block_type(
			$block,
			array(
				'editor_script' => $script_handle
			)
		);
		
		// その後、このハンドルを使用してスクリプトの翻訳をセット
		wp_set_script_translations( $script_handle, 'itmar_block_collections', plugin_dir_path( __FILE__ ) . 'languages' );
		
	}

	//PHP用のテキストドメインの読込（国際化）
	load_plugin_textdomain( 'itmar_block_collections', false, basename( dirname( __FILE__ ) ) . '/languages' );
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

	//Code-Prettify の基本スタイルの読み込み（エンキュー）
	wp_enqueue_style(
		'code-prettify-style',
		plugins_url('/code-prettify/prettify.css', __FILE__),
		array(),
		filemtime("$dir/code-prettify/prettify.css")
	);

	/** jsで使えるようにテンプレートパスとホームURLをローカライズ**/
	$plugin_path_arr = array(
		'plugin_uri' => $dir
	);
	wp_localize_script( 'code-prettify', 'plugin_path', $plugin_path_arr );


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
		$script_path = plugin_dir_path(__FILE__) . 'assets/block_collection.js';
		wp_enqueue_script(
			'itmar_block_collection_js',
			plugins_url('/assets/block_collection.js', __FILE__),
			array('jquery','wp-i18n'),
			filemtime($script_path),
			true
		);

		// その後、このハンドルを使用してスクリプトの翻訳をセット
		wp_set_script_translations( 'itmar_block_collection_js', 'itmar_block_collections', plugin_dir_path( __FILE__ ) . 'languages' );
	}
	
}
add_action('enqueue_block_assets', 'add_itmar_highlight_scripts_and_styles');

//Googleフォント,FontAwesomeの読み込み
function itmar_block_collections_font_init()
{
	wp_enqueue_style('itmar_google_fonts', 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&family=Texturina:wght@300;400;500;600&display=swap', array(), null);

	wp_enqueue_script( 'font-awesome', 'https://kit.fontawesome.com/3e425ac06b.js',array(),'',true);
	
}
add_action('enqueue_block_assets', 'itmar_block_collections_font_init');

