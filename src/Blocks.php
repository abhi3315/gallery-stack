<?php
/**
 * Register blocks.
 *
 * @package Gallery_Stack
 */

namespace Gallery_Stack;

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
		add_action( 'init', [ $this, 'register_blocks' ] );
		add_action( 'init', [ $this, 'register_block_styles' ] );
	}

	/**
	 * Register blocks.
	 */
	public function register_blocks() {
		register_block_type(
			GALLERY_STACK_PATH . '/build/blocks/hero/'
		);
	}

	/**
	 * Register custom block styles.
	 */
	public function register_block_styles() {
		register_block_style(
			'core/separator',
			[
				'name'         => 'gallery-stack-separator',
				'label'        => __( 'Gallery Stack Separator', 'gallery-stack' ),
				'style_handle' => 'gallery-stack-separator',
			]
		);
	}
}
