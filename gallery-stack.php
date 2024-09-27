<?php
/**
 * Plugin Name:             Gallery Stack
 * Plugin URI:              https://github.com/abhi3315/gallery-stack/
 * Description:             A simple WordPress plugin to display and manage images in a gallery stack.
 * Version:                 1.0.0
 * Requires at least:       4.9
 * Tested up to:            6.2
 * PHP Version:             7.0
 * Author:                  Abhishek Sharma
 * Author URI:              https://github.com/abhi3315/
 * License:                 GPL v2 or later
 * License URI:             https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:             gallery-stack
 *
 * @category WordPress_Plugin
 * @package  Gallery_Stack
 * @author   Abhishek Sharma <abhishek3.dev@gmail.com>
 * @license  https://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 * @version  GIT: 1.0.0
 * @link     https://github.com/abhi3315/gallery-stack/
 **/

defined( 'ABSPATH' ) || exit;

// Define plugin constants.
function_exists( 'get_plugin_data' ) || require_once ABSPATH . 'wp-admin/includes/plugin.php';
define( 'GALLERY_STACK_METADATA', get_plugin_data( __FILE__, false, false ) );

define( 'GALLERY_STACK_BASENAME', plugin_basename( __FILE__ ) );
define( 'GALLERY_STACK_PATH', plugin_dir_path( __FILE__ ) );
define( 'GALLERY_STACK_URL', plugin_dir_url( __FILE__ ) );

// Load the autoloader.
if ( ! is_file( GALLERY_STACK_PATH . '/vendor/autoload.php' ) ) {
	add_action(
		'admin_notices',
		static function () {
			$message      = __( 'It seems like <strong>Gallery Stack</strong> is corrupted. Please reinstall!', 'gallery-stack' );
			$html_message = wp_sprintf( '<div class="error notice wpcomsp-scaffold-error">%s</div>', wpautop( $message ) );
			echo wp_kses_post( $html_message );
		}
	);
	return;
}
require_once GALLERY_STACK_PATH . '/vendor/autoload.php';

// Load the plugin.
add_action(
	'plugins_loaded',
	static function () {
		// Load the plugin.
		$plugin = Gallery_Stack\Plugin::get_instance();
		$plugin->init();
	}
);
