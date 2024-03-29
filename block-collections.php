<?php

/**
 * Plugin Name:       Block Collections
 * Description:       A plug-in collects multiple blocks of small-scale user interface functionality.
 * Requires at least: 6.3
 * Requires PHP:      8.0.22
 * Version:           1.2.1
 * Author:            Web Creator ITmaroon
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       block-collections
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
if ( ! defined( 'ABSPATH' ) ) exit;

function itmar_block_collections_block_init()
{
	//ブロックの登録
	foreach (glob(plugin_dir_path(__FILE__) . 'build/blocks/*') as $block) {
		$block_name = basename($block);
		$script_handle = 'itmar-handle-' . $block_name;
		$script_file = plugin_dir_path( __FILE__ ) . 'build/blocks/'.$block_name.'/index.js';
		// スクリプトの登録
		wp_register_script(
			$script_handle,
			plugins_url( 'build/blocks/'.$block_name.'/index.js', __FILE__ ),
			array( 'wp-blocks', 'wp-element', 'wp-i18n', 'wp-block-editor' ),
			filemtime($script_file)
		);
		
		// ブロックの登録
		register_block_type(
			$block,
			array(
				'editor_script' => $script_handle
			)
		);
		
		// その後、このハンドルを使用してスクリプトの翻訳をセット
		wp_set_script_translations( $script_handle, 'block-collections', plugin_dir_path( __FILE__ ) . 'languages' );
		//jsで使えるようにhome_urlをローカライズ
		wp_localize_script($script_handle, 'itmar_block_option', array(
			'home_url' => home_url()
		));
		
	}

	//PHP用のテキストドメインの読込（国際化）
	load_plugin_textdomain( 'block-collections', false, basename( dirname( __FILE__ ) ) . '/languages' );
}
add_action('init', 'itmar_block_collections_block_init');

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
		)
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
		//独自jsのエンキュー
		$script_path = plugin_dir_path(__FILE__) . 'assets/block_collection.js';
		wp_enqueue_script(
			'itmar_block_collection_js',
			plugins_url('/assets/block_collection.js', __FILE__),
			array('jquery','wp-i18n'),
			filemtime($script_path),
			true
		);

		//jsで使えるようにhome_urlをローカライズ
		wp_localize_script('itmar_block_collection_js', 'itmar_block_option', array(
			'home_url' => home_url()
		));

		// スクリプトの翻訳をセット
		wp_set_script_translations( 'itmar_block_collection_js', 'block-collections', plugin_dir_path( __FILE__ ) . 'languages' );
	}
	
}
add_action('enqueue_block_assets', 'itmar_highlight_scripts_and_styles');

//Googleフォント,FontAwesomeの読み込み
function itmar_block_collections_font_init()
{
	wp_enqueue_style('itmar_google_fonts', 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&family=Texturina:wght@300;400;500;600&display=swap', array(), null);

	wp_enqueue_style( 'font-awesome', plugins_url('/assets/css/fontawesome.css', __FILE__),array(),null);
	wp_enqueue_style( 'awesome-brands', plugins_url('/assets/css/brands.css', __FILE__),array(),null);
	wp_enqueue_style( 'awesome-solid', plugins_url('/assets/css/solid.css', __FILE__),array(),null);
}
add_action('enqueue_block_assets', 'itmar_block_collections_font_init');





