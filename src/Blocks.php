<?php
/**
 * Register blocks.
 *
 * @package Browserstack_Gallery
 */

namespace Browserstack_Gallery;

/**
 * Blocks class.
 */
class Blocks {

	/**
	 * Get instance.
	 *
	 * @return Blocks
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
		add_action( 'init', array( $this, 'register_blocks' ) );
	}

	/**
	 * Register blocks.
	 */
	public function register_blocks() {
		register_block_type(
			BROWSERSTACK_GALLERY_PATH . '/build/blocks/hero/'
		);
	}
}
