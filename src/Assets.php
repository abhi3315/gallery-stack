<?php
/**
 * File to enqueue assets.
 *
 * @package Gallery_Stack
 */

namespace Gallery_Stack;

use Gallery_Stack\Settings;

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
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_frontend_assets' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_assets' ] );
	}

	/**
	 * Enqueue frontend assets.
	 */
	public function enqueue_frontend_assets() {
		// Enqueue frontend styles.
		wp_enqueue_style(
			'gallery-stack-frontend',
			GALLERY_STACK_URL . 'build/assets/main.css',
			[],
			GALLERY_STACK_METADATA['Version']
		);

		// Enqueue frontend scripts.
		$frontend_dependencies = include GALLERY_STACK_PATH . 'build/assets/main.asset.php';
		wp_enqueue_script(
			'gallery-stack-frontend',
			GALLERY_STACK_URL . 'build/assets/main.js',
			$frontend_dependencies['dependencies'],
			GALLERY_STACK_METADATA['Version'],
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
			'gallery-stack-admin',
			GALLERY_STACK_URL . 'build/assets/admin.css',
			[],
			GALLERY_STACK_METADATA['Version']
		);

		// Enqueue admin scripts.
		$admin_dependencies = include GALLERY_STACK_PATH . 'build/assets/admin.asset.php';
		wp_enqueue_script(
			'gallery-stack-admin',
			GALLERY_STACK_URL . 'build/assets/admin.js',
			$admin_dependencies['dependencies'],
			GALLERY_STACK_METADATA['Version'],
			true
		);
	}
}
