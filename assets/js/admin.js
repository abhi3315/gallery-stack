/**
 * Admin scripts
 */

import domReady from '@wordpress/dom-ready';

import '../css/admin.scss';

domReady( () => {
	const newGalleryBtn = document.querySelector( '#create-gallery-btn' );
	const settingField = document.querySelector( '#setting-field' );

	/**
	 * Generate a unique ID for each gallery
	 *
	 * @return {string} Unique ID for each gallery
	 */
	const generateGalleryId = () => {
		const uint32 = window.crypto.getRandomValues(
			new Uint32Array( 1 )
		)[ 0 ];
		return uint32.toString( 16 );
	};

	/**
	 * Handle new gallery button click
	 *
	 * @param {Event} e Event
	 */
	const onNewGalleryBtnClick = ( e ) => {
		e.preventDefault();

		const mediaFrame = wp.media( {
			title: 'Select images for your gallery',
			button: {
				text: 'Create gallery',
			},
			multiple: true,
		} );

		mediaFrame.on( 'select', function () {
			// generate a unique ID for each gallery

			const attachment = mediaFrame.state().get( 'selection' ).toJSON();
			const attachmentIds = attachment.map( ( item ) => item.id );
			const currentSetting = JSON.parse( settingField.value || '{}' );
			const galleryId = generateGalleryId();

			currentSetting[ galleryId ] = attachmentIds;
			settingField.value = JSON.stringify( currentSetting );
		} );

		mediaFrame.open();
	};

	newGalleryBtn.addEventListener( 'click', onNewGalleryBtnClick );
} );
