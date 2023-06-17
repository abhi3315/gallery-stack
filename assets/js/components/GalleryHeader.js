/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Gallery Header component
 *
 * @param {Object}   props                - Component props.
 * @param {string}   props.title          - Gallery title.
 * @param {Function} props.toggleExpanded - Function to toggle gallery expanded state.
 *
 * @return { JSX.Element} - Gallery Header component.
 */
const GalleryHeader = ( { title, toggleExpanded } ) => {
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
				<button type="button" className="button delete-gallery-btn">
					{ __( 'Delete Gallery', 'browserstack-gallery' ) }
				</button>
				<button type="button" className="button add-gallery-image-btn">
					{ __( 'Add Image', 'browserstack-gallery' ) }
				</button>
			</div>
		</div>
	);
};

export default GalleryHeader;
