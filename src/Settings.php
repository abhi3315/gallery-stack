<?php
/**
 * File to register custom setting page.
 *
 * @package Browserstack_Gallery
 */

namespace Browserstack_Gallery;

use Exception;

/**
 * Class to register custom setting page.
 */
class Settings {

	/**
	 * Menu slug.
	 *
	 * @var string
	 */
	public static $menu_slug = 'browserstack-gallery';

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
		add_action( 'admin_menu', [ $this, 'register_settings_page' ] );
		add_action( 'admin_init', [ $this, 'register_settings' ] );
	}

	/**
	 * Register settings page.
	 */
	public function register_settings_page() {
		add_menu_page(
			__( 'Browserstack Settings', 'browserstack-gallery' ),
			__( 'Browserstack', 'browserstack-gallery' ),
			'manage_options',
			self::$menu_slug,
			[ $this, 'render_settings_page' ],
			'dashicons-format-gallery',
			20
		);
	}

	/**
	 * Render settings page.
	 */
	public function render_settings_page() {
		wp_enqueue_media();
		?>
		<div class="wrap gallery-settings">
			<h1><?php esc_html_e( 'Browserstack Settings', 'browserstack-gallery' ); ?></h1>
			<form action="options.php" method="post">
				<?php
				settings_fields( self::$menu_slug );
				settings_errors();
				do_settings_sections( self::$menu_slug );
				submit_button();
				?>
			</form>
		</div>
		<?php
	}

	/**
	 * Register settings.
	 */
	public function register_settings() {
		register_setting(
			self::$menu_slug,
			self::$menu_slug,
			[ $this, 'sanitize_settings' ]
		);

		add_settings_section(
			self::$menu_slug . '-section',
			__( 'Gallery Settings', 'browserstack-gallery' ),
			[ $this, 'render_settings_section' ],
			self::$menu_slug
		);
	}

	/**
	 * Sanitize settings.
	 *
	 * @param string $settings Settings.
	 *
	 * @return array
	 */
	public function sanitize_settings( $settings ) {
		try {
			$settings = json_decode( $settings, true );

			if ( empty( $settings ) ) {
				return '';
			}

			$settings = $this->sanitize_array( $settings );
			$settings = wp_json_encode( $settings );

			if ( empty( $settings ) ) {
				return '';
			}

			return $settings;
		} catch ( Exception $e ) {
			add_settings_error(
				self::$menu_slug,
				'invalid-settings',
				$e->getMessage()
			);

			return get_option( self::$menu_slug );
		}
	}

	/**
	 * Sanitizes array.
	 *
	 * @param array $arr Array to sanitize.
	 *
	 * @return array Sanitized array.
	 */
	private function sanitize_array( $arr ) {
		$sanitized_arr = [];

		if ( ! is_array( $arr ) ) {
			return $sanitized_arr;
		}

		foreach ( $arr as $key => $value ) {
			if ( is_array( $value ) ) {
				$sanitized_arr[ sanitize_text_field( $key ) ] = $this->sanitize_array( $value );
			} elseif ( ! empty( $value ) ) { // do not add key if value is empty.
				$sanitized_arr[ sanitize_text_field( $key ) ] = sanitize_text_field( $value );
			}
		}

		return $sanitized_arr;
	}

	/**
	 * Render settings section.
	 */
	public function render_settings_section() {
		$value = get_option( self::$menu_slug, '{}' );

		if ( empty( $value ) ) {
			$value = '{}';
		}
		?>
		<input id="setting-field" hidden name="<?php echo esc_attr( self::$menu_slug ); ?>" value="<?php echo esc_attr( $value ); ?>" />
		<div id="gallery-setting"></div>
		<?php
	}

	/**
	 * Get settings.
	 *
	 * @return string
	 */
	public static function get_settings() {
		$settings = get_option( self::$menu_slug, [] );

		if ( empty( $settings ) ) {
			return [];
		}

		return $settings;
	}

	/**
	 * Get gallery.
	 *
	 * @param string $gallery_id Gallery ID.
	 *
	 * @return array
	 */
	public static function get_gallery( string $gallery_id ) {

		$gallery_settings = self::get_settings();

		$gallery_settings = json_decode( $gallery_settings, true );

		if ( empty( $gallery_settings ) || empty( $gallery_settings[ $gallery_id ] ) ) {
			return [];
		}

		return $gallery_settings[ $gallery_id ];
	}
}
