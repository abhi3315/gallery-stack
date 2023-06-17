<?php
/**
 * Plugin Name:             Browserstack Gallery
 * Plugin URI:              https://github.com/abhi3315/browserstack-gallery/
 * Description:             A assignment plugin for Browserstack.
 * Version:                 1.0.0
 * Requires at least:       4.9
 * Tested up to:            6.2
 * PHP Version:             7.4
 * Author:                  Abhishek Sharma
 * Author URI:              https://github.com/abhi3315/
 * License:                 GPL v3 or later
 * License URI:             https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:             browserstack-gallery
 *
 * @category WordPress_Plugin
 * @package  Browserstack_Gallery
 * @author   Abhishek Sharma <abhishek3.dev@gmail.com>
 * @license  https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 * @version  GIT: 1.0.0
 * @link     https://github.com/abhi3315/browserstack-gallery/
 **/

defined( 'ABSPATH' ) || exit;

// Define plugin constants.
function_exists( 'get_plugin_data' ) || require_once ABSPATH . 'wp-admin/includes/plugin.php';
define( 'BROWSERSTACK_GALLERY_METADATA', get_plugin_data( __FILE__, false, false ) );

define( 'BROWSERSTACK_GALLERY_BASENAME', plugin_basename( __FILE__ ) );
define( 'BROWSERSTACK_GALLERY_PATH', plugin_dir_path( __FILE__ ) );
define( 'BROWSERSTACK_GALLERY_URL', plugin_dir_url( __FILE__ ) );

// Load the autoloader.
if ( ! is_file( BROWSERSTACK_GALLERY_PATH . '/vendor/autoload.php' ) ) {
	add_action(
		'admin_notices',
		static function () {
			$message      = __( 'It seems like <strong>Browserstack Gallery</strong> is corrupted. Please reinstall!', 'browserstack-gallery' );
			$html_message = wp_sprintf( '<div class="error notice wpcomsp-scaffold-error">%s</div>', wpautop( $message ) );
			echo wp_kses_post( $html_message );
		}
	);
	return;
}
require_once BROWSERSTACK_GALLERY_PATH . '/vendor/autoload.php';

// Load the plugin.
add_action(
	'plugins_loaded',
	static function () {
		// Load the plugin.
		$plugin = Browserstack_Gallery\Plugin::get_instance();
		$plugin->init();
	}
);
