/**
 * External dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const save = ({ attributes }) => {
	const { backgroundImages, slideDuration } = attributes;
	return (
		<div
			{...useBlockProps.save({
				className: `gallery-stack-hero`,
				'data-slide-duration': slideDuration,
			})}
		>
			<div className="gallery-stack-hero__slides">
				{backgroundImages.map((image) => (
					<div className="gallery-stack-hero__slide" key={image.id}>
						<img
							className="gallery-stack-hero__slide-image"
							src={image.url}
							alt={image.alt}
						/>
					</div>
				))}
			</div>
			<div className="gallery-stack-hero__slide-content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default save;
