/**
 * Admin scripts
 */

import domReady from '@wordpress/dom-ready';

import '../css/admin.scss';

domReady( () => {
	const newGalleryBtn = document.querySelector( '#create-gallery-btn' );
	const settingField = document.querySelector( '#setting-field' );

	newGalleryBtn.addEventListener( 'click', function ( e ) {
		e.preventDefault();

		const mediaFrame = wp.media( {
			title: 'Select images for your gallery',
			button: {
				text: 'Create gallery',
			},
			multiple: true,
		} );

		mediaFrame.on( 'select', function () {
			const attachment = mediaFrame.state().get( 'selection' ).toJSON();

			const attachmentIds = attachment.map( ( item ) => item.id );

			settingField.value = JSON.stringify( attachmentIds );
		} );

		mediaFrame.open();
	} );
} );
