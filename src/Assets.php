<?php
/**
 * File to enqueue assets.
 *
 * @package Browserstack_Gallery
 */

namespace Browserstack_Gallery;

use Browserstack_Gallery\Settings;

/**
 * Assets class.
 */
class Assets {

	/**
	 * Get instance.
	 *
	 * @return Assets
	 */
	public static function get_instance() {
		static $instance = null;

		if ( null === $instance ) {
			$instance = new self();
		}

		return $instance;
	}

	/**
	 * Initialize the class.
	 */
	public function init() {
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_frontend_assets' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_assets' ) );
	}

	/**
	 * Enqueue frontend assets.
	 */
	public function enqueue_frontend_assets() {
		// Enqueue frontend styles.
		wp_enqueue_style(
			'browserstack-gallery-frontend',
			BROWSERSTACK_GALLERY_URL . 'build/assets/main.css',
			array(),
			BROWSERSTACK_GALLERY_METADATA['Version']
		);

		// Enqueue frontend scripts.
		$frontend_dependencies = include BROWSERSTACK_GALLERY_PATH . 'build/assets/main.asset.php';
		wp_enqueue_script(
			'browserstack-gallery-frontend',
			BROWSERSTACK_GALLERY_URL . 'build/assets/main.js',
			$frontend_dependencies['dependencies'],
			BROWSERSTACK_GALLERY_METADATA['Version'],
			true
		);
	}

	/**
	 * Enqueue admin assets.
	 */
	public function enqueue_admin_assets() {
		// Enqueue admin assets only on custom settings page.
		$setting_top_level_page = 'toplevel_page_' . Settings::$menu_slug;
		if ( get_current_screen()->id !== $setting_top_level_page ) {
			return;
		}

		// Enqueue admin styles.
		wp_enqueue_style(
			'browserstack-gallery-admin',
			BROWSERSTACK_GALLERY_URL . 'build/assets/admin.css',
			array(),
			BROWSERSTACK_GALLERY_METADATA['Version']
		);

		// Enqueue admin scripts.
		$admin_dependencies = include BROWSERSTACK_GALLERY_PATH . 'build/assets/admin.asset.php';
		wp_enqueue_script(
			'browserstack-gallery-admin',
			BROWSERSTACK_GALLERY_URL . 'build/assets/admin.js',
			$admin_dependencies['dependencies'],
			BROWSERSTACK_GALLERY_METADATA['Version'],
			true
		);
	}
}
