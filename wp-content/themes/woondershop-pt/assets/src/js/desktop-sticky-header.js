'use strict';

import $ from 'jquery';
import _ from 'underscore';

/**
 * Toggle a class on body, if the sticky desktop menu is active.
 */
class StickyDesktopHeader {
	constructor() {
		if ( ! $( document.body ).hasClass( 'woondershop-has-desktop-sticky-header' ) || 0 === $( '.header__container' ).length ) {
			return;
		}

		this.isSet = false;
		this.headerContainerElement = document.querySelector( '.header__container' );

		this.init();
	}

	init() {
		$( window ).on( 'resize', _.debounce( _.bind( function() {
			if ( typeof Modernizr === 'undefined' ) {
				return false;
			}

			if ( ! this.isSet && Modernizr.mq( '(min-width: 992px)' ) ) {
				this.setUp();
			}
			else if ( this.isSet && ! Modernizr.mq( '(min-width: 992px)' ) ) {
				this.tearDown();
			}
		}, this ), 150 ) );
	}

	setUp() {
		const style = window.getComputedStyle( this.headerContainerElement ),
			headerContainerTop = parseInt( style.top );

		$( document ).on( 'scroll.ws-desktop-sticky', _.throttle( _.bind( function() {
			$( document.body ).toggleClass( 'woondershop-has-desktop-sticky-header--triggered', this.headerContainerElement.getBoundingClientRect().top - headerContainerTop <= 1 );
		}, this ), 35 ) );

		this.isSet = true;
	}

	tearDown() {
		$( document ).off( 'scroll.ws-desktop-sticky' );

		this.isSet = false;
	}
}

/**
 * Initialize the sticky desktop header.
 */
new StickyDesktopHeader();
