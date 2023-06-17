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
 * @param {Object} props        - Component props.
 * @param {number} props.id     - Gallery ID.
 * @param {Array}  props.images - Gallery images.
 *
 * @return { JSX.Element} - Gallery Container component.
 */
const GalleryContainer = ( { id, images } ) => {
	const [ isExpanded, setIsExpanded ] = useState( false );

	const toggleExpanded = () => {
		setIsExpanded( ( prev ) => ! prev );
	};

	return (
		<div
			className={ classNames( 'gallery-container', {
				'is-expanded': isExpanded,
			} ) }
		>
			<GalleryHeader
				title={ `Gallery (ID:${ id })` }
				toggleExpanded={ toggleExpanded }
			/>
			<GalleryContent images={ images } />
		</div>
	);
};

export default GalleryContainer;
