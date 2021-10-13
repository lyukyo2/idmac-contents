/* global: WoonderShopVars */

'use strict';

import $ from 'jquery';
import _ from 'underscore';

const templates = {
	countdown: _.template(`<%- d %> <% if( d == 1 ) { %> ${WoonderShopVars.texts.day}<% } else { %> ${WoonderShopVars.texts.days}<% } %>, <%- h %>${WoonderShopVars.texts.short_hours}, <%- m %>${WoonderShopVars.texts.short_minutes}, <%- s %>${WoonderShopVars.texts.short_seconds}`),
};

const initUrgencyCounters = () => {
	$( '.js-urgency-countdown-shortcode' ).each( ( index, element ) => {
		let totalSeconds = parseInt( $( element ).data( 'total-seconds' ), 10 );

		// Update the count down every 1 second.
		let urgencyCounter = setInterval( function() {

			// Calculate the remaining time, by units.
			const d = Math.floor( totalSeconds / (60 * 60 * 24) );
			const h = Math.floor( ( totalSeconds % (60 * 60 * 24) ) / (60 * 60) );
			const m = Math.floor( ( totalSeconds % (60 * 60) ) / 60 );
			const s = Math.floor( totalSeconds % 60 );

			// Display the result in the element.
			$( element ).html( templates.countdown( { d,h,m,s } ) );

			// If the count down is finished.
			if ( totalSeconds <= 0 ) {
				$( element ).html( templates.countdown( { d: 0,h: 0,m: 0,s: 0 } ) );
				clearInterval( urgencyCounter );
			}

			totalSeconds = totalSeconds - 1;
		}, 1000 );
	} );
};

export { initUrgencyCounters };
