import domReady from '@wordpress/dom-ready';

domReady( () => {
	const heroBlock = document.querySelector( '.browserstack-hero' );
	const slideDuration = parseInt( heroBlock.dataset.slideDuration || 5 );
	const slideContainer = heroBlock.querySelector(
		'.browserstack-hero__slides'
	);
	const slides = heroBlock.querySelectorAll( '.browserstack-hero__slide' );
	const slideWidth = slides[ 0 ].offsetWidth;

	let currentSlide = 0;

	const nextSlide = () => {
		currentSlide++;
		if ( currentSlide >= slides.length ) {
			currentSlide = 0;
		}
		slideContainer.scrollBy( {
			left: slideWidth,
			behavior: 'smooth',
		} );

		if ( currentSlide === 0 ) {
			slideContainer.scrollTo( {
				left: 0,
				behavior: 'smooth',
			} );
		}
	};

	setInterval( nextSlide, slideDuration * 1000 );
} );
