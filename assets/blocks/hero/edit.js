/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	InspectorControls,
	MediaUpload,
	useInnerBlocksProps,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	Button,
	ButtonGroup,
} from '@wordpress/components';

const ALLOWED_BLOCKS = [
	'core/heading',
	'core/paragraph',
	'core/spacer',
	'core/list',
	'core/quote',
	'core/separator',
	'core/buttons',
];

const Edit = ( { attributes, setAttributes } ) => {
	const { backgroundImages, slideDuration } = attributes;

	const onChangeBackgroundImages = ( images ) => {
		setAttributes( {
			backgroundImages: images.map( ( image ) => ( {
				url: image.url,
				alt: image.alt,
				id: image.id,
			} ) ),
		} );
	};

	const onChangeSlideDuration = ( value ) => {
		setAttributes( { slideDuration: value } );
	};

	const onRemoveImage = ( id ) => {
		setAttributes( {
			backgroundImages: backgroundImages.filter(
				( image ) => image.id !== id
			),
		} );
	};

	const bgImageStyles = {};

	if ( backgroundImages.length ) {
		bgImageStyles.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${ backgroundImages[ 0 ].url })`;
		bgImageStyles.minHeight = '400px';
	}

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __(
						'Hero Section Settings',
						'browserstack-gallery'
					) }
				>
					<RangeControl
						label={ __(
							'Slide Duration (in seconds)',
							'browserstack-gallery'
						) }
						value={ slideDuration }
						onChange={ onChangeSlideDuration }
						min={ 1 }
						max={ 30 }
					/>
					<MediaUpload
						title={ __( 'Background Images' ) }
						onSelect={ onChangeBackgroundImages }
						allowedTypes={ [ 'image' ] }
						multiple
						value={ backgroundImages.map( ( image ) => image.id ) }
						render={ ( { open } ) => (
							<>
								{ !! backgroundImages.length && (
									<div className="browserstack-hero-controls">
										{ backgroundImages.map( ( image ) => (
											<div
												className="browserstack-hero-controls__image"
												key={ image.id }
											>
												<img
													src={ image.url }
													alt={ image.alt }
												/>
												<button
													className="browserstack-hero-controls__remove-btn"
													onClick={ () =>
														onRemoveImage(
															image.id
														)
													}
												>
													&times;
												</button>
											</div>
										) ) }
									</div>
								) }
								<ButtonGroup>
									<Button
										variant="secondary"
										onClick={ open }
									>
										{ __(
											'Add Background Images',
											'browserstack-gallery'
										) }
									</Button>
								</ButtonGroup>
							</>
						) }
					/>
				</PanelBody>
			</InspectorControls>
			<div
				{ ...useBlockProps( {
					className: 'browserstack-hero',
					style: bgImageStyles,
					'data-slide-duration': slideDuration,
				} ) }
			>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ [
						[
							'core/heading',
							{
								placeholder: __(
									'Hero Heading',
									'browserstack-gallery'
								),
							},
						],
						[
							'core/paragraph',
							{
								placeholder: __(
									'Hero Text',
									'browserstack-gallery'
								),
							},
						],
					] }
					{ ...useInnerBlocksProps() }
				/>
			</div>
		</>
	);
};

export default Edit;
