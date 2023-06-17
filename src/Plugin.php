<?php
/**
 * Main plugin file.
 *
 * @package Browserstack_Gallery
 */

namespace Browserstack_Gallery;

use Browserstack_Gallery\Blocks;
use Browserstack_Gallery\Assets;
use Browserstack_Gallery\Settings;
use Browserstack_Gallery\Shortcodes;

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
