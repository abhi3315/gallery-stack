/**
 * External dependencies
 */
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

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
const GalleryHeader = ({
	title,
	toggleExpanded,
	galleryId,
	onAddImage,
	onDeleteGallery,
}) => {
	const [copied, setCopied] = useState(false);

	/**
	 * Copy shortcode to clipboard
	 *
	 * @param {Object} e - Event object.
	 */
	const onCopyShortcode = (e) => {
		e.stopPropagation();
		const shortcode = `[gallery_stack gallery_id="${galleryId}"]`;
		navigator?.clipboard?.writeText(shortcode).then(() => {
			setCopied(true);

			setTimeout(() => {
				setCopied(false);
			}, 500);
		});
	};

	return (
		<div
			className="gallery-container__header"
			onClick={toggleExpanded}
			role="button"
			tabIndex="0"
			aria-label={__('Click to expand gallery', 'gallery-stack')}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					toggleExpanded();
				}
			}}
		>
			<h3>{title}</h3>
			<div className="gallery-container__header--cta">
				<button
					type="button"
					className={classNames('button copy-shortcode-btn', {
						'has-copied': copied,
					})}
					aria-label={__(
						'Copy shortcode to clipboard',
						'gallery-stack'
					)}
					title={__(
						'Copy shortcode to clipboard',
						'gallery-stack'
					)}
					onClick={onCopyShortcode}
				>
					<span className="dashicons dashicons-admin-page"></span>
				</button>
				<button
					type="button"
					className="button add-image-btn"
					onClick={(e) => {
						e.stopPropagation();
						onAddImage(galleryId);
					}}
				>
					{__('Add Image', 'gallery-stack')}
				</button>
				<button
					type="button"
					className="button delete-gallery-btn"
					onClick={(e) => {
						e.stopPropagation();
						onDeleteGallery(galleryId);
					}}
				>
					{__('Delete Gallery', 'gallery-stack')}
				</button>
			</div>
		</div>
	);
};

export default GalleryHeader;
