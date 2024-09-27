/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, render } from '@wordpress/element';

/**
 * Internal dependencies
 */
import GalleryContainer from './components/GalleryContainer';
import '../css/admin.scss';

const settingField = document.querySelector('#setting-field');

/**
 * Generate a unique ID for each gallery
 *
 * @return {string} Unique ID for each gallery
 */
const generateGalleryId = () => {
	const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
	return uint32.toString(16);
};

/**
 * Open media frame to select images
 *
 * @param {Array}    selectedImages - Array of selected image IDs.
 * @param {Function} callback       - Callback function to return selected images.
 */
const openMediaFrame = (selectedImages = [], callback) => {
	const mediaFrame = wp.media({
		title: 'Select images for your gallery',
		button: {
			text: 'Create gallery',
		},
		multiple: true,
	});

	if (selectedImages.length) {
		mediaFrame.on('open', () => {
			const selection = mediaFrame.state().get('selection');
			selectedImages.forEach((attachmentId) => {
				const attachment = wp.media.attachment(attachmentId);
				attachment.fetch();
				selection.add(attachment);
			});
		});
	}

	mediaFrame.on('select', () => {
		const attachment = mediaFrame.state().get('selection').toJSON();
		const images = attachment.map((item) => ({
			id: item.id,
			url: item.url,
			alt: item.alt,
		}));

		callback(images);
	});

	mediaFrame.open();
};

/**
 * Root component
 *
 * @return { JSX.Element} - Root component.
 */
const Root = () => {
	const [setting, setSetting] = useState({});

	/**
	 * Add new gallery
	 */
	const onAddGallery = () => {
		openMediaFrame([], (images) => {
			const galleryId = generateGalleryId();

			setSetting((prev) => {
				const newSetting = { ...prev, [galleryId]: images };
				return newSetting;
			});
		});
	};

	/**
	 * Add new image to gallery
	 *
	 * @param {string} galleryId - Gallery ID.
	 */
	const onAddImage = (galleryId) => {
		const selectedImages = setting[galleryId].map((image) => image.id);

		openMediaFrame(selectedImages, (images) => {
			setSetting((prev) => {
				const newSetting = { ...prev };
				newSetting[galleryId] = images;
				return newSetting;
			});
		});
	};

	/**
	 * Delete gallery
	 *
	 * @param {string} galleryId - Gallery ID.
	 */
	const onDeleteGallery = (galleryId) => {
		setSetting((prev) => {
			const newSetting = { ...prev };
			delete newSetting[galleryId];
			return newSetting;
		});
	};

	/**
	 * Delete image from gallery
	 *
	 * @param {string} galleryId - Gallery ID.
	 * @param {string} imageId   - Image ID.
	 *
	 */
	const onDeleteImage = (galleryId, imageId) => {
		setSetting((prev) => {
			const images = prev[galleryId].filter(
				(image) => image.id !== imageId
			);

			return { ...prev, [galleryId]: images };
		});
	};

	/**
	 * Set setting value on mount
	 */
	useEffect(() => {
		const currentSetting = JSON.parse(settingField.value || '{}');
		setSetting(currentSetting);
	}, []);

	/**
	 * Update setting value on change
	 */
	useEffect(() => {
		settingField.value = JSON.stringify(setting);
	}, [setting]);

	return (
		<>
			<button
				type="button"
				className="button add-gallery-btn"
				onClick={onAddGallery}
			>
				{__('Add Gallery', 'gallery-stack')}
			</button>
			{!Object.keys(setting).length && (
				<h2>{__('No gallery added yet.', 'gallery-stack')}</h2>
			)}
			{Object.keys(setting).map((key) => (
				<GalleryContainer
					key={key}
					id={key}
					images={setting[key]}
					onAddImage={onAddImage}
					onDeleteImage={onDeleteImage}
					onDeleteGallery={onDeleteGallery}
				/>
			))}
		</>
	);
};

render(<Root />, document.getElementById('gallery-setting'));
