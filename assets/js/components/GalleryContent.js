/**
 * Gallery Content component
 *
 * @param {Object}   props        - Component props.
 * @param {Object[]} props.images - Gallery images.
 *
 * @return { JSX.Element} - Gallery Content component.
 */
const GalleryContent = ( { images } ) => (
	<div className="gallery-container__content">
		<div className="gallery-container__images">
			{ images.map( ( image, index ) => (
				<div className="gallery-container__image" key={ index }>
					<img src={ image.url } alt={ image.alt } />
					<button type="button" className="delete-img-btn">
						<span className="dashicons dashicons-trash"></span>
					</button>
				</div>
			) ) }
		</div>
	</div>
);

export default GalleryContent;
