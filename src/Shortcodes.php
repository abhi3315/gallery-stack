<?php
/**
 * File to register shortcodes.
 *
 * @package Gallery_Stack
 */

namespace Gallery_Stack;

use Gallery_Stack\Settings;

/**
 * Shortcodes class.
 */
class Shortcodes {

	/**
	 * Get instance.
	 *
	 * @return Settings
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
		add_shortcode( 'gallery_stack', [ $this, 'render_gallery' ] );
	}

	/**
	 * Render gallery.
	 *
	 * @param array $atts Attributes.
	 *
	 * @return string
	 */
	public function render_gallery( $atts ) {
		$atts = shortcode_atts(
			[
				'gallery_id' => '',
			],
			$atts
		);

		$gallery_id = $atts['gallery_id'];

		if ( empty( $gallery_id ) ) {
			return '';
		}

		$images = Settings::get_gallery( $gallery_id );

		if ( empty( $images ) ) {
			return '';
		}

		$images_html = '';

		foreach ( $images as $image ) {
			$images_html .= sprintf(
				'<div class="gallery-stack-gallery__image alignfull"><img src="%s" alt="%s" /></div>',
				$image['url'],
				$image['alt'] ?? ''
			);
		}

		return sprintf(
			'<div class="gallery-stack alignwide">%s</div>',
			$images_html
		);
	}
}
