/* global: WoonderShopVars */

'use strict';

import $ from 'jquery';
import _ from 'underscore';
import { storageAvailable } from './utils';

const templates = {
	countdown: _.template(`<% if( h > 0 ) { %><%- h %><% }%> <% if( h == 1 ) { %> ${WoonderShopVars.texts.hour} <% } else if( h > 1 ) { %> ${WoonderShopVars.texts.hours} <% } %> <%- m %> <% if( m == 1 ) { %> ${WoonderShopVars.texts.minute} <% } else { %> ${WoonderShopVars.texts.minutes} <% } %> <%- s %> <% if( s == 1 ) { %> ${WoonderShopVars.texts.second} <% } else { %> ${WoonderShopVars.texts.seconds} <% } %>`),
};

const initTimeLeft = () => {
	// Check if local session storage is enabled.
	const localStorageEnabled = storageAvailable( 'sessionStorage' );

	$( '.js-time-left-shortcode' ).each( ( index, element ) => {
		const id         = $( element ).data( 'id' );
		let totalSeconds = parseInt( $( element ).data( 'total-seconds' ), 10 );

		if ( localStorageEnabled ) {
			totalSeconds = sessionStorage.getItem( 'ws-tl-' + id ) || totalSeconds;
			totalSeconds = parseInt( totalSeconds, 10 );
		}

		// Update the count down every 1 second.
		let countdown = setInterval( function() {

			// Calculate the remaining time, by units.
			const h = Math.floor( ( totalSeconds % (60 * 60 * 24) ) / (60 * 60) );
			const m = Math.floor( ( totalSeconds % (60 * 60) ) / 60 );
			const s = Math.floor( totalSeconds % 60 );

			// Display the result in the element.
			$( element ).html( templates.countdown( { h,m,s } ) );

			// If the count down is finished.
			if ( totalSeconds <= 0 ) {
				$( element ).html( templates.countdown( { h: 0,m: 0,s: 0 } ) );
				clearInterval( countdown );
			}

			totalSeconds = totalSeconds - 1;

			if ( localStorageEnabled ) {
				sessionStorage.setItem( 'ws-tl-' + id, "" + totalSeconds );
			}
		}, 1000 );
	} );
};

export { initTimeLeft };
