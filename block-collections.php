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
function create_block_block_collections_block_init() {
	foreach ( glob( plugin_dir_path( __FILE__ ) . 'build/blocks/*' ) as $block ) {
		if ( file_exists( $block . '/index.php' ) ) {
			// Dynamic block
			require_once( $block . '/index.php' );

			register_block_type(
					$block,
					array(
							'render_callback' => 'itmar_render_callback_' . str_replace( '-', '_', basename( $block ) ),
					)
			);

		} else {
				// Static block
				register_block_type( $block );
		}
	}
}
add_action( 'init', 'create_block_block_collections_block_init' );
