/**
 * Gallery Content component
 *
 * @param {Object}   props               - Component props.
 * @param {Object[]} props.images        - Gallery images.
 * @param {string}   props.galleryId     - Gallery ID.
 * @param {Function} props.onDeleteImage - Function to delete image from gallery.
 *
 * @return { JSX.Element} - Gallery Content component.
 */
const GalleryContent = ( { images, galleryId, onDeleteImage } ) => (
	<div className="gallery-container__content">
		<div className="gallery-container__images">
			{ images.map( ( image, index ) => (
				<div className="gallery-container__image" key={ index }>
					<img src={ image.url } alt={ image.alt } />
					<button
						type="button"
						className="delete-img-btn"
						onClick={ ( e ) => {
							e.stopPropagation();
							onDeleteImage( galleryId, image.id );
						} }
					>
						<span className="dashicons dashicons-trash"></span>
					</button>
				</div>
			) ) }
		</div>
	</div>
);

export default GalleryContent;
