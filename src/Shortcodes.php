<?php
/**
 * File to register shortcodes.
 *
 * @package Browserstack_Gallery
 */

namespace Browserstack_Gallery;

use Browserstack_Gallery\Settings;

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
		add_shortcode( 'browserstack_gallery', [ $this, 'render_gallery' ] );
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

		foreach ( $images as $id ) {
			$image        = wp_get_attachment_image_src( $id, 'full' );
			$images_html .= sprintf(
				'<div class="browserstack-gallery__image alignfull"><img src="%s" alt="%s" /></div>',
				$image[0],
				get_post_meta( $id, '_wp_attachment_image_alt', true )
			);
		}

		return sprintf(
			'<div class="browserstack-gallery alignwide">%s</div>',
			$images_html
		);
	}
}
