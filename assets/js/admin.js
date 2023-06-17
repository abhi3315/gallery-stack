/**
 * External dependencies
 */
import { createRoot, useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import GalleryContainer from './components/GalleryContainer';

const settingField = document.querySelector( '#setting-field' );
const newGalleryBtn = document.querySelector( '#create-gallery-btn' );

/**
 * Generate a unique ID for each gallery
 *
 * @return {string} Unique ID for each gallery
 */
const generateGalleryId = () => {
	const uint32 = window.crypto.getRandomValues( new Uint32Array( 1 ) )[ 0 ];
	return uint32.toString( 16 );
};

/**
 * Root component
 *
 * @return { JSX.Element} - Root component.
 */
const Root = () => {
	const [ setting, setSetting ] = useState( {} );

	const onNewGalleryBtnClick = ( e ) => {
		e.stopPropagation();

		const mediaFrame = wp.media( {
			title: 'Select images for your gallery',
			button: {
				text: 'Create gallery',
			},
			multiple: true,
		} );

		mediaFrame.on( 'select', function () {
			const galleryId = generateGalleryId();
			const attachment = mediaFrame.state().get( 'selection' ).toJSON();
			const images = attachment.map( ( item ) => ( {
				id: item.id,
				url: item.url,
				alt: item.alt,
			} ) );

			setSetting( ( prev ) => ( { ...prev, [ galleryId ]: images } ) );
		} );

		mediaFrame.open();
	};

	useEffect( () => {
		const currentSetting = JSON.parse( settingField.value || '{}' );
		setSetting( currentSetting );

		newGalleryBtn.addEventListener( 'click', onNewGalleryBtnClick );

		return () => {
			newGalleryBtn.removeEventListener( 'click', onNewGalleryBtnClick );
		};
	}, [] );

	useEffect( () => {
		settingField.value = JSON.stringify( setting );
	}, [ setting ] );

	return (
		<>
			{ Object.keys( setting ).map( ( key ) => (
				<GalleryContainer
					key={ key }
					id={ key }
					images={ setting[ key ] }
				/>
			) ) }
		</>
	);
};

createRoot( document.getElementById( 'gallery-setting' ) ).render( <Root /> );
