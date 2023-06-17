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
}
