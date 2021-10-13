'use strict';

import $ from 'jquery';

/**
 * Returns true if at least one part of the element is in viewport
 */
const isElementInView = ( $elm ) => {
	const $window = $( window ),
		docViewTop = $window.scrollTop(),
		docViewBottom = docViewTop + $window.height(),
		elemTop = $elm.offset().top,
		elemBottom = elemTop + $elm.height();

	return ( ( elemBottom > docViewTop ) && ( elemTop < docViewBottom ) );
}


/**
 * Feature detection helper function for Web Storage API.
 *
 * @param   string type The type of web storage ('localStorage' or 'sessionStorage')
 * @returns boolean
 */
const storageAvailable = ( type ) => {
	try {
		let storage = window[ type ],
			x = '__storage_test__';

		storage.setItem( x, x );
		storage.removeItem( x );

		return true;
	}
	catch( e ) {
		return false;
	}
}


/**
 * Unfortunately, Safari on iOS does not apply the active state by default, to get it working
 * you need to add a touchstart event listener to the document body or to each element.
 *
 * @see https://developers.google.com/web/fundamentals/design-and-ux/input/touch/#enabling_active_state_support_on_ios
 *
 * @return void
 */
const enablingActiveStateSupportOnIos = () => {
	if ( /iP(hone|ad)/.test( window.navigator.userAgent ) ) {
		document.body.addEventListener( 'touchstart', () => {}, false );
	}
}


export { isElementInView, storageAvailable, enablingActiveStateSupportOnIos };
