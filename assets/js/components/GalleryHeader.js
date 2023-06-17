/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Gallery Header component
 *
 * @param {Object}   props                 - Component props.
 * @param {string}   props.title           - Gallery title.
 * @param {string}   props.galleryId       - Gallery ID.
 * @param {Function} props.toggleExpanded  - Function to toggle gallery expanded state.
 * @param {Function} props.onAddImage      - Function to add image to gallery.
 * @param {Function} props.onDeleteGallery - Function to delete gallery.
 *
 * @return { JSX.Element} - Gallery Header component.
 */
const GalleryHeader = ( {
	title,
	toggleExpanded,
	galleryId,
	onAddImage,
	onDeleteGallery,
} ) => {
	return (
		<div
			className="gallery-container__header"
			onClick={ toggleExpanded }
			role="button"
			tabIndex="0"
			aria-label={ __(
				'Click to expand gallery',
				'browserstack-gallery'
			) }
			onKeyDown={ ( e ) => {
				if ( e.key === 'Enter' ) {
					toggleExpanded();
				}
			} }
		>
			<h3>{ title }</h3>
			<div className="gallery-container__header--cta">
				<button
					type="button"
					className="button add-gallery-image-btn"
					onClick={ ( e ) => {
						e.stopPropagation();
						onAddImage( galleryId );
					} }
				>
					{ __( 'Add Image', 'browserstack-gallery' ) }
				</button>
				<button
					type="button"
					className="button button-danger delete-gallery-btn"
					onClick={ ( e ) => {
						e.stopPropagation();
						onDeleteGallery( galleryId );
					} }
				>
					{ __( 'Delete Gallery', 'browserstack-gallery' ) }
				</button>
			</div>
		</div>
	);
};

export default GalleryHeader;
