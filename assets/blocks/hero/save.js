/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	const { backgroundImages, slideDuration } = attributes;
	return (
		<div
			{ ...useBlockProps.save( {
				className: `browserstack-hero`,
				'data-slide-duration': slideDuration,
			} ) }
		>
			<div className="browserstack-hero__slides">
				{ backgroundImages.map( ( image ) => (
					<div className="browserstack-hero__slide" key={ image.id }>
						<img
							className="browserstack-hero__slide-image"
							src={ image.url }
							alt={ image.alt }
						/>
					</div>
				) ) }
			</div>
			<div className="browserstack-hero__slide-content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default save;
