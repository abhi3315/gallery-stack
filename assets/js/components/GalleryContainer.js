/**
 * External dependencies
 */
import classNames from 'classnames';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import GalleryHeader from './GalleryHeader';
import GalleryContent from './GalleryContent';

/**
 * Gallery Container component
 *
 * @param {Object}   props                 - Component props.
 * @param {string}   props.id              - Gallery ID.
 * @param {Array}    props.images          - Gallery images.
 * @param {Function} props.onAddImage      - Function to add image to gallery.
 * @param {Function} props.onDeleteImage   - Function to delete image from gallery.
 * @param {Function} props.onDeleteGallery - Function to delete gallery.
 *
 * @return { JSX.Element} - Gallery Container component.
 */
const GalleryContainer = ({
	id,
	images,
	onAddImage,
	onDeleteImage,
	onDeleteGallery,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	/**
	 * Toggle gallery expanded state.
	 */
	const toggleExpanded = () => {
		setIsExpanded((prev) => !prev);
	};

	return (
		<div
			className={classNames('gallery-container', {
				'is-expanded': isExpanded,
			})}
		>
			<GalleryHeader
				title={`Gallery (ID:${id})`}
				toggleExpanded={toggleExpanded}
				galleryId={id}
				onAddImage={onAddImage}
				onDeleteGallery={onDeleteGallery}
			/>
			<GalleryContent
				images={images}
				galleryId={id}
				onDeleteImage={onDeleteImage}
			/>
		</div>
	);
};

export default GalleryContainer;
