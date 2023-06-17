<?php
/**
 * File to enqueue assets.
 *
 * @package Browserstack_Gallery
 */

namespace Browserstack_Gallery;

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
		wp_enqueue_script(
			'browserstack-gallery-frontend',
			BROWSERSTACK_GALLERY_URL . 'build/assets/main.js',
			[],
			BROWSERSTACK_GALLERY_METADATA['Version'],
			true
		);
	}

	/**
	 * Enqueue admin assets.
	 */
	public function enqueue_admin_assets() {
		// Enqueue admin assets only on custom settings page.
		if ( 'toplevel_page_browserstack-gallery' !== get_current_screen()->id ) {
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
		wp_enqueue_script(
			'browserstack-gallery-admin',
			BROWSERSTACK_GALLERY_URL . 'build/assets/admin.js',
			[],
			BROWSERSTACK_GALLERY_METADATA['Version'],
			true
		);
	}
}
