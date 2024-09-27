<?php
/**
 * Main plugin file.
 *
 * @package Gallery_Stack
 */

namespace Gallery_Stack;

use Gallery_Stack\Blocks;
use Gallery_Stack\Assets;
use Gallery_Stack\Settings;
use Gallery_Stack\Shortcodes;

/**
 * Main plugin class.
 */
class Plugin {

	/**
	 * Get instance.
	 *
	 * @return Plugin
	 */
	public static function get_instance() {
		static $instance = null;

		if ( null === $instance ) {
			$instance = new self();
		}

		return $instance;
	}

	/**
	 * Plugin instance.
	 */
	public function init() {
		// Register blocks.
		$blocks = Blocks::get_instance();
		$blocks->init();

		// Enqueue assets.
		$assets = Assets::get_instance();
		$assets->init();

		// Register settings page.
		$settings = Settings::get_instance();
		$settings->init();

		// Register shortcodes.
		$shortcodes = Shortcodes::get_instance();
		$shortcodes->init();
	}
}
